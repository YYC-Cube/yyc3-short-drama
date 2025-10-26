"use client"

/**
 * 文档生成工具
 * 用于自动生成组件和工具的文档
 */

// 文档类型
export interface ComponentDoc {
  name: string
  description: string
  props: PropDoc[]
  examples: Example[]
  notes?: string[]
}

export interface PropDoc {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description: string
}

export interface Example {
  title: string
  code: string
  description?: string
}

export interface UtilDoc {
  name: string
  description: string
  functions: FunctionDoc[]
  types: TypeDoc[]
  examples: Example[]
  notes?: string[]
}

export interface FunctionDoc {
  name: string
  signature: string
  description: string
  params: ParamDoc[]
  returns: {
    type: string
    description: string
  }
}

export interface ParamDoc {
  name: string
  type: string
  description: string
  required: boolean
}

export interface TypeDoc {
  name: string
  definition: string
  description: string
}

/**
 * 组件文档集合
 */
export const componentDocs: Record<string, ComponentDoc> = {
  LazyImage: {
    name: "LazyImage",
    description: "懒加载图片组件，仅在图片进入视口时加载，提高页面加载性能。",
    props: [
      {
        name: "src",
        type: "string",
        required: true,
        description: "图片源URL",
      },
      {
        name: "alt",
        type: "string",
        required: true,
        description: "图片替代文本，用于无障碍访问",
      },
      {
        name: "width",
        type: "number",
        required: false,
        description: "图片宽度（像素）",
      },
      {
        name: "height",
        type: "number",
        required: false,
        description: "图片高度（像素）",
      },
      {
        name: "className",
        type: "string",
        required: false,
        defaultValue: '""',
        description: "自定义CSS类名",
      },
      {
        name: "placeholderColor",
        type: "string",
        required: false,
        defaultValue: '"#1f1f1f"',
        description: "图片加载前的占位符颜色",
      },
    ],
    examples: [
      {
        title: "基本用法",
        code: `<LazyImage 
  src="/images/cultural-artifact.jpg" 
  alt="河洛文化艺术品" 
  width={400} 
  height={300} 
/>`,
        description: "基本的懒加载图片用法",
      },
      {
        title: "自定义占位符",
        code: `<LazyImage 
  src="/images/landscape.jpg" 
  alt="洛阳风景" 
  width={600} 
  height={400}
  placeholderColor="#3f3f3f" 
  className="rounded-lg shadow-md" 
/>`,
        description: "使用自定义占位符颜色和样式",
      },
    ],
    notes: [
      "该组件使用IntersectionObserver API，在不支持的浏览器中会直接加载图片。",
      "为了获得最佳性能，请提供准确的width和height属性，以减少布局偏移。",
    ],
  },
  ErrorBoundary: {
    name: "ErrorBoundary",
    description: "错误边界组件，用于捕获子组件树中的JavaScript错误，防止整个应用崩溃。",
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "子组件",
      },
      {
        name: "fallback",
        type: "ReactNode",
        required: false,
        description: "发生错误时显示的自定义UI",
      },
      {
        name: "onError",
        type: "(error: Error, errorInfo: ErrorInfo) => void",
        required: false,
        description: "错误发生时的回调函数",
      },
    ],
    examples: [
      {
        title: "基本用法",
        code: `<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>`,
        description: "基本的错误边界用法",
      },
      {
        title: "自定义错误UI",
        code: `<ErrorBoundary 
  fallback={<div>出现了问题，请刷新页面。</div>}
  onError={(error, info) => console.error("捕获到错误:", error, info)}
>
  <RiskyComponent />
</ErrorBoundary>`,
        description: "使用自定义错误UI和错误处理回调",
      },
    ],
    notes: [
      "错误边界只能捕获子组件中的错误，不能捕获自身的错误。",
      "错误边界不能捕获事件处理器中的错误，请在事件处理器中使用try/catch。",
      "在开发模式下，React会重新渲染错误边界，这可能导致不同的行为。",
    ],
  },
  RouteBoundary: {
    name: "RouteBoundary",
    description: "路由级别代码分割组件，用于懒加载整个路由组件，减少初始加载时间。",
    props: [
      {
        name: "component",
        type: "() => Promise<{ default: ComponentType<any> }>",
        required: true,
        description: "动态导入的组件",
      },
      {
        name: "fallback",
        type: "ReactNode",
        required: false,
        description: "组件加载时显示的加载UI",
      },
      {
        name: "props",
        type: "Record<string, any>",
        required: false,
        defaultValue: "{}",
        description: "传递给懒加载组件的属性",
      },
    ],
    examples: [
      {
        title: "基本用法",
        code: `<RouteBoundary 
  component={() => import('@/components/heavy-component')} 
/>`,
        description: "基本的路由级别代码分割用法",
      },
      {
        title: "自定义加载UI和属性",
        code: `<RouteBoundary 
  component={() => import('@/components/dashboard')}
  fallback={<CustomLoadingSpinner />}
  props={{ userId: 123 }}
/>`,
        description: "使用自定义加载UI和传递属性",
      },
    ],
    notes: [
      "该组件使用React.lazy和Suspense实现代码分割。",
      "为了获得最佳性能，请只在路由级别使用此组件，而不是在频繁重新渲染的组件中使用。",
    ],
  },
}

