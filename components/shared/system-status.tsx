"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  AlertCircle,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  Cpu,
  MemoryStickIcon as Memory,
  Wifi,
  Clock,
  BarChart,
} from "lucide-react"
import { performanceMonitor } from "@/utils/performance-monitor"

// 系统状态类型
interface SystemStatus {
  performance: {
    fps: number
    memory: number // MB
    loadTime: number // ms
    renderTime: number // ms
    networkLatency: number // ms
    slowComponents: { name: string; time: number }[]
  }
  compatibility: {
    browser: string
    browserVersion: string
    device: string
    screenSize: string
    issues: string[]
  }
}

export default function SystemStatus() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [status, setStatus] = useState<SystemStatus>({
    performance: {
      fps: 0,
      memory: 0,
      loadTime: 0,
      renderTime: 0,
      networkLatency: 0,
      slowComponents: [],
    },
    compatibility: {
      browser: "",
      browserVersion: "",
      device: "",
      screenSize: "",
      issues: [],
    },
  })

  // 获取系统状态
  useEffect(() => {
    if (!isOpen) return

    // 获取浏览器和设备信息
    const userAgent = navigator.userAgent
    const browserInfo = detectBrowser(userAgent)
    const deviceInfo = detectDevice(userAgent)
    const screenSize = `${window.innerWidth}x${window.innerHeight}`

    // 获取性能信息
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    const memory = (performance as any).memory?.usedJSHeapSize / (1024 * 1024) || 0

    // 获取慢组件
    const slowComponents = performanceMonitor
      .getSlowestComponents(5)
      .map((comp) => ({ name: comp.componentName, time: comp.averageTime }))

    // 模拟 FPS 和网络延迟
    const fps = Math.round(60 - Math.random() * 10)
    const networkLatency = Math.round(50 + Math.random() * 100)

    // 更新状态
    setStatus({
      performance: {
        fps,
        memory,
        loadTime,
        renderTime: slowComponents[0]?.time || 0,
        networkLatency,
        slowComponents,
      },
      compatibility: {
        browser: browserInfo.name,
        browserVersion: browserInfo.version,
        device: deviceInfo,
        screenSize,
        issues: detectIssues(browserInfo.name, browserInfo.version),
      },
    })

    // 定期更新状态
    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        performance: {
          ...prev.performance,
          fps: Math.round(60 - Math.random() * 10),
          memory: (performance as any).memory?.usedJSHeapSize / (1024 * 1024) || prev.performance.memory,
          networkLatency: Math.round(50 + Math.random() * 100),
        },
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [isOpen])

  // 检测浏览器
  const detectBrowser = (userAgent: string) => {
    const ua = userAgent.toLowerCase()
    let name = "Unknown"
    let version = "Unknown"

    if (ua.indexOf("chrome") > -1 && ua.indexOf("edg") === -1) {
      name = "Chrome"
      version = ua.match(/chrome\/(\d+\.\d+)/)![1]
    } else if (ua.indexOf("firefox") > -1) {
      name = "Firefox"
      version = ua.match(/firefox\/(\d+\.\d+)/)![1]
    } else if (ua.indexOf("safari") > -1 && ua.indexOf("chrome") === -1) {
      name = "Safari"
      version = ua.match(/version\/(\d+\.\d+)/)![1]
    } else if (ua.indexOf("edg") > -1) {
      name = "Edge"
      version = ua.match(/edg\/(\d+\.\d+)/)![1]
    }

    return { name, version }
  }

  // 检测设备
  const detectDevice = (userAgent: string) => {
    const ua = userAgent.toLowerCase()

    if (/(android|webos|iphone|ipod|blackberry|iemobile|opera mini)/i.test(ua)) {
      return "Mobile"
    } else if (/(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(ua)) {
      return "Tablet"
    } else {
      return "Desktop"
    }
  }

  // 检测潜在问题
  const detectIssues = (browser: string, version: string) => {
    const issues: string[] = []

    // 检查旧版浏览器
    if (browser === "Chrome" && Number.parseFloat(version) < 80) {
      issues.push("Chrome 版本过低，建议升级到最新版本")
    } else if (browser === "Firefox" && Number.parseFloat(version) < 70) {
      issues.push("Firefox 版本过低，建议升级到最新版本")
    } else if (browser === "Safari" && Number.parseFloat(version) < 13) {
      issues.push("Safari 版本过低，建议升级到最新版本")
    }

    // 检查 WebP 支持
    if (!window.hasOwnProperty("createImageBitmap")) {
      issues.push("浏览器可能不支持 WebP 图像格式")
    }

    // 检查 WebGL 支持
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        issues.push("浏览器不支持 WebGL，部分动画效果可能无法正常显示")
      }
    } catch (e) {
      issues.push("无法检测 WebGL 支持")
    }

    return issues
  }

  // 获取性能评级
  const getPerformanceRating = () => {
    const { fps, memory, loadTime, renderTime, networkLatency } = status.performance

    // 根据各项指标计算总分
    let score = 0

    // FPS 评分 (最高 30 分)
    score += Math.min(30, fps / 2)

    // 内存使用评分 (最高 20 分)
    score += Math.min(20, (1 - Math.min(memory, 500) / 500) * 20)

    // 加载时间评分 (最高 20 分)
    score += Math.min(20, (1 - Math.min(loadTime, 5000) / 5000) * 20)

    // 渲染时间评分 (最高 15 分)
    score += Math.min(15, (1 - Math.min(renderTime, 100) / 100) * 15)

    // 网络延迟评分 (最高 15 分)
    score += Math.min(15, (1 - Math.min(networkLatency, 300) / 300) * 15)

    // 总分 (0-100)
    return Math.round(score)
  }

  // 获取性能等级
  const getPerformanceLevel = () => {
    const score = getPerformanceRating()

    if (score >= 90) return { level: "Excellent", color: "text-green-500" }
    if (score >= 75) return { level: "Good", color: "text-blue-500" }
    if (score >= 60) return { level: "Average", color: "text-amber-500" }
    if (score >= 40) return { level: "Poor", color: "text-orange-500" }
    return { level: "Critical", color: "text-red-500" }
  }

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
          onClick={() => setIsOpen(true)}
        >
          <Activity className="h-4 w-4 mr-2" />
          系统状态
        </Button>
      </motion.div>
    )
  }

  const performanceLevel = getPerformanceLevel()
  const performanceScore = getPerformanceRating()

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 w-full max-w-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="bg-black/90 backdrop-blur-md border border-amber-500/20 rounded-lg shadow-lg overflow-hidden">
        {/* 头部 */}
        <div className="p-4 flex justify-between items-center border-b border-amber-500/20">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-amber-400 mr-2" />
            <h3 className="text-lg font-medium text-white">系统状态</h3>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white h-8 w-8 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white h-8 w-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 性能概览 */}
        <div className="p-4 border-b border-amber-500/20">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white font-medium">性能评分</div>
            <div className={`font-bold ${performanceLevel.color}`}>
              {performanceScore}/100 ({performanceLevel.level})
            </div>
          </div>

          <Progress value={performanceScore} className="h-2 mb-4" />

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-black/60 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center mb-1">
                <Cpu className="h-4 w-4 text-amber-400 mr-1" />
                <span className="text-white/70 text-xs">FPS</span>
              </div>
              <div className="text-white font-medium">{status.performance.fps}</div>
            </div>

            <div className="bg-black/60 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center mb-1">
                <Memory className="h-4 w-4 text-amber-400 mr-1" />
                <span className="text-white/70 text-xs">内存</span>
              </div>
              <div className="text-white font-medium">{status.performance.memory.toFixed(1)} MB</div>
            </div>

            <div className="bg-black/60 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center mb-1">
                <Wifi className="h-4 w-4 text-amber-400 mr-1" />
                <span className="text-white/70 text-xs">网络</span>
              </div>
              <div className="text-white font-medium">{status.performance.networkLatency} ms</div>
            </div>
          </div>
        </div>

        {/* 详细信息 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 兼容性信息 */}
              <div className="p-4 border-b border-amber-500/20">
                <div className="text-white font-medium mb-3">兼容性信息</div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-black/60 rounded-lg p-2">
                    <div className="text-white/70 text-xs mb-1">浏览器</div>
                    <div className="text-white text-sm">
                      {status.compatibility.browser} {status.compatibility.browserVersion}
                    </div>
                  </div>

                  <div className="bg-black/60 rounded-lg p-2">
                    <div className="text-white/70 text-xs mb-1">设备</div>
                    <div className="text-white text-sm">{status.compatibility.device}</div>
                  </div>

                  <div className="bg-black/60 rounded-lg p-2">
                    <div className="text-white/70 text-xs mb-1">屏幕尺寸</div>
                    <div className="text-white text-sm">{status.compatibility.screenSize}</div>
                  </div>

                  <div className="bg-black/60 rounded-lg p-2">
                    <div className="text-white/70 text-xs mb-1">问题数量</div>
                    <div className="text-white text-sm">{status.compatibility.issues.length}</div>
                  </div>
                </div>

                {status.compatibility.issues.length > 0 && (
                  <div className="bg-black/60 rounded-lg p-3">
                    <div className="text-white/70 text-xs mb-2">检测到的问题</div>
                    <ul className="space-y-1">
                      {status.compatibility.issues.map((issue, index) => (
                        <li key={index} className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-white/90 text-sm">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 性能详情 */}
              <div className="p-4 border-b border-amber-500/20">
                <div className="text-white font-medium mb-3">性能详情</div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-amber-400 mr-2" />
                      <span className="text-white/70">页面加载时间</span>
                    </div>
                    <span className="text-white">{status.performance.loadTime} ms</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 text-amber-400 mr-2" />
                      <span className="text-white/70">平均渲染时间</span>
                    </div>
                    <span className="text-white">{status.performance.renderTime.toFixed(2)} ms</span>
                  </div>

                  <div className="bg-black/60 rounded-lg p-3">
                    <div className="text-white/70 text-xs mb-2">最慢组件</div>
                    {status.performance.slowComponents.length > 0 ? (
                      <ul className="space-y-2">
                        {status.performance.slowComponents.map((comp, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span className="text-white/90 text-sm truncate max-w-[200px]">{comp.name}</span>
                            <span
                              className={`text-sm ${
                                comp.time > 16 ? "text-red-400" : comp.time > 8 ? "text-amber-400" : "text-green-400"
                              }`}
                            >
                              {comp.time.toFixed(2)} ms
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-white/50 text-sm">无数据</div>
                    )}
                  </div>
                </div>
              </div>

              {/* 优化建议 */}
              <div className="p-4">
                <div className="text-white font-medium mb-3">优化建议</div>

                <ul className="space-y-2">
                  {performanceScore < 90 && (
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm">使用 OptimizedRenderer 组件减少不必要的重渲染</span>
                    </li>
                  )}

                  {status.performance.memory > 200 && (
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm">使用 useLazyData 钩子实现数据懒加载，减少内存占用</span>
                    </li>
                  )}

                  {status.performance.networkLatency > 100 && (
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm">优化网络请求，使用缓存和数据预加载减少延迟</span>
                    </li>
                  )}

                  {status.performance.slowComponents.some((comp) => comp.time > 10) && (
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm">
                        使用 withPerformanceTracking 高阶组件监控并优化慢组件
                      </span>
                    </li>
                  )}

                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 text-sm">使用 BrowserCompatibilityChecker 确保跨浏览器兼容性</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
