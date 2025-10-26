import type React from "react"
import { fontFallbackMap } from "@/lib/font-fallback"

// 获取字体类名，支持备用方案
export function getFontClassName(fontType: keyof typeof fontFallbackMap, defaultClass = ""): string {
  try {
    return `font-${fontType} ${defaultClass}`.trim()
  } catch (error) {
    console.warn(`Error applying font ${fontType}:`, error)
    return defaultClass
  }
}

// 获取内联字体样式，支持备用方案
export function getFontStyle(fontType: keyof typeof fontFallbackMap): React.CSSProperties {
  try {
    return {
      fontFamily: `var(--font-${fontType}), ${fontFallbackMap[fontType]}`,
    }
  } catch (error) {
    console.warn(`Error applying font style ${fontType}:`, error)
    return {
      fontFamily: fontFallbackMap[fontType],
    }
  }
}
