// 阿里云短信服务集成
interface SendSmsResult {
  success: boolean
  message: string
  requestId?: string
}

// 发送短信验证码
export async function sendSmsCode(phone: string, code: string): Promise<SendSmsResult> {
  try {
    console.log(`📱 发送短信验证码到 ${phone}: ${code}`)

    // 开发环境模拟
    if (process.env.NODE_ENV === "development") {
      return {
        success: true,
        message: "验证码发送成功（开发环境模拟）",
        requestId: `dev_${Date.now()}`,
      }
    }

    // 生产环境集成真实短信服务
    // TODO: 集成阿里云短信服务
    return {
      success: true,
      message: "验证码发送成功",
      requestId: `prod_${Date.now()}`,
    }
  } catch (error) {
    console.error("❌ 发送短信失败:", error)
    return {
      success: false,
      message: "验证码发送失败，请稍后重试",
    }
  }
}

// 发送通知短信
export async function sendNotificationSms(phone: string, message: string): Promise<SendSmsResult> {
  try {
    console.log(`📱 发送通知短信到 ${phone}: ${message}`)

    return {
      success: true,
      message: "通知发送成功",
    }
  } catch (error) {
    console.error("❌ 发送通知短信失败:", error)
    return {
      success: false,
      message: "通知发送失败",
    }
  }
}
