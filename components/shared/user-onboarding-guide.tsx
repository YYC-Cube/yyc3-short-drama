"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronRight, ChevronLeft, Lightbulb, Sparkles, BookOpen, Pen } from "lucide-react"

type GuideStep = {
  title: string
  description: string
  icon: React.ReactNode
  image?: string
}

const guideSteps: GuideStep[] = [
  {
    title: "欢迎来到『言语』平台",
    description: "这是一个融合河洛文化与现代科技的智能短剧创作平台。在这里，您可以体验千年文化在指尖重生的魅力。",
    icon: <Sparkles className="h-6 w-6 text-amber-400" />,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "八卦剧本生成",
    description: "尝试使用河图洛书算法，根据八卦原理自动生成九宫格剧本结构，让您的创作融入东方哲学智慧。",
    icon: <BookOpen className="h-6 w-6 text-amber-400" />,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "古今对话转换",
    description: "输入现代台词，AI将自动转化为古风版本，让您的对白充满文化韵味，如“我爱你”变为“既见君子，云胡不喜”。",
    icon: <Pen className="h-6 w-6 text-amber-400" />,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "获取创作奖励",
    description: "完成创作任务可获得明星值和开元通宝，用于兑换限定文化商品、场景使用权和参与创作者计划。",
    icon: <Lightbulb className="h-6 w-6 text-amber-400" />,
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function UserOnboardingGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenGuide, setHasSeenGuide] = useState(false)

  // 检查用户是否是首次访问
  useEffect(() => {
    const hasSeenGuideStorage = localStorage.getItem("hasSeenGuide")
    if (!hasSeenGuideStorage) {
      // 延迟显示引导，让用户先浏览页面
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setHasSeenGuide(true)
    }
  }, [])

  const completeGuide = () => {
    localStorage.setItem("hasSeenGuide", "true")
    setHasSeenGuide(true)
    setIsOpen(false)
  }

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeGuide()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (hasSeenGuide) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-amber-900/80 text-amber-300 border-amber-500/50 hover:bg-amber-800"
        onClick={() => setIsOpen(true)}
      >
        <Lightbulb className="h-4 w-4 mr-2" />
        使用指南
      </Button>
    )
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl"
            >
              <Card className="border-amber-500/30 bg-black/80 backdrop-blur-md overflow-hidden">
                <CardHeader className="relative border-b border-amber-500/20 pb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 text-amber-300/70 hover:text-amber-300 hover:bg-amber-950/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    {guideSteps[currentStep].icon}
                    <CardTitle className="text-xl text-amber-300">{guideSteps[currentStep].title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    {guideSteps[currentStep].image && (
                      <img
                        src={guideSteps[currentStep].image || "/placeholder.svg"}
                        alt={guideSteps[currentStep].title}
                        className="rounded-lg w-full h-48 object-cover mb-4"
                      />
                    )}
                    <p className="text-amber-200/80 text-center">{guideSteps[currentStep].description}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: guideSteps.length }).map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-amber-400" : "bg-amber-800/50"}`}
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-amber-500/20 pt-4 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="text-amber-300/70 hover:text-amber-300 hover:bg-amber-950/30"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    上一步
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white border-none"
                  >
                    {currentStep < guideSteps.length - 1 ? "下一步" : "完成"}
                    {currentStep < guideSteps.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && !hasSeenGuide && (
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-50 bg-amber-900/80 text-amber-300 border-amber-500/50 hover:bg-amber-800 animate-pulse"
          onClick={() => setIsOpen(true)}
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          新手指南
        </Button>
      )}
    </>
  )
}
