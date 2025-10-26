"use client"

import type React from "react"
import { motion } from "framer-motion"

interface Props {
  text: string
}

const VerticalSealText: React.FC<Props> = ({ text }) => {
  return (
    <motion.div className="flex flex-col items-center writing-vertical-rl text-amber-300/80 font-serif">
      {text}
    </motion.div>
  )
}

export default VerticalSealText
