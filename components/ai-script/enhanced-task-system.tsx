"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import {
  Trophy,
  Calendar,
  Star,
  Award,
  Gift,
  Clock,
  CheckCircle2,
  Lock,
  Zap,
  Sparkles,
  Users,
  Flame,
  Target,
  Lightbulb,
  Compass,
  BookOpen,
  Palette,
  MessageSquare,
  Share2,
  Repeat,
  Crown,
  Gem,
  Coins,
  Tag,
} from "lucide-react"

// 任务类型
type TaskCategory = "daily" | "weekly" | "achievement" | "social" | "creative" | "challenge"

// 任务状态
type TaskStatus = "completed" | "in-progress" | "locked" | "claimed"

// 任务难度
type TaskDifficulty = "easy" | "medium" | "hard" | "expert"

// 奖励类型
type RewardType = "starValue" | "tongbao" | "badge" | "template" | "theme" | "style" | "level" | "feature"

// 奖励接口
interface TaskReward {
  type: RewardType
  value: number | string
  icon: React.ReactNode
  color: string
}

// 任务接口
interface Task {
  id: string
  title: string
  description: string
  category: TaskCategory
  status: TaskStatus
  difficulty: TaskDifficulty
  progress: number
  maxProgress: number
  rewards: TaskReward[]
  expiresAt?: string
  image?: string
  requiredLevel?: string
  completionCriteria?: string
  isNew?: boolean
  isLimited?: boolean
  isChained?: boolean
  chainedTaskId?: string
  tags?: string[]
}

// 获取任务类别标签
const getCategoryLabel = (category: TaskCategory): string => {
  switch (category) {
    case "daily":
      return "每日任务"
    case "weekly":
      return "每周任务"
    case "achievement":
      return "成就任务"
    case "social":
      return "社交任务"
    case "creative":
      return "创意任务"
    case "challenge":
      return "挑战任务"
    default:
      return "任务"
  }
}

// 获取任务难度标签
const getDifficultyLabel = (difficulty: TaskDifficulty): string => {
  switch (difficulty) {
    case "easy":
      return "简单"
    case "medium":
      return "中等"
    case "hard":
      return "困难"
    case "expert":
      return "专家"
    default:
      return "未知"
  }
}

// 获取任务难度颜色
const getDifficultyColor = (difficulty: TaskDifficulty): string => {
  switch (difficulty) {
    case "easy":
      return "bg-green-500/20 text-green-300"
    case "medium":
      return "bg-blue-500/20 text-blue-300"
    case "hard":
      return "bg-amber-500/20 text-amber-300"
    case "expert":
      return "bg-purple-500/20 text-purple-300"
    default:
      return "bg-gray-500/20 text-gray-300"
  }
}

// 获取任务类别图标
const getCategoryIcon = (category: TaskCategory) => {
  switch (category) {
    case "daily":
      return <Calendar className="h-5 w-5" />
    case "weekly":
      return <Calendar className="h-5 w-5" />
    case "achievement":
      return <Trophy className="h-5 w-5" />
    case "social":
      return <Users className="h-5 w-5" />
    case "creative":
      return <Palette className="h-5 w-5" />
    case "challenge":
      return <Target className="h-5 w-5" />
    default:
      return <Calendar className="h-5 w-5" />
  }
}

