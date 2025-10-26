/**
 * 部署计划工具
 * 用于规划和执行渐进式部署
 */

// 部署阶段
export enum DeploymentPhase {
  PLANNING = "planning",
  DEVELOPMENT = "development",
  TESTING = "testing",
  STAGING = "staging",
  PRODUCTION = "production",
  MONITORING = "monitoring",
}

// 部署优先级
export enum DeploymentPriority {
  CRITICAL = "critical",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

// 部署项
export interface DeploymentItem {
  id: string
  name: string
  description: string
  priority: DeploymentPriority
  dependencies: string[]
  estimatedEffort: number // 人天
  estimatedImpact: number // 1-10分
  phase: DeploymentPhase
  status: "pending" | "in-progress" | "completed" | "blocked"
  assignee?: string
  startDate?: Date
  endDate?: Date
  notes?: string
}

// 部署计划
export interface DeploymentPlan {
  name: string
  description: string
  items: DeploymentItem[]
  startDate: Date
  endDate: Date
  currentPhase: DeploymentPhase
}

/**
 * 创建部署计划
 */
export function createDeploymentPlan(
  name: string,
  description: string,
  items: DeploymentItem[],
  startDate: Date,
  endDate: Date,
): DeploymentPlan {
  return {
    name,
    description,
    items,
    startDate,
    endDate,
    currentPhase: DeploymentPhase.PLANNING,
  }
}

/**
 * 获取下一批要部署的项
 */
export function getNextDeploymentBatch(plan: DeploymentPlan, batchSize = 5): DeploymentItem[] {
  // 获取所有待处理的项
  const pendingItems = plan.items.filter((item) => item.status === "pending" && item.phase === plan.currentPhase)

  // 按优先级排序
  const sortedItems = pendingItems.sort((a, b) => {
    const priorityOrder = {
      [DeploymentPriority.CRITICAL]: 0,
      [DeploymentPriority.HIGH]: 1,
      [DeploymentPriority.MEDIUM]: 2,
      [DeploymentPriority.LOW]: 3,
    }

    // 首先按优先级排序
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (priorityDiff !== 0) return priorityDiff

    // 然后按影响排序
    return b.estimatedImpact - a.estimatedImpact
  })

  // 过滤掉依赖未完成的项
  const readyItems = sortedItems.filter((item) => {
    if (item.dependencies.length === 0) return true

    // 检查所有依赖是否已完成
    return item.dependencies.every((depId) => {
      const dep = plan.items.find((i) => i.id === depId)
      return dep && dep.status === "completed"
    })
  })

  // 返回指定数量的项
  return readyItems.slice(0, batchSize)
}

/**
 * 更新部署项状态
 */
export function updateDeploymentItemStatus(
  plan: DeploymentPlan,
  itemId: string,
  status: "pending" | "in-progress" | "completed" | "blocked",
  notes?: string,
): DeploymentPlan {
  const updatedItems = plan.items.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        status,
        notes: notes || item.notes,
        ...(status === "in-progress" && !item.startDate ? { startDate: new Date() } : {}),
        ...(status === "completed" ? { endDate: new Date() } : {}),
      }
    }
    return item
  })

  return {
    ...plan,
    items: updatedItems,
  }
}

/**
 * 进入下一个部署阶段
 */
export function advanceToNextPhase(plan: DeploymentPlan): DeploymentPlan {
  const phaseOrder = [
    DeploymentPhase.PLANNING,
    DeploymentPhase.DEVELOPMENT,
    DeploymentPhase.TESTING,
    DeploymentPhase.STAGING,
    DeploymentPhase.PRODUCTION,
    DeploymentPhase.MONITORING,
  ]

  const currentIndex = phaseOrder.indexOf(plan.currentPhase)
  if (currentIndex === -1 || currentIndex === phaseOrder.length - 1) {
    return plan // 已经是最后一个阶段
  }

  const nextPhase = phaseOrder[currentIndex + 1]

  return {
    ...plan,
    currentPhase: nextPhase,
  }
}

/**
 * 生成部署甘特图数据
 */
