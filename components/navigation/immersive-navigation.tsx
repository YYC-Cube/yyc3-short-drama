"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation, useMotionValue } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Scroll,
  BookOpen,
  Sparkles,
  Star,
  Code,
  Palette,
  Zap,
  Database,
  Leaf,
  Clock,
  Globe,
  Heart,
  Users,
  Shield,
  TrendingUp,
  Map,
  Brain,
  Eye,
  Radio,
  Atom,
  Infinity,
} from "lucide-react"

// 在导入部分添加
import AuthNavLinks from "./auth-nav-links"

// 导航项数据
const navigationItems = [
  {
    id: 1,
    title: "文化基因数字化重构",
    icon: <Scroll className="h-6 w-6" />,
    color: "from-amber-300 to-amber-600",
    path: "/cultural-gene",
  },
  {
    id: 2,
    title: "AI编剧系统",
    icon: <BookOpen className="h-6 w-6" />,
    color: "from-amber-300 to-amber-600",
    path: "/ai-script",
  },
  {
    id: 3,
    title: "虚实共生社交��系",
    icon: <Users className="h-6 w-6" />,
    color: "from-emerald-300 to-emerald-600",
    path: "/social-system",
  },
  {
    id: 4,
    title: "星值经济文化赋能",
    icon: <Star className="h-6 w-6" />,
    color: "from-purple-300 to-purple-600",
    path: "/star-economy",
  },
  {
    id: 5,
    title: "技术实现路径",
    icon: <Code className="h-6 w-6" />,
    color: "from-blue-300 to-blue-600",
    path: "/tech-path",
  },
  {
    id: 6,
    title: "沉漫式创作工具升级",
    icon: <Palette className="h-6 w-6" />,
    color: "from-red-300 to-red-600",
    path: "/creation-tools",
  },
  {
    id: 7,
    title: "文化裂变运营策略",
    icon: <Zap className="h-6 w-6" />,
    color: "from-yellow-300 to-yellow-600",
    path: "/cultural-strategy",
  },
  {
    id: 8,
    title: "数据智能中枢建设",
    icon: <Database className="h-6 w-6" />,
    color: "from-cyan-300 to-cyan-600",
    path: "/data-intelligence",
  },
  {
    id: 9,
    title: "可持续发展架构",
    icon: <Leaf className="h-6 w-6" />,
    color: "from-green-300 to-green-600",
    path: "/sustainable-arch",
  },
  {
    id: 10,
    title: "阶段实施路线图",
    icon: <Clock className="h-6 w-6" />,
    color: "from-orange-300 to-orange-600",
    path: "/roadmap",
  },
  {
    id: 11,
    title: "跨界融合创新模块",
    icon: <Globe className="h-6 w-6" />,
    color: "from-indigo-300 to-indigo-600",
    path: "/cross-innovation",
  },
  {
    id: 12,
    title: "情感化体验升级",
    icon: <Heart className="h-6 w-6" />,
    color: "from-pink-300 to-pink-600",
    path: "/emotional-exp",
  },
  {
    id: 13,
    title: "创作者成长生态",
    icon: <BookOpen className="h-6 w-6" />,
    color: "from-lime-300 to-lime-600",
    path: "/creator-growth",
  },
  {
    id: 14,
    title: "技术伦理防火墙",
    icon: <Shield className="h-6 w-6" />,
    color: "from-rose-300 to-rose-600",
    path: "/tech-ethics",
  },
  {
    id: 15,
    title: "价值转化加速器",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "from-amber-300 to-amber-600",
    path: "/value-accelerator",
  },
  {
    id: 16,
    title: "进化路线图2.0",
    icon: <Map className="h-6 w-6" />,
    color: "from-teal-300 to-teal-600",
    path: "/evolution-map",
  },
  {
    id: 17,
    title: "文化认知深化工程",
    icon: <Brain className="h-6 w-6" />,
    color: "from-violet-300 to-violet-600",
    path: "/cultural-cognition",
  },
  {
    id: 18,
    title: "多维感知增强方案",
    icon: <Eye className="h-6 w-6" />,
    color: "from-fuchsia-300 to-fuchsia-600",
    path: "/multi-perception",
  },
  {
    id: 19,
    title: "全球化传播引擎",
    icon: <Radio className="h-6 w-6" />,
    color: "from-sky-300 to-sky-600",
    path: "/global-engine",
  },
  {
    id: 20,
    title: "量子跃迁预备方案",
    icon: <Atom className="h-6 w-6" />,
    color: "from-purple-300 to-purple-600",
    path: "/quantum-leap",
  },
  {
    id: 21,
    title: "永恒轮回生态机制",
    icon: <Infinity className="h-6 w-6" />,
    color: "from-amber-300 to-amber-600",
    path: "/eternal-cycle",
  },
]

