import type { Metadata } from "next"
import TestOptimizationClientPage from "./TestOptimizationClientPage"

export const metadata: Metadata = {
  title: "兼容性和性能优化测试 | 『言语』逸品云享智能短剧·导演栈",
  description: "测试系统的兼容性和性能优化功能",
}

export default function TestOptimizationPage() {
  return <TestOptimizationClientPage />
}
