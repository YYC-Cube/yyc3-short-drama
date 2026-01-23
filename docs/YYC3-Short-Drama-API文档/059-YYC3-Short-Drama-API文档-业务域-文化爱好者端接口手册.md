---
@file: 059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md
@description: YYC3-Short-Drama 文化爱好者端所有业务接口的详细定义，包含入参、出参、调用示例
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [API接口],[业务域],[文化爱好者端]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册

## 概述

本文档详细描述YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范业务域-文化爱好者端接口手册相关的业务标准与技术落地要求
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

### 3. 文化爱好者端接口设计

#### 3.1 接口设计规范

**请求格式**
- 所有接口使用 JSON 格式
- 统一的错误响应格式
- 支持 RESTful 风格

**认证方式**
- JWT 令牌认证
- 请求头：`Authorization: Bearer {token}`

**响应格式**
```json
{
  "success": true,
  "data": {...},
  "message": "操作成功"
}

{
  "success": false,
  "error": "错误信息",
  "code": 400
}
```

#### 3.2 认证接口

**用户注册**
- **路径**: `/api/auth/register`
- **方法**: `POST`
- **请求体**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "用户名",
  "verificationCode": "123456"
}
```
- **响应**:
  - **成功**:
  ```json
  {
    "success": true,
    "message": "注册成功",
    "data": {
      "user": {
        "id": "1",
        "email": "user@example.com",
        "name": "用户名",
        "role": "user",
        "createdAt": "2025-01-30T00:00:00Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
  - **错误**:
  ```json
  {
    "success": false,
    "message": "邮箱已被注册"
  }
  ```

**用户登录**
- **路径**: `/api/auth/login`
- **方法**: `POST`
- **请求体**:
```json
{
  "phone": "13800138000",
  "code": "123456"
}
```
- **响应**:
  - **成功**:
  ```json
  {
    "message": "登录成功",
    "user": {
      "id": 1,
      "phone": "13800138000",
      "username": "测试用户",
      "email": "test@example.com",
      "avatar": "",
      "level": "初级导演",
      "star_coins": 100,
      "is_local_user": true,
      "user_type": "normal"
    }
  }
  ```
  - **错误**:
  ```json
  {
    "success": false,
    "error": "验证码错误或已过期"
  }
  ```

**用户登出**
- **路径**: `/api/auth/logout`
- **方法**: `POST`
- **认证**: 需要
- **响应**:
  - **成功**:
  ```json
  {
    "success": true,
    "message": "登出成功"
  }
  ```
  - **错误**:
  ```json
  {
    "success": false,
    "message": "未登录"
  }
  ```

**获取用户信息**
- **路径**: `/api/auth/me`
- **方法**: `GET`
- **认证**: 需要
- **响应**:
  - **成功**:
  ```json
  {
    "success": true,
    "message": "获取成功",
    "data": {
      "user": {
        "id": "1",
        "email": "user@example.com",
        "name": "用户名",
        "role": "user",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "用户简介",
        "createdAt": "2025-01-30T00:00:00Z",
        "lastLoginAt": "2025-01-30T00:00:00Z"
      }
    }
  }
  ```
  - **错误**:
  ```json
  {
    "success": false,
    "message": "未登录"
  }
  ```

**发送验证码**
- **路径**: `/api/auth/send-code`
- **方法**: `POST`
- **请求体**:
```json
{
  "email": "user@example.com",
  "type": "register",
  "channel": "email"
}
```
- **响应**:
  - **成功**:
  ```json
  {
    "success": true,
    "message": "验证码发送成功",
    "data": {
      "email": "user@example.com",
      "type": "register",
      "expiresAt": "2025-01-30T00:10:00Z"
    }
  }
  ```
  - **错误**:
  ```json
  {
    "success": false,
    "message": "验证码发送过于频繁，请稍后再试"
  }
  ```

#### 3.3 文化资源接口

**获取文化资源列表**
- **路径**: `/api/cultural-resources`
- **方法**: `GET`
- **参数**:
  - `category`: 资源分类
  - `page`: 页码
  - `limit`: 每页数量

**获取文化资源详情**
- **路径**: `/api/cultural-resources/{id}`
- **方法**: `GET`

**搜索文化资源**
- **路径**: `/api/cultural-resources/search`
- **方法**: `GET`
- **参数**:
  - `keyword`: 搜索关键词
  - `type`: 搜索类型

#### 3.4 AI编剧接口

**生成剧本**
- **路径**: `/api/ai-script/generate`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
```json
{
  "theme": "洛神赋新传",
  "style": "classical",
  "culturalElements": ["洛神赋", "洛水", "曹植"],
  "length": 1000
}
```

**获取剧本列表**
- **路径**: `/api/ai-script/my`
- **方法**: `GET`
- **认证**: 需要

**获取剧本详情**
- **路径**: `/api/ai-script/{id}`
- **方法**: `GET`
- **认证**: 需要

#### 3.5 星值经济接口

**获取星值积分**
- **路径**: `/api/star-economy/points`
- **方法**: `GET`
- **认证**: 需要

**获取积分历史**
- **路径**: `/api/star-economy/history`
- **方法**: `GET`
- **认证**: 需要

**兑换奖励**
- **路径**: `/api/star-economy/redeem`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
```json
{
  "rewardId": "reward_001",
  "points": 100
}
```

#### 3.6 时空穿越接口

**获取历史时间线**
- **路径**: `/api/time-travel/timeline`
- **方法**: `GET`

**获取历史场景**
- **路径**: `/api/time-travel/scenes/{id}`
- **方法**: `GET`

**与历史人物对话**
- **路径**: `/api/time-travel/chat`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
```json
{
  "characterId": "cao_zhi",
  "message": "您好，请问您是曹植吗？"
}
```

#### 3.7 社交互动接口

**获取文化圈**
- **路径**: `/api/social/circles`
- **方法**: `GET`

**加入文化圈**
- **路径**: `/api/social/circles/{id}/join`
- **方法**: `POST`
- **认证**: 需要

**发布文化动态**
- **路径**: `/api/social/posts`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
```json
{
  "content": "分享一段关于河洛文化的见解",
  "imageUrls": ["url1", "url2"],
  "tags": ["河洛文化", "洛阳"]
}
```

#### 3.8 错误码定义

| 错误码 | 描述 |
|-------|------|
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
| 1001 | 邮箱已存在 |
| 1002 | 密码错误 |
| 1003 | 积分不足 |
| 1004 | 剧本生成失败 |

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
