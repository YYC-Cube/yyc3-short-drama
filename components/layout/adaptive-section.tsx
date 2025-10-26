"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AdaptiveSectionProps {
  children: ReactNode
  className?: string
  background?: "none" | "gradient" | "pattern" | "image"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  animate?: boolean
  delay?: number
}

export function AdaptiveSection({
  children,
  className = "",
  background = "none",
  padding = "lg",
  maxWidth = "2xl",
  animate = true,
  delay = 0,
}: AdaptiveSectionProps) {
  const backgroundClasses = {
    none: "",
    gradient: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    pattern:
      "bg-[radial-gradient(circle_at_25%_25%,rgba(251,191,36,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.1)_0%,transparent_50%)]",
    image: "bg-cover bg-center bg-no-repeat",
  }

  const paddingClasses = {
    none: "",
    sm: "py-8 px-4",
    md: "py-12 px-4 sm:px-6",
    lg: "py-16 px-4 sm:px-6 lg:px-8",
    xl: "py-24 px-4 sm:px-6 lg:px-8",
  }

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  }

  const content = (
    <section className={cn("relative w-full", backgroundClasses[background], paddingClasses[padding], className)}>
      <div className={cn("mx-auto", maxWidthClasses[maxWidth])}>{children}</div>
    </section>
  )

  if (!animate) return content

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      {content}
    </motion.div>
  )
}
