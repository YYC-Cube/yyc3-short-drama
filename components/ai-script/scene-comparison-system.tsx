"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Eye, Wand2, Clock, MapPin, Save, Share2, Download, X } from "lucide-react"

// 模拟场景数据
const demoScenes = [
  {
    id: 1,
    name: "洛阳应天门",
    era: "唐代",
    image: "/placeholder.svg?height=300&width=500",
    description: "唐代洛阳城北门，气势恢宏的城门建筑",
  },
  {
    id: 2,
    name: "永宁寺塔",
    era: "北魏",
    image: "/placeholder.svg?height=300&width=500",
    description: "北魏时期的标志性佛教建筑，九层木塔",
  },
  {
    id: 3,
    name: "龙门石窟",
    era: "隋唐",
    image: "/placeholder.svg?height=300&width=500",
    description: "洛阳著名石窟，包含大量佛教造像",
  },
]

// 滤镜选项
const filterOptions = [
  { id: "original", name: "原始图像" },
  { id: "qingming", name: "清明上河图风格" },
  { id: "shuimo", name: "水墨画风格" },
  { id: "tangdynasty", name: "盛唐气象" },
  { id: "song", name: "宋韵风华" },
]

// 时代选项
const eraOptions = [
  { id: "pre-qin", name: "先��" },
  { id: "han", name: "汉代" },
  { id: "wei-jin", name: "魏晋" },
  { id: "tang", name: "唐代" },
  { id: "song", name: "宋代" },
  { id: "ming-qing", name: "明清" },
]

