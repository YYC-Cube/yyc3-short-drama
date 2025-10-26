"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Clock, Map, Compass, History, Sparkles } from "lucide-react"

export default function TimeSpaceFoldingSystem() {
  const [activeTab, setActiveTab] = useState("historical")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 border-t border-amber-500/20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 mb-4">
          时空折叠创作系统
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          河洛九章·文化穿越协议，让创作者在不同时空维度间自由穿梭
        </p>
      </motion.div>

      <Tabs defaultValue="historical" value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-12">
          <TabsTrigger value="historical" className="data-[state=active]:bg-amber-600 py-3">
            <History className="h-5 w-5 mr-2" />
            历史层叠
          </TabsTrigger>
          <TabsTrigger value="virtual" className="data-[state=active]:bg-amber-600 py-3">
            <Compass className="h-5 w-5 mr-2" />
            虚实共生
          </TabsTrigger>
          <TabsTrigger value="dialogue" className="data-[state=active]:bg-amber-600 py-3">
            <Sparkles className="h-5 w-5 mr-2" />
            文明对话
          </TabsTrigger>
        </TabsList>

        <TabsContent value="historical" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">北斗定位+AR古迹复原</h3>
              <p className="text-white/70 mb-6">
                站立在应天门遗址，通过手机扫描即可触发隋代工匠全息投影，指导您了解古代建筑工艺，或与武则天虚拟形象互动，获取剧本创作任务。
              </p>
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-2">技术实现</h4>
                <ul className="text-white/70 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-amber-500/20 text-amber-300 rounded-full p-1 mr-2 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </span>
                    <span>洛阳5G专网支持的高精度北斗定位系统</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-500/20 text-amber-300 rounded-full p-1 mr-2 mt-0.5">
                      <Map className="h-4 w-4" />
                    </span>
                    <span>基于地理信息系统的历史地图叠加</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-500/20 text-amber-300 rounded-full p-1 mr-2 mt-0.5">
                      <Compass className="h-4 w-4" />
                    </span>
                    <span>AR云锚点技术确保多用户共享同一历史场景</span>
                  </li>
                </ul>
              </div>
              <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                体验历史层叠
              </Button>
            </motion.div>

            <motion.div
              className="relative h-80 md:h-96 rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src="/placeholder.svg?height=600&width=800&text=应天门AR复原效果"
                alt="应天门AR复原效果"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="text-white font-medium mb-1">应天门遗址AR体验</h4>
                  <p className="text-white/70 text-sm">
                    用户可通过AR眼镜或手机查看应天门的历史原貌，并与虚拟历史人物互动
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="virtual" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">NeRF技术重建十三朝古都</h3>
              <p className="text-white/70 mb-6">
                通过神经辐射场技术重建洛阳不同历史时期的城市面貌，用户可以滑动时间轴，实时切换不同时代的场景，如从北魏永宁寺塔到现代遗址公园，再到未来科幻风格的赛博重构。
              </p>
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-2">技术亮点</h4>
                <ul className="text-white/70 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-amber-500/20 text-amber-300 rounded-full p-1 mr-2 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </span>
                    <span>支持年代参数实时滑动，平滑过渡不同时期场景</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-500/20 text-amber-300 rounded-full p-1 mr-2 mt-0.5">
                      <Map className="h-4 w-4" />
                    </span>
                    <span>基于历史文献和考古发掘的精确3D重建</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-500/20 text-amber-300 rounded-full p-1 mr-2 mt-0.5">
                      <Compass className="h-4 w-4" />
                    </span>
                    <span>支持多人同时在虚拟古都中���游和互动</span>
                  </li>
                </ul>
              </div>
              <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                体验虚实共生
              </Button>
            </motion.div>

            <motion.div
              className="relative h-80 md:h-96 rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src="/placeholder.svg?height=600&width=800&text=永宁寺塔时空变迁"
                alt="永宁寺塔时空变迁"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="text-white font-medium mb-1">永宁寺塔时空变迁</h4>
                  <p className="text-white/70 text-sm">滑动时间轴，见证永宁寺塔从北魏到现代的变迁历程</p>
                  <div className="mt-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full h-2 bg-amber-500/30 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-1">
                      <span>北魏</span>
                      <span>隋唐</span>
                      <span>宋元</span>
                      <span>明清</span>
                      <span>现代</span>
                      <span>未来</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="dialogue" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">AI平行时空推演引擎</h3>
              <p className="text-white/70 mb-6">
                探索历史的无限可能性。选择关键历史节点，如"如果安史之乱被阻止"，系统将生成盛唐延续的元宇宙洛阳城场景包，让创作者在平行历史中展开想象。
              </p>
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-2">创作可能性</h4>
                <ul className="text-white/70 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-amber-500/20 text-amber-300 rounded-full p-1 mr-2 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </span>
                    <span>探索历史分支点，创作平行时空短剧</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-500/20 text-amber-300 rounded-full p-1 mr-2 mt-0.5">
                      <Map className="h-4 w-4" />
                    </span>
                    <span>基于史实的合理推演，保持文化准确性</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-500/20 text-amber-300 rounded-full p-1 mr-2 mt-0.5">
                      <Compass className="h-4 w-4" />
                    </span>
                    <span>多位历史人物在平行时空中的性格与行为模拟</span>
                  </li>
                </ul>
              </div>
              <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                体验文明对话
              </Button>
            </motion.div>

            <motion.div
              className="relative h-80 md:h-96 rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src="/placeholder.svg?height=600&width=800&text=平行时空洛阳城"
                alt="平行时空洛阳城"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="text-white font-medium mb-1">平行时空：盛唐延续</h4>
                  <p className="text-white/70 text-sm">
                    如果安史之乱被阻止，大唐盛世将如何延续？探索这一平行时空中的洛阳城
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs"
                    >
                      安史之乱被阻止
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs"
                    >
                      杨贵妃未死
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs"
                    >
                      更多可能...
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {/* 穿越者身份锚定 */}
      <motion.div
        className="mt-24 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">穿越者身份锚定</h3>
        <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                  <path d="M12 6V12L16 14" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">基因检测</h4>
              <p className="text-white/70 text-sm">
                用户DNA采样
                <br />
                河洛族群匹配度分析
              </p>
            </div>

            <div className="hidden md:block">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">时空护照</h4>
              <p className="text-white/70 text-sm">
                获得"司母戊鼎纹"数字印章
                <br />
                解锁对应朝代服饰/方言/礼仪库
              </p>
            </div>

            <div className="hidden md:block">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">穿越许可</h4>
              <p className="text-white/70 text-sm">
                通过《唐律疏议》AI考试
                <br />
                激活历史事件改写权限
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
