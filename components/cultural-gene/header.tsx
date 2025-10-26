"use client"

import UniversalHeader from "@/components/shared/universal-header"
import { Dna } from "lucide-react"

export default function CulturalGeneHeader() {
  return (
    <UniversalHeader
      title="文化基因"
      subtitle="探索和传承中华文化的深层内核"
      icon={Dna}
      backgroundImage="/dna-chinese-symbols.png"
      accentColor="red"
      height="md"
    />
  )
}
