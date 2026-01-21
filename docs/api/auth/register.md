# 注册接口

## 接口描述

用户注册接口，用于创建新用户账号。

## 请求信息

### 请求方法

- POST

### 请求路径

- `/api/auth/register`

### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| `email` | string | 是 | 用户邮箱 |
| `password` | string | 是 | 用户密码，至少 8 位 |
| `name` | string | 是 | 用户昵称 |
| `verificationCode` | string | 是 | 邮箱验证码 |

### 请求示例

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "用户名",
  "verificationCode": "123456"
}
```

## 响应信息

### 成功响应

**状态码**: 201 Created

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

### 错误响应

**状态码**: 400 Bad Request

```json
{
  "success": false,
  "message": "邮箱已被注册"
}
```

```json
{
  "success": false,
  "message": "验证码错误"
}
```

```json
{
  "success": false,
  "message": "密码长度至少 8 位"
}
```

## 注册流程

1. 客户端发送注册请求，包含邮箱、密码、昵称和验证码
2. 服务端验证验证码是否正确
3. 检查邮箱是否已被注册
4. 验证密码强度
5. 创建新用户账号
6. 生成 JWT 令牌并返回给客户端
7. 发送欢迎邮件给新用户

## 安全注意事项

- 密码会在服务端进行加密存储
- 验证码有效期为 10 分钟
- 建议使用 HTTPS 协议传输数据