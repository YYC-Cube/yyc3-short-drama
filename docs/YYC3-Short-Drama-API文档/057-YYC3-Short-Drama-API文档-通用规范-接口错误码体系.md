---
@file: 057-YYC3-Short-Drama-API文档-通用规范-接口错误码体系.md
@description: YYC3-Short-Drama 全局统一的接口错误码定义，包含业务码、技术码、错误描述规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [API接口],[通用规范],[错误码]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 057-YYC3-Short-Drama-API文档-通用规范-接口错误码体系

## 概述

本文档详细描述YYC3-Short-Drama-API文档-通用规范-接口错误码体系相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范通用规范-接口错误码体系相关的业务标准与技术落地要求
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

### 3. 接口错误码体系

#### 3.1 错误码设计原则

##### 3.1.1 错误码格式规范

```
错误码格式：YYC3-{业务域}-{错误类型}-{具体错误}

组成部分：
- YYC3: 项目标识
- 业务域: 模块代码（3位大写字母）
- 错误类型: 错误类别（2位数字）
- 具体错误: 具体错误编号（3位数字）

示例：
YYC3-AUTH-01-001
  └─ 认证授权模块
      └─ 验证错误
          └─ 邮箱格式不正确
```

##### 3.1.2 错误码分类体系

```
错误类型分类：
01 - 验证错误（Validation Error）
02 - 资源未找到（Not Found Error）
03 - 冲突错误（Conflict Error）
04 - 未授权错误（Unauthorized Error）
05 - 禁止访问错误（Forbidden Error）
06 - 数据库错误（Database Error）
07 - 网络错误（Network Error）
08 - 外部服务错误（External Service Error）
09 - 文件系统错误（File System Error）
10 - 缓存错误（Cache Error）
99 - 系统错误（System Error）
```

#### 3.2 业务域错误码定义

##### 3.2.1 认证授权模块（AUTH）

| 错误码 | 错误类型 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|---------|-----------|---------|
| YYC3-AUTH-01-001 | 验证错误 | 邮箱格式不正确 | 400 | 提示用户输入正确的邮箱格式 |
| YYC3-AUTH-01-002 | 验证错误 | 密码强度不足 | 400 | 提示密码至少8位，包含大小写字母、数字和特殊字符 |
| YYC3-AUTH-01-003 | 验证错误 | 手机号格式不正确 | 400 | 提示用户输入正确的手机号格式 |
| YYC3-AUTH-04-001 | 未授权错误 | 未登录或登录已过期 | 401 | 跳转到登录页面 |
| YYC3-AUTH-04-002 | 未授权错误 | Token无效 | 401 | 重新获取Token |
| YYC3-AUTH-04-003 | 未授权错误 | Refresh Token过期 | 401 | 重新登录 |
| YYC3-AUTH-05-001 | 禁止访问错误 | 权限不足 | 403 | 提示用户无权访问该资源 |
| YYC3-AUTH-05-002 | 禁止访问错误 | 账号已被禁用 | 403 | 联系管理员 |
| YYC3-AUTH-03-001 | 冲突错误 | 邮箱已被注册 | 409 | 提示用户使用其他邮箱 |

##### 3.2.2 用户管理模块（USER）

| 错误码 | 错误类型 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|---------|-----------|---------|
| YYC3-USER-02-001 | 资源未找到 | 用户不存在 | 404 | 提示用户不存在 |
| YYC3-USER-01-001 | 验证错误 | 昵称长度不符合要求 | 400 | 昵称长度应在2-20位之间 |
| YYC3-USER-01-002 | 验证错误 | 头像格式不支持 | 400 | 仅支持jpg、png、gif格式 |
| YYC3-USER-03-001 | 冲突错误 | 昵称已被占用 | 409 | 提示用户更换昵称 |
| YYC3-USER-05-001 | 禁止访问错误 | 无权修改其他用户信息 | 403 | 仅允许修改自己的信息 |

