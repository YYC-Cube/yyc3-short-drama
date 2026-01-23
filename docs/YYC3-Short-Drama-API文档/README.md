---
@file: YYC3-Short-Drama-API文档-文档索引.md
@description: YYC3-Short-Drama API文档分类下所有文档的索引与说明，统一管理文档清单
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-23
@status: published
@tags: [API文档],[文档索引],[目录总览]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# YYC³ Short Drama API 文档索引

## 概述

本文档提供了 YYC³ Short Drama 项目的 API 接口文档索引，包含认证、AI 剧本生成、星币经济和文化基因等模块的接口说明。

## API 架构

- **基础路径**: `/api`
- **认证方式**: JWT Token (Cookie 或 Authorization Header)
- **响应格式**: JSON
- **错误处理**: 统一的错误响应格式

## 响应格式

### 成功响应

```json
{
  "success": true,
  "message": "操作成功",
  "data": {}
}
```

### 错误响应

```json
{
  "success": false,
  "error": "错误信息"
}
```

## 认证方式

1. **Cookie 认证**: API 会自动从 `auth-token` Cookie 中获取令牌
2. **Header 认证**: 在请求头中添加 `Authorization: Bearer <token>`

## API 模块

### 1. 认证模块 (`/api/auth`)

- [登录](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#用户登录)
- [注册](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#用户注册)
- [登出](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#用户登出)
- [获取当前用户](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#获取用户信息)
- [发送验证码](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#发送验证码)

### 2. AI 剧本模块 (`/api/ai-script`)

- [生成剧本](060-YYC3-Short-Drama-API文档-业务域-创作者端接口手册.md#生成剧本)
- [优化剧本](060-YYC3-Short-Drama-API文档-业务域-创作者端接口手册.md#优化剧本)
- [生成标题](060-YYC3-Short-Drama-API文档-业务域-创作者端接口手册.md#生成标题)

### 3. 星币经济模块 (`/api/star-economy`)

- [获取余额](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#获取星值积分)
- [获取交易记录](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#获取积分历史)
- [赚取星币](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#赚取星币)
- [消费星币](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#兑换奖励)

### 4. 文化基因模块 (`/api/cultural-gene`)

- [获取文化基因详情](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#获取文化资源详情)
- [搜索文化基因](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md#搜索文化资源)

## 版本管理

- **当前版本**: v1.0.0
- **版本路径**: `/api` (v1)
- **未来版本**: `/api/v2`

## 速率限制

- API 请求速率限制: 60 请求/分钟/IP
- 验证码发送限制: 1 次/分钟/手机号
- AI 生成限制: 50 次/天/用户

## 文档目录

### 通用规范

- [RESTful接口设计标准](056-YYC3-Short-Drama-API文档-通用规范-RESTful接口设计标准.md)
- [接口错误码体系](057-YYC3-Short-Drama-API文档-通用规范-接口错误码体系.md)
- [接口签名鉴权手册](058-YYC3-Short-Drama-API文档-通用规范-接口签名鉴权手册.md)

### 业务域

- [文化爱好者端接口手册](059-YYC3-Short-Drama-API文档-业务域-文化爱好者端接口手册.md)
- [创作者端接口手册](060-YYC3-Short-Drama-API文档-业务域-创作者端接口手册.md)
- [管理员端接口手册](061-YYC3-Short-Drama-API文档-业务域-管理员端接口手册.md)
- [文化资源接口手册](062-YYC3-Short-Drama-API文档-业务域-文化资源接口手册.md)
- [文化数据分析接口手册](063-YYC3-Short-Drama-API文档-业务域-文化数据分析接口手册.md)

### 技术类型

- [微服务内部调用接口](065-YYC3-Short-Drama-API文档-技术类型-微服务内部调用接口.md)
- [网关聚合接口手册](066-YYC3-Short-Drama-API文档-技术类型-网关聚合接口手册.md)
- [WebSocket实时通信接口](067-YYC3-Short-Drama-API文档-技术类型-WebSocket实时通信接口.md)
- [文件上传下载接口手册](068-YYC3-Short-Drama-API文档-技术类型-文件上传下载接口手册.md)

### 第三方

- [支付服务集成接口](069-YYC3-Short-Drama-API文档-第三方-支付服务集成接口.md)
- [短信邮件服务接口](070-YYC3-Short-Drama-API文档-第三方-短信邮件服务接口.md)

### 版本管理

- [接口迭代变更记录](071-YYC3-Short-Drama-API文档-版本管理-接口迭代变更记录.md)

### 测试用例

- [接口自动化测试脚本](072-YYC3-Short-Drama-API文档-测试用例-接口自动化测试脚本.md)

## 支持

如有 API 使用问题，请联系技术支持团队。

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
