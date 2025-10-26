"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Star,
  Menu,
  X,
  BarChart3,
  Scroll,
  Sparkles,
  Crown,
  Compass,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// 河洛文化导航项配置 - 统一六字格式
const navigationItems = [
  {
    id: "home",
    title: "河洛言语首府",
    subtitle: "主控制台",
    icon: Home,
    path: "/",
    color: "from-amber-500 to-amber-700",
    culturalSymbol: "🏛️",
  },
  {
    id: "cultural-gene",
    title: "文脉基因重构",
    subtitle: "数字化传承",
    icon: Scroll,
    path: "/cultural-gene",
    color: "from-emerald-500 to-emerald-700",
    culturalSymbol: "🧬",
  },
  {
    id: "ai-script",
    title: "智慧编剧工坊",
    subtitle: "AI创作引擎",
    icon: Sparkles,
    path: "/ai-script",
    color: "from-purple-500 to-purple-700",
    culturalSymbol: "✨",
  },
  {
    id: "social-system",
    title: "虚实共生社群",
    subtitle: "交互体验",
    icon: Users,
    path: "/social-system",
    color: "from-blue-500 to-blue-700",
    culturalSymbol: "🌐",
  },
  {
    id: "star-economy",
    title: "星值经济赋能",
    subtitle: "价值转化",
    icon: Star,
    path: "/star-economy",
    color: "from-yellow-500 to-yellow-700",
    culturalSymbol: "⭐",
  },
  {
    id: "cultural-crossing",
    title: "时空穿越体验",
    subtitle: "沉浸式创作",
    icon: Compass,
    path: "/cultural-crossing",
    color: "from-indigo-500 to-indigo-700",
    culturalSymbol: "🌀",
  },
  {
    id: "project-management",
    title: "项目统筹管理",
    subtitle: "运营中枢",
    icon: Crown,
    path: "/project-management",
    color: "from-cyan-500 to-cyan-700",
    culturalSymbol: "👑",
  },
  {
    id: "functionality-report",
    title: "功能分析报告",
    subtitle: "数据洞察",
    icon: BarChart3,
    path: "/functionality-report",
    color: "from-rose-500 to-rose-700",
    culturalSymbol: "📊",
  },
]

// 河洛文化面包屑路径映射
const breadcrumbMap: Record<string, { title: string; parent?: string; description?: string }> = {
  "/": { title: "河洛言语首府", description: "数字文化传承平台主控制台" },
  "/cultural-gene": { title: "文脉基因重构", parent: "/", description: "传统文化数字化重构与传承" },
  "/ai-script": { title: "智慧编剧工坊", parent: "/", description: "AI驱动的智能剧本创作系统" },
  "/social-system": { title: "虚实共生社群", parent: "/", description: "虚拟与现实融合的社交体验" },
  "/star-economy": { title: "星值经济赋能", parent: "/", description: "文化价值的经济转化机制" },
  "/cultural-crossing": { title: "时空穿越体验", parent: "/", description: "跨越时空的沉浸式文化体验" },
  "/project-management": { title: "项目统筹管理", parent: "/", description: "全方位项目管理与监控" },
  "/functionality-report": { title: "功能分析报告", parent: "/", description: "系统功能完整度分析与评估" },
  "/auth": { title: "用户身份认证", parent: "/", description: "安全的用户身份验证系统" },
  "/profile": { title: "个人文化档案", parent: "/", description: "用户个性化文化档案管理" },
}

interface AdaptiveLayoutProps {
  children: React.ReactNode
}

