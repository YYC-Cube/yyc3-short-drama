"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { InteractiveGrid } from "@/components/ui/interactive-grid"
import CurrencySystem from "@/components/star-economy/currency-system"
import CreatorProgram from "@/components/star-economy/creator-program"
import { Star, Coins, TrendingUp, Award } from "lucide-react"

export default function StarEconomyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              星值经济赋能
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              构建文化价值的经济转化机制，让优质的文化创作获得应有的经济回报
            </p>
          </motion.div>

          {/* 经济系统概览 */}
          <InteractiveGrid columns={2} className="mb-16">
            <Card cultural={true} glow={true}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle gradient={true}>星值系统</CardTitle>
                    <CardDescription>基于创作质量的价值评估</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  通过AI算法评估创作质量，将文化价值转化为可量化的星值，为创作者提供公平的价值认定。
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-yellow-400 font-medium">总星值池</div>
                    <div className="text-white/70">10,000,000</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-yellow-400 font-medium">日均产出</div>
                    <div className="text-white/70">50,000</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-yellow-400 font-medium">活跃创作者</div>
                    <div className="text-white/70">25,000+</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-yellow-400 font-medium">交易次数</div>
                    <div className="text-white/70">180,000+</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card cultural={true} glow={true}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                    <Coins className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle gradient={true}>通宝机制</CardTitle>
                    <CardDescription>高级创作者的专属货币</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  通宝是平台的高级货币，只有达到一定创作水准的用户才能获得，用于购买高级功能和资源。
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">通宝总量</span>
                    <div className="w-32 bg-black/40 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">流通量</span>
                    <div className="w-32 bg-black/40 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">持有者</span>
                    <div className="w-32 bg-black/40 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </InteractiveGrid>

          {/* 货币系统 */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card cultural={true} glow={true}>
              <CardHeader>
                <CardTitle gradient={true}>双轨货币系统</CardTitle>
                <CardDescription>星值与通宝的双重经济体系，满足不同层次的创作需求</CardDescription>
              </CardHeader>
              <CardContent>
                <CurrencySystem />
              </CardContent>
            </Card>
          </motion.div>

          {/* 创作者计划 */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card cultural={true} glow={true}>
              <CardHeader>
                <CardTitle gradient={true}>神都创作者计划</CardTitle>
                <CardDescription>专为优秀创作者设计的成长与激励计划</CardDescription>
              </CardHeader>
              <CardContent>
                <CreatorProgram />
              </CardContent>
            </Card>
          </motion.div>

          {/* 经济数据统计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card cultural={true}>
              <CardHeader>
                <CardTitle gradient={true}>经济生态数据</CardTitle>
                <CardDescription>星值经济生态的实时数据展示</CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveGrid columns={4}>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-400 mb-1">8.5M</div>
                    <div className="text-white/70 text-sm">星值流通</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                      <Coins className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-400 mb-1">125K</div>
                    <div className="text-white/70 text-sm">通宝总量</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-1">+15.8%</div>
                    <div className="text-white/70 text-sm">月增长率</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-red-400 mb-1">2,580</div>
                    <div className="text-white/70 text-sm">认证创作者</div>
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
