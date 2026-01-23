---
@file: 061-YYC3-Short-Drama-API文档-业务域-管理员端接口手册.md
@description: YYC3-Short-Drama 管理员端所有业务接口的详细定义，包含入参、出参、调用示例
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [API接口],[业务域],[管理员端]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 061-YYC3-Short-Drama-API文档-业务域-管理员端接口手册

## 概述

本文档详细描述YYC3-Short-Drama-API文档-业务域-管理员端接口手册相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范业务域-管理员端接口手册相关的业务标准与技术落地要求
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

### 3. 管理员端接口手册

#### 3.1 用户管理接口

##### 3.1.1 获取用户列表

**接口地址**: `/api/v1/admin/users`
**请求方法**: `GET`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**查询参数**:
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | integer | 否 | 1 | 页码 |
| limit | integer | 否 | 20 | 每页数量 |
| keyword | string | 否 | - | 搜索关键词 |
| role | string | 否 | - | 角色筛选 |
| status | string | 否 | - | 状态筛选 |

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "获取成功",
  "data": {
    "users": [
      {
        "id": "user-001",
        "email": "user@example.com",
        "name": "张三",
        "role": "USER",
        "status": "ACTIVE",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "lastLoginAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

##### 3.1.2 获取用户详情

**接口地址**: `/api/v1/admin/users/{id}`
**请求方法**: `GET`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 用户ID |

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "获取成功",
  "data": {
    "user": {
      "id": "user-001",
      "email": "user@example.com",
      "name": "张三",
      "role": "USER",
      "status": "ACTIVE",
      "avatar": "https://example.com/avatar.jpg",
      "bio": "用户简介",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "lastLoginAt": "2024-01-01T00:00:00.000Z",
      "loginCount": 10
    }
  }
}
```

##### 3.1.3 更新用户状态

**接口地址**: `/api/v1/admin/users/{id}/status`
**请求方法**: `PATCH`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 用户ID |

**请求体**:
```json
{
  "status": "ACTIVE"
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "更新成功",
  "data": {
    "user": {
      "id": "user-001",
      "status": "ACTIVE"
    }
  }
}
```

##### 3.1.4 删除用户

**接口地址**: `/api/v1/admin/users/{id}`
**请求方法**: `DELETE`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 用户ID |

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "删除成功"
}
```

#### 3.2 内容管理接口

##### 3.2.1 获取短剧列表

**接口地址**: `/api/v1/admin/dramas`
**请求方法**: `GET`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**查询参数**:
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | integer | 否 | 1 | 页码 |
| limit | integer | 否 | 20 | 每页数量 |
| keyword | string | 否 | - | 搜索关键词 |
| status | string | 否 | - | 状态筛选 |
| categoryId | string | 否 | - | 分类筛选 |

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "获取成功",
  "data": {
    "dramas": [
      {
        "id": "drama-001",
        "title": "河洛传奇",
        "cover": "https://example.com/cover.jpg",
        "status": "PUBLISHED",
        "viewCount": 1000,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

##### 3.2.2 审核短剧

**接口地址**: `/api/v1/admin/dramas/{id}/review`
**请求方法**: `POST`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 短剧ID |

**请求体**:
```json
{
  "status": "APPROVED",
  "comment": "内容符合规范，审核通过"
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "审核成功",
  "data": {
    "drama": {
      "id": "drama-001",
      "status": "APPROVED"
    }
  }
}
```

#### 3.3 数据统计接口

##### 3.3.1 获取平台统计

**接口地址**: `/api/v1/admin/statistics/platform`
**请求方法**: `GET`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "获取成功",
  "data": {
    "statistics": {
      "totalUsers": 10000,
      "totalDramas": 5000,
      "totalViews": 1000000,
      "totalRevenue": 100000,
      "activeUsers": 5000,
      "newUsersToday": 100
    }
  }
}
```

##### 3.3.2 获取用户增长趋势

**接口地址**: `/api/v1/admin/statistics/user-growth`
**请求方法**: `GET`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**查询参数**:
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| startDate | string | 否 | 7天前 | 开始日期 |
| endDate | string | 否 | 今天 | 结束日期 |

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "获取成功",
  "data": {
    "trends": [
      {
        "date": "2024-01-01",
        "newUsers": 100,
        "activeUsers": 500
      }
    ]
  }
}
```

#### 3.4 系统配置接口

##### 3.4.1 获取系统配置

**接口地址**: `/api/v1/admin/config`
**请求方法**: `GET`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "获取成功",
  "data": {
    "config": {
      "siteName": "YYC3短剧平台",
      "siteDescription": "河洛文化数字传承创新平台",
      "allowRegistration": true,
      "maxUploadSize": 104857600,
      "supportedVideoFormats": ["mp4", "webm"],
      "supportedImageFormats": ["jpg", "png", "gif"]
    }
  }
}
```

##### 3.4.2 更新系统配置

**接口地址**: `/api/v1/admin/config`
**请求方法**: `PUT`
**认证方式**: `Bearer Token`
**权限要求**: `ADMIN`

**请求体**:
```json
{
  "siteName": "YYC3短剧平台",
  "siteDescription": "河洛文化数字传承创新平台",
  "allowRegistration": true
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "更新成功",
  "data": {
    "config": {
      "siteName": "YYC3短剧平台",
      "siteDescription": "河洛文化数字传承创新平台",
      "allowRegistration": true
    }
  }
}
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
