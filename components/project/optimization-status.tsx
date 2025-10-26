"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  TrendingUp,
  FileText,
  Settings,
  Play,
  RefreshCw,
  Target,
  BarChart3,
} from "lucide-react"

// 优化任务状态
interface OptimizationTask {
  id: string
  title: string
  description: string
  status: "pending" | "running" | "completed" | "failed"
  progress: number
  priority: "high" | "medium" | "low"
  category: "architecture" | "performance" | "code-quality" | "security"
  estimatedTime: string
  completedAt?: string
  impact: string
}

// 优化任务数据
const optimizationTasks: OptimizationTask[] = [
  {
    id: "1",
    title: "文件架构重组",
    description: "整理项目文件结构，移除重复组件，创建索引文件",
    status: "completed",
    progress: 100,
    priority: "high",
    category: "architecture",
    estimatedTime: "15分钟",
    completedAt: "2024-01-08 14:30:00",
    impact: "提升代码可维护性，减少导入复杂度",
  },
  {
    id: "2",
    title: "性能监控基线建立",
    description: "建立性能监控基线，设置关键指标阈值",
    status: "completed",
    progress: 100,
    priority: "high",
    category: "performance",
    estimatedTime: "10分钟",
    completedAt: "2024-01-08 14:45:00",
    impact: "实时监控应用性能，及时发现性能问题",
  },
  {
    id: "3",
    title: "组件索引文件生成",
    description: "为所有组件目录创建索引文件，简化导入路径",
    status: "running",
    progress: 75,
    priority: "medium",
    category: "code-quality",
    estimatedTime: "8分钟",
    impact: "简化组件导入，提升开发效率",
  },
  {
    id: "4",
    title: "重复Header组件清理",
    description: "合并重复的Header组件，创建通用Header组件",
    status: "pending",
    progress: 0,
    priority: "medium",
    category: "architecture",
    estimatedTime: "12分钟",
    impact: "减少代码重复，统一UI风格",
  },
  {
    id: "5",
    title: "未使用文件清理",
    description: "识别并清理未使用的文件和依赖",
    status: "pending",
    progress: 0,
    priority: "low",
    category: "code-quality",
    estimatedTime: "20分钟",
    impact: "减少项目体积，提升构建速度",
  },
  {
    id: "6",
    title: "安全性扫描",
    description: "扫描潜在的安全漏洞和依赖风险",
    status: "pending",
    progress: 0,
    priority: "high",
    category: "security",
    estimatedTime: "25分钟",
    impact: "提升应用安全性，防范安全风险",
  },
]

// 优化统计
const optimizationStats = {
  totalTasks: optimizationTasks.length,
  completedTasks: optimizationTasks.filter((t) => t.status === "completed").length,
  runningTasks: optimizationTasks.filter((t) => t.status === "running").length,
  pendingTasks: optimizationTasks.filter((t) => t.status === "pending").length,
  failedTasks: optimizationTasks.filter((t) => t.status === "failed").length,
  overallProgress: Math.round(
    optimizationTasks.reduce((sum, task) => sum + task.progress, 0) / optimizationTasks.length,
  ),
}

export default function OptimizationStatus() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [autoRefresh, setAutoRefresh] = useState(false)

  // 自动刷新
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      // 模拟进度更新
      console.log("刷新优化状态...")
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  // 获取状态信息
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "text-green-400", bgColor: "bg-green-500", icon: CheckCircle, label: "已完成" }
      case "running":
        return { color: "text-blue-400", bgColor: "bg-blue-500", icon: RefreshCw, label: "进行中" }
      case "pending":
        return { color: "text-yellow-400", bgColor: "bg-yellow-500", icon: Clock, label: "待执行" }
      case "failed":
        return { color: "text-red-400", bgColor: "bg-red-500", icon: AlertTriangle, label: "失败" }
      default:
        return { color: "text-gray-400", bgColor: "bg-gray-500", icon: Clock, label: "未知" }
    }
  }

  // 获取优先级颜色
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // 获取分类图标
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "architecture":
        return FileText
      case "performance":
        return TrendingUp
      case "code-quality":
        return Target
      case "security":
        return Settings
      default:
        return FileText
    }
  }

  // 过滤任务
  const filteredTasks =
    selectedCategory === "all"
      ? optimizationTasks
      : optimizationTasks.filter((task) => task.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* 优化概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">总体进度</p>
                <p className="text-2xl font-bold text-white">{optimizationStats.overallProgress}%</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <Progress value={optimizationStats.overallProgress} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">已完成</p>
                <p className="text-2xl font-bold text-green-400">{optimizationStats.completedTasks}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <p className="text-white/50 text-xs mt-2">共 {optimizationStats.totalTasks} 项任务</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">进行中</p>
                <p className="text-2xl font-bold text-blue-400">{optimizationStats.runningTasks}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <RefreshCw className="h-6 w-6 text-blue-400 animate-spin" />
              </div>
            </div>
            <p className="text-white/50 text-xs mt-2">正在执行优化任务</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">待执行</p>
                <p className="text-2xl font-bold text-yellow-400">{optimizationStats.pendingTasks}</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <p className="text-white/50 text-xs mt-2">等待执行的任务</p>
          </CardContent>
        </Card>
      </div>

      {/* 优化任务列表 */}
      <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-green-400" />
                优化任务状态
              </CardTitle>
              <CardDescription className="text-white/70">实时跟踪项目优化进度和任务状态</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`border-green-500/30 ${autoRefresh ? "text-green-300 bg-green-500/10" : "text-white"} hover:bg-green-500/10`}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${autoRefresh ? "animate-spin" : ""}`} />
                {autoRefresh ? "自动刷新" : "手动刷新"}
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
              >
                <Play className="h-4 w-4 mr-1" />
                执行优化
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-600">
                全部
              </TabsTrigger>
              <TabsTrigger value="architecture" className="data-[state=active]:bg-green-600">
                架构
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-green-600">
                性能
              </TabsTrigger>
              <TabsTrigger value="code-quality" className="data-[state=active]:bg-green-600">
                代码质量
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-green-600">
                安全
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-0">
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const statusInfo = getStatusInfo(task.status)
                  const StatusIcon = statusInfo.icon
                  const CategoryIcon = getCategoryIcon(task.category)

                  return (
                    <motion.div
                      key={task.id}
                      className="bg-black/60 border border-green-500/10 rounded-lg p-4 hover:bg-green-900/10 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <CategoryIcon className="h-5 w-5 text-green-400" />
                          <div>
                            <h4 className="text-white font-medium">{task.title}</h4>
                            <p className="text-white/70 text-sm mt-1">{task.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority === "high" ? "高" : task.priority === "medium" ? "中" : "低"}优先级
                          </Badge>
                          <Badge className={statusInfo.bgColor}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70 text-sm">进度</span>
                          <span className="text-white text-sm">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />

                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center text-white/60">
                            <Clock className="h-4 w-4 mr-1" />
                            预计时间: {task.estimatedTime}
                          </div>
                          {task.completedAt && <div className="text-green-400">完成时间: {task.completedAt}</div>}
                        </div>

                        <div className="bg-green-900/20 border border-green-500/20 rounded p-3">
                          <div className="text-green-300 text-sm font-medium mb-1">预期影响:</div>
                          <p className="text-green-200/80 text-sm">{task.impact}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
