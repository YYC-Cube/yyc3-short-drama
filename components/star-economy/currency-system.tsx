"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Coins, TrendingUp, ShoppingBag, Warehouse, ArrowRight, Download } from "lucide-react"

// 通宝兑换比例
const EXCHANGE_RATE = 100 // 1通宝 = 100明星值

// 通宝商品数据
const digitalProducts = [
  {
    id: 1,
    name: "唐三彩AI生成器",
    type: "创作工具",
    price: 50,
    image: "/placeholder.svg?height=200&width=200",
    description: "基于唐三彩艺术特色训练的AI模型，可生成具有唐三彩风格的角色和道具",
  },
  {
    id: 2,
    name: "龙门石窟佛首NFT",
    type: "数字藏品",
    price: 200,
    image: "/placeholder.svg?height=200&width=200",
    description: "龙门石窟卢舍那大佛高精度3D扫描模型，限量发行100份，附数字证书",
  },
  {
    id: 3,
    name: "《诗经》音频解析库",
    type: "创作素材",
    price: 30,
    image: "/placeholder.svg?height=200&width=200",
    description: "《诗经》全集专业朗读音频，配合韵律分析和情感标注，辅助创作古风配乐",
  },
]

const physicalProducts = [
  {
    id: 4,
    name: "洛阳铲造型U盘",
    type: "实体周边",
    price: 80,
    image: "/placeholder.svg?height=200&width=200",
    description: '考古工具"洛阳铲"造型的64GB U盘，预装遗址考古AR地图和文物3D模型',
  },
  {
    id: 5,
    name: "河图洛书笔记本",
    type: "实体周边",
    price: 40,
    image: "/placeholder.svg?height=200&width=200",
    description: "封面采用河图洛书纹样设计的精装笔记本，内页含河洛文化知识点",
  },
  {
    id: 6,
    name: "九州巡演限定T恤",
    type: "实体周边",
    price: 60,
    image: "/placeholder.svg?height=200&width=200",
    description: "九州巡演活动限定T恤，采用水墨风设计，融合洛阳地标建筑元素",
  },
]

// 导演等级数据
const directorLevels = [
  { name: "青铜导演", interestRate: "3%", color: "from-amber-400 to-amber-600" },
  { name: "白银导演", interestRate: "5%", color: "from-gray-300 to-gray-500" },
  { name: "黄金导演", interestRate: "8%", color: "from-yellow-400 to-yellow-600" },
  { name: "铂金导演", interestRate: "12%", color: "from-blue-300 to-blue-500" },
  { name: "钻石导演", interestRate: "15%", color: "from-cyan-300 to-cyan-500" },
  { name: "王者导演", interestRate: "20%", color: "from-purple-400 to-purple-600" },
]

