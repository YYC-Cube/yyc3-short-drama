"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FolderTree,
  Play,
  CheckCircle,
  AlertTriangle,
  FileText,
  Copy,
  Trash2,
  Move,
  Zap,
  RefreshCw,
  Download,
  Settings,
} from "lucide-react"

// 文件结构分析结果
interface FileIssue {
  type: "duplicate" | "misplaced" | "unused" | "large" | "naming"
  severity: "high" | "medium" | "low"
  file: string
  description: string
  suggestion: string
  size?: string
  location?: string
}

// 模拟文件结构数据
const fileStructure = {
  totalFiles: 156,
  totalSize: "2.3 MB",
  lastScan: "2024-01-08 14:30:00",
  issues: [
    {
      type: "duplicate" as const,
      severity: "high" as const,
      file: "components/social-system/header.tsx",
      description: "与 components/shared/header.tsx 内容重复度达85%",
      suggestion: "合并为通用组件，使用props控制差异化显示",
      size: "4.2KB",
      location: "components/social-system/",
    },
    {
      type: "duplicate" as const,
      severity: "medium" as const,
      file: "components/auth/header.tsx",
      description: "与其他header组件存在代码重复",
      suggestion: "提取公共逻辑到shared/universal-header.tsx",
      size: "3.8KB",
      location: "components/auth/",
    },
    {
      type: "misplaced" as const,
      severity: "medium" as const,
      file: "components/ui/use-mobile.tsx",
      description: "Hook文件放置在UI组件目录中",
      suggestion: "移动到 hooks/ 目录，保持文件组织一致性",
      size: "1.2KB",
      location: "components/ui/",
    },
    {
      type: "unused" as const,
      severity: "low" as const,
      file: "components/home/features-overview.test.tsx",
      description: "测试文件未被引用，可能已过时",
      suggestion: "检查测试是否仍然有效，或移除过时测试",
      size: "2.1KB",
      location: "components/home/",
    },
    {
      type: "large" as const,
      severity: "medium" as const,
      file: "components/social-system/holographic-screen.tsx",
      description: "文件过大(8.5KB)，包含过多功能",
      suggestion: "拆分为多个子组件，提高可维护性",
      size: "8.5KB",
      location: "components/social-system/",
    },
    {
      type: "naming" as const,
      severity: "low" as const,
      file: "app/ai-script/page-copy.tsx",
      description: "文件命名不规范，包含-copy后缀",
      suggestion: "重命名为更具描述性的名称",
      size: "3.2KB",
      location: "app/ai-script/",
    },
  ] as FileIssue[],
}

// 优化建议
const optimizationSuggestions = [
  {
    category: "代码复用",
    priority: "高",
    items: ["创建通用Header组件，减少重复代码", "提取公共样式到shared/styles目录", "建立组件库索引文件，便于导入管理"],
  },
  {
    category: "文件组织",
    priority: "中",
    items: ["统一Hook文件到hooks目录", "按功能模块重新组织组件结构", "建立清晰的文件命名规范"],
  },
  {
    category: "性能优化",
    priority: "中",
    items: ["拆分大型组件文件", "移除未使用的文件和依赖", "优化图片和静态资源组织"],
  },
]

// 文件树结构
const fileTree = {
  name: "项目根目录",
  type: "folder",
  children: [
    {
      name: "app",
      type: "folder",
      children: [
        { name: "page.tsx", type: "file", size: "2.1KB" },
        { name: "layout.tsx", type: "file", size: "1.8KB" },
        { name: "globals.css", type: "file", size: "3.2KB" },
        {
          name: "ai-script",
          type: "folder",
          children: [
            { name: "page.tsx", type: "file", size: "4.5KB" },
            { name: "page-copy.tsx", type: "file", size: "3.2KB", issue: true },
          ],
        },
      ],
    },
    {
      name: "components",
      type: "folder",
      children: [
        {
          name: "ui",
          type: "folder",
          children: [
            { name: "button.tsx", type: "file", size: "2.1KB" },
            { name: "card.tsx", type: "file", size: "1.5KB" },
            { name: "use-mobile.tsx", type: "file", size: "1.2KB", issue: true },
          ],
        },
        {
          name: "shared",
          type: "folder",
          children: [
            { name: "header.tsx", type: "file", size: "4.2KB" },
            { name: "footer.tsx", type: "file", size: "2.8KB" },
          ],
        },
        {
          name: "social-system",
          type: "folder",
          children: [
            { name: "header.tsx", type: "file", size: "4.2KB", issue: true },
            { name: "holographic-screen.tsx", type: "file", size: "8.5KB", issue: true },
          ],
        },
      ],
    },
    {
      name: "hooks",
      type: "folder",
      children: [
        { name: "use-mobile.tsx", type: "file", size: "1.1KB" },
        { name: "use-toast.ts", type: "file", size: "0.8KB" },
      ],
    },
  ],
}

