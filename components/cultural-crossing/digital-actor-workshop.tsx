"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Users, History, Sparkles, Camera, MessageSquare, Palette, Zap, Star, Check, Clock } from "lucide-react"

// 历史名人数据
const historicalFigures = [
  {
    id: "dufu",
    name: "杜甫",
    title: "诗圣",
    era: "唐朝",
    avatar: "/placeholder.svg?height=200&width=200&text=杜甫",
    description: "唐代伟大的现实主义诗人，被誉为“诗圣”，其诗歌反映了唐代由盛转衰的历史变迁。",
    specialties: ["写实诗歌", "忧国忧民", "工整格律"],
    popularity: 95,
    accuracy: 98,
  },
  {
    id: "wuzetian",
    name: "武则天",
    title: "则天大圣皇帝",
    era: "唐朝",
    avatar: "/placeholder.svg?height=200&width=200&text=武则天",
    description: "中国历史上唯一的正统女皇帝，政治手腕高超，推行科举制度，促进文化发展。",
    specialties: ["政治决策", "权谋策略", "文学鉴赏"],
    popularity: 92,
    accuracy: 90,
  },
  {
    id: "libai",
    name: "李白",
    title: "诗仙",
    era: "唐朝",
    avatar: "/placeholder.svg?height=200&width=200&text=李白",
    description: "唐代伟大的浪漫主义诗人，被誉为“诗仙”，其诗歌想象丰富，语言豪放洒脱。",
    specialties: ["浪漫诗歌", "饮酒作诗", "豪放风格"],
    popularity: 98,
    accuracy: 95,
  },
  {
    id: "bai_juyi",
    name: "白居易",
    title: "诗魔",
    era: "唐朝",
    avatar: "/placeholder.svg?height=200&width=200&text=白居易",
    description: "唐代著名现实主义诗人，提倡新乐府运动，诗歌通俗易懂，深受民众喜爱。",
    specialties: ["新乐府诗", "讽喻诗", "通俗诗风"],
    popularity: 88,
    accuracy: 94,
  },
]

// 文化传承人数据
const culturalInheritors = [
  {
    id: "tangsancai_master",
    name: "张明",
    craft: "唐三彩制作",
    avatar: "/placeholder.svg?height=200&width=200&text=唐三彩匠人",
    description: "第五代唐三彩非物质文化遗产传承人，精通传统釉彩配方与烧制工艺。",
    specialties: ["釉彩调配", "塑形技艺", "烧制工艺"],
    experience: 40,
    students: 12,
  },
  {
    id: "luoyang_paper_cut",
    name: "王丽",
    craft: "洛阳剪纸",
    avatar: "/placeholder.svg?height=200&width=200&text=剪纸艺人",
    description: "洛阳剪纸非遗传承人，作品多以河洛文化题材为主，技法精湛。",
    specialties: ["镂空技法", "河洛图案", "民俗题材"],
    experience: 35,
    students: 24,
  },
  {
    id: "rubbings_master",
    name: "赵刚",
    craft: "传拓技艺",
    avatar: "/placeholder.svg?height=200&width=200&text=传拓艺人",
    description: "龙门石窟传拓技艺传承人，专注于佛像与碑刻拓片制作。",
    specialties: ["湿拓技法", "干拓技法", "古法装裱"],
    experience: 28,
    students: 8,
  },
  {
    id: "peony_painting",
    name: "刘芳",
    craft: "洛阳牡丹画",
    avatar: "/placeholder.svg?height=200&width=200&text=牡丹画艺人",
    description: "洛阳牡丹画传承人，融合传统工笔与写意技法，作品栩栩如生。",
    specialties: ["工笔牡丹", "写意牡丹", "传统颜料制作"],
    experience: 30,
    students: 15,
  },
]

