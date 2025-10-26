"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function ImplementationRoadmap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 border-t border-amber-500/20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 mb-4">
          实施路线图
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">分阶段实施计划，确保文化穿越项目稳步推进</p>
      </motion.div>

      <div>Roadmap content coming soon...</div>
    </section>
  )
}
