"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Map, Building, Layers, Eye, Camera, History, Search, RefreshCw, BookOpen, Zap } from "lucide-react"
import {
  getAllCulturalGenes,
  searchCulturalGenes,
  analyzeCulturalGeneConnections,
  getTimeSpaceScenes,
  generateCulturalGeneReport,
  type CulturalGene,
  type TimeSpaceScene,
  type CulturalAnalysisResult,
} from "@/services/cultural-gene-service"
import { useToast } from "@/hooks/use-toast"

// 永宁寺塔变迁数据
const pagodaEvolution = [
  { era: "北魏", year: "516年", height: "137米", features: "九层，木构建筑，金铜相轮" },
  { era: "北齐", year: "577年", height: "约120米", features: "火灾后重建，规模略小" },
  { era: "隋朝", year: "605年", height: "约100米", features: "改建为七层，增加佛龛" },
  { era: "唐朝", year: "670年", height: "约90米", features: "多次修缮，风格更加华丽" },
  { era: "五代", year: "951年", height: "约80米", features: "战乱中受损，简化修复" },
  { era: "宋朝", year: "1049年", height: "约70米", features: "改为砖木结构，增强稳固性" },
  { era: "金朝", year: "1157年", height: "约60米", features: "战火中严重损毁，部分倒塌" },
  { era: "元朝", year: "1300年左右", height: "约50米", features: "仅存塔基和部分塔身" },
  { era: "明清", year: "1368-1911年", height: "逐渐倒塌", features: "仅存遗址" },
  { era: "现代", year: "2000年后", height: "0米", features: "考古发掘与数字复原" },
]

