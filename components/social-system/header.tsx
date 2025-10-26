"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Users } from "lucide-react"

export default function SocialSystemHeader() {
  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="虚实共生社交体系背景"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
      </div>

      {/* 返回首页按钮 */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/">
          <motion.div
            className="flex items-center text-white/80 hover:text-emerald-300 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span>返回首页</span>
          </motion.div>
        </Link>
      </div>

      {/* 标题内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center mb-6"
        >
          <Users className="h-8 w-8 text-emerald-400 mr-3" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">虚实共生社交体系</h1>
        </motion.div>

        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mb-6"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />

        <motion.p
          className="max-w-2xl text-lg text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          打破虚实边界，构建沉浸式文化社交新体验
        </motion.p>
      </div>
    </div>
  )
}
