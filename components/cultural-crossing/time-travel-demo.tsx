"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Clock, MapPin, Users, Sparkles } from "lucide-react"
import Image from "next/image"

interface TimePeriod {
  id: string
  name: string
  description: string
  year: string
  image: string
  characters: string[]
  scenes: string[]
  culturalElements: string[]
}

const timePeriods: TimePeriod[] = [
  {
    id: "tang",
    name: "盛唐风华",
    description: "体验唐朝的繁荣昌盛，感受诗词歌赋的黄金时代",
    year: "618-907年",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-WWI0KFxCdPbbMDh7A266kOXjQ1Rpdx.jpeg",
    characters: ["李白", "杜甫", "武则天", "玄奘"],
    scenes: ["长安大明宫", "曲江池", "华清池", "大雁塔"],
    culturalElements: ["诗词", "书法", "音乐", "舞蹈"],
  },
  {
    id: "song",
    name: "宋韵雅致",
    description: "探索宋朝的文化繁荣，体验理学与艺术的完美结合",
    year: "960-1279年",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.jpg-MTuCnkcWOMfPsgrifp2jLAD3iMEiag.jpeg",
    characters: ["苏轼", "李清照", "朱熹", "岳飞"],
    scenes: ["汴京城", "西湖", "岳阳楼", "书院"],
    culturalElements: ["理学", "词曲", "绘画", "瓷器"],
  },
  {
    id: "ming",
    name: "明朝辉煌",
    description: "重现明朝的壮丽景象，感受紫禁城的皇家气派",
    year: "1368-1644年",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-H6aexriDuzAlhdhDbrnJwOTrCxh3j4.jpeg",
    characters: ["朱元璋", "郑和", "唐伯虎", "徐霞客"],
    scenes: ["紫禁城", "天坛", "明十三陵", "南京城"],
    culturalElements: ["建筑", "航海", "小说", "戏曲"],
  },
]

export default function TimeTravelDemo() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(timePeriods[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentScene, setCurrentScene] = useState(0)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // 模拟播放进度
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 100)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentScene(0)
  }

  return (
    <div className="space-y-8">
      {/* 时代选择 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {timePeriods.map((period) => (
          <motion.div
            key={period.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPeriod(period)}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 ${
                selectedPeriod.id === period.id ? "ring-2 ring-amber-500 bg-amber-500/10" : "hover:bg-white/5"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                  <Image src={period.image || "/placeholder.svg"} alt={period.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-2 right-2 bg-amber-500/20 text-amber-300 border-amber-500/30">
                    {period.year}
                  </Badge>
                </div>
                <CardTitle className="text-white">{period.name}</CardTitle>
                <CardDescription className="text-white/70">{period.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 时空穿越体验区 */}
      <Card className="cultural-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-amber-300 flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                {selectedPeriod.name} - 时空穿越体验
              </CardTitle>
              <CardDescription className="text-white/70 mt-2">{selectedPeriod.description}</CardDescription>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">{selectedPeriod.year}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 主要体验区 */}
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src={selectedPeriod.image || "/placeholder.svg"}
              alt={selectedPeriod.name}
              fill
              className="object-cover transition-all duration-500"
              style={{
                filter: isPlaying ? "brightness(1.2) saturate(1.3)" : "brightness(0.8)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* 播放控制 */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Button size="sm" onClick={handlePlay} className="bg-amber-500 hover:bg-amber-600 text-white">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReset}
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                <Badge className="bg-black/50 text-white border-white/30">{Math.round(progress)}% 完成</Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* 穿越效果 */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-amber-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 详细信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 历史人物 */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  历史人物
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedPeriod.characters.map((character, index) => (
                    <motion.div
                      key={character}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">{character.charAt(0)}</span>
                      </div>
                      <span className="text-white">{character}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 场景地点 */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  经典场景
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedPeriod.scenes.map((scene, index) => (
                    <motion.div
                      key={scene}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        currentScene === index
                          ? "bg-amber-500/20 border border-amber-500/30"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                      onClick={() => setCurrentScene(index)}
                    >
                      <span className="text-white">{scene}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 文化元素 */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  文化元素
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedPeriod.culturalElements.map((element, index) => (
                    <motion.div
                      key={element}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber-400 mr-3" />
                      <span className="text-white">{element}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
