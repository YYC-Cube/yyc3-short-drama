"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Wand2,
  MessageSquare,
  Target,
  ShoppingBag,
  BarChart3,
  GitCompare,
  BookOpen,
  Users,
  Star,
  Flame,
  Zap,
  Settings,
} from "lucide-react"
import Image from "next/image"
import MainLayout from "@/components/layout/main-layout"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// 导入功能组件
import BaguaScriptGenerator from "@/components/ai-script/bagua-script-generator"
import ClassicalDialogueConverter from "@/components/ai-script/classical-dialogue-converter"
import EnhancedTaskSystem from "@/components/ai-script/enhanced-task-system"
import EnhancedMarketplace from "@/components/ai-script/enhanced-marketplace"
import AdvancedAnalyticsPanel from "@/components/ai-script/advanced-analytics-panel"
import SceneComparisonSystem from "@/components/ai-script/scene-comparison-system"
import AIAssistantCreation from "@/components/ai-script/ai-assistant-creation" // 新增导入

// 功能模块配置
const featureModules = [
  {
    id: "generator",
    title: "河洛八卦生成器",
    subtitle: "九宫格剧本智能构建",
    description: "基于河图洛书理论，运用八卦智慧自动生成具有深厚文化底蕴的剧本结构框架",
    icon: Sparkles,
    color: "from-amber-400 via-orange-500 to-red-500",
    borderColor: "border-l-amber-500",
    bgImage: "/images/yingtianmen-2.png",
    culturalSymbol: "☰",
    stats: { active: "12.5K", generated: "8.9K", rating: 4.9 },
    features: ["九宫格结构", "文化融合", "智能优化", "实时预览"],
    isPopular: true,
    component: BaguaScriptGenerator,
  },
  {
    id: "assistant",
    title: "AI智慧创作助手",
    subtitle: "全方位创作支持系统",
    description: "提供场景描写、人物对话、情节设计等全方位智能创作辅助，大幅提升创作效率",
    icon: Wand2,
    color: "from-purple-400 via-violet-500 to-indigo-500",
    borderColor: "border-l-purple-500",
    bgImage: "/images/behind-scenes-ar.png",
    culturalSymbol: "✨",
    stats: { active: "18.2K", generated: "15.6K", rating: 4.8 },
    features: ["智能提示", "多风格支持", "历史记录", "创作技巧"],
    isNew: true,
    component: AIAssistantCreation,
  },
  {
    id: "dialogue",
    title: "古风台词转换器",
    subtitle: "现代语言古典化转换",
    description: "将现代台词转化为具有古典韵味的表达方式，融入诗经、楚辞等经典文学元素",
    icon: MessageSquare,
    color: "from-emerald-400 via-teal-500 to-cyan-500",
    borderColor: "border-l-emerald-500",
    bgImage: "/images/luoshen-digital.jpeg",
    culturalSymbol: "📜",
    stats: { active: "9.8K", generated: "12.3K", rating: 4.7 },
    features: ["诗词风格", "对话场景", "文化标注", "批量转换"],
    component: ClassicalDialogueConverter,
  },
  {
    id: "tasks",
    title: "创作任务系统",
    subtitle: "游戏化成长体验",
    description: "通过完成各类创作任务获得丰富奖励，提升创作等级，解锁更多高级功能",
    icon: Target,
    color: "from-rose-400 via-pink-500 to-fuchsia-500",
    borderColor: "border-l-rose-500",
    bgImage: "/images/luoshen-tech.jpeg",
    culturalSymbol: "🎯",
    stats: { active: "15.7K", completed: "2.1K", rating: 4.6 },
    features: ["每日任务", "成就系统", "奖励机制", "等级提升"],
    component: EnhancedTaskSystem,
  },
  {
    id: "marketplace",
    title: "创作成果市场",
    subtitle: "优质剧本交易平台",
    description: "购买其他创作者的优质剧本模板，也可以出售自己的创作成果获得收益",
    icon: ShoppingBag,
    color: "from-blue-400 via-sky-500 to-cyan-500",
    borderColor: "border-l-blue-500",
    bgImage: "/images/luoshen-11.png",
    culturalSymbol: "🏪",
    stats: { active: "11.3K", products: "3.2K", rating: 4.8 },
    features: ["精选推荐", "评价系统", "安全交易", "版权保护"],
    component: EnhancedMarketplace,
  },
  {
    id: "analytics",
    title: "数据分析中心",
    subtitle: "深度创作洞察",
    description: "全面分析您的创作数据表现，提供个性化的创作建议和优化方案",
    icon: BarChart3,
    color: "from-yellow-400 via-amber-500 to-orange-500",
    borderColor: "border-l-yellow-500",
    bgImage: "/images/luoshen-9.png",
    culturalSymbol: "📊",
    stats: { active: "8.9K", reports: "1.8K", rating: 4.5 },
    features: ["创作趋势", "用户互动", "热门分析", "个性推荐"],
    component: AdvancedAnalyticsPanel,
  },
  {
    id: "comparison",
    title: "场景对比系统",
    subtitle: "多维度设计比较",
    description: "对比不同版本的场景设计，应用文化风格滤镜，帮助您选择最佳创作方案",
    icon: GitCompare,
    color: "from-indigo-400 via-purple-500 to-violet-500",
    borderColor: "border-l-indigo-500",
    bgImage: "/images/luoshen-16.png",
    culturalSymbol: "⚖️",
    stats: { active: "6.7K", comparisons: "4.5K", rating: 4.4 },
    features: ["场景对比", "风格滤镜", "时空标注", "效果预览"],
    component: SceneComparisonSystem,
  },
]

