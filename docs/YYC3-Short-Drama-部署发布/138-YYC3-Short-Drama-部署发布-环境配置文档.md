---
@file: 138-YYC3-Short-Drama-部署发布-环境配置文档.md
@description: YYC3-Short-Drama 生产、预生产环境的服务器、数据库、中间件的配置规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-24
@updated: 2026-01-24
@status: published
@tags: [部署发布],[环境配置],[生产环境]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 138-YYC3-Short-Drama-部署发布-环境配置文档

## 概述

本文档详细描述YYC3-Short-Drama项目的环境配置规范，包括开发、测试、预生产和生产环境的服务器、数据库、中间件等配置要求。

## 核心内容

### 1. 环境分类

#### 1.1 开发环境 (Development)
- **用途**: 日常开发和功能验证
- **访问方式**: 本地开发服务器
- **URL**: http://localhost:3000
- **特点**: 包含调试工具，热重载功能

#### 1.2 测试环境 (Testing)
- **用途**: 功能测试和集成测试
- **访问方式**: 内部测试服务器
- **URL**: 根据实际部署确定
- **特点**: 模拟生产环境配置

#### 1.3 预生产环境 (Staging)
- **用途**: 预发布验证和用户验收测试
- **访问方式**: 预发布服务器
- **URL**: 根据实际部署确定
- **特点**: 与生产环境完全一致

#### 1.4 生产环境 (Production)
- **用途**: 正式对外服务
- **访问方式**: 公开访问
- **URL**: https://yp.mymgmt.top (或Vercel分配域名)
- **特点**: 高可用、高性能、安全加固

### 2. 服务器配置

#### 2.1 开发环境服务器
- **CPU**: 4核或以上
- **内存**: 8GB或以上
- **硬盘**: SSD，至少50GB可用空间
- **操作系统**: macOS, Linux, Windows 10/11
- **Node.js**: v18.x 或更高版本

#### 2.2 生产环境服务器
- **CPU**: 8核或以上
- **内存**: 16GB或以上
- **硬盘**: SSD，至少100GB可用空间
- **带宽**: 100Mbps或以上
- **操作系统**: Ubuntu 20.04 LTS 或 CentOS 8
- **安全**: 防火墙配置，SSH密钥认证

### 3. 数据库配置

#### 3.1 MySQL 配置
```env
DB_MASTER_HOST=192.168.3.45
DB_MASTER_PORT=8989
DB_MASTER_USER=yyc3_33
DB_MASTER_PASS=yyc3_33
DB_MASTER_NAME=yyc3_33
DB_MASTER_CHARSET=utf8mb4_unicode_ci
```

**配置参数**:
- **连接池**: 最小连接数 5，最大连接数 20
- **超时**: 连接超时 30s，查询超时 60s
- **字符集**: utf8mb4_unicode_ci
- **引擎**: InnoDB

#### 3.2 Redis 配置
```env
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=redis_6379
REDIS_DB=0
```

**配置参数**:
- **内存限制**: 2GB
- **持久化**: RDB+AOF混合持久化
- **最大内存策略**: allkeys-lru

#### 3.3 MongoDB 配置
```env
MONGO_URL=mongodb://localhost:3306/yyc3_33
MONGO_DB_NAME=yyc3_33
MONGO_USER=yyc3_33
MONGO_PASSWORD=yyc3_33
```

#### 3.4 PostgreSQL 配置
```env
POSTGRES_URL=postgresql://postgres:password@localhost:5432/yyc3_33
POSTGRES_DB=yyc3_33
POSTGRES_USER=yyc3_33
POSTGRES_PASSWORD=yyc3_33
```

### 4. 应用配置

#### 4.1 Next.js 配置
```javascript
// next.config.mjs
const nextConfig = {
  serverExternalPackages: ['jsonwebtoken', 'bcryptjs'],

  images: {
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
      }
    ],
    unoptimized: true,
  },

  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' 
              ? process.env.NEXT_PUBLIC_APP_URL || 'https://yp.mymgmt.top'
              : 'http://localhost:3000'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
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
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/health',
        destination: '/api/health',
      },
    ]
  }
}

export default nextConfig
```

#### 4.2 环境变量配置
```env
# JWT配置
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2025
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=30d

# 加密配置
BCRYPT_ROUNDS=12
ENCRYPTION_KEY=your-32-character-encryption-key

# 邮件服务配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=admin@0379.email
SMTP_PASS=your-email-password
FROM_EMAIL=admin@0379.email

# 短信服务配置
SMS_PROVIDER=aliyun
ALIYUN_ACCESS_KEY_ID=your-aliyun-access-key
ALIYUN_ACCESS_KEY_SECRET=your-aliyun-secret
SMS_SIGN_NAME=言语逸品
SMS_TEMPLATE_CODE=SMS_123456789

# AI服务配置
OPENAI_API_KEY=your-openai-api-key
OPENAI_BASE_URL=https://api.openai.com/v1
GROQ_API_KEY=your-groq-api-key

# 文件存储配置
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
UPLOAD_MAX_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,video/mp4

# 支付配置
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# 第三方登录
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
WECHAT_APP_ID=your-wechat-app-id
WECHAT_APP_SECRET=your-wechat-app-secret

# 监控和分析
SENTRY_DSN=your-sentry-dsn
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
HOTJAR_ID=your-hotjar-id

# 缓存配置
CACHE_TTL=3600
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# 环境配置
NODE_ENV=development
DEV_MODE=true
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# 安全配置
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com
CSRF_SECRET=your-csrf-secret
SESSION_SECRET=your-session-secret

# 日志配置
LOG_LEVEL=info
LOG_FILE_PATH=./logs/app.log

# 特性开关
FEATURE_AI_SCRIPT=true
FEATURE_CULTURAL_GENE=true
FEATURE_STAR_ECONOMY=true
FEATURE_SOCIAL_SYSTEM=true
```

### 5. 安全配置

#### 5.1 HTTPS 配置
- **证书类型**: Let's Encrypt 免费SSL证书
- **加密套件**: TLS 1.3, AES-256-GCM
- **HSTS**: 启用 HTTP Strict Transport Security

#### 5.2 防火墙配置
- **入站规则**:
  - HTTP: 80端口 (重定向到HTTPS)
  - HTTPS: 443端口 (开放)
  - SSH: 22端口 (限制IP访问)
- **出站规则**: 默认允许

#### 5.3 访问控制
- **API限流**: 限制每IP每分钟请求数
- **CORS策略**: 仅允许受信任的域名
- **认证授权**: JWT Token验证

### 6. 监控配置

#### 6.1 应用监控
- **性能监控**: 页面加载时间、API响应时间
- **错误监控**: JavaScript错误、API错误
- **用户行为**: 页面访问、功能使用情况

#### 6.2 服务器监控
- **资源监控**: CPU、内存、磁盘使用率
- **网络监控**: 带宽使用、连接数
- **日志监控**: 系统日志、应用日志

### 7. 备份策略

#### 7.1 数据库备份
- **频率**: 每日全量备份，每小时增量备份
- **保留**: 30天内每日备份，每月备份保留1年
- **存储**: 云存储服务，异地备份

#### 7.2 应用备份
- **频率**: 代码版本控制，配置文件备份
- **保留**: 完整版本历史记录
- **存储**: Git仓库，配置文件云存储

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」