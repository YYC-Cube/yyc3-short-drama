---
@file: 058-YYC3-Short-Drama-API文档-通用规范-接口签名鉴权手册.md
@description: YYC3-Short-Drama 接口请求的签名、验签、token鉴权的实现规范与调用方式
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [API接口],[通用规范],[接口鉴权]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 058-YYC3-Short-Drama-API文档-通用规范-接口签名鉴权手册

## 概述

本文档详细描述YYC3-Short-Drama-API文档-通用规范-接口签名鉴权手册相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范通用规范-接口签名鉴权手册相关的业务标准与技术落地要求
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

### 3. 接口签名鉴权手册

#### 3.1 鉴权体系架构

##### 3.1.1 鉴权方式概览

```
┌─────────────────────────────────────────┐
│           鉴权体系架构                   │
├─────────────────────────────────────────┤
│  认证方式                              │
│  ├── JWT Token认证                      │
│  ├── API Key认证                        │
│  └── OAuth 2.0认证                     │
├─────────────────────────────────────────┤
│  签名方式                              │
│  ├── HMAC-SHA256签名                    │
│  ├── RSA签名                            │
│  └── 时间戳验证                         │
├─────────────────────────────────────────┤
│  权限控制                              │
│  ├── RBAC（基于角色的访问控制）            │
│  ├── ABAC（基于属性的访问控制）            │
│  └── 资源级权限控制                      │
└─────────────────────────────────────────┘
```

##### 3.1.2 鉴权流程图

```
客户端请求
    │
    ├─ 1. 获取Token
    │   ├─ 登录获取JWT Token
    │   └─ 申请API Key
    │
    ├─ 2. 构建请求
    │   ├─ 添加Authorization头
    │   ├─ 添加时间戳
    │   └─ 计算签名
    │
    ├─ 3. 发送请求
    │   └─ 携带认证信息
    │
    └─ 4. 服务端验证
        ├─ 验证Token有效性
        ├─ 验证签名正确性
        ├─ 验证时间戳有效性
        └─ 验证权限范围
```

#### 3.2 JWT Token认证

##### 3.2.1 JWT Token结构

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user-123",
    "name": "张三",
    "role": "USER",
    "permissions": ["drama:read", "drama:create"],
    "iat": 1640995200,
    "exp": 1641081600
  },
  "signature": "..."
}
```

##### 3.2.2 Token获取流程

```typescript
// frontend/services/auth.service.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('登录失败');
  }

  return await response.json();
};

export const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
  const response = await fetch('/api/v1/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('刷新Token失败');
  }

  return await response.json();
};
```

##### 3.2.3 Token使用规范

```typescript
// frontend/utils/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { accessToken } = await refreshToken(refreshToken);
        
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

#### 3.3 API Key认证

##### 3.3.1 API Key申请流程

```
1. 用户登录系统
2. 进入个人中心
3. 点击"API管理"
4. 点击"创建API Key"
5. 填写API Key信息：
   - 名称：API Key的描述
   - 权限：API Key的权限范围
   - 过期时间：API Key的有效期
6. 系统生成API Key
7. 用户复制并保存API Key
```

##### 3.3.2 API Key格式

```
API Key格式：YYC3-{随机字符串}

示例：
YYC3-sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

组成部分：
- YYC3: 项目标识
- sk: secret key标识
- xxx...: 32位随机字符串
```

##### 3.3.3 API Key使用规范

```typescript
// frontend/services/apiKey.service.ts
export const createApiKey = async (data: {
  name: string;
  permissions: string[];
  expiresAt?: string;
}) => {
  const response = await fetch('/api/v1/api-keys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('创建API Key失败');
  }

  return await response.json();
};

export const useApiKey = (apiKey: string) => {
  const response = await fetch('/api/v1/dramas', {
    method: 'GET',
    headers: {
      'X-API-Key': apiKey,
    },
  });

  return await response.json();
};
```

#### 3.4 签名机制

