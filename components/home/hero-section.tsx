"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 背景图片 */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%89%AF%E6%A0%87%E9%A2%98.png-AzjqW3gR69o695uc8xrEariVS2XuV0.jpeg"
          alt="言语逸品云享智能短剧导演栈"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* 交互按钮 */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white border-none"
        >
          开启创作之旅
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-amber-500/50 text-amber-300 hover:bg-amber-500/10 backdrop-blur-sm"
        >
          探索河洛文化
        </Button>
      </div>

      {/* 向下滚动指示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
        animate={{
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
        }}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </motion.div>
  )
}
