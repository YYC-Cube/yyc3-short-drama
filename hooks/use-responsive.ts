"use client"

import { useEffect, useState } from "react"

interface BreakpointConfig {
  sm: number
  md: number
  lg: number
  xl: number
  "2xl": number
}

const defaultBreakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useResponsive(breakpoints: Partial<BreakpointConfig> = {}) {
  // 断点配置惰性初始化固化（响应式断点属构建期常量，不应随渲染变化，避免 effect 依赖抖动）
  const [bp] = useState(() => ({ ...defaultBreakpoints, ...breakpoints }))

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  const [breakpoint, setBreakpoint] = useState<keyof BreakpointConfig | "xs">("xs")

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight

      setWindowSize({ width, height })

      if (width >= bp["2xl"]) {
        setBreakpoint("2xl")
      } else if (width >= bp.xl) {
        setBreakpoint("xl")
      } else if (width >= bp.lg) {
        setBreakpoint("lg")
      } else if (width >= bp.md) {
        setBreakpoint("md")
      } else if (width >= bp.sm) {
        setBreakpoint("sm")
      } else {
        setBreakpoint("xs")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [bp])

  return {
    windowSize,
    breakpoint,
    isMobile: breakpoint === "xs" || breakpoint === "sm",
    isTablet: breakpoint === "md",
    isDesktop: breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",
    isXs: breakpoint === "xs",
    isSm: breakpoint === "sm",
    isMd: breakpoint === "md",
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    is2Xl: breakpoint === "2xl",
  }
}
