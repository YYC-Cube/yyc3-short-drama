/**
 * @file 用户注册API
 * @description 处理用户注册请求，验证验证码并创建新用户
 * @module api/auth/register
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { type NextRequest, NextResponse } from "next/server"
import { createUser, findUserByPhone } from "@/lib/models/user.model"
import { verifyCode } from "@/lib/models/verification-code.model"
import { sendWelcomeEmail } from "@/lib/services/email.service"
import {
  validateRequestParams,
  generateAuthToken,
  setAuthCookie,
  createErrorResponse,
  handleAuthError
} from "@/lib/auth/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, phone, code, email } = body

    // 验证输入
    const validation = validateRequestParams(body, ["username", "phone", "code"])
    if (!validation.isValid) {
      return createErrorResponse(validation.error || "请填写完整信息")
    }

    // 验证验证码
    const isCodeValid = await verifyCode(phone, code, "register")
    if (!isCodeValid) {
      return createErrorResponse("验证码错误或已过期")
    }

    // 检查用户是否已存在
    const existingUser = await findUserByPhone(phone)
    if (existingUser) {
      return createErrorResponse("该手机号已注册")
    }

    // 创建用户
    const user = await createUser({
      username,
      phone,
      email,
    })

    // 生成JWT token
    const token = generateAuthToken(user.id)

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
    setAuthCookie(response, token)

    return response
  } catch (error) {
    return handleAuthError(error, "注册失败")
  }
}
