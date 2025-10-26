/**
 * 性能测试工具
 * 用于测量和比较应用性能
 */

// 性能指标类型
export interface PerformanceMetrics {
  // 核心Web指标
  FCP: number // First Contentful Paint
  LCP: number // Largest Contentful Paint
  FID: number // First Input Delay
  CLS: number // Cumulative Layout Shift
  TTI: number // Time to Interactive
  TBT: number // Total Blocking Time

  // 自定义指标
  scriptExecutionTime: number
  memoryUsage: number
  resourceLoadTime: number
  renderTime: number
}

// 性能测试配置
export interface PerformanceTestConfig {
  url: string
  runs: number
  device: "mobile" | "desktop"
  connection: "slow3G" | "fast3G" | "4G" | "WiFi"
  throttleCPU?: number // CPU减速倍数
}

// 性能测试结果
export interface PerformanceTestResult {
  url: string
  timestamp: number
  metrics: PerformanceMetrics
  config: PerformanceTestConfig
  score: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  comparison?: {
    baseline: PerformanceMetrics
    improvement: Record<keyof PerformanceMetrics, number> // 百分比改进
  }
}

/**
 * 运行Lighthouse性能测试
 * 注意：此函数在实际环境中需要与Lighthouse API集成
 */
export async function runLighthouseTest(config: PerformanceTestConfig): Promise<PerformanceTestResult> {
  console.log(`Running Lighthouse test for ${config.url} with ${config.runs} runs...`)

  try {
    // 在实际应用中，这将调用Lighthouse API
    // 这里我们返回模拟数据
    return {
      url: config.url,
      timestamp: Date.now(),
      config,
      metrics: {
        FCP: 1200,
        LCP: 2500,
        FID: 80,
        CLS: 0.05,
        TTI: 3500,
        TBT: 300,
        scriptExecutionTime: 850,
        memoryUsage: 50000000,
        resourceLoadTime: 1500,
        renderTime: 600,
      },
      score: {
        performance: 0.85,
        accessibility: 0.92,
        bestPractices: 0.95,
        seo: 0.98,
      },
    }
  } catch (error) {
    console.error("Error running Lighthouse test:", error)
    throw new Error(
      `Failed to run performance test for ${config.url}: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

/**
 * 比较两次性能测试结果
 */
export function comparePerformanceResults(
  baseline: PerformanceTestResult,
  current: PerformanceTestResult,
): PerformanceTestResult {
  // 定义哪些指标是"值越小越好"的
  const smallerIsBetter: Set<keyof PerformanceMetrics> = new Set([
    "CLS",
    "FID",
    "TBT",
    "scriptExecutionTime",
    "memoryUsage",
  ])

  const improvement: Record<keyof PerformanceMetrics, number> = {} as Record<keyof PerformanceMetrics, number>

  // 计算每个指标的改进百分比
  ;(Object.keys(baseline.metrics) as Array<keyof PerformanceMetrics>).forEach((key) => {
    const baseValue = baseline.metrics[key]
    const currentValue = current.metrics[key]

    // 避免除以非常小的值
    const minThreshold = 0.001

    if (Math.abs(baseValue) < minThreshold) {
      improvement[key] = 0
    } else if (smallerIsBetter.has(key)) {
      // 对于值越小越好的指标
      improvement[key] = ((baseValue - currentValue) / baseValue) * 100
    } else {
      // 对于值越大越好的指标
      improvement[key] = ((currentValue - baseValue) / baseValue) * 100
    }
  })

  return {
    ...current,
    comparison: {
      baseline: baseline.metrics,
      improvement,
    },
  }
}

/**
 * 生成性能报告
 */
export function generatePerformanceReport(results: PerformanceTestResult[]): string {
  if (results.length === 0) {
    return "# 性能测试报告\n\n没有可用的测试结果。"
  }

  // 在实际应用中，这将生成HTML或Markdown报告
  // 这里我们返回简单的文本报告
  return `
# 性能测试报告

生成时间: ${new Date().toLocaleString()}

## 测试结果摘要

${results
  .map(
    (result) => `
### ${result.url}
- 测试时间: ${new Date(result.timestamp).toLocaleString()}
- 性能得分: ${result.score.performance.toFixed(2)}
- LCP: ${result.metrics.LCP}ms
- FID: ${result.metrics.FID}ms
- CLS: ${result.metrics.CLS}

${
  result.comparison
    ? `
#### 与基准比较
- LCP: ${result.comparison.improvement.LCP.toFixed(2)}%
- FID: ${result.comparison.improvement.FID.toFixed(2)}%
- CLS: ${result.comparison.improvement.CLS.toFixed(2)}%
`
    : ""
}
`,
  )
  .join("\n")}
  `
}

/**
 * 创建性能监控仪表板数据
 */
export function createPerformanceDashboardData(results: PerformanceTestResult[]): Record<string, any> {
  if (results.length === 0) {
    return {
      timeSeriesData: [],
      averages: null,
      latest: null,
      improvement: null,
    }
  }

  // 提取时间序列数据
  const timeSeriesData = results.map((result) => ({
    timestamp: result.timestamp,
    performance: result.score.performance,
    LCP: result.metrics.LCP,
    FID: result.metrics.FID,
    CLS: result.metrics.CLS,
  }))

  // 计算平均值
  const averages = {
    performance: average(results.map((r) => r.score.performance)),
    LCP: average(results.map((r) => r.metrics.LCP)),
    FID: average(results.map((r) => r.metrics.FID)),
    CLS: average(results.map((r) => r.metrics.CLS)),
  }

  return {
    timeSeriesData,
    averages,
    latest: results[results.length - 1],
    improvement: results.length > 1 ? comparePerformanceResults(results[0], results[results.length - 1]) : null,
  }
}

/**
 * 检查性能指标是否满足目标
 * @param metrics 当前性能指标
 * @param targets 目标性能指标
 * @returns 包含通过/失败状态的对象
 */
export function checkPerformanceTargets(
  metrics: PerformanceMetrics,
  targets: Partial<Record<keyof PerformanceMetrics, number>>,
): {
  passed: boolean
  results: Record<
    keyof PerformanceMetrics,
    {
      value: number
      target: number | null
      passed: boolean | null
    }
  >
} {
  const results: Record<string, any> = {}
  let allPassed = true

  // 检查每个指标
  Object.keys(metrics).forEach((key) => {
    const metricKey = key as keyof PerformanceMetrics
    const value = metrics[metricKey]
    const target = targets[metricKey] ?? null

    // 如果没有目标，则标记为null
    if (target === null) {
      results[key] = { value, target: null, passed: null }
      return
    }

    // 确定是否通过目标
    const smallerIsBetter = ["CLS", "FID", "TBT", "scriptExecutionTime", "memoryUsage"].includes(key)
    const passed = smallerIsBetter ? value <= target : value >= target

    results[key] = { value, target, passed }

    // 如果任何一个指标未通过，整体结果为未通过
    if (!passed) {
      allPassed = false
    }
  })

  return {
    passed: allPassed,
    results: results as Record<
      keyof PerformanceMetrics,
      {
        value: number
        target: number | null
        passed: boolean | null
      }
    >,
  }
}

// 辅助函数：计算平均值
function average(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

/**
 * 使用示例:
 *
 * // 1. 运行性能测试
 * const testConfig = {
 *   url: 'https://example.com',
 *   runs: 3,
 *   device: 'mobile' as const,
 *   connection: '4G' as const
 * };
 * const result = await runLighthouseTest(testConfig);
 *
 * // 2. 比较两次测试结果
 * const baseline = previousTestResult;
 * const comparison = comparePerformanceResults(baseline, result);
 *
 * // 3. 生成报告
 * const report = generatePerformanceReport([baseline, result]);
 * console.log(report);
 *
 * // 4. 检查是否达到性能目标
 * const targets = {
 *   LCP: 2500,  // 目标LCP小于2.5秒
 *   CLS: 0.1,   // 目标CLS小于0.1
 *   FID: 100    // 目标FID小于100ms
 * };
 * const check = checkPerformanceTargets(result.metrics, targets);
 * console.log(`性能目标检查通过: ${check.passed}`);
 */
