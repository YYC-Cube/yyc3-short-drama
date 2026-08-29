"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Dna,
  Star,
  Clock,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Crown,
  Zap,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  color: string
  culturalSymbol: string
  bgImage?: string
}

const navItems: NavItem[] = [
  {
    href: "/main",
    label: "河洛首府",
    icon: Crown,
    description: "文化中枢总览",
    color: "from-amber-500 to-orange-500",
    culturalSymbol: "🏛️",
    bgImage: "/images/yingtianmen.png",
  },
  {
    href: "/ai-script",
    label: "智慧编剧",
    icon: Sparkles,
    description: "AI创作引擎",
    color: "from-purple-500 to-pink-500",
    culturalSymbol: "✨",
    bgImage: "/images/behind-scenes-ar.png",
  },
  {
    href: "/cultural-gene",
    label: "文脉基因",
    icon: Dna,
    description: "传承密码解析",
    color: "from-emerald-500 to-teal-500",
    culturalSymbol: "🧬",
    bgImage: "/images/luoshen-digital.jpeg",
  },
  {
    href: "/social-system",
    label: "虚实共生",
    icon: Globe,
    description: "数字文化生态",
    color: "from-blue-500 to-cyan-500",
    culturalSymbol: "🌐",
    bgImage: "/images/luoshen-tech.jpeg",
  },
  {
    href: "/star-economy",
    label: "星值经济",
    icon: Star,
    description: "价值体系构建",
    color: "from-yellow-500 to-amber-500",
    culturalSymbol: "⭐",
    bgImage: "/images/yingtianmen-2.png",
  },
  {
    href: "/cultural-crossing",
    label: "时空穿越",
    icon: Clock,
    description: "沉浸体验之旅",
    color: "from-indigo-500 to-purple-500",
    culturalSymbol: "🌀",
    bgImage: "/images/behind-scenes.png",
  },
  {
    href: "/project-management",
    label: "统筹管理",
    icon: BarChart3,
    description: "运营中枢控制",
    color: "from-cyan-500 to-blue-500",
    culturalSymbol: "📊",
  },
]

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const sidebarWidth = isCollapsed ? "w-20" : "w-80"
  const contentMargin = isCollapsed ? "ml-20" : "ml-80"

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* 移动端菜单按钮 */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-4 left-4 z-50"
        >
          <Button
            variant="ghost"
            size="icon"
            className="glass-effect border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300 bg-black/60 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-amber-300" />
              ) : (
                <Menu className="w-5 h-5 text-amber-300" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      )}

      {/* 移动端遮罩 */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 侧边栏 */}
      <motion.aside
        initial={false}
        animate={{
          width: isMobile ? (isMobileMenuOpen ? 320 : 0) : isCollapsed ? 80 : 320,
          x: isMobile ? (isMobileMenuOpen ? 0 : -320) : 0,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed left-0 top-0 h-screen z-50 overflow-hidden",
          "bg-linear-to-b from-black/40 via-black/50 to-black/60",
          "backdrop-blur-xl border-r border-amber-500/20",
          "shadow-2xl shadow-black/50",
        )}
      >
        <div className="flex flex-col h-full relative">
          {/* 装饰性背景 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-amber-500 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-purple-500 to-transparent rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-linear-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl" />
          </div>

          {/* 头部 */}
          <div className="relative flex items-center justify-between p-6 border-b border-amber-500/20">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="w-12 h-12 bg-linear-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Crown className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="font-bold text-xl bg-linear-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
                      言语逸品
                    </h1>
                    <p className="text-sm text-amber-200/70 font-medium">河洛文化数字传承</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isMobile && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="w-10 h-10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300"
                >
                  <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {isCollapsed ? (
                      <ChevronRight className="w-5 h-5 text-amber-300" />
                    ) : (
                      <ChevronLeft className="w-5 h-5 text-amber-300" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            )}
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              const isHovered = hoveredItem === item.href
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                      "hover:bg-linear-to-r hover:from-amber-500/10 hover:to-orange-500/10",
                      "group cursor-pointer overflow-hidden",
                      isActive && "bg-linear-to-r from-amber-500/20 to-orange-500/20 shadow-lg shadow-amber-500/20",
                      isCollapsed && "justify-center",
                    )}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  >
                    {/* 背景图片 */}
                    {item.bgImage && isHovered && !isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-2xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.bgImage})` }}
                      />
                    )}

                    {/* 活跃指示器 */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={cn(
                          "absolute left-0 top-0 bottom-0 w-1 rounded-r-full",
                          `bg-linear-to-b ${item.color}`,
                        )}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* 悬浮光效 */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl"
                      animate={{
                        x: isHovered ? ["0%", "100%"] : "0%",
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                      }}
                    />

                    {/* 文化符号 */}
                    <motion.div
                      className="text-2xl z-10"
                      animate={{
                        rotate: isHovered ? [0, 10, -10, 0] : 0,
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.culturalSymbol}
                    </motion.div>

                    {/* 图标 */}
                    <motion.div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 z-10",
                        isActive ? `bg-linear-to-br ${item.color} shadow-lg` : "bg-white/5 group-hover:bg-white/10",
                      )}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon
                        className={cn(
                          "w-6 h-6 transition-colors duration-300",
                          isActive ? "text-white" : "text-amber-200/70 group-hover:text-amber-200",
                        )}
                      />
                    </motion.div>

                    {/* 文字内容 */}
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 min-w-0 z-10"
                        >
                          <div
                            className={cn(
                              "font-semibold text-lg transition-colors duration-300",
                              isActive ? "text-amber-200" : "text-amber-100/80 group-hover:text-amber-100",
                            )}
                          >
                            {item.label}
                          </div>
                          <div className="text-sm text-amber-200/50 group-hover:text-amber-200/70 transition-colors duration-300">
                            {item.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 悬浮提示（收缩状态） */}
                    {isCollapsed && !isMobile && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1 : 0.8,
                          x: isHovered ? 0 : -10,
                        }}
                        className="absolute left-full ml-4 px-4 py-3 bg-black/90 backdrop-blur-xs rounded-xl border border-amber-500/30 pointer-events-none whitespace-nowrap z-50 shadow-xl"
                      >
                        <div className="font-semibold text-amber-200">{item.label}</div>
                        <div className="text-sm text-amber-200/70">{item.description}</div>

                        {/* 箭头 */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black/90" />
                      </motion.div>
                    )}

                    {/* 状态指示器 */}
                    {isActive && !isCollapsed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full z-10"
                      >
                        <motion.div
                          className="absolute inset-0 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* 底部信息 */}
          <div className="relative p-6 border-t border-amber-500/20">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-3"
                >
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="text-sm text-green-400 font-medium">河洛系统运行正常</span>
                  </div>
                  <div className="text-xs text-amber-200/50">© 2024 言语逸品 · 河洛文化数字传承平台</div>
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-amber-200/30">版本 1.0.0 · 智能增强</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-2"
                >
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <Zap className="w-4 h-4 text-amber-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* 主内容区域 */}
      <main className={cn("min-h-screen transition-all duration-400", isMobile ? "ml-0" : contentMargin)}>
        <div className="h-screen overflow-y-auto scrollbar-hide">{children}</div>
      </main>
    </div>
  )
}
