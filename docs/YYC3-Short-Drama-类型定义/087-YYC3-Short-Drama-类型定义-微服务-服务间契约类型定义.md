---
@file: 087-YYC3-Short-Drama-类型定义-微服务-服务间契约类型定义.md
@description: YYC3-Short-Drama 微服务之间调用的契约数据类型定义，保障服务间数据一致性
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[微服务],[契约]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 087-YYC3-Short-Drama-类型定义-微服务-服务间契约类型定义

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-微服务-服务间契约类型定义相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范微服务-服务间契约类型定义相关的业务标准与技术落地要求
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

### 3. 微服务契约类型定义

#### 3.1 服务契约枚举

```typescript
enum ServiceContractType {
  REST_API = 'rest_api',
  GRPC = 'grpc',
  MESSAGE_QUEUE = 'message_queue',
  WEBSOCKET = 'websocket',
  EVENT_BUS = 'event_bus'
}
```

#### 3.2 服务契约类型说明

| 契约代码 | 契约名称 | 契约描述 | 适用场景 | 性能特点 |
|---------|---------|---------|---------|---------|
| rest_api | REST API | 基于HTTP的RESTful接口 | 同步调用、简单查询 | 易于调试、性能中等 |
| grpc | gRPC | 基于HTTP/2的RPC接口 | 高性能调用、流式传输 | 性能高、双向流 |
| message_queue | 消息队列 | 基于消息队列的异步通信 | 异步处理、解耦服务 | 高吞吐、延迟较高 |
| websocket | WebSocket | 基于WebSocket的实时通信 | 实时推送、双向通信 | 低延迟、实时性好 |
| event_bus | 事件总线 | 基于事件驱动的异步通信 | 事件发布订阅、解耦 | 松耦合、可扩展 |

### 4. 微服务列表与端口

#### 4.1 服务列表

```typescript
interface MicroService {
  serviceName: string;
  serviceId: string;
  version: string;
  port: number;
  protocol: ServiceContractType;
  healthCheck: string;
  dependencies: string[];
  description: string;
}

const microServices: MicroService[] = [
  {
    serviceName: 'user-service',
    serviceId: 'yyc3-user-service',
    version: '1.0.0',
    port: 3201,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['auth-service'],
    description: '用户服务，负责用户信息管理、用户资料维护'
  },
  {
    serviceName: 'auth-service',
    serviceId: 'yyc3-auth-service',
    version: '1.0.0',
    port: 3202,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: [],
    description: '认证服务，负责用户认证、授权、令牌管理'
  },
  {
    serviceName: 'drama-service',
    serviceId: 'yyc3-drama-service',
    version: '1.0.0',
    port: 3203,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['user-service', 'ai-service'],
    description: '短剧服务，负责短剧内容管理、短剧审核'
  },
  {
    serviceName: 'episode-service',
    serviceId: 'yyc3-episode-service',
    version: '1.0.0',
    port: 3204,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['drama-service'],
    description: '剧集服务，负责剧集内容管理、剧集播放'
  },
  {
    serviceName: 'comment-service',
    serviceId: 'yyc3-comment-service',
    version: '1.0.0',
    port: 3205,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['user-service', 'drama-service'],
    description: '评论服务，负责评论内容管理、评论审核'
  },
  {
    serviceName: 'like-service',
    serviceId: 'yyc3-like-service',
    version: '1.0.0',
    port: 3206,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['user-service', 'drama-service'],
    description: '点赞服务，负责点赞记录管理、点赞统计'
  },
  {
    serviceName: 'favorite-service',
    serviceId: 'yyc3-favorite-service',
    version: '1.0.0',
    port: 3207,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['user-service', 'drama-service'],
    description: '收藏服务，负责收藏记录管理、收藏列表'
  },
  {
    serviceName: 'follow-service',
    serviceId: 'yyc3-follow-service',
    version: '1.0.0',
    port: 3208,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['user-service'],
    description: '关注服务，负责关注关系管理、关注列表'
  },
  {
    serviceName: 'star-value-service',
    serviceId: 'yyc3-star-value-service',
    version: '1.0.0',
    port: 3209,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['user-service', 'payment-service'],
    description: '星值服务，负责星值管理、星值交易记录'
  },
  {
    serviceName: 'payment-service',
    serviceId: 'yyc3-payment-service',
    version: '1.0.0',
    port: 3210,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['user-service', 'star-value-service'],
    description: '支付服务，负责支付处理、订单管理'
  },
  {
    serviceName: 'ai-service',
    serviceId: 'yyc3-ai-service',
    version: '1.0.0',
    port: 3211,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: [],
    description: 'AI服务，负责AI生成、内容优化、智能推荐'
  },
  {
    serviceName: 'recommend-service',
    serviceId: 'yyc3-recommend-service',
    version: '1.0.0',
    port: 3212,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['user-service', 'drama-service'],
    description: '推荐服务，负责内容推荐、个性化推荐'
  },
  {
    serviceName: 'gateway-service',
    serviceId: 'yyc3-gateway-service',
    version: '1.0.0',
    port: 3200,
    protocol: ServiceContractType.REST_API,
    healthCheck: '/health',
    dependencies: ['auth-service'],
    description: '网关服务，负责路由转发、负载均衡、认证鉴权'
  }
]
```

