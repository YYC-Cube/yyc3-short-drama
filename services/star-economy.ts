// 星币经济系统类型定义
export interface StarCoin {
  balance: number
  totalEarned: number
  totalSpent: number
  lastUpdated: string
}

export interface Transaction {
  id: string
  userId: string
  type: "earn" | "spend"
  amount: number
  source: string
  description: string
  metadata?: Record<string, any>
  timestamp: string
  status: "pending" | "completed" | "failed"
}

export interface EarningRule {
  id: string
  action: string
  baseAmount: number
  multiplier: number
  dailyLimit?: number
  description: string
  isActive: boolean
}

export interface CreatorProgram {
  id: string
  userId: string
  level: "bronze" | "silver" | "gold" | "diamond"
  totalWorks: number
  totalViews: number
  totalLikes: number
  monthlyEarnings: number
  bonusMultiplier: number
  achievements: string[]
  joinedAt: string
  lastEvaluation: string
}

export interface Marketplace {
  id: string
  sellerId: string
  itemType: "script" | "scene" | "character" | "prop" | "music"
  title: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  tags: string[]
  rating: number
  reviewCount: number
  salesCount: number
  isExclusive: boolean
  culturalElements: string[]
  previewAssets: string[]
  createdAt: string
  updatedAt: string
  status: "active" | "inactive" | "sold_out"
}

// 赚取星币的规则
const earningRules: EarningRule[] = [
  {
    id: "daily_login",
    action: "每日登录",
    baseAmount: 10,
    multiplier: 1,
    dailyLimit: 10,
    description: "每日首次登录获得星币",
    isActive: true,
  },
  {
    id: "create_script",
    action: "创作剧本",
    baseAmount: 50,
    multiplier: 1,
    description: "完成一个剧本创作",
    isActive: true,
  },
  {
    id: "share_work",
    action: "分享作品",
    baseAmount: 20,
    multiplier: 1,
    dailyLimit: 100,
    description: "分享作品到社交平台",
    isActive: true,
  },
  {
    id: "cultural_exploration",
    action: "文化探索",
    baseAmount: 15,
    multiplier: 1,
    dailyLimit: 60,
    description: "深度探索文化基因",
    isActive: true,
  },
  {
    id: "community_interaction",
    action: "社区互动",
    baseAmount: 5,
    multiplier: 1,
    dailyLimit: 50,
    description: "点赞、评论、收藏他人作品",
    isActive: true,
  },
  {
    id: "local_user_bonus",
    action: "本地用户奖励",
    baseAmount: 0,
    multiplier: 1.5,
    description: "洛阳本地用户获得额外奖励",
    isActive: true,
  },
]

// 模拟数据存储
const userStarCoins = new Map<string, StarCoin>()
const transactions = new Map<string, Transaction[]>()
const creatorPrograms = new Map<string, CreatorProgram>()
const marketplaceItems: Marketplace[] = [
  {
    id: "item_tang_palace_scene",
    sellerId: "creator_001",
    itemType: "scene",
    title: "盛唐皇宫场景包",
    description: "精美的唐代皇宫3D场景，包含大明宫、太极殿等标志性建筑",
    price: 299,
    originalPrice: 399,
    discount: 25,
    tags: ["唐朝", "皇宫", "建筑", "历史"],
    rating: 4.8,
    reviewCount: 156,
    salesCount: 89,
    isExclusive: true,
    culturalElements: ["唐代建筑", "宫廷文化", "皇家礼仪"],
    previewAssets: ["/marketplace/tang-palace-1.jpg", "/marketplace/tang-palace-2.jpg"],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    status: "active",
  },
  {
    id: "item_classical_music",
    sellerId: "creator_002",
    itemType: "music",
    title: "古风背景音乐合集",
    description: "专为古装剧本创作的背景音乐，包含10首不同情境的配乐",
    price: 199,
    tags: ["古风", "背景音乐", "配乐", "情境"],
    rating: 4.6,
    reviewCount: 203,
    salesCount: 145,
    isExclusive: false,
    culturalElements: ["传统音乐", "古典乐器", "情境配乐"],
    previewAssets: ["/marketplace/music-preview.mp3"],
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
    status: "active",
  },
]

// 获取用户星币余额
export async function getUserStarCoins(userId: string): Promise<StarCoin> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 200))

  let starCoins = userStarCoins.get(userId)

  if (!starCoins) {
    starCoins = {
      balance: 100, // 新用户赠送100星币
      totalEarned: 100,
      totalSpent: 0,
      lastUpdated: new Date().toISOString(),
    }
    userStarCoins.set(userId, starCoins)
  }

  return starCoins
}

