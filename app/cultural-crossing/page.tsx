import type { Metadata } from "next"
import CulturalCrossingClientPage from "./CulturalCrossingClientPage"

export const metadata: Metadata = {
  title: "时空穿越体验 - 言语逸品",
  description: "突破时空界限的沉浸式文化体验，让历史与现代对话",
  keywords: "时空穿越,历史体验,文化沉浸,AR体验,VR文化",
}

export default function CulturalCrossingPage() {
  return <CulturalCrossingClientPage />
}
