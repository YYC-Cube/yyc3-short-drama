import { type NextRequest, NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { createUser, findUserByPhone } from "@/lib/models/user.model"
import { verifyCode } from "@/lib/models/verification-code.model"
import { sendWelcomeEmail } from "@/lib/services/email.service"
import { getJWTSecretCached } from "@/lib/jwt-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, phone, code, email } = body

    // 验证输入
    if (!username || !phone || !code) {
      return NextResponse.json({ error: "请填写完整信息" }, { status: 400 })
    }

    // 验证验证码
    const isCodeValid = await verifyCode(phone, code, "register")
    if (!isCodeValid) {
      return NextResponse.json({ error: "验证码错误或已过期" }, { status: 400 })
    }

    // 检查用户是否已存在
    const existingUser = await findUserByPhone(phone)
    if (existingUser) {
      return NextResponse.json({ error: "该手机号已注册" }, { status: 400 })
    }

    // 创建用户
    const user = await createUser({
      username,
      phone,
      email,
    })

    // 生成JWT token
    const token = sign({ userId: user.id }, getJWTSecretCached(), { expiresIn: "7d" })

    // 发送欢迎邮件（如果有邮箱）
    if (email) {
      sendWelcomeEmail(email, username).catch(console.error)
    }

    // 移除敏感信息
    const { password, ...userWithoutPassword } = user

    const response = NextResponse.json({
      message: "注册成功",
      user: userWithoutPassword,
    })

    // 设置cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7天
    })

    return response
  } catch (error) {
    console.error("注册失败:", error)
    return NextResponse.json({ error: "注册失败，请稍后重试" }, { status: 500 })
  }
}
