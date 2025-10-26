/**
 * MVP项目路线图
 * 详细的开发计划和里程碑
 */

export interface ProjectMilestone {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  status: "planning" | "in-progress" | "completed" | "delayed"
  priority: "critical" | "high" | "medium" | "low"
  dependencies: string[]
  deliverables: string[]
  assignee?: string
  progress: number
}

export interface ProjectPhase {
  id: string
  name: string
  description: string
  duration: number // 周数
  milestones: ProjectMilestone[]
  budget: number // 人天
  risks: string[]
}

/**
 * MVP开发路线图
 */
export const mvpRoadmap: ProjectPhase[] = [
  {
    id: "phase-1",
    name: "MVP核心功能开发",
    description: "实现最基础的用户系统和AI剧本创作功能",
    duration: 4,
    budget: 80,
    risks: ["AI接口稳定性风险", "用户认证安全风险", "性能优化挑战"],
    milestones: [
      {
        id: "milestone-1-1",
        name: "用户认证系统",
        description: "完整的用户注册、登录、权限管理系统",
        startDate: "2024-01-01",
        endDate: "2024-01-07",
        status: "planning",
        priority: "critical",
        dependencies: [],
        progress: 0,
        deliverables: ["用户注册页面", "登录页面", "个人资料页面", "JWT认证中间件", "权限控制组件"],
      },
      {
        id: "milestone-1-2",
        name: "AI剧本生成核心",
        description: "基础的八卦剧本生成和古今对话转换",
        startDate: "2024-01-08",
        endDate: "2024-01-14",
        status: "planning",
        priority: "critical",
        dependencies: ["milestone-1-1"],
        progress: 0,
        deliverables: ["八卦剧本生成器", "古今对话转换器", "AI接口封装", "剧本编辑器", "模板系统"],
      },
      {
        id: "milestone-1-3",
        name: "内容管理系统",
        description: "作品展示、搜索、分类功能",
        startDate: "2024-01-15",
        endDate: "2024-01-21",
        status: "planning",
        priority: "high",
        dependencies: ["milestone-1-2"],
        progress: 0,
        deliverables: ["作品列表页面", "作品详情页面", "搜索功能", "分类筛选", "作品管理后台"],
      },
      {
        id: "milestone-1-4",
        name: "基础交互功能",
        description: "点赞、收藏、评论、分享功能",
        startDate: "2024-01-22",
        endDate: "2024-01-28",
        status: "planning",
        priority: "medium",
        dependencies: ["milestone-1-3"],
        progress: 0,
        deliverables: ["点赞收藏组件", "评论系统", "分享功能", "通知系统", "用户反馈收集"],
      },
    ],
  },
  {
    id: "phase-2",
    name: "功能增强与优化",
    description: "添加星值经济、创作工具升级、社交功能",
    duration: 6,
    budget: 120,
    risks: ["积分系统安全风险", "社交功能复杂度", "性能瓶颈问题"],
    milestones: [
      {
        id: "milestone-2-1",
        name: "星值经济系统",
        description: "明星值积分、任务系统、奖励机制",
        startDate: "2024-01-29",
        endDate: "2024-02-11",
        status: "planning",
        priority: "high",
        dependencies: ["milestone-1-4"],
        progress: 0,
        deliverables: ["积分系统", "任务管理", "奖励发放", "积分商城", "交易记录"],
      },
      {
        id: "milestone-2-2",
        name: "创作工具升级",
        description: "智能分镜、模板库、协作编辑",
        startDate: "2024-02-12",
        endDate: "2024-02-25",
        status: "planning",
        priority: "high",
        dependencies: ["milestone-2-1"],
        progress: 0,
        deliverables: ["智能分镜工具", "模板库系统", "协作编辑器", "版本控制", "导出功能"],
      },
      {
        id: "milestone-2-3",
        name: "社交功能开发",
        description: "关注系统、私信、创作者主页",
        startDate: "2024-02-26",
        endDate: "2024-03-11",
        status: "planning",
        priority: "medium",
        dependencies: ["milestone-2-2"],
        progress: 0,
        deliverables: ["关注/粉丝系统", "私信功能", "创作者主页", "动态时间线", "社交推荐"],
      },
      {
        id: "milestone-2-4",
        name: "文化元素集成",
        description: "河洛文化素材库、古风主题、知识卡片",
        startDate: "2024-03-12",
        endDate: "2024-03-18",
        status: "planning",
        priority: "medium",
        dependencies: ["milestone-2-3"],
        progress: 0,
        deliverables: ["文化素材库", "古风UI主题", "知识卡片系统", "文化标签", "教育内容"],
      },
    ],
  },
  {
    id: "phase-3",
    name: "高级功能与商业化",
    description: "沉浸式体验、商业化功能、数据智能",
    duration: 8,
    budget: 160,
    risks: ["AR/VR技术复杂度", "支付系统安全", "算法推荐准确性"],
    milestones: [
      {
        id: "milestone-3-1",
        name: "沉浸式体验开发",
        description: "AR场景、3D角色、时空穿越效果",
        startDate: "2024-03-19",
        endDate: "2024-04-08",
        status: "planning",
        priority: "high",
        dependencies: ["milestone-2-4"],
        progress: 0,
        deliverables: ["AR场景预览", "3D虚拟角色", "时空穿越效果", "WebXR集成", "设备兼容性"],
      },
      {
        id: "milestone-3-2",
        name: "商业化功能",
        description: "付费内容、收益分成、数字藏品",
        startDate: "2024-04-09",
        endDate: "2024-04-29",
        status: "planning",
        priority: "high",
        dependencies: ["milestone-3-1"],
        progress: 0,
        deliverables: ["付费内容系统", "收益分成机制", "数字藏品交易", "支付集成", "财务管理"],
      },
      {
        id: "milestone-3-3",
        name: "数据智能系统",
        description: "个性化推荐、数据分析、用户洞察",
        startDate: "2024-04-30",
        endDate: "2024-05-20",
        status: "planning",
        priority: "medium",
        dependencies: ["milestone-3-2"],
        progress: 0,
        deliverables: ["推荐算法", "数据分析仪表板", "用户行为追踪", "A/B测试框架", "智能标签系统"],
      },
      {
        id: "milestone-3-4",
        name: "平台优化与发布",
        description: "性能优化、安全加固、正式发布",
        startDate: "2024-05-21",
        endDate: "2024-05-27",
        status: "planning",
        priority: "critical",
        dependencies: ["milestone-3-3"],
        progress: 0,
        deliverables: ["性能优化", "安全审计", "压力测试", "部署自动化", "监控告警"],
      },
    ],
  },
]

/**
 * 获取项目总体进度
 */
export function getOverallProgress(): number {
  const allMilestones = mvpRoadmap.flatMap((phase) => phase.milestones)
  const totalProgress = allMilestones.reduce((sum, milestone) => sum + milestone.progress, 0)
  return totalProgress / allMilestones.length
}

/**
 * 获取当前阶段
 */
export function getCurrentPhase(): ProjectPhase | null {
  return (
    mvpRoadmap.find((phase) =>
      phase.milestones.some((milestone) => milestone.status === "in-progress" || milestone.status === "planning"),
    ) || null
  )
}

/**
 * 获取关键路径
 */
export function getCriticalPath(): ProjectMilestone[] {
  return mvpRoadmap
    .flatMap((phase) => phase.milestones)
    .filter((milestone) => milestone.priority === "critical")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
}