### 5. 服务间通信协议定义

#### 5.1 通信协议枚举

```typescript
enum ServiceCommunicationProtocol {
  HTTP = 'http',
  HTTPS = 'https',
  GRPC = 'grpc',
  TCP = 'tcp',
  WEBSOCKET = 'websocket'
}
```

#### 5.2 通信协议说明

| 协议代码 | 协议名称 | 协议描述 | 端口范围 | 加密方式 | 适用场景 |
|---------|---------|---------|---------|---------|---------|
| http | HTTP | 超文本传输协议 | 3200-3299 | 无加密 | 内网通信、开发环境 |
| https | HTTPS | 安全超文本传输协议 | 3200-3299 | TLS/SSL | 外网通信、生产环境 |
| grpc | gRPC | 远程过程调用协议 | 3300-3399 | TLS | 高性能RPC调用 |
| tcp | TCP | 传输控制协议 | 3400-3499 | 自定义 | 自定义协议通信 |
| websocket | WebSocket | 全双工通信协议 | 3500-3599 | TLS/WSS | 实时通信、消息推送 |

### 6. 服务请求响应类型定义

#### 6.1 请求类型定义

```typescript
interface ServiceRequest {
  requestId: string;
  timestamp: number;
  sourceService: string;
  targetService: string;
  method: string;
  path: string;
  headers: Record<string, string>;
  body?: any;
  query?: Record<string, any>;
}

interface ServiceRequestOptions {
  timeout: number;
  retryCount: number;
  retryDelay: number;
  circuitBreaker: boolean;
  fallback?: string;
}
```

#### 6.2 响应类型定义

```typescript
interface ServiceResponse<T = any> {
  requestId: string;
  timestamp: number;
  sourceService: string;
  targetService: string;
  statusCode: number;
  headers: Record<string, string>;
  data?: T;
  error?: ServiceError;
  processingTime: number;
}

interface ServiceError {
  code: string;
  message: string;
  details?: any;
  stack?: string;
}
```

#### 6.3 响应状态码定义

```typescript
enum ServiceResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}
```

### 7. 服务错误码定义

#### 7.1 错误码枚举

```typescript
enum ServiceErrorCode {
  SUCCESS = '0000',
  
  INVALID_REQUEST = '1001',
  UNAUTHORIZED = '1002',
  FORBIDDEN = '1003',
  NOT_FOUND = '1004',
  CONFLICT = '1005',
  VALIDATION_ERROR = '1006',
  
  SERVICE_UNAVAILABLE = '2001',
  SERVICE_TIMEOUT = '2002',
  SERVICE_OVERLOAD = '2003',
  CIRCUIT_BREAKER_OPEN = '2004',
  
  INTERNAL_ERROR = '3001',
  DATABASE_ERROR = '3002',
  NETWORK_ERROR = '3003',
  UNKNOWN_ERROR = '3004'
}
```

