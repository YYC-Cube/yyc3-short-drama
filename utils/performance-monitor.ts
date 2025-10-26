"use client"

import React from "react"
import { useEffect, forwardRef, type ComponentType } from "react"

// 性能指标类型
type PerformanceMetric = {
  componentName: string
  renderTime: number
  timestamp: number
}

// 性能监控配置
type PerformanceMonitorConfig = {
  enabled: boolean // 修复：使用类型而不是表达式
  logToConsole: boolean
  sampleRate: number // 0-1 之间的值，表示采样率
  slowThreshold: number // 毫秒，超过此阈值的渲染被视为"慢渲染"
  maxEntries: number // 最大记录条数
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerformanceMetric[] = []
  private config: PerformanceMonitorConfig = {
    enabled: process.env.NODE_ENV === "development",
    logToConsole: process.env.NODE_ENV === "development",
    sampleRate: 0.1, // 默认采样 10% 的渲染
    slowThreshold: 16, // 16ms = 60fps
    maxEntries: 100,
  }

  private constructor() {
    // 私有构造函数，防止直接实例化
  }

  // 单例模式
  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // 配置监控器
  public configure(config: Partial<PerformanceMonitorConfig>): void {
    this.config = { ...this.config, ...config }
  }

  // 开始测量组件渲染时间
  public startMeasure(componentName: string): () => void {
    if (!this.config.enabled || Math.random() > this.config.sampleRate) {
      return () => {}
    }

    const startTime = performance.now()

    // 返回一个函数，用于结束测量
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime

      this.recordMetric({
        componentName,
        renderTime,
        timestamp: Date.now(),
      })

      if (this.config.logToConsole && renderTime > this.config.slowThreshold) {
        console.warn(
          `%c慢渲染检测: ${componentName} 渲染耗时 ${renderTime.toFixed(2)}ms`,
          "color: #FFA500; font-weight: bold;",
        )
      }
    }
  }

  // 记录性能指标
  private recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric)

    // 限制记录数量
    if (this.metrics.length > this.config.maxEntries) {
      this.metrics.shift()
    }
  }

  // 获取所有性能指标
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  // 获取组件的平均渲染时间
  public getAverageRenderTime(componentName: string): number {
    const componentMetrics = this.metrics.filter((m) => m.componentName === componentName)

    if (componentMetrics.length === 0) {
      return 0
    }

    const totalTime = componentMetrics.reduce((sum, metric) => sum + metric.renderTime, 0)
    return totalTime / componentMetrics.length
  }

  // 获取最慢的组件
  public getSlowestComponents(limit = 5): { componentName: string; averageTime: number }[] {
    const componentMap = new Map<string, number[]>()

    // 按组件名称分组
    this.metrics.forEach((metric) => {
      if (!componentMap.has(metric.componentName)) {
        componentMap.set(metric.componentName, [])
      }
      componentMap.get(metric.componentName)?.push(metric.renderTime)
    })

    // 计算每个组件的平均渲染时间
    const averages = Array.from(componentMap.entries()).map(([name, times]) => {
      const average = times.reduce((sum, time) => sum + time, 0) / times.length
      return { componentName: name, averageTime: average }
    })

    // 按平均时间降序排序并限制数量
    return averages.sort((a, b) => b.averageTime - a.averageTime).slice(0, limit)
  }

  // 清除所有指标
  public clearMetrics(): void {
    this.metrics = []
  }

  // Performance monitoring HOC
  public exportReport(): string {
    const slowestComponents = this.getSlowestComponents(10)
    const totalComponents = new Set(this.metrics.map((m) => m.componentName)).size
    const totalRenders = this.metrics.length
    const slowRenders = this.metrics.filter((m) => m.renderTime > this.config.slowThreshold).length

    const report = {
      summary: {
        totalComponents,
        totalRenders,
        slowRenders,
        slowRenderPercentage: ((slowRenders / totalRenders) * 100).toFixed(2) + "%",
      },
      slowestComponents,
      timestamp: new Date().toISOString(),
    }

    return JSON.stringify(report, null, 2)
  }
}

// 导出单例实例
export const performanceMonitor = PerformanceMonitor.getInstance()

// Performance monitoring HOC
export function withPerformanceTracking<P extends object>(
  Component: ComponentType<P>,
  options: { name?: string } = {},
): React.FC<P> {
  const componentName = options.name || Component.displayName || Component.name || "UnknownComponent"

  const WrappedComponent: React.FC<P> = forwardRef<any, P>((props, ref) => {
    const endMeasure = performanceMonitor.startMeasure(componentName)

    useEffect(() => {
      endMeasure()
    }, [endMeasure])

    return React.createElement(Component, { ...props, ref: ref })
  })

  WrappedComponent.displayName = `withPerformanceTracking(${componentName})`

  return WrappedComponent
}