// 赚取星币
export async function earnStarCoins(
  userId: string,
  action: string,
  amount?: number,
  metadata?: Record<string, any>,
): Promise<{ success: boolean; amount?: number; newBalance?: number; error?: string }> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    const rule = earningRules.find((r) => r.action === action)
    if (!rule || !rule.isActive) {
      return {
        success: false,
        error: "无效的赚取规则",
      }
    }

    // 计算实际赚取金额
    const baseAmount = amount || rule.baseAmount
    let finalAmount = baseAmount * rule.multiplier

    // 检查每日限制
    if (rule.dailyLimit) {
      const today = new Date().toDateString()
      const userTransactions = transactions.get(userId) || []
      const todayEarnings = userTransactions
        .filter((t) => t.source === action && new Date(t.timestamp).toDateString() === today)
        .reduce((sum, t) => sum + t.amount, 0)

      if (todayEarnings + finalAmount > rule.dailyLimit) {
        finalAmount = Math.max(0, rule.dailyLimit - todayEarnings)
      }
    }

    if (finalAmount <= 0) {
      return {
        success: false,
        error: "已达到今日赚取上限",
      }
    }

    // 更新用户星币余额
    const starCoins = await getUserStarCoins(userId)
    const updatedStarCoins: StarCoin = {
      balance: starCoins.balance + finalAmount,
      totalEarned: starCoins.totalEarned + finalAmount,
      totalSpent: starCoins.totalSpent,
      lastUpdated: new Date().toISOString(),
    }

    userStarCoins.set(userId, updatedStarCoins)

    // 记录交易
    const transaction: Transaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: "earn",
      amount: finalAmount,
      source: action,
      description: rule.description,
      metadata,
      timestamp: new Date().toISOString(),
      status: "completed",
    }

    const userTransactions = transactions.get(userId) || []
    userTransactions.push(transaction)
    transactions.set(userId, userTransactions)

    return {
      success: true,
      amount: finalAmount,
      newBalance: updatedStarCoins.balance,
    }
  } catch (error) {
    console.error("赚取星币失败:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "赚取失败",
    }
  }
}

// 消费星币
export async function spendStarCoins(
  userId: string,
  amount: number,
  purpose: string,
  description: string,
  metadata?: Record<string, any>,
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    const starCoins = await getUserStarCoins(userId)

    if (starCoins.balance < amount) {
      return {
        success: false,
        error: "星币余额不足",
      }
    }

    // 更新用户星币余额
    const updatedStarCoins: StarCoin = {
      balance: starCoins.balance - amount,
      totalEarned: starCoins.totalEarned,
      totalSpent: starCoins.totalSpent + amount,
      lastUpdated: new Date().toISOString(),
    }

    userStarCoins.set(userId, updatedStarCoins)

    // 记录交易
    const transaction: Transaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: "spend",
      amount,
      source: purpose,
      description,
      metadata,
      timestamp: new Date().toISOString(),
      status: "completed",
    }

    const userTransactions = transactions.get(userId) || []
    userTransactions.push(transaction)
    transactions.set(userId, userTransactions)

    return {
      success: true,
      newBalance: updatedStarCoins.balance,
    }
  } catch (error) {
    console.error("消费星币失败:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "消费失败",
    }
  }
}

// 获取交易历史
export async function getTransactionHistory(
  userId: string,
  limit = 20,
  offset = 0,
): Promise<{
  transactions: Transaction[]
  total: number
  hasMore: boolean
}> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 200))

  const userTransactions = transactions.get(userId) || []
  const sortedTransactions = userTransactions.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  const paginatedTransactions = sortedTransactions.slice(offset, offset + limit)

  return {
    transactions: paginatedTransactions,
    total: userTransactions.length,
    hasMore: offset + limit < userTransactions.length,
  }
}

// 获取创作者计划信息
export async function getCreatorProgram(userId: string): Promise<CreatorProgram | null> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 300))

  return creatorPrograms.get(userId) || null
}

