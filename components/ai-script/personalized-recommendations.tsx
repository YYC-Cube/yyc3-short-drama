"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, TrendingUp, Star, Clock, BookOpen, Lightbulb, ArrowRight } from "lucide-react"

// 推荐类型
type RecommendationType = "themes" | "templates" | "styles"

// 推荐项目接口
interface RecommendationItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  popularity: number
  tags: string[]
  isNew?: boolean
}

// 模拟用户数据
const mockUserData = {
  id: "user123",
  name: "东方朔",
  level: "铂金导演",
  interests: ["历史", "悬疑", "爱情"],
  recentActivities: ["洛阳古都探秘", "龙门石窟传奇"],
  createdScripts: 12,
  isLocalUser: true,
}

// 模拟推荐数据
const mockRecommendations: Record<RecommendationType, RecommendationItem[]> = {
  themes: [
    {
      id: "theme1",
      title: "洛阳宫变",
      description: "以唐朝洛阳为背景，讲述宫廷政变中小人物的生存智慧",
      image: "/placeholder.svg?height=300&width=500",
      category: "历史政治",
      popularity: 92,
      tags: ["唐朝", "宫廷", "权谋"],
      isNew: true,
    },
    {
      id: "theme2",
      title: "龙门奇缘",
      description: "现代考古学家在龙门石窟发现千年前雕刻师留下的秘密信息",
      image: "/placeholder.svg?height=300&width=500",
      category: "悬疑探险",
      popularity: 88,
      tags: ["考古", "悬疑", "历史"],
    },
    {
      id: "theme3",
      title: "洛水情缘",
      description: "基于《洛神赋》改编，讲述一段跨越千年的爱情故事",
      image: "/placeholder.svg?height=300&width=500",
      category: "古风爱情",
      popularity: 95,
      tags: ["爱情", "神话", "古风"],
    },
    {
      id: "theme4",
      title: "白马寺传奇",
      description: "围绕中国第一座佛教寺院展开的神秘故事",
      image: "/placeholder.svg?height=300&width=500",
      category: "文化探秘",
      popularity: 85,
      tags: ["佛教", "历史", "传奇"],
    },
  ],
  templates: [
    {
      id: "template1",
      title: "英雄之旅",
      description: "经典的英雄冒险模板，适合历史或神话题材",
      image: "/placeholder.svg?height=300&width=500",
      category: "冒险模板",
      popularity: 90,
      tags: ["冒险", "成长", "历史"],
    },
    {
      id: "template2",
      title: "双时空叙事",
      description: "现代与古代双线叙事，展现历史与现实的呼应",
      image: "/placeholder.svg?height=300&width=500",
      category: "叙事结构",
      popularity: 87,
      tags: ["双线", "时空", "对比"],
      isNew: true,
    },
    {
      id: "template3",
      title: "文物背后的故事",
      description: "以文物为线索，揭开历史谜团的叙事模板",
      image: "/placeholder.svg?height=300&width=500",
      category: "悬疑模板",
      popularity: 89,
      tags: ["文物", "悬疑", "历史"],
    },
    {
      id: "template4",
      title: "历史转折点",
      description: "聚焦历史关键时刻，小人物视角见证大时代变革",
      image: "/placeholder.svg?height=300&width=500",
      category: "历史模板",
      popularity: 92,
      tags: ["历史", "转折", "小人物"],
    },
  ],
  styles: [
    {
      id: "style1",
      title: "唐诗风格",
      description: "对话简练有力，意境优美，适合表现豪迈情感",
      image: "/placeholder.svg?height=300&width=500",
      category: "语言风格",
      popularity: 94,
      tags: ["唐诗", "豪迈", "简练"],
    },
    {
      id: "style2",
      title: "宋词风格",
      description: "婉约含蓄，情感细腻，适合表现复杂内心世界",
      image: "/placeholder.svg?height=300&width=500",
      category: "语言风格",
      popularity: 91,
      tags: ["宋词", "婉约", "含蓄"],
    },
    {
      id: "style3",
      title: "史记笔法",
      description: "叙事简洁有力，人物形象鲜明，适合历史题材",
      image: "/placeholder.svg?height=300&width=500",
      category: "叙事风格",
      popularity: 88,
      tags: ["史记", "简洁", "人物"],
      isNew: true,
    },
    {
      id: "style4",
      title: "洛阳伽蓝记风格",
      description: "细腻描写建筑与风物，融合佛教文化元素",
      image: "/placeholder.svg?height=300&width=500",
      category: "描写风格",
      popularity: 86,
      tags: ["建筑", "风物", "佛教"],
    },
  ],
}

