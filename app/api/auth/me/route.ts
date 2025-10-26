import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { findUserById } from "@/lib/models/user.model"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "未登录" }, { status: 401 })
    }

    const decoded = verify(token, JWT_SECRET) as { userId: number }
    const user = await findUserById(decoded.userId)

    // 移除敏感信息
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("获取用户信息失败:", error)
    return NextResponse.json({ error: "认证失败" }, { status: 401 })
  }
}
