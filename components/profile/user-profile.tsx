"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Film,
  Star,
  Award,
  Shield,
  MapPin,
  BadgeCheck,
  Edit,
  Clock,
  Heart,
  Eye,
  MessageSquare,
  Share2,
} from "lucide-react"

// 模拟用户数据
const userData = {
  id: 1,
  name: "东方朔",
  avatar: "/placeholder.svg?height=200&width=200",
  level: "铂金导演",
  isLocalUser: true,
  isVerifiedCreator: true,
  joinDate: "2023年10月",
  starValue: 15000,
  tongbao: 50,
  works: 12,
  followers: 256,
  following: 48,
  bio: "热爱河洛文化，专注于历史短剧创作，希望通过作品让更多人了解洛阳的历史文化魅力。",
}

// 模拟作品数据
const userWorks = [
  {
    id: 1,
    title: "《洛神赋》现代演绎",
    cover: "/placeholder.svg?height=400&width=600",
    views: 1256,
    likes: 328,
    comments: 42,
    date: "2024-03-15",
    category: "古风爱情",
  },
  {
    id: 2,
    title: "《白马寺传奇》",
    cover: "/placeholder.svg?height=400&width=600",
    views: 876,
    likes: 215,
    comments: 36,
    date: "2024-02-28",
    category: "历史探秘",
  },
  {
    id: 3,
    title: "《龙门石窟之谜》",
    cover: "/placeholder.svg?height=400&width=600",
    views: 1542,
    likes: 463,
    comments: 87,
    date: "2024-01-10",
    category: "悬疑探险",
  },
]

