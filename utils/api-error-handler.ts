/**
 * API错误处理工具
 * 处理API请求中的错误
 */

import { handleError, ErrorType, type ErrorDetails } from "./error-handler"

/**
 * API响应状态
 */
export interface ApiResponse<T> {
  data: T | null
  error: ErrorDetails | null
  loading: boolean
}

/**
 * 处理API错误
 */
export function handleApiError(error: any): ErrorDetails {
  // 网络错误
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return handleError(error, ErrorType.NETWORK)
  }

  // 响应错误
  if (error.status) {
    switch (error.status) {
      case 401:
        return handleError("未授权访问", ErrorType.AUTHENTICATION)
      case 403:
        return handleError("禁止访问", ErrorType.AUTHORIZATION)
      case 404:
        return handleError("资源不存在", ErrorType.CLIENT)
      case 422:
        return handleError("数据验证失败", ErrorType.VALIDATION)
      case 500:
      case 502:
      case 503:
        return handleError("服务器错误", ErrorType.SERVER)
      default:
        return handleError(`HTTP错误: ${error.status}`, ErrorType.UNKNOWN)
    }
  }

  // 默认错误
  return handleError(error.message || "未知错误", ErrorType.UNKNOWN)
}

/**
 * 安全的API调用包装器
 */
export async function safeApiCall<T>(apiCall: () => Promise<T>): Promise<ApiResponse<T>> {
  try {
    const data = await apiCall()
    return { data, error: null, loading: false }
  } catch (error: any) {
    const errorDetails = handleApiError(error)
    return { data: null, error: errorDetails, loading: false }
  }
}
