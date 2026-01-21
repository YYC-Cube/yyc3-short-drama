# 生成剧本接口

## 接口描述

使用 AI 生成剧本，支持自定义主题、风格、长度等参数。

## 请求信息

### 请求方法

- POST

### 请求路径

- `/api/ai-script/generate`

### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| `theme` | string | 是 | 剧本主题 |
| `style` | string | 否 | 剧本风格，如：现代、古装、科幻等，默认 "现代" |
| `length` | string | 否 | 剧本长度，如：短、中、长，默认 "短" |
| `characters` | string | 否 | 人物设定，默认 "2-3个主要角色" |
| `setting` | string | 否 | 场景设定，默认 "现代都市" |

### 请求示例

```json
{
  "theme": "亲情",
  "style": "现代",
  "length": "短",
  "characters": "母亲、儿子",
  "setting": "现代都市家庭"
}
```

## 响应信息

### 成功响应

**状态码**: 200 OK

```json
{
  "success": true,
  "message": "剧本生成成功",
  "data": {
    "script": {
      "id": "1",
      "title": "母爱的温度",
      "content": "标题：母爱的温度\n人物：母亲、儿子\n场景：现代都市家庭\n剧本正文：...",
      "theme": "亲情",
      "style": "现代",
      "length": "短剧",
      "characters": "母亲、儿子",
      "setting": "现代都市家庭",
      "createdAt": "2025-01-30T00:00:00Z",
      "wordCount": 1000,
      "status": "draft"
    }
  }
}
```

### 错误响应

**状态码**: 400 Bad Request

```json
{
  "success": false,
  "message": "请提供剧本主题"
}
```

**状态码**: 401 Unauthorized

```json
{
  "success": false,
  "message": "请先登录"
}
```

**状态码**: 500 Internal Server Error

```json
{
  "success": false,
  "message": "生成剧本失败，请稍后重试"
}
```

## 接口说明

- 该接口需要用户已登录，否则会返回 401 错误
- 剧本生成过程可能需要几秒钟时间
- 生成的剧本会包含完整的标题、人物设定、场景描述和剧本正文
- 剧本会体现中华文化元素

## 使用场景

- 创作者寻找灵感
- 快速生成剧本草稿
- 基于特定主题创作剧本
- 文化内容创作

## 注意事项

- 生成的剧本仅供参考，可能需要人工修改和完善
- 请遵守相关法律法规，不要生成违法或不当内容
- 系统会对生成内容进行审核