##### 3.4.1 HMAC-SHA256签名

```typescript
// frontend/utils/signature.ts
import crypto from 'crypto';

export interface SignatureParams {
  method: string;
  path: string;
  query: Record<string, any>;
  body: any;
  timestamp: number;
  apiKey: string;
  apiSecret: string;
}

export const generateSignature = (params: SignatureParams): string => {
  const { method, path, query, body, timestamp, apiKey, apiSecret } = params;

  const sortedQuery = Object.keys(query)
    .sort()
    .map((key) => `${key}=${query[key]}`)
    .join('&');

  const bodyString = typeof body === 'string' ? body : JSON.stringify(body);

  const stringToSign = [
    method.toUpperCase(),
    path,
    sortedQuery,
    bodyString,
    timestamp,
    apiKey,
  ].join('\n');

  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(stringToSign)
    .digest('hex');

  return signature;
};

export const signRequest = (
  method: string,
  path: string,
  query: Record<string, any>,
  body: any,
  apiKey: string,
  apiSecret: string
) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature({
    method,
    path,
    query,
    body,
    timestamp,
    apiKey,
    apiSecret,
  });

  return {
    'X-API-Key': apiKey,
    'X-Timestamp': timestamp.toString(),
    'X-Signature': signature,
  };
};
```

##### 3.4.2 签名验证

```typescript
// backend/middleware/signature.middleware.ts
import { Context, Next } from 'hono';
import crypto from 'crypto';
import { UnauthorizedError } from '@/errors';

export const signatureMiddleware = async (c: Context, next: Next) => {
  const apiKey = c.req.header('X-API-Key');
  const timestamp = c.req.header('X-Timestamp');
  const signature = c.req.header('X-Signature');

  if (!apiKey || !timestamp || !signature) {
    throw new UnauthorizedError('缺少签名参数');
  }

  const apiSecret = await getApiSecret(apiKey);
  if (!apiSecret) {
    throw new UnauthorizedError('API Key无效');
  }

  const now = Math.floor(Date.now() / 1000);
  const requestTime = parseInt(timestamp);
  
  if (Math.abs(now - requestTime) > 300) {
    throw new UnauthorizedError('请求时间戳无效');
  }

  const method = c.req.method;
  const path = c.req.path;
  const query = Object.fromEntries(new URLSearchParams(c.req.query()));
  const body = await c.req.text();

  const stringToSign = [
    method.toUpperCase(),
    path,
    Object.keys(query)
      .sort()
      .map((key) => `${key}=${query[key]}`)
      .join('&'),
    body,
    timestamp,
    apiKey,
  ].join('\n');

  const expectedSignature = crypto
    .createHmac('sha256', apiSecret)
    .update(stringToSign)
    .digest('hex');

  if (signature !== expectedSignature) {
    throw new UnauthorizedError('签名验证失败');
  }

  await next();
};
```

#### 3.5 权限控制

##### 3.5.1 RBAC权限模型

```typescript
// backend/types/permission.ts
export enum Role {
  ADMIN = 'ADMIN',
  CREATOR = 'CREATOR',
  USER = 'USER',
  GUEST = 'GUEST',
}

export enum Permission {
  DRAMA_READ = 'drama:read',
  DRAMA_CREATE = 'drama:create',
  DRAMA_UPDATE = 'drama:update',
  DRAMA_DELETE = 'drama:delete',
  DRAMA_PUBLISH = 'drama:publish',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  ANALYTICS_READ = 'analytics:read',
  ADMIN_MANAGE = 'admin:manage',
}

export const RolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),
  [Role.CREATOR]: [
    Permission.DRAMA_READ,
    Permission.DRAMA_CREATE,
    Permission.DRAMA_UPDATE,
    Permission.DRAMA_DELETE,
    Permission.DRAMA_PUBLISH,
    Permission.USER_READ,
    Permission.USER_UPDATE,
  ],
  [Role.USER]: [
    Permission.DRAMA_READ,
    Permission.USER_READ,
    Permission.USER_UPDATE,
  ],
  [Role.GUEST]: [
    Permission.DRAMA_READ,
  ],
};
```

