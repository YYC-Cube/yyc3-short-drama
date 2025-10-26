"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
  Download,
  Lock,
  TrendingUp,
  Bookmark,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Users,
  Zap,
  Sparkles,
  Lightbulb,
  Flame,
  Crown,
  Check,
  X,
  ChevronRight,
} from "lucide-react"

// 脚本类型
type ScriptType = "all" | "template" | "complete" | "element"

// 排序方式
type SortMethod = "popular" | "newest" | "rating" | "price-asc" | "price-desc"

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
    isVerified?: boolean
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
    rating: number
    ratingCount: number
  }
  createdAt: string
  isFeatured?: boolean
  isNew?: boolean
  isRecommended?: boolean
  isBestseller?: boolean
  isOnSale?: boolean
  saleDiscount?: number
  relatedScripts?: string[]
  reviews?: Review[]
}

// 评价接口
interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  userLevel: string
  rating: number
  comment: string
  createdAt: string
  likes: number
  dislikes: number
  isVerifiedPurchase: boolean
  isHelpful?: boolean
}

// 推荐原因类型
type RecommendationReason =
  | "based_on_history"
  | "popular_in_category"
  | "similar_users"
  | "trending"
  | "editor_choice"
  | "matches_interests"
  | "new_release"
  | "bestseller"
  | "on_sale"

// 推荐脚本接口
interface RecommendedScript {
  script: Script
  reason: RecommendationReason
  confidence: number // 0-100
}

// 获取推荐原因文本
const getRecommendationReasonText = (reason: RecommendationReason): string => {
  switch (reason) {
    case "based_on_history":
      return "基于您的浏览历史"
    case "popular_in_category":
      return "类别中的热门选择"
    case "similar_users":
      return "相似用户也喜欢"
    case "trending":
      return "近期热门"
    case "editor_choice":
      return "编辑精选"
    case "matches_interests":
      return "匹配您的兴趣"
    case "new_release":
      return "新上线"
    case "bestseller":
      return "畅销作品"
    case "on_sale":
      return "限时特惠"
    default:
      return "推荐给您"
  }
}

// 获取推荐原因图标
const getRecommendationReasonIcon = (reason: RecommendationReason) => {
  switch (reason) {
    case "based_on_history":
      return <Clock className="h-4 w-4" />
    case "popular_in_category":
      return <TrendingUp className="h-4 w-4" />
    case "similar_users":
      return <Users className="h-4 w-4" />
    case "trending":
      return <Flame className="h-4 w-4" />
    case "editor_choice":
      return <Crown className="h-4 w-4" />
    case "matches_interests":
      return <Lightbulb className="h-4 w-4" />
    case "new_release":
      return <Sparkles className="h-4 w-4" />
    case "bestseller":
      return <Award className="h-4 w-4" />
    case "on_sale":
      return <Zap className="h-4 w-4" />
    default:
      return <Star className="h-4 w-4" />
  }
}

// 脚本类型标签
const scriptTypeLabels: Record<ScriptType, string> = {
  all: "全部作品",
  template: "剧本模板",
  complete: "完整剧本",
  element: "创作元素",
}

