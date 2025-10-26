import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// 需要认证的路由
const protectedRoutes = [
  "/profile",
  "/ai-script",
  "/cultural-gene",
  "/social-system",
  "/star-economy",
  "/cultural-crossing",
  "/project-management",
  "/main",
]

// 公开路由
const publicRoutes = ["/", "/auth", "/auth/single-page", "/api/auth/login", "/api/auth/register", "/api/auth/send-code"]

// API路由保护
const protectedApiRoutes = [
  "/api/auth/me",
  "/api/auth/logout",
  "/api/ai-script",
  "/api/cultural-gene",
  "/api/star-economy",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")?.value

  // 处理API路由
  if (pathname.startsWith("/api/")) {
    // 检查是否是受保护的API路由
    const isProtectedApi = protectedApiRoutes.some((route) => pathname.startsWith(route))

    if (isProtectedApi) {
      if (!token) {
        return NextResponse.json({ error: "未授权访问", code: "UNAUTHORIZED" }, { status: 401 })
      }

      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret")
        await jwtVerify(token, secret)
      } catch (error) {
        return NextResponse.json({ error: "Token无效", code: "INVALID_TOKEN" }, { status: 401 })
      }
    }

    // 添加CORS头
    const response = NextResponse.next()
    response.headers.set("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    return response
  }

  // 处理页面路由
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.includes(pathname)

  // 如果是受保护的路由但没有token，重定向到登录页
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 如果有token但访问登录页，重定向到主页
  if (token && (pathname === "/auth" || pathname === "/auth/single-page")) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret")
      await jwtVerify(token, secret)
      return NextResponse.redirect(new URL("/main", request.url))
    } catch (error) {
      // Token无效，清除cookie
      const response = NextResponse.next()
      response.cookies.delete("auth-token")
      return response
    }
  }

  // 验证token有效性
  if (token && isProtectedRoute) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret")
      await jwtVerify(token, secret)
    } catch (error) {
      // Token无效，清除cookie并重定向到登录页
      const response = NextResponse.redirect(new URL("/auth", request.url))
      response.cookies.delete("auth-token")
      return response
    }
  }

  // 添加安全头
  const response = NextResponse.next()

  // 安全头配置
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
  )

  // 添加缓存控制
  if (pathname.startsWith("/_next/static/")) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  } else if (pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate")
  }

  return response
}

export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了：
     * - _next/static (静态文件)
     * - _next/image (图片优化文件)
     * - favicon.ico (网站图标)
     * - public文件夹中的文件
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
