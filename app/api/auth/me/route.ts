import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// 模拟用户数据
const users = [
  {
    id: "1",
    phone: "13800138000",
    name: "张三",
    avatar: "/placeholder.svg?height=40&width=40",
    level: "初级导演",
    starCoins: 1000,
    createdAt: "2024-01-01T00:00:00Z",
    stats: {
      scriptsCreated: 15,
      worksPublished: 8,
      totalViews: 12500,
      followers: 256,
    },
  },
]

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // 从cookie或Authorization header获取token
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ success: false, message: "未提供认证token" }, { status: 401 })
    }

    // 验证JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    // 查找用户
    const user = users.find((u) => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, message: "用户不存在" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          phone: user.phone,
          name: user.name,
          avatar: user.avatar,
          level: user.level,
          starCoins: user.starCoins,
          stats: user.stats,
          createdAt: user.createdAt,
        },
      },
    })
  } catch (error) {
    console.error("获取用户信息错误:", error)

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ success: false, message: "无效的认证token" }, { status: 401 })
    }

    return NextResponse.json({ success: false, message: "服务器内部错误" }, { status: 500 })
  }
}