// 水墨粒子效果组件
const InkParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles: any[] = useRef([]).current
  const mousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // 粒子类
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      decay: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 15 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 30)}, ${Math.floor(Math.random() * 5)}, `
        this.alpha = 1
        this.decay = Math.random() * 0.015 + 0.005
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.alpha -= this.decay

        if (this.size > 0.2) this.size -= 0.1
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color + this.alpha + ")"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.x, y: e.y }

      // 添加新粒子
      if (Math.random() > 0.9) {
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(e.x, e.y))
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // 动画循环
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw(ctx)

        if (particles[i].alpha <= 0) {
          particles.splice(i, 1)
          i--
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [particles])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
}

// 八卦图组件
const BaguaSymbol = ({ active, onClick }: { active: boolean; onClick: () => void }) => {
  const controls = useAnimation()

  useEffect(() => {
    if (active) {
      controls.start({
        rotate: 360,
        transition: { duration: 20, ease: "linear", repeat: Infinity },
      })
    } else {
      controls.start({
        rotate: 0,
        transition: { duration: 0.5 },
      })
    }
  }, [active, controls])

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 cursor-pointer z-20"
      animate={controls}
      onClick={onClick}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" />
        <path
          d="M50,10 A40,40 0 0,1 90,50 A40,40 0 0,1 50,90 A40,40 0 0,1 10,50 A40,40 0 0,1 50,10 Z"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1"
        />
        <circle cx="50" cy="25" r="15" fill="black" stroke="url(#goldGradient)" strokeWidth="1" />
        <circle cx="50" cy="25" r="5" fill="url(#goldGradient)" />
        <circle cx="50" cy="75" r="15" fill="url(#goldGradient)" stroke="black" strokeWidth="1" />
        <circle cx="50" cy="75" r="5" fill="black" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="url(#goldGradient)" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="url(#goldGradient)" strokeWidth="0.5" />
      </svg>
    </motion.div>
  )
}

// 主导航组件
export default function ImmersiveNavigation() {
  const [activeView, setActiveView] = useState<"grid" | "circle">("grid")
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // 鼠标位置跟踪
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // 切换视图
  const toggleView = () => {
    setActiveView((prev) => (prev === "grid" ? "circle" : "grid"))
    setIsExpanded(false)
    setActiveItem(null)
  }

  // 处理导航项点击
  const handleItemClick = (id: number, path: string) => {
    if (activeItem === id) {
      router.push(path)
    } else {
      setActiveItem(id)
    }
  }

  // 圆形布局计算
  const getCirclePosition = (index: number, total: number) => {
    const radius = 200
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return { x, y }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black" ref={containerRef}>
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E4%BA%91%E7%BA%B9%E5%85%A8%E6%81%AF%E5%8F%B0%E4%B8%8A%E3%80%8A%E6%B4%9B%E7%A5%9E%E8%B5%8B%E5%9B%BE%E3%80%8B%E5%AE%9E%E6%97%B6%E8%A7%A3%E6%9E%84%E9%87%8D%E7%BB%84%EF%BC%8C%E7%94%A8%E6%88%B7%E8%99%9A%E6%8B%9F%E5%8C%96%E8%BA%AB%E7%A9%BF%E8%B6%8A%E6%97%B6%E8%A7%A6%E5%8F%91%E9%87%91%E8%89%B2%E6%95%B0%E6%8D%AE%E6%B6%9F%E6%BC%AA%EF%BC%8CAR%E7%9C%BC%E9%95%9C%E6%A1%86%E6%B5%81%E6%B7%8C%E7%94%B2%E9%AA%A8%E6%96%87%E5%BD%A2%E6%80%81%E5%BC%B9%E5%B9%95%E6%B5%81%EF%BC%8C%E9%9C%9E%E8%A3%B3%E9%A3%98%E5%B8%A6%E8%BF%90%E7%94%A8%E6%9F%94%E4%BD%93%E5%8A%A8%E5%2%A7%E5%AD%A6%E6%A8%A1%E6%8B%9F%EF%BC%8C%E4%B8%89%E7%BB%B4%E6%96%87%E7%89%A9%E6%89%AB%E6%8F%8F%E7%B2%BE%E5%BA%A6.png-fXy4fVKgVLmqxn5oM3Jc6a32AWu5Lc.jpeg"
          alt="云纹全息台上《洛神赋图》"
          fill
          className="object-cover brightness-[0.4] transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      {/* 水墨粒子效果 */}
      <InkParticles />

      {/* 标题 */}
      <motion.h1
        className="absolute top-8 left-1/2 -translate-x-1/2 text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 z-10 text-center whitespace-nowrap"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        『言语』逸品云享智能短剧·导演栈
      </motion.h1>

      {/* 视图切换按钮 */}
      <motion.button
        className="absolute top-8 right-8 z-30 bg-black/30 backdrop-blur-md border border-amber-500/30 rounded-full p-3 text-amber-400 hover:text-amber-300 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleView}
      >
        {activeView === "grid" ? <Sparkles className="h-5 w-5" /> : <Scroll className="h-5 w-5" />}
      </motion.button>

      {/* 认证导航链接 */}
      <div className="absolute top-8 right-24 z-30">
        <AuthNavLinks />
      </div>

      {/* 八卦图标 */}
      <BaguaSymbol active={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />

      {/* 网格视图 */}
      <AnimatePresence mode="wait">
        {activeView === "grid" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-8 md:p-16 max-w-7xl mx-auto mt-16"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {navigationItems.map((item) => (
                <motion.div
                  key={item.id}
                  className={cn(
                    "relative flex flex-col items-center justify-center p-4 rounded-lg backdrop-blur-md border border-white/10 cursor-pointer group overflow-hidden",
                    activeItem === item.id ? "bg-white/20" : "bg-black/30 hover:bg-black/40",
                  )}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleItemClick(item.id, item.path)}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />

                  <motion.div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-black/50 text-white",
                      `bg-gradient-to-br ${item.color}`,
                    )}
                  >
                    {item.icon}
                  </motion.div>

                  <h3 className="text-center text-white font-medium text-sm md:text-base">{item.title}</h3>

                  {activeItem === item.id && (
                    <motion.div
                      className="absolute bottom-2 right-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Sparkles className="h-4 w-4 text-amber-300" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* 圆形视图 */}
        {activeView === "circle" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-full">
              {navigationItems.map((item, index) => {
                const position = getCirclePosition(index, navigationItems.length)
                return (
                  <motion.div
                    key={item.id}
                    className={cn(
                      "absolute flex items-center justify-center p-2 rounded-full backdrop-blur-md cursor-pointer",
                      activeItem === item.id
                        ? "bg-white/20 border-2 border-amber-500"
                        : "bg-black/30 border border-white/10",
                    )}
                    style={{ width: "120px", height: "120px" }}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: 1,
                      x: isExpanded ? position.x : 0,
                      y: isExpanded ? position.y : 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: isExpanded ? index * 0.05 : 0,
                      },
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleItemClick(item.id, item.path)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full mb-1 text-white",
                          `bg-gradient-to-br ${item.color}`,
                        )}
                      >
                        {item.icon}
                      </motion.div>

                      <h3 className="text-center text-white font-medium text-xs leading-tight">{item.title}</h3>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部信息 */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        © 2024 『言语』逸品云享 · 数字文化传承
      </motion.div>
    </div>
  )
}
