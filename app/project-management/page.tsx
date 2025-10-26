"use client"

import { motion } from "framer-motion"
import ProjectDashboard from "@/components/project/project-dashboard"
import { Settings } from "lucide-react"

export default function ProjectManagementPage() {
  return (
    <div className="min-h-screen">
      {/* 页面头部 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">统筹管理</h1>
              <p className="text-white/60">河洛文化数字传承平台项目管理中心</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 主要内容 */}
      <ProjectDashboard />
    </div>
  )
}
