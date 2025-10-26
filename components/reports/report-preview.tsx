"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react"
import { generateExecutiveSummary, downloadReport } from "@/utils/report-generator"
import { overallMetrics, functionalityAnalysis } from "@/reports/functionality-analysis"

export default function ReportPreview() {
  const [downloadFormat, setDownloadFormat] = useState<"markdown" | "json" | "csv">("markdown")
  const executiveSummary = generateExecutiveSummary()

  const totalFeatures = functionalityAnalysis.reduce((sum, item) => sum + item.totalFeatures, 0)
  const implementedFeatures = functionalityAnalysis.reduce((sum, item) => sum + item.implementedFeatures, 0)
  const overallCompletion = Math.round((implementedFeatures / totalFeatures) * 100)

  const handleDownload = () => {
    downloadReport(downloadFormat)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* 报告标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">功能完整度分析报告</h1>
        <p className="text-white/70">『言语』逸品云享智能短剧·导演栈</p>
        <p className="text-white/50 text-sm mt-2">生成时间：{new Date().toLocaleString("zh-CN")}</p>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-black/40 border-amber-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{overallCompletion}%</div>
            <div className="text-white/70 text-sm">功能完成度</div>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-green-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{Math.round(overallMetrics.codeQuality * 100)}%</div>
            <div className="text-white/70 text-sm">代码质量</div>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{Math.round(overallMetrics.userExperience * 100)}%</div>
            <div className="text-white/70 text-sm">用户体验</div>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{executiveSummary.overallScore}</div>
            <div className="text-white/70 text-sm">综合评分</div>
          </CardContent>
        </Card>
      </div>

      {/* 执行摘要 */}
      <Card className="bg-black/40 border-amber-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-5 w-5 text-amber-400 mr-2" />
            执行摘要
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="strengths" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strengths">核心优势</TabsTrigger>
              <TabsTrigger value="challenges">主要挑战</TabsTrigger>
              <TabsTrigger value="recommendations">关键建议</TabsTrigger>
            </TabsList>

            <TabsContent value="strengths" className="mt-4">
              <div className="space-y-3">
                {executiveSummary.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-500/20 rounded-lg"
                  >
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90 text-sm">{strength}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="mt-4">
              <div className="space-y-3">
                {executiveSummary.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-orange-900/20 border border-orange-500/20 rounded-lg"
                  >
                    <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90 text-sm">{challenge}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-4">
              <div className="space-y-3">
                {executiveSummary.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg"
                  >
                    <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90 text-sm">{recommendation}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 功能模块概览 */}
      <Card className="bg-black/40 border-amber-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 text-amber-400 mr-2" />
            功能模块概览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {functionalityAnalysis.map((module, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-black/60 border border-amber-500/10 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{module.category}</h4>
                    <Badge
                      variant="outline"
                      className={`${
                        module.completionRate >= 0.8
                          ? "text-green-400 border-green-500/30"
                          : module.completionRate >= 0.6
                            ? "text-orange-400 border-orange-500/30"
                            : "text-red-400 border-red-500/30"
                      }`}
                    >
                      {Math.round(module.completionRate * 100)}%
                    </Badge>
                  </div>
                  <Progress value={module.completionRate * 100} className="h-2" />
                  <div className="text-white/60 text-sm mt-1">
                    {module.implementedFeatures}/{module.totalFeatures} 功能已实现
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 下载选项 */}
      <Card className="bg-black/40 border-amber-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="h-5 w-5 text-amber-400 mr-2" />
            导出报告
          </CardTitle>
          <CardDescription className="text-white/70">选择报告格式并下载完整的分析报告</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Button
                variant={downloadFormat === "markdown" ? "default" : "outline"}
                size="sm"
                onClick={() => setDownloadFormat("markdown")}
                className={downloadFormat === "markdown" ? "bg-amber-600" : "border-amber-500/30 text-amber-300"}
              >
                Markdown
              </Button>
              <Button
                variant={downloadFormat === "json" ? "default" : "outline"}
                size="sm"
                onClick={() => setDownloadFormat("json")}
                className={downloadFormat === "json" ? "bg-amber-600" : "border-amber-500/30 text-amber-300"}
              >
                JSON
              </Button>
              <Button
                variant={downloadFormat === "csv" ? "default" : "outline"}
                size="sm"
                onClick={() => setDownloadFormat("csv")}
                className={downloadFormat === "csv" ? "bg-amber-600" : "border-amber-500/30 text-amber-300"}
              >
                CSV
              </Button>
            </div>
            <Button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              下载报告
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
