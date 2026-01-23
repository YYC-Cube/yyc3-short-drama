---
@file: 049-YYC3-Short-Drama-详细设计-异常处理代码规范.md
@description: YYC3-Short-Drama 系统全局异常、业务异常、技术异常的处理规范与代码实现
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [详细设计],[异常处理],[容错设计]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 049-YYC3-Short-Drama-详细设计-异常处理代码规范

## 概述

本文档详细描述YYC3-Short-Drama-详细设计-异常处理代码规范相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范异常处理代码规范相关的业务标准与技术落地要求
- 为项目相关人员提供清晰的参考依据
- 保障相关模块开发、实施、运维的一致性与规范性

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保系统7x24小时稳定运行，保障用户体验
- **高性能**：优化响应时间和处理能力，提升系统效率
- **高安全性**：保护用户数据和隐私安全，建立多层次安全防护
- **高扩展性**：支持业务快速扩展，适应未来发展需求
- **高可维护性**：便于后续维护和升级，降低运维成本

#### 2.2 五标体系
- **标准化**：统一的技术和流程标准，确保项目质量
- **规范化**：严格的开发和管理规范，提高开发效率
- **自动化**：提高开发效率和质量，减少人为错误
- **智能化**：利用AI技术提升能力，实现智能决策
- **可视化**：直观的监控和管理界面，便于系统运维

#### 2.3 五化架构
- **流程化**：标准化的开发流程，确保项目有序进行
- **文档化**：完善的文档体系，提高项目可追溯性
- **工具化**：高效的开发工具链，提升开发效率
- **数字化**：数据驱动的决策，提高决策准确性
- **生态化**：开放的生态系统，促进项目可持续发展

### 3. 异常处理代码规范

#### 3.1 异常分类体系

##### 3.1.1 异常层级结构

```
BaseError (基础错误类)
├── BusinessError (业务错误)
│   ├── ValidationError (验证错误)
│   ├── NotFoundError (资源未找到错误)
│   ├── ConflictError (冲突错误)
│   ├── UnauthorizedError (未授权错误)
│   ├── ForbiddenError (禁止访问错误)
│   └── PaymentError (支付错误)
├── TechnicalError (技术错误)
│   ├── DatabaseError (数据库错误)
│   ├── NetworkError (网络错误)
│   ├── ExternalServiceError (外部服务错误)
│   ├── FileSystemError (文件系统错误)
│   └── CacheError (缓存错误)
└── SystemError (系统错误)
    ├── ConfigurationError (配置错误)
    ├── DependencyError (依赖错误)
    └── RuntimeError (运行时错误)
```

##### 3.1.2 异常错误码规范

错误码格式：`YYC3-ERROR-[模块]-[错误类型]-[具体错误]`

| 模块代码 | 模块名称 | 错误类型代码 | 错误类型 |
|---------|---------|------------|---------|
| AUTH | 认证授权 | 01 | 验证错误 |
| USER | 用户管理 | 02 | 资源未找到 |
| DRAMA | 短剧管理 | 03 | 冲突错误 |
| PAYMENT | 支付系统 | 04 | 未授权错误 |
| AI | AI服务 | 05 | 禁止访问错误 |
| FILE | 文件服务 | 06 | 数据库错误 |
| NOTIFICATION | 通知服务 | 07 | 网络错误 |
| ANALYTICS | 数据分析 | 08 | 外部服务错误 |
| SYSTEM | 系统核心 | 09 | 文件系统错误 |
| 10 | 缓存错误 |

示例错误码：
- `YYC3-ERROR-AUTH-01-001`：认证模块验证错误-邮箱格式不正确
- `YYC3-ERROR-USER-02-001`：用户模块资源未找到错误-用户不存在
- `YYC3-ERROR-PAYMENT-06-001`：支付模块数据库错误-支付记录创建失败

#### 3.2 异常处理架构设计

##### 3.2.1 前端异常处理架构

