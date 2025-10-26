#!/usr/bin/env tsx

/**
 * 性能基线建立脚本
 * 建立项目性能监控基线，设置性能指标阈值
 */

import { performanceMonitor } from "../utils/performance-monitor"

console.log("📊 建立性能监控基线...")
console.log("=".repeat(50))

// 配置性能监控器
performanceMonitor.configure({
  enabled: true,
  logToConsole: true,
  sampleRate: 1.0, // 100% 采样用于基线建立
  slowThreshold: 16, // 16ms = 60fps
  maxEntries: 1000,
})

console.log("⚙️  性能监控配置:")
console.log("- 启用状态: ✅ 已启用")
console.log("- 采样率: 100% (基线建立期间)")
console.log("- 慢渲染阈值: 16ms")
console.log("- 最大记录数: 1000条")

// 模拟一些性能数据用于基线
const simulatePerformanceData = () => {
  const components = [
    "HomePage",
    "MainLayout",
    "NavigationMenu",
    "ProjectDashboard",
    "FileStructureOptimizer",
    "PerformanceMonitor",
    "CulturalGeneComponent",
    "AIScriptGenerator",
    "SocialSystemHub",
    "StarEconomyPanel",
  ]

  console.log("\n🔄 模拟组件渲染性能数据...")

  components.forEach((componentName) => {
    // 模拟不同的渲染时间
    const renderTime = Math.random() * 30 + 5 // 5-35ms

    // 记录性能数据
    const endMeasure = performanceMonitor.startMeasure(componentName)
    setTimeout(endMeasure, renderTime)

    console.log(`   📈 ${componentName}: ${renderTime.toFixed(2)}ms`)
  })
}

// 执行性能数据模拟
simulatePerformanceData()

// 等待数据收集完成
setTimeout(() => {
  console.log("\n📊 性能基线分析:")

  // 获取最慢的组件
  const slowestComponents = performanceMonitor.getSlowestComponents(5)
  console.log("\n🐌 最慢的组件 (Top 5):")
  slowestComponents.forEach((comp, index) => {
    console.log(`   ${index + 1}. ${comp.componentName}: ${comp.averageTime.toFixed(2)}ms`)
  })

  // 生成性能报告
  const report = performanceMonitor.exportReport()
  console.log("\n📋 性能基线报告:")
  const reportData = JSON.parse(report)

  console.log(`- 监控组件数: ${reportData.summary.totalComponents}`)
  console.log(`- 总渲染次数: ${reportData.summary.totalRenders}`)
  console.log(`- 慢渲染次数: ${reportData.summary.slowRenders}`)
  console.log(`- 慢渲染比例: ${reportData.summary.slowRenderPercentage}`)

  // 设置性能阈值建议
  console.log("\n🎯 建议的性能阈值:")
  console.log("- 页面加载时间: < 3.0s")
  console.log("- 首次内容绘制(FCP): < 1.8s")
  console.log("- 最大内容绘制(LCP): < 2.5s")
  console.log("- 累积布局偏移(CLS): < 0.1")
  console.log("- 首次输入延迟(FID): < 100ms")
  console.log("- 组件渲染时间: < 16ms")

  console.log("\n✅ 性能基线建立完成!")
  console.log("\n🔗 查看详细监控数据:")
  console.log("- 访问 /project-management 页面")
  console.log("- 切换到 '性能监控中心' 标签")
  console.log("- 点击 '开始监控' 按钮启动实时监控")
}, 2000)
