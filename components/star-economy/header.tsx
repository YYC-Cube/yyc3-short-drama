"use client"

import UniversalHeader from "@/components/shared/universal-header"
import { Star } from "lucide-react"

export default function StarEconomyHeader() {
  return (
    <UniversalHeader
      title="星值经济"
      subtitle="通过创作获得星值奖励，参与平台经济生态"
      icon={Star}
      backgroundImage="/golden-stars-economic-cultural.png"
      accentColor="amber"
      height="md"
    />
  )
}
