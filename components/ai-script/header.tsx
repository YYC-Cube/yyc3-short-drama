"use client"

import UniversalHeader from "@/components/shared/universal-header"
import { Sparkles } from "lucide-react"

export default function AIScriptHeader() {
  return (
    <UniversalHeader
      title="AI剧本创作"
      subtitle="融合传统文化与现代AI技术，创造独特的剧本体验"
      icon={Sparkles}
      backgroundImage="/calligraphy-ai-fusion.png"
      accentColor="blue"
      height="md"
    />
  )
}
