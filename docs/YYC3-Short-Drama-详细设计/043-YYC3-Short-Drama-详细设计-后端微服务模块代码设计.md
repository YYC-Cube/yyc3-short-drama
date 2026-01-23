---
@file: 043-YYC3-Short-Drama-详细设计-后端微服务模块代码设计.md
@description: YYC3-Short-Drama 后端微服务模块的代码结构、接口实现、业务逻辑的规范设计
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [详细设计],[后端开发],[微服务]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 043-YYC3-Short-Drama-详细设计-后端微服务模块代码设计

## 概述

本文档详细描述YYC3-Short-Drama短剧平台的后端微服务模块代码设计，包括微服务架构、服务拆分、代码结构、接口实现、业务逻辑等，为后端开发团队提供清晰的开发指导。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的AI驱动短剧创作与分发平台，致力于通过人工智能技术赋能短剧内容创作，打造智能化的短剧生态体系。平台融合AI剧本生成、智能推荐、VR/AR沉浸式体验、星值经济体系等创新功能，为用户提供从创作到消费的全链路服务。

#### 1.2 文档目标
- 提供完整的后端微服务模块代码设计规范
- 详细描述微服务架构和服务拆分
- 为后端开发团队提供清晰的开发指导
- 确保后端代码符合YYC³标准规范

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

### 3. 微服务架构设计

#### 3.1 微服务拆分原则

**业务边界原则**
- 按业务领域拆分：每个服务负责一个业务领域
- 单一职责：每个服务只负责一个业务功能
- 高内聚低耦合：服务内部高内聚，服务之间低耦合

**技术边界原则**
- 独立部署：每个服务可以独立部署和扩展
- 独立数据库：每个服务拥有独立的数据库
- 技术栈独立：每个服务可以选择适合的技术栈

**数据一致性原则**
- 最终一致性：服务间数据采用最终一致性
- 分布式事务：使用分布式事务保证数据一致性
- 事件驱动：使用事件驱动架构处理服务间通信

#### 3.2 微服务列表

| 服务名称 | 服务描述 | 端口 | 数据库 |
|---------|---------|------|--------|
| user-service | 用户服务 | 3201 | yyc3_user |
| auth-service | 认证服务 | 3202 | yyc3_auth |
| drama-service | 短剧服务 | 3203 | yyc3_drama |
| episode-service | 剧集服务 | 3204 | yyc3_episode |
| comment-service | 评论服务 | 3205 | yyc3_comment |
| like-service | 点赞服务 | 3206 | yyc3_like |
| favorite-service | 收藏服务 | 3207 | yyc3_favorite |
| follow-service | 关注服务 | 3208 | yyc3_follow |
| star-value-service | 星值服务 | 3209 | yyc3_star_value |
| payment-service | 支付服务 | 3210 | yyc3_payment |
| ai-service | AI服务 | 3211 | yyc3_ai |
| recommend-service | 推荐服务 | 3212 | yyc3_recommend |
| gateway-service | 网关服务 | 3200 | - |

### 4. 微服务代码结构

#### 4.1 通用服务结构

```
src/
├── controllers/           # 控制器层
│   ├── user.controller.ts
│   └── index.ts
├── services/             # 服务层
│   ├── user.service.ts
│   └── index.ts
├── repositories/          # 数据访问层
│   ├── user.repository.ts
│   └── index.ts
├── models/               # 数据模型
│   ├── user.model.ts
│   └── index.ts
├── dto/                  # 数据传输对象
│   ├── user.dto.ts
│   └── index.ts
├── middleware/           # 中间件
│   ├── auth.middleware.ts
│   └── index.ts
├── utils/                # 工具函数
│   ├── validator.ts
│   └── index.ts
├── config/               # 配置文件
│   ├── database.config.ts
│   └── index.ts
├── types/                # 类型定义
│   ├── user.types.ts
│   └── index.ts
├── constants/            # 常量定义
│   ├── error.constants.ts
│   └── index.ts
├── routes/               # 路由定义
│   ├── user.routes.ts
│   └── index.ts
├── app.ts                # 应用入口
└── server.ts             # 服务器启动
```

#### 4.2 服务代码示例

##### 4.2.1 用户服务 (user-service)