export default function DigitalActorWorkshop() {
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
          数字演员工坊
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          河洛智能演员矩阵，让历史名人、文化传承人与您的数字分身共同演绎文化故事
        </p>
      </motion.div>

      <Tabs defaultValue="historical" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-12">
          <TabsTrigger value="historical" className="data-[state=active]:bg-amber-600 py-3">
            <History className="h-5 w-5 mr-2" />
            历史名人替身
          </TabsTrigger>
          <TabsTrigger value="inheritors" className="data-[state=active]:bg-amber-600 py-3">
            <Palette className="h-5 w-5 mr-2" />
            文化传承人
          </TabsTrigger>
          <TabsTrigger value="digital-twin" className="data-[state=active]:bg-amber-600 py-3">
            <User className="h-5 w-5 mr-2" />
            用户数字孪生
          </TabsTrigger>
        </TabsList>

        <TabsContent value="historical" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {historicalFigures.map((figure, index) => (
              <motion.div
                key={figure.id}
                className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48">
                  <Image
                    src={figure.avatar || "/placeholder.svg"}
                    alt={figure.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-600/80 backdrop-blur-sm">{figure.era}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{figure.name}</h3>
                      <p className="text-amber-400 text-sm">{figure.title}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-white/70 text-sm mb-4 line-clamp-3">{figure.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {figure.specialties.map((specialty, i) => (
                      <Badge key={i} variant="outline" className="bg-black/60 border-amber-500/30 text-amber-300">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">历史准确度</span>
                        <span className="text-white">{figure.accuracy}%</span>
                      </div>
                      <div className="h-1.5 bg-black/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                          style={{ width: `${figure.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">受欢迎度</span>
                        <span className="text-white">{figure.popularity}%</span>
                      </div>
                      <div className="h-1.5 bg-black/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                          style={{ width: `${figure.popularity}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                    <MessageSquare className="h-4 w-4 mr-2" />与{figure.name}对话
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">历史名人替身技术特点</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Camera className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">高保真3D重建</h4>
                <p className="text-white/70 text-sm">
                  基于历史画像、雕像和文献描述，结合人类学特征，重建历史人物的高精度3D模型。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">大语言模型</h4>
                <p className="text-white/70 text-sm">
                  基于历史人物著作和相关史料训练的专属大语言模型，能够模拟其思维方式和语言风格。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">文化赋能</h4>
                <p className="text-white/70 text-sm">
                  如杜甫替身可即兴创作符合《杜工部集》风格的台词，保持历史准确性的同时提供创意互动。
                </p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="inheritors" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturalInheritors.map((inheritor, index) => (
              <motion.div
                key={inheritor.id}
                className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48">
                  <Image
                    src={inheritor.avatar || "/placeholder.svg"}
                    alt={inheritor.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600/80 backdrop-blur-sm">非遗传承人</Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{inheritor.name}</h3>
                      <p className="text-green-400 text-sm">{inheritor.craft}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-white/70 text-sm mb-4 line-clamp-3">{inheritor.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {inheritor.specialties.map((specialty, i) => (
                      <Badge key={i} variant="outline" className="bg-black/60 border-green-500/30 text-green-300">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">从艺经验</span>
                      <span className="text-white">{inheritor.experience}年</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">培养学徒</span>
                      <span className="text-white">{inheritor.students}人</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800">
                    <Palette className="h-4 w-4 mr-2" />
                    学习{inheritor.craft}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">文化传承人技术特点</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Camera className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">动作捕捉</h4>
                <p className="text-white/70 text-sm">
                  通过高精度动作捕捉系统，记录非遗传承人的专业技艺动作，实现精确的技艺传授。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">非遗知识图谱</h4>
                <p className="text-white/70 text-sm">
                  构建完整的非物质文化遗产知识图谱，包含工艺流程、材料特性、历史渊源等多维度信息。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">文化赋能</h4>
                <p className="text-white/70 text-sm">
                  如唐三彩匠人数字分身可实时指导用户进行釉色调配，提供即时反馈和专业建议。
                </p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="digital-twin" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">用户数字孪生</h3>
              <p className="text-white/70 mb-6">
                通过先进的Metahuman技术和实时面部捕捉，创建您的高精度数字分身，自动适配古装发髻与步态仪态，让您在虚拟世界中穿越历史。
              </p>

              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-3">数字孪生功能</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">历史角色扮演</h5>
                      <p className="text-white/70 text-sm">您的数字分身可穿越至不同历史时期，体验不同身份和社会角色</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">多人互动协作</h5>
                      <p className="text-white/70 text-sm">
                        多个用户的数字分身可在同一历史场景中互动，共同完成创作任务
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">情感表达增强</h5>
                      <p className="text-white/70 text-sm">通过面部表情捕捉，实现细腻的情感表达，提升短剧表演真实感</p>
                    </div>
                  </li>
                </ul>
              </div>

              <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                <User className="h-4 w-4 mr-2" />
                创建我的数字分身
              </Button>
            </motion.div>

            <motion.div
              className="relative h-96 rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src="/placeholder.svg?height=600&width=800&text=数字分身示例"
                alt="数字分身示例"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="/placeholder.svg?height=100&width=100" />
                      <AvatarFallback>用户</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white font-medium">您的数字分身</div>
                      <div className="text-white/60 text-sm">唐朝服饰 · 贵族身份</div>
                    </div>
                    <Badge className="ml-auto bg-amber-600">
                      <Star className="h-3 w-3 mr-1" />
                      高级定制
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-white/70 mb-2">
                    <span>面部相似度</span>
                    <span>98%</span>
                  </div>
                  <div className="h-1.5 bg-black/60 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      更换时代
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      更换身份
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">智能拍摄系统</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">剧本熵值调节器</h4>
                <p className="text-white/70 text-sm">
                  通过混沌算法生成剧情分支，设置意外性参数，让历史事件在一定范围内产生变化，增加创作的趣味性。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">时空一致性引擎</h4>
                <p className="text-white/70 text-sm">
                  区块链记录服装、化妆、道具细节，自动检测历史不一致问题，确保创作的文化准确性。
                </p>
              </div>
              <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">情感共鸣渲染</h4>
                <p className="text-white/70 text-sm">
                  通过脑电波反馈调整运镜和配乐，当观众情绪达到特定阈值时，自动优化视听体验，增强情感共鸣。
                </p>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
