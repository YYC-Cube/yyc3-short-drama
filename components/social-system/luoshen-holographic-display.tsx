"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MessageCircle, Users, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// 洛神图片数据
const luoshenImages = [
  {
    id: "luoshen-1",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-H6aexriDuzAlhdhDbrnJwOTrCxh3j4.jpeg",
    alt: "洛神赋数字化视觉",
    poet: "曹植",
    verse: "其形也，翩若惊鸿，婉若游龙",
    era: "三国",
  },
  {
    id: "luoshen-2",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-WWI0KFxCdPbbMDh7A266kOXjQ1Rpdx.jpeg",
    alt: "洛神赋数字化视觉",
    poet: "曹植",
    verse: "荷袂飘兮翻风，步轻盈兮如云",
    era: "三国",
  },
  {
    id: "luoshen-3",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.jpg-MTuCnkcWOMfPsgrifp2jLAD3iMEiag.jpeg",
    alt: "洛神赋数字化视觉",
    poet: "曹植",
    verse: "仿佛兮若轻云之蔽月，飘飖兮若流风之回雪",
    era: "三国",
  },
  {
    id: "luoshen-4",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11.jpg-8PV0YG1LkI7aZ2iFh8YpTV84Yo1kEe.jpeg",
    alt: "洛神赋数字化视觉",
    poet: "曹植",
    verse: "芳泽无加，铅华弗御",
    era: "三国",
  },
  {
    id: "luoshen-5",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20.jpg-jJ2qZ1zfIaV5RmMPIK1RBsjqxrjWYZ.jpeg",
    alt: "洛神赋数字化视觉",
    poet: "曹植",
    verse: "云髻峨峨，修眉联娟",
    era: "三国",
  },
  {
    id: "luoshen-6",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12.jpg-c1IpgpmBjP4uIcSGJSjd4gmmwBhFvj.jpeg",
    alt: "洛神赋数字化视觉",
    poet: "曹植",
    verse: "璀璨兮须臾，将往兮复旋",
    era: "三国",
  },
  {
    id: "luoshen-7",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13.jpg-7HkI4gSOM84IMwS2f87C0rHdRUNtLe.jpeg",
    alt: "洛神赋数字化视觉",
    poet: "曹植",
    verse: "秾纤得衷，修短合度",
    era: "三国",
  },
  {
    id: "luoshen-8",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14.jpg-JM3hiv5B0H0vrHROzv7AlIOc2zXMbE.jpeg",
    alt: "洛神赋数字化视觉",
    poet: "曹植",
    verse: "肩若削成，腰如约素",
    era: "三国",
  },
]

// 模拟用户评论数据
const comments = [
  {
    id: 1,
    user: {
      name: "青衣客",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "王者导演",
    },
    content: "这个洛神形象太美了，完美融合了古典美学与现代科技感，我要把这个元素用在我的短剧《洛水寻梦》中！",
    time: "2分钟前",
    likes: 28,
  },
  {
    id: 2,
    user: {
      name: "墨香阁主",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "钻石导演",
    },
    content: "曹植的《洛神赋》本就是千古名篇，现在通过数字技术重新演绎，让人感受到了跨越千年的文化共鸣。",
    time: "5分钟前",
    likes: 42,
  },
  {
    id: 3,
    user: {
      name: "流觞曲水",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "黄金导演",
    },
    content: "这种视觉表现手法太惊艳了！古代文学作品通过现代科技手段焕发新生，这正是我们平台的意义所在。",
    time: "10分钟前",
    likes: 15,
  },
]

export default function LuoshenHolographicDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [activeUsers, setActiveUsers] = useState(128)
  const [isRippling, setIsRippling] = useState(false)
  const commentInputRef = useRef<HTMLInputElement>(null)

  // 模拟在线用户数变化
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => Math.floor(prev + (Math.random() * 10 - 5)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 轮播控制
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % luoshenImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + luoshenImages.length) % luoshenImages.length)
  }

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 8000)
    return () => clearInterval(interval)
  }, [currentIndex])

  // 触发涟漪效果
  const triggerRipple = () => {
    setIsRippling(true)
    setTimeout(() => setIsRippling(false), 2000)
  }

  // 模拟发送评论
  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentInputRef.current && commentInputRef.current.value.trim()) {
      triggerRipple()
      commentInputRef.current.value = ""
    }
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-lg bg-black/50 backdrop-blur-xs border border-white/10">
        {/* 顶部信息栏 */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-linear-to-b from-black/70 to-transparent">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-white/10 text-white border-amber-500/50">
              <Users className="h-3 w-3 mr-1" />
              {activeUsers} 人在线
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-purple-500/50">
              洛神赋·全息公屏
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              评论
            </Button>
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
              <Share2 className="h-4 w-4 mr-1" />
              分享
            </Button>
          </div>
        </div>

        {/* 主要内容区 - 洛神图像 */}
        <div className="relative aspect-video w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={luoshenImages[currentIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={luoshenImages[currentIndex].src || "/placeholder.svg"}
                alt={luoshenImages[currentIndex].alt}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* 涟漪效果 */}
          {isRippling && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ width: 50, height: 50, opacity: 1 }}
                animate={{ width: 500, height: 500, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="rounded-full border-2 border-cyan-400/50"
              />
            </div>
          )}

          {/* 诗句显示 */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 via-black/50 to-transparent">
            <motion.div
              key={`verse-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-song-ti">
                    {luoshenImages[currentIndex].verse}
                  </h3>
                  <p className="text-white/70">
                    —— {luoshenImages[currentIndex].era}·{luoshenImages[currentIndex].poet}《洛神赋》
                  </p>
                </div>
                <div className="flex space-x-1">
                  {luoshenImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-white/30"}`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* 左右切换按钮 */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* 评论区 */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-black/30 backdrop-blur-md">
                <h4 className="text-lg font-medium text-white mb-4">实时评论</h4>

                <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                  {comments.map((comment) => (
                    <Card key={comment.id} className="bg-white/5 border-white/10">
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-3">
                          <Avatar>
                            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className="font-medium text-white mr-2">{comment.user.name}</span>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-amber-500/20 text-amber-300 border-amber-500/30"
                                >
                                  {comment.user.level}
                                </Badge>
                              </div>
                              <span className="text-xs text-white/50">{comment.time}</span>
                            </div>
                            <p className="mt-1 text-white/80">{comment.content}</p>
                            <div className="mt-2 flex items-center justify-end">
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-white/70">
                                👍 {comment.likes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <form onSubmit={handleSendComment} className="flex items-center space-x-2">
                  <input
                    ref={commentInputRef}
                    type="text"
                    placeholder="发表您的评论，与其他创作者交流..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-hidden focus:ring-2 focus:ring-purple-500/50"
                  />
                  <Button
                    type="submit"
                    className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    发送
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-white mb-4">洛神赋·全息公屏</h3>
        <p className="text-white/70 mb-4">
          公屏背景动态呈现《洛神赋图》数字长卷，用户发言化作锦帛飘过画面，连麦点评触发“流觞曲水”特效。
          这一功能将传统文学与现代社交完美融合，让用户在交流互动中感受中华文化的魅力。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-lg font-medium text-white mb-2">文学赋能</h4>
            <p className="text-white/70">
              系统自动识别用户评论中的文学元素，匹配相应的视觉效果。引用古诗词会触发特殊动画，增强文化传播效果。
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-lg font-medium text-white mb-2">流觞曲水</h4>
            <p className="text-white/70">
              用户发言会化作飘带在画面中流动，其他用户可点击互动，形成“曲水流觞”的数字化再现，促进创作灵感的交流与碰撞。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
