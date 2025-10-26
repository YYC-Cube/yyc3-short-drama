"use client"

import { useState, useEffect } from "react"

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
  const bp = { ...defaultBreakpoints, ...breakpoints }

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
  }, []) // Removed bp from the dependency array

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