// 排序方式标签
const sortMethodLabels: Record<SortMethod, string> = {
  popular: "最受欢迎",
  newest: "最新上架",
  rating: "评分最高",
  "price-asc": "价格从低到高",
  "price-desc": "价格从高到低",
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
      isVerified: true,
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
      rating: 4.8,
      ratingCount: 65,
    },
    createdAt: "2024-04-01",
    isFeatured: true,
    isBestseller: true,
    relatedScripts: ["script-4", "script-7", "script-9"],
    reviews: [
      {
        id: "review-1",
        userId: "user-2",
        userName: "李白",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userLevel: "王者导演",
        rating: 5,
        comment:
          "剧本结构严谨，人物形象鲜明，历史细节准确，非常适合改编成短剧。特别喜欢其中对唐朝政治斗争的细腻描写，既有历史厚重感，又不失戏剧张力。",
        createdAt: "2024-04-05",
        likes: 24,
        dislikes: 2,
        isVerifiedPurchase: true,
      },
      {
        id: "review-2",
        userId: "user-3",
        userName: "杜甫",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userLevel: "钻石导演",
        rating: 4,
        comment:
          "整体很不错，对历史背景的还原很到位，但部分对话略显生硬，可以更加口语化一些。不过瑕不掩瑜，仍是一部值得购买的优质剧本。",
        createdAt: "2024-04-03",
        likes: 15,
        dislikes: 1,
        isVerifiedPurchase: true,
      },
    ],
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
      isVerified: true,
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
      rating: 4.6,
      ratingCount: 42,
    },
    createdAt: "2024-03-28",
    isNew: true,
    isRecommended: true,
    relatedScripts: ["script-5", "script-8"],
    reviews: [
      {
        id: "review-3",
        userId: "user-4",
        userName: "曹植",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userLevel: "王者导演",
        rating: 5,
        comment:
          "这个模板太实用了！双时空叙事一直是我的难点，这个模板提供的结构和转场设计非常专业，大大提高了我的创作效率。强烈推荐给所有想尝试双线叙事的创作者。",
        createdAt: "2024-04-02",
        likes: 31,
        dislikes: 0,
        isVerifiedPurchase: true,
      },
    ],
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
      isVerified: true,
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
      rating: 4.3,
      ratingCount: 35,
    },
    createdAt: "2024-03-15",
    isOnSale: true,
    saleDiscount: 30,
    relatedScripts: ["script-6", "script-10"],
    reviews: [
      {
        id: "review-4",
        userId: "user-5",
        userName: "白居易",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userLevel: "铂金导演",
        rating: 4,
        comment:
          "场景描写非常细腻，能感受到作者对龙门石窟的深入了解。唯一的小缺点是缺少一些人物活动的描写，如果能加上会更完美。总体来说很值得购买。",
        createdAt: "2024-03-20",
        likes: 12,
        dislikes: 2,
        isVerifiedPurchase: true,
      },
    ],
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
      isVerified: true,
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
      rating: 4.9,
      ratingCount: 98,
    },
    createdAt: "2024-02-20",
    isFeatured: true,
    isBestseller: true,
    relatedScripts: ["script-1", "script-7"],
    reviews: [
      {
        id: "review-5",
        userId: "user-6",
        userName: "李清照",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userLevel: "钻石导演",
        rating: 5,
        comment:
          "这部剧本简直是艺术品！将《洛神赋》的古典美学与现代爱情故事完美融合，既保留了原作的意境，又增添了现代人能够共鸣的情感。对白优美，结构紧凑，强烈推荐！",
        createdAt: "2024-03-01",
        likes: 45,
        dislikes: 1,
        isVerifiedPurchase: true,
      },
      {
        id: "review-6",
        userId: "user-7",
        userName: "苏轼",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userLevel: "王者导演",
        rating: 5,
        comment:
          "作为一个文学爱好者，我非常欣赏这部作品对原著的尊重和创新。现代演绎不失古典韵味，情感表达细腻动人。这是我见过的最好的《洛神赋》改编作品。",
        createdAt: "2024-02-25",
        likes: 38,
        dislikes: 0,
        isVerifiedPurchase: true,
      },
    ],
  },
]

// 模拟推荐脚本数据
const mockRecommendations: RecommendedScript[] = [
  {
    script: mockScripts[0],
    reason: "bestseller",
    confidence: 95,
  },
  {
    script: mockScripts[1],
    reason: "matches_interests",
    confidence: 88,
  },
  {
    script: mockScripts[3],
    reason: "similar_users",
    confidence: 92,
  },
  {
    script: {
      ...mockScripts[2],
      isOnSale: true,
      saleDiscount: 30,
    },
    reason: "on_sale",
    confidence: 85,
  },
]

