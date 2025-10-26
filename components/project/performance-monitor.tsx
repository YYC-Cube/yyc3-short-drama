"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, Activity, Zap, Database, Globe, Server } from "lucide-react"

interface PerformanceMetric {
  name: string
  value: number
  unit: string
  trend: "up" | "down" | "stable"
  status: "good" | "warning" | "critical"
  description: string
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟性能数据加载
    const loadMetrics = () => {
      setMetrics([
        {
          name: "响应时间",
          value: 245,
          unit: "ms",
          trend: "down",
          status: "good",
          description: "平均API响应时间",
        },
        {
          name: "吞吐量",
          value: 1250,
          unit: "req/min",
          trend: "up",
          status: "good",
          description: "每分钟处理请求数",
        },
        {
          name: "错误率",
          value: 0.8,
          unit: "%",
          trend: "stable",
          status: "good",
          description: "系统错误发生率",
        },
        {
          name: "CPU使用率",
          value: 68,
          unit: "%",
          trend: "up",
          status: "warning",
          description: "服务器CPU使用情况",
        },
        {
          name: "内存使用",
          value: 4.2,
          unit: "GB",
          trend: "up",
          status: "good",
          description: "系统内存占用",
        },
        {
          name: "数据库连接",
          value: 45,
          unit: "个",
          trend: "stable",
          status: "good",
          description: "活跃数据库连接数",
        },
      ])
      setIsLoading(false)
    }

    const timer = setTimeout(loadMetrics, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <Activity className="h-4 w-4 text-blue-400" />
    }
  }

  const getMetricIcon = (name: string) => {
    switch (name) {
      case "响应时间":
        return <Zap className="h-5 w-5 text-yellow-400" />
      case "吞吐量":
        return <BarChart3 className="h-5 w-5 text-blue-400" />
      case "错误率":
        return <Activity className="h-5 w-5 text-red-400" />
      case "CPU使用率":
        return <Server className="h-5 w-5 text-purple-400" />
      case "内存使用":
        return <Database className="h-5 w-5 text-green-400" />
      case "数据库连接":
        return <Globe className="h-5 w-5 text-cyan-400" />
      default:
        return <Activity className="h-5 w-5 text-gray-400" />
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="animate-pulse">
                <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse">
                <div className="h-8 bg-white/20 rounded w-1/2 mb-4"></div>
                <div className="h-2 bg-white/10 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 性能概览 */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-400" />
            系统性能监控
          </CardTitle>
          <CardDescription className="text-white/60">实时监控系统关键性能指标</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-black/20 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400 mb-1">98.5%</div>
              <div className="text-sm text-white/60">系统可用性</div>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400 mb-1">2.1s</div>
              <div className="text-sm text-white/60">平均加载时间</div>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400 mb-1">1,247</div>
              <div className="text-sm text-white/60">活跃用户数</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 详细指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getMetricIcon(metric.name)}
                    <CardTitle className="text-white text-lg">{metric.name}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status === "good" && "正常"}
                    {metric.status === "warning" && "警告"}
                    {metric.status === "critical" && "严重"}
                  </Badge>
                </div>
                <CardDescription className="text-white/60">{metric.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-white">
                      {metric.value}
                      <span className="text-lg text-white/60 ml-1">{metric.unit}</span>
                    </span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend)}
                      <span className="text-sm text-white/60">
                        {metric.trend === "up" && "上升"}
                        {metric.trend === "down" && "下降"}
                        {metric.trend === "stable" && "稳定"}
                      </span>
                    </div>
                  </div>

                  {/* 进度条显示 */}
                  {metric.name.includes("使用") && (
                    <div className="space-y-1">
                      <Progress value={metric.value} className="h-2" />
                      <div className="flex justify-between text-xs text-white/60">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 性能趋势图 */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">性能趋势分析</CardTitle>
          <CardDescription className="text-white/60">过去24小时系统性能变化趋势</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-white/10 rounded-lg bg-black/20">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">性能趋势图表</p>
              <p className="text-white/40 text-sm">图表组件将在此处显示</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
