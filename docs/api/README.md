# YYC³ Short Drama API 文档

> 言语逸品 - 河洛文化数字传承平台 API 文档

## 概述

本文档提供了 YYC³ Short Drama 项目的 API 接口文档，包含认证、AI 剧本生成、星币经济和文化基因等模块的接口说明。

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

- [登录](./auth/login.md)
- [注册](./auth/register.md)
- [登出](./auth/logout.md)
- [获取当前用户](./auth/me.md)
- [发送验证码](./auth/send-code.md)

### 2. AI 剧本模块 (`/api/ai-script`)

- [生成剧本](./ai-script/generate.md)
- [优化剧本](./ai-script/optimize.md)
- [生成标题](./ai-script/titles.md)

### 3. 星币经济模块 (`/api/star-economy`)

- [获取余额](./star-economy/balance.md)
- [获取交易记录](./star-economy/transactions.md)
- [赚取星币](./star-economy/earn.md)
- [消费星币](./star-economy/spend.md)

### 4. 文化基因模块 (`/api/cultural-gene`)

- [获取文化基因详情](./cultural-gene/[id].md)
- [搜索文化基因](./cultural-gene/search.md)

## 版本管理

- **当前版本**: v1.0.0
- **版本路径**: `/api` (v1)
- **未来版本**: `/api/v2`

## 速率限制

- API 请求速率限制: 60 请求/分钟/IP
- 验证码发送限制: 1 次/分钟/手机号
- AI 生成限制: 50 次/天/用户

## 支持

如有 API 使用问题，请联系技术支持团队。
