---
@file: 053-YYC3-Short-Drama-详细设计-性能优化代码方案.md
@description: YYC3-Short-Drama 前端/后端代码性能优化的具体方案与实现，提升系统响应速度
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [详细设计],[性能优化],[代码调优]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 053-YYC3-Short-Drama-详细设计-性能优化代码方案

## 概述

本文档详细描述YYC3-Short-Drama-详细设计-性能优化代码方案相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范性能优化代码方案相关的业务标准与技术落地要求
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

### 3. 性能优化代码方案

#### 3.1 性能优化总体架构

##### 3.1.1 性能优化层次结构

```
┌─────────────────────────────────────────┐
│           应用层优化                       │
├─────────────────────────────────────────┤
│  前端性能优化                            │
│  ├── 代码分割与懒加载                     │
│  ├── 组件优化与虚拟化                     │
│  ├── 状态管理优化                         │
│  ├── 图片与资源优化                       │
│  └── 缓存策略                            │
├─────────────────────────────────────────┤
│  后端性能优化                            │
│  ├── 数据库查询优化                       │
│  ├── 缓存机制                            │
│  ├── 异步处理                            │
│  ├── 连接池管理                          │
│  └── 负载均衡                            │
├─────────────────────────────────────────┤
│  网络层优化                              │
│  ├── CDN加速                            │
│  ├── HTTP/2与HTTP/3                      │
│  ├── 压缩传输                            │
│  └── 预加载与预连接                       │
└─────────────────────────────────────────┘
```

##### 3.1.2 性能指标体系

| 指标类别 | 指标名称 | 目标值 | 测量方法 |
|---------|---------|--------|---------|
| 前端性能 | 首次内容绘制(FCP) | < 1.5s | Lighthouse |
| 前端性能 | 最大内容绘制(LCP) | < 2.5s | Lighthouse |
| 前端性能 | 首次输入延迟(FID) | < 100ms | Lighthouse |
| 前端性能 | 累积布局偏移(CLS) | < 0.1 | Lighthouse |
| 前端性能 | 首次字节时间(TTFB) | < 800ms | Network |
| 后端性能 | API响应时间 | < 200ms (P95) | APM |
| 后端性能 | 数据库查询时间 | < 100ms (平均) | APM |
| 后端性能 | 缓存命中率 | > 90% | Redis |
| 后端性能 | 并发处理能力 | > 1000 RPS | Load Test |
| 系统性能 | 系统可用性 | > 99.9% | Monitoring |

#### 3.2 前端性能优化

##### 3.2.1 代码分割与懒加载

```typescript
// frontend/app/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DramaPlayer = dynamic(() => import('@/components/DramaPlayer'), {
  loading: () => <div>加载中...</div>,
  ssr: false,
});

const AIChatWidget = dynamic(() => import('@/components/AIChatWidget'), {
  loading: () => <div>加载中...</div>,
});

export default function DramaPage() {
  return (
    <div>
      <h1>短剧播放</h1>
      <Suspense fallback={<div>加载播放器...</div>}>
        <DramaPlayer />
      </Suspense>
      <Suspense fallback={<div>加载AI助手...</div>}>
        <AIChatWidget />
      </Suspense>
    </div>
  );
}
```

##### 3.2.2 路由级代码分割

```typescript
// frontend/app/router.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage'));
const DramaListPage = lazy(() => import('@/pages/DramaListPage'));
const DramaDetailPage = lazy(() => import('@/pages/DramaDetailPage'));
const UserCenterPage = lazy(() => import('@/pages/UserCenterPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<div>加载中...</div>}><HomePage /></Suspense>,
  },
  {
    path: '/dramas',
    element: <Suspense fallback={<div>加载中...</div>}><DramaListPage /></Suspense>,
  },
  {
    path: '/dramas/:id',
    element: <Suspense fallback={<div>加载中...</div>}><DramaDetailPage /></Suspense>,
  },
  {
    path: '/user',
    element: <Suspense fallback={<div>加载中...</div>}><UserCenterPage /></Suspense>,
  },
]);

export default router;
```

##### 3.2.3 组件虚拟化

```typescript
// frontend/components/VirtualizedDramaList.tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

interface DramaItem {
  id: string;
  title: string;
  cover: string;
  duration: number;
}

interface VirtualizedDramaListProps {
  dramas: DramaItem[];
  itemHeight: number;
}

export const VirtualizedDramaList: React.FC<VirtualizedDramaListProps> = ({
  dramas,
  itemHeight,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: dramas.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: '600px',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const drama = dramas[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <DramaItem drama={drama} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

##### 3.2.4 图片优化

```typescript
// frontend/components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCgAB//Z"
        onLoad={() => setIsLoading(false)}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};