```
┌─────────────────────────────────────────┐
│           前端应用层                      │
├─────────────────────────────────────────┤
│  组件级异常捕获 (Error Boundary)         │
│  ├── React Error Boundary                │
│  ├── Vue Error Handler                   │
│  └── Angular ErrorHandler                │
├─────────────────────────────────────────┤
│  全局异常处理器                          │
│  ├── window.onerror                      │
│  ├── window.onunhandledrejection         │
│  └── 框架全局异常处理器                   │
├─────────────────────────────────────────┤
│  API请求异常拦截                          │
│  ├── Axios Interceptor                   │
│  ├── Fetch Wrapper                       │
│  └── 请求重试机制                         │
├─────────────────────────────────────────┤
│  异常日志上报                            │
│  ├── Sentry集成                          │
│  ├── 自定义日志上报                       │
│  └── 用户反馈收集                         │
└─────────────────────────────────────────┘
```

##### 3.2.2 后端异常处理架构

```
┌─────────────────────────────────────────┐
│           后端服务层                      │
├─────────────────────────────────────────┤
│  控制器层异常捕获                         │
│  ├── 路由级异常处理                       │
│  ├── 中间件异常捕获                       │
│  └── 全局异常处理器                       │
├─────────────────────────────────────────┤
│  服务层异常处理                           │
│  ├── 业务异常抛出                         │
│  ├── 异常转换与包装                       │
│  └── 异常链传递                           │
├─────────────────────────────────────────┤
│  数据访问层异常处理                       │
│  ├── 数据库异常捕获                       │
│  ├── ORM异常处理                         │
│  └── 事务回滚机制                         │
├─────────────────────────────────────────┤
│  外部服务异常处理                         │
│  ├── HTTP客户端异常                       │
│  ├── 第三方SDK异常                        │
│  └── 超时与重试机制                       │
├─────────────────────────────────────────┤
│  异常日志与监控                           │
│  ├── 结构化日志记录                       │
│  ├── 错误追踪系统                         │
│  └── 告警通知机制                         │
└─────────────────────────────────────────┘
```

#### 3.3 前端异常处理实现

##### 3.3.1 基础错误类定义

```typescript
// shared/errors/base.error.ts
export class BaseError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly timestamp: Date;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    code: string,
    statusCode: number,
    context?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.timestamp = new Date();
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      context: this.context,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    };
  }
}
```

##### 3.3.2 业务错误类定义

```typescript
// shared/errors/business.error.ts
import { BaseError } from './base.error';

export class BusinessError extends BaseError {
  constructor(
    message: string,
    code: string,
    statusCode: number = 400,
    context?: Record<string, any>
  ) {
    super(message, code, statusCode, context);
  }
}

export class ValidationError extends BusinessError {
  constructor(message: string, field?: string, context?: Record<string, any>) {
    const code = 'YYC3-ERROR-VALIDATION-001';
    super(message, code, 400, { ...context, field });
  }
}

export class NotFoundError extends BusinessError {
  constructor(resource: string, id?: string, context?: Record<string, any>) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    const code = 'YYC3-ERROR-NOTFOUND-001';
    super(message, code, 404, { ...context, resource, id });
  }
}

export class ConflictError extends BusinessError {
  constructor(message: string, context?: Record<string, any>) {
    const code = 'YYC3-ERROR-CONFLICT-001';
    super(message, code, 409, context);
  }
}

export class UnauthorizedError extends BusinessError {
  constructor(message: string = 'Unauthorized', context?: Record<string, any>) {
    const code = 'YYC3-ERROR-UNAUTHORIZED-001';
    super(message, code, 401, context);
  }
}

export class ForbiddenError extends BusinessError {
  constructor(message: string = 'Forbidden', context?: Record<string, any>) {
    const code = 'YYC3-ERROR-FORBIDDEN-001';
    super(message, code, 403, context);
  }
}

export class PaymentError extends BusinessError {
  constructor(message: string, context?: Record<string, any>) {
    const code = 'YYC3-ERROR-PAYMENT-001';
    super(message, code, 400, context);
  }
}
```

##### 3.3.3 技术错误类定义