// 模拟徽章数据
const userBadges = [
  {
    id: 1,
    name: "洛阳本地用户",
    icon: <MapPin className="h-5 w-5" />,
    description: "已验证的洛阳本地手机号用户",
    color: "from-amber-400 to-amber-600",
  },
  {
    id: 2,
    name: "认证创作者",
    icon: <BadgeCheck className="h-5 w-5" />,
    description: "通过平台认证的专业创作者",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    name: "历史文化传承者",
    icon: <Award className="h-5 w-5" />,
    description: "在历史文化传承领域做出贡献",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    name: "司马光奖获得者",
    icon: <Star className="h-5 w-5" />,
    description: "作品获得司马光奖年度提名",
    color: "from-green-400 to-green-600",
  },
]

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：用户信息卡片 */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 border-2 border-blue-500/50 mb-4">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-blue-900/50 text-blue-300 text-2xl">
                  {userData.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <h2 className="text-2xl font-bold text-white mb-1">{userData.name}</h2>

              <div className="flex items-center space-x-2 mb-3">
                <span className="px-2 py-1 rounded-full bg-blue-900/50 text-blue-300 text-xs">{userData.level}</span>

                {userData.isLocalUser && (
                  <span className="px-2 py-1 rounded-full bg-amber-900/50 text-amber-300 text-xs flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    洛阳本地
                  </span>
                )}

                {userData.isVerifiedCreator && (
                  <span className="px-2 py-1 rounded-full bg-green-900/50 text-green-300 text-xs flex items-center">
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    认证创作者
                  </span>
                )}
              </div>

              <p className="text-white/70 text-center text-sm mb-4">{userData.bio}</p>

              <div className="flex items-center text-white/60 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>加入时间: {userData.joinDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-white font-medium">{userData.works}</div>
                <div className="text-white/60 text-xs">作品</div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium">{userData.followers}</div>
                <div className="text-white/60 text-xs">粉丝</div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium">{userData.following}</div>
                <div className="text-white/60 text-xs">关注</div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-black/60 border border-blue-500/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber-400 mr-2" />
                    <span className="text-white font-medium">明星值</span>
                  </div>
                  <span className="text-amber-300 text-xl font-bold">{userData.starValue.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-black/60 border border-blue-500/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-purple-400 mr-2" />
                    <span className="text-white font-medium">开元通宝</span>
                  </div>
                  <span className="text-purple-300 text-xl font-bold">{userData.tongbao}</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              <Edit className="h-4 w-4 mr-2" />
              编辑个人资料
            </Button>
          </div>
        </motion.div>

        {/* 右侧：选项卡内容 */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6">
            <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
                  <User className="h-4 w-4 mr-2" />
                  个人资料
                </TabsTrigger>
                <TabsTrigger value="works" className="data-[state=active]:bg-blue-600">
                  <Film className="h-4 w-4 mr-2" />
                  我的作品
                </TabsTrigger>
                <TabsTrigger value="badges" className="data-[state=active]:bg-blue-600">
                  <Shield className="h-4 w-4 mr-2" />
                  徽章与权益
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">个人简介</h3>
                    <div className="bg-black/60 border border-blue-500/10 rounded-lg p-4">
                      <p className="text-white/80">{userData.bio}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">账号信息</h3>
                    <div className="bg-black/60 border border-blue-500/10 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">用户ID</span>
                        <span className="text-white">{userData.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">导演等级</span>
                        <span className="text-blue-300">{userData.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">注册时间</span>
                        <span className="text-white">{userData.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">认证状态</span>
                        <div className="flex items-center">
                          <BadgeCheck className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-green-300">已认证</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">本地用户</span>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-amber-400 mr-1" />
                          <span className="text-amber-300">洛阳本地</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">关联应用</h3>
                    <div className="bg-black/60 border border-blue-500/10 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 relative">
                            <Image
                              src="/placeholder.svg?height=80&width=80"
                              alt="洛阳文旅"
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <div className="text-white">洛阳文旅</div>
                            <div className="text-green-300 text-xs">已关联</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 relative">
                            <Image
                              src="/placeholder.svg?height=80&width=80"
                              alt="河洛文创"
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <div className="text-white">河洛文创</div>
                            <div className="text-green-300 text-xs">已关联</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 relative">
                            <Image
                              src="/placeholder.svg?height=80&width=80"
                              alt="牡丹云集"
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <div className="text-white">牡丹云集</div>
                            <div className="text-white/60 text-xs">未关联</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="works" className="mt-0">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">我的作品</h3>
                  <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                    <Film className="h-4 w-4 mr-2" />
                    创建新作品
                  </Button>
                </div>

                <div className="space-y-6">
                  {userWorks.map((work) => (
                    <motion.div
                      key={work.id}
                      className="bg-black/60 border border-blue-500/10 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative h-48 md:h-auto">
                          <Image
                            src={work.cover || "/placeholder.svg"}
                            alt={work.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-900/70 text-blue-300">
                              {work.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 md:col-span-2">
                          <h4 className="text-lg font-medium text-white mb-2">{work.title}</h4>

                          <div className="flex items-center text-white/60 text-sm mb-4">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{work.date}</span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="flex items-center text-white/70 text-sm">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{work.views}</span>
                            </div>
                            <div className="flex items-center text-white/70 text-sm">
                              <Heart className="h-4 w-4 mr-1" />
                              <span>{work.likes}</span>
                            </div>
                            <div className="flex items-center text-white/70 text-sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{work.comments}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                            >
                              查看作品
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              编辑
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                            >
                              <Share2 className="h-3 w-3 mr-1" />
                              分享
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="badges" className="mt-0">
                <h3 className="text-lg font-medium text-white mb-6">我的徽章</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {userBadges.map((badge) => (
                    <motion.div
                      key={badge.id}
                      className="bg-black/60 border border-blue-500/10 rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center mb-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${badge.color} mr-3`}
                        >
                          {badge.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{badge.name}</h4>
                          <p className="text-white/70 text-sm">{badge.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <h3 className="text-lg font-medium text-white mb-4">权益状态</h3>

                <div className="bg-black/60 border border-blue-500/10 rounded-lg p-4 space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">本地用户专属权益</span>
                      <span className="px-2 py-1 rounded-full bg-green-900/50 text-green-300 text-xs">已激活</span>
                    </div>
                    <div className="text-white/70 text-sm">您已验证为洛阳本地用户，可享受本地专属权益</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">认证创作者权益</span>
                      <span className="px-2 py-1 rounded-full bg-green-900/50 text-green-300 text-xs">已激活</span>
                    </div>
                    <div className="text-white/70 text-sm">您已通过创作者认证，作品将获得优先推荐</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">应用互通权益</span>
                      <span className="px-2 py-1 rounded-full bg-amber-900/50 text-amber-300 text-xs">部分激活</span>
                    </div>
                    <div className="text-white/70 text-sm">已关联2/3个应用，完成全部关联可获得额外明星值奖励</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
