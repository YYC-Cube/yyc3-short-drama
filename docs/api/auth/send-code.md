# 发送验证码接口

## 接口描述

发送邮箱或短信验证码，用于注册、登录或密码重置等场景。

## 请求信息

### 请求方法

- POST

### 请求路径

- `/api/auth/send-code`

### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| `email` | string | 是 | 接收验证码的邮箱 |
| `type` | string | 是 | 验证码类型，可选值：`register`、`login`、`reset` |
| `channel` | string | 否 | 发送渠道，可选值：`email`、`sms`，默认 `email` |

### 请求示例

```json
{
  "email": "user@example.com",
  "type": "register",
  "channel": "email"
}
```

## 响应信息

### 成功响应

**状态码**: 200 OK

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

### 错误响应

**状态码**: 400 Bad Request

```json
{
  "success": false,
  "message": "邮箱格式错误"
}
```

```json
{
  "success": false,
  "message": "验证码发送过于频繁，请稍后再试"
}
```

## 接口说明

- 验证码有效期为 10 分钟
- 同一邮箱在 60 秒内只能发送一次验证码
- 验证码类型说明：
  - `register`: 注册验证
  - `login`: 登录验证（如忘记密码登录）
  - `reset`: 密码重置验证

## 使用场景

- 用户注册前获取验证码
- 忘记密码时获取验证码
- 登录时需要验证码验证

## 安全注意事项

- 验证码会通过邮件或短信发送给用户
- 验证码具有时效性和使用次数限制
- 请确保验证码只发送给真实用户