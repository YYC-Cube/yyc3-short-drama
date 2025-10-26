import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// 模拟交易记录
const transactions = [
  {
    id: "1",
    userId: "1",
    type: "earn",
    amount: 50,
    reason: "完成每日任务",
    balanceAfter: 1050,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    type: "spend",
    amount: 100,
    reason: "购买高级道具",
    itemId: "prop_001",
    balanceAfter: 950,
    createdAt: "2024-01-14T15:20:00Z",
  },
  {
    id: "3",
    userId: "1",
    type: "earn",
    amount: 200,
    reason: "剧本获得点赞",
    balanceAfter: 1050,
    createdAt: "2024-01-13T09:15:00Z",
  },
]

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // 验证用户认证
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ success: false, message: "请先登录" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const userId = decoded.userId

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") // "earn" | "spend" | null

    // 过滤用户的交易记录
    let userTransactions = transactions.filter((t) => t.userId === userId)

    if (type) {
      userTransactions = userTransactions.filter((t) => t.type === type)
    }

    // 按时间倒序排列
    userTransactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = userTransactions.slice(startIndex, endIndex)

    // 统计信息
    const stats = {
      totalTransactions: userTransactions.length,
      totalEarned: userTransactions.filter((t) => t.type === "earn").reduce((sum, t) => sum + t.amount, 0),
      totalSpent: userTransactions.filter((t) => t.type === "spend").reduce((sum, t) => sum + t.amount, 0),
    }

    return NextResponse.json({
      success: true,
      data: {
        transactions: paginatedTransactions,
        pagination: {
          page,
          limit,
          total: userTransactions.length,
          totalPages: Math.ceil(userTransactions.length / limit),
        },
        stats,
      },
    })
  } catch (error) {
    console.error("获取交易历史失败:", error)

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ success: false, message: "认证失败" }, { status: 401 })
    }

    return NextResponse.json({ success: false, message: "获取交易历史失败" }, { status: 500 })
  }
}
