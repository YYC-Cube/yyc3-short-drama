"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Clock,
  FileText,
  Tag,
  Users,
  Eye,
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Star,
} from "lucide-react"

// 分析类型
type AnalyticsType = "personal" | "trends"

// 时间范围
type TimeRange = "week" | "month" | "year" | "all"

// 创作统计数据接口
interface CreationStats {
  scriptsCreated: number
  scriptsPublished: number
  totalViews: number
  totalLikes: number
  totalDownloads: number
  totalComments: number
  averageRating: number
  totalEarnings: {
    starValue: number
    tongbao: number
  }
  creationTime: {
    total: number // 分钟
    average: number // 分钟/剧本
  }
}

// 趋势数据接口
interface TrendData {
  name: string
  value: number
  change: number // 百分比变化
  isPositive: boolean
}

// 模拟个人统计数据
const mockPersonalStats: CreationStats = {
  scriptsCreated: 15,
  scriptsPublished: 8,
  totalViews: 3256,
  totalLikes: 876,
  totalDownloads: 124,
  totalComments: 87,
  averageRating: 4.7,
  totalEarnings: {
    starValue: 12500,
    tongbao: 85,
  },
  creationTime: {
    total: 2340, // 39小时
    average: 156, // 2.6小时/剧本
  },
}

// 模拟热门主题数据
const mockPopularThemes: TrendData[] = [
  { name: "历史探秘", value: 87, change: 12, isPositive: true },
  { name: "古风爱情", value: 76, change: 8, isPositive: true },
  { name: "宫廷政治", value: 65, change: -3, isPositive: false },
  { name: "文物传奇", value: 58, change: 15, isPositive: true },
  { name: "民间故事", value: 52, change: 5, isPositive: true },
]

// 模拟热门风格数据
const mockPopularStyles: TrendData[] = [
  { name: "唐诗风格", value: 92, change: 7, isPositive: true },
  { name: "宋词风格", value: 85, change: 10, isPositive: true },
  { name: "史记笔法", value: 78, change: 18, isPositive: true },
  { name: "楚辞风格", value: 65, change: -2, isPositive: false },
  { name: "元曲风格", value: 58, change: 4, isPositive: true },
]

// 模拟热门标签数据
const mockPopularTags: TrendData[] = [
  { name: "洛阳", value: 95, change: 5, isPositive: true },
  { name: "龙门石窟", value: 88, change: 12, isPositive: true },
  { name: "唐朝", value: 82, change: 3, isPositive: true },
  { name: "白马寺", value: 75, change: 8, isPositive: true },
  { name: "洛神赋", value: 70, change: 15, isPositive: true },
]

// 模拟每月创作数据
const mockMonthlyCreation = [
  { month: "1月", count: 1 },
  { month: "2月", count: 2 },
  { month: "3月", count: 3 },
  { month: "4月", count: 4 },
  { month: "5月", count: 2 },
  { month: "6月", count: 3 },
]

// 模拟创作类型分布
const mockCreationTypes = [
  { type: "完整剧本", percentage: 45 },
  { type: "剧本模板", percentage: 30 },
  { type: "创作元素", percentage: 25 },
]

