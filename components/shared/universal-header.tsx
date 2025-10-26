"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, Settings, LogOut, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigationItems = [
  { name: "河洛首府", href: "/main", description: "文化中枢" },
  { name: "智慧编剧", href: "/ai-script", description: "AI创作引擎" },
  { name: "文脉基因", href: "/cultural-gene", description: "传承密码" },
  { name: "虚实共生", href: "/social-system", description: "文化社群" },
  { name: "星值经济", href: "/star-economy", description: "价值体系" },
  { name: "时空穿越", href: "/cultural-crossing", description: "沉浸体验" },
]

export default function UniversalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-amber-500/30 shadow-2xl shadow-black/50"
          : "bg-black/60 backdrop-blur-md border-b border-amber-500/20"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/main" className="flex items-center gap-3 group">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Crown className="w-6 h-6 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1
                className="font-bold text-xl bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                言语逸品
              </motion.h1>
              <p className="text-amber-300/80 text-sm font-medium">河洛文化数字传承平台</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`relative px-4 py-2 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300"
                        : "text-white/80 hover:text-amber-300 hover:bg-white/5"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-sm font-semibold">{item.name}</div>
                    <div className="text-xs text-amber-300/60 group-hover:text-amber-300/80 transition-colors">
                      {item.description}
                    </div>

                    {/* 活跃指示器 */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}

                    {/* 悬浮光效 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl"
                      animate={{
                        x: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* User Menu & Actions */}
          <div className="flex items-center gap-3">
            {/* 创作者认证标识 */}
            <motion.div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">河洛创作者</span>
            </motion.div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 hover:text-amber-200 transition-all duration-300"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-black/90 backdrop-blur-xl border-amber-500/30 shadow-2xl shadow-black/50 min-w-[200px]"
              >
                <div className="px-3 py-2 border-b border-amber-500/20">
                  <p className="text-amber-300 font-semibold">河洛文士</p>
                  <p className="text-amber-300/60 text-sm">创作者等级：LV.5</p>
                </div>
                <DropdownMenuItem className="text-white hover:text-amber-300 hover:bg-amber-500/10 focus:bg-amber-500/10 focus:text-amber-300">
                  <User className="w-4 h-4 mr-3" />
                  个人中心
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:text-amber-300 hover:bg-amber-500/10 focus:bg-amber-500/10 focus:text-amber-300">
                  <Settings className="w-4 h-4 mr-3" />
                  偏好设置
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:text-amber-300 hover:bg-amber-500/10 focus:bg-amber-500/10 focus:text-amber-300">
                  <Crown className="w-4 h-4 mr-3" />
                  创作者中心
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-amber-500/20" />
                <DropdownMenuItem className="text-red-300 hover:text-red-200 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-200">
                  <LogOut className="w-4 h-4 mr-3" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 hover:text-amber-200 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden py-4 border-t border-amber-500/20"
          >
            <div className="space-y-2">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300"
                          : "text-white/80 hover:text-amber-300 hover:bg-white/5"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-amber-300/60">{item.description}</div>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                        />
                      )}
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}

export { UniversalHeader }
