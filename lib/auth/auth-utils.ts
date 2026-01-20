/**
 * @file 认证工具函数
 * @description 提供认证相关的公共工具函数
 * @module lib/auth/auth-utils
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { NextResponse } from "next/server"
import { getJWTSecretCached } from "@/lib/jwt-config"
import { sign } from "jsonwebtoken"

/**
 * 验证请求参数
 * @param params 请求参数对象
 * @param requiredFields 必需的字段数组
 * @returns 验证结果，包含isValid和error字段
 */
export function validateRequestParams(
  params: Record<string, any>,
  requiredFields: string[]
): { isValid: boolean; error?: string } {
  const missingFields = requiredFields.filter(field => !params[field])
  
  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `缺少必要参数: ${missingFields.join(', ')}`
    }
  }
  
  return { isValid: true }
}

/**
 * 生成认证令牌
 * @param userId 用户ID
 * @param expiresIn 过期时间
 * @returns JWT令牌
 */
export function generateAuthToken(userId: number, expiresIn: string = "7d"): string {
  return sign({ userId }, getJWTSecretCached(), { expiresIn })
}

/**
 * 设置认证Cookie
 * @param response NextResponse对象
 * @param token 认证令牌
 * @param maxAge 最大过期时间（秒）
 */
export function setAuthCookie(
  response: NextResponse,
  token: string,
  maxAge: number = 60 * 60 * 24 * 7 // 7天
): void {
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
  })
}

/**
 * 清除认证Cookie
 * @param response NextResponse对象
 */
export function clearAuthCookie(response: NextResponse): void {
  response.cookies.delete("auth_token")
}

/**
 * 创建成功响应
 * @param data 响应数据
 * @param message 响应消息
 * @returns NextResponse对象
 */
export function createSuccessResponse(
  data?: any,
  message: string = "操作成功"
): NextResponse {
  return NextResponse.json({
    success: true,
    message,
    ...(data && { data })
  })
}

/**
 * 创建错误响应
 * @param error 错误信息
 * @param status 状态码
 * @returns NextResponse对象
 */
export function createErrorResponse(
  error: string,
  status: number = 400
): NextResponse {
  return NextResponse.json({ success: false, error }, { status })
}

/**
 * 处理认证错误
 * @param error 错误对象
 * @param message 错误消息
 * @returns NextResponse对象
 */
export function handleAuthError(
  error: any,
  message: string = "认证失败"
): NextResponse {
  console.error(`${message}:`, error)
  return createErrorResponse(message, 500)
}

/**
 * 检查环境变量是否配置
 * @param variables 环境变量数组
 * @returns 检查结果，包含isValid和missingFields字段
 */
export function checkEnvVariables(
  variables: string[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields = variables.filter(variable => !process.env[variable])
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  }
}