export default function EnhancedMarketplace() {
  const [activeTab, setActiveTab] = useState<ScriptType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const [sortMethod, setSortMethod] = useState<SortMethod>("popular")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedScript, setSelectedScript] = useState<Script | null>(null)
  const [activeReviewTab, setActiveReviewTab] = useState<"all" | "positive" | "negative" | "verified">("all")
  const [reviewSortMethod, setReviewSortMethod] = useState<"newest" | "helpful">("helpful")
  const [showRecommendations, setShowRecommendations] = useState(true)
  const [isWritingReview, setIsWritingReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  })

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

    // 标签过滤
    if (selectedTags.length > 0 && !selectedTags.some((tag) => script.tags.includes(tag))) {
      return false
    }

    // 价格过滤
    if (script.price.starValue < priceRange[0] || script.price.starValue > priceRange[1]) {
      return false
    }

    // 评分过滤
    if (ratingFilter !== null && script.stats.rating < ratingFilter) {
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

  // 排序脚本
  const sortedScripts = [...filteredScripts].sort((a, b) => {
    switch (sortMethod) {
      case "popular":
        return b.stats.downloads - a.stats.downloads
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "rating":
        return b.stats.rating - a.stats.rating
      case "price-asc":
        return a.price.starValue - b.price.starValue
      case "price-desc":
        return b.price.starValue - a.price.starValue
      default:
        return 0
    }
  })

  // 获取所有标签
  const allTags = Array.from(new Set(mockScripts.flatMap((script) => script.tags)))

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

  // 过滤评论
  const filterReviews = (reviews: Review[] = []) => {
    let filtered = [...reviews]

    switch (activeReviewTab) {
      case "positive":
        filtered = filtered.filter((review) => review.rating >= 4)
        break
      case "negative":
        filtered = filtered.filter((review) => review.rating < 4)
        break
      case "verified":
        filtered = filtered.filter((review) => review.isVerifiedPurchase)
        break
      default:
        break
    }

    // 排序
    if (reviewSortMethod === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else {
      filtered.sort((a, b) => b.likes - a.likes)
    }

    return filtered
  }

  // 提交评价
  const submitReview = () => {
    if (!selectedScript) return

    if (newReview.comment.trim().length < 10) {
      toast({
        title: "评价内容过短",
        description: "请至少输入10个字符的评价内容",
        variant: "destructive",
      })
      return
    }

    // 模拟API请求延迟
    setTimeout(() => {
      toast({
        title: "评价提交成功",
        description: "感谢您的评价，您的反馈对我们非常重要",
      })

      setIsWritingReview(false)
      setNewReview({
        rating: 5,
        comment: "",
      })

      // 实际项目中这里会更新评价数据
    }, 1000)
  }

  // 评价点赞/踩
  const rateReview = (reviewId: string, isHelpful: boolean) => {
    toast({
      title: isHelpful ? "已标记为有帮助" : "已标记为无帮助",
      description: "感谢您的反馈",
    })

    // 实际项目中这里会更新评价的点赞/踩数据
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
            <h2 className="text-2xl md:text-3xl font-bold text-white">增强版交易市场</h2>
          </div>
          <p className="text-white/70 max-w-3xl">
            在这里您可以购买其他创作者的优质剧本、模板和创作元素，也可以出售自己的创作成果获得收益。
            我们提供详细的评价系统和个性化推荐，帮助您找到最适合的创作资源。
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
          <h2 className="text-2xl md:text-3xl font-bold text-white">增强版交易市场</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          在这里您可以购买其他创作者的优质剧本、模板和创作元素，也可以出售自己的创作成果获得收益。
          我们提供详细的评价系统和个性化推荐，帮助您找到最适合的创作资源。
        </p>
      </motion.div>

      {/* 个性化推荐 */}
      {showRecommendations && (
        <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-amber-400 mr-2" />
              <h3 className="text-xl font-bold text-white">为您推荐</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              onClick={() => setShowRecommendations(false)}
            >
              <X className="h-4 w-4 mr-2" />
              隐藏推荐
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockRecommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                className="bg-black/60 border border-amber-500/10 rounded-lg overflow-hidden group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.3)" }}
                onClick={() => setSelectedScript(recommendation.script)}
              >
                <div className="relative h-40">
                  <Image
                    src={recommendation.script.image || "/placeholder.svg"}
                    alt={recommendation.script.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 right-2 flex justify-between">
                    <Badge className="bg-amber-600">
                      {getRecommendationReasonIcon(recommendation.reason)}
                      <span className="ml-1">{getRecommendationReasonText(recommendation.reason)}</span>
                    </Badge>

                    {recommendation.script.isOnSale && (
                      <Badge className="bg-red-600">{recommendation.script.saleDiscount}% 折扣</Badge>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                </div>

                <div className="p-4">
                  <h4 className="text-lg font-medium text-white group-hover:text-amber-300 transition-colors mb-2 line-clamp-1">
                    {recommendation.script.title}
                  </h4>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400 mr-1" />
                      <span className="text-white font-medium">{recommendation.script.stats.rating}</span>
                      <span className="text-white/60 text-xs ml-1">({recommendation.script.stats.ratingCount})</span>
                    </div>
                    <span className="text-white/40 mx-2">|</span>
                    <span className="text-white/70 text-sm">{recommendation.script.author.name}</span>
                  </div>

                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{recommendation.script.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {recommendation.script.isOnSale ? (
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-400 mr-1" />
                            <span className="text-amber-300 font-medium">
                              {Math.round(
                                recommendation.script.price.starValue * (1 - recommendation.script.saleDiscount! / 100),
                              )}
                            </span>
                          </div>
                          <div className="text-white/50 text-xs line-through">
                            {recommendation.script.price.starValue}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-400 mr-1" />
                          <span className="text-amber-300 font-medium">{recommendation.script.price.starValue}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      查看详情
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
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
            <Button
              variant="outline"
              className="ml-2 border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 高级筛选 */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 标签筛选 */}
                  <div>
                    <h4 className="text-white font-medium mb-3">标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag, index) => (
                        <Badge
                          key={index}
                          className={`cursor-pointer ${
                            selectedTags.includes(tag)
                              ? "bg-amber-600 hover:bg-amber-700"
                              : "bg-black/60 hover:bg-black/80"
                          }`}
                          onClick={() => {
                            if (selectedTags.includes(tag)) {
                              setSelectedTags(selectedTags.filter((t) => t !== tag))
                            } else {
                              setSelectedTags([...selectedTags, tag])
                            }
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 价格筛选 */}
                  <div>
                    <h4 className="text-white font-medium mb-3">价格范围</h4>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="bg-black/60 border-amber-500/30 focus-visible:ring-amber-500/50 text-white"
                      />
                      <span className="text-white">-</span>
                      <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="bg-black/60 border-amber-500/30 focus-visible:ring-amber-500/50 text-white"
                      />
                    </div>
                  </div>

                  {/* 评分筛选 */}
                  <div>
                    <h4 className="text-white font-medium mb-3">最低评分</h4>
                    <div className="flex items-center space-x-2">
                      {[null, 3, 4, 4.5].map((rating, index) => (
                        <Badge
                          key={index}
                          className={`cursor-pointer ${
                            ratingFilter === rating
                              ? "bg-amber-600 hover:bg-amber-700"
                              : "bg-black/60 hover:bg-black/80"
                          }`}
                          onClick={() => setRatingFilter(rating)}
                        >
                          {rating === null ? "全部" : `${rating}+`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-amber-500/10">
                  <div className="flex items-center">
                    <span className="text-white/70 mr-2">排序方式:</span>
                    <select
                      value={sortMethod}
                      onChange={(e) => setSortMethod(e.target.value as SortMethod)}
                      className="bg-black/60 border border-amber-500/30 rounded text-white px-2 py-1 text-sm"
                    >
                      {Object.entries(sortMethodLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    onClick={() => {
                      setSelectedTags([])
                      setPriceRange([0, 5000])
                      setRatingFilter(null)
                      setSortMethod("popular")
                    }}
                  >
                    重置筛选
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 脚本列表 */}
        {sortedScripts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedScripts.map((script) => (
              <motion.div
                key={script.id}
                className="bg-black/60 border border-amber-500/10 rounded-lg overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.3)" }}
                onClick={() => setSelectedScript(script)}
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
                    {script.isBestseller && (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500 text-white">畅销</span>
                    )}
                    {script.isOnSale && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500 text-white">
                        {script.saleDiscount}% 折扣
                      </span>
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
                    {script.author.isVerified && (
                      <Badge className="ml-2 bg-blue-900/50 text-blue-300">
                        <Check className="h-3 w-3 mr-1" />
                        认证
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400 mr-1" />
                      <span className="text-white font-medium">{script.stats.rating}</span>
                      <span className="text-white/60 text-xs ml-1">({script.stats.ratingCount})</span>
                    </div>
                    <span className="text-white/40 mx-2">|</span>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-white/60 mr-1" />
                      <span className="text-white/60 text-sm">{script.stats.downloads}</span>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{script.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {script.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-black/40 text-white/70">
                        {tag}
                      </span>
                    ))}
                    {script.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-black/40 text-white/70">
                        +{script.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {script.isOnSale ? (
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-400 mr-1" />
                            <span className="text-amber-300 font-medium">
                              {Math.round(script.price.starValue * (1 - script.saleDiscount! / 100))}
                            </span>
                          </div>
                          <div className="text-white/50 text-xs line-through">{script.price.starValue}</div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-400 mr-1" />
                            <span className="text-amber-300 font-medium">{script.price.starValue}</span>
                          </div>

                          {script.price.tongbao && (
                            <div className="flex items-center">
                              <Award className="h-4 w-4 text-purple-400 mr-1" />
                              <span className="text-purple-300 font-medium">{script.price.tongbao}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <Button
                      className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                      size="sm"
                      disabled={purchasing === script.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        purchaseScript(script.id)
                      }}
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
              </motion.div>
            ))}
          </div>
        ) : (
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

      {/* 脚本详情对话框 */}
      <Dialog open={!!selectedScript} onOpenChange={(open) => !open && setSelectedScript(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-amber-500/20">
          {selectedScript && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">{selectedScript.title}</DialogTitle>
                <DialogDescription className="text-white/70">{selectedScript.description}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={selectedScript.image || "/placeholder.svg"}
                      alt={selectedScript.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      {selectedScript.isFeatured && (
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-500 text-white">精选</span>
                      )}
                      {selectedScript.isNew && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white">新上线</span>
                      )}
                      {selectedScript.isBestseller && (
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500 text-white">畅销</span>
                      )}
                      {selectedScript.isOnSale && (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-500 text-white">
                          {selectedScript.saleDiscount}% 折扣
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={selectedScript.author.avatar} alt={selectedScript.author.name} />
                      <AvatarFallback className="bg-amber-900/50 text-amber-300">
                        {selectedScript.author.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="text-white font-medium">{selectedScript.author.name}</span>
                        {selectedScript.author.isVerified && (
                          <Badge className="ml-2 bg-blue-900/50 text-blue-300">
                            <Check className="h-3 w-3 mr-1" />
                            认证创作者
                          </Badge>
                        )}
                      </div>
                      <div className="text-white/60 text-sm">{selectedScript.author.level}</div>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-3">作品详情</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">类型</span>
                        <span className="text-white">
                          {selectedScript.type === "complete"
                            ? "完整剧本"
                            : selectedScript.type === "template"
                              ? "剧本模板"
                              : "创作元素"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">发布日期</span>
                        <span className="text-white">{selectedScript.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">下载次数</span>
                        <span className="text-white">{selectedScript.stats.downloads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">评价数量</span>
                        <span className="text-white">{selectedScript.stats.ratingCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedScript.tags.map((tag, index) => (
                        <Badge key={index} className="bg-black/60">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">评分</h4>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-amber-400 mr-1" />
                        <span className="text-white font-medium text-lg">{selectedScript.stats.rating}</span>
                        <span className="text-white/60 text-sm ml-1">({selectedScript.stats.ratingCount})</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        // 计算每个评分的百分比（模拟数据）
                        const percent = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1

                        return (
                          <div key={rating} className="flex items-center">
                            <div className="flex items-center w-16">
                              <span className="text-white mr-1">{rating}</span>
                              <Star className="h-4 w-4 text-amber-400" />
                            </div>
                            <div className="flex-grow mx-2">
                              <Progress value={percent} className="h-2" />
                            </div>
                            <div className="w-12 text-right text-white/70 text-sm">{percent}%</div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                        onClick={() => setIsWritingReview(true)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        写评价
                      </Button>

                      <div className="text-white/60 text-sm">{selectedScript.stats.ratingCount} 条评价</div>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-white font-medium">评价</h4>
                      <div className="flex items-center space-x-2">
                        <select
                          value={activeReviewTab}
                          onChange={(e) => setActiveReviewTab(e.target.value as any)}
                          className="bg-black/60 border border-amber-500/30 rounded text-white px-2 py-1 text-sm"
                        >
                          <option value="all">全部评价</option>
                          <option value="positive">好评</option>
                          <option value="negative">差评</option>
                          <option value="verified">已验证购买</option>
                        </select>

                        <select
                          value={reviewSortMethod}
                          onChange={(e) => setReviewSortMethod(e.target.value as any)}
                          className="bg-black/60 border border-amber-500/30 rounded text-white px-2 py-1 text-sm"
                        >
                          <option value="helpful">最有帮助</option>
                          <option value="newest">最新</option>
                        </select>
                      </div>
                    </div>

                    {selectedScript.reviews && selectedScript.reviews.length > 0 ? (
                      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                        {filterReviews(selectedScript.reviews).map((review) => (
                          <div key={review.id} className="border-b border-amber-500/10 pb-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                                  <AvatarFallback className="bg-amber-900/50 text-amber-300">
                                    {review.userName.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-white font-medium">{review.userName}</div>
                                  <div className="text-white/60 text-xs">{review.userLevel}</div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "text-amber-400" : "text-white/20"}`}
                                  />
                                ))}
                              </div>
                            </div>

                            {review.isVerifiedPurchase && (
                              <Badge className="mb-2 bg-green-900/50 text-green-300">
                                <Check className="h-3 w-3 mr-1" />
                                已验证购买
                              </Badge>
                            )}

                            <p className="text-white/80 text-sm mb-3">{review.comment}</p>

                            <div className="flex justify-between items-center">
                              <div className="text-white/60 text-xs">{review.createdAt}</div>
                              <div className="flex items-center space-x-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-white/60 hover:text-white"
                                  onClick={() => rateReview(review.id, true)}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  <span>{review.likes}</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-white/60 hover:text-white"
                                  onClick={() => rateReview(review.id, false)}
                                >
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  <span>{review.dislikes}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <MessageSquare className="h-12 w-12 text-amber-500/30 mx-auto mb-2" />
                        <p className="text-white/70">暂无评价</p>
                      </div>
                    )}
                  </div>

                  {selectedScript.relatedScripts && selectedScript.relatedScripts.length > 0 && (
                    <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">相关作品</h4>
                      <div className="space-y-2">
                        {selectedScript.relatedScripts.map((scriptId) => {
                          const relatedScript = mockScripts.find((s) => s.id === scriptId)
                          if (!relatedScript) return null

                          return (
                            <div
                              key={scriptId}
                              className="flex items-center p-2 rounded-lg hover:bg-amber-900/20 cursor-pointer"
                              onClick={() => setSelectedScript(relatedScript)}
                            >
                              <div className="w-12 h-12 relative rounded overflow-hidden mr-3">
                                <Image
                                  src={relatedScript.image || "/placeholder.svg"}
                                  alt={relatedScript.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <div className="text-white font-medium">{relatedScript.title}</div>
                                <div className="flex items-center text-sm">
                                  <Star className="h-3 w-3 text-amber-400 mr-1" />
                                  <span className="text-white/70">{relatedScript.stats.rating}</span>
                                  <span className="text-white/40 mx-1">|</span>
                                  <span className="text-white/70">{relatedScript.author.name}</span>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-white/60" />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center">
                  {selectedScript.isOnSale ? (
                    <div className="flex items-center">
                      <div className="flex flex-col mr-4">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-amber-400 mr-1" />
                          <span className="text-amber-300 font-medium text-xl">
                            {Math.round(selectedScript.price.starValue * (1 - selectedScript.saleDiscount! / 100))}
                          </span>
                        </div>
                        <div className="text-white/50 text-sm line-through">{selectedScript.price.starValue}</div>
                      </div>

                      {selectedScript.price.tongbao && (
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-purple-400 mr-1" />
                          <span className="text-purple-300 font-medium text-xl">{selectedScript.price.tongbao}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-amber-400 mr-1" />
                        <span className="text-amber-300 font-medium text-xl">{selectedScript.price.starValue}</span>
                      </div>

                      {selectedScript.price.tongbao && (
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-purple-400 mr-1" />
                          <span className="text-purple-300 font-medium text-xl">{selectedScript.price.tongbao}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    onClick={() => window.open(selectedScript.image, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    下载样片
                  </Button>

                  <Button
                    className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                    disabled={purchasing === selectedScript.id}
                    onClick={() => purchaseScript(selectedScript.id)}
                  >
                    {purchasing === selectedScript.id ? (
                      <TrendingUp className="h-4 w-4 animate-spin" />
                    ) : (
                      <ShoppingBag className="h-4 w-4 mr-2" />
                    )}
                    {purchasing === selectedScript.id ? "购买中..." : "立即购买"}
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 撰写评价对话框 */}
      <Dialog open={isWritingReview} onOpenChange={() => setIsWritingReview(false)}>
        <DialogContent className="max-w-md bg-black/95 border-amber-500/20">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white">撰写评价</DialogTitle>
            <DialogDescription className="text-white/70">
              分享您对这部作品的看法，帮助其他创作者更好地了解它
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <div className="text-white font-medium mb-1">评分</div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    className={`p-1 rounded-full hover:bg-amber-900/30 focus:outline-none ${
                      i < newReview.rating ? "text-amber-400" : "text-white/50"
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-white font-medium mb-1">评价内容</div>
              <Input
                placeholder="请分享您的详细评价..."
                className="bg-black/60 border-amber-500/30 focus-visible:ring-amber-500/50 text-white"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
              onClick={submitReview}
            >
              提交评价
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