```typescript
// shared/errors/technical.error.ts
import { BaseError } from './base.error';

export class TechnicalError extends BaseError {
  constructor(
    message: string,
    code: string,
    statusCode: number = 500,
    context?: Record<string, any>
  ) {
    super(message, code, statusCode, context);
  }
}

export class DatabaseError extends TechnicalError {
  constructor(message: string, query?: string, context?: Record<string, any>) {
    const code = 'YYC3-ERROR-DATABASE-001';
    super(message, code, 500, { ...context, query });
  }
}

export class NetworkError extends TechnicalError {
  constructor(message: string, url?: string, context?: Record<string, any>) {
    const code = 'YYC3-ERROR-NETWORK-001';
    super(message, code, 502, { ...context, url });
  }
}

export class ExternalServiceError extends TechnicalError {
  constructor(service: string, message: string, context?: Record<string, any>) {
    const code = 'YYC3-ERROR-EXTERNAL-001';
    super(`${service} service error: ${message}`, code, 502, { ...context, service });
  }
}

export class FileSystemError extends TechnicalError {
  constructor(message: string, path?: string, context?: Record<string, any>) {
    const code = 'YYC3-ERROR-FILESYSTEM-001';
    super(message, code, 500, { ...context, path });
  }
}

export class CacheError extends TechnicalError {
  constructor(message: string, key?: string, context?: Record<string, any>) {
    const code = 'YYC3-ERROR-CACHE-001';
    super(message, code, 500, { ...context, key });
  }
}
```

##### 3.3.4 前端全局异常处理器

```typescript
// frontend/utils/errorHandler.ts
import { BaseError, ValidationError, UnauthorizedError, ForbiddenError, NotFoundError } from '@/shared/errors';

export interface ErrorHandlerContext {
  showError: (message: string) => void;
  showNotification: (message: string, type: 'error' | 'warning' | 'info') => void;
  redirectTo?: (path: string) => void;
  logError?: (error: Error) => void;
}

export class FrontendErrorHandler {
  private context: ErrorHandlerContext;

  constructor(context: ErrorHandlerContext) {
    this.context = context;
  }

  handleError(error: unknown): void {
    console.error('Frontend Error:', error);

    if (error instanceof BaseError) {
      this.handleBusinessError(error);
    } else if (error instanceof Error) {
      this.handleGenericError(error);
    } else {
      this.handleUnknownError(error);
    }

    this.logError(error);
  }

  private handleBusinessError(error: BaseError): void {
    switch (error.constructor) {
      case ValidationError:
        this.context.showError(error.message);
        break;
      case UnauthorizedError:
        this.context.showNotification('请先登录', 'error');
        this.context.redirectTo?.('/login');
        break;
      case ForbiddenError:
        this.context.showNotification('没有权限访问', 'error');
        this.context.redirectTo?.('/403');
        break;
      case NotFoundError:
        this.context.showNotification('资源不存在', 'error');
        this.context.redirectTo?.('/404');
        break;
      default:
        this.context.showError(error.message);
    }
  }

  private handleGenericError(error: Error): void {
    this.context.showError('系统错误，请稍后重试');
  }

  private handleUnknownError(error: unknown): void {
    this.context.showError('发生未知错误');
  }

  private logError(error: unknown): void {
    if (this.context.logError) {
      this.context.logError(error instanceof Error ? error : new Error(String(error)));
    }
  }
}

export const createErrorHandler = (context: ErrorHandlerContext) => {
  return new FrontendErrorHandler(context);
};
```

##### 3.3.5 React Error Boundary组件

```typescript
// frontend/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createErrorHandler } from '@/utils/errorHandler';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private errorHandler = createErrorHandler({
    showError: (message) => {
      console.error('Error Boundary:', message);
    },
    showNotification: (message, type) => {
      console.log(`[${type}] ${message}`);
    },
    redirectTo: (path) => {
      window.location.href = path;
    },
    logError: (error) => {
      console.error('Logged error:', error);
    },
  });

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error Boundary caught an error:', error, errorInfo);

    this.errorHandler.handleError(error);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="yyc-error-boundary">
          <div className="yyc-error-boundary__content">
            <h1>出错了</h1>
            <p>抱歉，页面发生了错误</p>
            <button onClick={() => window.location.reload()}>刷新页面</button>
            <button onClick={() => window.history.back()}>返回上一页</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

##### 3.3.6 全局异常监听器

```typescript
// frontend/utils/globalErrorListener.ts
import { createErrorHandler } from './errorHandler';