#### 7.2 错误码说明

| 错误代码 | 错误名称 | 错误描述 | HTTP状态码 | 处理建议 |
|---------|---------|---------|-----------|---------|
| 0000 | 成功 | 请求处理成功 | 200 | 正常处理 |
| 1001 | 请求参数错误 | 请求参数格式或内容不正确 | 400 | 检查请求参数 |
| 1002 | 未授权 | 请求未授权或令牌无效 | 401 | 重新登录获取令牌 |
| 1003 | 禁止访问 | 无权限访问该资源 | 403 | 检查用户权限 |
| 1004 | 资源不存在 | 请求的资源不存在 | 404 | 检查资源ID |
| 1005 | 资源冲突 | 资源已存在或状态冲突 | 409 | 检查资源状态 |
| 1006 | 验证错误 | 数据验证失败 | 422 | 检查数据格式 |
| 2001 | 服务不可用 | 目标服务不可用 | 503 | 稍后重试 |
| 2002 | 服务超时 | 请求处理超时 | 504 | 增加超时时间 |
| 2003 | 服务过载 | 目标服务负载过高 | 503 | 稍后重试 |
| 2004 | 熔断器开启 | 熔断器已开启，拒绝请求 | 503 | 等待熔断器恢复 |
| 3001 | 内部错误 | 服务内部错误 | 500 | 联系技术支持 |
| 3002 | 数据库错误 | 数据库操作错误 | 500 | 联系技术支持 |
| 3003 | 网络错误 | 网络通信错误 | 500 | 检查网络连接 |
| 3004 | 未知错误 | 未知错误 | 500 | 联系技术支持 |

### 8. 服务超时与重试规则

#### 8.1 超时配置

```typescript
interface TimeoutConfig {
  service: string;
  connectTimeout: number;
  readTimeout: number;
  writeTimeout: number;
  maxTimeout: number;
}

const timeoutConfigs: TimeoutConfig[] = [
  {
    service: 'user-service',
    connectTimeout: 3000,
    readTimeout: 5000,
    writeTimeout: 5000,
    maxTimeout: 10000
  },
  {
    service: 'auth-service',
    connectTimeout: 2000,
    readTimeout: 3000,
    writeTimeout: 3000,
    maxTimeout: 5000
  },
  {
    service: 'drama-service',
    connectTimeout: 3000,
    readTimeout: 10000,
    writeTimeout: 10000,
    maxTimeout: 30000
  },
  {
    service: 'ai-service',
    connectTimeout: 5000,
    readTimeout: 60000,
    writeTimeout: 60000,
    maxTimeout: 120000
  }
]
```

#### 8.2 重试策略

```typescript
interface RetryStrategy {
  service: string;
  maxRetries: number;
  retryDelay: number;
  backoffMultiplier: number;
  retryableStatusCodes: number[];
  retryableErrors: string[];
}

const retryStrategies: RetryStrategy[] = [
  {
    service: 'user-service',
    maxRetries: 3,
    retryDelay: 1000,
    backoffMultiplier: 2,
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
    retryableErrors: ['ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND']
  },
  {
    service: 'drama-service',
    maxRetries: 2,
    retryDelay: 2000,
    backoffMultiplier: 1.5,
    retryableStatusCodes: [429, 500, 503],
    retryableErrors: ['ECONNRESET', 'ETIMEDOUT']
  },
  {
    service: 'ai-service',
    maxRetries: 1,
    retryDelay: 5000,
    backoffMultiplier: 1,
    retryableStatusCodes: [500, 503],
    retryableErrors: ['ETIMEDOUT']
  }
]
```

### 9. 服务熔断与降级规则

#### 9.1 熔断器配置

