"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { UserCircle, LogIn } from "lucide-react"

const emptySubscribe = () => () => {}

export default function AuthNavLinks() {
  const { user, isAuthenticated } = useAuth()
  // useSyncExternalStore 替代 useEffect+setState 的 mounted 模式（避免水合不匹配的官方范式）
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return null
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/profile" className="flex items-center text-white/80 hover:text-amber-300 transition-colors">
          <UserCircle className="h-5 w-5 mr-1" />
          <span className="hidden md:inline">个人中心</span>
        </Link>

        <Link href="/auth" className="flex items-center text-white/80 hover:text-amber-300 transition-colors">
          <LogIn className="h-5 w-5 mr-1" />
          <span className="hidden md:inline">登录/注册</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Link href="/profile" className="flex items-center text-white/80 hover:text-amber-300 transition-colors">
        <Avatar className="h-8 w-8 border border-amber-500/30">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-amber-900/50 text-amber-300">{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="hidden md:inline ml-2">{user.name}</span>
      </Link>
    </div>
  )
}