```

##### 3.2.5 状态管理优化

```typescript
// frontend/store/dramaSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dramaService } from '@/services/drama';

interface DramaState {
  dramas: Drama[];
  loading: boolean;
  error: string | null;
  cache: Record<string, Drama>;
}

const initialState: DramaState = {
  dramas: [],
  loading: false,
  error: null,
  cache: {},
};

export const fetchDramas = createAsyncThunk(
  'drama/fetchDramas',
  async (params: { page: number; limit: number }) => {
    return await dramaService.getDramas(params);
  },
  {
    condition: (params, { getState }) => {
      const state = getState() as { drama: DramaState };
      if (state.drama.loading) {
        return false;
      }
      return true;
    },
  }
);

export const fetchDramaById = createAsyncThunk(
  'drama/fetchDramaById',
  async (id: string) => {
    return await dramaService.getDramaById(id);
  },
  {
    condition: (id, { getState }) => {
      const state = getState() as { drama: DramaState };
      if (state.drama.cache[id]) {
        return false;
      }
      return true;
    },
  }
);

const dramaSlice = createSlice({
  name: 'drama',
  initialState,
  reducers: {
    clearCache: (state) => {
      state.cache = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDramas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDramas.fulfilled, (state, action) => {
        state.loading = false;
        state.dramas = action.payload;
      })
      .addCase(fetchDramas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '加载失败';
      })
      .addCase(fetchDramaById.fulfilled, (state, action) => {
        state.cache[action.payload.id] = action.payload;
      });
  },
});

export const { clearCache } = dramaSlice.actions;
export default dramaSlice.reducer;
```

##### 3.2.6 缓存策略

```typescript
// frontend/utils/cache.ts
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheManager {
  private cache: Map<string, CacheItem<any>> = new Map();

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  clearExpired(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

export const cacheManager = new CacheManager();

export const withCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 5 * 60 * 1000
): Promise<T> => {
  const cached = cacheManager.get<T>(key);
  if (cached) {
    return cached;
  }

  const data = await fetcher();
  cacheManager.set(key, data, ttl);
  return data;
};
```

#### 3.3 后端性能优化

##### 3.3.1 数据库查询优化

```typescript
// backend/repositories/drama.repository.ts
import { PrismaClient } from '@prisma/client';
import { logger } from '@/utils/logger';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

export class DramaRepository {
  async getDramas(params: {
    page: number;
    limit: number;
    category?: string;
    status?: string;
  }) {
    const { page, limit, category, status } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (status) {
      where.status = status;
    }

    const [dramas, total] = await Promise.all([
      prisma.drama.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          cover: true,
          duration: true,
          viewCount: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.drama.count({ where }),
    ]);

    logger.info('Database query executed', {
      query: 'getDramas',
      count: dramas.length,
      total,
    });

    return {
      dramas,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getDramaById(id: string) {
    const drama = await prisma.drama.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        episodes: {
          where: {
            status: 'PUBLISHED',
          },
          orderBy: {
            episodeNumber: 'asc',
          },
          select: {
            id: true,
            episodeNumber: true,
            title: true,
            duration: true,
            videoUrl: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!drama) {
      return null;
    }

    await prisma.drama.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return drama;
  }
}

export const dramaRepository = new DramaRepository();
```

##### 3.3.2 数据库索引优化

```typescript
// backend/prisma/schema.prisma
model Drama {
  id          String   @id @default(cuid())
  title       String
  cover       String
  duration    Int
  viewCount   Int      @default(0)
  status      String
  categoryId  String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  category    Category @relation(fields: [categoryId], references: [id])
  episodes    Episode[]
  tags        DramaTag[]

  @@index([categoryId])
  @@index([status])
  @@index([createdAt(sort: Desc)])
  @@index([viewCount(sort: Desc)])
  @@index([categoryId, status])
}

model Episode {
  id           String   @id @default(cuid())
  episodeNumber Int
  title        String
  duration     Int
  videoUrl     String
  status       String
  dramaId      String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  drama        Drama    @relation(fields: [dramaId], references: [id])

  @@index([dramaId])
  @@index([status])
  @@index([dramaId, episodeNumber])
}
```

##### 3.3.3 缓存机制实现

```typescript
// backend/services/cache.service.ts
import { Redis } from 'ioredis';
import { logger } from '@/utils/logger';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
});

export class CacheService {
  private prefix = 'yyc3:';

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(this.getKey(key));
      if (!data) {
        return null;
      }
      return JSON.parse(data) as T;
    } catch (error) {
      logger.error('Cache get error', error as Error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    try {
      await redis.setex(
        this.getKey(key),
        ttl,
        JSON.stringify(value)
      );
      logger.debug('Cache set', { key, ttl });
    } catch (error) {
      logger.error('Cache set error', error as Error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await redis.del(this.getKey(key));
      logger.debug('Cache delete', { key });
    } catch (error) {
      logger.error('Cache delete error', error as Error);
    }
  }

  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(`${this.prefix}${pattern}`);
      if (keys.length > 0) {
        await redis.del(...keys);
        logger.debug('Cache delete pattern', { pattern, count: keys.length });
      }
    } catch (error) {
      logger.error('Cache delete pattern error', error as Error);
    }
  }

  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    try {
      const cacheKeys = keys.map((key) => this.getKey(key));
      const values = await redis.mget(...cacheKeys);
      return values.map((value) => {
        if (!value) return null;
        return JSON.parse(value) as T;
      });
    } catch (error) {
      logger.error('Cache mget error', error as Error);
      return keys.map(() => null);
    }
  }

  async mset<T>(items: Array<{ key: string; value: T; ttl?: number }>): Promise<void> {
    try {
      const pipeline = redis.pipeline();
      for (const item of items) {
        const cacheKey = this.getKey(item.key);
        const ttl = item.ttl || 3600;
        pipeline.setex(cacheKey, ttl, JSON.stringify(item.value));
      }
      await pipeline.exec();
      logger.debug('Cache mset', { count: items.length });
    } catch (error) {
      logger.error('Cache mset error', error as Error);
    }
  }
}

