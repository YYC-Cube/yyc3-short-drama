"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import {
  ShoppingBag,
  Search,
  Star,
  Award,
  Filter,
  Tag,
  Clock,
  Eye,
  Heart,
  Download,
  Lock,
  TrendingUp,
  Bookmark,
  Share2,
  FileText,
} from "lucide-react"

// 脚本类型
type ScriptType = "all" | "template" | "complete" | "element"

// 脚本接口
interface Script {
  id: string
  title: string
  description: string
  author: {
    id: string
    name: string
    avatar: string
    level: string
  }
  type: ScriptType
  price: {
    starValue: number
    tongbao?: number
  }
  tags: string[]
  image: string
  stats: {
    views: number
    likes: number
    downloads: number
    comments: number
  }
  createdAt: string
  isFeatured?: boolean
  isNew?: boolean
}

// 模拟脚本数据
const mockScripts: Script[] = [
  {
    id: "script-1",
    title: "洛阳宫变",
    description: "以唐朝洛阳为背景，讲述宫廷政变中小人物的生存智慧，完整剧本包含9个场景，适合15-20分钟短剧",
    author: {
      id: "user-1",
      name: "东方朔",
      avatar: "/placeholder.svg?height=100&width=100",
      level: "铂金导演",
    },
    type: "complete",
    price: {
      starValue: 2000,
      tongbao: 20,
    },
    tags: ["历史", "宫廷", "唐朝", "政治"],
    image: "/placeholder.svg?height=400&width=600",
    stats: {
      views: 1256,
      likes: 328,
      downloads: 89,
      comments: 42,
    },
    createdAt: "2024-04-01",
    isFeatured: true,
  },
  {
    id: "script-2",
    title: "双时空叙事模板",
    description: "现代与古代双线叙事结构模板，包含详细的场景安排和转场设计，适合历史题材短剧",
    author: {
      id: "user-2",
      name: "李白",
      avatar: "/placeholder.svg?height=100&width=100",
      level: "王者导演",
    },
    type: "template",
    price: {
      starValue: 1500,
    },
    tags: ["模板", "双线叙事", "时空", "结构"],
    image: "/placeholder.svg?height=400&width=600",
    stats: {
      views: 876,
      likes: 215,
      downloads: 67,
      comments: 36,
    },
    createdAt: "2024-03-28",
    isNew: true,
  },
  {
    id: "script-3",
    title: "龙门石窟场景集",
    description: "龙门石窟相关场景描写集合，包含10个精细场景描写，可直接用于短剧创作",
    author: {
      id: "user-3",
      name: "杜甫",
      avatar: "/placeholder.svg?height=100&width=100",
      level: "钻石导演",
    },
    type: "element",
    price: {
      starValue: 800,
    },
    tags: ["场景", "龙门石窟", "描写", "元素"],
    image: "/placeholder.svg?height=400&width=600",
    stats: {
      views: 542,
      likes: 163,
      downloads: 45,
      comments: 28,
    },
    createdAt: "2024-03-15",
  },
  {
    id: "script-4",
    title: "洛神赋现代演绎",
    description: "基于《洛神赋》改编的现代爱情故事，完整剧本包含12个场景，适合20-25分钟短剧",
    author: {
      id: "user-4",
      name: "曹植",
      avatar: "/placeholder.svg?height=100&width=100",
      level: "王者导演",
    },
    type: "complete",
    price: {
      starValue: 2500,
      tongbao: 25,
    },
    tags: ["爱情", "神话", "改编", "现代"],
    image: "/placeholder.svg?height=400&width=600",
    stats: {
      views: 1842,
      likes: 563,
      downloads: 124,
      comments: 87,
    },
    createdAt: "2024-02-20",
    isFeatured: true,
  },
]

// 脚本类型标签
const scriptTypeLabels: Record<ScriptType, string> = {
  all: "全部作品",
  template: "剧本模板",
  complete: "完整剧本",
  element: "创作元素",
}