**控制器层**
```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { userService } from '../services';
import { authMiddleware } from '../middleware';
import { CreateUserSchema, UpdateUserSchema } from '../dto/user.dto';

const app = new Hono();

/**
 * 创建用户
 * @route POST /api/users
 * @access 私有
 */
app.post('/', zValidator('json', CreateUserSchema), async (c) => {
  const userData = c.req.valid('json');
  const user = await userService.createUser(userData);
  return c.json({ success: true, data: user }, 201);
});

/**
 * 获取用户信息
 * @route GET /api/users/:userId
 * @access 私有
 */
app.get('/:userId', authMiddleware, async (c) => {
  const userId = c.req.param('userId');
  const user = await userService.getUserById(userId);
  return c.json({ success: true, data: user });
});

/**
 * 更新用户信息
 * @route PUT /api/users/:userId
 * @access 私有
 */
app.put('/:userId', authMiddleware, zValidator('json', UpdateUserSchema), async (c) => {
  const userId = c.req.param('userId');
  const userData = c.req.valid('json');
  const user = await userService.updateUser(userId, userData);
  return c.json({ success: true, data: user });
});

/**
 * 删除用户
 * @route DELETE /api/users/:userId
 * @access 私有
 */
app.delete('/:userId', authMiddleware, async (c) => {
  const userId = c.req.param('userId');
  await userService.deleteUser(userId);
  return c.json({ success: true, message: '用户删除成功' });
});

export default app;
```

**服务层**
```typescript
import { userRepository } from '../repositories';
import { hashPassword, comparePassword } from '../utils';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

class UserService {
  async createUser(userData: CreateUserDto) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('邮箱已存在');
    }

    const hashedPassword = await hashPassword(userData.password);
    const user = await userRepository.create({
      ...userData,
      passwordHash: hashedPassword,
    });

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserById(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(userId: string, userData: UpdateUserDto) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }

    if (userData.password) {
      userData.passwordHash = await hashPassword(userData.password);
      delete userData.password;
    }

    const updatedUser = await userRepository.update(userId, userData);
    const { passwordHash, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }

    await userRepository.delete(userId);
  }
}

export const userService = new UserService();
```

**数据访问层**
```typescript
import { prisma } from '../config/database.config';
import type { User, Prisma } from '@prisma/client';

class UserRepository {
  async findById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { userId },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { phone },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async update(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { userId },
      data,
    });
  }

  async delete(userId: string): Promise<User> {
    return prisma.user.delete({
      where: { userId },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return prisma.user.findMany(params);
  }

  async count(params?: Prisma.UserWhereInput): Promise<number> {
    return prisma.user.count({ where: params });
  }
}

export const userRepository = new UserRepository();
```

**数据模型**
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

export { prisma };
```

**数据传输对象**
```typescript
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(8, '密码至少8位'),
  nickname: z.string().min(2, '昵称至少2位'),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  nickname: z.string().min(2, '昵称至少2位').optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  password: z.string().min(8, '密码至少8位').optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
```

**中间件**
```typescript
import { Context, Next } from 'hono';
import { verifyToken } from '../utils';

export const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return c.json({ success: false, error: '未授权' }, 401);
  }

  try {
    const decoded = verifyToken(token);
    c.set('userId', decoded.userId);
    await next();
  } catch (error) {
    return c.json({ success: false, error: '无效的令牌' }, 401);
  }
};
```

**工具函数**
```typescript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}
```

**应用入口**
```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './middleware/error.middleware';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = new Hono();

app.use('*', logger());
app.use('*', cors());
app.use('*', errorHandler);

app.route('/api/users', userRoutes);
app.route('/api/auth', authRoutes);

app.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'user-service' });
});

export default app;
```

**服务器启动**
```typescript
import app from './app';

const PORT = process.env.PORT || 3201;

Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`User service running on port ${PORT}`);
```

##### 4.2.2 认证服务 (auth-service)

**控制器层**
```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { authService } from '../services';
import { LoginSchema, RegisterSchema, RefreshTokenSchema } from '../dto/auth.dto';

const app = new Hono();

/**
 * 用户登录
 * @route POST /api/auth/login
 * @access 公开
 */
app.post('/login', zValidator('json', LoginSchema), async (c) => {
  const credentials = c.req.valid('json');
  const result = await authService.login(credentials);
  return c.json({ success: true, data: result });
});

/**
 * 用户注册
 * @route POST /api/auth/register
 * @access 公开
 */
app.post('/register', zValidator('json', RegisterSchema), async (c) => {
  const userData = c.req.valid('json');
  const result = await authService.register(userData);
  return c.json({ success: true, data: result }, 201);
});

/**
 * 刷新令牌
 * @route POST /api/auth/refresh
 * @access 公开
 */
app.post('/refresh', zValidator('json', RefreshTokenSchema), async (c) => {
  const { refreshToken } = c.req.valid('json');
  const result = await authService.refreshToken(refreshToken);
  return c.json({ success: true, data: result });
});

