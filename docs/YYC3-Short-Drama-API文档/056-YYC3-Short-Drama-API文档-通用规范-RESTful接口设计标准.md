---
@file: 056-YYC3-Short-Drama-API文档-通用规范-RESTful接口设计标准.md
@description: YYC3-Short-Drama 全项目RESTful接口的统一设计标准，包含请求、响应、路径规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [API接口],[通用规范],[RESTful]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 056-YYC3-Short-Drama-API文档-通用规范-RESTful接口设计标准

## 概述

本文档详细描述YYC3-Short-Drama-API文档-通用规范-RESTful接口设计标准相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范通用规范-RESTful接口设计标准相关的业务标准与技术落地要求
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

### 3. RESTful接口设计标准

#### 3.1 接口设计原则

##### 3.1.1 RESTful架构风格

YYC3-Short-Drama项目严格遵循RESTful架构风格，确保接口设计的统一性和可维护性：

- **资源导向**：一切皆资源，使用URI标识资源
- **统一接口**：使用标准HTTP方法（GET、POST、PUT、DELETE、PATCH）
- **无状态**：每个请求包含所有必要信息，服务器不保存客户端状态
- **可缓存**：响应明确标识是否可缓存
- **分层系统**：客户端无需知道是否连接到最终服务器
- **按需代码**：可选功能，通过传输代码扩展客户端功能

##### 3.1.2 URI命名规范

```
基础路径：/api/v1

资源命名规则：
- 使用名词复数形式
- 使用kebab-case（短横线分隔）
- 避免使用动词
- 层级不超过3层

示例：
✅ 正确：
/api/v1/dramas
/api/v1/dramas/{id}/episodes
/api/v1/users/{userId}/favorites

❌ 错误：
/api/v1/getDramas
/api/v1/drama
/api/v1/dramas/{id}/episodes/{episodeId}/comments/{commentId}
```

#### 3.2 HTTP方法使用规范

##### 3.2.1 方法映射表

| HTTP方法 | 用途 | 幂等性 | 安全性 | 请求体 | 响应体 |
|---------|------|--------|--------|--------|--------|
| GET | 获取资源 | 是 | 是 | 无 | 有 |
| POST | 创建资源 | 否 | 否 | 有 | 有 |
| PUT | 完整更新资源 | 是 | 否 | 有 | 有/无 |
| PATCH | 部分更新资源 | 否 | 否 | 有 | 有/无 |
| DELETE | 删除资源 | 是 | 否 | 无 | 有/无 |
| OPTIONS | 获取支持的方法 | 是 | 是 | 无 | 有 |
| HEAD | 获取响应头 | 是 | 是 | 无 | 无 |

##### 3.2.2 方法使用示例

```typescript
// 获取短剧列表
GET /api/v1/dramas?page=1&limit=20

// 获取单个短剧详情
GET /api/v1/dramas/{id}

// 创建短剧
POST /api/v1/dramas
Content-Type: application/json

{
  "title": "河洛传奇",
  "description": "讲述河洛文化的传奇故事",
  "categoryId": "category-001"
}

// 完整更新短剧
PUT /api/v1/dramas/{id}
Content-Type: application/json

{
  "title": "河洛传奇（修订版）",
  "description": "讲述河洛文化的传奇故事",
  "categoryId": "category-001",
  "status": "PUBLISHED"
}

// 部分更新短剧
PATCH /api/v1/dramas/{id}
Content-Type: application/json

{
  "status": "PUBLISHED"
}

// 删除短剧
DELETE /api/v1/dramas/{id}
```

#### 3.3 请求规范

##### 3.3.1 请求头规范

| 请求头 | 必填 | 说明 | 示例 |
|--------|------|------|------|
| Content-Type | 是（有请求体时） | 请求内容类型 | application/json |
| Accept | 否 | 期望的响应类型 | application/json |
| Authorization | 是（需认证） | 认证令牌 | Bearer {token} |
| X-Request-ID | 否 | 请求唯一标识 | uuid-v4 |
| X-Client-Version | 否 | 客户端版本 | 1.0.0 |
| X-Device-ID | 否 | 设备唯一标识 | device-uuid |
| User-Agent | 是 | 用户代理信息 | YYC3-App/1.0.0 (iOS) |

##### 3.3.2 请求体格式

```json
{
  "data": {
    // 业务数据
  },
  "meta": {
    // 元数据（可选）
    "requestId": "uuid-v4",
    "timestamp": 1640995200000
  }
}
```

