"use client"

import { motion } from "framer-motion"
import { Heart, Users, Lightbulb, Globe } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "文化传承",
    description: "守护中华文脉，传承千年智慧",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Users,
    title: "共创共享",
    description: "汇聚创作者力量，共建文化生态",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lightbulb,
    title: "创新融合",
    description: "科技赋能文化，古今完美融合",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Globe,
    title: "世界传播",
    description: "让河洛文化走向世界舞台",
    color: "from-green-500 to-teal-500",
  },
]

export default function CulturalValue() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">核心价值理念</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            以文化传承为使命，以科技创新为动力，构建可持续发展的文化生态
          </p>
        </motion.div>

        {/* 价值理念网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                {/* 图标容器 */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* 标题 */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors duration-300">
                  {value.title}
                </h3>

                {/* 描述 */}
                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
