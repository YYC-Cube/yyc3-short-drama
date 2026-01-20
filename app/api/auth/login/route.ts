/**
 * @file 用户登录API
 * @description 处理用户登录请求，验证验证码并生成JWT认证令牌
 * @module api/auth/login
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { type NextRequest, NextResponse } from "next/server"
import { findUserByPhone, updateLastLogin } from "@/lib/models/user.model"
import { verifyCode } from "@/lib/models/verification-code.model"
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
    const { phone, code } = body

    // 验证输入
    const validation = validateRequestParams(body, ["phone", "code"])
    if (!validation.isValid) {
      return createErrorResponse(validation.error || "请填写手机号和验证码")
    }

    // 验证验证码
    const isCodeValid = await verifyCode(phone, code, "login")
    if (!isCodeValid) {
      return createErrorResponse("验证码错误或已过期")
    }

    // 查找用户
    const user = await findUserByPhone(phone)
    if (!user) {
      return createErrorResponse("用户不存在，请先注册", 404)
    }

    // 更新最后登录时间
    await updateLastLogin(user.id)

    // 生成JWT token
    const token = generateAuthToken(user.id)

    // 移除敏感信息
    const { password, ...userWithoutPassword } = user

    const response = NextResponse.json({
      message: "登录成功",
      user: userWithoutPassword,
    })

    // 设置cookie
    setAuthCookie(response, token)

    return response
  } catch (error) {
    return handleAuthError(error, "登录失败")
  }
}