/**
 * 用户登出
 * @route POST /api/auth/logout
 * @access 私有
 */
app.post('/logout', async (c) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  await authService.logout(token);
  return c.json({ success: true, message: '登出成功' });
});

export default app;
```

**服务层**
```typescript
import { userRepository } from '../repositories';
import { generateToken, verifyToken, hashPassword, comparePassword } from '../utils';
import { LoginDto, RegisterDto } from '../dto/auth.dto';

class AuthService {
  async login(credentials: LoginDto) {
    const user = await userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error('用户不存在');
    }

    const isValid = await comparePassword(credentials.password, user.passwordHash);
    if (!isValid) {
      throw new Error('密码错误');
    }

    const accessToken = generateToken({ userId: user.userId });
    const refreshToken = generateToken({ userId: user.userId }, '30d');

    const { passwordHash, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async register(userData: RegisterDto) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('邮箱已存在');
    }

    const hashedPassword = await hashPassword(userData.password);
    const user = await userRepository.create({
      ...userData,
      passwordHash: hashedPassword,
    });

    const accessToken = generateToken({ userId: user.userId });
    const refreshToken = generateToken({ userId: user.userId }, '30d');

    const { passwordHash, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const decoded = verifyToken(refreshToken);
    const user = await userRepository.findById(decoded.userId);
    if (!user) {
      throw new Error('用户不存在');
    }

    const newAccessToken = generateToken({ userId: user.userId });
    const newRefreshToken = generateToken({ userId: user.userId }, '30d');

    const { passwordHash, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(token: string) {
    // 将令牌加入黑名单
    // 实际实现可以使用Redis存储黑名单
  }
}

export const authService = new AuthService();
```

##### 4.2.3 短剧服务 (drama-service)

**控制器层**
```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { dramaService } from '../services';
import { authMiddleware } from '../middleware';
import { CreateDramaSchema, UpdateDramaSchema, DramaListSchema } from '../dto/drama.dto';

const app = new Hono();

/**
 * 创建短剧
 * @route POST /api/dramas
 * @access 私有
 */
app.post('/', authMiddleware, zValidator('json', CreateDramaSchema), async (c) => {
  const creatorId = c.get('userId');
  const dramaData = c.req.valid('json');
  const drama = await dramaService.createDrama(creatorId, dramaData);
  return c.json({ success: true, data: drama }, 201);
});

/**
 * 获取短剧列表
 * @route GET /api/dramas
 * @access 公开
 */
app.get('/', zValidator('query', DramaListSchema), async (c) => {
  const params = c.req.valid('query');
  const result = await dramaService.getDramaList(params);
  return c.json({ success: true, data: result });
});

/**
 * 获取短剧详情
 * @route GET /api/dramas/:dramaId
 * @access 公开
 */
app.get('/:dramaId', async (c) => {
  const dramaId = c.req.param('dramaId');
  const drama = await dramaService.getDramaById(dramaId);
  return c.json({ success: true, data: drama });
});

/**
 * 更新短剧
 * @route PUT /api/dramas/:dramaId
 * @access 私有
 */
app.put('/:dramaId', authMiddleware, zValidator('json', UpdateDramaSchema), async (c) => {
  const userId = c.get('userId');
  const dramaId = c.req.param('dramaId');
  const dramaData = c.req.valid('json');
  const drama = await dramaService.updateDrama(userId, dramaId, dramaData);
  return c.json({ success: true, data: drama });
});

/**
 * 删除短剧
 * @route DELETE /api/dramas/:dramaId
 * @access 私有
 */
app.delete('/:dramaId', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const dramaId = c.req.param('dramaId');
  await dramaService.deleteDrama(userId, dramaId);
  return c.json({ success: true, message: '短剧删除成功' });
});

export default app;
```

**服务层**
```typescript
import { dramaRepository } from '../repositories';
import { CreateDramaDto, UpdateDramaDto, DramaListParams } from '../dto/drama.dto';

class DramaService {
  async createDrama(creatorId: string, dramaData: CreateDramaDto) {
    const drama = await dramaRepository.create({
      ...dramaData,
      creatorId,
      status: 'draft',
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      favoriteCount: 0,
    });

    return drama;
  }