export const cacheService = new CacheService();
```

##### 3.3.4 带缓存的数据访问层

```typescript
// backend/repositories/cached-drama.repository.ts
import { cacheService } from '@/services/cache.service';
import { dramaRepository } from './drama.repository';

export class CachedDramaRepository {
  private cachePrefix = 'drama:';
  private cacheTTL = 5 * 60;

  async getDramas(params: {
    page: number;
    limit: number;
    category?: string;
    status?: string;
  }) {
    const cacheKey = `${this.cachePrefix}list:${JSON.stringify(params)}`;
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    const result = await dramaRepository.getDramas(params);
    await cacheService.set(cacheKey, result, this.cacheTTL);
    
    return result;
  }

  async getDramaById(id: string) {
    const cacheKey = `${this.cachePrefix}detail:${id}`;
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    const drama = await dramaRepository.getDramaById(id);
    if (drama) {
      await cacheService.set(cacheKey, drama, this.cacheTTL);
    }
    
    return drama;
  }

  async invalidateDrama(id: string) {
    await cacheService.del(`${this.cachePrefix}detail:${id}`);
    await cacheService.delPattern(`${this.cachePrefix}list:*`);
  }

  async invalidateDramaList() {
    await cacheService.delPattern(`${this.cachePrefix}list:*`);
  }
}

export const cachedDramaRepository = new CachedDramaRepository();
```

##### 3.3.5 异步处理与任务队列

```typescript
// backend/services/async-task.service.ts
import { Queue, Worker, Job } from 'bullmq';
import { Redis } from 'ioredis';
import { logger } from '@/utils/logger';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

export class AsyncTaskService {
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();

  getQueue(queueName: string): Queue {
    if (!this.queues.has(queueName)) {
      const queue = new Queue(queueName, {
        connection: redis,
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
        },
      });
      this.queues.set(queueName, queue);
    }
    return this.queues.get(queueName)!;
  }

  async addTask(
    queueName: string,
    taskName: string,
    data: any,
    options?: any
  ): Promise<Job> {
    const queue = this.getQueue(queueName);
    const job = await queue.add(taskName, data, options);
    logger.info('Task added to queue', { queueName, taskName, jobId: job.id });
    return job;
  }

  registerWorker(
    queueName: string,
    processor: (job: Job) => Promise<void>
  ): void {
    if (this.workers.has(queueName)) {
      return;
    }

    const worker = new Worker(
      queueName,
      async (job) => {
        logger.info('Processing task', { queueName, jobId: job.id });
        try {
          await processor(job);
          logger.info('Task completed', { queueName, jobId: job.id });
        } catch (error) {
          logger.error('Task failed', { queueName, jobId: job.id, error });
          throw error;
        }
      },
      {
        connection: redis,
        concurrency: 5,
      }
    );

    worker.on('completed', (job) => {
      logger.info('Job completed', { jobId: job.id });
    });

    worker.on('failed', (job, err) => {
      logger.error('Job failed', { jobId: job?.id, error: err });
    });

    this.workers.set(queueName, worker);
  }
}

