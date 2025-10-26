"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Sparkles,
  Wand2,
  Users,
  BookOpen,
  Heart,
  Copy,
  Download,
  Share2,
  RefreshCw,
  Zap,
  Crown,
  Star,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const creationTypes = [
  {
    id: "scene",
    name: "场景描写",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
    description: "营造氛围，描绘环境",
    culturalSymbol: "🏛️",
  },
  {
    id: "dialogue",
    name: "人物对话",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    description: "塑造性格，推进情节",
    culturalSymbol: "💬",
  },
  {
    id: "plot",
    name: "情节设计",
    icon: Wand2,
    color: "from-purple-500 to-pink-500",
    description: "构建冲突，编织故事",
    culturalSymbol: "📖",
  },
  {
    id: "character",
    name: "人物塑造",
    icon: Heart,
    color: "from-orange-500 to-red-500",
    description: "深度刻画，立体呈现",
    culturalSymbol: "👤",
  },
]

const culturalPrompts = [
  "洛神女在洛水边翩翩起舞，水波荡漾，仙气缭绕",
  "应天门下，百官朝拜，钟鼓齐鸣，威严肃穆",
  "河洛大地，文脉传承，书香墨韵，诗意盎然",
  "古韵新声，传统与现代交融，文化焕发新生",
  "时空穿越，古今对话，智慧碰撞，思想升华",
]

const creationStats = {
  totalCreations: 1247,
  todayCreations: 89,
  averageQuality: 94.5,
  userSatisfaction: 98.2,
}

