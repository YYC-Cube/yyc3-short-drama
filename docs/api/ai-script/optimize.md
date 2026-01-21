# 优化剧本接口

## 接口描述

使用 AI 优化已有的剧本内容，提升剧本质量和表现力。

## 请求信息

### 请求方法

- POST

### 请求路径

- `/api/ai-script/optimize`

### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| `scriptContent` | string | 是 | 原始剧本内容 |
| `optimizationType` | string | 否 | 优化类型，如：对话、情节、描写等，默认 "综合" |
| `targetStyle` | string | 否 | 目标风格，如：现代、古装、科幻等，默认保持原风格 |
| `requirements` | string | 否 | 额外优化要求 |

### 请求示例

```json
{
  "scriptContent": "标题：母爱的温度\n人物：母亲、儿子\n场景：现代都市家庭\n剧本正文：...",
  "optimizationType": "对话",
  "targetStyle": "现代",
  "requirements": "增强情感表达，使对话更自然"
}
```

## 响应信息

### 成功响应

**状态码**: 200 OK

```json
{
  "success": true,
  "message": "剧本优化成功",
  "data": {
    "script": {
      "id": "1",
      "originalContent": "标题：母爱的温度\n人物：母亲、儿子\n场景：现代都市家庭\n剧本正文：...",
      "optimizedContent": "标题：母爱的温度\n人物：母亲、儿子\n场景：现代都市家庭\n剧本正文：...",
      "optimizationType": "对话",
      "improvements": [
        "增强了对话的情感表达",
        "使人物对话更自然流畅",
        "优化了场景描写"
      ],
      "createdAt": "2025-01-30T00:00:00Z"
    }
  }
}
```

### 错误响应

**状态码**: 400 Bad Request

```json
{
  "success": false,
  "message": "请提供剧本内容"
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
  "message": "剧本优化失败，请稍后重试"
}
```

## 接口说明

- 该接口需要用户已登录，否则会返回 401 错误
- 剧本优化过程可能需要几秒钟时间
- 优化后的剧本会保留原始剧本的基本结构和主题
- 接口会返回具体的优化改进点

## 使用场景

- 提升剧本质量
- 优化剧本对话和情节
- 调整剧本风格
- 增强剧本的情感表达

## 注意事项

- 优化后的剧本仅供参考，可能需要人工进一步调整
- 请确保原始剧本内容符合相关法律法规
- 系统会对优化内容进行审核