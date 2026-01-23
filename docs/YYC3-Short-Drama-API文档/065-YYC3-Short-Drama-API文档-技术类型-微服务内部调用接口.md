---
@file: 065-YYC3-Short-Drama-API文档-技术类型-微服务内部调用接口.md
@description: YYC3-Short-Drama 微服务之间的内部调用接口规范，包含服务注册、发现、调用规则
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [API接口],[技术类型],[微服务]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 065-YYC3-Short-Drama-API文档-技术类型-微服务内部调用接口

## 概述

本文档详细描述YYC3-Short-Drama-API文档-技术类型-微服务内部调用接口相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范技术类型-微服务内部调用接口相关的业务标准与技术落地要求
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

### 3. 微服务内部调用接口

#### 3.1 微服务架构

##### 3.1.1 服务注册与发现

```
┌─────────────────────────────────────────┐
│           服务注册中心                   │
│           (Consul/Etcd)               │
├─────────────────────────────────────────┤
│  服务列表                              │
│  ├── user-service (用户服务)            │
│  ├── drama-service (短剧服务)          │
│  ├── payment-service (支付服务)         │
│  ├── ai-service (AI服务)              │
│  ├── file-service (文件服务)            │
│  ├── notification-service (通知服务)      │
│  └── analytics-service (数据分析服务)    │
└─────────────────────────────────────────┘
```

##### 3.1.2 服务通信协议

```
通信方式：
- HTTP/REST: 同步调用
- gRPC: 高性能RPC调用
- Message Queue: 异步消息传递
- WebSocket: 实时通信

服务调用流程：
1. 服务A调用服务B
2. 服务A从注册中心获取服务B的地址
3. 服务A通过HTTP/gRPC调用服务B
4. 服务B处理请求并返回响应
5. 服务A处理响应结果
```

#### 3.2 服务注册

##### 3.2.1 注册接口

**接口地址**: `/internal/service/register`
**请求方法**: `POST`
**认证方式**: `Internal Token`

**请求体**:
```json
{
  "serviceName": "user-service",
  "serviceId": "user-service-001",
  "address": "192.168.1.100",
  "port": 3201,
  "healthCheckUrl": "http://192.168.1.100:3201/health",
  "metadata": {
    "version": "1.0.0",
    "environment": "production"
  }
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "注册成功",
  "data": {
    "serviceId": "user-service-001",
    "registeredAt": "2024-01-01T00:00:00.000Z",
    "ttl": 30
  }
}
```

##### 3.2.2 健康检查接口

**接口地址**: `/internal/service/health`
**请求方法**: `GET`
**认证方式**: `Internal Token`

**响应示例**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "checks": {
    "database": "healthy",
    "redis": "healthy",
    "externalServices": "healthy"
  }
}
```

#### 3.3 服务发现

##### 3.3.1 获取服务列表

**接口地址**: `/internal/service/discovery`
**请求方法**: `GET`
**认证方式**: `Internal Token`

**查询参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| serviceName | string | 否 | 服务名称 |
| healthyOnly | boolean | 否 | 仅返回健康服务 |

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "获取成功",
  "data": {
    "services": [
      {
        "serviceName": "user-service",
        "serviceId": "user-service-001",
        "address": "192.168.1.100",
        "port": 3201,
        "status": "healthy",
        "metadata": {
          "version": "1.0.0",
          "environment": "production"
        }
      }
    ]
  }
}
```

#### 3.4 服务调用

##### 3.4.1 HTTP调用

```typescript
// backend/services/httpClient.service.ts
import axios from 'axios';
import { ServiceDiscovery } from './serviceDiscovery.service';

export class HttpClientService {
  private serviceDiscovery: ServiceDiscovery;

  constructor() {
    this.serviceDiscovery = new ServiceDiscovery();
  }

  async callService<T>(
    serviceName: string,
    path: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      data?: any;
      params?: any;
      headers?: any;
    } = {}
  ): Promise<T> {
    const service = await this.serviceDiscovery.getService(serviceName);
    
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }

    const url = `http://${service.address}:${service.port}${path}`;

    const response = await axios({
      url,
      method: options.method || 'GET',
      data: options.data,
      params: options.params,
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Token': process.env.INTERNAL_TOKEN,
        ...options.headers,
      },
      timeout: 5000,
    });

    return response.data;
  }
}

