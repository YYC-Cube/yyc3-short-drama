/**
 * 性能监控基线配置
 * 定义各项性能指标的基准值和阈值
 */

export interface PerformanceThreshold {
  good: number
  warning: number
  critical: number
}

export interface PerformanceBaseline {
  name: string
  unit: string
  thresholds: PerformanceThreshold
  description: string
  category: "loading" | "interactivity" | "visual" | "resource"
}

// 性能基线配置
export const performanceBaselines: PerformanceBaseline[] = [
  {
    name: "First Contentful Paint",
    unit: "ms",
    thresholds: {
      good: 1800,
      warning: 3000,
      critical: 4000,
    },
    description: "首次内容绘制时间",
    category: "loading",
  },
  {
    name: "Largest Contentful Paint",
    unit: "ms",
    thresholds: {
      good: 2500,
      warning: 4000,
      critical: 6000,
    },
    description: "最大内容绘制时间",
    category: "loading",
  },
  {
    name: "First Input Delay",
    unit: "ms",
    thresholds: {
      good: 100,
      warning: 300,
      critical: 500,
    },
    description: "首次输入延迟",
    category: "interactivity",
  },
  {
    name: "Cumulative Layout Shift",
    unit: "",
    thresholds: {
      good: 0.1,
      warning: 0.25,
      critical: 0.5,
    },
    description: "累积布局偏移",
    category: "visual",
  },
  {
    name: "Time to Interactive",
    unit: "ms",
    thresholds: {
      good: 3800,
      warning: 7300,
      critical: 10000,
    },
    description: "可交互时间",
    category: "interactivity",
  },
  {
    name: "Bundle Size",
    unit: "KB",
    thresholds: {
      good: 500,
      warning: 1000,
      critical: 1500,
    },
    description: "打包文件大小",
    category: "resource",
  },
  {
    name: "Memory Usage",
    unit: "MB",
    thresholds: {
      good: 50,
      warning: 100,
      critical: 150,
    },
    description: "内存使用量",
    category: "resource",
  },
]

/**
 * 评估性能指标状态
 */
export function evaluatePerformanceMetric(
  value: number,
  baseline: PerformanceBaseline,
): "good" | "warning" | "critical" {
  const { thresholds } = baseline

  if (value <= thresholds.good) {
    return "good"
  } else if (value <= thresholds.warning) {
    return "warning"
  } else {
    return "critical"
  }
}

/**
 * 获取性能建议
 */
export function getPerformanceRecommendations(metricName: string, status: "good" | "warning" | "critical"): string[] {
  const recommendations: Record<string, string[]> = {
    "First Contentful Paint": [
      "启用服务端渲染(SSR)",
      "优化关键资源加载",
      "使用CDN加速静态资源",
      "减少阻塞渲染的CSS和JavaScript",
    ],
    "Largest Contentful Paint": [
      "优化图片加载和压缩",
      "实施懒加载策略",
      "减少阻塞渲染的资源",
      "使用现代图片格式(WebP, AVIF)",
    ],
    "First Input Delay": [
      "减少JavaScript执行时间",
      "使用Web Workers处理复杂计算",
      "优化事件处理器",
      "延迟加载非关键JavaScript",
    ],
    "Cumulative Layout Shift": [
      "为图片和视频设置尺寸属性",
      "避免在现有内容上方插入内容",
      "使用transform动画替代改变布局的动画",
      "预留广告和嵌入内容的空间",
    ],
    "Time to Interactive": [
      "减少JavaScript执行时间",
      "实施代码分割",
      "优化第三方脚本加载",
      "使用Service Worker缓存资源",
    ],
    "Bundle Size": ["启用Tree Shaking", "移除未使用的依赖", "使用动态导入", "压缩和混淆代码"],
    "Memory Usage": ["优化组件卸载逻辑", "避免内存泄漏", "使用React.memo优化重渲染", "清理事件监听器和定时器"],
  }

  return recommendations[metricName] || ["暂无具体建议"]
}

/**
 * 生成性能报告
 */
export interface PerformanceReport {
  timestamp: string
  overallScore: number
  metrics: Array<{
    name: string
    value: number
    status: "good" | "warning" | "critical"
    recommendations: string[]
  }>
  summary: {
    goodCount: number
    warningCount: number
    criticalCount: number
  }
}

export function generatePerformanceReport(metrics: Array<{ name: string; value: number }>): PerformanceReport {
  const evaluatedMetrics = metrics.map((metric) => {
    const baseline = performanceBaselines.find((b) => b.name === metric.name)
    if (!baseline) {
      return {
        name: metric.name,
        value: metric.value,
        status: "good" as const,
        recommendations: [],
      }
    }

    const status = evaluatePerformanceMetric(metric.value, baseline)
    const recommendations = status !== "good" ? getPerformanceRecommendations(metric.name, status) : []

    return {
      name: metric.name,
      value: metric.value,
      status,
      recommendations,
    }
  })

  const summary = {
    goodCount: evaluatedMetrics.filter((m) => m.status === "good").length,
    warningCount: evaluatedMetrics.filter((m) => m.status === "warning").length,
    criticalCount: evaluatedMetrics.filter((m) => m.status === "critical").length,
  }

  // 计算总体评分 (0-100)
  const totalMetrics = evaluatedMetrics.length
  const weightedScore = evaluatedMetrics.reduce((score, metric) => {
    switch (metric.status) {
      case "good":
        return score + 100
      case "warning":
        return score + 60
      case "critical":
        return score + 20
      default:
        return score
    }
  }, 0)

  const overallScore = Math.round(weightedScore / totalMetrics)

  return {
    timestamp: new Date().toISOString(),
    overallScore,
    metrics: evaluatedMetrics,
    summary,
  }
}