##### 3.2.3 短剧管理模块（DRAMA）

| 错误码 | 错误类型 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|---------|-----------|---------|
| YYC3-DRAMA-02-001 | 资源未找到 | 短剧不存在 | 404 | 提示短剧不存在 |
| YYC3-DRAMA-02-002 | 资源未找到 | 剧集不存在 | 404 | 提示剧集不存在 |
| YYC3-DRAMA-01-001 | 验证错误 | 标题不能为空 | 400 | 提示用户输入标题 |
| YYC3-DRAMA-01-002 | 验证错误 | 封面图片格式不支持 | 400 | 仅支持jpg、png格式 |
| YYC3-DRAMA-01-003 | 验证错误 | 视频格式不支持 | 400 | 仅支持mp4格式 |
| YYC3-DRAMA-03-001 | 冲突错误 | 短剧标题已存在 | 409 | 提示用户更换标题 |
| YYC3-DRAMA-05-001 | 禁止访问错误 | 无权删除该短剧 | 403 | 仅允许作者或管理员删除 |

##### 3.2.4 支付系统模块（PAYMENT）

| 错误码 | 错误类型 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|---------|-----------|---------|
| YYC3-PAYMENT-01-001 | 验证错误 | 金额格式不正确 | 400 | 金额应为正数，保留两位小数 |
| YYC3-PAYMENT-01-002 | 验证错误 | 支付方式不支持 | 400 | 请选择支持的支付方式 |
| YYC3-PAYMENT-08-001 | 外部服务错误 | 支付失败 | 502 | 提示用户稍后重试或联系客服 |
| YYC3-PAYMENT-08-002 | 外部服务错误 | 退款失败 | 502 | 提示用户稍后重试或联系客服 |
| YYC3-PAYMENT-03-001 | 冲突错误 | 订单已支付 | 409 | 提示订单已支付，请勿重复支付 |
| YYC3-PAYMENT-02-001 | 资源未找到 | 订单不存在 | 404 | 提示订单不存在 |

##### 3.2.5 AI服务模块（AI）

| 错误码 | 错误类型 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|---------|-----------|---------|
| YYC3-AI-01-001 | 验证错误 | 提示词不能为空 | 400 | 提示用户输入提示词 |
| YYC3-AI-01-002 | 验证错误 | 提示词长度超出限制 | 400 | 提示词长度应在10-1000字符之间 |
| YYC3-AI-08-001 | 外部服务错误 | AI服务调用失败 | 502 | 提示用户稍后重试 |
| YYC3-AI-08-002 | 外部服务错误 | AI服务响应超时 | 504 | 提示用户稍后重试 |
| YYC3-AI-05-001 | 禁止访问错误 | AI服务配额已用尽 | 403 | 提示用户升级套餐或等待配额重置 |

##### 3.2.6 文件服务模块（FILE）

| 错误码 | 错误类型 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|---------|-----------|---------|
| YYC3-FILE-01-001 | 验证错误 | 文件格式不支持 | 400 | 提示上传支持的文件格式 |
| YYC3-FILE-01-002 | 验证错误 | 文件大小超出限制 | 400 | 文件大小不能超过100MB |
| YYC3-FILE-09-001 | 文件系统错误 | 文件上传失败 | 500 | 提示用户稍后重试 |
| YYC3-FILE-09-002 | 文件系统错误 | 文件删除失败 | 500 | 提示用户稍后重试 |
| YYC3-FILE-02-001 | 资源未找到 | 文件不存在 | 404 | 提示文件不存在 |

##### 3.2.7 通知服务模块（NOTIFICATION）

