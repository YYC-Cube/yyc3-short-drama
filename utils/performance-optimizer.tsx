"use client"

/**
 * 性能优化工具
 * 提供代码分割、懒加载和性能监控功能
 */

import type React from "react"
import { useEffect, useState, useRef, forwardRef } from "react"
import Image from "next/image"

/**
 * 组件懒加载钩子 - 改进版
 * 接受元素引用或ID作为参数
 */
export function useInViewLoader<T>(
  loader: () => Promise<T>,
  elementRef: React.RefObject<HTMLElement> | string,
  options = { rootMargin: "200px" },
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    // 检查浏览器支持
    if (typeof IntersectionObserver === "undefined") {
      // 回退：直接加载
      setInView(true)
      return
    }

    // 创建交叉观察器
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, options)

    // 获取目标元素
    let element: Element | null = null
    if (typeof elementRef === "string") {
      element = document.getElementById(elementRef)
    } else if (elementRef.current) {
      element = elementRef.current
    }

    if (element) {
      observer.observe(element)
    } else {
      // 如果找不到元素，也直接加载
      setInView(true)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [elementRef, options])

  useEffect(() => {
    if (inView && !data && !error) {
      loader()
        .then((result) => {
          setData(result)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
    }
  }, [inView, data, error, loader])

  return { data, loading, error }
}

/**
 * 资源预加载
 * 在空闲时预加载关键资源
 */
export function preloadResources(resources: string[]): void {
  if (typeof window === "undefined") return

  const requestIdleCallback = (window as any).requestIdleCallback || ((callback: () => void) => setTimeout(callback, 1))

  requestIdleCallback(() => {
    resources.forEach((resource) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = resource
      document.head.appendChild(link)
    })
  })
}

/**
 * 图片懒加载组件属性
 */
export interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholderColor?: string
}

/**
 * 图片懒加载组件
 * 仅在图片进入视口时加载
 */
export const LazyImage = forwardRef<HTMLDivElement, LazyImageProps>(
  ({ src, alt, width, height, className = "", placeholderColor = "#f0f0f0" }, ref) => {
    const imgRef = useRef<HTMLDivElement>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(false)

    // 使用合并的ref
    const combinedRef = useRef<HTMLDivElement | null>(null)

    // 同步外部ref和内部ref
    useEffect(() => {
      if (!ref) return

      if (typeof ref === "function") {
        ref(imgRef.current)
      } else {
        ref.current = imgRef.current
      }

      combinedRef.current = imgRef.current
    }, [ref])

    useEffect(() => {
      if (typeof IntersectionObserver === "undefined") {
        setIsInView(true)
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { rootMargin: "200px" },
      )

      if (combinedRef.current) {
        observer.observe(combinedRef.current)
      }

      return () => {
        if (combinedRef.current) {
          observer.unobserve(combinedRef.current)
        }
      }
    }, [])

    return (
      <div
        ref={imgRef}
        className={`relative overflow-hidden ${className}`}
        style={{
          width: width || "100%",
          height: height || "auto",
          backgroundColor: placeholderColor,
        }}
      >
        {isInView && (
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
            fill={!width || !height}
            sizes={!width || !height ? "100vw" : undefined}
            style={width && height ? { objectFit: "cover" } : undefined}
          />
        )}
      </div>
    )
  },
)

LazyImage.displayName = "LazyImage"

/**
 * 性能指标收集
 */
export function collectPerformanceMetrics(): Record<string, number> {
  if (typeof window === "undefined" || !("performance" in window)) {
    return {}
  }

  const metrics: Record<string, number> = {}

  try {
    // 收集导航计时指标
    if ("getEntriesByType" in performance) {
      const navigationEntries = performance.getEntriesByType("navigation")
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0] as PerformanceNavigationTiming
        metrics.loadTime = navEntry.loadEventEnd
        metrics.domContentLoaded = navEntry.domContentLoadedEventEnd
        metrics.firstPaint = navEntry.responseEnd
        metrics.ttfb = navEntry.responseStart - navEntry.requestStart
      }
    } else if ("timing" in performance) {
      // 回退到旧版API
      const timing = performance.timing
      metrics.loadTime = timing.loadEventEnd - timing.navigationStart
      metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart
      metrics.firstPaint = timing.responseEnd - timing.navigationStart
      metrics.ttfb = timing.responseStart - timing.requestStart
    }

    // 收集内存使用情况 (仅Chrome支持)
    if ("memory" in performance) {
      const memory = (performance as any).memory
      if (memory) {
        metrics.usedJSHeapSize = memory.usedJSHeapSize
        metrics.totalJSHeapSize = memory.totalJSHeapSize
      }
    }

    // 收集FCP和LCP (如果支持)
    if ("getEntriesByType" in performance) {
      const paintEntries = performance.getEntriesByType("paint")
      const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint")
      if (fcpEntry) {
        metrics.firstContentfulPaint = fcpEntry.startTime
      }
    }
  } catch (error) {
    console.error("Error collecting performance metrics:", error)
  }

  return metrics
}

/**
 * 组件性能监控HOC
 */
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string,
): React.FC<P> {
  const displayName = componentName || Component.displayName || Component.name || "Component"

  const WrappedComponent: React.FC<P> = (props) => {
    useEffect(() => {
      const startTime = performance.now()

      return () => {
        const endTime = performance.now()
        const renderTime = endTime - startTime

        if (renderTime > 16) {
          // 16ms = 60fps
          console.warn(
            `%c性能警告: ${displayName} 渲染耗时 ${renderTime.toFixed(2)}ms`,
            "color: #FFA500; font-weight: bold;",
          )
        }
      }
    }, [])

    return <Component {...props} />
  }

  WrappedComponent.displayName = `withPerformanceTracking(${displayName})`

  return WrappedComponent
}

/**
 * 使用示例:
 *
 * // 1. 懒加载钩子
 * const MyComponent = () => {
 *   const containerRef = useRef(null);
 *   const { data, loading } = useInViewLoader(() => import('./heavy-component'), containerRef);
 *
 *   return (
 *     <div ref={containerRef}>
 *       {loading ? <Spinner /> : data && <data.default />}
 *     </div>
 *   );
 * };
 *
 * // 2. 预加载资源
 * useEffect(() => {
 *   preloadResources(['/images/hero.jpg', '/fonts/main.woff2']);
 * }, []);
 *
 * // 3. 懒加载图片
 * <LazyImage
 *   src="/images/product.jpg"
 *   alt="Product"
 *   width={300}
 *   height={200}
 * />
 *
 * // 4. 性能监控
 * const metrics = collectPerformanceMetrics();
 * console.log(metrics);
 *
 * // 5. 性能监控HOC
 * const OptimizedComponent = withPerformanceTracking(ExpensiveComponent);
 */
