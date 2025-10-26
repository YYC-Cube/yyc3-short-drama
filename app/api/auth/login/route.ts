import { type NextRequest, NextResponse } from "next/server"
import { findUserByPhone, verifyPassword, updateLastLogin } from "@/lib/models/user.model"
import { verifyCode } from "@/lib/models/verification-code.model"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, password, verificationCode, loginType } = body

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ success: false, message: "手机号格式不正确" }, { status: 400 })
    }

    const user = await findUserByPhone(phone)

    // 验证码登录
    if (loginType === "code") {
      if (!verificationCode || verificationCode.length !== 6) {
        return NextResponse.json({ success: false, message: "验证码格式不正确" }, { status: 400 })
      }

      const isCodeValid = await verifyCode(phone, verificationCode, "login")
      if (!isCodeValid) {
        return NextResponse.json({ success: false, message: "验证码错误或已过期" }, { status: 400 })
      }

      // 如果用户不存在，自动注册
      if (!user) {
        return NextResponse.json({ success: false, message: "用户不存在，请先注册" }, { status: 404 })
      }
    }

    // 密码登录
    if (loginType === "password") {
      if (!password) {
        return NextResponse.json({ success: false, message: "请输入密码" }, { status: 400 })
      }

      if (!user) {
        return NextResponse.json({ success: false, message: "用户不存在" }, { status: 404 })
      }

      if (!user.password) {
        return NextResponse.json({ success: false, message: "该账号未设置密码，请使用验证码登录" }, { status: 400 })
      }

      const isPasswordValid = await verifyPassword(password, user.password)
      if (!isPasswordValid) {
        return NextResponse.json({ success: false, message: "密码错误" }, { status: 400 })
      }
    }

    if (!user) {
      return NextResponse.json({ success: false, message: "登录失败" }, { status: 400 })
    }

    // 更新最后登录时间
    await updateLastLogin(user.id)

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
      message: "登录成功",
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
    console.error("登录错误:", error)
    return NextResponse.json({ success: false, message: error.message || "服务器内部错误" }, { status: 500 })
  }
}
