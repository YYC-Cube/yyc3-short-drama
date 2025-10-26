"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Globe, Sparkles, Users, MapPin, Star } from "lucide-react"
import TimeTravelDemo from "@/components/cultural-crossing/time-travel-demo"
import Image from "next/image"

const features = [
  {
    title: "时空场景重现",
    description: "运用AR/VR技术，精确重现历史场景",
    icon: Globe,
    stats: "500+ 场景",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "历史人物对话",
    description: "与历史名人进行智能对话交流",
    icon: Users,
    stats: "200+ 人物",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "文化情境体验",
    description: "沉浸式体验不同时代的文化氛围",
    icon: Sparkles,
    stats: "50+ 情境",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "时空导航系统",
    description: "智能引导用户穿越不同历史时期",
    icon: MapPin,
    stats: "全时代覆盖",
    color: "from-emerald-500 to-teal-500",
  },
]

const timelineData = [
  {
    period: "先秦时代",
    year: "公元前2070-221年",
    description: "体验夏商周三代文明，感受礼乐文化的起源",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-WWI0KFxCdPbbMDh7A266kOXjQ1Rpdx.jpeg",
    highlights: ["诸子百家", "青铜文明", "甲骨文字"],
  },
  {
    period: "秦汉统一",
    year: "公元前221-220年",
    description: "见证大一统帝国的建立，体验丝绸之路的繁荣",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.jpg-MTuCnkcWOMfPsgrifp2jLAD3iMEiag.jpeg",
    highlights: ["万里长城", "丝绸之路", "汉赋文学"],
  },
  {
    period: "盛唐气象",
    year: "618-907年",
    description: "感受唐朝的开放包容，体验诗歌的黄金时代",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-H6aexriDuzAlhdhDbrnJwOTrCxh3j4.jpeg",
    highlights: ["诗词歌赋", "胡汉融合", "佛教艺术"],
  },
]

export default function CulturalCrossingClientPage() {
  return (
    <div className="min-h-screen overflow-y-auto p-6 space-y-8">
      {/* 页面头部 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30 text-lg px-6 py-2">
          <Clock className="w-5 h-5 mr-2" />
          时空穿越体验
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
          穿越千年时光
        </h1>

        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          突破时空界限，与历史对话，在虚拟现实中体验中华文明的璀璨历程
        </p>
      </motion.div>

      {/* 核心功能展示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="cultural-card border-indigo-500/20 hover:border-indigo-500/40 h-full">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{feature.description}</p>
                  <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">{feature.stats}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* 时空穿越演示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Card className="cultural-card border-indigo-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-indigo-300 flex items-center">
              <Sparkles className="w-6 h-6 mr-3" />
              互动体验演示
            </CardTitle>
            <CardDescription className="text-white/70 text-lg">
              选择您想要穿越的历史时期，开始您的文化之旅
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TimeTravelDemo />
          </CardContent>
        </Card>
      </motion.div>

      {/* 历史时间线 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">历史文明时间线</h2>
          <p className="text-white/70 text-lg">探索中华文明的历史脉络</p>
        </div>

        <div className="space-y-8">
          {timelineData.map((period, index) => (
            <motion.div
              key={period.period}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <Card className="cultural-card border-indigo-500/20 hover:border-indigo-500/40">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl text-white">{period.period}</CardTitle>
                      <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">{period.year}</Badge>
                    </div>
                    <CardDescription className="text-white/70">{period.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-white font-medium">文化亮点</h4>
                      <div className="flex flex-wrap gap-2">
                        {period.highlights.map((highlight) => (
                          <Badge
                            key={highlight}
                            variant="secondary"
                            className="bg-white/10 text-white/80 border-white/20"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-64 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image src={period.image || "/placeholder.svg"} alt={period.period} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-black/50 text-white border-white/30">
                      <Star className="w-4 h-4 mr-1" />
                      精选场景
                    </Badge>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
