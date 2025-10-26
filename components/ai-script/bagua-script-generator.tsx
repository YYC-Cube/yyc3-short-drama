"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import {
  Sparkles,
  RefreshCw,
  Download,
  Copy,
  Check,
  Wand2,
  Star,
  Clock,
  Eye,
  Target,
  Settings,
  Lightbulb,
  BookOpen,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

// 预设主题数据
const scriptThemes = [
  {
    id: 1,
    title: "洛阳古都探秘",
    description: "主角在洛阳古城发现一件神秘文物，引发一系列奇遇",
    tags: ["历史", "悬疑", "冒险"],
    culturalElements: ["龙门石窟", "白马寺", "洛阳博物馆", "隋唐城遗址"],
    difficulty: "中等",
    estimatedTime: "15-20分钟",
    popularity: 92,
    image: "/images/yingtianmen.png",
  },
  {
    id: 2,
    title: "龙门石窟传奇",
    description: "一位现代雕刻师与千年前的龙门石窟匠人跨时空对话",
    tags: ["穿越", "艺术", "文化"],
    culturalElements: ["龙门石窟", "佛教艺术", "石刻工艺", "北魏文化"],
    difficulty: "困难",
    estimatedTime: "20-25分钟",
    popularity: 88,
    image: "/images/luoshen-11.png",
  },
  {
    id: 3,
    title: "白马寺的守护者",
    description: "主角意外成为白马寺古老秘宝的守护者，肩负使命",
    tags: ["奇幻", "成长", "传承"],
    culturalElements: ["白马寺", "佛教文化", "古代建筑", "宗教仪式"],
    difficulty: "简单",
    estimatedTime: "12-18分钟",
    popularity: 85,
    image: "/images/behind-scenes.png",
  },
  {
    id: 4,
    title: "洛神赋新传",
    description: "改编自《洛神赋》，讲述洛水女神与凡人的情缘",
    tags: ["爱情", "神话", "古风"],
    culturalElements: ["洛神赋", "洛水", "曹植", "魏晋文化"],
    difficulty: "困难",
    estimatedTime: "25-30分钟",
    popularity: 95,
    image: "/images/luoshen-digital.jpeg",
  },
]

// 八卦元素配置
const baguaElements = [
  {
    name: "乾",
    meaning: "天",
    position: "西北",
    description: "开篇立意，确立主题",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "坤",
    meaning: "地",
    position: "西南",
    description: "背景设定，世界构建",
    color: "from-amber-400 to-yellow-500",
  },
  { name: "震", meaning: "雷", position: "东", description: "冲突爆发，情节转折", color: "from-blue-400 to-cyan-500" },
  {
    name: "巽",
    meaning: "风",
    position: "东南",
    description: "情感发展，人物成长",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "坎",
    meaning: "水",
    position: "北",
    description: "危机考验，深度挖掘",
    color: "from-indigo-400 to-blue-500",
  },
  { name: "离", meaning: "火", position: "南", description: "高潮迭起，激烈对抗", color: "from-red-400 to-pink-500" },
  {
    name: "艮",
    meaning: "山",
    position: "东北",
    description: "沉淀思考，智慧启发",
    color: "from-purple-400 to-violet-500",
  },
  { name: "兑", meaning: "泽", position: "西", description: "圆满结局，情感升华", color: "from-teal-400 to-cyan-500" },
  {
    name: "中宫",
    meaning: "核心",
    position: "中央",
    description: "贯穿全剧的核心主题",
    color: "from-amber-500 to-orange-600",
  },
]

// 文化元素选项
const culturalElementsOptions = [
  { name: "龙门石窟", category: "建筑" },
  { name: "白马寺", category: "建筑" },
  { name: "洛阳博物馆", category: "文化" },
  { name: "隋唐城遗址", category: "历史" },
  { name: "关林", category: "建筑" },
  { name: "洛神赋", category: "文学" },
  { name: "河图洛书", category: "哲学" },
  { name: "牡丹文化", category: "文化" },
  { name: "唐三彩", category: "艺术" },
  { name: "洛阳水席", category: "文化" },
  { name: "佛教文化", category: "宗教" },
  { name: "道教文化", category: "宗教" },
  { name: "诗词文化", category: "文学" },
  { name: "书法艺术", category: "艺术" },
]

