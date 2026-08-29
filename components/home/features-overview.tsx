"use client"

import { motion } from "framer-motion"
import { Sparkles, Dna, Globe, Star, Clock, Crown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Crown,
    title: "河洛首府",
    description: "文化中枢总览，统领全局",
    color: "from-amber-500 to-orange-500",
    culturalSymbol: "🏛️",
  },
  {
    icon: Sparkles,
    title: "智慧编剧",
    description: "AI创作引擎，智能生成",
    color: "from-purple-500 to-pink-500",
    culturalSymbol: "✨",
  },
  {
    icon: Dna,
    title: "文脉基因",
    description: "传承密码解析，文化传承",
    color: "from-emerald-500 to-teal-500",
    culturalSymbol: "🧬",
  },
  {
    icon: Globe,
    title: "虚实共生",
    description: "数字文化生态，虚实融合",
    color: "from-blue-500 to-cyan-500",
    culturalSymbol: "🌐",
  },
  {
    icon: Star,
    title: "星值经济",
    description: "价值体系构建，激励创作",
    color: "from-yellow-500 to-amber-500",
    culturalSymbol: "⭐",
  },
  {
    icon: Clock,
    title: "时空穿越",
    description: "沉浸体验之旅，穿越古今",
    color: "from-indigo-500 to-purple-500",
    culturalSymbol: "🌀",
  },
]

export default function FeaturesOverview() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              河洛文化
            </span>
            <span className="text-white ml-4">数字传承体系</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            融合传统文化与现代科技，构建全方位的文化传承与创新生态系统
          </p>
        </motion.div>

        {/* 功能卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Card className="h-full bg-linear-to-br from-black/40 to-black/60 border-white/10 hover:border-amber-500/30 transition-all duration-300 backdrop-blur-xs">
                  <CardContent className="p-8 text-center">
                    {/* 文化符号 */}
                    <motion.div
                      className="text-4xl mb-4"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      {feature.culturalSymbol}
                    </motion.div>

                    {/* 图标 */}
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* 标题 */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* 描述 */}
                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* 装饰线条 */}
                    <motion.div
                      className={`w-0 h-1 mx-auto mt-6 bg-linear-to-r ${feature.color} group-hover:w-full transition-all duration-500`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
