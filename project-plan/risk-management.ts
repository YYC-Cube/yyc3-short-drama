/**
 * 风险管理和应对策略
 */

export interface ProjectRisk {
  id: string
  name: string
  description: string
  category: "technical" | "business" | "resource" | "timeline" | "external"
  probability: number // 1-10
  impact: number // 1-10
  severity: "low" | "medium" | "high" | "critical"
  mitigation: string[]
  contingency: string[]
  owner: string
  status: "identified" | "monitoring" | "mitigating" | "resolved"
}

/**
 * 项目风险清单
 */
export const projectRisks: ProjectRisk[] = [
  {
    id: "risk-001",
    name: "AI接口稳定性风险",
    description: "第三方AI服务可能出现不稳定、限流或服务中断",
    category: "technical",
    probability: 7,
    impact: 8,
    severity: "high",
    mitigation: ["集成多个AI服务提供商", "实现本地缓存机制", "设计降级方案", "建立服务监控告警"],
    contingency: ["启用备用AI服务", "使用预生成内容", "人工审核补充"],
    owner: "ai-001",
    status: "identified",
  },
  {
    id: "risk-002",
    name: "用户数据安全风险",
    description: "用户个人信息和创作内容可能面临安全威胁",
    category: "technical",
    probability: 5,
    impact: 9,
    severity: "critical",
    mitigation: ["实施端到端加密", "定期安全审计", "遵循GDPR等法规", "建立安全响应机制"],
    contingency: ["立即隔离受影响系统", "通知用户和监管机构", "启动数据恢复程序"],
    owner: "be-001",
    status: "identified",
  },
  {
    id: "risk-003",
    name: "性能瓶颈风险",
    description: "用户增长可能导致系统性能下降",
    category: "technical",
    probability: 8,
    impact: 7,
    severity: "high",
    mitigation: ["实施负载均衡", "数据库优化", "CDN加速", "代码分割和懒加载"],
    contingency: ["紧急扩容", "限流措施", "优化关键路径"],
    owner: "fe-001",
    status: "identified",
  },
  {
    id: "risk-004",
    name: "关键人员流失风险",
    description: "核心团队成员离职可能影响项目进度",
    category: "resource",
    probability: 4,
    impact: 8,
    severity: "high",
    mitigation: ["知识文档化", "交叉培训", "代码审查制度", "竞争性薪酬"],
    contingency: ["快速招聘替代人员", "外包关键任务", "调整项目范围"],
    owner: "pm-001",
    status: "identified",
  },
  {
    id: "risk-005",
    name: "市场竞争风险",
    description: "竞争对手可能推出类似产品",
    category: "business",
    probability: 6,
    impact: 6,
    severity: "medium",
    mitigation: ["加快MVP发布", "建立技术壁垒", "强化用户体验", "建立品牌认知"],
    contingency: ["调整产品定位", "加强差异化", "价格策略调整"],
    owner: "pm-001",
    status: "identified",
  },
  {
    id: "risk-006",
    name: "技术债务积累风险",
    description: "快速开发可能导致代码质量下降",
    category: "technical",
    probability: 7,
    impact: 5,
    severity: "medium",
    mitigation: ["代码审查制度", "自动化测试", "重构计划", "技术债务跟踪"],
    contingency: ["专门重构迭代", "增加测试覆盖", "代码质量工具"],
    owner: "fe-001",
    status: "identified",
  },
  {
    id: "risk-007",
    name: "法规合规风险",
    description: "文化内容可能面临监管要求",
    category: "external",
    probability: 5,
    impact: 7,
    severity: "medium",
    mitigation: ["内容审核机制", "法律咨询", "合规检查", "用户协议完善"],
    contingency: ["内容下架机制", "法律应对", "政策调整"],
    owner: "pm-001",
    status: "identified",
  },
]

/**
 * 计算风险评分
 */
export function calculateRiskScore(risk: ProjectRisk): number {
  return risk.probability * risk.impact
}

/**
 * 获取高风险项目
 */
export function getHighRisks(): ProjectRisk[] {
  return projectRisks
    .filter((risk) => calculateRiskScore(risk) >= 35 || risk.severity === "critical")
    .sort((a, b) => calculateRiskScore(b) - calculateRiskScore(a))
}

/**
 * 生成风险矩阵
 */
export function generateRiskMatrix(): { [key: string]: ProjectRisk[] } {
  const matrix: { [key: string]: ProjectRisk[] } = {
    "low-low": [],
    "low-medium": [],
    "low-high": [],
    "medium-low": [],
    "medium-medium": [],
    "medium-high": [],
    "high-low": [],
    "high-medium": [],
    "high-high": [],
  }

  projectRisks.forEach((risk) => {
    const probLevel = risk.probability <= 3 ? "low" : risk.probability <= 6 ? "medium" : "high"
    const impactLevel = risk.impact <= 3 ? "low" : risk.impact <= 6 ? "medium" : "high"
    const key = `${probLevel}-${impactLevel}`

    if (matrix[key]) {
      matrix[key].push(risk)
    }
  })

  return matrix
}