| 错误码 | 错误类型 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|---------|-----------|---------|
| YYC3-NOTIFICATION-01-001 | 验证错误 | 手机号格式不正确 | 400 | 提示用户输入正确的手机号 |
| YYC3-NOTIFICATION-01-002 | 验证错误 | 验证码格式不正确 | 400 | 验证码应为6位数字 |
| YYC3-NOTIFICATION-08-001 | 外部服务错误 | 短信发送失败 | 502 | 提示用户稍后重试 |
| YYC3-NOTIFICATION-08-002 | 外部服务错误 | 邮件发送失败 | 502 | 提示用户稍后重试 |
| YYC3-NOTIFICATION-03-001 | 冲突错误 | 验证码已发送 | 409 | 提示用户等待60秒后重新发送 |

##### 3.2.8 数据分析模块（ANALYTICS）

| 错误码 | 错误类型 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|---------|-----------|---------|
| YYC3-ANALYTICS-01-001 | 验证错误 | 日期格式不正确 | 400 | 日期格式应为YYYY-MM-DD |
| YYC3-ANALYTICS-01-002 | 验证错误 | 查询时间范围超出限制 | 400 | 查询时间范围不能超过90天 |
| YYC3-ANALYTICS-06-001 | 数据库错误 | 数据查询失败 | 500 | 提示用户稍后重试 |
| YYC3-ANALYTICS-05-001 | 禁止访问错误 | 无权查看该数据 | 403 | 提示用户无权访问该数据 |

#### 3.3 技术错误码定义

##### 3.3.1 数据库错误（06）

| 错误码 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|-----------|---------|
| YYC3-SYSTEM-06-001 | 数据库连接失败 | 500 | 提示用户稍后重试 |
| YYC3-SYSTEM-06-002 | 数据库查询超时 | 504 | 提示用户稍后重试 |
| YYC3-SYSTEM-06-003 | 数据库事务失败 | 500 | 提示用户稍后重试 |
| YYC3-SYSTEM-06-004 | 数据库锁等待超时 | 504 | 提示用户稍后重试 |

##### 3.3.2 网络错误（07）

| 错误码 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|-----------|---------|
| YYC3-SYSTEM-07-001 | 网络连接失败 | 502 | 提示用户检查网络连接 |
| YYC3-SYSTEM-07-002 | 请求超时 | 504 | 提示用户稍后重试 |
| YYC3-SYSTEM-07-003 | DNS解析失败 | 502 | 提示用户检查网络连接 |

##### 3.3.3 外部服务错误（08）

| 错误码 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|-----------|---------|
| YYC3-SYSTEM-08-001 | 第三方API调用失败 | 502 | 提示用户稍后重试 |
| YYC3-SYSTEM-08-002 | 第三方服务不可用 | 503 | 提示用户稍后重试 |
| YYC3-SYSTEM-08-003 | 第三方服务响应超时 | 504 | 提示用户稍后重试 |

##### 3.3.4 文件系统错误（09）

| 错误码 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|-----------|---------|
| YYC3-SYSTEM-09-001 | 文件读取失败 | 500 | 提示用户稍后重试 |
| YYC3-SYSTEM-09-002 | 文件写入失败 | 500 | 提示用户稍后重试 |
| YYC3-SYSTEM-09-003 | 磁盘空间不足 | 500 | 联系管理员 |

##### 3.3.5 缓存错误（10）

| 错误码 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|-----------|---------|
| YYC3-SYSTEM-10-001 | 缓存连接失败 | 500 | 提示用户稍后重试 |
| YYC3-SYSTEM-10-002 | 缓存写入失败 | 500 | 提示用户稍后重试 |
| YYC3-SYSTEM-10-003 | 缓存读取失败 | 500 | 提示用户稍后重试 |

##### 3.3.6 系统错误（99）

| 错误码 | 错误描述 | HTTP状态码 | 处理建议 |
|--------|---------|-----------|---------|
| YYC3-SYSTEM-99-001 | 系统内部错误 | 500 | 提示用户稍后重试 |
| YYC3-SYSTEM-99-002 | 服务不可用 | 503 | 提示用户稍后重试 |
| YYC3-SYSTEM-99-003 | 配置错误 | 500 | 联系管理员 |
| YYC3-SYSTEM-99-004 | 依赖服务不可用 | 503 | 提示用户稍后重试 |

