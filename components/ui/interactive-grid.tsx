"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractiveGridProps {
  children: React.ReactNode
  columns?: number
  gap?: number
  className?: string
  stagger?: boolean
  hover?: boolean
}

const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  children,
  columns = 3,
  gap = 4,
  className,
  stagger = true,
  hover = true,
}) => {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={cn("grid gap-4", `grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`, `gap-${gap}`, className)}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: stagger ? index * 0.1 : 0,
          }}
          whileHover={hover ? { y: -4, scale: 1.02 } : {}}
          className="h-full"
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export { InteractiveGrid }
