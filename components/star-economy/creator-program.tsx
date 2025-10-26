"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, MapPin, Star, FileText, CheckCircle2, MapIcon } from "lucide-react"

// 司马光奖数据
const fundProjects = [
  {
    id: 1,
    title: "《资治通鉴》洛阳保卫战",
    category: "历史战争",
    progress: 75,
    goal: 50000,
    current: 37500,
    backers: 128,
    daysLeft: 5,
    image: "/placeholder.svg?height=300&width=500",
    description: "重现北宋时期金兵攻打洛阳的历史事件，展现洛阳城防御工事与守城战略",
  },
  {
    id: 2,
    title: "《洛阳牡丹亭》",
    category: "古风爱情",
    progress: 90,
    goal: 30000,
    current: 27000,
    backers: 215,
    daysLeft: 2,
    image: "/placeholder.svg?height=300&width=500",
    description: "以洛阳牡丹文化为背景，讲述一段跨越朝代的爱情故事，融合传统戏曲元素",
  },
  {
    id: 3,
    title: "《龙门石窟之谜》",
    category: "悬疑探险",
    progress: 40,
    goal: 80000,
    current: 32000,
    backers: 95,
    daysLeft: 12,
    image: "/placeholder.svg?height=300&width=500",
    description: "主角在龙门石窟中发现古老密码，揭开隋唐时期一段不为人知的历史秘密",
  },
]

// 诗圣之路任务数据
const poetTasks = [
  {
    id: 1,
    location: "少林寺",
    title: "《望岳》取景",
    description: '在少林寺拍摄杜甫《望岳》诗作场景，展现"会当凌绝顶，一览众山小"的意境',
    reward: "获得《杜工部集》AI辅助创作权限（3天）",
    distance: "15km",
    completed: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    location: "白马寺",
    title: "《春望》重现",
    description: '在白马寺拍摄杜甫《春望》诗作场景，表现"感时花溅泪，恨别鸟惊心"的情感',
    reward: "获得《杜工部集》AI辅助创作权限（5天）",
    distance: "8km",
    completed: false,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    location: "龙门石窟",
    title: "《石壕吏》演绎",
    description: "在龙门石窟拍摄杜甫《石壕吏》诗作场景，反映战争给百姓带来的苦难",
    reward: "获得《杜工部集》AI辅助创作权限（7天）",
    distance: "12km",
    completed: false,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    location: "洛阳古城墙",
    title: "《登高》意境",
    description: '在洛阳古城墙拍摄杜甫《登高》诗作场景，呈现"无边落木萧萧下，不尽长江滚滚来"的壮阔',
    reward: "获得《杜工部集》AI辅助创作权限（永久）",
    distance: "5km",
    completed: false,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CreatorProgram() {
  const [activeTab, setActiveTab] = useState("fund")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16 border-t border-purple-500/20">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <Award className="h-6 w-6 text-purple-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">神都创作者计划</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          设立"司马光奖"年度创作基金，用户可使用明星值参与《资治通鉴》经典场景重演众筹。
          开发"诗圣之路"LBS任务，用户在地图标记的杜甫行踪点拍摄短剧，获得AI辅助创作权限。
        </p>
      </motion.div>

      <Tabs defaultValue="fund" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="fund" className="data-[state=active]:bg-purple-600">
            <Award className="h-4 w-4 mr-2" />
            司马光奖
          </TabsTrigger>
          <TabsTrigger value="poet" className="data-[state=active]:bg-purple-600">
            <MapPin className="h-4 w-4 mr-2" />
            诗圣之路
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fund" className="mt-0">
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">《资治通鉴》经典场景重演众筹</h3>
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                <FileText className="h-4 w-4 mr-2" />
                提交我的项目
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {fundProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-black/60 border border-purple-500/10 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
                >
                  <div className="relative h-48">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-900/70 text-purple-300">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-medium text-white mb-2">{project.title}</h4>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">众筹进度</span>
                        <span className="text-purple-300">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-amber-300 font-medium">{project.current.toLocaleString()}</div>
                        <div className="text-white/60 text-xs">已筹明星值</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium">{project.backers}</div>
                        <div className="text-white/60 text-xs">支持人数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium">{project.daysLeft}</div>
                        <div className="text-white/60 text-xs">剩余天数</div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                      <Star className="h-4 w-4 mr-2" />
                      支持项目
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">司马光奖说明</h4>

              <div className="bg-black/60 border border-purple-500/10 rounded-lg p-4">
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>用户可使用明星值支持喜欢的《资治通鉴》经典场景重演项目</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>项目达成目标后，创作团队将获得相应明星值作为创作基金</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>支持者将获得项目专属数字徽章和作品首映观看权</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>获赞最多的历史短剧团队将获得"司马光奖"年度大奖，可实地探访二里头遗址考古现场</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="poet" className="mt-0">
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">诗圣之路LBS任务</h3>
              <div className="flex items-center text-white/70 text-sm">
                <MapIcon className="h-4 w-4 text-purple-400 mr-1" />
                <span>当前位置: 洛阳市</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {poetTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  className={`bg-black/60 border ${
                    task.completed ? "border-green-500/20" : "border-purple-500/10"
                  } rounded-lg overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="relative h-full">
                      <Image src={task.image || "/placeholder.svg"} alt={task.title} fill className="object-cover" />
                      {task.completed && (
                        <div className="absolute top-2 left-2">
                          <div className="flex items-center bg-green-900/70 text-green-300 text-xs px-2 py-1 rounded-full">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            已完成
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-span-2 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-medium text-white">{task.title}</h4>
                        <div className="flex items-center text-white/70 text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{task.distance}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-purple-300 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {task.location}
                      </div>

                      <p className="text-white/80 text-sm mb-3">{task.description}</p>

                      <div className="flex items-center text-amber-300/90 text-sm mb-3">
                        <Award className="h-4 w-4 mr-1" />
                        {task.reward}
                      </div>

                      <Button
                        variant={task.completed ? "outline" : "default"}
                        className={
                          task.completed
                            ? "border-green-500/30 text-green-300 hover:bg-green-500/10"
                            : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                        }
                      >
                        {task.completed ? "查看作品" : "开始任务"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              {/* 简化的地图视图 */}
              <div className="absolute inset-0 bg-purple-900/20">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="诗圣之路地图"
                  fill
                  className="object-cover opacity-50"
                />

                {/* 地图标记点 */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-4 h-4 rounded-full bg-green-500 ring-4 ring-green-500/30 animate-pulse`}></div>
                </div>

                <div className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-500/30 animate-pulse`}></div>
                </div>

                <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-500/30 animate-pulse`}></div>
                </div>

                <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-500/30 animate-pulse`}></div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-white font-medium mb-1">诗圣之路</div>
                  <div className="text-white/70 text-sm">跟随杜甫足迹，探索诗歌与历史的交汇</div>
                </div>
              </div>
            </div>

            <div className="bg-black/60 border border-purple-500/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-3">任务说明</h4>

              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>在地图标记的杜甫行踪点拍摄短剧，需符合诗作意境要求</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>完成任务后获得《杜工部集》AI辅助创作权限，可用于生成古风诗词和剧本</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>任务需在实际地理位置完成，系统将通过GPS定位验证</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>完成全部四个任务点可获得《杜工部集》AI辅助创作永久权限</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