export default function AdaptiveLayout({ children }: AdaptiveLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const pathname = usePathname()
  const router = useRouter()

  // 实时时间更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 生成面包屑
  const generateBreadcrumbs = () => {
    const breadcrumbs = []
    let currentPath = pathname

    while (currentPath && breadcrumbMap[currentPath]) {
      const item = breadcrumbMap[currentPath]
      breadcrumbs.unshift({
        title: item.title,
        path: currentPath,
        description: item.description,
        isLast: currentPath === pathname,
      })
      currentPath = item.parent || ""
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()
  const currentPage = breadcrumbMap[pathname]

  // 处理导航点击
  const handleNavigation = (path: string) => {
    router.push(path)
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  // 侧边栏宽度计算
  const sidebarWidth = sidebarCollapsed ? "4rem" : "18rem"

  // 格式化时间显示
  const formatTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString("zh-CN", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      date: date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }),
    }
  }

  const timeDisplay = formatTime(currentTime)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* 左侧导航栏 */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 h-full bg-black/30 backdrop-blur-xl border-r border-amber-500/20 z-40 transition-all duration-300 ease-in-out shadow-2xl",
          isMobile ? "w-0 overflow-hidden" : "",
        )}
        style={{ width: isMobile ? 0 : sidebarWidth }}
        initial={false}
        animate={{ width: isMobile ? 0 : sidebarWidth }}
      >
        {/* 侧边栏头部 - 河洛文化标识 */}
        <div className="p-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-900/20 to-purple-900/20">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-lg font-bold text-amber-300 tracking-wider">『言语』导演栈</h1>
                <p className="text-xs text-amber-200/70 mt-1">河洛文化数字传承平台</p>
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-amber-300 hover:bg-amber-500/20 p-1 h-8 w-8 border border-amber-500/30"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.path
              const Icon = item.icon

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full flex items-center p-3 rounded-xl transition-all duration-300 group relative overflow-hidden border",
                    isActive
                      ? "bg-gradient-to-r text-white shadow-xl border-amber-400/50 shadow-amber-500/20"
                      : "text-amber-100/80 hover:text-white hover:bg-white/10 border-transparent hover:border-amber-500/30",
                  )}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${item.color.split(" ")[1]}, ${item.color.split(" ")[3]})`,
                        }
                      : {}
                  }
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* 文化符号 */}
                  <div className={cn("text-lg mr-3 flex-shrink-0", sidebarCollapsed ? "mx-auto" : "")}>
                    {item.culturalSymbol}
                  </div>

                  {/* 图标 */}
                  <Icon className={cn("h-5 w-5 flex-shrink-0", sidebarCollapsed ? "hidden" : "mr-3")} />

                  {/* 标题和副标题 */}
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.div
                        className="flex flex-col items-start flex-1 min-w-0"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="font-medium truncate text-left text-sm">{item.title}</span>
                        <span className="text-xs opacity-70 truncate text-left">{item.subtitle}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 活跃指示器 */}
                  {isActive && (
                    <motion.div
                      className="absolute right-2 w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  )}

                  {/* 悬停光效 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.button>
              )
            })}
          </div>
        </nav>

        {/* 侧边栏底部 - 版本信息 */}
        <div className="p-4 border-t border-amber-500/20 bg-gradient-to-r from-amber-900/10 to-purple-900/10">
          <div className={cn("text-xs text-amber-200/70", sidebarCollapsed ? "text-center" : "")}>
            {sidebarCollapsed ? (
              <div className="flex flex-col items-center space-y-1">
                <span>v1.0</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span>版本 1.0.0</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">在线</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* 移动端菜单按钮 */}
      {isMobile && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-50 bg-black/40 backdrop-blur-sm text-amber-300 hover:bg-black/60 border border-amber-500/30"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* 移动端侧边栏 */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <>
            {/* 遮罩层 */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* 移动端菜单 */}
            <motion.div
              className="fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-xl border-r border-amber-500/20 z-50 shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* 移动端头部 */}
              <div className="p-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-900/20 to-purple-900/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-bold text-amber-300 tracking-wider">『言语』导演栈</h1>
                    <p className="text-xs text-amber-200/70 mt-1">河洛文化数字传承平台</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-amber-300 hover:bg-amber-500/20 p-1 h-8 w-8 border border-amber-500/30"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* 移动端导航 */}
              <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                <div className="space-y-3">
                  {navigationItems.map((item, index) => {
                    const isActive = pathname === item.path
                    const Icon = item.icon

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavigation(item.path)}
                        className={cn(
                          "w-full flex items-center p-4 rounded-xl transition-all duration-300 border",
                          isActive
                            ? "bg-gradient-to-r text-white shadow-xl border-amber-400/50"
                            : "text-amber-100/80 hover:text-white hover:bg-white/10 border-transparent hover:border-amber-500/30",
                        )}
                        style={
                          isActive
                            ? {
                                background: `linear-gradient(135deg, ${item.color.split(" ")[1]}, ${item.color.split(" ")[3]})`,
                              }
                            : {}
                        }
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-lg mr-3 flex-shrink-0">{item.culturalSymbol}</div>
                        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <div className="flex flex-col items-start flex-1">
                          <span className="font-medium text-left text-sm">{item.title}</span>
                          <span className="text-xs opacity-70 text-left">{item.subtitle}</span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 主内容区域 */}
      <main
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out relative z-10"
        style={{ marginLeft: isMobile ? 0 : sidebarWidth }}
      >
        {/* 面包屑导航栏 */}
        <motion.header
          className="bg-black/20 backdrop-blur-xl border-b border-amber-500/20 px-6 py-4 sticky top-0 z-30 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            {/* 左侧面包屑 */}
            <div className="flex flex-col space-y-2">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.path} className="flex items-center">
                      <BreadcrumbItem>
                        {crumb.isLast ? (
                          <BreadcrumbPage className="text-amber-300 font-medium text-lg">{crumb.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={crumb.path}
                            className="text-amber-100/80 hover:text-amber-300 transition-colors text-sm"
                            onClick={(e) => {
                              e.preventDefault()
                              handleNavigation(crumb.path)
                            }}
                          >
                            {crumb.title}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="text-amber-500/50 mx-2" />}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>

              {/* 页面描述 */}
              {currentPage?.description && (
                <motion.p
                  className="text-xs text-amber-200/60 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentPage.description}
                </motion.p>
              )}
            </div>

            {/* 右侧状态信息 */}
            <div className="flex items-center space-x-4">
              {/* 时间显示 */}
              <div className="hidden md:flex flex-col items-end text-right">
                <div className="text-sm font-mono text-amber-300">{timeDisplay.time}</div>
                <div className="text-xs text-amber-200/60">{timeDisplay.date}</div>
              </div>

              {/* 系统状态指示器 */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 hidden sm:inline">系统正常</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* 页面内容容器 */}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-transparent to-black/10">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full min-h-[calc(100vh-5rem)]"
          >
            {/* 内容区域装饰边框 */}
            <div className="h-full relative">
              <div className="absolute inset-0 border border-amber-500/10 rounded-tl-3xl m-4 pointer-events-none"></div>
              <div className="h-full p-6">{children}</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