// 加入创作者计划
export async function joinCreatorProgram(userId: string): Promise<{
  success: boolean
  program?: CreatorProgram
  error?: string
}> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingProgram = creatorPrograms.get(userId)
    if (existingProgram) {
      return {
        success: false,
        error: "您已经是创作者计划成员",
      }
    }

    const newProgram: CreatorProgram = {
      id: `creator_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      level: "bronze",
      totalWorks: 0,
      totalViews: 0,
      totalLikes: 0,
      monthlyEarnings: 0,
      bonusMultiplier: 1.2,
      achievements: ["新人创作者"],
      joinedAt: new Date().toISOString(),
      lastEvaluation: new Date().toISOString(),
    }

    creatorPrograms.set(userId, newProgram)

    // 赠送加入奖励
    await earnStarCoins(userId, "加入创作者计划", 200, { programLevel: "bronze" })

    return {
      success: true,
      program: newProgram,
    }
  } catch (error) {
    console.error("加入创作者计划失败:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "加入失败",
    }
  }
}

// 获取市场商品
export async function getMarketplaceItems(
  filters?: {
    itemType?: string
    priceRange?: { min: number; max: number }
    tags?: string[]
    sortBy?: "price" | "rating" | "sales" | "newest"
  },
  limit = 20,
  offset = 0,
): Promise<{
  items: Marketplace[]
  total: number
  hasMore: boolean
}> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 400))

  let filteredItems = [...marketplaceItems]

  // 应用过滤器
  if (filters) {
    if (filters.itemType) {
      filteredItems = filteredItems.filter((item) => item.itemType === filters.itemType)
    }

    if (filters.priceRange) {
      filteredItems = filteredItems.filter(
        (item) => item.price >= filters.priceRange!.min && item.price <= filters.priceRange!.max,
      )
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredItems = filteredItems.filter((item) => filters.tags!.some((tag) => item.tags.includes(tag)))
    }

    // 排序
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price":
          filteredItems.sort((a, b) => a.price - b.price)
          break
        case "rating":
          filteredItems.sort((a, b) => b.rating - a.rating)
          break
        case "sales":
          filteredItems.sort((a, b) => b.salesCount - a.salesCount)
          break
        case "newest":
          filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
      }
    }
  }

  const paginatedItems = filteredItems.slice(offset, offset + limit)

  return {
    items: paginatedItems,
    total: filteredItems.length,
    hasMore: offset + limit < filteredItems.length,
  }
}

// 购买市场商品
export async function purchaseMarketplaceItem(
  userId: string,
  itemId: string,
): Promise<{ success: boolean; item?: Marketplace; error?: string }> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 600))

    const item = marketplaceItems.find((i) => i.id === itemId)
    if (!item) {
      return {
        success: false,
        error: "商品不存在",
      }
    }

    if (item.status !== "active") {
      return {
        success: false,
        error: "商品不可购买",
      }
    }

    // 检查星币余额
    const starCoins = await getUserStarCoins(userId)
    if (starCoins.balance < item.price) {
      return {
        success: false,
        error: "星币余额不足",
      }
    }

    // 扣除星币
    const spendResult = await spendStarCoins(userId, item.price, "marketplace_purchase", `购买商品: ${item.title}`, {
      itemId,
      itemType: item.itemType,
    })

    if (!spendResult.success) {
      return {
        success: false,
        error: spendResult.error,
      }
    }

    // 更新商品销量
    const itemIndex = marketplaceItems.findIndex((i) => i.id === itemId)
    if (itemIndex !== -1) {
      marketplaceItems[itemIndex].salesCount += 1
    }

    // 给卖家分成（70%）
    const sellerEarning = Math.floor(item.price * 0.7)
    await earnStarCoins(item.sellerId, "商品销售", sellerEarning, {
      itemId,
      buyerId: userId,
      salePrice: item.price,
    })

    return {
      success: true,
      item,
    }
  } catch (error) {
    console.error("购买商品失败:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "购买失败",
    }
  }
}

// 获取赚取规则
export async function getEarningRules(): Promise<EarningRule[]> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 100))

  return earningRules.filter((rule) => rule.isActive)
}

// 获取用户统计信息
export async function getUserEconomyStats(userId: string): Promise<{
  starCoins: StarCoin
  creatorProgram: CreatorProgram | null
  recentTransactions: Transaction[]
  monthlyEarnings: number
  monthlySpending: number
  achievements: string[]
}> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 400))

  const starCoins = await getUserStarCoins(userId)
  const creatorProgram = await getCreatorProgram(userId)
  const { transactions: recentTransactions } = await getTransactionHistory(userId, 5)

  // 计算月度收支
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const userTransactions = transactions.get(userId) || []

  const monthlyTransactions = userTransactions.filter((t) => {
    const transactionDate = new Date(t.timestamp)
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear
  })

  const monthlyEarnings = monthlyTransactions.filter((t) => t.type === "earn").reduce((sum, t) => sum + t.amount, 0)

  const monthlySpending = monthlyTransactions.filter((t) => t.type === "spend").reduce((sum, t) => sum + t.amount, 0)

  const achievements = creatorProgram?.achievements || []

  return {
    starCoins,
    creatorProgram,
    recentTransactions,
    monthlyEarnings,
    monthlySpending,
    achievements,
  }
}
