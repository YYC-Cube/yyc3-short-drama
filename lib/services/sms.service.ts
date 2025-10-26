// 阿里云短信服务集成
interface SendSmsResult {
  success: boolean
  message: string
  requestId?: string
}

// 发送短信验证码
export async function sendSmsCode(phone: string, code: string): Promise<SendSmsResult> {
  try {
    // 这里应该集成真实的短信服务API（阿里云、腾讯云等）
    // 暂时使用模拟实现

    console.log(`发送短信验证码到 ${phone}: ${code}`)

    // 在开发环境下直接返回成功
    if (process.env.NODE_ENV === "development") {
      return {
        success: true,
        message: "验证码发送成功（开发环境模拟）",
        requestId: `dev_${Date.now()}`,
      }
    }

    // 生产环境集成真实短信服务
    // const result = await aliyunSms.sendSms({
    //   PhoneNumbers: phone,
    //   SignName: process.env.SMS_SIGN_NAME,
    //   TemplateCode: process.env.SMS_TEMPLATE_CODE,
    //   TemplateParam: JSON.stringify({ code })
    // })

    return {
      success: true,
      message: "验证码发送成功",
      requestId: `prod_${Date.now()}`,
    }
  } catch (error) {
    console.error("发送短信失败:", error)
    return {
      success: false,
      message: "验证码发送失败，请稍后重试",
    }
  }
}

// 发送通知短信
export async function sendNotificationSms(phone: string, message: string): Promise<SendSmsResult> {
  try {
    console.log(`发送通知短信到 ${phone}: ${message}`)

    return {
      success: true,
      message: "通知发送成功",
    }
  } catch (error) {
    console.error("发送通知短信失败:", error)
    return {
      success: false,
      message: "通知发送失败",
    }
  }
}
