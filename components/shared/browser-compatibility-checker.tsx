"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  CheckCircle,
  Info,
  Smartphone,
  Tablet,
  Monitor,
  Chrome,
  ChromeIcon as Firefox,
  Globe,
  X,
} from "lucide-react"

// 浏览器类型
type BrowserType = "chrome" | "firefox" | "safari" | "edge" | "opera" | "ie" | "samsung" | "unknown"

// 设备类型
type DeviceType = "mobile" | "tablet" | "desktop" | "unknown"

// 兼容性问题类型
type CompatibilityIssueType = "critical" | "warning" | "info"

// 兼容性问题接口
interface CompatibilityIssue {
  type: CompatibilityIssueType
  message: string
  affectedFeatures?: string[]
  recommendation?: string
}

// 检测浏览器类型
const detectBrowser = (): BrowserType => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.indexOf("chrome") > -1 && userAgent.indexOf("edg") === -1) return "chrome"
  if (userAgent.indexOf("firefox") > -1) return "firefox"
  if (userAgent.indexOf("safari") > -1 && userAgent.indexOf("chrome") === -1) return "safari"
  if (userAgent.indexOf("edg") > -1) return "edge"
  if (userAgent.indexOf("opr") > -1 || userAgent.indexOf("opera") > -1) return "opera"
  if (userAgent.indexOf("msie") > -1 || userAgent.indexOf("trident") > -1) return "ie"
  if (userAgent.indexOf("samsungbrowser") > -1) return "samsung"

  return "unknown"
}

// 检测设备类型
const detectDevice = (): DeviceType => {
  const userAgent = navigator.userAgent.toLowerCase()

  // 检测是否为移动设备
  if (/(android|webos|iphone|ipod|blackberry|iemobile|opera mini)/i.test(userAgent)) {
    return "mobile"
  }

  // 检测是否为平板设备
  if (/(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(userAgent)) {
    return "tablet"
  }

  return "desktop"
}

// 检查浏览器特性支持
const checkFeatureSupport = (): CompatibilityIssue[] => {
  const issues: CompatibilityIssue[] = []

  // 检查 WebP 支持
  if (!window.hasOwnProperty("createImageBitmap")) {
    issues.push({
      type: "warning",
      message: "您的浏览器可能不支持 WebP 图像格式",
      affectedFeatures: ["图像显示"],
      recommendation: "建议升级到最新版本的 Chrome、Firefox 或 Edge 浏览器",
    })
  }

  // 检查 WebGL 支持
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) {
      issues.push({
        type: "warning",
        message: "您的浏览器不支持 WebGL",
        affectedFeatures: ["3D 场景渲染", "高级动画效果"],
        recommendation: "建议使用支持 WebGL 的现代浏览器，如 Chrome、Firefox 或 Edge 的最新版本",
      })
    }
  } catch (e) {
    issues.push({
      type: "warning",
      message: "无法检测 WebGL 支持",
      affectedFeatures: ["3D 场景渲染", "高级动画效果"],
      recommendation: "建议使用支持 WebGL 的现代浏览器，如 Chrome、Firefox 或 Edge 的最新版本",
    })
  }

  // 检查 localStorage 支持
  try {
    localStorage.setItem("test", "test")
    localStorage.removeItem("test")
  } catch (e) {
    issues.push({
      type: "critical",
      message: "您的浏览器不支持或已禁用本地存储",
      affectedFeatures: ["用户登录", "偏好设置", "创作内容保存"],
      recommendation: "请启用浏览器的 Cookie 和本地存储功能，或使用其他现代浏览器",
    })
  }

  // 检查 Intersection Observer 支持
  if (!("IntersectionObserver" in window)) {
    issues.push({
      type: "info",
      message: "您的浏览器不支持 Intersection Observer API",
      affectedFeatures: ["滚动动画", "懒加载"],
      recommendation: "某些动画效果可能无法正常显示，建议升级浏览器",
    })
  }

  // 检查 IE 浏览器
  if (detectBrowser() === "ie") {
    issues.push({
      type: "critical",
      message: "不支持 Internet Explorer 浏览器",
      affectedFeatures: ["整体功能"],
      recommendation: "请使用 Chrome、Firefox、Edge 或 Safari 的最新版本",
    })
  }

  return issues
}

