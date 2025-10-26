"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Building, Calendar, Star, ShoppingBag, Compass, Bookmark, Clock, ArrowRight } from "lucide-react"

// 坊区数据
const districts = [
  {
    id: "south",
    name: "南市坊",
    level: "青铜导演",
    description: "基础创作工坊，适合初入平台的创作者",
    features: ["基础场景模板库", "标准NPC角色库", "初级剧本AI辅助", "每周创作指导课程"],
    image: "/placeholder.svg?height=400&width=600",
    color: "from-amber-400 to-amber-600",
  },
  {
    id: "east",
    name: "东市坊",
    level: "白银导演",
    description: "进阶创作区域，提供更多专业工具",
    features: ["进阶特效库", "自定义场景编辑器", "角色动作捕捉功能", "专属创作顾问"],
    image: "/placeholder.svg?height=400&width=600",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "west",
    name: "西市坊",
    level: "黄金导演",
    description: "高级创作区域，拥有独特资源",
    features: ["稀有历史场景库", "高级AI剧本生成", "专业音效与配乐库", "创作成果优先推荐"],
    image: "/placeholder.svg?height=400&width=600",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: "wenxin",
    name: "修文坊",
    level: "王者导演",
    description: "皇家书院场景，顶级创作者专属",
    features: ["独家历史素材库", "全息投影预览", "跨时空拍摄权限", "举办剧本品鉴会"],
    image: "/placeholder.svg?height=400&width=600",
    color: "from-emerald-400 to-emerald-600",
  },
]

// 市集商品数据
const marketItems = [
  {
    id: 1,
    name: "龙门石窟佛首",
    type: "场景道具",
    price: 2000,
    duration: "7天",
    image: "/placeholder.svg?height=200&width=200",
    rarity: "稀有",
  },
  {
    id: 2,
    name: "唐代宫廷服饰",
    type: "角色服装",
    price: 1500,
    duration: "永久",
    image: "/placeholder.svg?height=200&width=200",
    rarity: "精良",
  },
  {
    id: 3,
    name: "洛阳城夜景",
    type: "环境特效",
    price: 3000,
    duration: "30天",
    image: "/placeholder.svg?height=200&width=200",
    rarity: "史诗",
  },
  {
    id: 4,
    name: "古琴演奏动作",
    type: "角色动作",
    price: 1000,
    duration: "永久",
    image: "/placeholder.svg?height=200&width=200",
    rarity: "普通",
  },
  {
    id: 5,
    name: "水墨山水滤镜",
    type: "视觉效果",
    price: 2500,
    duration: "永久",
    image: "/placeholder.svg?height=200&width=200",
    rarity: "稀有",
  },
  {
    id: 6,
    name: "永宁寺塔全息投影",
    type: "场景建筑",
    price: 5000,
    duration: "15天",
    image: "/placeholder.svg?height=200&width=200",
    rarity: "传说",
  },
]

