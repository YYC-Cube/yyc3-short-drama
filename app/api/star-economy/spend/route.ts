import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// 模拟用户星币数据
const userBalances = new Map([["1", { balance: 1000, totalEarned: 2500, totalSpent: 1500 }]])

// 模拟交易记录
const transactions: any[] = []

export async function POST(request: NextRequest) {
  try {
    // 验证用户认证
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ success: false, message: "请先登录" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const userId = decoded.userId

    const body = await request.json()
    const { amount, reason, itemId } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "无效的星币数量" }, { status: 400 })
    }

    // 获取用户当前余额
    const userBalance = userBalances.get(userId) || {
      balance: 100,
      totalEarned: 100,
      totalSpent: 0,
    }

    // 检查余额是否足够
    if (userBalance.balance < amount) {
      return NextResponse.json({ success: false, message: "星币余额不足" }, { status: 400 })
    }

    // 更新余额
    userBalance.balance -= amount
    userBalance.totalSpent += amount
    userBalances.set(userId, userBalance)

    // 记录交易
    const transaction = {
      id: Date.now().toString(),
      userId,
      type: "spend",
      amount,
      reason: reason || "购买道具",
      itemId,
      balanceAfter: userBalance.balance,
      createdAt: new Date().toISOString(),
    }
    transactions.push(transaction)

    return NextResponse.json({
      success: true,
      message: `成功消费${amount}星币`,
      data: {
        transaction,
        newBalance: userBalance.balance,
      },
    })
  } catch (error) {
    console.error("星币消费失败:", error)

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ success: false, message: "认证失败" }, { status: 401 })
    }

    return NextResponse.json({ success: false, message: "星币消费失败" }, { status: 500 })
  }
}
