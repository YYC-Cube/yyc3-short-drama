"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  Compass,
  Scroll,
  Palette,
  Sparkles,
  MousePointer2,
  Keyboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const culturalSections = [
  {
    id: "luoshen",
    title: "洛神赋",
    subtitle: "数字化重现千古绝唱",
    description: "运用全息投影技术，让曹植笔下的洛神翩翩起舞，体验古典文学的视觉盛宴",
    images: ["/images/luoshen-digital.jpeg", "/images/luoshen-tech.jpeg"],
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
    href: "/cultural-crossing",
  },
  {
    id: "kaiyuan",
    title: "开元通宝",
    subtitle: "古币与数字货币的时空对话",
    description: "传统货币文化与现代数字经济的完美融合，探索价值传承的新形式",
    images: ["/images/luoshen-8.png", "/images/luoshen-5.png"],
    icon: Compass,
    gradient: "from-amber-500 to-orange-500",
    href: "/star-economy",
  },
  {
    id: "behind-scenes",
    title: "拍摄花絮",
    subtitle: "智能工具升级体验",
    description: "AR技术与传统文化的创新结合，让历史人物在现代舞台重新焕发生机",
    images: ["/images/behind-scenes.png", "/images/behind-scenes-ar.png"],
    icon: Palette,
    gradient: "from-blue-500 to-cyan-500",
    href: "/ai-script",
  },
  {
    id: "yingtianmen",
    title: "应天门",
    subtitle: "古建筑的数字重建",
    description: "运用3D建模技术重现盛唐建筑风貌，让千年古迹在虚拟世界中永恒存在",
    images: ["/images/yingtianmen.png", "/images/yingtianmen-2.png"],
    icon: Scroll,
    gradient: "from-green-500 to-emerald-500",
    href: "/cultural-gene",
  },
]

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // 图片自动切换
  useEffect(() => {
    if (!isAutoPlay) return

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0))
    }, 4000)

    return () => clearInterval(imageInterval)
  }, [isAutoPlay])

  // 页面自动切换
  useEffect(() => {
    if (!isAutoPlay) return

    const sectionInterval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % culturalSections.length)
      setCurrentImageIndex(0)
    }, 12000)

    return () => clearInterval(sectionInterval)
  }, [isAutoPlay])

  // 键盘导航
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          setCurrentSection((prev) => (prev > 0 ? prev - 1 : culturalSections.length - 1))
          setCurrentImageIndex(0)
          break
        case "ArrowDown":
          e.preventDefault()
          setCurrentSection((prev) => (prev + 1) % culturalSections.length)
          setCurrentImageIndex(0)
          break
        case " ":
          e.preventDefault()
          setIsAutoPlay((prev) => !prev)
          break
        case "Enter":
          window.location.href = "/main"
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  // 滚轮导航
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY

    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        setCurrentSection((prev) => (prev + 1) % culturalSections.length)
      } else {
        setCurrentSection((prev) => (prev > 0 ? prev - 1 : culturalSections.length - 1))
      }
      setCurrentImageIndex(0)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [handleWheel])

  const currentData = culturalSections[currentSection]
  const IconComponent = currentData.icon

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 主图片显示区域 */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-${currentImageIndex}`}
            initial={{ opacity: 0, scale: 1.1, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              rotateY: { duration: 1.5 },
            }}
            className="absolute inset-0"
          >
            <img
              src={currentData.images[currentImageIndex] || "/placeholder.svg"}
              alt={currentData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 顶部品牌标识 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-20"
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-black/20 backdrop-blur-md rounded-lg border border-white/10">
          <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">言</span>
          </div>
          <span className="text-white text-sm font-medium text-3d">言语逸品</span>
        </div>
      </motion.div>

      {/* 左侧信息栏 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 max-w-xs"
      >
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${currentData.gradient} bg-opacity-20 rounded-full mb-3`}
          >
            <IconComponent className="w-3 h-3 text-white" />
            <span className="text-white text-xs font-medium">第{currentSection + 1}章</span>
          </div>

          <h2 className="text-white text-lg font-bold mb-1 text-3d">{currentData.title}</h2>
          <h3 className="text-amber-300 text-sm font-medium mb-2">{currentData.subtitle}</h3>
          <p className="text-white/70 text-xs leading-relaxed">{currentData.description}</p>
        </div>
      </motion.div>

      {/* 右侧导航栏 */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-3 border border-white/10">
          {/* 页面指示器 */}
          <div className="space-y-2 mb-4">
            {culturalSections.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSection(index)
                  setCurrentImageIndex(0)
                }}
                className={`w-8 h-1 rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? `bg-gradient-to-r ${currentData.gradient}`
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* 图片切换指示器 */}
          <div className="flex gap-1 mb-4">
            {[0, 1].map((index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? `bg-gradient-to-r ${currentData.gradient}` : "bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* 播放控制 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="w-8 h-8 text-white hover:text-amber-300 hover:bg-white/10"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>
      </motion.div>

      {/* 顶部翻页控制 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 right-4 z-20"
      >
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setCurrentSection((prev) => (prev > 0 ? prev - 1 : culturalSections.length - 1))
              setCurrentImageIndex(0)
            }}
            className="w-8 h-8 bg-black/20 backdrop-blur-md border border-white/10 text-white hover:text-amber-300 hover:bg-white/10"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setCurrentSection((prev) => (prev + 1) % culturalSections.length)
              setCurrentImageIndex(0)
            }}
            className="w-8 h-8 bg-black/20 backdrop-blur-md border border-white/10 text-white hover:text-amber-300 hover:bg-white/10"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* 底部信息栏 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        {/* 进度条 */}
        <div className="h-1 bg-black/20">
          <motion.div
            className={`h-full bg-gradient-to-r ${currentData.gradient}`}
            initial={{ width: "0%" }}
            animate={{ width: `${((currentSection + 1) / culturalSections.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        <div className="bg-black/20 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* 操作提示 */}
            <div className="flex items-center gap-6 text-white/60 text-xs">
              <div className="flex items-center gap-1">
                <MousePointer2 className="w-3 h-3" />
                <span>点击任意位置进入</span>
              </div>
              <div className="flex items-center gap-1">
                <Keyboard className="w-3 h-3" />
                <span>↑↓ 翻页 | 空格 暂停 | 回车 进入</span>
              </div>
            </div>

            {/* 进入按钮 */}
            <Link href="/main">
              <Button
                className={`bg-gradient-to-r ${currentData.gradient} hover:opacity-90 text-white px-6 py-2 text-sm font-medium`}
              >
                进入河洛文化平台
              </Button>
            </Link>

            {/* 页面计数 */}
            <div className="text-white/60 text-xs">
              {currentSection + 1} / {culturalSections.length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 全屏点击进入 */}
      <Link href="/main" className="absolute inset-0 z-10 cursor-pointer" />
    </div>
  )
}