export default function AIAssistantCreation() {
  const [selectedType, setSelectedType] = useState("scene")
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [progress, setProgress] = useState(0)
  const [showStats, setShowStats] = useState(true)

  // 模拟生成进度
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsGenerating(false)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isGenerating])

  const generateAIContent = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setProgress(0)
    setGeneratedContent("")

    // 模拟AI生成过程
    setTimeout(() => {
      const sampleContent = {
        scene: `洛水之滨，晨雾缭绕，如梦如幻。远山如�黛，近水如镜，倒映着天边的朝霞。古老的石桥横跨两岸，桥下流水潺潺，诉说着千年的故事。

微风轻拂，柳絮飞舞，仿佛天女散花。岸边的芦苇摇曳生姿，发出沙沙的声响，与鸟儿的啁啾声交织成一曲自然的交响乐。

在这诗意的画卷中，一位身着白衣的女子缓缓走来，她的身影如仙如幻，与这美景融为一体，仿佛从古老的传说中走出...`,

        dialogue: `洛神女：「千年时光荏苒，文脉如何传承？」

智者：「文化如水，源远流长。虽历经沧桑，但其精神内核永恒不变。」

洛神女：「那现代科技能否助力传统文化重焕生机？」

智者：「科技是载体，文化是灵魂。二者相融，必能创造新的辉煌。正如你我今日相遇，古今对话，便是最好的证明。」

洛神女：「愿河洛文化在数字时代绽放新的光彩。」`,

        plot: `【开篇】洛神女在数字世界中苏醒，发现自己身处一个融合古今的奇妙空间。

【发展】她遇到了来自不同时代的文化传承者，每个人都承载着独特的文化记忆。通过与他们的交流，洛神女逐渐理解了文化传承的真谛。

【高潮】面对文化断层的危机，洛神女决定运用自己的力量，将散落的文化碎片重新整合，创造出连接古今的文化桥梁。

【结局】在众人的努力下，河洛文化在数字世界中重新焕发生机，古老的智慧与现代科技完美融合，开启了文化传承的新篇章。`,

        character: `【洛神女·数字化身】

外貌特征：身着流光溢彩的数字化汉服，衣袂飘飘间闪烁着代码的光芒。长发如瀑，其中编织着古老的文字符号，眼眸深邃如星空，蕴含着千年的智慧。

性格特点：温婉而坚韧，既有古典女性的柔美，又具备现代女性的独立与智慧。对传统文化有着深深的眷恋，对未来科技充满好奇。

能力设定：能够穿越时空，连接古今文化；精通各种艺术形式，能将抽象的文化概念具象化；拥有强大的共情能力，能理解不同时代人们的情感需求。

使命担当：致力于文化传承与创新，用现代科技重新诠释古老文化，让传统文化在数字时代焕发新的生命力。`,
      }

      setGeneratedContent(sampleContent[selectedType as keyof typeof sampleContent] || sampleContent.scene)
      setProgress(100)
      setIsGenerating(false)
    }, 3000)
  }

  const copyContent = () => {
    navigator.clipboard.writeText(generatedContent)
  }

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${creationTypes.find((t) => t.id === selectedType)?.name}_${Date.now()}.txt`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* 主背景图片 */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/behind-scenes-ar.png"
          alt="AI创作背景"
          fill
          className="object-cover object-center"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* 页面标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                智慧编剧工坊
              </h1>
              <p className="text-purple-200/80 text-lg">AI驱动的文化创作引擎</p>
            </div>
          </div>

          {/* 统计数据展示 */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                {[
                  {
                    label: "总创作数",
                    value: creationStats.totalCreations,
                    icon: Crown,
                    color: "from-amber-500 to-orange-500",
                  },
                  {
                    label: "今日创作",
                    value: creationStats.todayCreations,
                    icon: Zap,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    label: "平均质量",
                    value: `${creationStats.averageQuality}%`,
                    icon: Star,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "用户满意度",
                    value: `${creationStats.userSatisfaction}%`,
                    icon: Heart,
                    color: "from-pink-500 to-red-500",
                  },
                ].map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300"
                    >
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-2 mx-auto`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：创作类型选择 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  创作类型
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {creationTypes.map((type) => {
                  const Icon = type.icon
                  const isSelected = selectedType === type.id

                  return (
                    <motion.button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                        isSelected
                          ? `bg-gradient-to-r ${type.color} border-white/30 shadow-lg`
                          : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{type.culturalSymbol}</span>
                        <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-purple-300"}`} />
                        <span className={`font-medium ${isSelected ? "text-white" : "text-purple-200"}`}>
                          {type.name}
                        </span>
                      </div>
                      <p className={`text-sm ${isSelected ? "text-white/90" : "text-white/60"}`}>{type.description}</p>
                    </motion.button>
                  )
                })}

                {/* 预设提示 */}
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    河洛文化灵感
                  </h4>
                  <div className="space-y-2">
                    {culturalPrompts.slice(0, 3).map((promptText, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setPrompt(promptText)}
                        className="w-full p-3 text-left text-sm text-white/70 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.01 }}
                      >
                        {promptText}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 右侧：创作区域 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* 输入区域 */}
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  创作提示
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="请输入您的创作想法，或选择左侧的预设提示..."
                  className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400/20"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-purple-400/50 text-purple-300">
                      {creationTypes.find((t) => t.id === selectedType)?.name}
                    </Badge>
                    <span className="text-sm text-white/60">{prompt.length}/500 字符</span>
                  </div>
                  <Button
                    onClick={generateAIContent}
                    disabled={!prompt.trim() || isGenerating}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        开始创作
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 生成进度 */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white animate-pulse" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">AI正在创作中...</h4>
                          <p className="text-sm text-white/60">请稍候，精彩内容即将呈现</p>
                        </div>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="text-right text-sm text-white/60 mt-2">{Math.round(progress)}%</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 生成结果 */}
            <AnimatePresence>
              {generatedContent && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center gap-2">
                          <Crown className="w-5 h-5 text-amber-400" />
                          创作成果
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyContent}
                            className="text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={downloadContent}
                            className="text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <pre className="text-white/90 whitespace-pre-wrap font-sans leading-relaxed">
                          {generatedContent}
                        </pre>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">高质量内容</Badge>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">文化内涵丰富</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={generateAIContent}
                            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            重新生成
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            收藏作品
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