// 模拟任务数据
const mockTasks: Task[] = [
  // 每日任务
  {
    id: "daily-1",
    title: "创作一个八卦剧本结构",
    description: "使用八卦剧本生成器创建一个完整的剧本结构",
    category: "daily",
    status: "in-progress",
    difficulty: "easy",
    progress: 0,
    maxProgress: 1,
    rewards: [{ type: "starValue", value: 100, icon: <Star className="h-4 w-4" />, color: "text-amber-400" }],
    expiresAt: "今日24:00",
    completionCriteria: "使用八卦剧本生成器生成一个完整的剧本结构并保存",
  },
  {
    id: "daily-2",
    title: "使用AI助手生成场景描写",
    description: "使用AI辅助创作功能生成至少一段场景描写",
    category: "daily",
    status: "completed",
    difficulty: "easy",
    progress: 1,
    maxProgress: 1,
    rewards: [{ type: "starValue", value: 80, icon: <Star className="h-4 w-4" />, color: "text-amber-400" }],
    expiresAt: "今日24:00",
    completionCriteria: "使用AI辅助创作功能生成至少一段场景描写并保存",
  },
  {
    id: "daily-3",
    title: "转换5句古风台词",
    description: "使用古风台词转换功能转换至少5句台词",
    category: "daily",
    status: "in-progress",
    difficulty: "easy",
    progress: 3,
    maxProgress: 5,
    rewards: [{ type: "starValue", value: 120, icon: <Star className="h-4 w-4" />, color: "text-amber-400" }],
    expiresAt: "今日24:00",
    completionCriteria: "使用古风台词转换功能转换5句台词并保存",
  },

  // 每周任务
  {
    id: "weekly-1",
    title: "完成一部短剧剧本",
    description: "创作并保存一部完整的短剧剧本（至少包含9个场景）",
    category: "weekly",
    status: "in-progress",
    difficulty: "medium",
    progress: 6,
    maxProgress: 9,
    rewards: [
      { type: "starValue", value: 500, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "tongbao", value: 5, icon: <Award className="h-4 w-4" />, color: "text-purple-400" },
    ],
    expiresAt: "本周日24:00",
    image: "/placeholder.svg?height=200&width=300",
    completionCriteria: "创建一部包含至少9个场景的完整短剧剧本并保存",
  },
  {
    id: "weekly-2",
    title: "使用3种不同创作风格",
    description: "在创作中尝试使用3种不同的创作风格",
    category: "weekly",
    status: "in-progress",
    difficulty: "medium",
    progress: 2,
    maxProgress: 3,
    rewards: [{ type: "starValue", value: 300, icon: <Star className="h-4 w-4" />, color: "text-amber-400" }],
    expiresAt: "本周日24:00",
    completionCriteria: "在创作中使用3种不同的创作风格并保存",
  },
  {
    id: "weekly-3",
    title: "参与一次剧本评审",
    description: "为其他创作者的剧本提供评审和建议",
    category: "weekly",
    status: "in-progress",
    difficulty: "medium",
    progress: 0,
    maxProgress: 1,
    rewards: [
      { type: "starValue", value: 200, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "feature", value: "专业评审机会", icon: <MessageSquare className="h-4 w-4" />, color: "text-blue-400" },
    ],
    expiresAt: "本周日24:00",
    completionCriteria: "为其他创作者的剧本提供至少一次评审和建议",
  },

  // 成就任务
  {
    id: "achievement-1",
    title: "河洛文化传承者",
    description: "创作10部融合河洛文化元素的短剧",
    category: "achievement",
    status: "in-progress",
    difficulty: "hard",
    progress: 4,
    maxProgress: 10,
    rewards: [
      { type: "starValue", value: 1000, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "tongbao", value: 10, icon: <Award className="h-4 w-4" />, color: "text-purple-400" },
      { type: "badge", value: "河洛文化传承者", icon: <Trophy className="h-4 w-4" />, color: "text-green-400" },
    ],
    image: "/placeholder.svg?height=200&width=300",
    completionCriteria: "创作10部包含河洛文化元素的短剧并发布",
  },
  {
    id: "achievement-2",
    title: "古风台词大师",
    description: "转换并使用100句古风台词",
    category: "achievement",
    status: "in-progress",
    difficulty: "hard",
    progress: 37,
    maxProgress: 100,
    rewards: [
      { type: "starValue", value: 800, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "tongbao", value: 8, icon: <Award className="h-4 w-4" />, color: "text-purple-400" },
      { type: "badge", value: "古风台词大师", icon: <Trophy className="h-4 w-4" />, color: "text-green-400" },
    ],
    completionCriteria: "使用古风台词转换功能转换并在剧本中使用100句台词",
  },
  {
    id: "achievement-3",
    title: "八卦剧作结构专家",
    description: "创作20部使用八卦结构的剧本",
    category: "achievement",
    status: "locked",
    difficulty: "expert",
    progress: 0,
    maxProgress: 20,
    rewards: [
      { type: "starValue", value: 1500, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "tongbao", value: 15, icon: <Award className="h-4 w-4" />, color: "text-purple-400" },
      { type: "template", value: "高级八卦结构", icon: <BookOpen className="h-4 w-4" />, color: "text-blue-400" },
    ],
    requiredLevel: "黄金导演",
    completionCriteria: "创作20部使用八卦结构的剧本并发布",
  },

  // 社交任务
  {
    id: "social-1",
    title: "分享创作成果",
    description: "将您的创作成果分享到社交媒体",
    category: "social",
    status: "in-progress",
    difficulty: "easy",
    progress: 0,
    maxProgress: 1,
    rewards: [
      { type: "starValue", value: 150, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "feature", value: "社交曝光", icon: <Share2 className="h-4 w-4" />, color: "text-blue-400" },
    ],
    expiresAt: "本周日24:00",
    isNew: true,
    completionCriteria: "将您的创作成果分享到至少一个社交媒体平台",
  },
  {
    id: "social-2",
    title: "邀请新用户",
    description: "邀请3位新用户加入平台",
    category: "social",
    status: "in-progress",
    difficulty: "medium",
    progress: 1,
    maxProgress: 3,
    rewards: [
      { type: "starValue", value: 300, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "tongbao", value: 3, icon: <Award className="h-4 w-4" />, color: "text-purple-400" },
    ],
    expiresAt: "无限期",
    completionCriteria: "成功邀请3位新用户注册并完成首次创作",
  },
  {
    id: "social-3",
    title: "参与社区讨论",
    description: "在社区论坛中参与至少5次讨论",
    category: "social",
    status: "in-progress",
    difficulty: "easy",
    progress: 2,
    maxProgress: 5,
    rewards: [
      { type: "starValue", value: 250, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "badge", value: "社区活跃者", icon: <Users className="h-4 w-4" />, color: "text-green-400" },
    ],
    expiresAt: "本月底",
    completionCriteria: "在社区论坛中发表至少5次有意义的评论或回复",
  },

  // 创意任务
  {
    id: "creative-1",
    title: "跨时空创作挑战",
    description: "创作一部融合古代和现代元素的短剧",
    category: "creative",
    status: "in-progress",
    difficulty: "hard",
    progress: 0,
    maxProgress: 1,
    rewards: [
      { type: "starValue", value: 500, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "tongbao", value: 5, icon: <Award className="h-4 w-4" />, color: "text-purple-400" },
      { type: "style", value: "时空交错风格", icon: <Palette className="h-4 w-4" />, color: "text-pink-400" },
    ],
    expiresAt: "本月底",
    isLimited: true,
    image: "/placeholder.svg?height=200&width=300",
    completionCriteria: "创作一部同时包含古代和现代元素的短剧并发布",
  },
  {
    id: "creative-2",
    title: "洛阳地标创作",
    description: "以洛阳的一处地标为背景创作短剧",
    category: "creative",
    status: "in-progress",
    difficulty: "medium",
    progress: 0,
    maxProgress: 1,
    rewards: [
      { type: "starValue", value: 400, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "theme", value: "洛阳地标主题包", icon: <Compass className="h-4 w-4" />, color: "text-orange-400" },
    ],
    expiresAt: "本月底",
    tags: ["洛阳", "地标", "文化"],
    completionCriteria: "创作一部以洛阳实际地标为背景的短剧并发布",
  },
  {
    id: "creative-3",
    title: "诗词改编挑战",
    description: "将一首古诗词改编为现代短剧",
    category: "creative",
    status: "in-progress",
    difficulty: "hard",
    progress: 0,
    maxProgress: 1,
    rewards: [
      { type: "starValue", value: 450, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "badge", value: "诗词改编大师", icon: <BookOpen className="h-4 w-4" />, color: "text-green-400" },
    ],
    expiresAt: "本月底",
    isNew: true,
    completionCriteria: "选择一首古诗词，将其核心意境和情感改编为现代短剧并发布",
  },

  // 挑战任务
  {
    id: "challenge-1",
    title: "24小时创作马拉松",
    description: "在24小时内完成一部完整短剧的创作",
    category: "challenge",
    status: "locked",
    difficulty: "expert",
    progress: 0,
    maxProgress: 1,
    rewards: [
      { type: "starValue", value: 1000, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "tongbao", value: 10, icon: <Award className="h-4 w-4" />, color: "text-purple-400" },
      { type: "badge", value: "创作马拉松冠军", icon: <Flame className="h-4 w-4" />, color: "text-red-400" },
    ],
    requiredLevel: "铂金导演",
    isLimited: true,
    image: "/placeholder.svg?height=200&width=300",
    completionCriteria: "在开始挑战后的24小时内完成一部至少包含10个场景的完整短剧",
  },
  {
    id: "challenge-2",
    title: "限定元素创作",
    description: "使用系统随机指定的3个元素创作短剧",
    category: "challenge",
    status: "in-progress",
    difficulty: "hard",
    progress: 0,
    maxProgress: 1,
    rewards: [
      { type: "starValue", value: 800, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "tongbao", value: 8, icon: <Award className="h-4 w-4" />, color: "text-purple-400" },
    ],
    expiresAt: "3天后",
    isChained: true,
    chainedTaskId: "challenge-3",
    completionCriteria: "使用系统随机指定的3个元素（地点、人物类型、情节）创作一部短剧",
  },
  {
    id: "challenge-3",
    title: "创意接力挑战",
    description: "基于其他创作者的作品创作续集",
    category: "challenge",
    status: "locked",
    difficulty: "hard",
    progress: 0,
    maxProgress: 1,
    rewards: [
      { type: "starValue", value: 700, icon: <Star className="h-4 w-4" />, color: "text-amber-400" },
      { type: "badge", value: "创意接力手", icon: <Repeat className="h-4 w-4" />, color: "text-green-400" },
    ],
    expiresAt: "本月底",
    completionCriteria: "选择平台上的一部短剧，创作其续集并发布",
  },
]

