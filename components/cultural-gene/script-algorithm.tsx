"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, Sparkles, RefreshCw, MessageSquare, Lightbulb, Flame } from "lucide-react"

// 八卦模式的剧本结构
const baguaScriptStructure = [
  {
    name: "乾（天）",
    meaning: "冲突引入",
    description: "剧情的开端，引入主要冲突和人物",
    example: "主角发现一件神秘的河洛古物，引发一系列奇异事件",
  },
  {
    name: "坤（地）",
    meaning: "情境铺垫",
    description: "展开背景设定，建立世界观",
    example: "展示洛阳城的日常生活，暗示古物与城市的神秘联系",
  },
  {
    name: "震（雷）",
    meaning: "剧情转折",
    description: "突发事件，改变主角的生活轨迹",
    example: "古物突然发光，主角被卷入时空隧道，穿越到古代洛阳",
  },
  {
    name: "巽（风）",
    meaning: "关系变化",
    description: "人物关系发生微妙变化",
    example: "主角在古代结识盟友，同时发现现代世界中的朋友可能是敌人",
  },
  {
    name: "坎（水）",
    meaning: "困境挑战",
    description: "主角面临重大考验",
    example: "主角被误认为是盗墓贼，必须在三天内找到证明自己清白的证据",
  },
  {
    name: "离（火）",
    meaning: "顿悟启示",
    description: "获得关键信息或能力",
    example: "主角在龙门石窟发现古老壁画，解读出古物的真正用途",
  },
  {
    name: "艮（山）",
    meaning: "阻碍克服",
    description: "战胜最大的障碍",
    example: "主角运用新获得的知识，阻止反派利用古物打开时空裂缝",
  },
  {
    name: "兑（泽）",
    meaning: "圆满结局",
    description: "故事达到高潮并解决",
    example: "主角成功修复时空秩序，带着新的智慧和古物回到现代",
  },
  {
    name: "中宫",
    meaning: "核心主题",
    description: "贯穿全剧的中心思想",
    example: "传统文化的智慧在现代仍有其价值和意义",
  },
]

// 古诗词改写示例
const poeticTransformations = [
  {
    modern: "我很想你",
    ancient: "思君如满月，夜夜减清辉",
    source: "《思君王》",
  },
  {
    modern: "我爱你",
    ancient: "既见君子，云胡不喜",
    source: "《诗经·邶风·击鼓》",
  },
  {
    modern: "别离伤感",
    ancient: "蒹葭苍苍，白露为霜。所谓伊人，在水一方",
    source: "《诗经·秦风·蒹葭》",
  },
  {
    modern: "期待重逢",
    ancient: "相见时难别亦难，东风无力百花残",
    source: "《无题》李商隐",
  },
  {
    modern: "祝你好运",
    ancient: "但愿人长久，千里共婵娟",
    source: "《水调歌头》苏轼",
  },
]

export default function ScriptAlgorithm() {
  const [activeTab, setActiveTab] = useState("bagua")
  const [modernText, setModernText] = useState("")
  const [ancientText, setAncientText] = useState("")
  const [isTransforming, setIsTransforming] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 模拟AI转换现代文本为古风文本
  const transformText = () => {
    if (!modernText) return

    setIsTransforming(true)

    // 模拟API调用延迟
    setTimeout(() => {
      // 简单匹配逻辑，实际项目中会使用AI接口
      const matchedTransformation = poeticTransformations.find((item) => modernText.includes(item.modern))

      if (matchedTransformation) {
        setAncientText(`${matchedTransformation.ancient}（${matchedTransformation.source}）`)
      } else {
        // 默认转换
        setAncientText("云想衣裳花想容，春风拂槛露华浓（《清平调》）")
      }

      setIsTransforming(false)
    }, 1500)
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
          <BookOpen className="h-6 w-6 text-amber-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">河图洛书剧本算法</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          将河洛数字崇拜融入AI编剧系统，用户选择"八卦模式"时，AI自动按卦象生成九宫格剧本结构，
          同时提供《诗经》《洛阳伽蓝记》经典词句AI改写功能。
        </p>
      </motion.div>

      <Tabs defaultValue="bagua" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="bagua" className="data-[state=active]:bg-amber-600">
            <Code className="h-4 w-4 mr-2" />
            八卦剧本结构
          </TabsTrigger>
          <TabsTrigger value="poetic" className="data-[state=active]:bg-amber-600">
            <MessageSquare className="h-4 w-4 mr-2" />
            古风台词转换
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bagua" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {baguaScriptStructure.map((gua, index) => (
              <motion.div
                key={gua.name}
                className="relative bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.3)" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#F59E0B" strokeWidth="2" />
                    {index === 8 && (
                      <>
                        <circle cx="50" cy="50" r="20" fill="none" stroke="#F59E0B" strokeWidth="1" />
                        <circle cx="50" cy="50" r="5" fill="#F59E0B" />
                      </>
                    )}
                    {index < 8 && (
                      <>
                        <line
                          x1="5"
                          y1="50"
                          x2="95"
                          y2="50"
                          stroke="#F59E0B"
                          strokeWidth={index % 2 === 0 ? "2" : "1"}
                          strokeDasharray={index % 3 === 0 ? "5,5" : "none"}
                        />
                        <line
                          x1="50"
                          y1="5"
                          x2="50"
                          y2="95"
                          stroke="#F59E0B"
                          strokeWidth={index % 2 === 1 ? "2" : "1"}
                          strokeDasharray={index % 3 === 1 ? "5,5" : "none"}
                        />
                      </>
                    )}
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-amber-400 mb-2">{gua.name}</h3>
                <div className="text-white font-medium mb-3">{gua.meaning}</div>
                <p className="text-white/70 text-sm mb-4">{gua.description}</p>
                <div className="bg-amber-900/20 border border-amber-500/20 rounded p-3 text-amber-200/80 text-sm">
                  <Lightbulb className="h-4 w-4 inline-block mr-2 text-amber-400" />
                  {gua.example}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
              <Sparkles className="h-4 w-4 mr-2" />
              生成八卦剧本结构
            </Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="poetic" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">现代台词</h3>
              <textarea
                value={modernText}
                onChange={(e) => setModernText(e.target.value)}
                placeholder="请输入现代台词，如：我爱你"
                className="w-full h-32 bg-black/60 border border-amber-500/30 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />

              <div className="mt-4 flex justify-center">
                <Button
                  onClick={transformText}
                  disabled={!modernText || isTransforming}
                  className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                >
                  {isTransforming ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      转换中...
                    </>
                  ) : (
                    <>
                      <Flame className="h-4 w-4 mr-2" />
                      转换为古风台词
                    </>
                  )}
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">古风台词</h3>
              <div className="w-full h-32 bg-black/60 border border-amber-500/30 rounded-md p-3 text-amber-300">
                {ancientText || <span className="text-white/50">古风台词将显示在这里...</span>}
              </div>

              <div className="mt-6">
                <h4 className="text-white font-medium mb-3">经典示例：</h4>
                <div className="space-y-3">
                  {poeticTransformations.slice(0, 3).map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between text-sm border-b border-amber-500/10 pb-2"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="text-white/70">{item.modern}</span>
                      <span className="text-amber-300">{item.ancient}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
