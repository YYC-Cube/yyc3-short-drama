"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Scroll, Sparkles, Users, Star, Compass, BarChart3, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// 导航项配置
const navigationItems = [
  {
    title: "河洛言语首府",
    subtitle: "主控制台",
    icon: Home,
    path: "/",
    color: "from-amber-500 to-amber-700",
    culturalSymbol: "🏛️",
  },
  {
    title: "文脉基因重构",
    subtitle: "数字化传承",
    icon: Scroll,
    path: "/cultural-gene",
    color: "from-emerald-500 to-emerald-700",
    culturalSymbol: "🧬",
  },
  {
    title: "智慧编剧工坊",
    subtitle: "AI创作引擎",
    icon: Sparkles,
    path: "/ai-script",
    color: "from-purple-500 to-purple-700",
    culturalSymbol: "✨",
  },
  {
    title: "虚实共生社群",
    subtitle: "交互体验",
    icon: Users,
    path: "/social-system",
    color: "from-blue-500 to-blue-700",
    culturalSymbol: "🌐",
  },
  {
    title: "星值经济赋能",
    subtitle: "价值转化",
    icon: Star,
    path: "/star-economy",
    color: "from-yellow-500 to-yellow-700",
    culturalSymbol: "⭐",
  },
  {
    title: "时空穿越体验",
    subtitle: "沉浸式创作",
    icon: Compass,
    path: "/cultural-crossing",
    color: "from-indigo-500 to-indigo-700",
    culturalSymbol: "🌀",
  },
  {
    title: "项目统筹管理",
    subtitle: "运营中枢",
    icon: BarChart3,
    path: "/project-management",
    color: "from-cyan-500 to-cyan-700",
    culturalSymbol: "📊",
  },
]

export default function MainSidebar() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      {/* 桌面侧边栏 */}
      <Sidebar className="hidden md:flex border-r border-amber-500/20 bg-black/30 backdrop-blur-xl" variant="sidebar">
        <SidebarHeader className="border-b border-amber-500/20 bg-gradient-to-r from-amber-900/20 to-purple-900/20">
          <div className="p-4">
            <h1 className="text-lg font-bold text-amber-300 tracking-wider">『言语』导演栈</h1>
            <p className="text-xs text-amber-200/70 mt-1">河洛文化数字传承平台</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive = pathname === item.path
              const Icon = item.icon

              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "transition-all duration-300 group relative overflow-hidden border",
                      isActive
                        ? "bg-gradient-to-r text-white shadow-xl border-amber-400/50"
                        : "text-amber-100/80 hover:text-white hover:bg-white/10 border-transparent hover:border-amber-500/30",
                    )}
                    style={
                      isActive
                        ? {
                            background: `linear-gradient(135deg, ${item.color.split(" ")[0]}, ${item.color.split(" ")[1]})`,
                          }
                        : {}
                    }
                    tooltip={item.title}
                  >
                    <Link href={item.path} className="flex items-center py-2">
                      <div className="text-lg mr-3 flex-shrink-0">{item.culturalSymbol}</div>
                      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <div className="flex flex-col items-start flex-1 min-w-0">
                        <span className="font-medium truncate text-left text-sm">{item.title}</span>
                        <span className="text-xs opacity-70 truncate text-left">{item.subtitle}</span>
                      </div>

                      {/* 活跃指示器 */}
                      {isActive && <div className="absolute right-2 w-2 h-2 bg-white rounded-full" />}

                      {/* 悬停光效 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-amber-500/20 bg-gradient-to-r from-amber-900/10 to-purple-900/10">
          <div className="p-4 flex items-center justify-between">
            <span className="text-xs text-amber-200/70">版本 1.0.0</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs">在线</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* 移动端菜单按钮 */}
      {isMobile && (
        <div className="md:hidden flex items-center justify-between p-4">
          <h1 className="text-lg font-bold text-amber-300 tracking-wider">『言语』导演栈</h1>
          <SidebarTrigger>
            {mobileMenuOpen ? <X className="h-6 w-6 text-amber-300" /> : <Menu className="h-6 w-6 text-amber-300" />}
          </SidebarTrigger>
        </div>
      )}

      {/* 移动端菜单 */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-black/30 backdrop-blur-xl border-r border-amber-500/20">
          {navigationItems.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon

            return (
              <Link key={item.path} href={item.path} className="flex items-center py-2 px-4">
                <div className="text-lg mr-3 flex-shrink-0">{item.culturalSymbol}</div>
                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="font-medium truncate text-left text-sm">{item.title}</span>
                  <span className="text-xs opacity-70 truncate text-left">{item.subtitle}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </SidebarProvider>
  )
}
