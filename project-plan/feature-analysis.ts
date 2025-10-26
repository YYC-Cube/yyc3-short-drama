/**
 * 功能分析和优先级评估
 */

export interface FeatureAnalysis {
  id: string
  name: string
  description: string
  category: "core" | "enhancement" | "advanced" | "nice-to-have"
  priority: number // 1-10
  complexity: number // 1-10
  businessValue: number // 1-10
  userImpact: number // 1-10
  technicalRisk: number // 1-10
  estimatedEffort: number // 人天
  dependencies: string[]
  status: "not-started" | "in-progress" | "completed" | "cancelled"
}

/**
 * 完整功能分析
 */
export const featureAnalysis: FeatureAnalysis[] = [
  // 核心功能
  {
    id: "user-auth",
    name: "用户认证系统",
    description: "完整的用户注册、登录、权限管理",
    category: "core",
    priority: 10,
    complexity: 6,
    businessValue: 10,
    userImpact: 10,
    technicalRisk: 4,
    estimatedEffort: 15,
    dependencies: [],
    status: "not-started",
  },
  {
    id: "ai-script-generation",
    name: "AI剧本生成",
    description: "基于八卦原理的智能剧本创作",
    category: "core",
    priority: 9,
    complexity: 8,
    businessValue: 9,
    userImpact: 9,
    technicalRisk: 7,
    estimatedEffort: 20,
    dependencies: ["user-auth"],
    status: "not-started",
  },
  {
    id: "dialogue-converter",
    name: "古今对话转换",
    description: "现代台词转古风文言文",
    category: "core",
    priority: 8,
    complexity: 7,
    businessValue: 8,
    userImpact: 8,
    technicalRisk: 6,
    estimatedEffort: 12,
    dependencies: ["ai-script-generation"],
    status: "not-started",
  },
  {
    id: "content-management",
    name: "内容管理系统",
    description: "作品展示、搜索、分类管理",
    category: "core",
    priority: 8,
    complexity: 5,
    businessValue: 7,
    userImpact: 8,
    technicalRisk: 3,
    estimatedEffort: 10,
    dependencies: ["user-auth"],
    status: "not-started",
  },

  // 增强功能
  {
    id: "star-economy",
    name: "星值经济系统",
    description: "积分、任务、奖励机制",
    category: "enhancement",
    priority: 7,
    complexity: 6,
    businessValue: 8,
    userImpact: 7,
    technicalRisk: 5,
    estimatedEffort: 15,
    dependencies: ["user-auth", "content-management"],
    status: "not-started",
  },
  {
    id: "social-features",
    name: "社交功能",
    description: "关注、私信、创作者主页",
    category: "enhancement",
    priority: 6,
    complexity: 7,
    businessValue: 6,
    userImpact: 7,
    technicalRisk: 4,
    estimatedEffort: 18,
    dependencies: ["user-auth", "content-management"],
    status: "not-started",
  },
  {
    id: "creation-tools",
    name: "创作工具升级",
    description: "智能分镜、模板库、协作编辑",
    category: "enhancement",
    priority: 7,
    complexity: 8,
    businessValue: 7,
    userImpact: 8,
    technicalRisk: 6,
    estimatedEffort: 22,
    dependencies: ["ai-script-generation"],
    status: "not-started",
  },

  // 高级功能
  {
    id: "ar-experience",
    name: "AR沉浸式体验",
    description: "AR场景预览、3D虚拟角色",
    category: "advanced",
    priority: 5,
    complexity: 9,
    businessValue: 6,
    userImpact: 8,
    technicalRisk: 9,
    estimatedEffort: 30,
    dependencies: ["creation-tools"],
    status: "not-started",
  },
  {
    id: "nft-marketplace",
    name: "数字藏品交易",
    description: "NFT创作、交易、收藏",
    category: "advanced",
    priority: 4,
    complexity: 8,
    businessValue: 7,
    userImpact: 5,
    technicalRisk: 8,
    estimatedEffort: 25,
    dependencies: ["star-economy"],
    status: "not-started",
  },
  {
    id: "ai-recommendation",
    name: "智能推荐系统",
    description: "个性化内容推荐算法",
    category: "advanced",
    priority: 6,
    complexity: 8,
    businessValue: 7,
    userImpact: 6,
    technicalRisk: 6,
    estimatedEffort: 20,
    dependencies: ["content-management", "social-features"],
    status: "not-started",
  },

  // 锦上添花功能
  {
    id: "cultural-education",
    name: "文化教育模块",
    description: "河洛文化知识卡片、互动学习",
    category: "nice-to-have",
    priority: 3,
    complexity: 5,
    businessValue: 4,
    userImpact: 5,
    technicalRisk: 3,
    estimatedEffort: 12,
    dependencies: ["content-management"],
    status: "not-started",
  },
  {
    id: "live-streaming",
    name: "直播创作功能",
    description: "实时创作直播、观众互动",
    category: "nice-to-have",
    priority: 3,
    complexity: 9,
    businessValue: 5,
    userImpact: 6,
    technicalRisk: 8,
    estimatedEffort: 28,
    dependencies: ["social-features"],
    status: "not-started",
  },
]

/**
 * 计算功能优先级得分
 */
export function calculatePriorityScore(feature: FeatureAnalysis): number {
  const weights = {
    priority: 0.3,
    businessValue: 0.25,
    userImpact: 0.25,
    complexity: -0.1, // 复杂度越高分数越低
    technicalRisk: -0.1, // 风险越高分数越低
  }

  return (
    feature.priority * weights.priority +
    feature.businessValue * weights.businessValue +
    feature.userImpact * weights.userImpact +
    (10 - feature.complexity) * Math.abs(weights.complexity) +
    (10 - feature.technicalRisk) * Math.abs(weights.technicalRisk)
  )
}

/**
 * 获取MVP功能列表
 */
export function getMVPFeatures(): FeatureAnalysis[] {
  return featureAnalysis
    .filter((feature) => feature.category === "core")
    .sort((a, b) => calculatePriorityScore(b) - calculatePriorityScore(a))
}

/**
 * 获取功能依赖图
 */
export function getFeatureDependencyGraph(): Map<string, string[]> {
  const graph = new Map<string, string[]>()

  featureAnalysis.forEach((feature) => {
    graph.set(feature.id, feature.dependencies)
  })

  return graph
}
