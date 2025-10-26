"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LogIn, User, Star, Award, LogOut } from "lucide-react"

export default function AuthStatus() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // 避免水合不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // 未登录状态
  if (!isAuthenticated) {
    return (
      <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <LogIn className="h-6 w-6 text-amber-400 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-white">登录以获取个性化创作体验</h3>
              <p className="text-white/70 text-sm">登录后可获得个性化推荐、保存创作历史、同步创作偏好等功能</p>
            </div>
          </div>

          <Button
            className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
            onClick={() => router.push("/auth")}
          >
            <LogIn className="h-4 w-4 mr-2" />
            登录/注册
          </Button>
        </div>
      </div>
    )
  }

  // 已登录状态
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <User className="h-6 w-6 text-amber-400 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-white">欢迎回来，{user.name}</h3>
            <div className="flex items-center text-white/70 text-sm">
              <span className="text-amber-300 mr-2">{user.level}</span>
              <span className="mx-2 flex items-center">
                <Star className="h-3 w-3 text-amber-400 mr-1" />
                {user.starValue.toLocaleString()}
              </span>
              <span className="mx-2 flex items-center">
                <Award className="h-3 w-3 text-purple-400 mr-1" />
                {user.tongbao}
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
            onClick={() => router.push("/profile")}
          >
            <User className="h-4 w-4 mr-2" />
            个人中心
          </Button>

          <Button
            variant="outline"
            className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            登出
          </Button>
        </div>
      </div>
    </div>
  )
}
