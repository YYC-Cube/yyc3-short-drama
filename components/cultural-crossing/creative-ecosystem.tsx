"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, TrendingUp, Award, Sparkles, Users, Check, Lock } from "lucide-react"

// 数字演员数据
const digitalActors = [
  {
    id: "wuzetian",
    name: "武则天",
    avatar: "/placeholder.svg?height=200&width=200&text=武则天",
    era: "唐朝",
    popularity: 92,
    rentPrice: {
      starValue: 500,
      tongbao: 5,
    },
    earnings: 12500,
    protectionFund: 2500,
    appearances: 25,
    rating: 4.8,
    skins: [
      { id: "default", name: "默认形象", unlocked: true },
      { id: "young", name: "少年形象", unlocked: true },
      { id: "empress", name: "称帝形象", unlocked: false },
    ],
  },
  {
    id: "libai",
    name: "李白",
    avatar: "/placeholder.svg?height=200&width=200&text=李白",
    era: "唐朝",
    popularity: 98,
    rentPrice: {
      starValue: 450,
      tongbao: 4,
    },
    earnings: 18000,
    protectionFund: 3600,
    appearances: 36,
    rating: 4.9,
    skins: [
      { id: "default", name: "默认形象", unlocked: true },
      { id: "drunk", name: "醉酒形象", unlocked: true },
      { id: "immortal", name: "剑仙形象", unlocked: false },
    ],
  },
  {
    id: "dufu",
    name: "杜甫",
    avatar: "/placeholder.svg?height=200&width=200&text=杜甫",
    era: "唐朝",
    popularity: 85,
    rentPrice: {
      starValue: 400,
      tongbao: 4,
    },
    earnings: 9600,
    protectionFund: 1920,
    appearances: 24,
    rating: 4.7,
    skins: [
      { id: "default", name: "默认形象", unlocked: true },
      { id: "young", name: "少年形象", unlocked: false },
      { id: "elder", name: "晚年形象", unlocked: false },
    ],
  },
  {
    id: "bai_juyi",
    name: "白居易",
    title: "诗魔",
    era: "唐朝",
    avatar: "/placeholder.svg?height=200&width=200&text=白居易",
    popularity: 80,
    rentPrice: {
      starValue: 350,
      tongbao: 3,
    },
    earnings: 7000,
    protectionFund: 1400,
    appearances: 20,
    rating: 4.6,
    skins: [
      { id: "default", name: "默认形象", unlocked: true },
      { id: "official", name: "官员形象", unlocked: false },
      { id: "poet", name: "诗人形象", unlocked: false },
    ],
  },
]