export const setupGlobalErrorListeners = () => {
  const errorHandler = createErrorHandler({
    showError: (message) => {
      alert(message);
    },
    showNotification: (message, type) => {
      console.log(`[${type}] ${message}`);
    },
    redirectTo: (path) => {
      window.location.href = path;
    },
    logError: (error) => {
      console.error('Global error:', error);
    },
  });

  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global error caught:', { message, source, lineno, colno, error });
    errorHandler.handleError(error || new Error(String(message)));
    return false;
  };

  window.onunhandledrejection = (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    errorHandler.handleError(event.reason);
    event.preventDefault();
  };
};
```

##### 3.3.7 API请求异常拦截器

```typescript
// frontend/utils/apiInterceptor.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UnauthorizedError, ForbiddenError, NotFoundError, NetworkError } from '@/shared/errors';
import { createErrorHandler } from './errorHandler';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
});

const errorHandler = createErrorHandler({
  showError: (message) => {
    alert(message);
  },
  showNotification: (message, type) => {
    console.log(`[${type}] ${message}`);
  },
  redirectTo: (path) => {
    window.location.href = path;
  },
  logError: (error) => {
    console.error('API error:', error);
  },
});

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const newToken = await refreshToken();
              if (newToken && originalRequest.headers) {
                localStorage.setItem('authToken', newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
              }
            } catch (refreshError) {
              errorHandler.handleError(new UnauthorizedError());
            }
          }
          errorHandler.handleError(new UnauthorizedError());
          break;

        case 403:
          errorHandler.handleError(new ForbiddenError());
          break;

        case 404:
          errorHandler.handleError(new NotFoundError('Resource'));
          break;

        case 500:
          errorHandler.handleError(new Error('服务器内部错误'));
          break;

        default:
          const errorMessage = (data as any)?.message || '请求失败';
          errorHandler.handleError(new Error(errorMessage));
      }
    } else if (error.request) {
      errorHandler.handleError(new NetworkError('网络请求失败'));
    } else {
      errorHandler.handleError(new Error('请求配置错误'));
    }

    return Promise.reject(error);
  }
);

async function refreshToken(): Promise<string> {
  const response = await axios.post('/api/auth/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  return response.data.token;
}

export default apiClient;
```

#### 3.4 后端异常处理实现

##### 3.4.1 后端全局异常处理器

```typescript
// backend/middleware/error.middleware.ts
import { Context, Next } from 'hono';
import { ZodError } from 'zod';
import { BaseError, ValidationError, NotFoundError, UnauthorizedError, ForbiddenError } from '@/shared/errors';

export const errorMiddleware = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    return handleError(c, error);
  }
};

function handleError(c: Context, error: unknown) {
  console.error('Backend Error:', error);

  if (error instanceof BaseError) {
    return c.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          context: error.context,
        },
      },
      error.statusCode
    );
  }

  if (error instanceof ZodError) {
    return c.json(
      {
        success: false,
        error: {
          code: 'YYC3-ERROR-VALIDATION-001',
          message: error.errors[0].message,
          details: error.errors,
        },
      },
      400
    );
  }

  if (error instanceof Error) {
    return c.json(
      {
        success: false,
        error: {
          code: 'YYC3-ERROR-SYSTEM-001',
          message: process.env.NODE_ENV === 'development' ? error.message : '服务器内部错误',
        },
      },
      500
    );
  }

  return c.json(
    {
      success: false,
      error: {
        code: 'YYC3-ERROR-UNKNOWN-001',
        message: '发生未知错误',
      },
    },
    500
  );
}
```

##### 3.4.2 异常日志记录器

```typescript
// backend/utils/logger.ts
import { BaseError } from '@/shared/errors';

