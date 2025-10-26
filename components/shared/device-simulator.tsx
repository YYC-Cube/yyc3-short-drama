"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Smartphone, Tablet, Monitor, X, RotateCcw, Maximize2, Minimize2, ChevronDown, ChevronUp } from "lucide-react"

// 设备类型
type DeviceType = "mobile" | "tablet" | "desktop"

// 设备方向
type DeviceOrientation = "portrait" | "landscape"

// 预设设备
const devicePresets = {
  mobile: {
    name: "手机",
    icon: <Smartphone className="h-5 w-5" />,
    width: {
      portrait: 375,
      landscape: 667,
    },
    height: {
      portrait: 667,
      landscape: 375,
    },
  },
  tablet: {
    name: "平板",
    icon: <Tablet className="h-5 w-5" />,
    width: {
      portrait: 768,
      landscape: 1024,
    },
    height: {
      portrait: 1024,
      landscape: 768,
    },
  },
  desktop: {
    name: "桌面",
    icon: <Monitor className="h-5 w-5" />,
    width: {
      portrait: 1280,
      landscape: 1280,
    },
    height: {
      portrait: 800,
      landscape: 800,
    },
  },
}

// 设备模拟器属性
interface DeviceSimulatorProps {
  children: React.ReactNode
}

export default function DeviceSimulator({ children }: DeviceSimulatorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop")
  const [orientation, setOrientation] = useState<DeviceOrientation>("portrait")
  const [scale, setScale] = useState(0.8)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  // 获取当前设备尺寸
  const currentDevice = devicePresets[deviceType]
  const width = currentDevice.width[orientation]
  const height = currentDevice.height[orientation]

  // 切换设备类型
  const toggleDeviceType = (type: DeviceType) => {
    setDeviceType(type)
  }

  // 切换设备方向
  const toggleOrientation = () => {
    setOrientation((prev) => (prev === "portrait" ? "landscape" : "portrait"))
  }

  // 调整缩放比例
  const adjustScale = (delta: number) => {
    setScale((prev) => {
      const newScale = prev + delta
      return Math.min(Math.max(newScale, 0.3), 1)
    })
  }

  // 切换展开/收起状态
  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
  }

  // 切换最小化状态
  const toggleMinimized = () => {
    setIsMinimized((prev) => !prev)
  }

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-4 left-4 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
          onClick={() => setIsOpen(true)}
        >
          <Monitor className="h-4 w-4 mr-2" />
          设备模拟器
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* 顶部控制栏 */}
        <div className="bg-black/90 border-b border-amber-500/20 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-white mr-6">设备模拟器</h3>

            <div className="flex items-center space-x-2">
              <Button
                variant={deviceType === "mobile" ? "default" : "outline"}
                size="sm"
                className={
                  deviceType === "mobile"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                }
                onClick={() => toggleDeviceType("mobile")}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                手机
              </Button>

              <Button
                variant={deviceType === "tablet" ? "default" : "outline"}
                size="sm"
                className={
                  deviceType === "tablet"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                }
                onClick={() => toggleDeviceType("tablet")}
              >
                <Tablet className="h-4 w-4 mr-2" />
                平板
              </Button>

              <Button
                variant={deviceType === "desktop" ? "default" : "outline"}
                size="sm"
                className={
                  deviceType === "desktop"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                }
                onClick={() => toggleDeviceType("desktop")}
              >
                <Monitor className="h-4 w-4 mr-2" />
                桌面
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              onClick={toggleOrientation}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              旋转
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              onClick={() => adjustScale(0.1)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              onClick={() => adjustScale(-0.1)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              onClick={toggleExpanded}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 设备预览区域 */}
        <div className="flex-grow flex items-center justify-center overflow-auto p-4">
          <motion.div
            className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${isExpanded ? "w-full h-full" : ""}`}
            style={{
              width: isExpanded ? "100%" : `${width}px`,
              height: isExpanded ? "100%" : `${height}px`,
              transform: isExpanded ? "none" : `scale(${scale})`,
              transformOrigin: "center",
              transition: "width 0.3s, height 0.3s",
            }}
          >
            <div className="w-full h-full overflow-auto">{children}</div>

            {/* 设备信息覆盖层 */}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {width} × {height} ({Math.round(scale * 100)}%)
            </div>
          </motion.div>
        </div>

        {/* 底部状态栏 */}
        <div className="bg-black/90 border-t border-amber-500/20 p-2 flex items-center justify-between">
          <div className="text-white/70 text-sm">
            当前设备: {currentDevice.name} | 方向: {orientation === "portrait" ? "纵向" : "横向"} | 缩放:{" "}
            {Math.round(scale * 100)}%
          </div>

          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white" onClick={toggleMinimized}>
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
