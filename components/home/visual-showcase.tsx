"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const showcaseItems = [
  {
    title: "洛神女·文脉传承",
    description: "传统文化与现代科技的完美融合",
    image: "/images/luoshen-digital.jpeg",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "洛神女·数字重生",
    description: "科技赋能下的文化新生",
    image: "/images/luoshen-tech.jpeg",
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "应天门·盛世华章",
    description: "千年古都的数字重现",
    image: "/images/yingtianmen.png",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "智能创作生态",
    description: "AI驱动的文化创作新模式",
    image: "/images/behind-scenes-ar.png",
    color: "from-purple-500 to-pink-500",
  },
]

export default function VisualShowcase() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">视觉展示</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            通过精美的视觉呈现，展现河洛文化的深厚底蕴与现代科技的完美融合
          </p>
        </motion.div>

        {/* 展示网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden bg-gradient-to-br from-black/40 to-black/60 border-white/10 hover:border-amber-500/30 transition-all duration-300 backdrop-blur-sm">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {item.description}
                  </p>
                  <motion.div
                    className={`w-0 h-1 mt-4 bg-gradient-to-r ${item.color} group-hover:w-full transition-all duration-500`}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
