import nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"

// 邮件传输器配置
let transporter: Transporter | null = null

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "admin@0379.email",
        pass: process.env.SMTP_PASS || "",
      },
    })
  }
  return transporter
}

// 发送验证码邮件
export async function sendVerificationCodeEmail(
  email: string,
  code: string,
  type: "register" | "login" | "reset",
): Promise<void> {
  const typeText = {
    register: "注册",
    login: "登录",
    reset: "重置密码",
  }

  const mailOptions = {
    from: `"言语逸品·文化平台" <${process.env.FROM_EMAIL || "admin@0379.email"}>`,
    to: email,
    subject: `【言语逸品】${typeText[type]}验证码`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Microsoft YaHei', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 40px 30px; border-radius: 0 0 8px 8px; }
          .code-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🌸 言语逸品</h1>
            <p style="margin: 10px 0 0 0;">河洛文化·AI创作·数字传承</p>
          </div>
          <div class="content">
            <h2 style="color: #1f2937;">您的${typeText[type]}验证码</h2>
            <p>您正在进行<strong>${typeText[type]}</strong>操作，验证码如下：</p>
            <div class="code-box">
              <div class="code">${code}</div>
              <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">验证码10分钟内有效</p>
            </div>
            <p style="color: #dc2626; font-size: 14px;">⚠️ 如果这不是您本人的操作，请忽略此邮件。</p>
          </div>
          <div class="footer">
            <p>© 2025 言语逸品·文化平台</p>
            <p style="font-size: 12px;">联系：<a href="mailto:admin@0379.email">admin@0379.email</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await getTransporter().sendMail(mailOptions)
    console.log(`验证码邮件已发送至: ${email}`)
  } catch (error) {
    console.error("发送验证码邮件失败:", error)
    throw new Error("邮件发送失败")
  }
}

// 发送欢迎邮件
export async function sendWelcomeEmail(email: string, username: string): Promise<void> {
  const mailOptions = {
    from: `"言语逸品·文化平台" <${process.env.FROM_EMAIL || "admin@0379.email"}>`,
    to: email,
    subject: "🎉 欢迎加入言语逸品·文化平台",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Microsoft YaHei', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 40px 30px; border-radius: 0 0 8px 8px; }
          .feature { margin: 15px 0; padding: 15px; background: #f3f4f6; border-radius: 6px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🌸 欢迎来到言语逸品</h1>
          </div>
          <div class="content">
            <h2>尊敬的 ${username}，</h2>
            <p>恭喜您成功注册！</p>
            <div class="feature">
              <strong>🎬 AI智能剧本</strong><br>
              运用八卦易理创作文化剧本
            </div>
            <div class="feature">
              <strong>🧬 文化基因库</strong><br>
              探索河洛文化的深厚底蕴
            </div>
            <div class="feature">
              <strong>⭐ 星币经济</strong><br>
              创作获得星币奖励
            </div>
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}" class="button">开始创作 →</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await getTransporter().sendMail(mailOptions)
    console.log(`欢迎邮件已发送至: ${email}`)
  } catch (error) {
    console.error("发送欢迎邮件失败:", error)
  }
}
