import FunctionalityAnalysisDashboard from "@/components/reports/functionality-analysis-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "功能完整度分析报告 - 『言语』逸品云享智能短剧·导演栈",
  description: "全面评估平台功能实现度、技术架构质量和商业价值的详细分析报告",
}

export default function FunctionalityReportPage() {
  return <FunctionalityAnalysisDashboard />
}
