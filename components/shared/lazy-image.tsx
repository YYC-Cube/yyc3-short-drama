"use client"

import { useState, useEffect } from "react"
import type { LazyImageProps } from "@/utils/performance-optimizer"

/**
 * 懒加载图片组件
 * 仅在图片进入视口时加载
 */
export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholderColor = "#1f1f1f",
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    // 创建交叉观察器
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" },
    )

    // 获取当前元素
    const element = document.getElementById(`lazy-image-${src}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [src])

  return (
    <div
      id={`lazy-image-${src}`}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        backgroundColor: placeholderColor,
      }}
    >
      {isInView && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  )
}