/**
 * 工具文档集合
 */
export const utilDocs: Record<string, UtilDoc> = {
  performanceOptimizer: {
    name: "performanceOptimizer",
    description: "性能优化工具，提供代码分割、懒加载和性能监控功能。",
    functions: [
      {
        name: "useInViewLoader",
        signature: "useInViewLoader<T>(loader: () => Promise<T>, options?: { rootMargin: string })",
        description: "组件懒加载钩子，仅在组件进入视口时加载。",
        params: [
          {
            name: "loader",
            type: "() => Promise<T>",
            description: "加载数据的函数",
            required: true,
          },
          {
            name: "options",
            type: "{ rootMargin: string }",
            description: "交叉观察器选项",
            required: false,
          },
        ],
        returns: {
          type: "{ data: T | null; loading: boolean; error: Error | null }",
          description: "加载状态和数据",
        },
      },
      {
        name: "preloadResources",
        signature: "preloadResources(resources: string[]): void",
        description: "在浏览器空闲时预加载关键资源。",
        params: [
          {
            name: "resources",
            type: "string[]",
            description: "要预加载的资源URL数组",
            required: true,
          },
        ],
        returns: {
          type: "void",
          description: "无返回值",
        },
      },
      {
        name: "collectPerformanceMetrics",
        signature: "collectPerformanceMetrics(): Record<string, number>",
        description: "收集当前页面的性能指标。",
        params: [],
        returns: {
          type: "Record<string, number>",
          description: "性能指标对象",
        },
      },
    ],
    types: [
      {
        name: "LazyImageProps",
        definition: `{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderColor?: string;
}`,
        description: "懒加载图片组件属性",
      },
    ],
    examples: [
      {
        title: "使用useInViewLoader钩子",
        code: `const { data, loading, error } = useInViewLoader(
  () => fetch('/api/data').then(res => res.json()),
  { rootMargin: '100px' }
);

if (loading) return <Loading />;
if (error) return <Error message={error.message} />;
return <DataDisplay data={data} />;`,
        description: "使用useInViewLoader钩子懒加载数据",
      },
      {
        title: "预加载关键资源",
        code: `useEffect(() => {
  preloadResources([
    '/images/hero-background.jpg',
    '/fonts/special-font.woff2'
  ]);
}, []);`,
        description: "在组件挂载后预加载关键资源",
      },
    ],
    notes: [
      "useInViewLoader钩子使用IntersectionObserver API，在不支持的浏览器中会立即加载数据。",
      "preloadResources函数使用requestIdleCallback API，在不支持的浏览器中不会执行。",
    ],
  },
  errorHandler: {
    name: "errorHandler",
    description: "全局错误处理工具，提供统一的错误捕获、记录和展示机制。",
    functions: [
      {
        name: "createError",
        signature:
          "createError(error: Error | string, type: ErrorType = ErrorType.UNKNOWN, context?: Record<string, any>): ErrorDetails",
        description: "创建标准化错误对象。",
        params: [
          {
            name: "error",
            type: "Error | string",
            description: "错误对象或错误消息",
            required: true,
          },
          {
            name: "type",
            type: "ErrorType",
            description: "错误类型",
            required: false,
          },
          {
            name: "context",
            type: "Record<string, any>",
            description: "错误上下文信息",
            required: false,
          },
        ],
        returns: {
          type: "ErrorDetails",
          description: "标准化错误对象",
        },
      },
      {
        name: "handleError",
        signature:
          "handleError(error: Error | string, type: ErrorType = ErrorType.UNKNOWN, options: ErrorHandlerOptions = {}): ErrorDetails",
        description: "处理错误，包括日志记录和用户通知。",
        params: [
          {
            name: "error",
            type: "Error | string",
            description: "错误对象或错误消息",
            required: true,
          },
          {
            name: "type",
            type: "ErrorType",
            description: "错误类型",
            required: false,
          },
          {
            name: "options",
            type: "ErrorHandlerOptions",
            description: "错误处理选项",
            required: false,
          },
        ],
        returns: {
          type: "ErrorDetails",
          description: "处理后的错误对象",
        },
      },
      {
        name: "getUserFriendlyMessage",
        signature: "getUserFriendlyMessage(errorDetails: ErrorDetails): string",
        description: "获取用户友好的错误消息。",
        params: [
          {
            name: "errorDetails",
            type: "ErrorDetails",
            description: "错误详情对象",
            required: true,
          },
        ],
        returns: {
          type: "string",
          description: "用户友好的错误消息",
        },
      },
    ],
    types: [
      {
        name: "ErrorType",
        definition: `enum ErrorType {
  NETWORK = 'network',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown'
}`,
        description: "错误类型枚举",
      },
      {
        name: "ErrorDetails",
        definition: `interface ErrorDetails {
  type: ErrorType;
  code?: string;
  message: string;
  timestamp: number;
  context?: Record<string, any>;
  stack?: string;
}`,
        description: "错误详情接口",
      },
      {
        name: "ErrorHandlerOptions",
        definition: `interface ErrorHandlerOptions {
  logToConsole?: boolean;
  logToServer?: boolean;
  showToUser?: boolean;
  retry?: boolean;
  fallback?: React.ReactNode;
}`,
        description: "错误处理选项接口",
      },
    ],
    examples: [
      {
        title: "处理API错误",
        code: `try {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error('API请求失败');
  }
  return await response.json();
} catch (error) {
  handleError(error, ErrorType.NETWORK, {
    showToUser: true
  });
  return null;
}`,
        description: "处理API请求错误",
      },
      {
        title: "显示用户友好的错误消息",
        code: `const errorDetails = createError('数据验证失败', ErrorType.VALIDATION);
const message = getUserFriendlyMessage(errorDetails);
setErrorMessage(message);`,
        description: "获取并显示用户友好的错误消息",
      },
    ],
    notes: ["错误处理应该尽早进行，以防止错误传播。", "在生产环境中，应该避免向用户展示敏感的错误信息。"],
  },
  apiErrorHandler: {
    name: "apiErrorHandler",
    description: "API错误处理工具，处理API请求中的错误。",
    functions: [
      {
        name: "handleApiError",
        signature: "handleApiError(error: any): ErrorDetails",
        description: "处理API错误，根据错误类型返回标准化错误对象。",
        params: [
          {
            name: "error",
            type: "any",
            description: "API错误对象",
            required: true,
          },
        ],
        returns: {
          type: "ErrorDetails",
          description: "标准化错误对象",
        },
      },
      {
        name: "safeApiCall",
        signature: "safeApiCall<T>(apiCall: () => Promise<T>): Promise<ApiResponse<T>>",
        description: "安全的API调用包装器，处理错误并返回标准化响应。",
        params: [
          {
            name: "apiCall",
            type: "() => Promise<T>",
            description: "API调用函数",
            required: true,
          },
        ],
        returns: {
          type: "Promise<ApiResponse<T>>",
          description: "标准化API响应",
        },
      },
    ],
    types: [
      {
        name: "ApiResponse",
        definition: `interface ApiResponse<T> {
  data: T | null;
  error: ErrorDetails | null;
  loading: boolean;
}`,
        description: "API响应接口",
      },
    ],
    examples: [
      {
        title: "使用safeApiCall包装API调用",
        code: `const fetchData = async () => {
  const { data, error, loading } = await safeApiCall(() => 
    fetch('/api/data').then(res => res.json())
  );
  
  if (error) {
    console.error('API错误:', error);
    return null;
  }
  
  return data;
};`,
        description: "使用safeApiCall包装API调用，安全处理错误",
      },
      {
        title: "在React组件中使用",
        code: `const [data, setData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const response = await safeApiCall(() => 
      fetch('/api/user/profile').then(res => res.json())
    );
    
    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }
  };
  
  fetchData();
}, []);`,
        description: "在React组件中使用safeApiCall获取数据",
      },
    ],
    notes: [
      "safeApiCall函数可以与任何返回Promise的API调用一起使用。",
      "对于需要更复杂错误处理的情况，可以自定义错误处理逻辑。",
    ],
  },
}

