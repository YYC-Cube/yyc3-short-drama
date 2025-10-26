"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { getFontStyle } from "@/utils/font-utils"

interface VerticalSealTextProps {
  text: string
  className?: string
  initialFont?: SealFontType
}

export type SealFontType =
  | "sanji-xiaozhuan"
  | "yinpin-zhuan"
  | "hanyi-zhuanyi"
  | "dot-braille"
  | "soul-dragon"
  | "huakan-seal"

const fontNames: Record<SealFontType, string> = {
  "sanji-xiaozhuan": "三极小篆简",
  "yinpin-zhuan": "印品篆简体",
  "hanyi-zhuanyi": "汉仪篆意篆",
  "dot-braille": "点由点字阴刻小篆",
  "soul-dragon": "字魂游龙篆书",
  "huakan-seal": "华康新篆体W5(P)",
}

// 为每种字体添加特殊的字符装饰效果
const getDecoratedText = (text: string, fontType: SealFontType): string => {
  switch (fontType) {
    case "dot-braille":
      // 点由点字阴刻小篆 - 添加点状装饰
      return text
    case "soul-dragon":
      // 字魂游龙篆书 - 添加龙形装饰
      return text
    default:
      return text
  }
}

export default function VerticalSealText({ text, className, initialFont = "sanji-xiaozhuan" }: VerticalSealTextProps) {
  const [currentFont, setCurrentFont] = useState<SealFontType>(initialFont)
  const [isChanging, setIsChanging] = useState(false)
  const characters = text.split("")

  // 字体循环切换效果
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        setCurrentFont((prev) => {
          const fonts: SealFontType[] = [
            "sanji-xiaozhuan",
            "yinpin-zhuan",
            "hanyi-zhuanyi",
            "dot-braille",
            "soul-dragon",
            "huakan-seal",
          ]
          const currentIndex = fonts.indexOf(prev)
          const nextIndex = (currentIndex + 1) % fonts.length
          return fonts[nextIndex]
        })
        setIsChanging(false)
      }, 500)
    }, 10000) // 每10秒切换一次字体

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className={cn("flex flex-col items-center writing-vertical-rl text-amber-300/80", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
    >
      <motion.div
        className={cn("text-2xl md:text-3xl tracking-wider leading-loose")}
        style={getFontStyle(currentFont)}
        animate={{ opacity: isChanging ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {characters.map((char, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            className="my-1"
          >
            {getDecoratedText(char, currentFont)}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-4 text-xs text-amber-400/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        {fontNames[currentFont]}
      </motion.div>
    </motion.div>
  )
}
