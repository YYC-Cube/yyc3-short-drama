"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  username: string
  phone: string
  email?: string
  avatar?: string
  level: string
  star_coins: number
  is_local_user: boolean
  user_type: "normal" | "creator" | "vip"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (phone: string, code: string) => Promise<void>
  register: (username: string, phone: string, code: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 初始化时获取用户信息
  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("获取用户信息失败:", error)
    } finally {
      setLoading(false)
    }
  }

  async function login(phone: string, code: string) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "登录失败")
    }

    const data = await response.json()
    setUser(data.user)

    // 延迟跳转，显示成功提示
    setTimeout(() => {
      router.push("/main")
    }, 1500)
  }

  async function register(username: string, phone: string, code: string) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, phone, code }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "注册失败")
    }

    const data = await response.json()
    setUser(data.user)

    setTimeout(() => {
      router.push("/main")
    }, 1500)
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push("/auth")
  }

  async function refreshUser() {
    await fetchUser()
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
