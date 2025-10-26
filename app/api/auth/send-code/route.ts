import { type NextRequest, NextResponse } from "next/server"
import { createVerificationCode, checkRateLimit } from "@/lib/models/verification-code.model"
import { sendSmsCode } from "@/lib/services/sms.service"
import { sendVerificationCodeEmail } from "@/lib/services/email.service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, email, type } = body

    const contact = phone || email
    const contactType = phone ? "phone" : "email"

    // 验证输入
    if (!contact || !type) {
      return NextResponse.json({ error: "缺少必要参数" }, { status: 400 })
    }

    // 检查频率限制
    const canSend = await checkRateLimit(contact, type, contactType)
    if (!canSend) {
      return NextResponse.json({ error: "发送过于频繁，请1分钟后再试" }, { status: 429 })
    }

    // 创建验证码
    const code = await createVerificationCode(contact, type, contactType)

    // 发送验证码
    if (contactType === "phone") {
      const result = await sendSmsCode(contact, code)
      if (!result.success) {
        return NextResponse.json({ error: result.message }, { status: 500 })
      }
    } else {
      await sendVerificationCodeEmail(contact, code, type)
    }

    return NextResponse.json({
      message: "验证码发送成功",
      // 开发环境返回验证码方便测试
      ...(process.env.NODE_ENV === "development" && { code }),
    })
  } catch (error) {
    console.error("发送验证码失败:", error)
    return NextResponse.json({ error: "发送验证码失败" }, { status: 500 })
  }
}