export function generateGanttChartData(plan: DeploymentPlan): any[] {
  return plan.items.map((item) => ({
    id: item.id,
    name: item.name,
    start: item.startDate || plan.startDate,
    end: item.endDate || plan.endDate,
    progress:
      item.status === "completed" ? 100 : item.status === "in-progress" ? 50 : item.status === "blocked" ? 25 : 0,
    dependencies: item.dependencies,
    phase: item.phase,
    priority: item.priority,
  }))
}

/**
 * 计算部署计划进度
 */
export function calculatePlanProgress(plan: DeploymentPlan): number {
  const totalItems = plan.items.length
  if (totalItems === 0) return 0

  const completedItems = plan.items.filter((item) => item.status === "completed").length
  return (completedItems / totalItems) * 100
}

/**
 * 创建优化部署计划
 */
export function createOptimizationDeploymentPlan(): DeploymentPlan {
  const startDate = new Date()
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 3)

  const items: DeploymentItem[] = [
    // 文件架构优化
    {
      id: "arch-1",
      name: "文件结构分析",
      description: "分析当前项目文件结构，识别问题和优化机会",
      priority: DeploymentPriority.HIGH,
      dependencies: [],
      estimatedEffort: 2,
      estimatedImpact: 7,
      phase: DeploymentPhase.PLANNING,
      status: "pending",
    },
    {
      id: "arch-2",
      name: "组件目录重组",
      description: "按照新的架构重组组件目录",
      priority: DeploymentPriority.HIGH,
      dependencies: ["arch-1"],
      estimatedEffort: 3,
      estimatedImpact: 8,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },
    {
      id: "arch-3",
      name: "创建索引文件",
      description: "为每个组件目录创建索引文件，简化导入",
      priority: DeploymentPriority.MEDIUM,
      dependencies: ["arch-2"],
      estimatedEffort: 1,
      estimatedImpact: 6,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },
    {
      id: "arch-4",
      name: "优化导入语句",
      description: "优化项目中的导入语句，移除未使用的导入",
      priority: DeploymentPriority.MEDIUM,
      dependencies: ["arch-3"],
      estimatedEffort: 2,
      estimatedImpact: 5,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },

    // 性能优化
    {
      id: "perf-1",
      name: "性能基准测试",
      description: "建立性能基准，测量当前性能指标",
      priority: DeploymentPriority.CRITICAL,
      dependencies: [],
      estimatedEffort: 2,
      estimatedImpact: 9,
      phase: DeploymentPhase.PLANNING,
      status: "pending",
    },
    {
      id: "perf-2",
      name: "实现懒加载图片组件",
      description: "创建懒加载图片组件，减少初始加载时间",
      priority: DeploymentPriority.HIGH,
      dependencies: ["perf-1"],
      estimatedEffort: 2,
      estimatedImpact: 8,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },
    {
      id: "perf-3",
      name: "实现路由级代码分割",
      description: "实现路由级别的代码分割，减少初始包大小",
      priority: DeploymentPriority.HIGH,
      dependencies: ["perf-1"],
      estimatedEffort: 3,
      estimatedImpact: 9,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },
    {
      id: "perf-4",
      name: "资源预加载实现",
      description: "实现关键资源预加载，提高用户体验",
      priority: DeploymentPriority.MEDIUM,
      dependencies: ["perf-1"],
      estimatedEffort: 2,
      estimatedImpact: 7,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },
    {
      id: "perf-5",
      name: "性能监控仪表板",
      description: "创建性能监控仪表板，持续监控性能指标",
      priority: DeploymentPriority.MEDIUM,
      dependencies: ["perf-1", "perf-2", "perf-3", "perf-4"],
      estimatedEffort: 3,
      estimatedImpact: 6,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },

    // 错误处理
    {
      id: "err-1",
      name: "错误处理策略设计",
      description: "设计全面的错误处理策略",
      priority: DeploymentPriority.HIGH,
      dependencies: [],
      estimatedEffort: 2,
      estimatedImpact: 8,
      phase: DeploymentPhase.PLANNING,
      status: "pending",
    },
    {
      id: "err-2",
      name: "实现错误边界组件",
      description: "创建错误边界组件，捕获和处理React组件树中的错误",
      priority: DeploymentPriority.HIGH,
      dependencies: ["err-1"],
      estimatedEffort: 2,
      estimatedImpact: 9,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },
    {
      id: "err-3",
      name: "实现API错误处理",
      description: "创建API错误处理工具，处理API请求中的错误",
      priority: DeploymentPriority.HIGH,
      dependencies: ["err-1"],
      estimatedEffort: 2,
      estimatedImpact: 8,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },
    {
      id: "err-4",
      name: "用户友好错误消息",
      description: "实现用户友好的错误消息系统",
      priority: DeploymentPriority.MEDIUM,
      dependencies: ["err-2", "err-3"],
      estimatedEffort: 1,
      estimatedImpact: 7,
      phase: DeploymentPhase.DEVELOPMENT,
      status: "pending",
    },

    // 测试
    {
      id: "test-1",
      name: "设置测试环境",
      description: "设置Jest和React Testing Library测试环境",
      priority: DeploymentPriority.HIGH,
      dependencies: [],
      estimatedEffort: 1,
      estimatedImpact: 6,
      phase: DeploymentPhase.TESTING,
      status: "pending",
    },
    {
      id: "test-2",
      name: "编写组件单元测试",
      description: "为新组件编写单元测试",
      priority: DeploymentPriority.MEDIUM,
      dependencies: ["test-1", "perf-2", "perf-3", "err-2"],
      estimatedEffort: 3,
      estimatedImpact: 7,
      phase: DeploymentPhase.TESTING,
      status: "pending",
    },
    {
      id: "test-3",
      name: "编写工具单元测试",
      description: "为新工具函数编写单元测试",
      priority: DeploymentPriority.MEDIUM,
      dependencies: ["test-1", "perf-4", "err-3", "err-4"],
      estimatedEffort: 2,
      estimatedImpact: 6,
      phase: DeploymentPhase.TESTING,
      status: "pending",
    },
    {
      id: "test-4",
      name: "编写集成测试",
      description: "编写集成测试，测试组件和工具的协同工作",
      priority: DeploymentPriority.MEDIUM,
      dependencies: ["test-2", "test-3"],
      estimatedEffort: 3,
      estimatedImpact: 8,
      phase: DeploymentPhase.TESTING,
      status: "pending",
    },

    // 部署
    {
      id: "deploy-1",
      name: "部署到测试环境",
      description: "将优化部署到测试环境",
      priority: DeploymentPriority.HIGH,
      dependencies: ["arch-4", "perf-5", "err-4", "test-4"],
      estimatedEffort: 1,
      estimatedImpact: 5,
      phase: DeploymentPhase.STAGING,
      status: "pending",
    },
    {
      id: "deploy-2",
      name: "用户验收测试",
      description: "进行用户验收测试",
      priority: DeploymentPriority.HIGH,
      dependencies: ["deploy-1"],
      estimatedEffort: 2,
      estimatedImpact: 7,
      phase: DeploymentPhase.STAGING,
      status: "pending",
    },
    {
      id: "deploy-3",
      name: "部署到生产环境",
      description: "将优化部署到生产环境",
      priority: DeploymentPriority.CRITICAL,
      dependencies: ["deploy-2"],
      estimatedEffort: 1,
      estimatedImpact: 10,
      phase: DeploymentPhase.PRODUCTION,
      status: "pending",
    },
    {
      id: "deploy-4",
      name: "生产环境监控",
      description: "监控生产环境性能和错误",
      priority: DeploymentPriority.HIGH,
      dependencies: ["deploy-3"],
      estimatedEffort: 1,
      estimatedImpact: 8,
      phase: DeploymentPhase.MONITORING,
      status: "pending",
    },
  ]

  return createDeploymentPlan(
    "『言语』逸品云享智能短剧·导演栈优化计划",
    "实施文件架构优化、性能优化和错误处理增强",
    items,
    startDate,
    endDate,
  )
}
