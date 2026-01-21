# 登录 API

## 接口说明

用户登录接口，支持手机号+验证码登录方式。

## 请求信息

- **请求方法**: POST
- **请求路径**: `/api/auth/login`
- **Content-Type**: `application/json`

## 请求参数

| 参数名 | 类型 | 必填 | 描述 |
| :--- | :--- | :--- | :--- |
| `phone` | string | 是 | 手机号，11位数字 |
| `code` | string | 是 | 验证码，6位数字 |

## 请求示例

```json
{
  "phone": "13800138000",
  "code": "123456"
}
```

## 响应信息

### 成功响应

- **状态码**: 200 OK

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

### 错误响应

- **状态码**: 400 Bad Request

```json
{
  "success": false,
  "error": "请填写手机号和验证码"
}
```

- **状态码**: 400 Bad Request

```json
{
  "success": false,
  "error": "验证码错误或已过期"
}
```

- **状态码**: 404 Not Found

```json
{
  "success": false,
  "error": "用户不存在，请先注册"
}
```

- **状态码**: 500 Internal Server Error

```json
{
  "success": false,
  "error": "登录失败"
}
```

## 注意事项

1. 登录成功后，API 会自动设置 `auth-token` Cookie
2. 验证码需要通过 [发送验证码](./send-code.md) 接口获取
3. 验证码有效期为 5 分钟
4. 每个手机号每分钟最多发送 1 次验证码