export const httpClientService = new HttpClientService();
```

##### 3.4.2 gRPC调用

```typescript
// backend/services/grpcClient.service.ts
import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

export class GrpcClientService {
  private clients: Map<string, any> = new Map();

  async callService<T>(
    serviceName: string,
    methodName: string,
    request: any
  ): Promise<T> {
    let client = this.clients.get(serviceName);

    if (!client) {
      const service = await this.getService(serviceName);
      const protoDefinition = loadSync('./protos/service.proto');
      const proto = grpc.loadPackageDefinition(protoDefinition);
      
      client = new proto[serviceName](
        `${service.address}:${service.port}`,
        grpc.credentials.createInsecure()
      );
      
      this.clients.set(serviceName, client);
    }

    return new Promise((resolve, reject) => {
      client[methodName](request, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  private async getService(serviceName: string) {
    // 从服务发现获取服务地址
    return {
      address: '192.168.1.100',
      port: 3201,
    };
  }
}

export const grpcClientService = new GrpcClientService();
```

#### 3.5 消息队列

##### 3.5.1 消息发布

```typescript
// backend/services/messageQueue.service.ts
import { Queue, QueueScheduler } from 'bullmq';
import { Redis } from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

export class MessageQueueService {
  private queues: Map<string, Queue> = new Map();

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

  async publish(queueName: string, data: any, options?: any): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.add(queueName, data, options);
  }

  async publishBatch(queueName: string, items: any[]): Promise<void> {
    const queue = this.getQueue(queueName);
    const jobs = items.map((item) => ({
      name: queueName,
      data: item,
    }));
    await queue.addBulk(jobs);
  }
}

export const messageQueueService = new MessageQueueService();
```

##### 3.5.2 消息消费

```typescript
// backend/workers/dramaCreated.worker.ts
import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { logger } from '@/utils/logger';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

const worker = new Worker(
  'drama-created',
  async (job) => {
    logger.info('Processing drama created event', { jobId: job.id });
    
    try {
      const { dramaId, userId } = job.data;
      
      // 发送通知
      await sendNotification(userId, '您的短剧已创建成功');
      
      // 更新统计
      await updateStatistics('drama_created');
      
      logger.info('Drama created event processed', { jobId: job.id });
    } catch (error) {
      logger.error('Failed to process drama created event', error as Error);
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
```

#### 3.6 服务熔断与降级

##### 3.6.1 熔断器配置

```typescript
// backend/services/circuitBreaker.service.ts
import { CircuitBreaker } from 'opossum';

export class CircuitBreakerService {
  private breakers: Map<string, CircuitBreaker> = new Map();

  getBreaker(serviceName: string): CircuitBreaker {
    if (!this.breakers.has(serviceName)) {
      const breaker = new CircuitBreaker(
        async () => {
          return await this.callService(serviceName);
        },
        {
          timeout: 5000,
          errorThresholdPercentage: 50,
          resetTimeout: 30000,
        }
      );

      breaker.on('open', () => {
        logger.warn(`Circuit breaker opened for ${serviceName}`);
      });

      breaker.on('halfOpen', () => {
        logger.info(`Circuit breaker half-open for ${serviceName}`);
      });

      breaker.on('close', () => {
        logger.info(`Circuit breaker closed for ${serviceName}`);
      });

      this.breakers.set(serviceName, breaker);
    }

    return this.breakers.get(serviceName)!;
  }

  async callService(serviceName: string): Promise<any> {
    // 实际的服务调用逻辑
    return {};
  }
}

export const circuitBreakerService = new CircuitBreakerService();
```

#### 3.7 服务监控

##### 3.7.1 调用链追踪

```typescript
// backend/middleware/tracing.middleware.ts
import { Context, Next } from 'hono';
import { tracer } from '@/utils/tracer';

export const tracingMiddleware = async (c: Context, next: Next) => {
  const span = tracer.startSpan('http_request', {
    kind: 'server',
    attributes: {
      'http.method': c.req.method,
      'http.url': c.req.url,
      'http.host': c.req.header('host'),
    },
  });

  c.set('span', span);

  await next();

  span.setAttribute('http.status_code', c.res.status);
  span.end();
};
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
