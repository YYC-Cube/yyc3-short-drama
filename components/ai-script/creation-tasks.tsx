"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Star, Trophy, Calendar, CheckCircle2, Clock, Sparkles, Award, Zap, Lock, Gift } from "lucide-react"

// 任务类型
type TaskType = "daily" | "weekly" | "achievement"

// 任务状态
type TaskStatus = "completed" | "in-progress" | "locked"

// 任务接口
interface Task {
  id: string
  title: string
  description: string
  type: TaskType
  reward: {
    starValue: number
    tongbao?: number
    other?: string
  }
  progress: number
  maxProgress: number
  status: TaskStatus
  expiresAt?: string
  image?: string
  requiredLevel?: string
}

// 模拟任务数据
const mockTasks: Record<TaskType, Task[]> = {
  daily: [
    {
      id: "daily-1",
      title: "创作一个八卦剧本结构",
      description: "使用八卦剧本生成器创建一个完整的剧本结构",
      type: "daily",
      reward: {
        starValue: 100,
      },
      progress: 0,
      maxProgress: 1,
      status: "in-progress",
      expiresAt: "今日24:00",
    },
    {
      id: "daily-2",
      title: "使用AI助手生成场景描写",
      description: "使用AI辅助创作功能生成至少一段场景描写",
      type: "daily",
      reward: {
        starValue: 80,
      },
      progress: 1,
      maxProgress: 1,
      status: "completed",
      expiresAt: "今日24:00",
    },
    {
      id: "daily-3",
      title: "转换5句古风台词",
      description: "使用古风台词转换功能转换至少5句台词",
      type: "daily",
      reward: {
        starValue: 120,
      },
      progress: 3,
      maxProgress: 5,
      status: "in-progress",
      expiresAt: "今日24:00",
    },
  ],
  weekly: [
    {
      id: "weekly-1",
      title: "完成一部短剧剧本",
      description: "创作并保存一部完整的短剧剧本（至少包含9个场景）",
      type: "weekly",
      reward: {
        starValue: 500,
        tongbao: 5,
      },
      progress: 6,
      maxProgress: 9,
      status: "in-progress",
      expiresAt: "本周日24:00",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "weekly-2",
      title: "使用3种不同创作风格",
      description: "在创作中尝试使用3种不同的创作风格",
      type: "weekly",
      reward: {
        starValue: 300,
      },
      progress: 2,
      maxProgress: 3,
      status: "in-progress",
      expiresAt: "本周日24:00",
    },
    {
      id: "weekly-3",
      title: "参与一次剧本评审",
      description: "为其他创作者的剧本提供评审和建议",
      type: "weekly",
      reward: {
        starValue: 200,
        other: "获得一次专业评审机会",
      },
      progress: 0,
      maxProgress: 1,
      status: "in-progress",
      expiresAt: "本周日24:00",
    },
  ],
  achievement: [
    {
      id: "achievement-1",
      title: "河洛文化传承者",
      description: "创作10部融合河洛文化元素的短剧",
      type: "achievement",
      reward: {
        starValue: 1000,
        tongbao: 10,
        other: "专属徽章：河洛文化传承者",
      },
      progress: 4,
      maxProgress: 10,
      status: "in-progress",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "achievement-2",
      title: "古风台词大师",
      description: "转换并使用100句古风台词",
      type: "achievement",
      reward: {
        starValue: 800,
        tongbao: 8,
        other: "专属徽章：古风台词大师",
      },
      progress: 37,
      maxProgress: 100,
      status: "in-progress",
    },
    {
      id: "achievement-3",
      title: "八卦剧作结构专家",
      description: "创作20部使用八卦结构的剧本",
      type: "achievement",
      reward: {
        starValue: 1500,
        tongbao: 15,
        other: "专属模板：高级八卦结构",
      },
      progress: 0,
      maxProgress: 20,
      status: "locked",
      requiredLevel: "黄金导演",
    },
  ],
}