// 活动数据
const events = [
  {
    id: 1,
    title: "天津晓月·创作市集",
    date: "每周六 20:00-22:00",
    description: "限时开放的创作资源交易市集，使用明星值竞拍稀有道具和场景",
    status: "upcoming",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "洛水流觞·剧本品鉴会",
    date: "每月15日 19:00-21:00",
    description: "王者导演可在修文坊举办剧本品鉴会，邀请其他创作者点评交流",
    status: "active",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "九州巡演·洛阳站",
    date: "2024年8月1日-8月7日",
    description: "线上线下联动的短剧展演活动，优秀作品有机会在洛阳实景场地展示",
    status: "upcoming",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function CreativeWorkshop() {
  const [activeTab, setActiveTab] = useState("districts")
  const [selectedDistrict, setSelectedDistrict] = useState("south")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 获取当前选中的坊区数据
  const currentDistrict = districts.find((district) => district.id === selectedDistrict)

  return (
    <section ref={ref} className="py-16 border-t border-emerald-500/20">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <Building className="h-6 w-6 text-emerald-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">龙门创客坊</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          虚拟创作空间按洛阳里坊制布局，用户根据导演等级入驻不同坊区，打造沉浸式创作社区体验。每周开启"天津晓月"创作市集，用户可以竞拍稀有道具和场景使用权。
        </p>
      </motion.div>

      <Tabs defaultValue="districts" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="districts" className="data-[state=active]:bg-emerald-600">
            <Home className="h-4 w-4 mr-2" />
            坊区布局
          </TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-emerald-600">
            <ShoppingBag className="h-4 w-4 mr-2" />
            创作市集
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-emerald-600">
            <Calendar className="h-4 w-4 mr-2" />
            活动日历
          </TabsTrigger>
        </TabsList>

        <TabsContent value="districts" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：坊区列表 */}
            <div className="lg:col-span-1">
              <div className="bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">里坊导航</h3>

                <div className="space-y-3">
                  {districts.map((district) => (
                    <motion.div
                      key={district.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedDistrict === district.id
                          ? "bg-emerald-900/30 border border-emerald-500/30"
                          : "bg-black/30 border border-emerald-500/10 hover:bg-black/50"
                      }`}
                      onClick={() => setSelectedDistrict(district.id)}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-white">{district.name}</h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            district.id === "wenxin"
                              ? "bg-emerald-900/50 text-emerald-300"
                              : "bg-amber-900/50 text-amber-300"
                          }`}
                        >
                          {district.level}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm mt-2">{district.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：坊区详情 */}
            <div className="lg:col-span-2">
              {currentDistrict && (
                <motion.div
                  key={currentDistrict.id}
                  className="bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-lg overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-64">
                    <Image
                      src={currentDistrict.image || "/placeholder.svg"}
                      alt={currentDistrict.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white">{currentDistrict.name}</h3>
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${
                            currentDistrict.id === "wenxin"
                              ? "bg-emerald-900/50 text-emerald-300"
                              : "bg-amber-900/50 text-amber-300"
                          }`}
                        >
                          {currentDistrict.level}
                        </span>
                      </div>
                      <p className="text-white/80 mt-2">{currentDistrict.description}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-medium text-white mb-4">坊区特色</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {currentDistrict.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-2 bg-black/30 border border-emerald-500/10 rounded-lg p-3"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${currentDistrict.color}`}
                          >
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          <div className="text-white/90">{feature}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <Button className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800">
                        <Compass className="h-4 w-4 mr-2" />
                        进入{currentDistrict.name}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="market" className="mt-0">
          <div className="bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">天津晓月·创作市集</h3>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span className="text-white/70 text-sm">下次开市: 3天后</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-black/60 border border-emerald-500/10 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.3)" }}
                >
                  <div className="relative h-48">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.rarity === "传说"
                            ? "bg-purple-900/70 text-purple-300"
                            : item.rarity === "史诗"
                              ? "bg-amber-900/70 text-amber-300"
                              : item.rarity === "稀有"
                                ? "bg-blue-900/70 text-blue-300"
                                : "bg-emerald-900/70 text-emerald-300"
                        }`}
                      >
                        {item.rarity}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-medium text-white">{item.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white/70 text-sm">{item.type}</span>
                      <span className="text-white/70 text-sm">使用期限: {item.duration}</span>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 mr-1" />
                        <span className="text-amber-300 font-medium">{item.price}</span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                      >
                        竞拍
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800">
                <ShoppingBag className="h-4 w-4 mr-2" />
                查看更多市集商品
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <div className="bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">活动日历</h3>

            <div className="space-y-6">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-black/60 border border-emerald-500/10 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative h-48 md:h-auto">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute top-2 left-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            event.status === "active"
                              ? "bg-emerald-900/70 text-emerald-300"
                              : "bg-amber-900/70 text-amber-300"
                          }`}
                        >
                          {event.status === "active" ? "进行中" : "即将开始"}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 md:col-span-2">
                      <h4 className="text-lg font-medium text-white">{event.title}</h4>

                      <div className="flex items-center mt-2 mb-3">
                        <Calendar className="h-4 w-4 text-emerald-400 mr-2" />
                        <span className="text-white/70">{event.date}</span>
                      </div>

                      <p className="text-white/80 mb-4">{event.description}</p>

                      <Button
                        variant="outline"
                        className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                      >
                        <Bookmark className="h-4 w-4 mr-2" />
                        {event.status === "active" ? "立即参与" : "预约提醒"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800">
                查看完整活动日历
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