export class Logger {
  private static instance: Logger;
  private logs: Array<{
    timestamp: Date;
    level: 'info' | 'warn' | 'error';
    message: string;
    error?: Error;
    context?: Record<string, any>;
  }> = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(message: string, context?: Record<string, any>): void {
    this.log('info', message, undefined, context);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log('warn', message, undefined, context);
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log('error', message, error, context);
  }

  private log(
    level: 'info' | 'warn' | 'error',
    message: string,
    error?: Error,
    context?: Record<string, any>
  ): void {
    const logEntry = {
      timestamp: new Date(),
      level,
      message,
      error,
      context,
    };

    this.logs.push(logEntry);

    const logMessage = `[${logEntry.timestamp.toISOString()}] [${level.toUpperCase()}] ${message}`;

    if (error) {
      console.error(logMessage, error);
      if (error.stack) {
        console.error(error.stack);
      }
    } else {
      console.log(logMessage);
    }

    if (context) {
      console.log('Context:', JSON.stringify(context, null, 2));
    }
  }

  getLogs(): Array<{
    timestamp: Date;
    level: 'info' | 'warn' | 'error';
    message: string;
    error?: Error;
    context?: Record<string, any>;
  }> {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = Logger.getInstance();
```

##### 3.4.3 服务层异常处理示例

```typescript
// backend/services/user.service.ts
import { userRepository } from '@/repositories/user.repository';
import { ValidationError, NotFoundError, ConflictError } from '@/shared/errors';
import { logger } from '@/utils/logger';

export class UserService {
  async createUser(data: CreateUserParams) {
    try {
      logger.info('Creating user', { email: data.email });

      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictError('邮箱已被注册');
      }

      const user = await userRepository.create(data);
      logger.info('User created successfully', { userId: user.userId });

      return user;
    } catch (error) {
      logger.error('Failed to create user', error as Error, { email: data.email });
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      logger.info('Fetching user', { userId });

      const user = await userRepository.findById(userId);
      if (!user) {
        throw new NotFoundError('User', userId);
      }

      return user;
    } catch (error) {
      logger.error('Failed to fetch user', error as Error, { userId });
      throw error;
    }
  }
}
```

##### 3.4.4 数据库异常处理

```typescript
// backend/repositories/base.repository.ts
import { DatabaseError } from '@/shared/errors';
import { logger } from '@/utils/logger';

export class BaseRepository {
  protected handleDatabaseError(error: unknown, query?: string): never {
    logger.error('Database error', error as Error, { query });

    if (error instanceof Error) {
      throw new DatabaseError(error.message, query);
    }

    throw new DatabaseError('Unknown database error', query);
  }

