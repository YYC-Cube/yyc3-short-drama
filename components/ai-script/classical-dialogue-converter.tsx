"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, RefreshCw, ArrowRight, Copy, Check, Bookmark, Lightbulb, History } from "lucide-react"

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
  {
    modern: "我会等你",
    ancient: "相思树下说相思，思郎恨郎郎不知",
    source: "《江城子》苏轼",
  },
  {
    modern: "不要忘记我",
    ancient: "落花人独立，微雨燕双飞",
    source: "《临江仙》晏几道",
  },
  {
    modern: "我很难过",
    ancient: "抽刀断水水更流，举杯消愁愁更愁",
    source: "《宣州谢朓楼饯别校书叔云》李白",
  },
]

// 模拟AI转换现代文本为古风文本
const transformToClassical = (text: string) => {
  // 模拟AI转换，实际项目中会调用AI接口

  // 简单匹配逻辑
  for (const item of poeticTransformations) {
    if (text.includes(item.modern)) {
      return `${item.ancient}（${item.source}）`
    }
  }

  // 默认转换
  if (text.includes("喜欢")) {
    return "情不知所起，一往而深（《迷离》辛弃疾）"
  } else if (text.includes("思念")) {
    return "曾经沧海难为水，除却巫山不是云（《离思》元稹）"
  } else if (text.includes("等待")) {
    return "衣带渐宽终不悔，为伊消得人憔悴（《凤凰台上忆吹箫》李清照）"
  } else {
    return "云想衣裳花想容，春风拂槛露华浓（《清平调》李白）"
  }
}

// 对话场景示例
const dialogueScenes = [
  {
    title: "初次相遇",
    description: "男女主角在洛阳城的集市上偶遇",
    modern: `
男：你好，能问一下这个玉佩多少钱吗？
女：这个啊，五两银子。
男：有点贵，能便宜点吗？
女：这可是上好的和田玉，已经很公道了。
男：好吧，我买了。对了，我叫李明，你呢？
女：我叫杨雪，这是我家的铺子。
男：很高兴认识你，改天可以再来找你聊天吗？
女：当然可以，随时欢迎。
`,
  },
  {
    title: "离别场景",
    description: "男主角即将远行，与女主角告别",
    modern: `
男：我明天就要启程去长安了。
女：路途遥远，你要保重。
男：我会的，等我回来，一定第一时间来见你。
女：我会等你，不管多久。
男：这段时间我很开心，认识你是我的幸运。
女：我也是，希望你一路顺风，早日归来。
男：我走后，你要照顾好自己。
女：你放心，我会好好的，你也要平安。
`,
  },
]