/**
 * 生成组件文档
 */
export function generateComponentDoc(componentName: string): string {
  const doc = componentDocs[componentName]
  if (!doc) {
    return `组件 "${componentName}" 的文档不存在。`
  }

  return `# ${doc.name}

## 描述

${doc.description}

## 属性

${doc.props
  .map(
    (prop) => `
### ${prop.name}${prop.required ? " (必需)" : ""}

- **类型**: \`${prop.type}\`
${prop.defaultValue ? `- **默认值**: \`${prop.defaultValue}\`` : ""}
- **描述**: ${prop.description}
`,
  )
  .join("")}

## 示例

${doc.examples
  .map(
    (example) => `
### ${example.title}

${example.description ? `${example.description}` : ""}

\`\`\`tsx
${example.code}
\`\`\`
`,
  )
  .join("")}

${
  doc.notes
    ? `
## 注意事项

${doc.notes.map((note) => `- ${note}`).join("\n")}
`
    : ""
}
`
}

/**
 * 生成工具文档
 */
export function generateUtilDoc(utilName: string): string {
  const doc = utilDocs[utilName]
  if (!doc) {
    return `工具 "${utilName}" 的文档不存在。`
  }

  return `# ${doc.name}

## 描述

${doc.description}

## 函数

${doc.functions
  .map(
    (func) => `
### ${func.name}

**签名**: \`${func.signature}\`

**描述**: ${func.description}

${
  func.params.length > 0
    ? `
#### 参数

${func.params
  .map(
    (param) => `
- **${param.name}**${param.required ? " (必需)" : ""}: \`${param.type}\` - ${param.description}
`,
  )
  .join("")}
`
    : ""
}

#### 返回值

- \`${func.returns.type}\` - ${func.returns.description}
`,
  )
  .join("")}

