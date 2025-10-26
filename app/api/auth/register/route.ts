import { type NextRequest, NextResponse } from "next/server"
import { createUser, findUserByPhone, findUserByEmail } from "@/lib/models/user.model"
import { verifyCode } from "@/lib/models/verification-code.model"
import { sendWelcomeEmail } from "@/lib/services/email.service"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, phone, email, password, verificationCode } = body

    // 输入验证
    if (!username || username.length < 2) {
      return NextResponse.json({ success: false, message: "用户名长度至少2个字符" }, { status: 400 })
    }

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ success: false, message: "手机号格式不正确" }, { status: 400 })
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "邮箱格式不正确" }, { status: 400 })
    }

    if (password && password.length < 6) {
      return NextResponse.json({ success: false, message: "密码长度至少6个字符" }, { status: 400 })
    }

    if (!verificationCode || verificationCode.length !== 6) {
      return NextResponse.json({ success: false, message: "验证码格式不正确" }, { status: 400 })
    }

    // 验证验证码
    const isCodeValid = await verifyCode(phone, verificationCode, "register")
    if (!isCodeValid) {
      return NextResponse.json({ success: false, message: "验证码错误或已过期" }, { status: 400 })
    }

    // 检查用户是否已存在
    const existingUserByPhone = await findUserByPhone(phone)
    if (existingUserByPhone) {
      return NextResponse.json({ success: false, message: "该手机号已注册" }, { status: 409 })
    }

    if (email) {
      const existingUserByEmail = await findUserByEmail(email)
      if (existingUserByEmail) {
        return NextResponse.json({ success: false, message: "该邮箱已注册" }, { status: 409 })
      }
    }

    // 创建用户
    const user = await createUser({
      username,
      phone,
      email,
      password,
    })

    // 发送欢迎邮件
    if (email) {
      await sendWelcomeEmail(email, username)
    }

    // 生成JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        phone: user.phone,
        username: user.username,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    const response = NextResponse.json({
      success: true,
      message: "注册成功",
      data: {
        user: {
          id: user.id,
          username: user.username,
          phone: user.phone,
          email: user.email,
          avatar: user.avatar,
          level: user.level,
          starCoins: user.star_coins,
          isLocalUser: user.is_local_user,
          userType: user.user_type,
        },
        token,
      },
    })

    // 设置HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return response
  } catch (error: any) {
    console.error("注册错误:", error)
    return NextResponse.json({ success: false, message: error.message || "服务器内部错误" }, { status: 500 })
  }
}
