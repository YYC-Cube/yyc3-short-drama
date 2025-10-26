"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Check, AlertTriangle, X, FileText, Settings, Sparkles, Eye, Zap } from "lucide-react"

export default function CulturalVerificationSystem() {
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
          文化传承校验体系
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          数字礼器监制系统，确保创作内容符合历史文化规范，实现文化传承的准确性与创新性
        </p>
      </motion.div>

      <Tabs defaultValue="verification" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-12">
          <TabsTrigger value="verification" className="data-[state=active]:bg-amber-600 py-3">
            <Shield className="h-5 w-5 mr-2" />
            数字礼器监制系统
          </TabsTrigger>
          <TabsTrigger value="ethics" className="data-[state=active]:bg-amber-600 py-3">
            <FileText className="h-5 w-5 mr-2" />
            虚实共生伦理协议
          </TabsTrigger>
        </TabsList>

        <TabsContent value="verification" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 服饰纹样 */}
            <motion.div
              className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=唐代官服纹样"
                  alt="唐代官服纹样"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-600/80 backdrop-blur-sm">服饰纹样</Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">河洛纹样AI鉴定</h3>
                <p className="text-white/70 text-sm mb-4">
                  基于大规模历史服饰数据库，自动识别和校验创作中的服饰纹样是否符合特定朝代、特定身份的历史规范。
                </p>

                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-3 mb-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
                    文化规则示例
                  </h4>
                  <p className="text-white/70 text-sm">
                    唐代五品官员禁用蟒纹，系统将自动替换为对应品级的孔雀纹，确保历史准确性。
                  </p>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1 bg-black/60 border border-red-500/30 rounded-lg p-2 flex items-center">
                    <X className="h-4 w-4 text-red-400 mr-2" />
                    <div>
                      <div className="text-white text-sm font-medium">错误示例</div>
                      <div className="text-white/60 text-xs">五品官员使用蟒纹</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-black/60 border border-green-500/30 rounded-lg p-2 flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    <div>
                      <div className="text-white text-sm font-medium">正确示例</div>
                      <div className="text-white/60 text-xs">五品官员使用孔雀纹</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 建筑规制 */}
            <motion.div
              className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=宋代建筑规制"
                  alt="宋代建筑规制"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-600/80 backdrop-blur-sm">建筑规制</Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">点云扫描比对</h3>
                <p className="text-white/70 text-sm mb-4">
                  通过3D点云技术扫描虚拟建筑模型，与历史建筑数据库进行比对，确保建筑比例、结构和装饰符合历史规范。
                </p>

                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-3 mb-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
                    文化规则示例
                  </h4>
                  <p className="text-white/70 text-sm">
                    北宋民居开间尺寸误差需小于3%，超限则启动虚拟榫卯矫正，自动调整至符合历史规范的尺寸。
                  </p>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1 bg-black/60 border border-red-500/30 rounded-lg p-2 flex items-center">
                    <X className="h-4 w-4 text-red-400 mr-2" />
                    <div>
                      <div className="text-white text-sm font-medium">误差过大</div>
                      <div className="text-white/60 text-xs">开间尺寸误差5.2%</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-black/60 border border-green-500/30 rounded-lg p-2 flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    <div>
                      <div className="text-white text-sm font-medium">自动矫正</div>
                      <div className="text-white/60 text-xs">开间尺寸误差2.1%</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 礼仪动作 */}
            <motion.div
              className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=古代礼仪动作"
                  alt="古代礼仪动作"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-600/80 backdrop-blur-sm">礼仪动作</Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">骨骼识别+典籍数据库</h3>
                <p className="text-white/70 text-sm mb-4">
                  通过骨骼识别技术分析数字演员的动作姿态，结合古代礼仪典籍数据库，确保礼仪动作的历史准确性。
                </p>

                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-3 mb-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
                    文化规则示例
                  </h4>
                  <p className="text-white/70 text-sm">
                    稽首/顿首/空首礼智能纠偏，根据人物身份和场合，自动调整礼仪动作的角度和幅度。
                  </p>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1 bg-black/60 border border-red-500/30 rounded-lg p-2 flex items-center">
                    <X className="h-4 w-4 text-red-400 mr-2" />
                    <div>
                      <div className="text-white text-sm font-medium">不当礼仪</div>
                      <div className="text-white/60 text-xs">臣对君使用错误礼节</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-black/60 border border-green-500/30 rounded-lg p-2 flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    <div>
                      <div className="text-white text-sm font-medium">正确礼仪</div>
                      <div className="text-white/60 text-xs">自动调整为叩首礼</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 text-amber-400 mr-2" />
              数字礼器监制系统优势
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-2">文化准确性</h4>
                <p className="text-white/70 text-sm">
                  确保创作内容符合历史文化规范，避免常见的历史错误和文化误用，提升作品的文化价值。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-2">创作效率</h4>
                <p className="text-white/70 text-sm">
                  自动检测和修正文化细节错误，减少创作者查阅历史资料的时间，提高创作效率。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-2">教育价值</h4>
                <p className="text-white/70 text-sm">
                  在创作过程中学习正确的历史文化知识，系统会提供错误原因和正确示例的详细解释。
                </p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="ethics" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">虚实共生伦理协议</h3>
              <p className="text-white/70 mb-6">
                建立文化创作的伦理边界，确保在创新的同时尊重历史文化的本质，防止文化符号的过度商业化和娱乐化。
              </p>

              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-3">伦理协议核心原则</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">文化尊重原则</h5>
                      <p className="text-white/70 text-sm">尊重历史文化的原貌，避免不当改编和曲解</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">创新平衡原则</h5>
                      <p className="text-white/70 text-sm">在保持文化准确性的前提下，鼓励合理的���新和再解读</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">文化传承原则</h5>
                      <p className="text-white/70 text-sm">创作应有助于文化的传承和发展，而非简单消费文化符号</p>
                    </div>
                  </li>
                </ul>
              </div>

              <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                <FileText className="h-4 w-4 mr-2" />
                查看完整伦理协议
              </Button>
            </motion.div>

            <motion.div
              className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-xl font-bold text-white mb-4">文化基因检测流程</h4>

              <div className="relative">
                {/* 第一步 */}
                <div className="flex items-start mb-8">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4 z-10">
                    <span className="text-amber-400 font-bold">1</span>
                  </div>
                  <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4 flex-grow">
                    <h5 className="text-white font-medium mb-2">用户创作提交</h5>
                    <p className="text-white/70 text-sm">
                      创作者提交作品进入文化基因检测流程，系统自动分析作品中的文化元素
                    </p>
                  </div>
                </div>

                {/* 连接线 */}
                <div className="absolute top-10 left-5 w-0.5 h-16 bg-amber-500/30"></div>

                {/* 第二步 */}
                <div className="flex items-start mb-8">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4 z-10">
                    <span className="text-amber-400 font-bold">2</span>
                  </div>
                  <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4 flex-grow">
                    <h5 className="text-white font-medium mb-2">文化基因检测</h5>
                    <p className="text-white/70 text-sm">AI分析作品中的文化元素是否符合历史规范，评估文化准确性得分</p>
                  </div>
                </div>

                {/* 连接线 */}
                <div className="absolute top-26 left-5 w-0.5 h-16 bg-amber-500/30"></div>

                {/* 第三步 - 分支 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4 z-10">
                    <span className="text-amber-400 font-bold">3</span>
                  </div>
                  <div className="flex-grow">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Check className="h-4 w-4 text-green-400 mr-2" />
                          <h5 className="text-white font-medium">通过检测</h5>
                        </div>
                        <p className="text-white/70 text-sm">获得"河图创作者"认证，作品可正常发布</p>
                      </div>
                      <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
                          <h5 className="text-white font-medium">未通过检测</h5>
                        </div>
                        <p className="text-white/70 text-sm">触发"青铜神树"修复程序，AI推荐参考资料</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Settings className="h-5 w-5 text-amber-400 mr-2" />
              青铜神树修复程序
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Eye className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">文化问题识别</h4>
                <p className="text-white/70 text-sm">
                  精确识别作品中的文化不准确之处，并提供详细的问题说明和历史背景解释。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">参考资料推荐</h4>
                <p className="text-white/70 text-sm">
                  AI推荐《洛阳伽蓝记》等相关历史文献的参考片段，帮助创作者理解正确的历史文化背景。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">自动修复建议</h4>
                <p className="text-white/70 text-sm">
                  生成文化适配版剧本建议，创作者可以选择接受系统的修复建议或自行修改。
                </p>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
