"use client"

import DeviceSimulator from "@/components/shared/device-simulator"
import OptimizedRenderer from "@/components/shared/optimized-renderer"
import { performanceMonitor } from "@/utils/performance-monitor"

export default function TestOptimizationClientPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">兼容性和性能优化测试</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">跨浏览器和跨设备测试</h2>
            <p className="text-white/70 mb-6">
              使用设备模拟器测试不同设备和屏幕尺寸下的界面表现，确保系统在各种环境下都能正常运行。
            </p>

            <DeviceSimulator>
              <div className="p-4">
                <h3 className="text-xl font-bold text-black mb-4">设备模拟器测试内容</h3>
                <p className="text-gray-700 mb-4">
                  这是一个用于测试不同设备和屏幕尺寸的模拟器。您可以切换设备类型、旋转方向和调整缩放比例。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-medium text-black mb-2">手机视图</h4>
                    <p className="text-gray-600 text-sm">测试在手机屏幕上的显示效果，包括纵向和横向模式。</p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-medium text-black mb-2">平板视图</h4>
                    <p className="text-gray-600 text-sm">测试在平板设备上的显示效果，包括纵向和横向模式。</p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-medium text-black mb-2">桌面视图</h4>
                    <p className="text-gray-600 text-sm">测试在桌面设备上的显示效果，包括不同分辨率。</p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-medium text-black mb-2">响应式设计</h4>
                    <p className="text-gray-600 text-sm">测试界面元素在不同屏幕尺寸下的自适应表现。</p>
                  </div>
                </div>
              </div>
            </DeviceSimulator>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">组件渲染优化</h2>
            <p className="text-white/70 mb-6">
              使用 OptimizedRenderer 组件和 withOptimizedRendering 高阶组件减少不必要的重渲染，提高系统响应速度。
            </p>

            <div className="space-y-4">
              <OptimizedRenderer threshold={0.1} delay={200}>
                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">延迟加载组件 1</h3>
                  <p className="text-white/70">
                    这个组件使用 OptimizedRenderer 包装，只有在进入视图后才会渲染，并且有 200ms 的延迟。
                  </p>
                </div>
              </OptimizedRenderer>

              <OptimizedRenderer threshold={0.1} delay={400}>
                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">延迟加载组件 2</h3>
                  <p className="text-white/70">
                    这个组件使用 OptimizedRenderer 包装，只有在进入视图后才会渲染，并且有 400ms 的延迟。
                  </p>
                </div>
              </OptimizedRenderer>

              <OptimizedRenderer threshold={0.1} delay={600}>
                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">延迟加载组件 3</h3>
                  <p className="text-white/70">
                    这个组件使用 OptimizedRenderer 包装，只有在进入视图后才会渲染，并且有 600ms 的延迟。
                  </p>
                </div>
              </OptimizedRenderer>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">数据懒加载</h2>
          <p className="text-white/70 mb-6">
            使用 useLazyData 钩子实现数据懒加载，提升大数据量下的性能。当用户滚动到页面底部时，自动加载更多数据。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="bg-black/60 border border-amber-500/10 rounded-lg p-4"
                onLoad={() => {
                  const endMeasure = performanceMonitor.startMeasure(`LazyLoadItem-${index}`)
                  setTimeout(endMeasure, 0)
                }}
              >
                <div className="h-40 bg-amber-900/20 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-amber-300 text-lg">Item {index + 1}</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">懒加载数据项 {index + 1}</h3>
                <p className="text-white/70">
                  这是一个模拟的数据项，用于测试懒加载功能。在实际应用中，这些数据会从服务器动态加载。
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                const endMeasure = performanceMonitor.startMeasure("LoadMoreButton")
                setTimeout(endMeasure, 100)
              }}
            >
              加载更多
            </button>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">性能监控</h2>
          <p className="text-white/70 mb-6">
            使用 performanceMonitor 工具和 withPerformanceTracking 高阶组件跟踪和优化组件渲染性能。
            点击下面的按钮生成性能报告。
          </p>

          <div className="flex justify-center">
            <button
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                const report = performanceMonitor.exportReport()
                console.log("Performance Report:", report)
                alert("性能报告已生成，请在控制台查看")
              }}
            >
              生成性能报告
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