export default function CreationAnalytics() {
  const [activeTab, setActiveTab] = useState<AnalyticsType>("personal")
  const [timeRange, setTimeRange] = useState<TimeRange>("month")

  const { user, isAuthenticated } = useAuth()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 格式化时间
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}小时${mins}分钟`
  }

  // 如果未登录，显示登录提示
  if (!isAuthenticated) {
    return (
      <section ref={ref} className="py-16 border-t border-amber-500/20">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-4">
            <BarChart3 className="h-6 w-6 text-amber-400 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">创作数据分析</h2>
          </div>
          <p className="text-white/70 max-w-3xl">查看您的创作统计数据和平台热门趋势，帮助您优化创作方向和内容。</p>
        </motion.div>

        <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 text-center">
          <Lock className="h-12 w-12 text-amber-500/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">登录后查看数据分析</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            登录后可查看您的创作统计数据和平台热门趋势，帮助您优化创作方向和内容。
          </p>
          <Button
            className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
            onClick={() => (window.location.href = "/auth")}
          >
            立即登录
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-16 border-t border-amber-500/20">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <BarChart3 className="h-6 w-6 text-amber-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">创作数据分析</h2>
        </div>
        <p className="text-white/70 max-w-3xl">查看您的创作统计数据和平台热门趋势，帮助您优化创作方向和内容。</p>
      </motion.div>

      <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <Tabs
            defaultValue="personal"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as AnalyticsType)}
          >
            <TabsList>
              <TabsTrigger value="personal" className="data-[state=active]:bg-amber-600">
                <BarChart3 className="h-4 w-4 mr-2" />
                个人统计
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-amber-600">
                <TrendingUp className="h-4 w-4 mr-2" />
                平台趋势
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center">
            <span className="text-white/70 mr-2">时间范围:</span>
            <Tabs defaultValue="month" value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
              <TabsList>
                <TabsTrigger value="week" className="data-[state=active]:bg-amber-600">
                  周
                </TabsTrigger>
                <TabsTrigger value="month" className="data-[state=active]:bg-amber-600">
                  月
                </TabsTrigger>
                <TabsTrigger value="year" className="data-[state=active]:bg-amber-600">
                  年
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-amber-600">
                  全部
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <TabsContent value="personal" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* 创作数量 */}
            <motion.div
              className="bg-black/60 border border-amber-500/10 rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-amber-400 mr-2" />
                  <h3 className="text-lg font-medium text-white">创作数量</h3>
                </div>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+25%</span>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">{mockPersonalStats.scriptsCreated}</div>
                  <div className="text-white/60 text-sm">已创作剧本</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-medium text-amber-300">{mockPersonalStats.scriptsPublished}</div>
                  <div className="text-white/60 text-sm">已发布剧本</div>
                </div>
              </div>
            </motion.div>

            {/* 创作时间 */}
            <motion.div
              className="bg-black/60 border border-amber-500/10 rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-amber-400 mr-2" />
                  <h3 className="text-lg font-medium text-white">创作时间</h3>
                </div>
                <div className="flex items-center text-red-400 text-sm">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>-10%</span>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">
                    {formatTime(mockPersonalStats.creationTime.total)}
                  </div>
                  <div className="text-white/60 text-sm">总创作时间</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-medium text-amber-300">
                    {formatTime(mockPersonalStats.creationTime.average)}
                  </div>
                  <div className="text-white/60 text-sm">平均/剧本</div>
                </div>
              </div>
            </motion.div>

            {/* 内容表现 */}
            <motion.div
              className="bg-black/60 border border-amber-500/10 rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-amber-400 mr-2" />
                  <h3 className="text-lg font-medium text-white">内容表现</h3>
                </div>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+32%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{mockPersonalStats.totalViews}</div>
                  <div className="text-white/60 text-xs">总浏览</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{mockPersonalStats.totalLikes}</div>
                  <div className="text-white/60 text-xs">总点赞</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{mockPersonalStats.totalDownloads}</div>
                  <div className="text-white/60 text-xs">总下载</div>
                </div>
              </div>
            </motion.div>

            {/* 创作收益 */}
            <motion.div
              className="bg-black/60 border border-amber-500/10 rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-400 mr-2" />
                  <h3 className="text-lg font-medium text-white">创作收益</h3>
                </div>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+45%</span>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">{mockPersonalStats.totalEarnings.starValue}</div>
                  <div className="text-white/60 text-sm">明星值</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-medium text-amber-300">{mockPersonalStats.totalEarnings.tongbao}</div>
                  <div className="text-white/60 text-sm">通宝</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* 月度创作趋势 */}
            <motion.div
              className="bg-black/60 border border-amber-500/10 rounded-lg p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">月度创作趋势</h3>
                <Calendar className="h-5 w-5 text-amber-400" />
              </div>

              <div className="h-64 relative">
                {/* 简化的柱状图表示 */}
                <div className="absolute inset-0 flex items-end justify-between px-2">
                  {mockMonthlyCreation.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-10 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-sm"
                        style={{ height: `${item.count * 15}%` }}
                      ></div>
                      <div className="text-white/70 text-xs mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>

                {/* Y轴标签 */}
                <div className="absolute left-0 inset-y-0 flex flex-col justify-between items-start">
                  <span className="text-white/50 text-xs">5</span>
                  <span className="text-white/50 text-xs">4</span>
                  <span className="text-white/50 text-xs">3</span>
                  <span className="text-white/50 text-xs">2</span>
                  <span className="text-white/50 text-xs">1</span>
                  <span className="text-white/50 text-xs">0</span>
                </div>
              </div>
            </motion.div>

            {/* 创作类型分布 */}
            <motion.div
              className="bg-black/60 border border-amber-500/10 rounded-lg p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">创作类型分布</h3>
                <PieChart className="h-5 w-5 text-amber-400" />
              </div>

              <div className="h-64 relative flex items-center justify-center">
                {/* 简化的饼图表示 */}
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#78350F" strokeWidth="10" />

                    {/* 完整剧本 45% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="#F59E0B"
                      strokeWidth="10"
                      strokeDasharray={`${45 * 2.83} ${100 * 2.83}`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />

                    {/* 剧本模板 30% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="#D97706"
                      strokeWidth="10"
                      strokeDasharray={`${30 * 2.83} ${100 * 2.83}`}
                      strokeDashoffset={`${-45 * 2.83}`}
                      transform="rotate(-90 50 50)"
                    />

                    {/* 创作元素 25% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="#B45309"
                      strokeWidth="10"
                      strokeDasharray={`${25 * 2.83} ${100 * 2.83}`}
                      strokeDashoffset={`${-(45 + 30) * 2.83}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>

                {/* 图例 */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-3">
                  {mockCreationTypes.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: index === 0 ? "#F59E0B" : index === 1 ? "#D97706" : "#B45309",
                        }}
                      ></div>
                      <div className="text-white/70 text-xs">
                        {item.type} ({item.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
              <BarChart3 className="h-4 w-4 mr-2" />
              查看详细分析报告
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 热门主题 */}
            <motion.div
              className="bg-black/60 border border-amber-500/10 rounded-lg p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">热门主题</h3>
                <TrendingUp className="h-5 w-5 text-amber-400" />
              </div>

              <div className="space-y-4">
                {mockPopularThemes.map((theme, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 text-center text-white/70">{index + 1}</div>
                      <div className="text-white">{theme.name}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-white/90 mr-2">{theme.value}</div>
                      <div className={`flex items-center ${theme.isPositive ? "text-green-400" : "text-red-400"}`}>
                        {theme.isPositive ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        <span>
                          {theme.isPositive ? "+" : ""}
                          {theme.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 热门风格 */}
            <motion.div
              className="bg-black/60 border border-amber-500/10 rounded-lg p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">热门风格</h3>
                <Zap className="h-5 w-5 text-amber-400" />
              </div>

              <div className="space-y-4">
                {mockPopularStyles.map((style, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 text-center text-white/70">{index + 1}</div>
                      <div className="text-white">{style.name}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-white/90 mr-2">{style.value}</div>
                      <div className={`flex items-center ${style.isPositive ? "text-green-400" : "text-red-400"}`}>
                        {style.isPositive ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        <span>
                          {style.isPositive ? "+" : ""}
                          {style.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 热门标签 */}
            <motion.div
              className="bg-black/60 border border-amber-500/10 rounded-lg p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">热门标签</h3>
                <Tag className="h-5 w-5 text-amber-400" />
              </div>

              <div className="space-y-4">
                {mockPopularTags.map((tag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 text-center text-white/70">{index + 1}</div>
                      <div className="text-white">{tag.name}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-white/90 mr-2">{tag.value}</div>
                      <div className={`flex items-center ${tag.isPositive ? "text-green-400" : "text-red-400"}`}>
                        {tag.isPositive ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        <span>
                          {tag.isPositive ? "+" : ""}
                          {tag.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="bg-black/60 border border-amber-500/10 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">创作者洞察</h3>
              <Users className="h-5 w-5 text-amber-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 rounded-lg p-4">
                <div className="text-amber-300 font-medium mb-2">创作者等级分布</div>
                <div className="text-white/70 text-sm">
                  平台创作者主要集中在白银至钻石等级，其中铂金导演占比最高，达到35%。
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-4">
                <div className="text-amber-300 font-medium mb-2">创作时长趋势</div>
                <div className="text-white/70 text-sm">
                  平均创作时长呈下降趋势，从3小时/剧本降至2.5小时/剧本，效率提升20%。
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-4">
                <div className="text-amber-300 font-medium mb-2">内容质量分析</div>
                <div className="text-white/70 text-sm">
                  高质量内容（评分4.5+）占比上升，从25%增长至40%，用户满意度显著提高。
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
              <TrendingUp className="h-4 w-4 mr-2" />
              查看完整趋势报告
            </Button>
          </div>
        </TabsContent>
      </div>
    </section>
  )
}
