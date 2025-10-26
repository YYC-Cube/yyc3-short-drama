import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

// 公开路由（不需要登录）
const publicRoutes = ["/", "/auth", "/auth/single-page"]

// API路由（不需要中间件处理）
const apiRoutes = ["/api"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 跳过API路由
  if (apiRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // 公开路由直接通过
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // 检查认证token
  const token = request.cookies.get("auth_token")?.value

  if (!token) {
    // 未登录，重定向到登录页
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  try {
    // 验证token
    verify(token, JWT_SECRET)
    return NextResponse.next()
  } catch (error) {
    // token无效，重定向到登录页
    const response = NextResponse.redirect(new URL("/auth", request.url))
    response.cookies.delete("auth_token")
    return response
  }
}

export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了：
     * - _next/static (静态文件)
     * - _next/image (图片优化)
     * - favicon.ico (favicon)
     * - public文件夹
     */
    "/((?!_next/static|_next/image|favicon.ico|public|images).*)",
  ],
}
