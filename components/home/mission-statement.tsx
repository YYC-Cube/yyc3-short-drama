"use client"

import { motion } from "framer-motion"
import { Crown, Sparkles } from "lucide-react"

export default function MissionStatement() {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-black/50 to-black/80">
      <div className="max-w-4xl mx-auto text-center">
        {/* 品牌标识 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-2xl">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              言语逸品
            </h1>
            <p className="text-amber-300/80 text-lg">河洛文化数字传承平台</p>
          </div>
        </motion.div>

        {/* 使命宣言 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">传承河洛文脉 · 创新数字未来</h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            我们致力于运用前沿科技手段，深度挖掘和传承河洛文化的深厚底蕴，
            构建一个集文化传承、创意创作、社群互动于一体的数字文化生态平台， 让千年文脉在数字时代焕发新的生机与活力。
          </p>
        </motion.div>

        {/* 装饰元素 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-center gap-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-amber-400" />
          </motion.div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-orange-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
