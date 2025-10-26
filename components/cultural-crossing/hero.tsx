"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Map, Users, Sparkles } from "lucide-react"

export default function CulturalCrossingHero() {
  const [timelinePosition, setTimelinePosition] = useState(0)
  const timelineEras = ["北魏", "隋朝", "唐朝", "宋朝", "现代", "未来"]

  // 自动切换时代
  useEffect(() => {
    const interval = setInterval(() => {
      setTimelinePosition((prev) => (prev + 1) % timelineEras.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景图层 - 随时间线变化 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          key={timelinePosition}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={`/placeholder.svg?height=1080&width=1920&text=${timelineEras[timelinePosition]}时期洛阳`}
            alt={`${timelineEras[timelinePosition]}时期洛阳`}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      {/* 内容 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 mb-6">
            言语逸品云享 · 文化穿越
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
            跨越时空的创作体验，让历史与现代交织，文化与科技共舞
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-lg py-6 px-8">
              <Sparkles className="mr-2 h-5 w-5" />
              开启穿越之旅
            </Button>
            <Button
              variant="outline"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-lg py-6 px-8"
            >
              <Users className="mr-2 h-5 w-5" />
              探索数字演员
            </Button>
          </div>

          {/* 时间线 */}
          <div className="relative max-w-2xl mx-auto">
            <div className="h-1 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20 rounded-full mb-4"></div>
            <div className="absolute top-0 left-0 right-0">
              <motion.div
                className="w-3 h-3 bg-amber-500 rounded-full -mt-1 relative"
                animate={{ left: `${(timelinePosition / (timelineEras.length - 1)) * 100}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-amber-500 text-black px-3 py-1 rounded text-sm font-medium">
                  {timelineEras[timelinePosition]}
                </div>
              </motion.div>
            </div>
            <div className="flex justify-between">
              {timelineEras.map((era, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full -mt-4 ${
                    index === timelinePosition ? "bg-amber-400" : "bg-amber-500/30"
                  }`}
                  onClick={() => setTimelinePosition(index)}
                ></div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 特性指标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 text-center"
          >
            <Clock className="h-10 w-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">时空折叠</h3>
            <p className="text-white/70">穿梭于十三朝古都的不同时期，体验历史变迁与文化演进</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 text-center"
          >
            <Users className="h-10 w-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">数字演员</h3>
            <p className="text-white/70">与历史名人、文化传承人互动，或创建自己的数字分身</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 text-center"
          >
            <Map className="h-10 w-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">文化传承</h3>
            <p className="text-white/70">创作即保护，演绎即传承，构建可持续的文化生态系统</p>
          </motion.div>
        </div>
      </div>

      {/* 装饰元素 */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