// 任务奖励等级系统
const rewardTiers = [
  {
    name: "青铜",
    icon: <Trophy className="h-5 w-5" />,
    color: "from-amber-400 to-amber-600",
    starValueMultiplier: 1.0,
    tongbaoMultiplier: 1.0,
    description: "基础奖励倍率",
  },
  {
    name: "白银",
    icon: <Award className="h-5 w-5" />,
    color: "from-gray-300 to-gray-500",
    starValueMultiplier: 1.2,
    tongbaoMultiplier: 1.1,
    description: "20%明星值加成，10%通宝加成",
  },
  {
    name: "黄金",
    icon: <Star className="h-5 w-5" />,
    color: "from-yellow-400 to-yellow-600",
    starValueMultiplier: 1.5,
    tongbaoMultiplier: 1.2,
    description: "50%明星值加成，20%通宝加成",
  },
  {
    name: "铂金",
    icon: <Gem className="h-5 w-5" />,
    color: "from-blue-300 to-blue-500",
    starValueMultiplier: 1.8,
    tongbaoMultiplier: 1.5,
    description: "80%明星值加成，50%通宝加成",
  },
  {
    name: "钻石",
    icon: <Gem className="h-5 w-5" />,
    color: "from-cyan-300 to-cyan-500",
    starValueMultiplier: 2.0,
    tongbaoMultiplier: 1.8,
    description: "100%明星值加成，80%通宝加成",
  },
  {
    name: "王者",
    icon: <Crown className="h-5 w-5" />,
    color: "from-purple-400 to-purple-600",
    starValueMultiplier: 2.5,
    tongbaoMultiplier: 2.0,
    description: "150%明星值加成，100%通宝加成",
  },
]