#### 3.4 错误响应格式

##### 3.4.1 标准错误响应

```json
{
  "success": false,
  "code": "YYC3-AUTH-01-001",
  "message": "邮箱格式不正确",
  "errors": [
    {
      "field": "email",
      "message": "邮箱格式不正确"
    }
  ],
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": 1640995200000
  }
}
```

##### 3.4.2 验证错误响应

```json
{
  "success": false,
  "code": "YYC3-AUTH-01-001",
  "message": "请求参数验证失败",
  "errors": [
    {
      "field": "email",
      "message": "邮箱格式不正确"
    },
    {
      "field": "password",
      "message": "密码至少8位"
    }
  ],
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": 1640995200000
  }
}
```

##### 3.4.3 资源未找到错误响应

```json
{
  "success": false,
  "code": "YYC3-USER-02-001",
  "message": "用户不存在",
  "errors": [],
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": 1640995200000
  }
}
```

##### 3.4.4 权限错误响应

```json
{
  "success": false,
  "code": "YYC3-AUTH-05-001",
  "message": "权限不足",
  "errors": [],
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": 1640995200000
  }
}
```

#### 3.5 错误处理最佳实践

##### 3.5.1 前端错误处理

```typescript
// frontend/utils/errorHandler.ts
export const handleApiError = (error: any) => {
  const errorCode = error?.response?.data?.code;
  const errorMessage = error?.response?.data?.message || '请求失败';

  switch (errorCode) {
    case 'YYC3-AUTH-04-001':
      // 未登录或登录已过期
      redirectToLogin();
      break;
    case 'YYC3-AUTH-05-001':
      // 权限不足
      showErrorMessage('您没有权限访问该资源');
      break;
    case 'YYC3-AUTH-04-002':
      // Token无效
      refreshToken();
      break;
    default:
      showErrorMessage(errorMessage);
  }
};
```

##### 3.5.2 后端错误处理

```typescript
// backend/middleware/errorHandler.middleware.ts
import { Context, Next } from 'hono';
import { ValidationError, NotFoundError, ForbiddenError, UnauthorizedError } from '@/errors';

export const errorHandlerMiddleware = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      return c.json(
        {
          success: false,
          code: error.code,
          message: error.message,
          errors: error.errors,
        },
        400
      );
    }

    if (error instanceof NotFoundError) {
      return c.json(
        {
          success: false,
          code: error.code,
          message: error.message,
          errors: [],
        },
        404
      );
    }

    if (error instanceof UnauthorizedError) {
      return c.json(
        {
          success: false,
          code: error.code,
          message: error.message,
          errors: [],
        },
        401
      );
    }

    if (error instanceof ForbiddenError) {
      return c.json(
        {
          success: false,
          code: error.code,
          message: error.message,
          errors: [],
        },
        403
      );
    }

    return c.json(
      {
        success: false,
        code: 'YYC3-SYSTEM-99-001',
        message: '系统内部错误',
        errors: [],
      },
      500
    );
  }
};
```

#### 3.6 错误码管理

##### 3.6.1 错误码注册流程

```
1. 确定业务域和错误类型
2. 分配错误码编号
3. 编写错误描述和处理建议
4. 更新错误码文档
5. 通知相关开发人员
6. 在代码中实现错误处理
```

##### 3.6.2 错误码维护规范

```
维护原则：
- 错误码一旦发布，不得修改
- 废弃错误码保留至少6个月
- 新增错误码需经过评审
- 定期清理不再使用的错误码

更新流程：
1. 提交错误码变更申请
2. 技术评审
3. 更新文档和代码
4. 发布变更通知
5. 监控错误码使用情况
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