  async getDramaList(params: DramaListParams) {
    const { page = 1, pageSize = 20, category, status, keyword } = params;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (category) {
      where.categoryIds = {
        has: category,
      };
    }
    if (status) {
      where.status = status;
    }
    if (keyword) {
      where.OR = [
        { title: { contains: keyword } },
        { description: { contains: keyword } },
      ];
    }

    const [dramas, total] = await Promise.all([
      dramaRepository.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      dramaRepository.count(where),
    ]);

    return {
      dramas,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async getDramaById(dramaId: string) {
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new Error('短剧不存在');
    }

    await dramaRepository.incrementViewCount(dramaId);

    return drama;
  }

  async updateDrama(userId: string, dramaId: string, dramaData: UpdateDramaDto) {
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new Error('短剧不存在');
    }

    if (drama.creatorId !== userId) {
      throw new Error('无权修改此短剧');
    }

    const updatedDrama = await dramaRepository.update(dramaId, dramaData);
    return updatedDrama;
  }

  async deleteDrama(userId: string, dramaId: string) {
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new Error('短剧不存在');
    }

    if (drama.creatorId !== userId) {
      throw new Error('无权删除此短剧');
    }

    await dramaRepository.delete(dramaId);
  }
}

export const dramaService = new DramaService();
```

### 5. 服务间通信

#### 5.1 同步通信

**HTTP REST API**
```typescript
import { Hono } from 'hono';

class ServiceClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async post<T>(path: string, data?: any, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const userServiceClient = new ServiceClient('http://user-service:3201');
export const dramaServiceClient = new ServiceClient('http://drama-service:3203');
```

#### 5.2 异步通信

**事件驱动架构**
```typescript
import { EventEmitter } from 'events';

class EventBus extends EventEmitter {
  publish(event: string, data: any) {
    this.emit(event, data);
  }

  subscribe(event: string, handler: (data: any) => void) {
    this.on(event, handler);
  }

  unsubscribe(event: string, handler: (data: any) => void) {
    this.off(event, handler);
  }
}

export const eventBus = new EventBus();

// 发布事件
eventBus.publish('drama.created', {
  dramaId: 'drama-123',
  creatorId: 'user-456',
  title: '新短剧',
});

// 订阅事件
eventBus.subscribe('drama.created', async (data) => {
  // 处理短剧创建事件
  await recommendService.updateRecommendations(data.dramaId);
});
```

### 6. 配置管理

#### 6.1 环境变量配置

```typescript
import { config } from 'dotenv';

config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3201'),
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  AI_SERVICE_URL: process.env.AI_SERVICE_URL,
  RECOMMEND_SERVICE_URL: process.env.RECOMMEND_SERVICE_URL,
};
```

#### 6.2 数据库配置

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export { prisma };

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};
```

### 7. 错误处理

#### 7.1 错误中间件

```typescript
import { Context, Next } from 'hono';

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error('Error:', error);

    if (error instanceof Error) {
      return c.json(
        {
          success: false,
          error: error.message,
        },
        500
      );
    }

    return c.json(
      {
        success: false,
        error: '服务器内部错误',
      },
      500
    );
  }
};
```

#### 7.2 自定义错误类

```typescript
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = '未授权') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = '禁止访问') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}
```

### 8. 日志管理

#### 8.1 日志配置

```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
    },
  } : undefined,
});

export { logger };
```

#### 8.2 日志使用

```typescript
import { logger } from '../config/logger.config';

logger.info('User created', { userId: 'user-123' });
logger.error('Failed to create user', { error: error.message });
logger.warn('Rate limit exceeded', { userId: 'user-123' });
```

### 9. 测试

#### 9.1 单元测试

```typescript
import { describe, it, expect, beforeEach } from 'bun:test';
import { userService } from '../services/user.service';
import { userRepository } from '../repositories/user.repository';

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        nickname: '测试用户',
      };

      vi.mocked(userRepository.findByEmail).mockResolvedValue(null);
      vi.mocked(userRepository.create).mockResolvedValue({
        userId: 'user-123',
        ...userData,
        passwordHash: 'hashed-password',
      } as any);

      const user = await userService.createUser(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user).not.toHaveProperty('passwordHash');
    });

    it('should throw error if email already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        nickname: '测试用户',
      };

      vi.mocked(userRepository.findByEmail).mockResolvedValue({
        userId: 'user-123',
        email: userData.email,
      } as any);

      await expect(userService.createUser(userData)).rejects.toThrow('邮箱已存在');
    });
  });
});
```

### 10. 总结

本文档详细描述了YYC3-Short-Drama短剧平台的后端微服务模块代码设计，包括微服务架构、服务拆分、代码结构、接口实现、业务逻辑等。通过这些设计的实施，可以确保后端代码结构清晰、易于维护、可扩展性强，为平台的稳定运行和业务扩展提供坚实的后端基础。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