##### 3.5.2 权限验证中间件

```typescript
// backend/middleware/permission.middleware.ts
import { Context, Next } from 'hono';
import { ForbiddenError, UnauthorizedError } from '@/errors';
import { Permission } from '@/types/permission';

export const requirePermission = (permission: Permission) => {
  return async (c: Context, next: Next) => {
    const user = c.get('user');

    if (!user) {
      throw new UnauthorizedError('未登录');
    }

    if (!user.permissions.includes(permission)) {
      throw new ForbiddenError('权限不足');
    }

    await next();
  };
};

export const requireAnyPermission = (permissions: Permission[]) => {
  return async (c: Context, next: Next) => {
    const user = c.get('user');

    if (!user) {
      throw new UnauthorizedError('未登录');
    }

    const hasPermission = permissions.some((p) => user.permissions.includes(p));
    if (!hasPermission) {
      throw new ForbiddenError('权限不足');
    }

    await next();
  };
};

export const requireAllPermissions = (permissions: Permission[]) => {
  return async (c: Context, next: Next) => {
    const user = c.get('user');

    if (!user) {
      throw new UnauthorizedError('未登录');
    }

    const hasAllPermissions = permissions.every((p) => user.permissions.includes(p));
    if (!hasAllPermissions) {
      throw new ForbiddenError('权限不足');
    }

    await next();
  };
};
```

##### 3.5.3 资源级权限控制

```typescript
// backend/middleware/resourcePermission.middleware.ts
import { Context, Next } from 'hono';
import { ForbiddenError } from '@/errors';

export const requireResourceOwnership = async (c: Context, next: Next) => {
  const user = c.get('user');
  const resourceId = c.req.param('id');

  if (!user) {
    throw new ForbiddenError('未登录');
  }

  const resource = await getResourceById(resourceId);

  if (resource.ownerId !== user.id && user.role !== 'ADMIN') {
    throw new ForbiddenError('无权访问该资源');
  }

  await next();
};

export const requireRole = (roles: string[]) => {
  return async (c: Context, next: Next) => {
    const user = c.get('user');

    if (!user) {
      throw new ForbiddenError('未登录');
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenError('角色权限不足');
    }

    await next();
  };
};
```

#### 3.6 安全最佳实践

##### 3.6.1 Token安全

```
Token安全要求：
- 使用HTTPS传输
- Token存储在HttpOnly Cookie或内存中
- 避免在URL中传递Token
- Token设置合理的过期时间
- 实现Token刷新机制
- 登出时使Token失效
```

##### 3.6.2 API Key安全

```
API Key安全要求：
- API Key仅显示一次
- 用户妥善保管API Key
- 定期轮换API Key
- 为不同用途创建不同的API Key
- 设置API Key过期时间
- 监控API Key使用情况
- 发现异常立即撤销API Key
```

##### 3.6.3 签名安全

```
签名安全要求：
- 使用强加密算法（HMAC-SHA256）
- API Secret妥善保管
- 实现时间戳验证，防止重放攻击
- 实现Nonce机制，防止重放攻击
- 签名参数按字母顺序排序
- 签名计算使用统一的字符编码
```

#### 3.7 错误处理

##### 3.7.1 认证错误

```json
{
  "success": false,
  "code": "YYC3-AUTH-04-001",
  "message": "未登录或登录已过期",
  "errors": [],
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": 1640995200000
  }
}
```

##### 3.7.2 权限错误

```json
{
  "success": false,
  "code": "YYC3-AUTH-05-001",
  "message": "权限不足",
  "errors": [],
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": 1640995200000
  }
}
```

##### 3.7.3 签名错误

```json
{
  "success": false,
  "code": "YYC3-AUTH-04-002",
  "message": "签名验证失败",
  "errors": [],
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": 1640995200000
  }
}
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