export default function TimeSpaceLibrary() {
  const [activeTab, setActiveTab] = useState("scenes")
  const [timeSlider, setTimeSlider] = useState(50) // 0-100，代表时间进度
  const [culturalGenes, setCulturalGenes] = useState<CulturalGene[]>([])
  const [timeSpaceScenes, setTimeSpaceScenes] = useState<TimeSpaceScene[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDynasty, setSelectedDynasty] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<CulturalAnalysisResult | null>(null)
  const [selectedGeneId, setSelectedGeneId] = useState<string>("")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { toast } = useToast()

  // 初始化数据
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    setIsLoading(true)
    try {
      const [genes, scenes] = await Promise.all([getAllCulturalGenes(), getTimeSpaceScenes()])

      setCulturalGenes(genes)
      setTimeSpaceScenes(scenes)
    } catch (error) {
      console.error("加载数据失败:", error)
      toast({
        title: "数据加载失败",
        description: "请刷新页面重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 搜索文化基因
  const handleSearch = async () => {
    if (!searchQuery.trim() && selectedCategory === "all" && selectedDynasty === "all") {
      setCulturalGenes(await getAllCulturalGenes())
      return
    }

    setIsLoading(true)
    try {
      const results = await searchCulturalGenes(searchQuery, {
        category: selectedCategory === "all" ? undefined : selectedCategory,
        dynasty: selectedDynasty === "all" ? undefined : selectedDynasty,
      })

      setCulturalGenes(results)

      toast({
        title: "搜索完成",
        description: `找到 ${results.length} 个相关文化基因`,
      })
    } catch (error) {
      console.error("搜索失败:", error)
      toast({
        title: "搜索失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 分析文化基因关联性
  const analyzeGeneConnections = async (geneId: string) => {
    if (!geneId) return

    setIsLoading(true)
    try {
      const result = await analyzeCulturalGeneConnections(geneId)
      if (result) {
        setAnalysisResult(result)
        setSelectedGeneId(geneId)

        toast({
          title: "分析完成",
          description: `发现 ${result.connections.length} 个关联基因`,
        })
      }
    } catch (error) {
      console.error("分析失败:", error)
      toast({
        title: "分析失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 生成文化基因报告
  const generateReport = async () => {
    if (culturalGenes.length === 0) return

    setIsLoading(true)
    try {
      const geneIds = culturalGenes.slice(0, 5).map((gene) => gene.id) // 取前5个基因
      const report = await generateCulturalGeneReport(geneIds)

      toast({
        title: "报告生成成功",
        description: `分析了 ${geneIds.length} 个文化基因的关联性`,
      })

      // 这里可以显示报告或下载
      console.log("文化基因报告:", report)
    } catch (error) {
      console.error("报告生成失败:", error)
      toast({
        title: "报告生成失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 根据滑块值获取塔的状态
  const getPagodaState = () => {
    const index = Math.min(Math.floor(timeSlider / 10), pagodaEvolution.length - 1)
    return pagodaEvolution[index]
  }

  const pagodaState = getPagodaState()

  // 获取唯一的类别和朝代列表
  const categories = [...new Set(culturalGenes.map((gene) => gene.category))]
  const dynasties = [...new Set(culturalGenes.map((gene) => gene.dynasty))]

  return (
    <section ref={ref} className="py-16 border-t border-amber-500/20">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <Map className="h-6 w-6 text-amber-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">十三朝古都时空库</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          3D场景库新增"神都时空"专区，包含隋唐洛阳城AR复现与永宁寺塔数字孪生，让用户穿越千年，体验不同时代的洛阳风貌。
        </p>
      </motion.div>

      <Tabs defaultValue="scenes" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
          <TabsTrigger value="scenes" className="data-[state=active]:bg-amber-600">
            <Building className="h-4 w-4 mr-2" />
            时空场景
          </TabsTrigger>
          <TabsTrigger value="genes" className="data-[state=active]:bg-amber-600">
            <Layers className="h-4 w-4 mr-2" />
            文化基因
          </TabsTrigger>
          <TabsTrigger value="pagoda" className="data-[state=active]:bg-amber-600">
            <History className="h-4 w-4 mr-2" />
            永宁寺塔
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-amber-600">
            <Zap className="h-4 w-4 mr-2" />
            关联分析
          </TabsTrigger>
        </TabsList>

        {/* 时空场景标签页 */}
        <TabsContent value="scenes" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {timeSpaceScenes.map((scene, index) => (
              <motion.div
                key={scene.id}
                className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <Building className="h-5 w-5 text-amber-400 mr-2" />
                  <h3 className="text-xl font-bold text-white">{scene.name}</h3>
                </div>

                <div className="mb-4">
                  <div className="text-amber-300 font-medium">
                    {scene.dynasty} · {scene.year}
                  </div>
                  <p className="text-white/80 mt-2">{scene.description}</p>
                </div>

                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={scene.visualAssets.panorama || "/placeholder.svg?height=300&width=600"}
                    alt={scene.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white font-medium">{scene.name}</div>
                    <div className="text-white/70 text-sm">
                      重建精度: {Math.round(scene.reconstructionData.accuracy * 100)}%
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">包含文化元素</h4>
                  <div className="flex flex-wrap gap-2">
                    {scene.culturalElements.map((element, elemIndex) => (
                      <span key={elemIndex} className="text-xs px-2 py-1 rounded-full bg-amber-900/30 text-amber-300">
                        {element.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                    <Camera className="h-4 w-4 mr-2" />
                    进入AR场景
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* 文化基因标签页 */}
        <TabsContent value="genes" className="mt-0">
          <div className="space-y-6">
            {/* 搜索和过滤 */}
            <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Search className="h-5 w-5 text-amber-400 mr-2" />
                <h3 className="text-lg font-medium text-white">文化基因搜索</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索文化基因..."
                  className="bg-black/60 border-amber-500/30 focus-visible:ring-amber-500/50 text-white"
                />

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-black/60 border-amber-500/30 text-white">
                    <SelectValue placeholder="选择类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类别</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "architecture" && "建筑"}
                        {category === "literature" && "文学"}
                        {category === "art" && "艺术"}
                        {category === "philosophy" && "哲学"}
                        {category === "custom" && "习俗"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDynasty} onValueChange={setSelectedDynasty}>
                  <SelectTrigger className="bg-black/60 border-amber-500/30 text-white">
                    <SelectValue placeholder="选择朝代" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部朝代</SelectItem>
                    {dynasties.map((dynasty) => (
                      <SelectItem key={dynasty} value={dynasty}>
                        {dynasty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  搜索
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">共找到 {culturalGenes.length} 个文化基因</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateReport}
                  disabled={isLoading || culturalGenes.length === 0}
                  className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 bg-transparent"
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  生成报告
                </Button>
              </div>
            </div>

            {/* 文化基因列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturalGenes.map((gene, index) => (
                <motion.div
                  key={gene.id}
                  className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 cursor-pointer hover:bg-amber-900/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => analyzeGeneConnections(gene.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-medium text-white">{gene.name}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        gene.category === "architecture"
                          ? "bg-blue-900/30 text-blue-300"
                          : gene.category === "literature"
                            ? "bg-green-900/30 text-green-300"
                            : gene.category === "art"
                              ? "bg-purple-900/30 text-purple-300"
                              : gene.category === "philosophy"
                                ? "bg-red-900/30 text-red-300"
                                : "bg-amber-900/30 text-amber-300"
                      }`}
                    >
                      {gene.category === "architecture" && "建筑"}
                      {gene.category === "literature" && "文学"}
                      {gene.category === "art" && "艺术"}
                      {gene.category === "philosophy" && "哲学"}
                      {gene.category === "custom" && "习俗"}
                    </span>
                  </div>

                  <div className="text-amber-300 text-sm mb-2">
                    {gene.dynasty} · {gene.period}
                  </div>
                  <div className="text-white/60 text-sm mb-3">{gene.location}</div>
                  <p className="text-white/80 text-sm line-clamp-3 mb-4">{gene.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <div className="text-xs text-white/60">准确度: {Math.round(gene.metadata.accuracy * 100)}%</div>
                      <div className="text-xs text-white/60">
                        完整度: {Math.round(gene.metadata.completeness * 100)}%
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-amber-400 hover:bg-amber-500/10">
                      分析关联
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* 永宁寺塔标签页 */}
        <TabsContent value="pagoda" className="mt-0">
          <motion.div
            className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <Layers className="h-5 w-5 text-amber-400 mr-2" />
              <h3 className="text-xl font-bold text-white">永宁寺塔数字孪生</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：塔的可视化 */}
              <div>
                <div className="relative h-80 mb-6 bg-black/60 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-40 h-[300px]">
                      {/* 塔的简化图形表示 */}
                      <svg viewBox="0 0 100 300" className="w-full h-full">
                        <defs>
                          <linearGradient id="pagodaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.7" />
                          </linearGradient>
                        </defs>

                        {/* 塔基 */}
                        <rect x="20" y="270" width="60" height="30" fill="url(#pagodaGradient)" />

                        {/* 塔身 - 根据时间滑块动态调整高度 */}
                        <motion.g
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{
                            opacity: timeSlider > 10 ? 1 : 0.3,
                            scaleY: timeSlider / 100,
                          }}
                          style={{ transformOrigin: "50px 270px" }}
                        >
                          {/* 各层塔身 */}
                          <rect x="25" y="240" width="50" height="30" fill="url(#pagodaGradient)" />
                          <rect x="30" y="210" width="40" height="30" fill="url(#pagodaGradient)" />
                          <rect x="35" y="180" width="30" height="30" fill="url(#pagodaGradient)" />
                          <rect x="38" y="150" width="24" height="30" fill="url(#pagodaGradient)" />
                          <rect x="40" y="120" width="20" height="30" fill="url(#pagodaGradient)" />
                          <rect x="42" y="90" width="16" height="30" fill="url(#pagodaGradient)" />
                          <rect x="44" y="60" width="12" height="30" fill="url(#pagodaGradient)" />
                          <rect x="45" y="30" width="10" height="30" fill="url(#pagodaGradient)" />
                          {/* 塔尖 */}
                          <polygon points="50,10 46,30 54,30" fill="url(#pagodaGradient)" />
                        </motion.g>

                        {/* 装饰线 */}
                        {[270, 240, 210, 180, 150, 120, 90, 60, 30].map((y, index) => (
                          <line
                            key={y}
                            x1={20 + index * 2.5}
                            y1={y}
                            x2={80 - index * 2.5}
                            y2={y}
                            stroke="#F59E0B"
                            strokeWidth="1"
                            opacity={timeSlider > index * 10 ? 1 : 0.3}
                          />
                        ))}
                      </svg>
                    </div>
                  </div>

                  {/* 时代标记 */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <div className="text-amber-300 font-medium">{pagodaState.era}时期</div>
                    <div className="text-white/70 text-sm">{pagodaState.year}</div>
                  </div>
                </div>

                {/* 时间滑块 */}
                <div className="mb-6">
                  <div className="flex justify-between text-white/60 text-xs mb-2">
                    <span>北魏</span>
                    <span>隋唐</span>
                    <span>宋元</span>
                    <span>明清</span>
                    <span>现代</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={timeSlider}
                    onChange={(e) => setTimeSlider(Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-amber-900/30 rounded-lg appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `linear-gradient(to right, #F59E0B ${timeSlider}%, #78350F ${timeSlider}%)`,
                    }}
                  />
                </div>
              </div>

              {/* 右侧：塔的信息 */}
              <div>
                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4 mb-6">
                  <h4 className="text-lg font-medium text-white mb-4">当前状态信息</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/60">高度</div>
                      <div className="text-amber-300 font-medium">{pagodaState.height}</div>
                    </div>
                    <div>
                      <div className="text-white/60">年代</div>
                      <div className="text-amber-300 font-medium">{pagodaState.year}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-white/60 mb-1">特征</div>
                      <div className="text-white">{pagodaState.features}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4 mb-6">
                  <h4 className="text-lg font-medium text-white mb-4">历史变迁时间线</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {pagodaEvolution.map((period, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded border ${
                          index === Math.floor(timeSlider / 10)
                            ? "border-amber-500 bg-amber-900/20"
                            : "border-amber-500/10 bg-black/40"
                        } transition-colors`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-amber-300 font-medium">{period.era}</span>
                          <span className="text-white/60 text-sm">{period.year}</span>
                        </div>
                        <div className="text-white/80 text-sm">{period.features}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                    <History className="h-4 w-4 mr-2" />
                    探索完整时空变迁
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* 关联分析标签页 */}
        <TabsContent value="analysis" className="mt-0">
          <div className="space-y-6">
            {analysisResult ? (
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center mb-6">
                  <Zap className="h-5 w-5 text-amber-400 mr-2" />
                  <h3 className="text-xl font-bold text-white">文化基因关联分析</h3>
                </div>

                {/* 关联基因网络 */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">关联基因网络</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analysisResult.connections.map((connection, index) => {
                      const targetGene = culturalGenes.find((g) => g.id === connection.targetGeneId)
                      if (!targetGene) return null

                      return (
                        <div
                          key={connection.targetGeneId}
                          className="bg-black/60 border border-amber-500/10 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-medium">{targetGene.name}</h5>
                            <span className="text-xs px-2 py-1 rounded-full bg-amber-900/30 text-amber-300">
                              {Math.round(connection.strength * 100)}%
                            </span>
                          </div>
                          <div className="text-amber-300 text-sm mb-2">{connection.relationship}</div>
                          <div className="text-white/70 text-sm">{targetGene.dynasty}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 时间线分析 */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">历史发展时间线</h4>
                  <div className="space-y-4">
                    {analysisResult.timeline.map((period, index) => (
                      <div key={index} className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-amber-300 font-medium">{period.period}</h5>
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-amber-900/30 rounded-full mr-2">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${period.significance * 100}%` }}
                              />
                            </div>
                            <span className="text-white/60 text-sm">{Math.round(period.significance * 100)}%</span>
                          </div>
                        </div>
                        <ul className="space-y-1">
                          {period.events.map((event, eventIndex) => (
                            <li key={eventIndex} className="text-white/80 text-sm flex items-start">
                              <span className="text-amber-400 mr-2">•</span>
                              <span>{event}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 text-center">
                <Zap className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">文化基因关联分析</h3>
                <p className="text-white/70 mb-6">点击任意文化基因卡片开始分析其与其他基因的关联性</p>
                <Button
                  onClick={() => setActiveTab("genes")}
                  className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                >
                  <Search className="h-4 w-4 mr-2" />
                  浏览文化基因
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* 拍摄模式介绍 */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <Eye className="h-5 w-5 text-amber-400 mr-2" />
          <h3 className="text-xl font-bold text-white">拍摄模式：时空折叠</h3>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-white/80 mb-4">
                开启"时空折叠"特效，支持现代角色与古装NPC跨时空同框，创造独特的视觉体验。
                通过先进的AI图像处理技术，自动调整光影和色彩，使不同时空的元素自然融合。
              </p>

              <div className="bg-amber-900/20 border border-amber-500/20 rounded p-4 text-amber-200/80 text-sm mb-6">
                <div className="font-medium text-amber-300 mb-2">功能亮点</div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>智能场景匹配，自动识别历史场景并提供对应时代NPC</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>光影自动调整，确保不同时空元素视觉统一</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>支持多达8位古装NPC同框，可选择不同历史人物形象</span>
                  </li>
                </ul>
              </div>

              <div className="text-white/60 text-sm">* 需钻石以上导演权限</div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&text=时空折叠特效示例"
                alt="时空折叠特效示例"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-amber-300 font-medium">时空折叠效果预览</div>
                <div className="text-white/70 text-sm">现代游客与唐代宫女同框</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
