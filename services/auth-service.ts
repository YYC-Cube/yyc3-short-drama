import { generateSecureToken } from "@/lib/crypto-utils"

// 验证码发送请求类型
export interface SendCodeRequest {
  phoneNumber: string
  purpose: "login" | "register"
}

// 验证码发送响应类型
export interface SendCodeResponse {
  success: boolean
  message: string
  error?: string
}

// 登录请求类型
export interface LoginRequest {
  phoneNumber: string
  verificationCode: string
  deviceInfo?: {
    userAgent: string
    platform: string
  }
}

// 注册请求类型
export interface RegisterRequest {
  username: string
  phoneNumber: string
  email: string
  password: string
  verificationCode: string
  deviceInfo?: {
    userAgent: string
    platform: string
  }
}

// 用户信息类型
export interface UserInfo {
  id: string
  username: string
  phoneNumber: string
  email?: string
  isLocalUser: boolean
  userType: "normal" | "creator" | "vip"
  avatar?: string
  createdAt: string
}

// 登录响应类型
export interface LoginResponse {
  success: boolean
  user?: UserInfo
  token?: string
  isLocalUser?: boolean
  message?: string
  error?: string
}

// 注册响应类型
export interface RegisterResponse {
  success: boolean
  user?: UserInfo
  message?: string
  error?: string
}

// 发送验证码
export async function sendVerificationCode(request: SendCodeRequest): Promise<SendCodeResponse> {
  try {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 简单的手机号验证
    if (!request.phoneNumber || request.phoneNumber.length !== 11) {
      return {
        success: false,
        message: "手机号格式不正确",
        error: "INVALID_PHONE_NUMBER",
      }
    }

    // 模拟验证码发送成功
    return {
      success: true,
      message: `验证码已发送至 ${request.phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}`,
    }
  } catch (error) {
    console.error("发送验证码失败:", error)
    return {
      success: false,
      message: "验证码发送失败，请稍后重试",
      error: "SEND_CODE_FAILED",
    }
  }
}

// 用户登录
export async function loginUser(request: LoginRequest): Promise<LoginResponse> {
  try {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 简单的验证码验证（实际应用中应该验证真实验证码）
    if (!request.verificationCode || request.verificationCode.length !== 6) {
      return {
        success: false,
        message: "验证码格式不正确",
        error: "INVALID_VERIFICATION_CODE",
      }
    }

    // 判断是否为洛阳本地用户（以137、138、139开头的手机号）
    const isLocalUser =
      request.phoneNumber.startsWith("137") ||
      request.phoneNumber.startsWith("138") ||
      request.phoneNumber.startsWith("139")

    // 模拟用户数据
    const userData: UserInfo = {
      id: `user_${Date.now()}`,
      username: `文化传承者${request.phoneNumber.slice(-4)}`,
      phoneNumber: request.phoneNumber,
      isLocalUser,
      userType: isLocalUser ? "vip" : "normal",
      avatar: `/placeholder.svg?height=40&width=40&text=${request.phoneNumber.slice(-2)}`,
      createdAt: new Date().toISOString(),
    }

    const token = generateSecureToken(32)

    return {
      success: true,
      user: userData,
      token,
      isLocalUser,
      message: isLocalUser ? "欢迎洛阳本地用户！" : "登录成功！",
    }
  } catch (error) {
    console.error("登录失败:", error)
    return {
      success: false,
      message: "登录失败，请稍后重试",
      error: "LOGIN_FAILED",
    }
  }
}

// 用户注册
export async function registerUser(request: RegisterRequest): Promise<RegisterResponse> {
  try {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 基本验证
    if (!request.username || request.username.length < 2) {
      return {
        success: false,
        message: "用户名长度至少2个字符",
        error: "INVALID_USERNAME",
      }
    }

    if (!request.email || !request.email.includes("@")) {
      return {
        success: false,
        message: "邮箱格式不正确",
        error: "INVALID_EMAIL",
      }
    }

    if (!request.password || request.password.length < 6) {
      return {
        success: false,
        message: "密码长度至少6个字符",
        error: "INVALID_PASSWORD",
      }
    }

    if (!request.verificationCode || request.verificationCode.length !== 6) {
      return {
        success: false,
        message: "验证码格式不正确",
        error: "INVALID_VERIFICATION_CODE",
      }
    }

    // 判断是否为洛阳本地用户
    const isLocalUser =
      request.phoneNumber.startsWith("137") ||
      request.phoneNumber.startsWith("138") ||
      request.phoneNumber.startsWith("139")

    // 模拟用户数据
    const userData: UserInfo = {
      id: `user_${Date.now()}`,
      username: request.username,
      phoneNumber: request.phoneNumber,
      email: request.email,
      isLocalUser,
      userType: isLocalUser ? "vip" : "normal",
      avatar: `/placeholder.svg?height=40&width=40&text=${request.username.charAt(0)}`,
      createdAt: new Date().toISOString(),
    }

    return {
      success: true,
      user: userData,
      message: "注册成功！欢迎加入言语逸品平台",
    }
  } catch (error) {
    console.error("注册失败:", error)
    return {
      success: false,
      message: "注册失败，请稍后重试",
      error: "REGISTER_FAILED",
    }
  }
}

// 获取用户信息
export async function getUserInfo(token: string): Promise<UserInfo | null> {
  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 从token中解析用户信息（实际应用中应该从服务器获取）
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      return JSON.parse(savedUser)
    }

    return null
  } catch (error) {
    console.error("获取用户信息失败:", error)
    return null
  }
}

// 用户登出
export async function logoutUser(): Promise<boolean> {
  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 清除本地存储
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    return true
  } catch (error) {
    console.error("登出失败:", error)
    return false
  }
}
