"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  username: string
  phoneNumber: string
  email?: string
  isLocalUser: boolean
  userType: "normal" | "creator" | "vip"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (phoneNumber: string, verificationCode: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储的用户信息
    const savedUser = localStorage.getItem("user")
    const savedToken = localStorage.getItem("token")

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("解析用户信息失败:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (phoneNumber: string, verificationCode: string): Promise<boolean> => {
    try {
      // 这里应该调用实际的登录API
      const isLocalUser =
        phoneNumber.startsWith("137") || phoneNumber.startsWith("138") || phoneNumber.startsWith("139")

      const userData: User = {
        id: `user_${Date.now()}`,
        username: `用户${phoneNumber.slice(-4)}`,
        phoneNumber,
        isLocalUser,
        userType: isLocalUser ? "vip" : "normal",
      }

      const token = `token_${Date.now()}`

      // 保存到本地存储
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", token)

      setUser(userData)
      return true
    } catch (error) {
      console.error("登录失败:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