##### 3.3.3 查询参数规范

```
分页参数：
- page: 页码（从1开始）
- limit: 每页数量（默认20，最大100）

排序参数：
- sort: 排序字段（支持多个字段，逗号分隔）
- order: 排序方向（asc/desc）

过滤参数：
- filter[field]: 字段过滤
- search: 全文搜索

示例：
/api/v1/dramas?page=1&limit=20&sort=createdAt&order=desc&filter[status]=PUBLISHED&search=河洛
```

#### 3.4 响应规范

##### 3.4.1 成功响应格式

```json
{
  "success": true,
  "code": "200",
  "message": "操作成功",
  "data": {
    // 业务数据
  },
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": 1640995200000,
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

##### 3.4.2 错误响应格式

```json
{
  "success": false,
  "code": "400",
  "message": "请求参数错误",
  "errors": [
    {
      "field": "title",
      "message": "标题不能为空"
    }
  ],
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": 1640995200000
  }
}
```

##### 3.4.3 HTTP状态码规范

| 状态码 | 说明 | 使用场景 |
|--------|------|---------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 204 | No Content | 请求成功但无返回内容 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未认证 |
| 403 | Forbidden | 无权限 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突 |
| 422 | Unprocessable Entity | 请求格式正确但语义错误 |
| 429 | Too Many Requests | 请求过于频繁 |
| 500 | Internal Server Error | 服务器内部错误 |
| 502 | Bad Gateway | 网关错误 |
| 503 | Service Unavailable | 服务不可用 |

#### 3.5 数据格式规范

##### 3.5.1 日期时间格式

```json
{
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "publishedAt": "2024-01-01T00:00:00.000Z"
}
```

- 使用ISO 8601格式
- 时区为UTC（Z后缀）
- 毫秒精度

##### 3.5.2 金额格式

```json
{
  "price": 99.99,
  "currency": "CNY"
}
```

- 使用浮点数
- 保留两位小数
- 明确货币类型

##### 3.5.3 分页数据格式

```json
{
  "data": [
    // 数据列表
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### 3.6 版本管理

##### 3.6.1 版本号规范

```
版本号格式：v{major}.{minor}.{patch}

- major: 主版本号（不兼容的API修改）
- minor: 次版本号（向下兼容的功能性新增）
- patch: 修订号（向下兼容的问题修正）

示例：
- v1.0.0: 初始版本
- v1.1.0: 新增功能
- v1.1.1: 修复bug
- v2.0.0: 重大更新，不兼容
```

##### 3.6.2 版本兼容策略

```
版本兼容性：
- 同大版本内保持向后兼容
- 新增字段不影响旧客户端
- 废弃字段保留至少两个小版本
- 重大版本变更提前3个月通知

版本切换：
- 使用URL路径标识版本：/api/v1/...
- 支持多版本并行运行
- 旧版本保留至少6个月
```

#### 3.7 接口文档规范

##### 3.7.1 接口文档结构

```markdown
## 接口名称

### 接口描述
简要描述接口的功能和用途

### 请求信息
- **接口地址**: `/api/v1/dramas`
- **请求方法**: `GET`
- **认证方式**: `Bearer Token`
- **请求频率**: `100次/分钟`

### 请求参数

#### 路径参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 短剧ID |

#### 查询参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | integer | 否 | 1 | 页码 |
| limit | integer | 否 | 20 | 每页数量 |

#### 请求体
```json
{
  "title": "短剧标题",
  "description": "短剧描述"
}
```

### 响应参数

#### 成功响应
```json
{
  "success": true,
  "code": "200",
  "message": "操作成功",
  "data": {
    "id": "drama-001",
    "title": "短剧标题"
  }
}
```

#### 错误响应
```json
{
  "success": false,
  "code": "400",
  "message": "请求参数错误"
}
```

### 示例代码

#### cURL
```bash
curl -X GET "https://api.yyc3.com/api/v1/dramas?page=1&limit=20" \
  -H "Authorization: Bearer {token}"
```

#### JavaScript
```javascript
const response = await fetch('https://api.yyc3.com/api/v1/dramas?page=1&limit=20', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
```
```

#### 3.7.2 接口测试规范

```
测试要求：
- 所有接口必须有自动化测试用例
- 测试覆盖正常场景和异常场景
- 测试数据使用独立环境
- 测试结果自动记录

测试类型：
- 单元测试：测试单个接口
- 集成测试：测试接口间交互
- 性能测试：测试接口响应时间
- 安全测试：测试接口安全性
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