export default function SceneComparisonSystem() {
  const [selectedScenes, setSelectedScenes] = useState<number[]>([1, 2])
  const [activeTab, setActiveTab] = useState("compare")
  const [selectedFilter, setSelectedFilter] = useState("original")
  const [timeSlider, setTimeSlider] = useState([50])
  const [selectedEra, setSelectedEra] = useState("tang")

  // 获取选中的场景数据
  const getSelectedSceneData = (sceneId: number) => {
    return demoScenes.find((scene) => scene.id === sceneId) || demoScenes[0]
  }

  // 添加场景
  const addScene = (sceneId: number) => {
    if (!selectedScenes.includes(sceneId) && selectedScenes.length < 2) {
      setSelectedScenes([...selectedScenes, sceneId])
    }
  }

  // 移除场景
  const removeScene = (sceneId: number) => {
    setSelectedScenes(selectedScenes.filter((id) => id !== sceneId))
  }

  // 切换场景
  const toggleScene = (sceneId: number) => {
    if (selectedScenes.includes(sceneId)) {
      removeScene(sceneId)
    } else {
      addScene(sceneId)
    }
  }

  return (
    <Card className="w-full bg-white/5 backdrop-blur-md border-amber-500/20">
      <CardHeader className="border-b border-amber-500/20">
        <CardTitle className="text-2xl text-amber-300 flex items-center gap-2">
          <Eye className="h-6 w-6" />
          场景可视化比较系统
        </CardTitle>
        <CardDescription className="text-amber-200/70">
          上传、比较不同场景，应用文化风格滤镜，添加时空标注
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-black/20">
            <TabsTrigger
              value="compare"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              场景比较
            </TabsTrigger>
            <TabsTrigger
              value="filter"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              风格滤镜
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              <Clock className="h-4 w-4 mr-2" />
              时空标注
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compare" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                {selectedScenes.length === 0 ? (
                  <div className="w-full h-64 border-2 border-dashed border-amber-500/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="h-10 w-10 text-amber-500/50 mx-auto mb-2" />
                      <p className="text-amber-300">请选择场景进行比较</p>
                    </div>
                  </div>
                ) : (
                  selectedScenes.map((sceneId) => {
                    const scene = getSelectedSceneData(sceneId)
                    return (
                      <div key={sceneId} className="w-full relative">
                        <img
                          src={scene.image || "/placeholder.svg"}
                          alt={scene.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute top-2 right-2 bg-black/50 border-none text-white hover:bg-black/70"
                          onClick={() => removeScene(sceneId)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 rounded-b-lg">
                          <h4 className="text-amber-300 font-medium">{scene.name}</h4>
                          <p className="text-white/70 text-sm">{scene.era}</p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {demoScenes.map((scene) => (
                  <Button
                    key={scene.id}
                    variant={selectedScenes.includes(scene.id) ? "default" : "outline"}
                    className={`justify-start ${
                      selectedScenes.includes(scene.id)
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    }`}
                    onClick={() => toggleScene(scene.id)}
                    disabled={selectedScenes.length >= 2 && !selectedScenes.includes(scene.id)}
                  >
                    <img
                      src={scene.image || "/placeholder.svg"}
                      alt={scene.name}
                      className="w-8 h-8 object-cover rounded mr-2"
                    />
                    {scene.name}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 justify-start"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  上传新场景
                </Button>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                  <Save className="h-4 w-4 mr-2" />
                  保存比较
                </Button>
                <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                  <Share2 className="h-4 w-4 mr-2" />
                  分享
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="filter" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <label className="block text-amber-300 mb-2">选择风格滤镜</label>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="border-amber-500/30 bg-black/30 text-amber-200">
                    <SelectValue placeholder="选择风格滤镜" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-amber-500/30">
                    {filterOptions.map((filter) => (
                      <SelectItem key={filter.id} value={filter.id} className="text-amber-200">
                        {filter.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {selectedScenes.map((sceneId) => {
                  const scene = getSelectedSceneData(sceneId)
                  return (
                    <div key={sceneId} className="relative">
                      <div className="relative">
                        <img
                          src={scene.image || "/placeholder.svg"}
                          alt={scene.name}
                          className={`w-full h-64 object-cover rounded-lg ${
                            selectedFilter !== "original" ? "filter " + getFilterClass(selectedFilter) : ""
                          }`}
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {getFilterName(selectedFilter)}
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-amber-300 font-medium">{scene.name}</h4>
                        <p className="text-white/70 text-sm">{scene.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                  <Download className="h-4 w-4 mr-2" />
                  导出滤镜效果
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <label className="block text-amber-300 mb-2">时间轴滑动器</label>
                <div className="mb-4">
                  <Slider value={timeSlider} onValueChange={setTimeSlider} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-amber-200/70 text-xs mt-1">
                    <span>先秦</span>
                    <span>汉代</span>
                    <span>魏晋</span>
                    <span>唐代</span>
                    <span>宋代</span>
                    <span>明清</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-amber-300 mb-2">选择历史时代</label>
                <Select value={selectedEra} onValueChange={setSelectedEra}>
                  <SelectTrigger className="border-amber-500/30 bg-black/30 text-amber-200">
                    <SelectValue placeholder="选择历史时代" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-amber-500/30">
                    {eraOptions.map((era) => (
                      <SelectItem key={era.id} value={era.id} className="text-amber-200">
                        {era.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {selectedScenes.map((sceneId) => {
                  const scene = getSelectedSceneData(sceneId)
                  return (
                    <div key={sceneId} className="relative">
                      <div className="relative">
                        <img
                          src={scene.image || "/placeholder.svg"}
                          alt={scene.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="flex items-center text-white mb-1">
                            <Clock className="h-4 w-4 mr-1 text-amber-400" />
                            <span className="text-sm">{getEraName(selectedEra)} (公元618-907年)</span>
                          </div>
                          <div className="flex items-center text-white">
                            <MapPin className="h-4 w-4 mr-1 text-amber-400" />
                            <span className="text-sm">洛阳城 - {scene.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-amber-300 font-medium">
                          {scene.name} ({getEraName(selectedEra)}版本)
                        </h4>
                        <p className="text-white/70 text-sm">
                          根据历史文献和考古发现重建的{getEraName(selectedEra)}时期{scene.name}场景
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                  <Save className="h-4 w-4 mr-2" />
                  保存时空标注
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// 辅助函数
function getFilterClass(filterId: string): string {
  switch (filterId) {
    case "qingming":
      return "sepia brightness-90 contrast-110"
    case "shuimo":
      return "grayscale contrast-125 brightness-110"
    case "tangdynasty":
      return "saturate-150 brightness-105 contrast-105"
    case "song":
      return "sepia-[.3] saturate-110 brightness-95"
    default:
      return ""
  }
}

function getFilterName(filterId: string): string {
  const filter = filterOptions.find((f) => f.id === filterId)
  return filter ? filter.name : "原始图像"
}

function getEraName(eraId: string): string {
  const era = eraOptions.find((e) => e.id === eraId)
  return era ? era.name : "唐代"
}