// 文化基因裂变项目
const culturalProjects = [
  {
    id: "tower_boy",
    title: '永宁寺塔残柱AI生成"佛塔少年"角色设定',
    category: "文物拟人化",
    image: "/placeholder.svg?height=400&width=600&text=佛塔少年",
    creator: {
      name: "东方朔",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    likes: 328,
    views: 1256,
    description:
      '基于永宁寺塔残柱的3D扫描数据，结合AI生成技术，创造了一个名为"佛塔少年"的角色形象，融合了北魏建筑特色和少年活力。',
  },
  {
    id: "luoyang_cyberpunk",
    title: "《洛阳伽蓝记》改编赛博朋克版剧本框架",
    category: "典籍新编",
    image: "/placeholder.svg?height=400&width=600&text=赛博洛阳",
    creator: {
      name: "李白",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    likes: 215,
    views: 876,
    description: "将《洛阳伽蓝记》中的寺庙故事重新演绎为未来赛博朋克世界中的数字寺庙，探讨信仰与科技的碰撞。",
  },
  {
    id: "rubbing_art",
    title: "用户隔空学习传拓技艺，AI评估拓片完整度",
    category: "非遗活化",
    image: "/placeholder.svg?height=400&width=600&text=传拓技艺",
    creator: {
      name: "杜甫",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    likes: 163,
    views: 542,
    description: "通过AR技术和手势识别，用户可以在家中学习龙门石窟的传拓技艺，AI系统会评估拓片的完整度和准确性。",
  },
]

export default function CreativeEcosystem() {
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
          创作生态赋能
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          跨代际演员经纪与文化基因裂变工坊，构建"创作即保护，演绎即传承"的可持续生态
        </p>
      </motion.div>

      <Tabs defaultValue="actors" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-12">
          <TabsTrigger value="actors" className="data-[state=active]:bg-amber-600 py-3">
            <Users className="h-5 w-5 mr-2" />
            跨代际演员经纪
          </TabsTrigger>
          <TabsTrigger value="cultural" className="data-[state=active]:bg-amber-600 py-3">
            <Sparkles className="h-5 w-5 mr-2" />
            文化基因裂变工坊
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actors" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">数字替身片酬系统</h3>
              <p className="text-white/70 mb-6">
                用户可以租用历史名人数字替身参与短剧创作，支付的明星值和通宝将部分注入遗址保护基金，形成"创作即保护"的良性循环。
              </p>

              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-3">片酬分配机制</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">创作者收益</span>
                      <span className="text-white">60%</span>
                    </div>
                    <div className="h-2 bg-black/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">平台运营</span>
                      <span className="text-white">20%</span>
                    </div>
                    <div className="h-2 bg-black/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">遗址保护基金</span>
                      <span className="text-white">20%</span>
                    </div>
                    <div className="h-2 bg-black/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-3">保护成果展示</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/60 border border-green-500/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">¥ 125,600</div>
                    <div className="text-white/70 text-sm">已筹集保护基金</div>
                  </div>
                  <div className="bg-black/60 border border-green-500/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">3</div>
                    <div className="text-white/70 text-sm">已修复文物</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">历史人物星途榜</h3>
                <Badge className="bg-amber-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  实时更新
                </Badge>
              </div>

              <div className="space-y-4">
                {digitalActors.map((actor, index) => (
                  <div
                    key={actor.id}
                    className="bg-black/60 border border-amber-500/10 rounded-lg p-3 flex items-center"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                      <span className="text-amber-400 font-bold">{index + 1}</span>
                    </div>
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={actor.avatar} alt={actor.name} />
                      <AvatarFallback>{actor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <span className="text-white font-medium">{actor.name}</span>
                        <span className="text-white/60 text-xs ml-2">{actor.era}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-white/70 mr-2">出演: {actor.appearances}次</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-amber-400 mr-1" />
                          <span className="text-amber-300">{actor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-400 font-medium">
                        <Star className="h-3 w-3 inline mr-1" />
                        {actor.earnings}
                      </div>
                      <div className="text-green-400 text-xs">
                        <span className="text-green-400">+{(actor.earnings * 0.2).toFixed(0)}</span>
                        <span className="text-white/60 ml-1">保护金</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-3">解锁特殊形象</h4>
                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={digitalActors[1].avatar} alt={digitalActors[1].name} />
                      <AvatarFallback>{digitalActors[1].name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white font-medium">{digitalActors[1].name}</div>
                      <div className="text-white/60 text-sm">根据参演作品传播度，解锁新皮肤</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {digitalActors[1].skins.map((skin) => (
                      <div
                        key={skin.id}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          skin.unlocked
                            ? "bg-amber-900/20 border border-amber-500/30"
                            : "bg-black/40 border border-white/10"
                        }`}
                      >
                        <div className="flex items-center">
                          {skin.unlocked ? (
                            <Check className="h-4 w-4 text-amber-400 mr-2" />
                          ) : (
                            <Lock className="h-4 w-4 text-white/40 mr-2" />
                          )}
                          <span className={skin.unlocked ? "text-white" : "text-white/60"}>{skin.name}</span>
                        </div>
                        {!skin.unlocked && (
                          <Badge className="bg-black/60">
                            <Star className="h-3 w-3 mr-1 text-amber-400" />
                            <span>需50次出演</span>
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {digitalActors.map((actor, index) => (
              <div
                key={actor.id}
                className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg overflow-hidden group"
              >
                <div className="relative h-48">
                  <Image
                    src={actor.avatar || "/placeholder.svg"}
                    alt={actor.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-600/80 backdrop-blur-sm">{actor.era}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-white">{actor.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400 mr-1" />
                      <span className="text-white">{actor.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-white/70">受欢迎度</span>
                    <span className="text-white">{actor.popularity}%</span>
                  </div>

                  <div className="bg-black/60 border border-amber-500/10 rounded-lg p-3 mb-4">
                    <div className="text-white font-medium mb-2">租用价格</div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 mr-1" />
                        <span className="text-amber-300">{actor.rentPrice.starValue}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-purple-400 mr-1" />
                        <span className="text-purple-300">{actor.rentPrice.tongbao}</span>
                      </div>
                    </div>
                    <div className="text-white/60 text-xs mt-1">其中20%将注入遗址保护基金</div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                    <Users className="h-4 w-4 mr-2" />
                    租用{actor.name}
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
