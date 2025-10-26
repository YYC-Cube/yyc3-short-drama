import { type NextRequest, NextResponse } from "next/server"
import { createVerificationCode } from "@/lib/models/verification-code.model"
import { sendSmsCode } from "@/lib/services/sms.service"
import { sendVerificationCodeEmail } from "@/lib/services/email.service"
import { findUserByPhone } from "@/lib/models/user.model"

// 限流记录
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, email, purpose = "login" } = body

    // 验证手机号
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ success: false, message: "手机号格式不正确" }, { status: 400 })
    }

    // 验证邮箱
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "邮箱格式不正确" }, { status: 400 })
    }

    const target = phone || email
    if (!target) {
      return NextResponse.json({ success: false, message: "请提供手机号或邮箱" }, { status: 400 })
    }

    // 限流检查
    const now = Date.now()
    const rateLimit = rateLimitMap.get(target)

    if (rateLimit) {
      if (now < rateLimit.resetTime) {
        if (rateLimit.count >= 5) {
          return NextResponse.json({ success: false, message: "发送过于频繁，请稍后再试" }, { status: 429 })
        }
        rateLimit.count++
      } else {
        rateLimitMap.set(target, { count: 1, resetTime: now + 60 * 60 * 1000 })
      }
    } else {
      rateLimitMap.set(target, { count: 1, resetTime: now + 60 * 60 * 1000 })
    }

    // 注册时检查用户是否已存在
    if (purpose === "register" && phone) {
      const existingUser = await findUserByPhone(phone)
      if (existingUser) {
        return NextResponse.json({ success: false, message: "该手机号已注册" }, { status: 409 })
      }
    }

    // 生成验证码
    const code = await createVerificationCode(target, purpose as "login" | "register" | "reset_password")

    // 发送验证码
    let sendResult
    if (phone) {
      sendResult = await sendSmsCode(phone, code)
    } else if (email) {
      sendResult = await sendVerificationCodeEmail(email, code)
    }

    if (!sendResult?.success) {
      return NextResponse.json({ success: false, message: "验证码发送失败，请稍后重试" }, { status: 500 })
    }

    // 开发环境返回验证码
    const responseData: any = {
      success: true,
      message: "验证码发送成功",
      data: {
        expiresIn: 300,
      },
    }

    if (process.env.NODE_ENV === "development") {
      responseData.data.code = code
    }

    return NextResponse.json(responseData)
  } catch (error: any) {
    console.error("发送验证码错误:", error)
    return NextResponse.json({ success: false, message: error.message || "服务器内部错误" }, { status: 500 })
  }
}