  protected async executeQuery<T>(query: string, params?: any[]): Promise<T> {
    try {
      return await this.db.query(query, params);
    } catch (error) {
      this.handleDatabaseError(error, query);
    }
  }
}
```

##### 3.4.5 外部服务异常处理

```typescript
// backend/services/ai.service.ts
import axios, { AxiosError } from 'axios';
import { ExternalServiceError } from '@/shared/errors';
import { logger } from '@/utils/logger';

export class AIService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = process.env.AI_SERVICE_URL || '';
    this.apiKey = process.env.AI_SERVICE_API_KEY || '';
  }

  async generateScript(prompt: string): Promise<string> {
    try {
      logger.info('Calling AI service', { prompt: prompt.substring(0, 50) });

      const response = await axios.post(
        `${this.baseUrl}/generate`,
        { prompt },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      logger.info('AI service call successful');
      return response.data.script;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        logger.error('AI service request failed', error, {
          url: axiosError.config?.url,
          status: axiosError.response?.status,
        });

        if (axiosError.code === 'ECONNABORTED') {
          throw new ExternalServiceError('AI Service', '请求超时');
        }

        if (axiosError.response) {
          throw new ExternalServiceError(
            'AI Service',
            `服务返回错误: ${axiosError.response.status}`
          );
        }

        throw new ExternalServiceError('AI Service', '网络连接失败');
      }

      logger.error('AI service error', error as Error);
      throw new ExternalServiceError('AI Service', '未知错误');
    }
  }
}
```

#### 3.5 异常处理最佳实践

##### 3.5.1 异常处理原则

1. **早捕获，早处理**：在异常发生的最近层级捕获和处理
2. **不吞没异常**：避免空的catch块，至少记录日志
3. **提供有意义的错误信息**：错误消息应清晰描述问题
4. **区分业务异常和技术异常**：使用不同的错误类型
5. **保持异常链**：使用cause或stack trace保留原始错误信息
6. **统一错误响应格式**：API错误响应格式保持一致
7. **记录足够的上下文**：错误日志应包含足够的调试信息
8. **敏感信息保护**：避免在错误消息中暴露敏感信息

##### 3.5.2 异常处理检查清单

- [ ] 所有公共方法都定义了可能抛出的异常
- [ ] 所有异常都有对应的错误码
- [ ] 异常消息清晰且用户友好
- [ ] 敏感信息不包含在异常消息中
- [ ] 所有异常都被记录到日志系统
- [ ] 前端实现了全局异常处理器
- [ ] 后端实现了全局异常中间件
- [ ] API响应格式统一且规范
- [ ] 错误边界组件正确配置
- [ ] 异常重试机制合理配置
- [ ] 外部服务调用有超时和重试机制
- [ ] 数据库操作有事务回滚机制

##### 3.5.3 异常监控与告警

```typescript
// backend/utils/errorMonitor.ts
import { logger } from './logger';

interface ErrorMetrics {
  totalErrors: number;
  errorsByType: Record<string, number>;
  errorsByEndpoint: Record<string, number>;
  recentErrors: Array<{
    timestamp: Date;
    type: string;
    message: string;
    endpoint?: string;
  }>;
}

export class ErrorMonitor {
  private static instance: ErrorMonitor;
  private metrics: ErrorMetrics = {
    totalErrors: 0,
    errorsByType: {},
    errorsByEndpoint: {},
    recentErrors: [],
  };

  private constructor() {}

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  recordError(error: Error, endpoint?: string): void {
    const errorType = error.constructor.name;

    this.metrics.totalErrors++;
    this.metrics.errorsByType[errorType] = (this.metrics.errorsByType[errorType] || 0) + 1;

    if (endpoint) {
      this.metrics.errorsByEndpoint[endpoint] = (this.metrics.errorsByEndpoint[endpoint] || 0) + 1;
    }

    this.metrics.recentErrors.push({
      timestamp: new Date(),
      type: errorType,
      message: error.message,
      endpoint,
    });

    if (this.metrics.recentErrors.length > 100) {
      this.metrics.recentErrors.shift();
    }

    this.checkAlertThresholds(errorType, endpoint);
  }

  private checkAlertThresholds(errorType: string, endpoint?: string): void {
    const errorCount = this.metrics.errorsByType[errorType] || 0;
    const threshold = 10;

    if (errorCount >= threshold) {
      logger.warn(`Error threshold exceeded for type: ${errorType}`, {
        count: errorCount,
        threshold,
      });

      this.sendAlert(errorType, errorCount, endpoint);
    }
  }

  private sendAlert(errorType: string, count: number, endpoint?: string): void {
    const alertMessage = `Error Alert: ${errorType} occurred ${count} times${endpoint ? ` on ${endpoint}` : ''}`;
    console.log('🚨', alertMessage);

    // 这里可以集成实际的告警系统，如：
    // - 发送邮件
    // - 发送Slack消息
    // - 调用PagerDuty API
    // - 发送短信通知
  }

  getMetrics(): ErrorMetrics {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.metrics = {
      totalErrors: 0,
      errorsByType: {},
      errorsByEndpoint: {},
      recentErrors: [],
    };
  }
}

export const errorMonitor = ErrorMonitor.getInstance();
```

#### 3.6 异常处理测试

##### 3.6.1 异常处理单元测试

```typescript
// tests/unit/errors/base.error.test.ts
import { describe, it, expect } from 'vitest';
import { BaseError } from '@/shared/errors/base.error';

