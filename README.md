# 言语逸品 - 河洛文化数字传承平台

> 🏛️ 运用现代科技手段传承和弘扬河洛文化，让千年文明在数字时代重新绽放光彩

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 📖 项目简介

言语逸品是一个致力于河洛文化数字传承的创新平台，融合了人工智能、虚拟现实、区块链等前沿技术，为用户提供沉浸式的文化体验。平台以洛阳为核心，深度挖掘河洛文化的历史底蕴，通过现代科技手段实现文化的数字化保护、传承和创新。

### 🎯 核心理念

- **文化传承**：保护和传承河洛文化的精神内核
- **科技创新**：运用前沿技术重新诠释传统文化
- **沉浸体验**：提供多维度的文化体验方式
- **社区共建**：构建文化爱好者的交流平台

## ✨ 核心功能

### 🎭 AI智慧编剧
基于八卦原理的智能剧本创作系统，融合河洛文化元素：

- **八卦剧本生成器**：运用河图洛书理论构建剧本结构
- **古今对话转换**：现代台词与古风文言文的智能转换
- **文化元素库**：丰富的河洛文化素材资源
- **协作创作平台**：多人实时协作编辑功能

\`\`\`typescript
// 八卦剧本生成示例
const baguaScript = await generateScript({
  theme: "洛神赋新传",
  style: "classical",
  culturalElements: ["洛神赋", "洛水", "曹植", "魏晋文化"],
  structure: "bagua" // 基于八卦理论的九宫格结构
})
\`\`\`

### 🧬 文脉基因解析
深度挖掘和分析河洛文化的基因密码：

- **文化基因库**：系统化收录河洛文化元素
- **时空场景重建**：历史场景的数字化重现
- **关联性分析**：文化元素间的深度关联挖掘
- **传承路径追踪**：文化传承脉络的可视化展示

### 🌐 虚实共生体系
构建线上线下融合的文化生态：

- **全息投影展示**：洛神女等文化形象的立体呈现
- **AR文化体验**：增强现实技术的文化互动
- **虚拟文化空间**：沉浸式的数字文化环境
- **社交互动平台**：文化爱好者的交流社区

### ⭐ 星值经济体系
创新的文化价值评估和激励机制：

- **明星值积分**：基于贡献度的积分体系
- **创作者激励**：优质内容的经济回报机制
- **文化NFT**：数字文化资产的确权和交易
- **社区治理**：去中心化的平台治理模式

### 🕰️ 时空穿越体验
跨越时空的文化体验之旅：

- **历史场景还原**：盛唐洛阳城的数字重建
- **时空对话系统**：与历史人物的虚拟对话
- **文化时间线**：河洛文化发展历程的可视化
- **沉浸式漫游**：第一人称的历史体验

## 🏗️ 技术架构

### 前端技术栈

\`\`\`json
{
  "framework": "Next.js 15",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "animation": "Framer Motion",
  "ui_components": "shadcn/ui",
  "state_management": "React Context + Hooks",
  "build_tool": "Turbopack"
}
\`\`\`

### 核心依赖

\`\`\`json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "@radix-ui/react-*": "^1.0.0",
    "lucide-react": "^0.400.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
\`\`\`

### 项目结构

\`\`\`
言语逸品/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 认证相关页面
│   ├── ai-script/                # AI编剧模块
│   ├── cultural-gene/            # 文化基因模块
│   ├── social-system/            # 社交体系模块
│   ├── star-economy/             # 星值经济模块
│   ├── cultural-crossing/        # 时空穿越模块
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 主页
│   └── globals.css               # 全局样式
├── components/                   # 组件库
│   ├── ui/                       # 基础UI组件
│   ├── shared/                   # 共享组件
│   ├── ai-script/                # AI编剧组件
│   ├── cultural-gene/            # 文化基因组件
│   ├── social-system/            # 社交体系组件
│   ├── star-economy/             # 星值经济组件
│   ├── cultural-crossing/        # 时空穿越组件
│   └── layout/                   # 布局组件
├── hooks/                        # 自定义Hooks
├── lib/                          # 工具库
├── services/                     # 服务层
├── utils/                        # 工具函数
├── contexts/                     # React Context
├── types/                        # TypeScript类型定义
├── public/                       # 静态资源
│   └── images/                   # 图片资源
├── styles/                       # 样式文件
├── scripts/                      # 构建脚本
└── docs/                         # 项目文档
\`\`\`

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0
- Git

### 安装步骤

1. **克隆项目**
\`\`\`bash
git clone https://github.com/your-org/yanyu-yipin.git
cd yanyu-yipin
\`\`\`

2. **安装依赖**
\`\`\`bash
npm install
# 或
yarn install
\`\`\`

3. **环境配置**
\`\`\`bash
cp .env.example .env.local
\`\`\`

编辑 \`.env.local\` 文件，配置必要的环境变量：

\`\`\`env
# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=言语逸品

# AI服务配置
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_BASE=https://api.openai.com/v1

# 数据库配置
DATABASE_URL=your_database_url

# 认证配置
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# 文件存储配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

4. **启动开发服务器**
\`\`\`bash
npm run dev
# 或
yarn dev
\`\`\`

5. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建部署

\`\`\`bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run format
\`\`\`

## 🎨 设计系统

### 色彩方案

\`\`\`css
/* 主色调 */
--primary: 45 100% 51%;           /* 琥珀色 #FF8C00 */
--primary-foreground: 0 0% 100%;  /* 白色 */

/* 辅助色 */
--secondary: 270 50% 40%;         /* 紫色 */
--accent: 15 100% 55%;            /* 橙红色 */

/* 中性色 */
--background: 0 0% 0%;            /* 黑色背景 */
--foreground: 0 0% 100%;          /* 白色文字 */
--muted: 0 0% 15%;                /* 深灰色 */
--border: 0 0% 20%;               /* 边框色 */
\`\`\`

### 字体系统

\`\`\`css
/* 字体族 */
--font-sans: ui-sans-serif, system-ui, sans-serif;
--font-serif: ui-serif, Georgia, serif;
--font-mono: ui-monospace, monospace;

/* 字体大小 */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
\`\`\`

### 组件规范

\`\`\`typescript
// 按钮组件示例
interface ButtonProps {
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size: 'default' | 'sm' | 'lg' | 'icon'
  cultural?: boolean  // 文化主题样式
}

// 卡片组件示例
interface CardProps {
  cultural?: boolean  // 启用文化主题
  gradient?: string   // 渐变色方案
  glassEffect?: boolean  // 毛玻璃效果
}
\`\`\`

## 📱 响应式设计

### 断点系统

\`\`\`css
/* Tailwind CSS 断点 */
sm: 640px   /* 小屏设备 */
md: 768px   /* 平板设备 */
lg: 1024px  /* 笔记本电脑 */
xl: 1280px  /* 桌面显示器 */
2xl: 1536px /* 大屏显示器 */
\`\`\`

### 适配策略

- **移动优先**：从小屏幕开始设计，逐步增强
- **弹性布局**：使用 Flexbox 和 Grid 实现自适应
- **相对单位**：使用 rem、em、% 等相对单位
- **媒体查询**：针对不同设备优化体验

## 🔧 开发指南

### 代码规范

\`\`\`typescript
// 组件命名：PascalCase
export default function CulturalGeneAnalyzer() {}

// 文件命名：kebab-case
cultural-gene-analyzer.tsx

// 变量命名：camelCase
const culturalElements = []

// 常量命名：UPPER_SNAKE_CASE
const MAX_SCRIPT_LENGTH = 10000
\`\`\`

### Git 工作流

\`\`\`bash
# 功能开发
git checkout -b feature/cultural-gene-analysis
git add .
git commit -m "feat: add cultural gene analysis feature"
git push origin feature/cultural-gene-analysis

# 提交信息规范
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
\`\`\`

### 性能优化

\`\`\`typescript
// 图片优化
import Image from 'next/image'

<Image
  src="/images/luoshen.jpg"
  alt="洛神女"
  width={800}
  height={600}
  priority={true}
  quality={90}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// 代码分割
const CulturalGeneAnalyzer = dynamic(
  () => import('@/components/cultural-gene/analyzer'),
  { loading: () => <LoadingSpinner /> }
)

// 缓存策略
export const revalidate = 3600 // 1小时重新验证
\`\`\`

## 🧪 测试

### 测试框架

- **单元测试**：Jest + React Testing Library
- **集成测试**：Playwright
- **E2E测试**：Cypress
- **性能测试**：Lighthouse CI

### 运行测试

\`\`\`bash
# 单元测试
npm run test

# 监听模式
npm run test:watch

# 覆盖率报告
npm run test:coverage

# E2E测试
npm run test:e2e

# 性能测试
npm run test:performance
\`\`\`

## 📊 性能监控

### 核心指标

- **FCP (First Contentful Paint)**: < 1.5s
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTI (Time to Interactive)**: < 3.5s

### 监控工具

\`\`\`typescript
// 性能监控配置
export const performanceConfig = {
  enabled: process.env.NODE_ENV === 'production',
  sampleRate: 0.1,
  slowThreshold: 16, // 60fps
  maxEntries: 100
}

// 使用示例
import { withPerformanceTracking } from '@/utils/performance-monitor'

export default withPerformanceTracking(CulturalGeneAnalyzer, {
  name: 'CulturalGeneAnalyzer'
})
\`\`\`

## 🔐 安全性

### 安全措施

- **内容安全策略 (CSP)**：防止XSS攻击
- **HTTPS强制**：所有通信加密
- **输入验证**：严格的数据验证
- **权限控制**：基于角色的访问控制
- **敏感数据保护**：加密存储敏感信息

### 环境变量安全

\`\`\`typescript
// 环境变量验证
const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32)
})

export const env = envSchema.parse(process.env)
\`\`\`

## 🌍 国际化

### 多语言支持

\`\`\`typescript
// 语言配置
export const locales = ['zh-CN', 'en-US', 'ja-JP'] as const
export const defaultLocale = 'zh-CN'

// 使用示例
import { useTranslation } from 'next-i18next'

export default function CulturalIntro() {
  const { t } = useTranslation('cultural')
  
  return (
    <h1>{t('title.luoshen')}</h1>
  )
}
\`\`\`

## 📈 分析统计

### 数据收集

\`\`\`typescript
// 用户行为分析
import { analytics } from '@/lib/analytics'

analytics.track('cultural_gene_analyzed', {
  geneId: 'luoshen_fu',
  analysisType: 'deep_connection',
  userId: user.id,
  timestamp: Date.now()
})

// 性能数据收集
analytics.performance('page_load_time', {
  page: '/cultural-gene',
  loadTime: 1250,
  device: 'desktop'
})
\`\`\`

## 🤝 贡献指南

### 参与方式

1. **Fork 项目**到你的 GitHub 账户
2. **创建功能分支** \`git checkout -b feature/amazing-feature\`
3. **提交更改** \`git commit -m 'Add amazing feature'\`
4. **推送分支** \`git push origin feature/amazing-feature\`
5. **创建 Pull Request**

### 贡献类型

- 🐛 **Bug修复**：修复现有功能的问题
- ✨ **新功能**：添加新的功能特性
- 📚 **文档改进**：完善项目文档
- 🎨 **UI/UX优化**：改进用户界面和体验
- ⚡ **性能优化**：提升应用性能
- 🧪 **测试完善**：增加测试覆盖率

### 代码审查

所有 Pull Request 都需要经过代码审查：

- 代码质量检查
- 功能测试验证
- 性能影响评估
- 安全性审查
- 文档完整性检查

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

### 技术支持

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Framer Motion](https://www.framer.com/motion/) - React动画库
- [Radix UI](https://www.radix-ui.com/) - 无样式UI组件
- [Lucide](https://lucide.dev/) - 美观的图标库

### 文化顾问

- 洛阳师范学院河洛文化研究中心
- 洛阳博物馆文物保护研究所
- 龙门石窟研究院数字化保护团队

### 开源社区

感谢所有为项目贡献代码、提出建议和报告问题的开发者们！

## 📞 联系我们

- **官方网站**：[https://yanyu-yipin.com](https://yanyu-yipin.com)
- **邮箱**：contact@yanyu-yipin.com
- **微信公众号**：言语逸品
- **GitHub**：[https://github.com/yanyu-yipin](https://github.com/yanyu-yipin)
- **技术交流群**：加微信 yanyu-tech 邀请入群

---

<div align="center">

**🏛️ 传承千年文脉，创新数字未来 🏛️**

Made with ❤️ by 言语逸品团队

</div>