```typescript
interface CircuitBreakerConfig {
  service: string;
  enabled: boolean;
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
  resetTimeout: number;
  halfOpenMaxCalls: number;
}

const circuitBreakerConfigs: CircuitBreakerConfig[] = [
  {
    service: 'user-service',
    enabled: true,
    failureThreshold: 5,
    successThreshold: 3,
    timeout: 60000,
    resetTimeout: 30000,
    halfOpenMaxCalls: 5
  },
  {
    service: 'drama-service',
    enabled: true,
    failureThreshold: 10,
    successThreshold: 5,
    timeout: 60000,
    resetTimeout: 60000,
    halfOpenMaxCalls: 10
  },
  {
    service: 'ai-service',
    enabled: true,
    failureThreshold: 3,
    successThreshold: 2,
    timeout: 120000,
    resetTimeout: 120000,
    halfOpenMaxCalls: 3
  }
]
```

#### 9.2 降级策略

```typescript
interface FallbackStrategy {
  service: string;
  method: string;
  fallbackService?: string;
  fallbackData?: any;
  fallbackMessage?: string;
}

const fallbackStrategies: FallbackStrategy[] = [
  {
    service: 'recommend-service',
    method: 'getRecommendations',
    fallbackService: 'drama-service',
    fallbackData: [],
    fallbackMessage: '推荐服务暂时不可用，返回热门内容'
  },
  {
    service: 'ai-service',
    method: 'generateScript',
    fallbackMessage: 'AI服务暂时不可用，请稍后重试'
  },
  {
    service: 'comment-service',
    method: 'getComments',
    fallbackData: [],
    fallbackMessage: '评论服务暂时不可用'
  }
]
```

### 10. 服务监控与追踪规则

#### 10.1 追踪上下文

```typescript
interface TraceContext {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  sampled: boolean;
  baggage: Record<string, string>;
}

interface ServiceSpan {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  serviceName: string;
  operationName: string;
  startTime: number;
  endTime: number;
  duration: number;
  tags: Record<string, string>;
  logs: SpanLog[];
}

interface SpanLog {
  timestamp: number;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  fields?: Record<string, any>;
}
```

#### 10.2 监控指标

```typescript
interface ServiceMetrics {
  serviceName: string;
  timestamp: number;
  requestCount: number;
  successCount: number;
  errorCount: number;
  avgResponseTime: number;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  circuitBreakerState: 'closed' | 'open' | 'half-open';
  activeConnections: number;
}
```

### 11. 服务间契约示例

#### 11.1 用户服务契约

```typescript
interface UserServiceContract {
  getUser: {
    method: 'GET';
    path: '/api/users/:userId';
    request: {
      userId: string;
    };
    response: {
      userId: string;
      phone?: string;
      email?: string;
      nickname: string;
      avatar?: string;
      bio?: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
  
  updateUser: {
    method: 'PUT';
    path: '/api/users/:userId';
    request: {
      userId: string;
      nickname?: string;
      avatar?: string;
      bio?: string;
    };
    response: {
      userId: string;
      nickname: string;
      avatar?: string;
      bio?: string;
      updatedAt: Date;
    };
  };
  
  getUserProfile: {
    method: 'GET';
    path: '/api/users/:userId/profile';
    request: {
      userId: string;
    };
    response: {
      userId: string;
      nickname: string;
      avatar?: string;
      bio?: string;
      gender?: string;
      birthday?: Date;
      location?: string;
      preferences: Record<string, any>;
    };
  };
}
```

#### 11.2 短剧服务契约

```typescript
interface DramaServiceContract {
  getDrama: {
    method: 'GET';
    path: '/api/dramas/:dramaId';
    request: {
      dramaId: string;
    };
    response: {
      dramaId: string;
      creatorId: string;
      title: string;
      description: string;
      coverImage: string;
      posterImage: string;
      categoryIds: string[];
      tags: string[];
      totalEpisodes: number;
      publishedEpisodes: number;
      duration: number;
      status: string;
      viewCount: number;
      likeCount: number;
      commentCount: number;
      shareCount: number;
      favoriteCount: number;
      createdAt: Date;
      updatedAt: Date;
      publishedAt?: Date;
    };
  };
  
  createDrama: {
    method: 'POST';
    path: '/api/dramas';
    request: {
      creatorId: string;
      title: string;
      description: string;
      coverImage: string;
      posterImage: string;
      categoryIds: string[];
      tags: string[];
      totalEpisodes: number;
      duration: number;
    };
    response: {
      dramaId: string;
      creatorId: string;
      title: string;
      description: string;
      coverImage: string;
      posterImage: string;
      categoryIds: string[];
      tags: string[];
      totalEpisodes: number;
      publishedEpisodes: number;
      duration: number;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
  
  listDramas: {
    method: 'GET';
    path: '/api/dramas';
    request: {
      page: number;
      pageSize: number;
      categoryId?: string;
      status?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    };
    response: {
      dramas: any[];
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
  };
}
```