// 实时统计数据
const liveStats = [
  { label: "在线创作者", value: "1,247", icon: Users, color: "text-green-400", trend: "+12%" },
  { label: "今日生成", value: "3,856", icon: Sparkles, color: "text-blue-400", trend: "+8%" },
  { label: "活跃项目", value: "892", icon: BookOpen, color: "text-purple-400", trend: "+15%" },
  { label: "用户满意度", value: "98.5%", icon: Star, color: "text-amber-400", trend: "+2%" },
]

export default function AIScriptPage() {
  const [selectedModule, setSelectedModule] = useState("assistant")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // 处理模块切换
  const handleModuleChange = (moduleId: string) => {
    if (moduleId === selectedModule) return

    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedModule(moduleId)
      setIsTransitioning(false)
    }, 300)
  }

  // 获取当前模块
  const currentModule = featureModules.find((m) => m.id === selectedModule)
  const CurrentComponent = currentModule?.component

  return (
    <MainLayout>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10" ref={ref}>
          {/* 页面头部 */}
          <motion.div
            className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-amber-500/20"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* 左侧标题 */}
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 bg-linear-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold bg-linear-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                      智慧编剧工坊
                    </h1>
                    <p className="text-sm text-white/70">河洛文化与AI技术的完美融合</p>
                  </div>
                </div>

                {/* 右侧实时统计 */}
                <div className="hidden lg:flex items-center gap-6">
                  {liveStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-1 justify-center">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-lg font-bold text-white">{stat.value}</span>
                        <span className="text-xs text-green-400">{stat.trend}</span>
                      </div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 主要内容区域 */}
          <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
              {/* 左侧功能选择区 */}
              <motion.div
                className="col-span-12 lg:col-span-4 xl:col-span-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="h-full overflow-y-auto custom-scrollbar">
                  <div className="space-y-3">
                    {featureModules.map((module, index) => {
                      const Icon = module.icon
                      const isActive = selectedModule === module.id

                      return (
                        <motion.div
                          key={module.id}
                          className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 border-l-4 ${
                            isActive
                              ? `${module.borderColor} bg-linear-to-r from-black/60 to-black/40 shadow-2xl`
                              : "border-l-transparent hover:border-l-white/30 bg-black/40 hover:bg-black/60"
                          }`}
                          onClick={() => handleModuleChange(module.id)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* 背景图片 */}
                          <div className="absolute inset-0 opacity-20">
                            <Image
                              src={module.bgImage || "/placeholder.svg"}
                              alt={module.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/40" />
                          </div>

                          {/* 内容 */}
                          <div className="relative z-10 p-4">
                            <div className="flex items-start gap-3">
                              {/* 文化符号 */}
                              <div className="text-2xl shrink-0">{module.culturalSymbol}</div>

                              {/* 图标 */}
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                                  isActive ? `bg-linear-to-br ${module.color}` : "bg-white/10"
                                }`}
                              >
                                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-white/70"}`} />
                              </div>

                              {/* 文字内容 */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`font-medium truncate ${isActive ? "text-white" : "text-white/80"}`}>
                                    {module.title}
                                  </h3>
                                  {module.isPopular && (
                                    <Badge className="bg-red-500/20 text-red-300 text-xs px-1 py-0">
                                      <Flame className="w-3 h-3" />
                                    </Badge>
                                  )}
                                  {module.isNew && (
                                    <Badge className="bg-green-500/20 text-green-300 text-xs px-1 py-0">
                                      <Zap className="w-3 h-3" />
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-white/60 mb-2 line-clamp-1">{module.subtitle}</p>

                                {/* 统计数据 */}
                                <div className="flex items-center gap-3 text-xs">
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3 text-blue-400" />
                                    <span className="text-white/70">{module.stats.active}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-amber-400" />
                                    <span className="text-white/70">{module.stats.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 活跃指示器 */}
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-8 bg-linear-to-b from-amber-400 to-orange-500 rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 右侧功能内容区 */}
              <motion.div
                className="col-span-12 lg:col-span-8 xl:col-span-9"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="h-full flex flex-col">
                  {/* 当前模块信息卡片 */}
                  <AnimatePresence mode="wait">
                    {currentModule && (
                      <motion.div
                        key={currentModule.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                      >
                        <Card
                          cultural={true}
                          className={`relative overflow-hidden border-l-4 ${currentModule.borderColor} bg-linear-to-r from-black/60 to-black/40`}
                        >
                          {/* 背景图片 */}
                          <div className="absolute inset-0 opacity-30">
                            <Image
                              src={currentModule.bgImage || "/placeholder.svg"}
                              alt={currentModule.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/60" />
                          </div>

                          <CardHeader className="relative z-10">
                            <div className="flex items-start gap-4">
                              <motion.div
                                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${currentModule.color} flex items-center justify-center shadow-2xl`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                              >
                                <currentModule.icon className="w-8 h-8 text-white" />
                              </motion.div>

                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <CardTitle className="text-2xl text-white">{currentModule.title}</CardTitle>
                                  {currentModule.isPopular && (
                                    <Badge className="bg-red-500/20 text-red-300">
                                      <Flame className="w-3 h-3 mr-1" />
                                      热门
                                    </Badge>
                                  )}
                                  {currentModule.isNew && (
                                    <Badge className="bg-green-500/20 text-green-300">
                                      <Zap className="w-3 h-3 mr-1" />
                                      新功能
                                    </Badge>
                                  )}
                                </div>
                                <CardDescription className="text-white/80 text-base mb-4">
                                  {currentModule.description}
                                </CardDescription>

                                {/* 功能特性标签 */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {currentModule.features.map((feature, index) => (
                                    <Badge key={index} className="bg-white/10 text-white/80 border-white/20">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>

                                {/* 统计数据 */}
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="text-center">
                                    <div className="text-xl font-bold text-white">{currentModule.stats.active}</div>
                                    <div className="text-xs text-white/60">活跃用户</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-xl font-bold text-white">
                                      {currentModule.stats.generated ||
                                        currentModule.stats.completed ||
                                        currentModule.stats.products ||
                                        currentModule.stats.reports ||
                                        currentModule.stats.comparisons}
                                    </div>
                                    <div className="text-xs text-white/60">
                                      {currentModule.stats.generated
                                        ? "已生成"
                                        : currentModule.stats.completed
                                          ? "已完成"
                                          : currentModule.stats.products
                                            ? "商品数"
                                            : currentModule.stats.reports
                                              ? "报告数"
                                              : "对比数"}
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                      <Star className="w-4 h-4 text-amber-400" />
                                      <span className="text-xl font-bold text-white">{currentModule.stats.rating}</span>
                                    </div>
                                    <div className="text-xs text-white/60">用户评分</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 功能组件内容区 */}
                  <div className="flex-1 overflow-hidden">
                    <Card cultural={true} className="h-full border-l-4 border-l-amber-500">
                      <CardContent className="p-0 h-full">
                        <div className="h-full overflow-y-auto custom-scrollbar">
                          <AnimatePresence mode="wait">
                            {isTransitioning ? (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center h-96"
                              >
                                <div className="text-center">
                                  <motion.div
                                    className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full mx-auto mb-4"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                  />
                                  <div className="text-white/70">正在切换功能模块...</div>
                                </div>
                              </motion.div>
                            ) : CurrentComponent ? (
                              <motion.div
                                key={selectedModule}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="p-6"
                              >
                                <Suspense fallback={<LoadingSpinner />}>
                                  <CurrentComponent />
                                </Suspense>
                              </motion.div>
                            ) : (
                              <div className="flex items-center justify-center h-96">
                                <div className="text-center text-white/60">
                                  <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                  <p>功能模块加载中...</p>
                                </div>
                              </div>
                            )}
                          </AnimatePresence>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