export default function FileStructureOptimizer() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedIssues, setSelectedIssues] = useState<string[]>([])

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 开始扫描
  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)

    // 模拟扫描进度
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  // 获取问题类型的显示信息
  const getIssueTypeInfo = (type: string) => {
    switch (type) {
      case "duplicate":
        return { label: "重复文件", color: "bg-red-500", icon: Copy }
      case "misplaced":
        return { label: "位置错误", color: "bg-yellow-500", icon: Move }
      case "unused":
        return { label: "未使用", color: "bg-gray-500", icon: Trash2 }
      case "large":
        return { label: "文件过大", color: "bg-orange-500", icon: FileText }
      case "naming":
        return { label: "命名问题", color: "bg-blue-500", icon: FileText }
      default:
        return { label: "其他", color: "bg-gray-500", icon: FileText }
    }
  }

  // 获取严重程度颜色
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  // 切换问题选择
  const toggleIssueSelection = (file: string) => {
    setSelectedIssues((prev) => (prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]))
  }

  // 渲染文件树
  const renderFileTree = (node: any, level = 0) => {
    const indent = level * 20

    return (
      <div key={node.name} style={{ marginLeft: `${indent}px` }}>
        <div
          className={`flex items-center py-1 px-2 rounded hover:bg-blue-900/20 ${node.issue ? "bg-red-900/20" : ""}`}
        >
          {node.type === "folder" ? (
            <FolderTree className="h-4 w-4 text-blue-400 mr-2" />
          ) : (
            <FileText className="h-4 w-4 text-white/70 mr-2" />
          )}
          <span className={`text-sm ${node.issue ? "text-red-300" : "text-white/90"}`}>{node.name}</span>
          {node.size && <span className="text-xs text-white/50 ml-auto">{node.size}</span>}
          {node.issue && <AlertTriangle className="h-3 w-3 text-red-400 ml-2" />}
        </div>
        {node.children && node.children.map((child: any) => renderFileTree(child, level + 1))}
      </div>
    )
  }

  return (
    <section ref={ref} className="py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <FolderTree className="h-6 w-6 text-green-400 mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">文件结构优化器</h2>
        </div>
        <p className="text-white/70 max-w-3xl">
          智能扫描项目文件结构，识别重复文件、位置错误、未使用文件等问题，
          提供具体的优化建议，提升代码组织质量和维护效率。
        </p>
      </motion.div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            概览
          </TabsTrigger>
          <TabsTrigger value="issues" className="data-[state=active]:bg-green-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            问题详情
          </TabsTrigger>
          <TabsTrigger value="structure" className="data-[state=active]:bg-green-600">
            <FolderTree className="h-4 w-4 mr-2" />
            文件结构
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="data-[state=active]:bg-green-600">
            <Zap className="h-4 w-4 mr-2" />
            优化建议
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 扫描控制 */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FolderTree className="h-5 w-5 mr-2 text-green-400" />
                    文件结构扫描
                  </CardTitle>
                  <CardDescription className="text-white/70">上次扫描：{fileStructure.lastScan}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">项目文件统计</div>
                        <div className="text-white/70 text-sm">
                          总计 {fileStructure.totalFiles} 个文件，{fileStructure.totalSize}
                        </div>
                      </div>
                      <Button
                        onClick={startScan}
                        disabled={isScanning}
                        className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                      >
                        {isScanning ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            扫描中...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            开始扫描
                          </>
                        )}
                      </Button>
                    </div>

                    {isScanning && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">扫描进度</span>
                          <span className="text-white">{scanProgress}%</span>
                        </div>
                        <Progress value={scanProgress} className="h-2" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">
                          {fileStructure.issues.filter((i) => i.type === "duplicate").length}
                        </div>
                        <div className="text-white/70 text-sm">重复文件</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">
                          {fileStructure.issues.filter((i) => i.type === "misplaced").length}
                        </div>
                        <div className="text-white/70 text-sm">位置错误</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400">
                          {fileStructure.issues.filter((i) => i.type === "unused").length}
                        </div>
                        <div className="text-white/70 text-sm">未使用</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-400">
                          {fileStructure.issues.filter((i) => i.type === "large").length}
                        </div>
                        <div className="text-white/70 text-sm">文件过大</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 问题摘要 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">问题摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">高优先级</span>
                    <div className="flex items-center">
                      <span className="text-red-400 font-bold text-xl">
                        {fileStructure.issues.filter((i) => i.severity === "high").length}
                      </span>
                      <span className="text-white/50 ml-1">项</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">中优先级</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400 font-bold text-xl">
                        {fileStructure.issues.filter((i) => i.severity === "medium").length}
                      </span>
                      <span className="text-white/50 ml-1">项</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">低优先级</span>
                    <div className="flex items-center">
                      <span className="text-green-400 font-bold text-xl">
                        {fileStructure.issues.filter((i) => i.severity === "low").length}
                      </span>
                      <span className="text-white/50 ml-1">项</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-green-500/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">总问题数</span>
                      <span className="text-white font-bold text-xl">{fileStructure.issues.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="issues" className="mt-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-green-400" />
                    发现的问题详情
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/30 text-green-300 hover:bg-green-500/10 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      导出报告
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={selectedIssues.length === 0}
                      className="border-green-500/30 text-green-300 hover:bg-green-500/10 bg-transparent"
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      批量修复 ({selectedIssues.length})
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fileStructure.issues.map((issue, index) => {
                    const typeInfo = getIssueTypeInfo(issue.type)
                    const IconComponent = typeInfo.icon

                    return (
                      <div
                        key={index}
                        className="bg-black/60 border border-green-500/10 rounded-lg p-4 hover:bg-green-900/10 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedIssues.includes(issue.file)}
                              onChange={() => toggleIssueSelection(issue.file)}
                              className="rounded border-green-500/30"
                            />
                            <IconComponent className="h-5 w-5 text-green-400" />
                            <div>
                              <h4 className="text-white font-medium">{issue.file}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
                                <span className={`text-sm ${getSeverityColor(issue.severity)}`}>
                                  {issue.severity === "high"
                                    ? "高优先级"
                                    : issue.severity === "medium"
                                      ? "中优先级"
                                      : "低优先级"}
                                </span>
                                {issue.size && <span className="text-white/50 text-sm">{issue.size}</span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="ml-8 space-y-2">
                          <p className="text-white/80 text-sm">{issue.description}</p>
                          <div className="bg-green-900/20 border border-green-500/20 rounded p-3">
                            <div className="text-green-300 text-sm font-medium mb-1">建议解决方案：</div>
                            <p className="text-green-200/80 text-sm">{issue.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="structure" className="mt-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FolderTree className="h-5 w-5 mr-2 text-green-400" />
                  项目文件结构
                </CardTitle>
                <CardDescription className="text-white/70">红色标记的文件存在问题，需要优化</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black/60 border border-green-500/10 rounded-lg p-4 max-h-96 overflow-y-auto">
                  {renderFileTree(fileTree)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="suggestions" className="mt-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="space-y-6">
              {optimizationSuggestions.map((suggestion, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-sm border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-green-400" />
                        {suggestion.category}
                      </div>
                      <Badge
                        className={
                          suggestion.priority === "高"
                            ? "bg-red-500"
                            : suggestion.priority === "中"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }
                      >
                        {suggestion.priority}优先级
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {suggestion.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800">
          <Settings className="h-4 w-4 mr-2" />
          优化设置
        </Button>
      </motion.div>
    </section>
  )
}