export default function BaguaScriptGenerator() {
  const [scriptTheme, setScriptTheme] = useState("")
  const [scriptStyle, setScriptStyle] = useState<"classical" | "modern" | "fantasy">("modern")
  const [scriptLength, setScriptLength] = useState<"short" | "medium" | "long">("medium")
  const [targetAudience, setTargetAudience] = useState("年轻观众")
  const [selectedCulturalElements, setSelectedCulturalElements] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState<any[]>([])
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { toast } = useToast()

  // 生成剧本结构
  const generateScript = async () => {
    if (!scriptTheme.trim() && selectedTheme === null) {
      toast({
        title: "请输入剧本主题",
        description: "请输入自定义主题或选择预设主题",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    // 模拟生成进度
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // 模拟生成的剧本结构
      const mockScript = baguaElements.map((element, index) => ({
        ...element,
        content: `这是${element.name}（${element.meaning}）的内容。${element.description}。在这个部分，我们将展现${scriptTheme || scriptThemes[selectedTheme!]?.title}的相关情节，融入${selectedCulturalElements.slice(0, 2).join("、")}等文化元素，创造出具有深厚文化底蕴的故事内容。通过${element.meaning}的象征意义，构建起承转合的完整剧情结构，让观众在欣赏故事的同时，感受到中华文化的博大精深。`,
        wordCount: Math.floor(Math.random() * 200) + 150,
        estimatedDuration: Math.floor(Math.random() * 3) + 2,
      }))

      setGeneratedScript(mockScript)
      setGenerationProgress(100)
      setShowPreview(true)

      toast({
        title: "剧本生成成功！",
        description: `共生成 ${mockScript.length} 个章节，约 ${mockScript.reduce((sum, item) => sum + item.wordCount, 0)} 字`,
      })
    } catch (error) {
      console.error("剧本生成错误:", error)
      toast({
        title: "生成过程中出现错误",
        description: "请检查网络连接后重试",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      clearInterval(progressInterval)
    }
  }

  // 选择预设主题
  const selectTheme = (index: number) => {
    setSelectedTheme(index)
    setScriptTheme(scriptThemes[index].title)
    setSelectedCulturalElements(scriptThemes[index].culturalElements)
  }

  // 处理文化元素选择
  const handleCulturalElementChange = (element: string, checked: boolean) => {
    if (checked) {
      setSelectedCulturalElements([...selectedCulturalElements, element])
    } else {
      setSelectedCulturalElements(selectedCulturalElements.filter((e) => e !== element))
    }
  }

  // 获取难度颜色
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "简单":
        return "bg-green-500/20 text-green-300"
      case "中等":
        return "bg-yellow-500/20 text-yellow-300"
      case "困难":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div ref={ref} className="space-y-6">
      {/* 操作区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：快速生成 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Card cultural={true} className="border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-300">
                <Wand2 className="w-5 h-5" />
                快速生成
              </CardTitle>
              <CardDescription>选择主题和配置，一键生成剧本结构</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 主题输入 */}
              <div>
                <label className="text-white/70 text-sm block mb-2">剧本主题</label>
                <Textarea
                  value={scriptTheme}
                  onChange={(e) => {
                    setScriptTheme(e.target.value)
                    setSelectedTheme(null)
                  }}
                  placeholder="例如：洛阳古都探秘、龙门石窟传奇..."
                  className="bg-black/60 border-amber-500/30 focus-visible:ring-amber-500/50 text-white min-h-[80px]"
                />
              </div>

              {/* 配置选项 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm block mb-2">创作风格</label>
                  <Select value={scriptStyle} onValueChange={(value: any) => setScriptStyle(value)}>
                    <SelectTrigger className="bg-black/60 border-amber-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classical">古典文学风格</SelectItem>
                      <SelectItem value="modern">现代叙事风格</SelectItem>
                      <SelectItem value="fantasy">奇幻风格</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-white/70 text-sm block mb-2">剧本长度</label>
                  <Select value={scriptLength} onValueChange={(value: any) => setScriptLength(value)}>
                    <SelectTrigger className="bg-black/60 border-amber-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">短篇</SelectItem>
                      <SelectItem value="medium">中篇</SelectItem>
                      <SelectItem value="long">长篇</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 生成按钮 */}
              <Button
                onClick={generateScript}
                disabled={(!scriptTheme.trim() && selectedTheme === null) || isGenerating}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    生成剧本
                  </>
                )}
              </Button>

              {/* 生成进度 */}
              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">生成进度</span>
                    <span className="text-amber-300">{Math.round(generationProgress)}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 右侧：预设主题 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card cultural={true} className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-300">
                <Target className="w-5 h-5" />
                精选主题
              </CardTitle>
              <CardDescription>选择预设主题快速开始创作</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                {scriptThemes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 border ${
                      selectedTheme === index
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-white/10 hover:border-purple-500/50"
                    }`}
                    onClick={() => selectTheme(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* 背景图片 */}
                    <div className="absolute inset-0 opacity-30">
                      <Image
                        src={theme.image || "/placeholder.svg"}
                        alt={theme.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
                    </div>

                    <div className="relative z-10 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{theme.title}</h4>
                        <div className="flex items-center gap-2">
                          {selectedTheme === index && <Check className="h-4 w-4 text-purple-400" />}
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-400" />
                            <span className="text-xs text-amber-300">{theme.popularity}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-white/70 text-sm mb-3 line-clamp-2">{theme.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge className={getDifficultyColor(theme.difficulty)}>{theme.difficulty}</Badge>
                          <div className="flex items-center gap-1 text-white/60 text-xs">
                            <Clock className="h-3 w-3" />
                            {theme.estimatedTime}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-white/60 text-xs">
                          <Eye className="h-3 w-3" />
                          <span>{Math.floor(theme.popularity * 10)}次使用</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 文化元素选择 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Card cultural={true} className="border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-300">
              <Settings className="w-5 h-5" />
              文化元素配置 ({selectedCulturalElements.length} 已选择)
            </CardTitle>
            <CardDescription>选择要融入剧本的文化元素</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {culturalElementsOptions.map((element) => (
                <div key={element.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={element.name}
                    checked={selectedCulturalElements.includes(element.name)}
                    onCheckedChange={(checked) => handleCulturalElementChange(element.name, checked as boolean)}
                  />
                  <label htmlFor={element.name} className="text-white/80 text-sm cursor-pointer">
                    {element.name}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 九宫格预览 */}
      {showPreview && generatedScript.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card cultural={true} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2 text-blue-300">
                    <BookOpen className="w-5 h-5" />
                    九宫格剧本结构
                  </CardTitle>
                  <CardDescription>基于河洛八卦理论生成的剧本框架</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 bg-transparent"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    复制
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    下载
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {generatedScript.map((element, index) => (
                  <motion.div
                    key={index}
                    className="bg-black/60 border border-white/10 rounded-lg p-4 hover:bg-black/80 transition-colors group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`w-full h-1 bg-gradient-to-r ${element.color} mb-3 rounded`}></div>

                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-white mb-1">{element.name}</div>
                      <div className="text-amber-300 text-sm">{element.meaning}</div>
                      <div className="text-white/60 text-xs">{element.position}</div>
                    </div>

                    <p className="text-white/80 text-sm line-clamp-4 mb-3">{element.content}</p>

                    <div className="flex justify-between items-center text-xs text-white/60">
                      <span>{element.wordCount}字</span>
                      <span>{element.estimatedDuration}分钟</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 使用说明 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Card cultural={true} className="border-l-4 border-l-indigo-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-300">
              <Lightbulb className="w-5 h-5" />
              八卦模式使用说明
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/70 text-sm">
              <div>
                <h4 className="font-medium text-white mb-3">创作原理</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>基于河图洛书和八卦理论的剧本结构设计</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>九宫格布局对应不同的剧情发展阶段</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>中宫代表核心主题，贯穿全剧始终</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white mb-3">使用建议</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>选择合适的文化元素增强剧本底蕴</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>根据目标观众调整创作风格</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>利用预设主题快速开始创作</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
