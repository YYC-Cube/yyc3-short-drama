"use client"

import type React from "react"

import { Loader2 } from "lucide-react"
import { Suspense, lazy, type ComponentType } from "react"

interface RouteBoundaryProps {
  /** 模块级创建的 lazy 组件（用 createLazyRoute 工厂生成），避免 render 内创建组件 */
  lazyComponent: ComponentType<Record<string, unknown>>
  fallback?: React.ReactNode
  props?: Record<string, unknown>
}

/**
 * 模块级工厂：创建惰性路由组件
 * 在模块顶层调用一次，将结果传给 RouteBoundary
 *
 * @example
 * const LazyMain = createLazyRoute(() => import("@/app/main/ClientPage"))
 * <RouteBoundary lazyComponent={LazyMain} />
 */
export function createLazyRoute(
  component: () => Promise<{ default: ComponentType<Record<string, unknown>> }>,
): ComponentType<Record<string, unknown>> {
  return lazy(component)
}

/**
 * 路由级别代码分割组件
 * 用于懒加载整个路由组件（组件必须在模块级通过 createLazyRoute 创建）
 */
export default function RouteBoundary({ lazyComponent, fallback = <LoadingFallback />, props = {} }: RouteBoundaryProps) {
  const LazyRoute = lazyComponent
  return (
    <Suspense fallback={fallback}>
      <LazyRoute {...props} />
    </Suspense>
  )
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
}
