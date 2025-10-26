"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { InteractiveGrid } from "@/components/ui/interactive-grid"
import ScriptAlgorithm from "@/components/cultural-gene/script-algorithm"
import TimeSpaceLibrary from "@/components/cultural-gene/time-space-library"
import { Dna, Clock } from "lucide-react"

export default function CulturalGenePage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              文脉基因重构
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              传统文化的数字化重构与传承，通过现代技术手段保护和发扬河洛文化的深厚底蕴
            </p>
          </motion.div>

          {/* 功能概览卡片 */}
          <InteractiveGrid columns={2} className="mb-16">
            <Card cultural={true} glow={true}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                    <Dna className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle gradient={true}>文化基因解析</CardTitle>
                    <CardDescription>深度解析河洛文化的核心基因</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  通过AI技术分析河洛文化的核心元素，提取文化基因片段，为现代创作提供传统文化支撑。
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-emerald-400 font-medium">历史文献</div>
                    <div className="text-white/70">10,000+ 篇</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-emerald-400 font-medium">文化符号</div>
                    <div className="text-white/70">5,000+ 个</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-emerald-400 font-medium">传统故事</div>
                    <div className="text-white/70">2,000+ 个</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-emerald-400 font-medium">文化模式</div>
                    <div className="text-white/70">500+ 种</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card cultural={true} glow={true}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle gradient={true}>时空数据库</CardTitle>
                    <CardDescription>构建多维度的文化时空数据库</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  建立跨越时空的文化数据库，记录不同历史时期的文化特征，为创作提供准确的历史背景。
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">唐朝文化数据</span>
                    <div className="w-32 bg-black/40 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">宋朝文化数据</span>
                    <div className="w-32 bg-black/40 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full w-3/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">明清文化数据</span>
                    <div className="w-32 bg-black/40 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </InteractiveGrid>

          {/* 核心算法展示 */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card cultural={true} glow={true}>
              <CardHeader>
                <CardTitle gradient={true}>河洛文化算法引擎</CardTitle>
                <CardDescription>基于河洛文化的智能算法，为剧本创作提供文化基因支撑</CardDescription>
              </CardHeader>
              <CardContent>
                <ScriptAlgorithm />
              </CardContent>
            </Card>
          </motion.div>

          {/* 时空图书馆 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card cultural={true} glow={true}>
              <CardHeader>
                <CardTitle gradient={true}>时空文化图书馆</CardTitle>
                <CardDescription>跨越时空的文化资源库，为创作者提供丰富的历史文化素材</CardDescription>
              </CardHeader>
              <CardContent>
                <TimeSpaceLibrary />
              </CardContent>
            </Card>
          </motion.div>

          {/* 文化传承统计 */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card cultural={true}>
              <CardHeader>
                <CardTitle gradient={true}>文化传承成果</CardTitle>
                <CardDescription>数字化文化传承的阶段性成果展示</CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveGrid columns={4}>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">98.5%</div>
                    <div className="text-white/70">文化准确度</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">15,000+</div>
                    <div className="text-white/70">文化元素</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                    <div className="text-white/70">创作模板</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">1,200+</div>
                    <div className="text-white/70">用户作品</div>
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
