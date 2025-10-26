"use client"

import MainLayout from "@/components/layout/main-layout"
import { UniversalHeader } from "@/components/shared/universal-header"
import CulturalCarousel from "@/components/home/cultural-carousel"
import FeaturesOverview from "@/components/home/features-overview"
import CulturalValue from "@/components/home/cultural-value"
import MissionStatement from "@/components/home/mission-statement"
import VisualShowcase from "@/components/home/visual-showcase"

export default function MainPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <UniversalHeader />
        <main className="pt-16">
          <CulturalCarousel />
          <FeaturesOverview />
          <CulturalValue />
          <VisualShowcase />
          <MissionStatement />
        </main>
      </div>
    </MainLayout>
  )
}