export default function ScriptMarketplace() {
  const [activeTab, setActiveTab] = useState<ScriptType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [purchasing, setPurchasing] = useState<string | null>(null)

  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 过滤脚本
  const filteredScripts = mockScripts.filter((script) => {
    // 类型过滤
    if (activeTab !== "all" && script.type !== activeTab) {
      return false
    }

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        script.title.toLowerCase().includes(query) ||
        script.description.toLowerCase().includes(query) ||
        script.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        script.author.name.toLowerCase().includes(query)
      )
    }

    return true
  })

  // 购买脚本
  const purchaseScript = (scriptId: string) => {
    setPurchasing(scriptId)

    // 模拟API请求延迟
    setTimeout(() => {
      toast({
        title: "购买成功",
        description: "您已成功购买该剧本，可在个人中心查看",
      })
      setPurchasing(null)

      // 实际项目中这里会更新用户星值和通宝数量，以及购买记录
    }, 1500)
  }

  // 如果未登录，显示登录提示
  if (!isAuthenticated) {
    return (
      <section ref={ref} className="py-16 border-t border-amber-500/20">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-4">
            <ShoppingBag className="h-6 w-6 text-amber-400 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">创作成果交易市场</h2>
          </div>
          <p className="text-white/70 max-w-3xl">
            在这里您可以购买其他创作者的优质剧本、模板和创作元素，也可以出售自己的创作成果获得收益。
          </p>
        </motion.div>

        <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 text-center">
          <Lock className="h-12 w-12 text-amber-500/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">登录后访问交易市场</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            登录后可浏览和购买其他创作者的优质剧本，也可以出售自己的创作成果获得收益。
          </p>
          <Button
            className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
            onClick={() => (window.location.href = "/auth")}
          >
            立即登录
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-16 border-t border-amber-500/20">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <ShoppingBag className="h-6 w-6 text-amber-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">创作成果交易市场</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          在这里您可以购买其他创作者的优质剧本、模板和创作元素，也可以出售自己的创作成果获得收益。
        </p>
      </motion.div>

      <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as ScriptType)}>
            <TabsList>
              {Object.entries(scriptTypeLabels).map(([type, label]) => (
                <TabsTrigger key={type} value={type} className="data-[state=active]:bg-amber-600">
                  {type === "all" && <ShoppingBag className="h-4 w-4 mr-2" />}
                  {type === "template" && <Tag className="h-4 w-4 mr-2" />}
                  {type === "complete" && <FileText className="h-4 w-4 mr-2" />}
                  {type === "element" && <Bookmark className="h-4 w-4 mr-2" />}
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索剧本、模板或元素..."
                className="pl-10 bg-black/60 border-amber-500/30 focus-visible:ring-amber-500/50 text-white"
              />
            </div>
            <Button variant="outline" className="ml-2 border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScripts.map((script) => (
            <motion.div
              key={script.id}
              className="bg-black/60 border border-amber-500/10 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.3)" }}
            >
              <div className="relative h-48">
                <Image
                  src={script.image || "/placeholder.svg"}
                  alt={script.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 flex space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      script.type === "complete"
                        ? "bg-blue-900/70 text-blue-300"
                        : script.type === "template"
                          ? "bg-purple-900/70 text-purple-300"
                          : "bg-green-900/70 text-green-300"
                    }`}
                  >
                    {script.type === "complete" ? "完整剧本" : script.type === "template" ? "剧本模板" : "创作元素"}
                  </span>
                </div>
                <div className="absolute top-2 right-2 flex space-x-2">
                  {script.isFeatured && (
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-500 text-white">精选</span>
                  )}
                  {script.isNew && (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white">新上线</span>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-medium text-white group-hover:text-amber-300 transition-colors mb-2">
                  {script.title}
                </h3>

                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <Image
                      src={script.author.avatar || "/placeholder.svg"}
                      alt={script.author.name}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white/70 text-sm">{script.author.name}</span>
                  <span className="text-white/40 mx-2">|</span>
                  <span className="text-amber-300/80 text-xs">{script.author.level}</span>
                </div>

                <p className="text-white/70 text-sm mb-3 line-clamp-2">{script.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {script.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 rounded-full bg-black/40 text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3 text-white/60 text-xs">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{script.stats.views}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{script.stats.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      <span>{script.stats.downloads}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-white/60 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{script.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-amber-900/20 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-amber-400 mr-1" />
                      <span className="text-amber-300 text-sm">{script.price.starValue}</span>
                    </div>

                    {script.price.tongbao && (
                      <div className="flex items-center bg-purple-900/20 px-3 py-1 rounded-full">
                        <Award className="h-4 w-4 text-purple-400 mr-1" />
                        <span className="text-purple-300 text-sm">{script.price.tongbao}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 h-8 w-8 p-0"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>

                    <Button
                      className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                      size="sm"
                      disabled={purchasing === script.id}
                      onClick={() => purchaseScript(script.id)}
                    >
                      {purchasing === script.id ? (
                        <TrendingUp className="h-4 w-4 animate-spin" />
                      ) : (
                        <ShoppingBag className="h-4 w-4 mr-1" />
                      )}
                      {purchasing === script.id ? "" : "购买"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredScripts.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-amber-500/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">未找到相关剧本</h3>
            <p className="text-white/70">尝试使用不同的关键词搜索，或者浏览其他类别的剧本</p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
            <ShoppingBag className="h-4 w-4 mr-2" />
            发布我的创作成果
          </Button>
        </div>
      </div>
    </section>
  )
}
