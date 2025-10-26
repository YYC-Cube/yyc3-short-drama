/**
 * 资源分配和团队规划
 */

export interface TeamMember {
  id: string
  name: string
  role: "frontend" | "backend" | "fullstack" | "ui-ux" | "ai-ml" | "devops" | "pm"
  level: "junior" | "mid" | "senior" | "lead"
  skills: string[]
  availability: number // 0-1
  hourlyRate: number
}

export interface ResourcePlan {
  phase: string
  duration: number // 周数
  teamComposition: {
    memberId: string
    allocation: number // 0-1
    responsibilities: string[]
  }[]
  budget: number
  milestones: string[]
}

/**
 * 团队成员配置
 */
export const teamMembers: TeamMember[] = [
  {
    id: "pm-001",
    name: "项目经理",
    role: "pm",
    level: "senior",
    skills: ["项目管理", "需求分析", "风险控制", "Scrum"],
    availability: 1.0,
    hourlyRate: 150,
  },
  {
    id: "fe-001",
    name: "前端架构师",
    role: "frontend",
    level: "lead",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    availability: 1.0,
    hourlyRate: 200,
  },
  {
    id: "fe-002",
    name: "前端开发工程师",
    role: "frontend",
    level: "mid",
    skills: ["React", "JavaScript", "CSS", "HTML5", "Responsive Design"],
    availability: 1.0,
    hourlyRate: 120,
  },
  {
    id: "be-001",
    name: "后端架构师",
    role: "backend",
    level: "lead",
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "AWS", "Docker"],
    availability: 1.0,
    hourlyRate: 180,
  },
  {
    id: "fs-001",
    name: "全栈开发工程师",
    role: "fullstack",
    level: "senior",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "GraphQL"],
    availability: 1.0,
    hourlyRate: 160,
  },
  {
    id: "ai-001",
    name: "AI算法工程师",
    role: "ai-ml",
    level: "senior",
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "GPT", "LangChain"],
    availability: 0.8,
    hourlyRate: 220,
  },
  {
    id: "ui-001",
    name: "UI/UX设计师",
    role: "ui-ux",
    level: "senior",
    skills: ["Figma", "Adobe Creative Suite", "用户体验设计", "交互设计"],
    availability: 0.6,
    hourlyRate: 140,
  },
  {
    id: "devops-001",
    name: "DevOps工程师",
    role: "devops",
    level: "mid",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    availability: 0.5,
    hourlyRate: 130,
  },
]

/**
 * 资源分配计划
 */
export const resourcePlans: ResourcePlan[] = [
  {
    phase: "MVP核心功能开发",
    duration: 4,
    budget: 120000,
    milestones: ["用户认证系统", "AI剧本生成核心", "内容管理系统", "基础交互功能"],
    teamComposition: [
      {
        memberId: "pm-001",
        allocation: 1.0,
        responsibilities: ["项目协调", "需求管理", "风险控制", "进度跟踪"],
      },
      {
        memberId: "fe-001",
        allocation: 1.0,
        responsibilities: ["前端架构设计", "核心组件开发", "代码审查", "技术指导"],
      },
      {
        memberId: "fe-002",
        allocation: 1.0,
        responsibilities: ["UI组件开发", "页面实现", "样式优化", "响应式适配"],
      },
      {
        memberId: "be-001",
        allocation: 1.0,
        responsibilities: ["后端架构设计", "API开发", "数据库设计", "安全实现"],
      },
      {
        memberId: "ai-001",
        allocation: 0.8,
        responsibilities: ["AI模型集成", "剧本生成算法", "对话转换优化"],
      },
      {
        memberId: "ui-001",
        allocation: 0.6,
        responsibilities: ["界面设计", "用户体验优化", "设计规范制定"],
      },
      {
        memberId: "devops-001",
        allocation: 0.3,
        responsibilities: ["环境搭建", "部署配置", "监控设置"],
      },
    ],
  },
  {
    phase: "功能增强与优化",
    duration: 6,
    budget: 180000,
    milestones: ["星值经济系统", "创作工具升级", "社交功能开发", "文化元素集成"],
    teamComposition: [
      {
        memberId: "pm-001",
        allocation: 1.0,
        responsibilities: ["项目管理", "跨团队协调", "质量控制", "用户反馈收集"],
      },
      {
        memberId: "fe-001",
        allocation: 1.0,
        responsibilities: ["高级组件开发", "性能优化", "架构重构", "团队指导"],
      },
      {
        memberId: "fe-002",
        allocation: 1.0,
        responsibilities: ["功能开发", "交互实现", "测试编写", "文档维护"],
      },
      {
        memberId: "fs-001",
        allocation: 1.0,
        responsibilities: ["全栈功能开发", "API集成", "数据处理", "业务逻辑实现"],
      },
      {
        memberId: "be-001",
        allocation: 0.8,
        responsibilities: ["系统优化", "扩展性设计", "安全加固", "性能调优"],
      },
      {
        memberId: "ai-001",
        allocation: 0.6,
        responsibilities: ["推荐算法", "智能分析", "模型优化"],
      },
      {
        memberId: "ui-001",
        allocation: 0.8,
        responsibilities: ["高级交互设计", "动效设计", "用户体验测试"],
      },
      {
        memberId: "devops-001",
        allocation: 0.5,
        responsibilities: ["自动化部署", "监控优化", "容量规划"],
      },
    ],
  },
  {
    phase: "高级功能与商业化",
    duration: 8,
    budget: 240000,
    milestones: ["沉浸式体验开发", "商业化功能", "数据智能系统", "平台优化与发布"],
    teamComposition: [
      {
        memberId: "pm-001",
        allocation: 1.0,
        responsibilities: ["产品规划", "商业化策略", "发布管理", "用户运营"],
      },
      {
        memberId: "fe-001",
        allocation: 1.0,
        responsibilities: ["AR/VR集成", "高级特效", "性能极致优化", "技术创新"],
      },
      {
        memberId: "fe-002",
        allocation: 1.0,
        responsibilities: ["商业化界面", "支付集成", "数据可视化", "用户体验优化"],
      },
      {
        memberId: "fs-001",
        allocation: 1.0,
        responsibilities: ["支付系统", "数据分析", "推荐引擎", "业务逻辑完善"],
      },
      {
        memberId: "be-001",
        allocation: 1.0,
        responsibilities: ["高并发优化", "数据安全", "系统稳定性", "扩展架构"],
      },
      {
        memberId: "ai-001",
        allocation: 1.0,
        responsibilities: ["智能推荐", "数据挖掘", "机器学习", "算法优化"],
      },
      {
        memberId: "ui-001",
        allocation: 0.6,
        responsibilities: ["品牌视觉", "营销素材", "用户指引设计"],
      },
      {
        memberId: "devops-001",
        allocation: 0.8,
        responsibilities: ["生产环境", "安全加固", "性能监控", "灾备方案"],
      },
    ],
  },
]

/**
 * 计算阶段总成本
 */
export function calculatePhaseCost(plan: ResourcePlan): number {
  const weeksToHours = plan.duration * 40 // 每周40小时

  return plan.teamComposition.reduce((total, member) => {
    const teamMember = teamMembers.find((tm) => tm.id === member.memberId)
    if (!teamMember) return total

    const memberCost = teamMember.hourlyRate * weeksToHours * member.allocation
    return total + memberCost
  }, 0)
}

/**
 * 获取项目总预算
 */
export function getTotalProjectBudget(): number {
  return resourcePlans.reduce((total, plan) => total + calculatePhaseCost(plan), 0)
}
