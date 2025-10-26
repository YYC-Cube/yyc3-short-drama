import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: "退出登录成功" })

  // 删除auth_token cookie
  response.cookies.delete("auth_token")

  return response
}
