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

    // 临时解决方案：模拟成功登录响应
    // 当数据库连接问题解决后，移除以下代码并恢复原始逻辑
    if (phone === "13800138000" && code === "123456") {
      const mockUser = {
        id: 1,
        username: "管理员",
        phone: "13800138000",
        email: "admin@0379.email",
        avatar: "",
        level: "顶级导演",
        star_coins: 10000,
        is_local_user: true,
        user_type: "vip"
      }

      // 生成JWT token
      const token = generateAuthToken(mockUser.id)

      const response = NextResponse.json({
        message: "登录成功",
        user: mockUser,
      })

      // 设置cookie
      setAuthCookie(response, token)

      return response
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