// 获取个性化推荐
const getPersonalizedRecommendations = (
  type: RecommendationType,
  userData: typeof mockUserData,
): RecommendationItem[] => {
  // 模拟个性化推荐算法
  // 实际项目中会基于用户兴趣、历史行为等数据进行推荐

  const allItems = mockRecommendations[type]

  // 根据用户兴趣进行排序
  return [...allItems].sort((a, b) => {
    // 计算与用户兴趣的匹配度
    const aMatchScore = a.tags.filter((tag) => userData.interests.includes(tag)).length
    const bMatchScore = b.tags.filter((tag) => userData.interests.includes(tag)).length

    if (aMatchScore !== bMatchScore) {
      return bMatchScore - aMatchScore // 兴趣匹配度高的排前面
    }

    // 兴趣匹配度相同时，新内容优先
    if (a.isNew && !b.isNew) return -1
    if (!a.isNew && b.isNew) return 1

    // 其次按热度排序
    return b.popularity - a.popularity
  })
}

export default function PersonalizedRecommendations() {
  const [activeTab, setActiveTab] = useState<RecommendationType>("themes")
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 加载推荐数据
  useEffect(() => {
    setIsLoading(true)

    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const personalizedItems = getPersonalizedRecommendations(activeTab, mockUserData)
      setRecommendations(personalizedItems)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [activeTab])

  return (
    <section ref={ref} className="py-16 border-t border-amber-500/20">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <Sparkles className="h-6 w-6 text-amber-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">个性化推荐</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          基于您的创作历史和偏好，为您推荐适合的剧本主题、模板和风格， 帮助您更高效地创作出符合个人风格的优质短剧内容。
        </p>
      </motion.div>

      <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mr-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{mockUserData.name}</h3>
              <div className="flex items-center text-white/70 text-sm">
                <span className="text-amber-300 mr-2">{mockUserData.level}</span>
                <span>|</span>
                <span className="mx-2">已创作 {mockUserData.createdScripts} 部短剧</span>
              </div>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
            <Lightbulb className="h-4 w-4 mr-2" />
            查看我的创作档案
          </Button>
        </div>

        <Tabs
          defaultValue="themes"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as RecommendationType)}
        >
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="themes" className="data-[state=active]:bg-amber-600">
              <BookOpen className="h-4 w-4 mr-2" />
              推荐主题
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-amber-600">
              <Star className="h-4 w-4 mr-2" />
              剧本模板
            </TabsTrigger>
            <TabsTrigger value="styles" className="data-[state=active]:bg-amber-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              创作风格
            </TabsTrigger>
          </TabsList>

          {["themes", "templates", "styles"].map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[300px] place-items-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-full h-64 bg-black/60 border border-amber-500/10 rounded-lg animate-pulse"
                    >
                      <div className="h-32 bg-amber-900/20 rounded-t-lg"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-5 bg-amber-900/20 rounded w-3/4"></div>
                        <div className="h-4 bg-amber-900/20 rounded w-full"></div>
                        <div className="h-4 bg-amber-900/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendations.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="bg-black/60 border border-amber-500/10 rounded-lg overflow-hidden group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.3)" }}
                    >
                      <div className="relative h-40">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                          {item.isNew && (
                            <span className="text-xs px-2 py-1 rounded-full bg-amber-500 text-white">新上线</span>
                          )}
                          <span className="text-xs px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center">
                            <Star className="h-3 w-3 text-amber-400 mr-1" />
                            {item.popularity}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                      </div>

                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-medium text-white group-hover:text-amber-300 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-900/30 text-amber-300">
                            {item.category}
                          </span>
                        </div>

                        <p className="text-white/70 text-sm mb-3 line-clamp-2">{item.description}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-black/40 text-white/70">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link href={`/ai-script/use?id=${item.id}&type=${type}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                          >
                            使用此{type === "themes" ? "主题" : type === "templates" ? "模板" : "风格"}
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                  查看更多推荐
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="text-white font-medium">最近创作活动</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockUserData.recentActivities.map((activity, index) => (
              <div key={index} className="bg-black/40 border border-amber-500/10 rounded-lg p-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{activity}</div>
                  <div className="text-white/60 text-xs">3天前编辑</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
