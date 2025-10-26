import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "admin@0379.email",
    pass: process.env.SMTP_PASS || "",
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// 发送邮件
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"言语逸品" <${process.env.FROM_EMAIL || "admin@0379.email"}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })
    return true
  } catch (error) {
    console.error("发送邮件失败:", error)
    return false
  }
}

// 发送欢迎邮件
export async function sendWelcomeEmail(email: string, username: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Microsoft YaHei', Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 欢迎加入言语逸品！</h1>
          </div>
          <div class="content">
            <p>尊敬的 <strong>${username}</strong>：</p>
            <p>感谢您注册言语逸品平台！我们致力于传承和创新河洛文化，为您提供最优质的AI创作体验。</p>
            <h3>🌟 您的专属权益：</h3>
            <ul>
              <li>💰 新用户奖励：100星币</li>
              <li>🎭 AI剧本生成工具</li>
              <li>🏛️ 文化基因库访问</li>
              <li>🎨 创意工坊权限</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/main" class="button">
              立即开始创作 →
            </a>
          </div>
          <div class="footer">
            <p>言语逸品 - 河洛文化数字传承平台</p>
            <p>© 2025 yanyu.com. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: "🎉 欢迎加入言语逸品！",
    html,
    text: `欢迎加入言语逸品！尊敬的 ${username}，感谢您的注册。`,
  })
}

// 发送验证码邮件
export async function sendVerificationCodeEmail(email: string, code: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Microsoft YaHei', Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 10px; margin: 30px 0; text-align: center; }
          .warning { color: #ef4444; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 验证码</h2>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <p>您的验证码是：</p>
            <div class="code">${code}</div>
            <p class="warning">⚠️ 验证码5分钟内有效，请勿泄露给他人。</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: "📧 言语逸品 - 验证码",
    html,
    text: `您的验证码是：${code}，5分钟内有效。`,
  })
}
