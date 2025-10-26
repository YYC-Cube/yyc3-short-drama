"use client"

import type * as React from "react"
import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  variant?: "default" | "cultural" | "minimal"
  children: React.ReactNode
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = "default", children }) => {
  if (variant === "minimal") {
    return <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">{children}</div>
  }

  if (variant === "cultural") {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* 河洛文化背景装饰 */}
        <div className="absolute inset-0 opacity-20">
          {/* 主要装饰圆 */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* 次要装饰元素 */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400 rounded-full blur-2xl"
            animate={{
              x: [-50, 50, -50],
              y: [-30, 30, -30],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        {/* 浮动粒子效果 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {children}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* 默认背景装饰 */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
              "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))",
              "linear-gradient(225deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
              "linear-gradient(315deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      {children}
    </div>
  )
}

export { AnimatedBackground }
