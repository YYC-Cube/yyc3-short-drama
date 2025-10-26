import Header from "@/components/ai-script/header"
import BaguaScriptGenerator from "@/components/ai-script/bagua-script-generator"
import AIAssistantCreation from "@/components/ai-script/ai-assistant-creation"
import ClassicalDialogueConverter from "@/components/ai-script/classical-dialogue-converter"
import PersonalizedRecommendations from "@/components/ai-script/personalized-recommendations"
import AuthStatus from "@/components/ai-script/auth-status"
import CreationTasks from "@/components/ai-script/creation-tasks"
import ScriptMarketplace from "@/components/ai-script/script-marketplace"
import CreationAnalytics from "@/components/ai-script/creation-analytics"
import AdvancedAnalyticsPanel from "@/components/ai-script/advanced-analytics-panel"
import UserOnboardingGuide from "@/components/shared/user-onboarding-guide"
import SceneComparisonSystem from "@/components/ai-script/scene-comparison-system"
import CulturalFooter from "@/components/shared/cultural-footer"

export default function AIScriptPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold text-amber-300 mb-6">AI脚本系统</h1>
            <AuthStatus />
          </div>
          <div className="w-full md:w-1/4">
            <PersonalizedRecommendations />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <BaguaScriptGenerator />
          <ClassicalDialogueConverter />
        </div>

        <div className="mb-12">
          <AIAssistantCreation />
        </div>

        <div className="mb-12">
          <SceneComparisonSystem />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <CreationTasks />
          </div>
          <div>
            <ScriptMarketplace />
          </div>
        </div>

        <div className="mb-12">
          <AdvancedAnalyticsPanel />
        </div>

        <div className="mb-12">
          <CreationAnalytics />
        </div>
      </main>

      <CulturalFooter />
      <UserOnboardingGuide />
    </div>
  )
}