## 类型

${doc.types
  .map(
    (type) => `
### ${type.name}

**定义**:

\`\`\`typescript
${type.definition}
\`\`\`

**描述**: ${type.description}
`,
  )
  .join("")}

## 示例

${doc.examples
  .map(
    (example) => `
### ${example.title}

${example.description ? `${example.description}` : ""}

\`\`\`typescript
${example.code}
\`\`\`
`,
  )
  .join("")}

${
  doc.notes
    ? `
## 注意事项

${doc.notes.map((note) => `- ${note}`).join("\n")}
`
    : ""
}
`
}

/**
 * 生成项目文档
 */
export function generateProjectDocs(): string {
  // 生成所有组件文档
  const componentDocStrings = Object.keys(componentDocs)
    .map((name) => generateComponentDoc(name))
    .join("\n\n---\n\n")

  // 生成所有工具文档
  const utilDocStrings = Object.keys(utilDocs)
    .map((name) => generateUtilDoc(name))
    .join("\n\n---\n\n")

  // 生成项目概述
  const overview = `# 『言语』逸品云享智能短剧·导演栈 - 技术文档

## 项目概述

『言语』逸品云享智能短剧·导演栈是一个融合河洛文化与现代科技的智能短剧创作平台。本文档提供了平台的技术实现细节、组件API和工具函数的使用指南。

