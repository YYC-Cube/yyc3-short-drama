"use client"

import { useState, useEffect, useRef, useMemo, memo, type ReactNode, type ComponentType } from "react"
import { useInView } from "framer-motion"

// 优化渲染组件属性
interface OptimizedRendererProps {
  children: ReactNode
  threshold?: number
  delay?: number
  disabled?: boolean
  onVisible?: () => void
  id?: string
}

// 使用 memo 包装的优化渲染组件
const OptimizedRenderer = memo(
  ({ children, threshold = 0.1, delay = 0, disabled = false, onVisible, id }: OptimizedRendererProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: threshold })
    const [shouldRender, setShouldRender] = useState(disabled)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // 清理定时器
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    // 当进入视图时，延迟渲染
    useEffect(() => {
      if (disabled) {
        setShouldRender(true)
        return
      }

      if (isInView && !shouldRender) {
        if (delay > 0) {
          timeoutRef.current = setTimeout(() => {
            setShouldRender(true)
            if (onVisible) onVisible()
          }, delay)
        } else {
          setShouldRender(true)
          if (onVisible) onVisible()
        }
      }
    }, [isInView, shouldRender, delay, disabled, onVisible])

    // 使用 useMemo 缓存渲染结果
    const content = useMemo(() => {
      return shouldRender ? children : null
    }, [shouldRender, children])

    return (
      <div ref={ref} id={id} className="contents">
        {content}
      </div>
    )
  },
)

OptimizedRenderer.displayName = "OptimizedRenderer"

export default OptimizedRenderer

// 高阶组件：使任何组件具有优化渲染能力
export function withOptimizedRendering<P extends object>(
  Component: ComponentType<P>,
  options: Omit<OptimizedRendererProps, "children"> = {},
) {
  const OptimizedComponent = memo((props: P) => {
    return (
      <OptimizedRenderer {...options}>
        <Component {...props} />
      </OptimizedRenderer>
    )
  })

  const displayName = Component.displayName || Component.name || "Component"
  OptimizedComponent.displayName = `withOptimizedRendering(${displayName})`

  return OptimizedComponent
}

// 使用示例：
// const OptimizedComponent = withOptimizedRendering(MyComponent, { threshold: 0.5, delay: 200 })
