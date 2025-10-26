"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { InteractiveGrid } from "@/components/ui/interactive-grid"
import HolographicScreen from "@/components/social-system/holographic-screen"
import CreativeWorkshop from "@/components/social-system/creative-workshop"
import LuoshenHolographicDisplay from "@/components/social-system/luoshen-holographic-display"
import { Users, Globe, Zap, Heart } from "lucide-react"

export default function SocialSystemPage() {
  return (
    <AnimatedBackground variant="cultural">
      <div className="min-h-screen">
        <div className="cultural-container py-8">
          {/* 页面标题 */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              虚实共生社群
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              构建虚拟与现实融合的社交体验平台，让创作者在数字空间中自由交流与协作
            </p>
          </motion.div>

          {/* 社交功能概览 */}
          <InteractiveGrid columns={2} className="mb-16">
            <Card cultural={true} glow={true}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle gradient={true}>创作者社群</CardTitle>
                    <CardDescription>连接全球的文化创作者</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  汇聚来自世界各地的文化创作者，在虚拟空间中分享创作经验，交流文化见解。
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-blue-400 font-medium">活跃用户</div>
                    <div className="text-white/70">50,000+</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-blue-400 font-medium">创作团队</div>
                    <div className="text-white/70">2,500+</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-blue-400 font-medium">协作项目</div>
                    <div className="text-white/70">8,000+</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-blue-400 font-medium">文化交流</div>
                    <div className="text-white/70">15,000+</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card cultural={true} glow={true}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle gradient={true}>虚拟空间</CardTitle>
                    <CardDescription>沉浸式的虚拟创作环境</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">打造沉浸式的虚拟创作空间，让创作者在数字世界中体验真实的协作感受。</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">虚拟工作室</span>
                    <div className="w-32 bg-black/40 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">协作空间</span>
                    <div className="w-32 bg-black/40 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">展示大厅</span>
                    <div className="w-32 bg-black/40 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </InteractiveGrid>

          {/* 全息显示系统 */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card cultural={true} glow={true}>
              <CardHeader>
                <CardTitle gradient={true}>全息交互显示</CardTitle>
                <CardDescription>先进的全息技术，打造沉浸式的社交体验</CardDescription>
              </CardHeader>
              <CardContent>
                <HolographicScreen />
              </CardContent>
            </Card>
          </motion.div>

          {/* 洛神全息展示 */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card cultural={true} glow={true}>
              <CardHeader>
                <CardTitle gradient={true}>洛神全息展示</CardTitle>
                <CardDescription>基于洛神赋的文化IP全息展示系统</CardDescription>
              </CardHeader>
              <CardContent>
                <LuoshenHolographicDisplay />
              </CardContent>
            </Card>
          </motion.div>

          {/* 创意工坊 */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card cultural={true} glow={true}>
              <CardHeader>
                <CardTitle gradient={true}>协作创意工坊</CardTitle>
                <CardDescription>多人实时协作的创意工作空间</CardDescription>
              </CardHeader>
              <CardContent>
                <CreativeWorkshop />
              </CardContent>
            </Card>
          </motion.div>

          {/* 社群活动统计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card cultural={true}>
              <CardHeader>
                <CardTitle gradient={true}>社群活跃度</CardTitle>
                <CardDescription>实时社群活动数据统计</CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveGrid columns={4}>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-blue-400 mb-1">12,580</div>
                    <div className="text-white/70 text-sm">在线用户</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-400 mb-1">3,240</div>
                    <div className="text-white/70 text-sm">活跃项目</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-1">89,560</div>
                    <div className="text-white/70 text-sm">互动次数</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-amber-400 mb-1">156</div>
                    <div className="text-white/70 text-sm">国家地区</div>
                  </div>
                </InteractiveGrid>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  )
}