export default function EnhancedTaskSystem() {
  const [activeCategory, setActiveCategory] = useState<TaskCategory>("daily")
  const [claimingReward, setClaimingReward] = useState<string | null>(null)
  const [userRewardTier, setUserRewardTier] = useState(3) // 默认铂金等级
  const [showRewardTiers, setShowRewardTiers] = useState(false)
  const [taskFilter, setTaskFilter] = useState<"all" | "in-progress" | "completed" | "locked">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showTaskDetail, setShowTaskDetail] = useState<string | null>(null)

  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 过滤任务
  const filteredTasks = mockTasks.filter((task) => {
    // 类别过滤
    if (task.category !== activeCategory) return false

    // 状态过滤
    if (taskFilter !== "all" && task.status !== taskFilter) return false

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        (task.tags && task.tags.some((tag) => tag.toLowerCase().includes(query)))
      )
    }

    return true
  })

  // 计算总进度
  const calculateTotalProgress = (tasks: Task[], category: TaskCategory) => {
    const categoryTasks = tasks.filter((task) => task.category === category)
    const completed = categoryTasks.filter((task) => task.status === "completed").length
    return {
      completed,
      total: categoryTasks.length,
      percentage: Math.round((completed / (categoryTasks.length || 1)) * 100),
    }
  }

  const dailyProgress = calculateTotalProgress(mockTasks, "daily")
  const weeklyProgress = calculateTotalProgress(mockTasks, "weekly")
  const achievementProgress = calculateTotalProgress(mockTasks, "achievement")
  const socialProgress = calculateTotalProgress(mockTasks, "social")
  const creativeProgress = calculateTotalProgress(mockTasks, "creative")
  const challengeProgress = calculateTotalProgress(mockTasks, "challenge")

  // 领取奖励
  const claimReward = (taskId: string) => {
    setClaimingReward(taskId)

    // 模拟API请求延迟
    setTimeout(() => {
      const task = mockTasks.find((t) => t.id === taskId)

      if (task) {
        // 应用奖励倍率
        const tier = rewardTiers[userRewardTier]
        const starValueReward = task.rewards.find((r) => r.type === "starValue")
        const tongbaoReward = task.rewards.find((r) => r.type === "tongbao")

        let message = "您已成功领取任务奖励"

        if (starValueReward) {
          const boostedValue = Math.round(Number(starValueReward.value) * tier.starValueMultiplier)
          message += `\n获得 ${boostedValue} 明星值`
        }

        if (tongbaoReward) {
          const boostedValue = Math.round(Number(tongbaoReward.value) * tier.tongbaoMultiplier)
          message += `\n获得 ${boostedValue} 通宝`
        }

        const otherRewards = task.rewards.filter((r) => r.type !== "starValue" && r.type !== "tongbao")
        if (otherRewards.length > 0) {
          otherRewards.forEach((reward) => {
            message += `\n获得 ${reward.value}`
          })
        }

        toast({
          title: "奖励领取成功",
          description: message,
        })
      } else {
        toast({
          title: "奖励领取失败",
          description: "未找到对应任务",
          variant: "destructive",
        })
      }

      setClaimingReward(null)
    }, 1500)
  }

  // 开始任务
  const startTask = (taskId: string) => {
    toast({
      title: "任务已开始",
      description: "您可以在个人中心查看任务进度",
    })
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
            <Trophy className="h-6 w-6 text-amber-400 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">增强版任务系统</h2>
          </div>
          <p className="text-white/70 max-w-3xl">
            完成各类任务获得丰富奖励，提升创作等级，解锁更多高级功能。任务类型包括日常任务、每周任务、成就任务、社交任务、创意任务和挑战任务。
          </p>
        </motion.div>

        <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 text-center">
          <Lock className="h-12 w-12 text-amber-500/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">登录后解锁增强版任务系统</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            登录后可参与各类任务，完成任务获得明星值、通宝和特殊奖励，提升创作等级。
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
          <Trophy className="h-6 w-6 text-amber-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">增强版任务系统</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          完成各类任务获得丰富奖励，提升创作等级，解锁更多高级功能。任务类型包括日常任务、每周任务、成就任务、社交任务、创意任务和挑战任务。
        </p>
      </motion.div>

      {/* 奖励等级系统 */}
      <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Coins className="h-6 w-6 text-amber-400 mr-2" />
            <h3 className="text-xl font-bold text-white">奖励等级系统</h3>
          </div>
          <Button
            variant="outline"
            className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
            onClick={() => setShowRewardTiers(!showRewardTiers)}
          >
            {showRewardTiers ? "隐藏详情" : "查看详情"}
          </Button>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 mr-4">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${rewardTiers[userRewardTier].color} flex items-center justify-center`}
            >
              {rewardTiers[userRewardTier].icon}
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-medium">当前奖励等级: {rewardTiers[userRewardTier].name}</div>
              <div className="text-amber-300">{rewardTiers[userRewardTier].description}</div>
            </div>
            <Progress value={75} className="h-2 mb-1" />
            <div className="flex justify-between text-xs text-white/60">
              <span>距离下一级: 25%</span>
              <span>
                下一级: {userRewardTier < rewardTiers.length - 1 ? rewardTiers[userRewardTier + 1].name : "已达最高级"}
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showRewardTiers && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
                {rewardTiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`bg-black/60 border ${index === userRewardTier ? "border-amber-500" : "border-amber-500/10"} rounded-lg p-4 text-center`}
                  >
                    <div
                      className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center mb-2`}
                    >
                      {tier.icon}
                    </div>
                    <div className="text-white font-medium mb-1">{tier.name}</div>
                    <div className="text-xs text-white/70 mb-2">{tier.description}</div>
                    {index === userRewardTier && <Badge className="bg-amber-600 hover:bg-amber-700">当前等级</Badge>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 任务进度概览 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <motion.div
          className={`bg-black/60 border ${activeCategory === "daily" ? "border-amber-500" : "border-amber-500/10"} rounded-lg p-4 cursor-pointer`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          onClick={() => setActiveCategory("daily")}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-amber-400 mr-2" />
              <h3 className="text-lg font-medium text-white">每日任务</h3>
            </div>
            <span className="text-white/70 text-sm">
              {dailyProgress.completed}/{dailyProgress.total}
            </span>
          </div>
          <Progress value={dailyProgress.percentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70">进度</span>
            <span className="text-amber-300">{dailyProgress.percentage}%</span>
          </div>
        </motion.div>

        <motion.div
          className={`bg-black/60 border ${activeCategory === "weekly" ? "border-amber-500" : "border-amber-500/10"} rounded-lg p-4 cursor-pointer`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => setActiveCategory("weekly")}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-amber-400 mr-2" />
              <h3 className="text-lg font-medium text-white">每周任务</h3>
            </div>
            <span className="text-white/70 text-sm">
              {weeklyProgress.completed}/{weeklyProgress.total}
            </span>
          </div>
          <Progress value={weeklyProgress.percentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70">进度</span>
            <span className="text-amber-300">{weeklyProgress.percentage}%</span>
          </div>
        </motion.div>

        <motion.div
          className={`bg-black/60 border ${activeCategory === "achievement" ? "border-amber-500" : "border-amber-500/10"} rounded-lg p-4 cursor-pointer`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => setActiveCategory("achievement")}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-amber-400 mr-2" />
              <h3 className="text-lg font-medium text-white">成就任务</h3>
            </div>
            <span className="text-white/70 text-sm">
              {achievementProgress.completed}/{achievementProgress.total}
            </span>
          </div>
          <Progress value={achievementProgress.percentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70">进度</span>
            <span className="text-amber-300">{achievementProgress.percentage}%</span>
          </div>
        </motion.div>

        <motion.div
          className={`bg-black/60 border ${activeCategory === "social" ? "border-amber-500" : "border-amber-500/10"} rounded-lg p-4 cursor-pointer`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => setActiveCategory("social")}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-amber-400 mr-2" />
              <h3 className="text-lg font-medium text-white">社交任务</h3>
            </div>
            <span className="text-white/70 text-sm">
              {socialProgress.completed}/{socialProgress.total}
            </span>
          </div>
          <Progress value={socialProgress.percentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70">进度</span>
            <span className="text-amber-300">{socialProgress.percentage}%</span>
          </div>
        </motion.div>

        <motion.div
          className={`bg-black/60 border ${activeCategory === "creative" ? "border-amber-500" : "border-amber-500/10"} rounded-lg p-4 cursor-pointer`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={() => setActiveCategory("creative")}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Palette className="h-5 w-5 text-amber-400 mr-2" />
              <h3 className="text-lg font-medium text-white">创意任务</h3>
            </div>
            <span className="text-white/70 text-sm">
              {creativeProgress.completed}/{creativeProgress.total}
            </span>
          </div>
          <Progress value={creativeProgress.percentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70">进度</span>
            <span className="text-amber-300">{creativeProgress.percentage}%</span>
          </div>
        </motion.div>

        <motion.div
          className={`bg-black/60 border ${activeCategory === "challenge" ? "border-amber-500" : "border-amber-500/10"} rounded-lg p-4 cursor-pointer`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={() => setActiveCategory("challenge")}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Target className="h-5 w-5 text-amber-400 mr-2" />
              <h3 className="text-lg font-medium text-white">挑战任务</h3>
            </div>
            <span className="text-white/70 text-sm">
              {challengeProgress.completed}/{challengeProgress.total}
            </span>
          </div>
          <Progress value={challengeProgress.percentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70">进度</span>
            <span className="text-amber-300">{challengeProgress.percentage}%</span>
          </div>
        </motion.div>
      </div>

      {/* 任务列表 */}
      <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mr-3">
              {getCategoryIcon(activeCategory)}
            </div>
            <h3 className="text-xl font-bold text-white">{getCategoryLabel(activeCategory)}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              className={`cursor-pointer ${taskFilter === "all" ? "bg-amber-600 hover:bg-amber-700" : "bg-black/60 hover:bg-black/80"}`}
              onClick={() => setTaskFilter("all")}
            >
              全部
            </Badge>
            <Badge
              className={`cursor-pointer ${taskFilter === "in-progress" ? "bg-blue-600 hover:bg-blue-700" : "bg-black/60 hover:bg-black/80"}`}
              onClick={() => setTaskFilter("in-progress")}
            >
              进行中
            </Badge>
            <Badge
              className={`cursor-pointer ${taskFilter === "completed" ? "bg-green-600 hover:bg-green-700" : "bg-black/60 hover:bg-black/80"}`}
              onClick={() => setTaskFilter("completed")}
            >
              已完成
            </Badge>
            <Badge
              className={`cursor-pointer ${taskFilter === "locked" ? "bg-gray-600 hover:bg-gray-700" : "bg-black/60 hover:bg-black/80"}`}
              onClick={() => setTaskFilter("locked")}
            >
              未解锁
            </Badge>
          </div>
        </div>

        {filteredTasks.length > 0 ? (
          <div className="space-y-6">
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                className={`bg-black/60 border ${
                  task.status === "completed"
                    ? "border-green-500/20"
                    : task.status === "locked"
                      ? "border-gray-500/20 opacity-70"
                      : "border-amber-500/10"
                } rounded-lg overflow-hidden`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setShowTaskDetail(showTaskDetail === task.id ? null : task.id)}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {task.image && (
                    <div className="relative h-full min-h-[120px]">
                      <Image src={task.image || "/placeholder.svg"} alt={task.title} fill className="object-cover" />
                      {task.status === "completed" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <CheckCircle2 className="h-12 w-12 text-green-500" />
                        </div>
                      )}
                      {task.status === "locked" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Lock className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`p-4 ${task.image ? "md:col-span-3" : "md:col-span-4"}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                      <div>
                        <div className="flex items-center flex-wrap gap-2">
                          <h4 className="text-lg font-medium text-white mr-2">{task.title}</h4>

                          <Badge className={getDifficultyColor(task.difficulty)}>
                            {getDifficultyLabel(task.difficulty)}
                          </Badge>

                          {task.status === "completed" && (
                            <Badge className="bg-green-900/50 text-green-300 flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              已完成
                            </Badge>
                          )}

                          {task.status === "locked" && (
                            <Badge className="bg-gray-900/50 text-gray-300 flex items-center">
                              <Lock className="h-3 w-3 mr-1" />
                              未解锁
                            </Badge>
                          )}

                          {task.isNew && <Badge className="bg-blue-900/50 text-blue-300">新任务</Badge>}

                          {task.isLimited && <Badge className="bg-red-900/50 text-red-300">限时任务</Badge>}

                          {task.isChained && <Badge className="bg-purple-900/50 text-purple-300">链式任务</Badge>}
                        </div>

                        {task.requiredLevel && task.status === "locked" && (
                          <div className="text-gray-400 text-sm mt-1">需要等级: {task.requiredLevel}</div>
                        )}
                      </div>

                      {task.expiresAt && task.status !== "locked" && (
                        <div className="flex items-center text-white/60 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>截止时间: {task.expiresAt}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-white/80 text-sm mb-4">{task.description}</p>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span className="text-white/70">进度</span>
                          <span className="text-white">
                            {task.progress}/{task.maxProgress}
                          </span>
                        </div>
                        <Progress
                          value={(task.progress / task.maxProgress) * 100}
                          className={`h-2 ${task.status === "locked" ? "bg-gray-900/50" : ""}`}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 items-center">
                        {task.rewards.map((reward, index) => (
                          <div
                            key={index}
                            className={`flex items-center px-3 py-1 rounded-full ${
                              reward.type === "starValue"
                                ? "bg-amber-900/20"
                                : reward.type === "tongbao"
                                  ? "bg-purple-900/20"
                                  : reward.type === "badge"
                                    ? "bg-green-900/20"
                                    : reward.type === "template"
                                      ? "bg-blue-900/20"
                                      : reward.type === "theme"
                                        ? "bg-orange-900/20"
                                        : reward.type === "style"
                                          ? "bg-pink-900/20"
                                          : reward.type === "level"
                                            ? "bg-cyan-900/20"
                                            : "bg-blue-900/20"
                            }`}
                          >
                            <span className={`mr-1 ${reward.color}`}>{reward.icon}</span>
                            <span className={`text-sm ${reward.color}`}>
                              {typeof reward.value === "number" ? reward.value : reward.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {task.status === "completed" ? (
                        <Button
                          variant="outline"
                          className="border-green-500/30 text-green-300 hover:bg-green-500/10"
                          disabled={claimingReward === task.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            claimReward(task.id)
                          }}
                        >
                          {claimingReward === task.id ? (
                            <>
                              <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                              领取中...
                            </>
                          ) : (
                            <>
                              <Gift className="h-4 w-4 mr-2" />
                              领取奖励
                            </>
                          )}
                        </Button>
                      ) : task.status === "in-progress" ? (
                        <Button
                          className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                          onClick={(e) => {
                            e.stopPropagation()
                            startTask(task.id)
                          }}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          继续任务
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="border-gray-500/30 text-gray-300 hover:bg-gray-500/10"
                          disabled
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          未解锁
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 任务详情 */}
                <AnimatePresence>
                  {showTaskDetail === task.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t border-amber-500/10 bg-black/40">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-white font-medium mb-2 flex items-center">
                              <Target className="h-4 w-4 text-amber-400 mr-2" />
                              完成条件
                            </h5>
                            <p className="text-white/80 text-sm mb-4">{task.completionCriteria}</p>

                            {task.tags && task.tags.length > 0 && (
                              <div>
                                <h5 className="text-white font-medium mb-2 flex items-center">
                                  <Tag className="h-4 w-4 text-amber-400 mr-2" />
                                  相关标签
                                </h5>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {task.tags.map((tag, index) => (
                                    <Badge key={index} className="bg-black/60">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <h5 className="text-white font-medium mb-2 flex items-center">
                              <Gift className="h-4 w-4 text-amber-400 mr-2" />
                              奖励详情
                            </h5>
                            <div className="space-y-2 mb-4">
                              {task.rewards.map((reward, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <span className={`mr-2 ${reward.color}`}>{reward.icon}</span>
                                    <span className="text-white/80">
                                      {reward.type === "starValue"
                                        ? "明星值"
                                        : reward.type === "tongbao"
                                          ? "通宝"
                                          : reward.type === "badge"
                                            ? "徽章"
                                            : reward.type === "template"
                                              ? "剧本模板"
                                              : reward.type === "theme"
                                                ? "主题"
                                                : reward.type === "style"
                                                  ? "风格"
                                                  : reward.type === "level"
                                                    ? "等级提升"
                                                    : "特殊功能"}
                                    </span>
                                  </div>
                                  <span className={`font-medium ${reward.color}`}>
                                    {typeof reward.value === "number" ? reward.value : reward.value}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {task.isChained && task.chainedTaskId && (
                              <div>
                                <h5 className="text-white font-medium mb-2 flex items-center">
                                  <Repeat className="h-4 w-4 text-amber-400 mr-2" />
                                  链式任务
                                </h5>
                                <p className="text-white/80 text-sm">完成此任务后将解锁下一个链式任务</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {task.status === "in-progress" && (
                          <div className="mt-4 pt-4 border-t border-amber-500/10">
                            <div className="flex items-center mb-2">
                              <Lightbulb className="h-5 w-5 text-amber-400 mr-2" />
                              <h5 className="text-white font-medium">任务提示</h5>
                            </div>
                            <p className="text-white/80 text-sm">
                              {task.category === "daily" && "每日任务会在每天0点刷新，请在截止时间前完成。"}
                              {task.category === "weekly" && "每周任务会在每周一0点刷新，完成可获得丰厚奖励。"}
                              {task.category === "achievement" && "成就任务没有时间限制，可以慢慢完成，奖励非常丰厚。"}
                              {task.category === "social" && "社交任务需要与其他用户互动，是提升社区活跃度的好方式。"}
                              {task.category === "creative" &&
                                "创意任务考验您的创作能力，完成后可以获得独特的创作资源。"}
                              {task.category === "challenge" &&
                                "挑战任务难度较高，但奖励也最为丰厚，建议有一定经验后再尝试。"}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-black/60 border border-amber-500/10 rounded-lg p-8 text-center">
            <Target className="h-12 w-12 text-amber-500/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">暂无符合条件的任务</h3>
            <p className="text-white/70">尝试切换任务类别或清除筛选条件</p>
          </div>
        )}
      </div>
    </section>
  )
}