export default function CurrencySystem() {
  const [activeTab, setActiveTab] = useState("currency")
  const [starValue, setStarValue] = useState(15000) // 模拟用户当前明星值
  const [tongbao, setTongbao] = useState(50) // 模拟用户当前通宝数量
  const [exchangeAmount, setExchangeAmount] = useState(0) // 兑换数量

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 计算兑换后的通宝和明星值
  const calculateExchange = () => {
    const newTongbao = tongbao + exchangeAmount
    const newStarValue = starValue - exchangeAmount * EXCHANGE_RATE
    return { newTongbao, newStarValue }
  }

  // 执行兑换
  const executeExchange = () => {
    if (exchangeAmount <= 0) return
    if (exchangeAmount * EXCHANGE_RATE > starValue) return

    const { newTongbao, newStarValue } = calculateExchange()
    setTongbao(newTongbao)
    setStarValue(newStarValue)
    setExchangeAmount(0)
  }

  // 模拟用户当前等级
  const userLevel = directorLevels[3] // 铂金导演

  return (
    <section ref={ref} className="py-16">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <Coins className="h-6 w-6 text-purple-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">通宝积分双轨制</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          引入"开元通宝"虚拟货币（1通宝=100明星值），用于购买限定文化商品。
          建立"含嘉仓"积分粮仓系统，用户明星值超过1万可自动存粮生息，年化利率按导演等级浮动。
        </p>
      </motion.div>

      <Tabs defaultValue="currency" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="currency" className="data-[state=active]:bg-purple-600">
            <Coins className="h-4 w-4 mr-2" />
            通宝积分系统
          </TabsTrigger>
          <TabsTrigger value="granary" className="data-[state=active]:bg-purple-600">
            <Warehouse className="h-4 w-4 mr-2" />
            含嘉仓积分生息
          </TabsTrigger>
        </TabsList>

        <TabsContent value="currency" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：用户资产和兑换 */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">我的资产</h3>

                <div className="space-y-4">
                  <div className="bg-black/60 border border-purple-500/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-amber-400 mr-2" />
                        <span className="text-white font-medium">明星值</span>
                      </div>
                      <span className="text-amber-300 text-xl font-bold">{starValue.toLocaleString()}</span>
                    </div>
                    <div className="text-white/60 text-sm">可用于平台内消费和兑换通宝</div>
                  </div>

                  <div className="bg-black/60 border border-purple-500/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Coins className="h-5 w-5 text-purple-400 mr-2" />
                        <span className="text-white font-medium">开元通宝</span>
                      </div>
                      <span className="text-purple-300 text-xl font-bold">{tongbao}</span>
                    </div>
                    <div className="text-white/60 text-sm">可用于购买限定文化商品</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-white mb-4">兑换通宝</h4>

                  <div className="bg-black/60 border border-purple-500/10 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/70">兑换比例</span>
                      <div className="flex items-center">
                        <span className="text-amber-300">100</span>
                        <ArrowRight className="h-3 w-3 mx-2 text-white/50" />
                        <span className="text-purple-300">1</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-white/70 text-sm block mb-1">兑换数量（通宝）</label>
                        <input
                          type="number"
                          min="0"
                          max={Math.floor(starValue / EXCHANGE_RATE)}
                          value={exchangeAmount}
                          onChange={(e) => setExchangeAmount(Number.parseInt(e.target.value) || 0)}
                          className="w-full bg-black/60 border border-purple-500/30 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">消耗明星值</span>
                        <span className="text-amber-300">{(exchangeAmount * EXCHANGE_RATE).toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">兑换后明星值</span>
                        <span className="text-white">
                          {(starValue - exchangeAmount * EXCHANGE_RATE).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">兑换后通宝</span>
                        <span className="text-purple-300">{tongbao + exchangeAmount}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={executeExchange}
                    disabled={exchangeAmount <= 0 || exchangeAmount * EXCHANGE_RATE > starValue}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    确认兑换
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* 右侧：通宝商城 */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">通宝商城</h3>
                  <div className="flex items-center">
                    <Coins className="h-4 w-4 text-purple-400 mr-1" />
                    <span className="text-purple-300 font-medium">{tongbao}</span>
                  </div>
                </div>

                <Tabs defaultValue="digital">
                  <TabsList className="mb-6">
                    <TabsTrigger value="digital" className="data-[state=active]:bg-purple-600">
                      <Download className="h-4 w-4 mr-2" />
                      数字藏品
                    </TabsTrigger>
                    <TabsTrigger value="physical" className="data-[state=active]:bg-purple-600">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      实体周边
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="digital" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {digitalProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          className="bg-black/60 border border-purple-500/10 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
                        >
                          <div className="relative h-40">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="p-4">
                            <h4 className="text-lg font-medium text-white">{product.name}</h4>
                            <div className="text-white/70 text-sm mb-3">{product.type}</div>
                            <p className="text-white/80 text-sm mb-4 line-clamp-2">{product.description}</p>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Coins className="h-4 w-4 text-purple-400 mr-1" />
                                <span className="text-purple-300 font-medium">{product.price}</span>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                disabled={tongbao < product.price}
                                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                              >
                                {tongbao >= product.price ? "购买" : "通宝不足"}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="physical" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {physicalProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          className="bg-black/60 border border-purple-500/10 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
                        >
                          <div className="relative h-40">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="p-4">
                            <h4 className="text-lg font-medium text-white">{product.name}</h4>
                            <div className="text-white/70 text-sm mb-3">{product.type}</div>
                            <p className="text-white/80 text-sm mb-4 line-clamp-2">{product.description}</p>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Coins className="h-4 w-4 text-purple-400 mr-1" />
                                <span className="text-purple-300 font-medium">{product.price}</span>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                disabled={tongbao < product.price}
                                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                              >
                                {tongbao >= product.price ? "购买" : "通宝不足"}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 text-center">
                  <Button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    查看更多商品
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="granary" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：含嘉仓状态 */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">含嘉仓状态</h3>

                <div className="bg-black/60 border border-purple-500/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Warehouse className="h-5 w-5 text-purple-400 mr-2" />
                      <span className="text-white font-medium">积分粮仓</span>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-green-900/50 text-green-300 text-xs">已激活</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">存入明星值</span>
                      <span className="text-amber-300">10,000</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">当前等级</span>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${userLevel.color} mr-1`}></div>
                        <span className="text-white">{userLevel.name}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">年化利率</span>
                      <span className="text-purple-300">{userLevel.interestRate}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">下次收益</span>
                      <span className="text-white">3天后</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/60 border border-purple-500/10 rounded-lg p-4 mb-6">
                  <h4 className="text-lg font-medium text-white mb-3">收益预测</h4>

                  <div className="relative h-40 mb-3">
                    {/* 简化的收益图表 */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="w-1/6 h-[20%] bg-purple-900/30 border-t border-purple-500/50"></div>
                      <div className="w-1/6 h-[30%] bg-purple-900/30 border-t border-purple-500/50"></div>
                      <div className="w-1/6 h-[45%] bg-purple-900/30 border-t border-purple-500/50"></div>
                      <div className="w-1/6 h-[60%] bg-purple-900/30 border-t border-purple-500/50"></div>
                      <div className="w-1/6 h-[75%] bg-purple-900/30 border-t border-purple-500/50"></div>
                      <div className="w-1/6 h-[90%] bg-purple-900/30 border-t border-purple-500/50"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-white/50">
                      <span>1月</span>
                      <span>2月</span>
                      <span>3月</span>
                      <span>4月</span>
                      <span>5月</span>
                      <span>6月</span>
                    </div>
                  </div>

                  <div className="text-white/70 text-sm">
                    按当前等级和存入量，预计半年可获得
                    <span className="text-purple-300 font-medium ml-1">600</span>
                    <span className="text-white/70 ml-1">明星值收益</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  提升存粮等级
                </Button>
              </motion.div>
            </div>

            {/* 右侧：等级收益表 */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">等级收益表</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {directorLevels.map((level, index) => (
                    <motion.div
                      key={index}
                      className={`bg-black/60 border border-purple-500/10 rounded-lg p-4 ${
                        level.name === userLevel.name ? "ring-2 ring-purple-500/50" : ""
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${level.color} mr-2`}></div>
                          <span className="text-white font-medium">{level.name}</span>
                        </div>
                        {level.name === userLevel.name && (
                          <div className="px-2 py-1 rounded-full bg-purple-900/50 text-purple-300 text-xs">
                            当前等级
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-center my-4">
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500">
                          {level.interestRate}
                        </div>
                      </div>

                      <div className="text-white/70 text-sm text-center mb-3">年化利率</div>

                      {level.name !== userLevel.name && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                        >
                          升级条件
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-medium text-white mb-4">含嘉仓规则说明</h4>

                  <div className="bg-black/60 border border-purple-500/10 rounded-lg p-4">
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>用户明星值超过1万时自动激活含嘉仓功能，系统将自动存入1万明星值</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>存入的明星值将按照用户导演等级对应的年化利率产生收益</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>收益按周结算，自动添加到用户明星值账户中</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>用户可随时提取存入的明星值，但提取后需重新激活含嘉仓功能</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>导演等级越高，年化利率越高，最高可达20%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