export const asyncTaskService = new AsyncTaskService();
```

##### 3.3.6 连接池管理

```typescript
// backend/config/database.config.ts
import { PrismaClient } from '@prisma/client';
import { logger } from '@/utils/logger';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

prisma.$on('query', (e) => {
  if (e.duration > 1000) {
    logger.warn('Slow query detected', {
      query: e.query,
      params: e.params,
      duration: e.duration,
    });
  }
});

prisma.$on('error', (e) => {
  logger.error('Database error', e);
});

export { prisma };
```

##### 3.3.7 负载均衡与限流

```typescript
// backend/middleware/rate-limit.middleware.ts
import { Context, Next } from 'hono';
import { Redis } from 'ioredis';
import { logger } from '@/utils/logger';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  keyGenerator?: (c: Context) => string;
}

export const rateLimitMiddleware = (options: RateLimitOptions) => {
  const { windowMs, maxRequests, keyGenerator } = options;

  return async (c: Context, next: Next) => {
    const key = keyGenerator
      ? keyGenerator(c)
      : `rate-limit:${c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown'}`;

    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, Math.ceil(windowMs / 1000));
    }

    const remaining = Math.max(0, maxRequests - current);
    const resetTime = await redis.pttl(key);

    c.header('X-RateLimit-Limit', maxRequests.toString());
    c.header('X-RateLimit-Remaining', remaining.toString());
    c.header('X-RateLimit-Reset', (Date.now() + resetTime).toString());

    if (current > maxRequests) {
      logger.warn('Rate limit exceeded', { key, current, maxRequests });
      return c.json(
        {
          error: 'Too many requests',
          message: '请求过于频繁，请稍后再试',
        },
        429
      );
    }

    await next();
  };
};
```

#### 3.4 网络层优化

##### 3.4.1 CDN配置

```typescript
// frontend/utils/cdn.ts
const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL || '';

export const getCDNUrl = (path: string): string => {
  if (!CDN_BASE_URL) {
    return path;
  }
  return `${CDN_BASE_URL}${path}`;
};

export const getOptimizedImageUrl = (
  path: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  const { width, height, quality = 80, format = 'webp' } = options;
  const url = getCDNUrl(path);
  
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('f', format);
  
  return `${url}?${params.toString()}`;
};
```

##### 3.4.2 HTTP/2与HTTP/3配置

```typescript
// backend/server.ts
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', logger());
app.use('*', cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const server = serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT || '3200'),
});

server.on('upgrade', (req, socket, head) => {
  logger.info('HTTP/2 upgrade requested');
});

export default app;
```

##### 3.4.3 响应压缩

```typescript
// backend/middleware/compression.middleware.ts
import { Context, Next } from 'hono';
import { compress } from 'hono/compress';

export const compressionMiddleware = compress({
  threshold: 1024,
  encoding: 'gzip',
});

export const useCompression = (c: Context, next: Next) => {
  return compressionMiddleware(c, next);
};
```

#### 3.5 性能监控

##### 3.5.1 前端性能监控

```typescript
// frontend/utils/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  const duration = end - start;
  
  console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name,
      value: Math.round(duration),
    });
  }
  
  return duration;
};

export const observeWebVitals = () => {
  if (typeof window === 'undefined') return;

  const reportWebVital = (metric: any) => {
    console.log('[Web Vitals]', metric);
    
    if ((window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: metric.value,
        event_label: metric.id,
        non_interaction: true,
      });
    }
  };

  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        reportWebVital(entry);
      }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }
};
```

##### 3.5.2 后端性能监控

```typescript
// backend/middleware/performance.middleware.ts
import { Context, Next } from 'hono';
import { logger } from '@/utils/logger';

export const performanceMiddleware = async (c: Context, next: Next) => {
  const start = Date.now();
  const method = c.req.method;
  const path = c.req.path;

  await next();

  const duration = Date.now() - start;
  const status = c.res.status;

  logger.info('Request completed', {
    method,
    path,
    status,
    duration,
  });

  if (duration > 1000) {
    logger.warn('Slow request detected', {
      method,
      path,
      status,
      duration,
    });
  }

  c.header('X-Response-Time', `${duration}ms`);
};
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
