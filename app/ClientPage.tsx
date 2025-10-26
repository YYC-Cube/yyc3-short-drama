"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import CulturalCarousel from "@/components/home/cultural-carousel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import AuthButton from "@/components/home/auth-button"
import {
  Sparkles,
  Dna,
  Users,
  Star,
  Clock,
  TrendingUp,
  ArrowRight,
  Play,
  BarChart3,
  Heart,
  Zap,
  Target,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"

const heroStats = [
  {
    title: "注册用户",
    value: "185,000+",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "AI生成剧本",
    value: "25,680",
    change: "+23.1%",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "星值流通",
    value: "8.5M",
    change: "+18.7%",
    icon: Star,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "文化传承度",
    value: "98.5%",
    change: "+5.3%",
    icon: TrendingUp,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
]

const coreFeatures = [
  {
    title: "智慧编剧工坊",
    description: "基于河洛文化的AI智能剧本生成系统，融合传统文化与现代叙事技巧",
    icon: Sparkles,
    href: "/ai-script",
    color: "from-purple-500 to-pink-500",
    progress: 92,
    status: "运行中",
    stats: "15,632 个剧本",
    features: ["智能剧本生成", "角色性格分析", "情节结构优化"],
  },
  {
    title: "文脉基因重构",
    description: "运用AI技术深度挖掘传统文化内核，构建数字化文化基因库",
    icon: Dna,
    href: "/cultural-gene",
    color: "from-emerald-500 to-teal-500",
    progress: 85,
    status: "优化中",
    stats: "15,000+ 文化元素",
    features: ["文化元素提取", "基因重组算法", "传承路径分析"],
  },
  {
    title: "虚实共生社群",
    description: "构建沉浸式文化体验空间，连接创作者与观众的文化社交平台",
    icon: Users,
    href: "/social-system",
    color: "from-blue-500 to-cyan-500",
    progress: 78,
    status: "活跃中",
    stats: "50,000+ 活跃用户",
    features: ["全息投影展示", "实时互动体验", "社群协作创作"],
  },
  {
    title: "星值经济赋能",
    description: "创新的价值激励体系，推动文化创作的可持续发展",
    icon: Star,
    href: "/star-economy",
    color: "from-yellow-500 to-orange-500",
    progress: 88,
    status: "运行中",
    stats: "8.5M 星值流通",
    features: ["创作激励机制", "价值评估算法", "收益分配系统"],
  },
  {
    title: "时空穿越体验",
    description: "突破时空界限的沉浸式文化体验，让历史与现代对话",
    icon: Clock,
    href: "/cultural-crossing",
    color: "from-indigo-500 to-purple-500",
    progress: 67,
    status: "测试中",
    stats: "500+ 时空场景",
    features: ["时空场景重现", "历史人物对话", "文化情境体验"],
  },
  {
    title: "统筹管理中枢",
    description: "全方位的项目管理和数据分析平台，确保平台高效运营",
    icon: BarChart3,
    href: "/project-management",
    color: "from-cyan-500 to-blue-500",
    progress: 94,
    status: "运行中",
    stats: "实时监控",
    features: ["性能监控", "数据分析", "资源优化"],
  },
]

const recentActivities = [
  {
    type: "创作",
    title: "《洛神赋》AI重构剧本完成",
    description: "融合古典文学与现代表达手法",
    time: "2分钟前",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    type: "社群",
    title: "新增100位文化传承人加入",
    description: "平台文化顾问团队持续壮大",
    time: "15分钟前",
    icon: Users,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    type: "技术",
    title: "文化基因算法优化完成",
    description: "提升文化元素识别准确率至98.5%",
    time: "1小时前",
    icon: Target,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    type: "经济",
    title: "星值交易量创新高",
    description: "单日交易量突破100K星值",
    time: "3小时前",
    icon: Star,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
]

const quickActions = [
  {
    title: "开始创作",
    icon: "✨",
    href: "/ai-script",
    color: "from-purple-500 to-pink-500",
    description: "AI智能剧本生成",
  },
  {
    title: "探索文化",
    icon: "🧬",
    href: "/cultural-gene",
    color: "from-emerald-500 to-teal-500",
    description: "文化基因解析",
  },
  {
    title: "加入社群",
    icon: "🌐",
    href: "/social-system",
    color: "from-blue-500 to-cyan-500",
    description: "虚实共生体验",
  },
  {
    title: "时空穿越",
    icon: "🌀",
    href: "/cultural-crossing",
    color: "from-indigo-500 to-purple-500",
    description: "沉浸式历史",
  },
]

export default function ClientPage() {
  const { isAuthenticated, user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault()
        // 触发播放/暂停
        const playButton = document.querySelector('[aria-label*="播放"]') as HTMLButtonElement
        if (playButton) {
          playButton.click()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70 text-lg">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 全屏文化轮播图 */}
      <CulturalCarousel />

      {/* 英雄区域 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景图片 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%89%AF%E6%A0%87%E9%A2%98.png-AzjqW3gR69o695uc8xrEariVS2XuV0.jpeg"
            alt="河洛文化背景"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        </div>

        {/* 装饰性粒子效果 */}
        <div className="absolute inset-0 z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* 主要内容 */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="mb-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30 text-lg px-6 py-2">
              <Sparkles className="w-5 h-5 mr-2" />
              河洛文化数字传承平台
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
              言语逸品
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
              以AI技术赋能传统文化，让河洛文明在数字时代焕发新的生命力
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-10 py-4 text-xl font-semibold shadow-xl"
                  aria-label="播放文化之旅"
                >
                  <Play className="w-6 h-6 mr-3" />
                  开启文化之旅
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-10 py-4 text-xl bg-transparent backdrop-blur-sm"
                >
                  探索更多
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* 统计数据 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {heroStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="cultural-card border-amber-500/20 hover:border-amber-500/40">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-12 h-12 mx-auto mb-4 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                      >
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-amber-200/70 text-sm mb-2">{stat.title}</div>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        {stat.change}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 核心功能模块 */}
      <section className="py-20 px-6 bg-gradient-to-b from-black/50 to-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
              核心功能模块
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              六大核心模块协同工作，构建完整的文化数字传承生态系统
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Link href={feature.href}>
                    <Card className="cultural-card h-full group cursor-pointer border-amber-500/20 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <Badge
                            variant="secondary"
                            className={`
                              ${feature.status === "运行中" ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
                              ${feature.status === "优化中" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : ""}
                              ${feature.status === "活跃中" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : ""}
                              ${feature.status === "测试中" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : ""}
                            `}
                          >
                            {feature.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-xl group-hover:text-amber-300 transition-colors duration-300">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-white/70 leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">完成度</span>
                            <span className="text-white font-medium">{feature.progress}%</span>
                          </div>
                          <Progress value={feature.progress} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70 text-sm">数据统计</span>
                            <span className="text-amber-300 text-sm font-medium">{feature.stats}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-white font-medium text-sm">核心功能</h4>
                          <div className="space-y-1">
                            {feature.features.map((feat, featIndex) => (
                              <div key={featIndex} className="flex items-center text-sm text-white/70">
                                <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                                {feat}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="flex items-center justify-between group-hover:text-amber-300 transition-colors duration-300">
                            <span className="text-white/60 text-sm">点击进入</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 最新动态和快速操作 */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 最新动态 */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="cultural-card border-amber-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-amber-300 flex items-center text-2xl">
                      <Heart className="w-6 h-6 mr-3" />
                      最新动态
                    </CardTitle>
                    <CardDescription className="text-amber-200/70 text-lg">
                      平台实时活动更新与创作成果展示
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          className="p-4 rounded-xl bg-gradient-to-r from-black/30 to-black/10 backdrop-blur-sm border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                              <Icon className={`w-5 h-5 ${activity.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <Badge
                                  variant="secondary"
                                  className="bg-white/10 text-white/80 border-white/20 text-xs"
                                >
                                  {activity.type}
                                </Badge>
                                <div className="flex items-center text-white/50 text-sm">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {activity.time}
                                </div>
                              </div>
                              <h4 className="font-semibold text-white mb-1 group-hover:text-amber-300 transition-colors">
                                {activity.title}
                              </h4>
                              <p className="text-white/70 text-sm">{activity.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* 快速操作 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="cultural-card border-amber-500/20 h-full">
                <CardHeader>
                  <CardTitle className="text-amber-300 flex items-center text-2xl">
                    <Zap className="w-6 h-6 mr-3" />
                    快速开始
                  </CardTitle>
                  <CardDescription className="text-amber-200/70 text-lg">选择您想要探索的功能模块</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={action.href}>
                        <div
                          className={`p-4 rounded-xl bg-gradient-to-r ${action.color} bg-opacity-20 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-3xl">{action.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                                {action.title}
                              </h3>
                              <p className="text-white/70 text-sm">{action.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-amber-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 行动号召 */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="cultural-card border-amber-500/30 relative overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute inset-0 opacity-10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-H6aexriDuzAlhdhDbrnJwOTrCxh3j4.jpeg"
                  alt="文化背景"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20" />
              </div>

              <CardContent className="relative z-10 p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
                    开启文化传承之旅
                  </h3>
                  <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                    加入我们，成为河洛文化传承的一份子，用科技的力量让传统文化在新时代绽放光彩
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-10 py-4 text-xl font-semibold shadow-xl"
                      >
                        立即注册
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-10 py-4 text-xl bg-transparent backdrop-blur-sm"
                      >
                        观看演示
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 右上角登录按钮 */}
      <div className="absolute top-6 md:top-8 right-6 md:right-8 z-50">
        <AuthButton />
      </div>

      {/* 底部导航提示 */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-center"
        >
          <div className="text-white/60 text-sm mb-4 font-medium">探索河洛文化数字传承之旅</div>
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
            className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center mx-auto"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-1.5"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* 品牌标识 */}
      <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 z-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-white/60"
        >
          <div className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
            言语逸品
          </div>
          <div className="text-xs text-white/40">Powered by AI & Culture</div>
        </motion.div>
      </div>
    </div>
  )
}
