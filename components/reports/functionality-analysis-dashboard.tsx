"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Download,
  Eye,
  Settings,
  Users,
  Zap,
} from "lucide-react"

interface FunctionalityReport {
  module: string
  completeness: number
  quality: number
  performance: number
  userSatisfaction: number
  issues: number
  status: "excellent" | "good" | "needs-improvement" | "critical"
}

export default function FunctionalityAnalysisDashboard() {
  const [reports, setReports] = useState<FunctionalityReport[]>([])
  const [overallScore, setOverallScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    const loadReports = () => {
      const mockReports: FunctionalityReport[] = [
        {
          module: "河洛首府",
          completeness: 95,
          quality: 92,
          performance: 88,
          userSatisfaction: 90,
          issues: 2,
          status: "excellent",
        },
        {
          module: "智慧编剧",
          completeness: 85,
          quality: 87,
          performance: 82,
          userSatisfaction: 85,
          issues: 5,
          status: "good",
        },
        {
          module: "文脉基因",
          completeness: 72,
          quality: 78,
          performance: 75,
          userSatisfaction: 76,
          issues: 8,
          status: "good",
        },
        {
          module: "虚实共生",
          completeness: 60,
          quality: 65,
          performance: 70,
          userSatisfaction: 68,
          issues: 12,
          status: "needs-improvement",
        },
        {
          module: "星值经济",
          completeness: 45,
          quality: 50,
          performance: 55,
          userSatisfaction: 52,
          issues: 15,
          status: "needs-improvement",
        },
        {
          module: "时空穿越",
          completeness: 30,
          quality: 35,
          performance: 40,
          userSatisfaction: 38,
          issues: 20,
          status: "critical",
        },
        {
          module: "统筹管理",
          completeness: 88,
          quality: 85,
          performance: 90,
          userSatisfaction: 87,
          issues: 3,
          status: "excellent",
        },
      ]

      setReports(mockReports)

      // 计算总体评分
      const totalScore =
        mockReports.reduce((sum, report) => {
          return sum + (report.completeness + report.quality + report.performance + report.userSatisfaction) / 4
        }, 0) / mockReports.length

      setOverallScore(Math.round(totalScore))
      setIsLoading(false)
    }

    const timer = setTimeout(loadReports, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "good":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "needs-improvement":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "excellent":
        return "优秀"
      case "good":
        return "良好"
      case "needs-improvement":
        return "需改进"
      case "critical":
        return "严重"
      default:
        return "未知"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 70) return "text-blue-400"
    if (score >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-white/20 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-white/20 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 总体概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-black/40 border-amber-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">总体评分</p>
                  <p className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">完成模块</p>
                  <p className="text-3xl font-bold text-green-400">
                    {reports.filter((r) => r.completeness >= 80).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-black/40 border-yellow-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">待改进</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {reports.filter((r) => r.status === "needs-improvement" || r.status === "critical").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">用户满意度</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {Math.round(reports.reduce((sum, r) => sum + r.userSatisfaction, 0) / reports.length)}%
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 详细分析 */}
      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="bg-black/40 border border-white/10">
          <TabsTrigger value="modules" className="data-[state=active]:bg-amber-500/20">
            模块分析
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-blue-500/20">
            趋势分析
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-green-500/20">
            优化建议
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <motion.div
                key={report.module}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{report.module}</CardTitle>
                      <Badge className={getStatusColor(report.status)}>{getStatusText(report.status)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/80">完整度</span>
                          <span className={getScoreColor(report.completeness)}>{report.completeness}%</span>
                        </div>
                        <Progress value={report.completeness} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/80">质量</span>
                          <span className={getScoreColor(report.quality)}>{report.quality}%</span>
                        </div>
                        <Progress value={report.quality} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/80">性能</span>
                          <span className={getScoreColor(report.performance)}>{report.performance}%</span>
                        </div>
                        <Progress value={report.performance} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/80">用户满意度</span>
                          <span className={getScoreColor(report.userSatisfaction)}>{report.userSatisfaction}%</span>
                        </div>
                        <Progress value={report.userSatisfaction} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-white/60 text-sm">{report.issues} 个待解决问题</span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-blue-400 hover:text-blue-300">
                          <Eye className="h-3 w-3 mr-1" />
                          详情
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-amber-400 hover:text-amber-300">
                          <Settings className="h-3 w-3 mr-1" />
                          优化
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                功能发展趋势
              </CardTitle>
              <CardDescription className="text-white/60">各模块功能完善度随时间变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-white/10 rounded-lg bg-black/20">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">趋势分析图表</p>
                  <p className="text-white/40 text-sm">图表组件将在此处显示</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-green-400" />
                  优先级建议
                </CardTitle>
                <CardDescription className="text-white/60">基于分析结果的优化建议</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-300 font-medium">高优先级</span>
                      <Badge className="bg-red-500/20 text-red-300 border-red-500/30">紧急</Badge>
                    </div>
                    <p className="text-white/80 text-sm">完善时空穿越模块核心功能，提升用户体验</p>
                  </div>

                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-yellow-300 font-medium">中优先级</span>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">重要</Badge>
                    </div>
                    <p className="text-white/80 text-sm">优化星值经济系统性能和稳定性</p>
                  </div>

                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-300 font-medium">低优先级</span>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">一般</Badge>
                    </div>
                    <p className="text-white/80 text-sm">增强虚实共生模块的交互体验</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-purple-400" />
                  技术建议
                </CardTitle>
                <CardDescription className="text-white/60">技术架构和实现方面的建议</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-black/20 border border-white/10 rounded-lg">
                    <h4 className="text-white font-medium mb-2">性能优化</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• 实施代码分割和懒加载</li>
                      <li>• 优化图片和资源加载</li>
                      <li>• 使用CDN加速静态资源</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-black/20 border border-white/10 rounded-lg">
                    <h4 className="text-white font-medium mb-2">用户体验</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• 增加加载状态指示器</li>
                      <li>• 优化移动端适配</li>
                      <li>• 完善错误处理机制</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">生成详细报告</CardTitle>
                  <CardDescription className="text-white/60">导出完整的功能分析报告</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  <Download className="h-4 w-4 mr-2" />
                  导出报告
                </Button>
              </div>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
