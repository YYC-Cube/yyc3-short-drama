"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Sparkles, Music, Mic, ImageIcon } from "lucide-react"

// 模拟用户数据
const users = [
  { id: 1, name: "东方朔", avatar: "/placeholder.svg?height=100&width=100", level: "王者导演" },
  { id: 2, name: "曹植", avatar: "/placeholder.svg?height=100&width=100", level: "钻石导演" },
  { id: 3, name: "李白", avatar: "/placeholder.svg?height=100&width=100", level: "王者导演" },
  { id: 4, name: "苏轼", avatar: "/placeholder.svg?height=100&width=100", level: "白金导演" },
  { id: 5, name: "杜甫", avatar: "/placeholder.svg?height=100&width=100", level: "钻石导演" },
  { id: 6, name: "王维", avatar: "/placeholder.svg?height=100&width=100", level: "黄金导演" },
]

// 模拟消息数据
const initialMessages = [
  {
    id: 1,
    userId: 1,
    text: "洛水之畔，神女翩跹，此景当为短剧绝佳场景",
    time: "刚刚",
    effect: "ripple",
  },
  {
    id: 2,
    userId: 3,
    text: "借问江上柳，青青为谁春？",
    time: "1分钟前",
    effect: "scroll",
  },
  {
    id: 3,
    userId: 5,
    text: '此剧情转折处，当用"疑无路，忽有路"之法',
    time: "2分钟前",
    effect: "fade",
  },
]

// 模拟对诗接龙数据
const poemChains = [
  {
    id: 1,
    title: "洛水寻踪",
    lines: [
      { userId: 2, text: "洛水潺潺去不回" },
      { userId: 4, text: "神女遗珮空余悲" },
      { userId: 1, text: "若得相逢应不识" },
      { userId: 3, text: "隔世红尘几度飞" },
    ],
  },
  {
    id: 2,
    title: "龙门夜话",
    lines: [
      { userId: 5, text: "龙门石窟夜深沉" },
      { userId: 6, text: "千佛低语诉古今" },
      { userId: 3, text: "一灯如豆照壁画" },
    ],
  },
]

export default function HolographicScreen() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState("")
  const [activePoemChain, setActivePoemChain] = useState<number | null>(null)
  const [isRippling, setIsRippling] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 发送消息
  const sendMessage = () => {
    if (!inputText.trim()) return

    const newMessage = {
      id: messages.length + 1,
      userId: 1, // 假设当前用户是第一个
      text: inputText,
      time: "刚刚",
      effect: "ripple" as const,
    }

    setMessages([...messages, newMessage])
    setInputText("")
    setIsRippling(true)

    // 模拟水墨涟漪效果结束
    setTimeout(() => {
      setIsRippling(false)
    }, 3000)
  }

  // 处理键盘事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  // 切换对诗接龙显示
  const togglePoemChain = (id: number) => {
    setActivePoemChain(activePoemChain === id ? null : id)
  }

  return (
    <section ref={ref} className="py-16">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <MessageSquare className="h-6 w-6 text-emerald-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">洛神赋·全息公屏</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          公屏背景动态呈现《洛神赋图》数字长卷，用户发言化作锦帛飘过画面，
          连麦点评触发"流觞曲水"特效，语音转化为水墨涟漪，其他用户可点击涟漪接续对诗。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：在线用户列表 */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">在线创作者</h3>

            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border border-emerald-500/30">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-emerald-900/50 text-emerald-300">
                      {user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-emerald-400/80 text-xs">{user.level}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4">流觞曲水·对诗接龙</h3>

              <div className="space-y-3">
                {poemChains.map((chain) => (
                  <div key={chain.id} className="bg-black/60 border border-emerald-500/10 rounded-lg overflow-hidden">
                    <div
                      className="flex justify-between items-center p-3 cursor-pointer hover:bg-emerald-900/20 transition-colors"
                      onClick={() => togglePoemChain(chain.id)}
                    >
                      <div className="text-white font-medium">{chain.title}</div>
                      <div className="text-emerald-400/80 text-xs">{chain.lines.length}句</div>
                    </div>

                    <AnimatePresence>
                      {activePoemChain === chain.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 pt-0 space-y-2">
                            {chain.lines.map((line, index) => {
                              const user = users.find((u) => u.id === line.userId)
                              return (
                                <div key={index} className="flex items-start space-x-2">
                                  <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-1">
                                    <Image
                                      src={user?.avatar || "/placeholder.svg"}
                                      alt={user?.name || ""}
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                  <div>
                                    <div className="text-emerald-400/80 text-xs">{user?.name}</div>
                                    <div className="text-white/90">{line.text}</div>
                                  </div>
                                </div>
                              )
                            })}

                            {chain.lines.length < 4 && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-2 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                              >
                                续写下一句
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 右侧：全息公屏 */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6 h-[600px] flex flex-col">
            {/* 公屏标题 */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">《洛神赋图》全息公屏</h3>
              <div className="text-emerald-400/80 text-sm">在线: {users.length}</div>
            </div>

            {/* 公屏内容区 */}
            <div className="relative flex-grow mb-4 overflow-hidden">
              {/* 背景图 */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="洛神赋图"
                  fill
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              </div>

              {/* 消息区 */}
              <div className="relative z-10 h-full overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const user = users.find((u) => u.id === message.userId)

                  return (
                    <motion.div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.effect === "scroll" ? "bg-black/30 backdrop-blur-sm rounded-lg p-2" : ""
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Avatar className="h-8 w-8 border border-emerald-500/30">
                        <AvatarImage src={user?.avatar || ""} alt={user?.name || ""} />
                        <AvatarFallback className="bg-emerald-900/50 text-emerald-300">
                          {user?.name.slice(0, 2) || ""}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-grow">
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-300 font-medium">{user?.name}</span>
                          <span className="text-white/50 text-xs">{message.time}</span>
                        </div>

                        <div className={`mt-1 text-white/90 ${message.effect === "ripple" ? "relative" : ""}`}>
                          {message.text}

                          {/* 水墨涟漪效果 */}
                          {message.effect === "ripple" && message.id === messages.length && isRippling && (
                            <div className="absolute -inset-4 pointer-events-none">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                  className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40"
                                  animate={{
                                    scale: [1, 3],
                                    opacity: [0.7, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    ease: "easeOut",
                                    times: [0, 1],
                                    repeat: Number.POSITIVE_INFINITY,
                                  }}
                                />
                                <motion.div
                                  className="absolute w-6 h-6 rounded-full bg-emerald-500/30"
                                  animate={{
                                    scale: [1, 4],
                                    opacity: [0.5, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    ease: "easeOut",
                                    times: [0, 1],
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: 0.3,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* 输入区 */}
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 mb-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                >
                  <Music className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="在《洛神赋图》中留下你的创作灵感..."
                  className="flex-grow bg-black/60 border-emerald-500/30 focus-visible:ring-emerald-500/50 text-white"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
