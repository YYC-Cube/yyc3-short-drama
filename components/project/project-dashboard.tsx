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
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  FileText,
  Settings,
  Download,
} from "lucide-react"

// 项目数据类型
interface ProjectMetrics {
  totalProgress: number
  completedTasks: number
  totalTasks: number
  activeUsers: number
  performance: number
  issues: number
}

// 模块状态数据
interface ModuleStatus {
  name: string
  progress: number
  status: "completed" | "in-progress" | "pending" | "error"
  lastUpdate: string
  description: string
}

export default function ProjectDashboard() {
  const [metrics, setMetrics] = useState<ProjectMetrics>({
    totalProgress: 0,
    completedTasks: 0,
    totalTasks: 0,
    activeUsers: 0,
    performance: 0,
    issues: 0,
  })

  const [modules, setModules] = useState<ModuleStatus[]>([])

  // 模拟数据加载
  useEffect(() => {
    const loadData = () => {
      setMetrics({
        totalProgress: 78,
        completedTasks: 156,
        totalTasks: 200,
        activeUsers: 24,
        performance: 92,
        issues: 3,
      })

      setModules([
        {
          name: "河洛首府",
          progress: 95,
          status: "completed",
          lastUpdate: "2024-01-10",
          description: "首页展示和导航系统",
        },
        {
          name: "智慧编剧",
          progress: 85,
          status: "in-progress",
          lastUpdate: "2024-01-10",
          description: "AI剧本生成和编辑功能",
        },
        {
          name: "文脉基因",
          progress: 72,
          status: "in-progress",
          lastUpdate: "2024-01-09",
          description: "文化基因分析和传承",
        },
        {
          name: "虚实共生",
          progress: 60,
          status: "in-progress",
          lastUpdate: "2024-01-09",
          description: "社交系统和全息显示",
        },
        {
          name: "星值经济",
          progress: 45,
          status: "in-progress",
          lastUpdate: "2024-01-08",
          description: "数字货币和创作者激励",
        },
        {
          name: "时空穿越",
          progress: 30,
          status: "pending",
          lastUpdate: "2024-01-07",
          description: "文化跨越和时空体验",
        },
        {
          name: "统筹管理",
          progress: 88,
          status: "in-progress",
          lastUpdate: "2024-01-10",
          description: "项目管理和监控系统",
        },
      ])
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Activity className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">项目管理中心</h1>
          <p className="text-white/60">河洛文化数字传承平台 - 统筹管理</p>
        </motion.div>

        {/* 关键指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-black/40 border-amber-500/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">总体进度</CardTitle>
                <BarChart3 className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.totalProgress}%</div>
                <Progress value={metrics.totalProgress} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">任务完成</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {metrics.completedTasks}/{metrics.totalTasks}
                </div>
                <p className="text-xs text-white/60 mt-1">
                  完成率 {Math.round((metrics.completedTasks / metrics.totalTasks) * 100)}%
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">活跃用户</CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.activeUsers}</div>
                <p className="text-xs text-white/60 mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  较昨日 +12%
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">系统性能</CardTitle>
                <Activity className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.performance}%</div>
                <p className="text-xs text-white/60 mt-1">{metrics.issues} 个待解决问题</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 详细信息标签页 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Tabs defaultValue="modules" className="space-y-6">
            <TabsList className="bg-black/40 border border-white/10">
              <TabsTrigger value="modules" className="data-[state=active]:bg-amber-500/20">
                模块状态
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-blue-500/20">
                性能监控
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-green-500/20">
                报告分析
              </TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white flex items-center">
                            {getStatusIcon(module.status)}
                            <span className="ml-2">{module.name}</span>
                          </CardTitle>
                          <Badge className={getStatusColor(module.status)}>
                            {module.status === "completed" && "已完成"}
                            {module.status === "in-progress" && "进行中"}
                            {module.status === "pending" && "待开始"}
                            {module.status === "error" && "异常"}
                          </Badge>
                        </div>
                        <CardDescription className="text-white/60">{module.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">进度</span>
                            <span className="text-white">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-white/60">
                            <span>最后更新: {module.lastUpdate}</span>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-amber-400 hover:text-amber-300">
                              <Settings className="h-3 w-3 mr-1" />
                              配置
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">性能监控面板</CardTitle>
                  <CardDescription className="text-white/60">实时系统性能指标和资源使用情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/80">CPU 使用率</span>
                        <span className="text-white">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/80">内存使用率</span>
                        <span className="text-white">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/80">网络延迟</span>
                        <span className="text-white">23ms</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">项目报告</CardTitle>
                      <CardDescription className="text-white/60">生成和下载项目分析报告</CardDescription>
                    </div>
                    <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                      <Download className="h-4 w-4 mr-2" />
                      导出报告
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                      <h4 className="text-white font-medium mb-2">功能完整度报告</h4>
                      <p className="text-white/60 text-sm mb-3">详细分析各模块功能实现情况和质量评估</p>
                      <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-300 bg-transparent">
                        查看详情
                      </Button>
                    </div>
                    <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                      <h4 className="text-white font-medium mb-2">性能分析报告</h4>
                      <p className="text-white/60 text-sm mb-3">系统性能指标、优化建议和资源使用分析</p>
                      <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 bg-transparent">
                        查看详情
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
