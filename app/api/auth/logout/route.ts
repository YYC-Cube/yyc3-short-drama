import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "退出登录成功",
    })

    // 清除认证cookie
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // 立即过期
    })

    return response
  } catch (error) {
    console.error("退出登录错误:", error)
    return NextResponse.json({ success: false, message: "服务器内部错误" }, { status: 500 })
  }
}
