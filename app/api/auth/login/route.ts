import { type NextRequest, NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { findUserByPhone, updateLastLogin } from "@/lib/models/user.model"
import { verifyCode } from "@/lib/models/verification-code.model"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, code } = body

    // 验证输入
    if (!phone || !code) {
      return NextResponse.json({ error: "请填写手机号和验证码" }, { status: 400 })
    }

    // 验证验证码
    const isCodeValid = await verifyCode(phone, code, "login")
    if (!isCodeValid) {
      return NextResponse.json({ error: "验证码错误或已过期" }, { status: 400 })
    }

    // 查找用户
    const user = await findUserByPhone(phone)
    if (!user) {
      return NextResponse.json({ error: "用户不存在，请先注册" }, { status: 404 })
    }

    // 更新最后登录时间
    await updateLastLogin(user.id)

    // 生成JWT token
    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })

    // 移除敏感信息
    const { password, ...userWithoutPassword } = user

    const response = NextResponse.json({
      message: "登录成功",
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
    console.error("登录失败:", error)
    return NextResponse.json({ error: "登录失败，请稍后重试" }, { status: 500 })
  }
}
