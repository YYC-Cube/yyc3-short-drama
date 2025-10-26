"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { BarChart3, PieChartIcon, LineChartIcon, TrendingUp, Users, BookOpen } from "lucide-react"

// 模拟数据
const creationTrendData = [
  { month: "1月", count: 65 },
  { month: "2月", count: 59 },
  { month: "3月", count: 80 },
  { month: "4月", count: 81 },
  { month: "5月", count: 56 },
  { month: "6月", count: 55 },
  { month: "7月", count: 40 },
  { month: "8月", count: 70 },
  { month: "9月", count: 90 },
  { month: "10月", count: 110 },
  { month: "11月", count: 130 },
  { month: "12月", count: 150 },
]

const culturalElementsData = [
  { name: "河图洛书", value: 400, color: "#FF8042" },
  { name: "诗经典故", value: 300, color: "#00C49F" },
  { name: "唐诗元素", value: 300, color: "#FFBB28" },
  { name: "宋词意境", value: 200, color: "#0088FE" },
  { name: "汉服元素", value: 100, color: "#FF6B6B" },
]

const userEngagementData = [
  { day: "周一", views: 4000, likes: 2400, shares: 1200 },
  { day: "周二", views: 3000, likes: 1398, shares: 800 },
  { day: "周三", views: 2000, likes: 9800, shares: 1800 },
  { day: "周四", views: 2780, likes: 3908, shares: 2000 },
  { day: "周五", views: 1890, likes: 4800, shares: 2181 },
  { day: "周六", views: 2390, likes: 3800, shares: 2500 },
  { day: "周日", views: 3490, likes: 4300, shares: 2100 },
]

const popularScriptTypes = [
  { type: "历史传奇", count: 120 },
  { type: "古风言情", count: 98 },
  { type: "武侠世界", count: 86 },
  { type: "仙侠奇谭", count: 75 },
  { type: "宫廷秘史", count: 62 },
]

export default function AdvancedAnalyticsPanel() {
  const [activeTab, setActiveTab] = useState("trends")

  return (
    <Card className="w-full bg-white/5 backdrop-blur-md border-amber-500/20">
      <CardHeader className="border-b border-amber-500/20">
        <CardTitle className="text-2xl text-amber-300 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          高级数据分析中心
        </CardTitle>
        <CardDescription className="text-amber-200/70">
          深入洞察创作趋势、文化元素使用频率与用户互动数据
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-black/20">
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              创作趋势
            </TabsTrigger>
            <TabsTrigger
              value="elements"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              <PieChartIcon className="h-4 w-4 mr-2" />
              文化元素
            </TabsTrigger>
            <TabsTrigger
              value="engagement"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              <LineChartIcon className="h-4 w-4 mr-2" />
              用户互动
            </TabsTrigger>
            <TabsTrigger
              value="popular"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              <Users className="h-4 w-4 mr-2" />
              热门类型
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-80"
            >
              <h3 className="text-lg font-medium text-amber-200 mb-4">月度创作数量趋势</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={creationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
                    labelStyle={{ color: "#eee" }}
                  />
                  <Bar dataKey="count" fill="#f59e0b" name="创作数量" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <Card className="bg-amber-900/20 border-amber-500/20">
                  <CardContent className="p-4 flex flex-col items-center">
                    <p className="text-amber-300 text-sm">总创作数</p>
                    <p className="text-2xl font-bold text-white">1,286</p>
                  </CardContent>
                </Card>
                <Card className="bg-amber-900/20 border-amber-500/20">
                  <CardContent className="p-4 flex flex-col items-center">
                    <p className="text-amber-300 text-sm">月增长率</p>
                    <p className="text-2xl font-bold text-green-400">+15.3%</p>
                  </CardContent>
                </Card>
                <Card className="bg-amber-900/20 border-amber-500/20">
                  <CardContent className="p-4 flex flex-col items-center">
                    <p className="text-amber-300 text-sm">完成率</p>
                    <p className="text-2xl font-bold text-white">78.2%</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="elements" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-80"
            >
              <h3 className="text-lg font-medium text-amber-200 mb-4">文化元素使用分布</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={culturalElementsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {culturalElementsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
                    labelStyle={{ color: "#eee" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {culturalElementsData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-amber-200/80">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="engagement" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-80"
            >
              <h3 className="text-lg font-medium text-amber-200 mb-4">用户互动数据</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="day" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
                    labelStyle={{ color: "#eee" }}
                  />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" name="浏览量" />
                  <Line type="monotone" dataKey="likes" stroke="#f59e0b" name="点赞数" />
                  <Line type="monotone" dataKey="shares" stroke="#82ca9d" name="分享数" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <Card className="bg-amber-900/20 border-amber-500/20">
                  <CardContent className="p-4 flex flex-col items-center">
                    <p className="text-amber-300 text-sm">平均停留时间</p>
                    <p className="text-2xl font-bold text-white">4分32秒</p>
                  </CardContent>
                </Card>
                <Card className="bg-amber-900/20 border-amber-500/20">
                  <CardContent className="p-4 flex flex-col items-center">
                    <p className="text-amber-300 text-sm">互动转化率</p>
                    <p className="text-2xl font-bold text-white">23.7%</p>
                  </CardContent>
                </Card>
                <Card className="bg-amber-900/20 border-amber-500/20">
                  <CardContent className="p-4 flex flex-col items-center">
                    <p className="text-amber-300 text-sm">回访率</p>
                    <p className="text-2xl font-bold text-white">68.5%</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="popular" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-80"
            >
              <h3 className="text-lg font-medium text-amber-200 mb-4">热门剧本类型</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={popularScriptTypes}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis type="number" stroke="#999" />
                  <YAxis dataKey="type" type="category" stroke="#999" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
                    labelStyle={{ color: "#eee" }}
                  />
                  <Bar dataKey="count" fill="#f59e0b" name="创作数量" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <Card className="bg-amber-900/20 border-amber-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-amber-400 mr-2" />
                        <span className="text-amber-300">推荐创作方向</span>
                      </div>
                      <span className="text-white font-medium">古风言情 + 历史元素</span>
                    </div>
                    <p className="text-amber-200/70 text-sm mt-2">
                      基于当前数据分析，结合古风言情与历史元素的剧本最受欢迎，建议在创作中融入更多河洛文化特色
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
