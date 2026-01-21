# 登出接口

## 接口描述

用户登出接口，用于清除用户认证状态。

## 请求信息

### 请求方法

- POST

### 请求路径

- `/api/auth/logout`

### 请求参数

无请求参数

### 请求示例

```http
POST /api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 响应信息

### 成功响应

**状态码**: 200 OK

```json
{
  "success": true,
  "message": "登出成功"
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

## 登出流程

1. 客户端发送登出请求
2. 服务端验证用户是否已登录
3. 清除用户的认证令牌
4. 返回登出成功响应

## 注意事项

- 登出接口会清除服务器端的认证状态
- 客户端也应该清除本地存储的令牌信息