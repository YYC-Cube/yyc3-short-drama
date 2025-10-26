import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// 模拟用户星币数据
const userBalances = new Map([["1", { balance: 1000, totalEarned: 2500, totalSpent: 1500 }]])

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

    // 获取用户星币余额
    const userBalance = userBalances.get(userId) || {
      balance: 100,
      totalEarned: 100,
      totalSpent: 0,
    }

    return NextResponse.json({
      success: true,
      data: {
        balance: userBalance.balance,
        totalEarned: userBalance.totalEarned,
        totalSpent: userBalance.totalSpent,
        level: userBalance.balance >= 1000 ? "高级导演" : userBalance.balance >= 500 ? "中级导演" : "初级导演",
      },
    })
  } catch (error) {
    console.error("获取星币余额失败:", error)

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ success: false, message: "认证失败" }, { status: 401 })
    }

    return NextResponse.json({ success: false, message: "获取余额失败" }, { status: 500 })
  }
}