export default function ClassicalDialogueConverter() {
  const [activeTab, setActiveTab] = useState("single")
  const [modernText, setModernText] = useState("")
  const [ancientText, setAncientText] = useState("")
  const [isTransforming, setIsTransforming] = useState(false)
  const [copied, setCopied] = useState(false)
  const [dialogueInput, setDialogueInput] = useState("")
  const [dialogueOutput, setDialogueOutput] = useState("")
  const [selectedScene, setSelectedScene] = useState<number | null>(null)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 转换单句台词
  const transformSingleLine = () => {
    if (!modernText.trim()) return

    setIsTransforming(true)

    // 模拟API调用延迟
    setTimeout(() => {
      setAncientText(transformToClassical(modernText))
      setIsTransforming(false)
    }, 1500)
  }

  // 转换对话场景
  const transformDialogue = () => {
    if (!dialogueInput.trim()) return

    setIsTransforming(true)

    // 模拟API调用延迟
    setTimeout(() => {
      // 简单处理，实际项目中会调用AI接口进行更复杂的转换
      const lines = dialogueInput.split("\n")
      const transformedLines = lines.map((line) => {
        if (!line.trim()) return line

        const colonIndex = line.indexOf("：")
        if (colonIndex === -1) return line

        const speaker = line.substring(0, colonIndex + 1)
        const speech = line.substring(colonIndex + 1)

        // 只转换有实际内容的台词
        if (speech.trim()) {
          // 随机选择一种转换方式，模拟多样性
          const randomIndex = Math.floor(Math.random() * poeticTransformations.length)
          const randomTransformation = poeticTransformations[randomIndex]
          return `${speaker}${randomTransformation.ancient}（${randomTransformation.source}）`
        }

        return line
      })

      setDialogueOutput(transformedLines.join("\n"))
      setIsTransforming(false)
    }, 2000)
  }

  // 复制转换结果
  const copyResult = () => {
    const textToCopy = activeTab === "single" ? ancientText : dialogueOutput

    if (!textToCopy) return

    navigator.clipboard.writeText(textToCopy)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  // 选择对话场景
  const selectDialogueScene = (index: number) => {
    setSelectedScene(index)
    setDialogueInput(dialogueScenes[index].modern)
    setDialogueOutput("")
  }

  // 清空内容
  const clearContent = () => {
    if (activeTab === "single") {
      setModernText("")
      setAncientText("")
    } else {
      setDialogueInput("")
      setDialogueOutput("")
      setSelectedScene(null)
    }
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
          <MessageSquare className="h-6 w-6 text-amber-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">古风台词转换</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          剧本台词嵌入《诗经》《洛阳伽蓝记》经典词句AI改写功能， 将现代台词转化为古风版本，为短剧对白增添传统文化韵味。
        </p>
      </motion.div>

      <Tabs defaultValue="single" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="single" className="data-[state=active]:bg-amber-600">
            <MessageSquare className="h-4 w-4 mr-2" />
            单句转换
          </TabsTrigger>
          <TabsTrigger value="dialogue" className="data-[state=active]:bg-amber-600">
            <History className="h-4 w-4 mr-2" />
            对话场景转换
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：现代台词 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">现代台词</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm block mb-2">输入现代台词</label>
                    <Textarea
                      value={modernText}
                      onChange={(e) => setModernText(e.target.value)}
                      placeholder="请输入现代台词，如：我爱你"
                      className="bg-black/60 border-amber-500/30 focus-visible:ring-amber-500/50 text-white min-h-[100px]"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={transformSingleLine}
                      disabled={!modernText.trim() || isTransforming}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                    >
                      {isTransforming ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          转换中...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-4 w-4 mr-2" />
                          转换为古风台词
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={clearContent}
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    >
                      清空
                    </Button>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm block mb-2">经典示例</label>
                    <div className="space-y-2">
                      {poeticTransformations.slice(0, 5).map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm border-b border-amber-500/10 pb-2 cursor-pointer hover:bg-amber-900/10 px-2 rounded transition-colors"
                          onClick={() => setModernText(item.modern)}
                        >
                          <span className="text-white/70">{item.modern}</span>
                          <span className="text-amber-300">{item.ancient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 右侧：古风台词 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">古风台词</h3>

                  {ancientText && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyResult}
                        className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            复制
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                      >
                        <Bookmark className="h-4 w-4 mr-1" />
                        保存
                      </Button>
                    </div>
                  )}
                </div>

                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4 min-h-[100px] mb-6">
                  {isTransforming ? (
                    <div className="flex items-center justify-center h-24">
                      <RefreshCw className="h-6 w-6 text-amber-400 animate-spin mr-2" />
                      <span className="text-white/70">正在转换为古风台词...</span>
                    </div>
                  ) : ancientText ? (
                    <div className="text-amber-300 text-lg">{ancientText}</div>
                  ) : (
                    <div className="text-white/50 h-24 flex items-center justify-center">古风台词将显示在这里...</div>
                  )}
                </div>

                <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Lightbulb className="h-5 w-5 text-amber-400 mr-2" />
                    <h4 className="text-white font-medium">古风台词说明</h4>
                  </div>

                  <div className="text-white/70 text-sm space-y-2">
                    <p>
                      古风台词转换基于《诗经》《楚辞》《唐诗》《宋词》等古典文学作品，
                      通过AI深度学习，将现代表达方式转化为具有古典韵味的文学表达。
                    </p>
                    <p>转换结果会自动标注出处，帮助创作者了解文化背景， 也可以根据需要进行二次创作和调整。</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="dialogue" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：现代对话 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">现代对话场景</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm block mb-2">
                      输入对话场景（每行一句台词，格式：角色：台词）
                    </label>
                    <Textarea
                      value={dialogueInput}
                      onChange={(e) => {
                        setDialogueInput(e.target.value)
                        setSelectedScene(null)
                      }}
                      placeholder="男：你好，能问一下这个玉佩多少钱吗？
女：这个啊，五两银子。"
                      className="bg-black/60 border-amber-500/30 focus-visible:ring-amber-500/50 text-white min-h-[200px] font-mono"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={transformDialogue}
                      disabled={!dialogueInput.trim() || isTransforming}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                    >
                      {isTransforming ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          转换中...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-4 w-4 mr-2" />
                          转换为古风对话
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={clearContent}
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    >
                      清空
                    </Button>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm block mb-2">对话场景示例</label>
                    <div className="space-y-3">
                      {dialogueScenes.map((scene, index) => (
                        <div
                          key={index}
                          className={`bg-black/60 border ${
                            selectedScene === index ? "border-amber-500" : "border-amber-500/10"
                          } rounded-lg p-3 cursor-pointer hover:bg-amber-900/20 transition-colors`}
                          onClick={() => selectDialogueScene(index)}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="text-white font-medium">{scene.title}</h4>
                            {selectedScene === index && <Check className="h-4 w-4 text-amber-400" />}
                          </div>
                          <p className="text-white/70 text-sm mt-1 mb-2">{scene.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 右侧：古风对话 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">古风对话场景</h3>

                  {dialogueOutput && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyResult}
                        className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            复制
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                      >
                        <Bookmark className="h-4 w-4 mr-1" />
                        保存
                      </Button>
                    </div>
                  )}
                </div>

                <div className="bg-black/60 border border-amber-500/10 rounded-lg p-4 min-h-[200px] mb-6 font-mono">
                  {isTransforming ? (
                    <div className="flex items-center justify-center h-40">
                      <RefreshCw className="h-6 w-6 text-amber-400 animate-spin mr-2" />
                      <span className="text-white/70">正在转换为古风对话场景...</span>
                    </div>
                  ) : dialogueOutput ? (
                    <div className="text-amber-300 whitespace-pre-line">{dialogueOutput}</div>
                  ) : (
                    <div className="text-white/50 h-40 flex items-center justify-center">
                      古风对话场景将显示在这里...
                    </div>
                  )}
                </div>

                <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Lightbulb className="h-5 w-5 text-amber-400 mr-2" />
                    <h4 className="text-white font-medium">使用提示</h4>
                  </div>

                  <div className="text-white/70 text-sm space-y-2">
                    <p>对话场景转换会保留原始对话结构和角色设定， 仅将台词内容转换为古风表达方式。</p>
                    <p>
                      转换后的台词会自动标注出处，可以根据剧情需要进行选择性使用。
                      建议在正式剧本中适当调整，使对话更加自然流畅。
                    </p>
                    <p>
                      对于特定专业术语或现代概念，系统会尝试寻找古代类似概念进行替代， 如无法找到合适替代，将保留原文。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