#### 11.3 AI服务契约

```typescript
interface AIServiceContract {
  generateScript: {
    method: 'POST';
    path: '/api/ai/script/generate';
    request: {
      prompt: string;
      style?: string;
      duration?: number;
      language?: string;
    };
    response: {
      scriptId: string;
      script: string;
      title: string;
      summary: string;
      characters: string[];
      scenes: any[];
      estimatedDuration: number;
      generatedAt: Date;
    };
  };
  
  optimizeContent: {
    method: 'POST';
    path: '/api/ai/content/optimize';
    request: {
      content: string;
      contentType: 'script' | 'description' | 'dialogue';
      optimizationGoals: string[];
    };
    response: {
      originalContent: string;
      optimizedContent: string;
      improvements: string[];
      score: number;
      optimizedAt: Date;
    };
  };
  
  generateRecommendations: {
    method: 'POST';
    path: '/api/ai/recommendations/generate';
    request: {
      userId: string;
      context: string;
      count: number;
      filters?: Record<string, any>;
    };
    response: {
      recommendations: any[];
      algorithm: string;
      confidence: number;
      generatedAt: Date;
    };
  };
}
```

### 12. 附录

#### 12.1 服务契约速查表

| 服务名称 | 服务端口 | 通信协议 | 主要接口 | 依赖服务 |
|---------|---------|---------|---------|---------|
| user-service | 3201 | REST API | getUser, updateUser, getUserProfile | auth-service |
| auth-service | 3202 | REST API | login, register, refreshToken | - |
| drama-service | 3203 | REST API | getDrama, createDrama, listDramas | user-service, ai-service |
| episode-service | 3204 | REST API | getEpisode, createEpisode, listEpisodes | drama-service |
| comment-service | 3205 | REST API | getComments, createComment, deleteComment | user-service, drama-service |
| like-service | 3206 | REST API | like, unlike, getLikeStatus | user-service, drama-service |
| favorite-service | 3207 | REST API | favorite, unfavorite, getFavorites | user-service, drama-service |
| follow-service | 3208 | REST API | follow, unfollow, getFollowers | user-service |
| star-value-service | 3209 | REST API | getBalance, addTransaction, getHistory | user-service, payment-service |
| payment-service | 3210 | REST API | createOrder, processPayment, refund | user-service, star-value-service |
| ai-service | 3211 | REST API | generateScript, optimizeContent, generateRecommendations | - |
| recommend-service | 3212 | REST API | getRecommendations, updatePreferences | user-service, drama-service |
| gateway-service | 3200 | REST API | route, authenticate, loadBalance | auth-service |

#### 12.2 服务调用流程图

```
客户端请求
    ↓
网关服务 (gateway-service:3200)
    ├─ 认证鉴权 → 认证服务 (auth-service:3202)
    ├─ 路由转发 → 用户服务 (user-service:3201)
    ├─ 路由转发 → 短剧服务 (drama-service:3203)
    ├─ 路由转发 → 支付服务 (payment-service:3210)
    └─ 路由转发 → AI服务 (ai-service:3211)

短剧服务 (drama-service:3203)
    ├─ 调用 → 用户服务 (user-service:3201)
    ├─ 调用 → AI服务 (ai-service:3211)
    └─ 调用 → 剧集服务 (episode-service:3204)

AI服务 (ai-service:3211)
    └─ 调用 → 推荐服务 (recommend-service:3212)

推荐服务 (recommend-service:3212)
    ├─ 调用 → 用户服务 (user-service:3201)
    └─ 调用 → 短剧服务 (drama-service:3203)
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