## 目录

1. [组件文档](#组件文档)
2. [工具文档](#工具文档)
3. [架构概述](#架构概述)
4. [性能优化](#性能优化)
5. [错误处理](#错误处理)

`

  // 生成架构概述
  const architecture = `## 架构概述

本项目采用Next.js App Router架构，结合React Server Components和Client Components，实现高性能的服务端渲染和客户端交互。

### 文件结构

\`\`\`
/app                     # Next.js应用目录
  /api                   # API路由
  /auth                  # 认证相关页面
  /cultural-crossing     # 文化穿越功能
  /profile               # 用户资料页面
  /star-economy          # 星值经济系统
  /ai-script             # AI脚本功能
  /test-optimization     # 性能测试页面
  globals.css            # 全局样式
  layout.tsx             # 根布局
  page.tsx               # 首页

/components              # React组件
  /auth                  # 认证组件
  /ai-script             # AI脚本组件
  /cultural-crossing     # 文化穿越组件
  /cultural-gene         # 文化基因组件
  /home                  # 首页组件
  /navigation            # 导航组件
  /profile               # 用户资料组件
  /shared                # 共享组件
  /social-system         # 社交系统组件
  /star-economy          # 星值经济组件
  /ui                    # UI组件库

/contexts                # React上下文
/hooks                   # 自定义钩子
/lib                     # 库和配置
/public                  # 静态资源
/services                # 服务层
/utils                   # 工具函数
/tests                   # 测试文件
\`\`\`

### 技术栈

- **前端框架**: Next.js 14, React 18
- **样式**: Tailwind CSS, CSS Modules
- **状态管理**: React Context, Server Actions
- **数据获取**: SWR, Server Components
- **UI组件**: shadcn/ui
- **图标**: Lucide React
- **测试**: Jest, React Testing Library
- **性能监控**: Lighthouse, Web Vitals
`

  // 生成性能优化和错误处理部分
  const performanceAndError = `## 性能优化

本项目实施了多种性能优化策略：

1. **代码分割**: 使用动态导入和React.lazy实现路由级别和组件级别的代码分割
2. **图片优化**: 使用懒加载和响应式图片技术减少初始加载时间
3. **字体优化**: 使用字体子集和预加载策略优化字体加载
4. **资源预加载**: 在浏览器空闲时预加载关键资源
5. **服务端渲染**: 利用Next.js的SSR和SSG功能提高首屏加载速度
6. **缓存策略**: 实施有效的数据和资源缓存策略

## 错误处理

本项目实施了全面的错误处理策略：

1. **全局错误处理**: 使用错误边界捕获和处理React组件树中的错误
2. **API错误处理**: 使用标准化的API响应格式和错误处理机制
3. **用户友好的错误消息**: 将技术错误转换为用户友好的错误消息
4. **错误日志**: 将错误记录到控制台和服务器，便于调试和监控
5. **错误恢复**: 提供错误恢复机制，如自动重试和回退UI
`

  // 组合所有文档部分
  return `${overview}

# 组件文档

${componentDocStrings}

# 工具文档

${utilDocStrings}

${architecture}

${performanceAndError}

## 贡献指南

1. 克隆仓库
2. 安装依赖: \`npm install\`
3. 启动开发服务器: \`npm run dev\`
4. 运行测试: \`npm test\`
5. 构建生产版本: \`npm run build\`

## 许可证

版权所有 © 2023 『言语』逸品云享
`
}
