# 获取当前用户信息接口

## 接口描述

获取当前登录用户的详细信息。

## 请求信息

### 请求方法

- GET

### 请求路径

- `/api/auth/me`

### 请求参数

无请求参数

### 请求示例

```http
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 响应信息

### 成功响应

**状态码**: 200 OK

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

### 错误响应

**状态码**: 401 Unauthorized

```json
{
  "success": false,
  "message": "未登录"
}
```

## 接口说明

- 该接口需要用户已登录，否则会返回 401 错误
- 接口返回用户的详细信息，包括基本信息和登录状态
- 通常用于前端验证用户登录状态和显示用户信息

## 使用场景

- 页面初始化时获取用户信息
- 验证用户是否已登录
- 显示用户个人资料页面
- 检查用户权限