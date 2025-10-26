"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

const culturalSlides = [
  {
    id: 1,
    title: "洛神女·文脉传承",
    subtitle: "文化基因密码",
    description: "解码中华文脉，传承千年文化基因，古韵新声永流传",
    image: "/images/luoshen-digital.jpeg",
    theme: "from-emerald-600 via-teal-600 to-cyan-600",
    culturalSymbol: "🧬",
  },
  {
    id: 2,
    title: "洛神女·数字重生",
    subtitle: "虚实共生体验",
    description: "科技赋能传统文化，构建全新数字文化生态系统",
    image: "/images/luoshen-tech.jpeg",
    theme: "from-blue-600 via-indigo-600 to-purple-600",
    culturalSymbol: "🌐",
  },
  {
    id: 3,
    title: "应天门·盛世华章",
    subtitle: "河洛文化中心",
    description: "古都洛阳，文明之光，华夏文化数字传承",
    image: "/images/yingtianmen.png",
    theme: "from-amber-600 via-orange-600 to-red-600",
    culturalSymbol: "🏛️",
  },
  {
    id: 4,
    title: "应天门·夜景辉煌",
    subtitle: "时空穿越体验",
    description: "穿越千年时光，感受盛唐气象",
    image: "/images/yingtianmen-2.png",
    theme: "from-indigo-600 via-purple-600 to-pink-600",
    culturalSymbol: "🌀",
  },
  {
    id: 5,
    title: "智能导演栈",
    subtitle: "AI创作引擎",
    description: "拍摄花絮，智能工具升级，创作者的数字化工作台",
    image: "/images/behind-scenes.png",
    theme: "from-purple-600 via-pink-600 to-red-600",
    culturalSymbol: "✨",
  },
]

export default function CulturalCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % culturalSlides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % culturalSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + culturalSlides.length) % culturalSlides.length)
  }

  const currentSlideData = culturalSlides[currentSlide]

  return (
    <section className="relative h-screen overflow-hidden">
      {/* 主轮播内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* 背景图片 */}
          <div className="relative w-full h-full">
            <Image
              src={currentSlideData.image || "/placeholder.svg"}
              alt={currentSlideData.title}
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />

            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
            <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.theme} opacity-20`} />
          </div>

          {/* 文字内容 */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {/* 文化符号 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <span className="text-4xl">{currentSlideData.culturalSymbol}</span>
                  <div
                    className={`px-4 py-2 bg-gradient-to-r ${currentSlideData.theme} bg-opacity-20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium`}
                  >
                    河洛文化传承
                  </div>
                </motion.div>

                {/* 主标题 */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className={`bg-gradient-to-r ${currentSlideData.theme} bg-clip-text text-transparent`}>
                    {currentSlideData.title}
                  </span>
                </h1>

                {/* 副标题 */}
                <h2 className="text-xl md:text-3xl text-white/90 font-medium mb-6">{currentSlideData.subtitle}</h2>

                {/* 描述文字 */}
                <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
                  {currentSlideData.description}
                </p>

                {/* 品牌标识 */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-xl">言</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">言语逸品</h3>
                    <p className="text-amber-300 text-base">河洛文化数字传承平台</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 控制按钮 */}
      <div className="absolute top-8 right-8 z-30 flex gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 hover:border-amber-500/50 transition-all duration-300"
        >
          {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
        </Button>
      </div>

      {/* 导航箭头 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 hover:border-amber-500/50 transition-all duration-300"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 hover:border-amber-500/50 transition-all duration-300"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </Button>

      {/* 轮播指示器 */}
      <div className="absolute bottom-8 left-8 flex space-x-4 z-20">
        {culturalSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative transition-all duration-500 ${index === currentSlide ? "w-12 h-3" : "w-3 h-3"}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={`w-full h-full rounded-full transition-all duration-500 ${
                index === currentSlide ? `bg-gradient-to-r ${currentSlideData.theme} shadow-lg` : "bg-white/30"
              }`}
            />
            {index === currentSlide && (
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentSlideData.theme}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                key={currentSlide}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* 版权信息 */}
      <div className="absolute top-8 left-8 text-white/60 text-sm z-20">
        <div>© 2024 言语逸品</div>
        <div>河洛文化数字传承平台</div>
      </div>

      {/* 当前模块标识 */}
      <div className="absolute top-8 right-8 text-right z-20 mr-20">
        <div className={`text-sm font-medium bg-gradient-to-r ${currentSlideData.theme} bg-clip-text text-transparent`}>
          河洛文化传承
        </div>
        <div className="text-white/60 text-xs mt-1">
          {String(currentSlide + 1).padStart(2, "0")} / {String(culturalSlides.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  )
}