export default function CreationTasks() {
  const [activeTab, setActiveTab] = useState<TaskType>("daily")
  const [claimingReward, setClaimingReward] = useState<string | null>(null)

  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 领取奖励
  const claimReward = (taskId: string) => {
    setClaimingReward(taskId)

    // 模拟API请求延迟
    setTimeout(() => {
      toast({
        title: "奖励领取成功",
        description: "您已成功领取任务奖励",
      })
      setClaimingReward(null)

      // 实际项目中这里会更新任务状态和用户星值
    }, 1500)
  }

  // 计算总进度
  const calculateTotalProgress = (tasks: Task[]) => {
    const completed = tasks.filter((task) => task.status === "completed").length
    return {
      completed,
      total: tasks.length,
      percentage: Math.round((completed / tasks.length) * 100),
    }
  }

  const dailyProgress = calculateTotalProgress(mockTasks.daily)
  const weeklyProgress = calculateTotalProgress(mockTasks.weekly)
  const achievementProgress = calculateTotalProgress(mockTasks.achievement)

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
            <h2 className="text-2xl md:text-3xl font-bold text-white">创作任务与奖励</h2>
          </div>
          <p className="text-white/70 max-w-3xl">完成创作任务获得明星值和通宝奖励，提升创作等级，解锁更多高级功能。</p>
        </motion.div>

        <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 text-center">
          <Lock className="h-12 w-12 text-amber-500/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">登录后解锁创作任务</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            登录后可参与创作任务，完成任务获得明星值和通宝奖励，提升创作等级。
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
          <h2 className="text-2xl md:text-3xl font-bold text-white">创作任务与奖励</h2>
        </div>
        <p className="text-white/70 max-w-3xl">完成创作任务获得明星值和通宝奖励，提升创作等级，解锁更多高级功能。</p>
      </motion.div>

      <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-black/60 border border-amber-500/10 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-amber-400 mr-2" />
                <h3 className="text-lg font-medium text-white">每日任务</h3>
              </div>
              <span className="text-white/70 text-sm">
                {dailyProgress.completed}/{dailyProgress.total} 完成
              </span>
            </div>
            <Progress value={dailyProgress.percentage} className="h-2 mb-2" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">今日进度</span>
              <span className="text-amber-300">{dailyProgress.percentage}%</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-black/60 border border-amber-500/10 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-amber-400 mr-2" />
                <h3 className="text-lg font-medium text-white">每周任务</h3>
              </div>
              <span className="text-white/70 text-sm">
                {weeklyProgress.completed}/{weeklyProgress.total} 完成
              </span>
            </div>
            <Progress value={weeklyProgress.percentage} className="h-2 mb-2" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">本周进度</span>
              <span className="text-amber-300">{weeklyProgress.percentage}%</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-black/60 border border-amber-500/10 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-amber-400 mr-2" />
                <h3 className="text-lg font-medium text-white">成就任务</h3>
              </div>
              <span className="text-white/70 text-sm">
                {achievementProgress.completed}/{achievementProgress.total} 完成
              </span>
            </div>
            <Progress value={achievementProgress.percentage} className="h-2 mb-2" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">总体进度</span>
              <span className="text-amber-300">{achievementProgress.percentage}%</span>
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="daily" value={activeTab} onValueChange={(value) => setActiveTab(value as TaskType)}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="daily" className="data-[state=active]:bg-amber-600">
              <Calendar className="h-4 w-4 mr-2" />
              每日任务
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-amber-600">
              <Calendar className="h-4 w-4 mr-2" />
              每周任务
            </TabsTrigger>
            <TabsTrigger value="achievement" className="data-[state=active]:bg-amber-600">
              <Trophy className="h-4 w-4 mr-2" />
              成就任务
            </TabsTrigger>
          </TabsList>

          {Object.entries(mockTasks).map(([type, tasks]) => (
            <TabsContent key={type} value={type} className="mt-0">
              <div className="space-y-6">
                {tasks.map((task) => (
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
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {task.image && (
                        <div className="relative h-full min-h-[120px]">
                          <Image
                            src={task.image || "/placeholder.svg"}
                            alt={task.title}
                            fill
                            className="object-cover"
                          />
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
                            <div className="flex items-center">
                              <h4 className="text-lg font-medium text-white mr-2">{task.title}</h4>
                              {task.status === "completed" && (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-900/50 text-green-300 flex items-center">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  已完成
                                </span>
                              )}
                              {task.status === "locked" && (
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-900/50 text-gray-300 flex items-center">
                                  <Lock className="h-3 w-3 mr-1" />
                                  未解锁
                                </span>
                              )}
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
                            <div className="flex items-center bg-amber-900/20 px-3 py-1 rounded-full">
                              <Star className="h-4 w-4 text-amber-400 mr-1" />
                              <span className="text-amber-300 text-sm">{task.reward.starValue}</span>
                            </div>

                            {task.reward.tongbao && (
                              <div className="flex items-center bg-purple-900/20 px-3 py-1 rounded-full">
                                <Award className="h-4 w-4 text-purple-400 mr-1" />
                                <span className="text-purple-300 text-sm">{task.reward.tongbao}</span>
                              </div>
                            )}

                            {task.reward.other && (
                              <div className="flex items-center bg-blue-900/20 px-3 py-1 rounded-full">
                                <Gift className="h-4 w-4 text-blue-400 mr-1" />
                                <span className="text-blue-300 text-sm truncate max-w-[150px]">
                                  {task.reward.other}
                                </span>
                              </div>
                            )}
                          </div>

                          {task.status === "completed" ? (
                            <Button
                              variant="outline"
                              className="border-green-500/30 text-green-300 hover:bg-green-500/10"
                              disabled={claimingReward === task.id}
                              onClick={() => claimReward(task.id)}
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
                            <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
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
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