describe('BaseError', () => {
  it('should create error with correct properties', () => {
    const error = new BaseError(
      'Test error message',
      'TEST-001',
      400,
      { userId: '123' }
    );

    expect(error.message).toBe('Test error message');
    expect(error.code).toBe('TEST-001');
    expect(error.statusCode).toBe(400);
    expect(error.context).toEqual({ userId: '123' });
    expect(error.name).toBe('BaseError');
    expect(error.timestamp).toBeInstanceOf(Date);
  });

  it('should serialize to JSON correctly', () => {
    const error = new BaseError('Test error', 'TEST-001', 400);
    const json = error.toJSON();

    expect(json).toMatchObject({
      name: 'BaseError',
      message: 'Test error',
      code: 'TEST-001',
      statusCode: 400,
    });
    expect(json.timestamp).toBeDefined();
  });
});
```

```typescript
// tests/unit/errors/business.error.test.ts
import { describe, it, expect } from 'vitest';
import { ValidationError, NotFoundError, UnauthorizedError, ForbiddenError } from '@/shared/errors/business.error';

describe('BusinessError', () => {
  describe('ValidationError', () => {
    it('should create validation error', () => {
      const error = new ValidationError('Email is invalid', 'email');

      expect(error.message).toBe('Email is invalid');
      expect(error.code).toBe('YYC3-ERROR-VALIDATION-001');
      expect(error.statusCode).toBe(400);
      expect(error.context?.field).toBe('email');
    });
  });

  describe('NotFoundError', () => {
    it('should create not found error with id', () => {
      const error = new NotFoundError('User', '123');

      expect(error.message).toBe('User with id 123 not found');
      expect(error.code).toBe('YYC3-ERROR-NOTFOUND-001');
      expect(error.statusCode).toBe(404);
      expect(error.context?.resource).toBe('User');
      expect(error.context?.id).toBe('123');
    });

    it('should create not found error without id', () => {
      const error = new NotFoundError('Resource');

      expect(error.message).toBe('Resource not found');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('UnauthorizedError', () => {
    it('should create unauthorized error', () => {
      const error = new UnauthorizedError('Please login');

      expect(error.message).toBe('Please login');
      expect(error.code).toBe('YYC3-ERROR-UNAUTHORIZED-001');
      expect(error.statusCode).toBe(401);
    });
  });

  describe('ForbiddenError', () => {
    it('should create forbidden error', () => {
      const error = new ForbiddenError('Access denied');

      expect(error.message).toBe('Access denied');
      expect(error.code).toBe('YYC3-ERROR-FORBIDDEN-001');
      expect(error.statusCode).toBe(403);
    });
  });
});
```

```typescript
// tests/unit/frontend/errorHandler.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FrontendErrorHandler, createErrorHandler } from '@/utils/errorHandler';
import { ValidationError, UnauthorizedError, NotFoundError } from '@/shared/errors';

describe('FrontendErrorHandler', () => {
  let mockContext: any;
  let errorHandler: FrontendErrorHandler;

  beforeEach(() => {
    mockContext = {
      showError: vi.fn(),
      showNotification: vi.fn(),
      redirectTo: vi.fn(),
      logError: vi.fn(),
    };
    errorHandler = createErrorHandler(mockContext);
  });

  it('should handle ValidationError', () => {
    const error = new ValidationError('Invalid email');
    errorHandler.handleError(error);

    expect(mockContext.showError).toHaveBeenCalledWith('Invalid email');
  });

  it('should handle UnauthorizedError', () => {
    const error = new UnauthorizedError();
    errorHandler.handleError(error);

    expect(mockContext.showNotification).toHaveBeenCalledWith('请先登录', 'error');
    expect(mockContext.redirectTo).toHaveBeenCalledWith('/login');
  });

  it('should handle NotFoundError', () => {
    const error = new NotFoundError('Resource');
    errorHandler.handleError(error);

    expect(mockContext.showNotification).toHaveBeenCalledWith('资源不存在', 'error');
    expect(mockContext.redirectTo).toHaveBeenCalledWith('/404');
  });

  it('should handle generic Error', () => {
    const error = new Error('Something went wrong');
    errorHandler.handleError(error);

    expect(mockContext.showError).toHaveBeenCalledWith('系统错误，请稍后重试');
  });

  it('should handle unknown error', () => {
    errorHandler.handleError('unknown error');

    expect(mockContext.showError).toHaveBeenCalledWith('发生未知错误');
  });
});
```

```typescript
// tests/unit/backend/errorMiddleware.test.ts
import { describe, it, expect, vi } from 'vitest';
import { Hono } from 'hono';
import { errorMiddleware } from '@/middleware/error.middleware';
import { ValidationError, NotFoundError } from '@/shared/errors';

describe('Error Middleware', () => {
  it('should handle ValidationError', async () => {
    const app = new Hono();
    app.use('*', errorMiddleware);
    app.get('/test', () => {
      throw new ValidationError('Invalid data');
    });

    const res = await app.request('/test');
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('YYC3-ERROR-VALIDATION-001');
    expect(json.error.message).toBe('Invalid data');
  });

  it('should handle NotFoundError', async () => {
    const app = new Hono();
    app.use('*', errorMiddleware);
    app.get('/test', () => {
      throw new NotFoundError('User', '123');
    });

    const res = await app.request('/test');
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('YYC3-ERROR-NOTFOUND-001');
  });

  it('should handle generic Error', async () => {
    const app = new Hono();
    app.use('*', errorMiddleware);
    app.get('/test', () => {
      throw new Error('Internal error');
    });

    const res = await app.request('/test');
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('YYC3-ERROR-SYSTEM-001');
  });
});
```

#### 3.7 异常处理文档

##### 3.7.1 异常处理流程图

```
用户操作
  ↓
前端组件
  ↓
API请求
  ↓
[异常发生？]
  ├─ 是 → 前端异常处理器
  │       ↓
  │     判断异常类型
  │       ├─ ValidationError → 显示错误提示
  │       ├─ UnauthorizedError → 跳转登录页
  │       ├─ ForbiddenError → 跳转403页
  │       ├─ NotFoundError → 跳转404页
  │       └─ 其他 → 显示通用错误
  │       ↓
  │     记录日志
  │       ↓
  │     上报监控
  │
  └─ 否 → 后端服务
          ↓
        [异常发生？]
          ├─ 是 → 后端异常中间件
          │       ↓
          │     判断异常类型
          │       ├─ BusinessError → 返回业务错误响应
          │       ├─ TechnicalError → 返回技术错误响应
          │       └─ SystemError → 返回系统错误响应
          │       ↓
          │     记录日志
          │       ↓
          │     更新监控指标
          │       ↓
          │     [达到告警阈值？]
          │         ├─ 是 → 发送告警
          │         └─ 否 → 结束
          │
          └─ 否 → 返回成功响应
                  ↓
                前端处理响应
```

##### 3.7.2 异常处理配置文件

```typescript
// shared/config/error.config.ts
export interface ErrorConfig {
  development: {
    showStackTrace: boolean;
    showDetailedErrors: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
  production: {
    showStackTrace: boolean;
    showDetailedErrors: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
  alertThresholds: {
    errorType: string;
    count: number;
    timeWindow: number;
  }[];
  retryConfig: {
    maxRetries: number;
    retryDelay: number;
    retryableErrors: string[];
  };
}

export const errorConfig: ErrorConfig = {
  development: {
    showStackTrace: true,
    showDetailedErrors: true,
    logLevel: 'debug',
  },
  production: {
    showStackTrace: false,
    showDetailedErrors: false,
    logLevel: 'error',
  },
  alertThresholds: [
    { errorType: 'DatabaseError', count: 10, timeWindow: 60000 },
    { errorType: 'ExternalServiceError', count: 5, timeWindow: 60000 },
    { errorType: 'NetworkError', count: 20, timeWindow: 60000 },
  ],
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    retryableErrors: ['NetworkError', 'ExternalServiceError', 'CacheError'],
  },
};
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
