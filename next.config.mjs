/**
 * @file Next.js 配置文件
 * @description YYC³ 短剧平台 - GitHub Pages 静态站点导出配置
 * @version 2.1.0 | 更新: 2026-05-23
 * @note 纯静态站点部署模式（API路由已排除）
 *
 * ⚠️ 重要说明:
 * - 当前配置: output: 'export' (纯静态导出)
 * - API路由: 已从构建中排除 (见 .gitignore: /app/api/)
 * - 原因: 静态导出不支持服务端API (需要Node.js运行时)
 * - 影响: 登录、AI生成、支付等功能在静态版本中不可用
 *
 * 📋 如需恢复完整功能:
 * 1. 移除 output: 'export' 配置
 * 2. 从 .gitignore 中删除 /app/api/
 * 3. 改用 Vercel/Railway 等支持 Node.js 的平台部署
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔧 v1.1.0: 显式指定工作区根目录，避免 ~/bun.lock 干扰 Next 的根目录推断
  outputFileTracingRoot: import.meta.dirname,

  // ==========================================================================
  // 核心配置 - GitHub Pages 静态导出
  // ==========================================================================

  // ✅ 关键配置：启用静态HTML导出（GitHub Pages必需）
  output: 'export',

  // ✅ GitHub Pages推荐：确保URL末尾有斜杠，避免404问题
  trailingSlash: true,

  // 基础路径配置（根据部署环境自动调整）
  basePath:
    process.env.NODE_ENV === 'production'
      ? process.env.BASE_PATH || '' // GitHub Pages自动处理根路径
      : '',

  // ==========================================================================
  // 图片优化配置
  // ==========================================================================
  images: {
    // ⚠️ 静态导出必须禁用图片优化（Next.js Image API需要服务器端）
    unoptimized: true,

    // 允许的远程图片源（保持现有配置）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.svg',
        port: '',
        pathname: '/**',
      },
      // ✅ 新增：支持CDN和自定义域名图片
      {
        protocol: 'https',
        hostname: '**.yyc3.top', // 支持子域名
        port: '',
        pathname: '/**',
      },
    ],

    // 图片格式和尺寸配置
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ==========================================================================
  // 环境变量传递
  // ==========================================================================
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // ==========================================================================
  // 安全头配置（CORS等）
  // ⚠️ v1.1.1: output:'export' 模式下 headers/rewrites 均不生效（构建告警）
  // 保留于 fullstack 模式（移除 output:'export'）时自动启用
  // ==========================================================================
  ...(process.env.NEXT_OUTPUT_FULLSTACK === 'true'
    ? {
      async headers() {
        return [
          {
            source: '/api/:path*',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value:
                  process.env.NODE_ENV === 'production'
                    ? process.env.NEXT_PUBLIC_APP_URL || 'https://drama.yyc3.top'
                    : 'http://localhost:3030',
              },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET, POST, PUT, DELETE, OPTIONS',
              },
              {
                key: 'Access-Control-Allow-Headers',
                value: 'Content-Type, Authorization, X-Requested-With',
              },
              {
                key: 'Access-Control-Allow-Credentials',
                value: 'true',
              },
              {
                key: 'Access-Control-Max-Age',
                value: '86400',
              },
            ],
          },
          // ✅ 安全响应头（符合五高安全标准）
          {
            source: '/(.*)',
            headers: [
              { key: 'X-Frame-Options', value: 'DENY' },
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
              { key: 'X-XSS-Protection', value: '1; mode=block' },
            ],
          },
        ];
      },
    }
    : {}),

  // ==========================================================================
  // URL重写规则
  // ⚠️ v1.1.1: 静态导出模式下 rewrites 不生效，仅 fullstack 模式启用
  // ==========================================================================
  ...(process.env.NEXT_OUTPUT_FULLSTACK === 'true'
    ? {
      async rewrites() {
        return [
          {
            source: '/api/health',
            destination: '/api/health',
          },
        ];
      },
    }
    : {}),

  // ==========================================================================
  // React 严格模式
  // ==========================================================================
  reactStrictMode: true,

  // ==========================================================================
  // 实验性功能
  // ==========================================================================
  experimental: {
    // 优化包导入（减小体积）
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*', 'framer-motion'],
  },

  // ==========================================================================
  // ESLint / TypeScript 配置
  // ⚠️ v1.2.0: Next 16 已移除 next lint 与构建期 lint（eslint 键失效），
  // lint 改由独立命令 pnpm lint（eslint.config.mjs flat config）执行
  // ==========================================================================

  // ==========================================================================
  // TypeScript配置
  // ==========================================================================
  typescript: {
    // ✅ v1.1.1: 类型错误已清零，恢复构建时类型检查（原先重复声明+忽略已移除）
    ignoreBuildErrors: false,
  },

  // ==========================================================================
  // 页面扩展名配置（可选）
  // ==========================================================================
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
