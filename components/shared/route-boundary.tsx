"use client"

import type React from "react"

import { Suspense, lazy, type ComponentType } from "react"
import { Loader2 } from "lucide-react"

interface RouteBoundaryProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
  props?: Record<string, any>
}

/**
 * 路由级别代码分割组件
 * 用于懒加载整个路由组件
 */
export default function RouteBoundary({ component, fallback = <LoadingFallback />, props = {} }: RouteBoundaryProps) {
  const LazyComponent = lazy(component)

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
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