// 获取浏览器图标
const getBrowserIcon = (browser: BrowserType) => {
  switch (browser) {
    case "chrome":
      return <Chrome className="h-5 w-5" />
    case "firefox":
      return <Firefox className="h-5 w-5" />
    default:
      return <Globe className="h-5 w-5" />
  }
}

// 获取设备图标
const getDeviceIcon = (device: DeviceType) => {
  switch (device) {
    case "mobile":
      return <Smartphone className="h-5 w-5" />
    case "tablet":
      return <Tablet className="h-5 w-5" />
    case "desktop":
      return <Monitor className="h-5 w-5" />
    default:
      return <Monitor className="h-5 w-5" />
  }
}

// 获取问题类型图标
const getIssueIcon = (type: CompatibilityIssueType) => {
  switch (type) {
    case "critical":
      return <AlertCircle className="h-5 w-5 text-red-500" />
    case "warning":
      return <AlertCircle className="h-5 w-5 text-amber-500" />
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />
    default:
      return <Info className="h-5 w-5" />
  }
}

export default function BrowserCompatibilityChecker() {
  const [isOpen, setIsOpen] = useState(false)
  const [browser, setBrowser] = useState<BrowserType>("unknown")
  const [device, setDevice] = useState<DeviceType>("unknown")
  const [issues, setIssues] = useState<CompatibilityIssue[]>([])
  const [isCompatible, setIsCompatible] = useState(true)

  useEffect(() => {
    // 检测浏览器和设备
    setBrowser(detectBrowser())
    setDevice(detectDevice())

    // 检查特性支持
    const detectedIssues = checkFeatureSupport()
    setIssues(detectedIssues)

    // 如果有严重问题，则标记为不兼容
    setIsCompatible(!detectedIssues.some((issue) => issue.type === "critical"))

    // 如果有严重问题，自动显示兼容性检查器
    if (detectedIssues.some((issue) => issue.type === "critical")) {
      setIsOpen(true)
    }
  }, [])

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 max-w-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="bg-black/90 backdrop-blur-md border border-amber-500/20 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {isCompatible ? (
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
            )}
            <h3 className="text-lg font-medium text-white">{isCompatible ? "兼容性检查通过" : "检测到兼容性问题"}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/70 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center bg-black/60 px-3 py-2 rounded-full">
            {getBrowserIcon(browser)}
            <span className="ml-2 text-white/80 text-sm capitalize">{browser}</span>
          </div>

          <div className="flex items-center bg-black/60 px-3 py-2 rounded-full">
            {getDeviceIcon(device)}
            <span className="ml-2 text-white/80 text-sm capitalize">{device}</span>
          </div>
        </div>

        {issues.length > 0 ? (
          <div className="space-y-3 mb-4">
            {issues.map((issue, index) => (
              <div key={index} className="bg-black/60 rounded-lg p-3">
                <div className="flex items-start">
                  {getIssueIcon(issue.type)}
                  <div className="ml-3">
                    <div className="text-white font-medium">{issue.message}</div>

                    {issue.affectedFeatures && (
                      <div className="mt-1 text-white/70 text-sm">
                        <span className="font-medium">影响功能：</span>
                        {issue.affectedFeatures.join("、")}
                      </div>
                    )}

                    {issue.recommendation && (
                      <div className="mt-1 text-white/70 text-sm">
                        <span className="font-medium">建议：</span>
                        {issue.recommendation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-green-300">您的浏览器完全兼容本应用的所有功能</div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            variant="outline"
            className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
            onClick={() => setIsOpen(false)}
          >
            关闭
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
