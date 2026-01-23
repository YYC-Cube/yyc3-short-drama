---
@file: 088-YYC3-Short-Drama-类型定义-通用-全局常量枚举文档.md
@description: YYC3-Short-Drama 全项目全局常量、枚举的定义与含义，保障代码规范统一
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-24
@updated: 2026-01-24
@status: published
@tags: [类型定义],[通用],[常量枚举]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 088-YYC3-Short-Drama-类型定义-通用-全局常量枚举文档

## 概述

本文档定义了YYC3-Short-Drama项目的全局常量和枚举类型，为项目开发提供统一的类型定义和常量规范，确保代码规范统一，提高代码可维护性和可读性。

## 核心内容

### 1. 全局常量定义

#### 1.1 系统常量

**系统配置常量**

| 常量名 | 常量值 | 类型 | 说明 |
|----------|----------|------|------|
| APP_NAME | 'YYC3-Short-Drama' | string | 应用名称 |
| APP_VERSION | '1.0.0' | string | 应用版本号 |
| API_VERSION | 'v1' | string | API版本 |
| DEFAULT_LANGUAGE | 'zh-CN' | string | 默认语言 |
| DEFAULT_TIMEZONE | 'Asia/Shanghai' | string | 默认时区 |
| DEFAULT_PAGE_SIZE | 20 | number | 默认分页大小 |
| MAX_PAGE_SIZE | 100 | number | 最大分页大小 |
| MIN_PAGE_SIZE | 1 | number | 最小分页大小 |

**时间常量**

| 常量名 | 常量值 | 类型 | 说明 |
|----------|----------|------|------|
| ONE_MINUTE | 60 | number | 一分钟秒数 |
| ONE_HOUR | 3600 | number | 一小时秒数 |
| ONE_DAY | 86400 | number | 一天秒数 |
| ONE_WEEK | 604800 | number | 一周秒数 |
| ONE_MONTH | 2592000 | number | 一个月秒数 |
| TOKEN_EXPIRE_TIME | 7200 | number | Token过期时间（2小时） |
| REFRESH_TOKEN_EXPIRE_TIME | 604800 | number | 刷新Token过期时间（7天） |

**文件常量**

| 常量名 | 常量值 | 类型 | 说明 |
|----------|----------|------|------|
| MAX_FILE_SIZE | 10485760 | number | 最大文件大小（10MB） |
| MAX_IMAGE_SIZE | 5242880 | number | 最大图片大小（5MB） |
| MAX_VIDEO_SIZE | 104857600 | number | 最大视频大小（100MB） |
| ALLOWED_IMAGE_TYPES | ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] | string[] | 允许的图片类型 |
| ALLOWED_VIDEO_TYPES | ['video/mp4', 'video/webm', 'video/ogg'] | string[] | 允许的视频类型 |
| ALLOWED_DOCUMENT_TYPES | ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] | string[] | 允许的文档类型 |

#### 1.2 业务常量

**用户相关常量**

| 常量名 | 常量值 | 类型 | 说明 |
|----------|----------|------|------|
| MIN_USERNAME_LENGTH | 3 | number | 用户名最小长度 |
| MAX_USERNAME_LENGTH | 20 | number | 用户名最大长度 |
| MIN_PASSWORD_LENGTH | 8 | number | 密码最小长度 |
| MAX_PASSWORD_LENGTH | 20 | number | 密码最大长度 |
| MIN_NICKNAME_LENGTH | 2 | number | 昵称最小长度 |
| MAX_NICKNAME_LENGTH | 30 | number | 昵称最大长度 |
| MAX_BIO_LENGTH | 200 | number | 个人简介最大长度 |
| MAX_AVATAR_SIZE | 2097152 | number | 头像最大大小（2MB） |

**内容相关常量**

| 常量名 | 常量值 | 类型 | 说明 |
|----------|----------|------|------|
| MIN_TITLE_LENGTH | 5 | number | 标题最小长度 |
| MAX_TITLE_LENGTH | 100 | number | 标题最大长度 |
| MIN_CONTENT_LENGTH | 10 | number | 内容最小长度 |
| MAX_CONTENT_LENGTH | 10000 | number | 内容最大长度 |
| MIN_COMMENT_LENGTH | 1 | number | 评论最小长度 |
| MAX_COMMENT_LENGTH | 500 | number | 评论最大长度 |
| MAX_TAGS_COUNT | 10 | number | 最大标签数量 |

**星币相关常量**

| 常量名 | 常量值 | 类型 | 说明 |
|----------|----------|------|------|
| STAR_COIN_NAME | '星币' | string | 星币名称 |
| STAR_COIN_SYMBOL | '★' | string | 星币符号 |
| MIN_RECHARGE_AMOUNT | 1 | number | 最小充值金额 |
| MAX_RECHARGE_AMOUNT | 10000 | number | 最大充值金额 |
| STAR_COIN_TO_CNY_RATE | 100 | number | 星币与人民币汇率（100星币=1元） |

#### 1.3 技术常量

**HTTP状态码常量**

| 常量名 | 常量值 | 说明 |
|----------|----------|------|
| HTTP_OK | 200 | 请求成功 |
| HTTP_CREATED | 201 | 创建成功 |
| HTTP_BAD_REQUEST | 400 | 请求错误 |
| HTTP_UNAUTHORIZED | 401 | 未授权 |
| HTTP_FORBIDDEN | 403 | 禁止访问 |
| HTTP_NOT_FOUND | 404 | 资源不存在 |
| HTTP_METHOD_NOT_ALLOWED | 405 | 方法不允许 |
| HTTP_CONFLICT | 409 | 冲突 |
| HTTP_INTERNAL_SERVER_ERROR | 500 | 服务器错误 |

**业务状态码常量**

| 常量名 | 常量值 | 说明 |
|----------|----------|------|
| SUCCESS | 0 | 成功 |
| ERROR | 1 | 错误 |
| PARAM_ERROR | 1001 | 参数错误 |
| USER_NOT_EXIST | 1002 | 用户不存在 |
| USER_ALREADY_EXIST | 1003 | 用户已存在 |
| PASSWORD_ERROR | 1004 | 密码错误 |
| TOKEN_INVALID | 1005 | Token无效 |
| TOKEN_EXPIRED | 1006 | Token过期 |
| PERMISSION_DENIED | 1007 | 权限不足 |
| CONTENT_NOT_EXIST | 2001 | 内容不存在 |
| CONTENT_ALREADY_EXIST | 2002 | 内容已存在 |
| CONTENT_AUDIT_FAILED | 2003 | 内容审核失败 |
| STAR_COIN_NOT_ENOUGH | 3001 | 星币不足 |
| RECHARGE_FAILED | 3002 | 充值失败 |

### 2. 枚举类型定义

#### 2.1 用户相关枚举

**用户状态枚举**

```typescript
enum UserStatus {
  INACTIVE = 0,    // 未激活
  ACTIVE = 1,       // 已激活
  FROZEN = 2,      // 已冻结
  DELETED = 3       // 已删除
}
```

**用户角色枚举**

```typescript
enum UserRole {
  USER = 0,         // 普通用户
  CREATOR = 1,      // 创作者
  ADMIN = 2,        // 管理员
  SUPER_ADMIN = 3    // 超级管理员
}
```

**用户性别枚举**

```typescript
enum UserGender {
  UNKNOWN = 0,      // 未知
  MALE = 1,         // 男
  FEMALE = 2         // 女
}
```

**会员等级枚举**

```typescript
enum MemberLevel {
  FREE = 0,          // 免费会员
  BASIC = 1,         // 基础会员
  PREMIUM = 2,       // 高级会员
  ENTERPRISE = 3      // 企业会员
}
```

#### 2.2 内容相关枚举

**内容状态枚举**

```typescript
enum ContentStatus {
  DRAFT = 0,         // 草稿
  PENDING = 1,       // 待审核
  APPROVED = 2,      // 已通过
  REJECTED = 3,      // 已拒绝
  PUBLISHED = 4,     // 已发布
  ARCHIVED = 5        // 已归档
}
```

**内容类型枚举**

```typescript
enum ContentType {
  SCRIPT = 0,         // 剧本
  VIDEO = 1,          // 视频
  IMAGE = 2,          // 图片
  ARTICLE = 3,        // 文章
  AUDIO = 4           // 音频
}
```

**内容审核状态枚举**

```typescript
enum AuditStatus {
  PENDING = 0,       // 待审核
  APPROVED = 1,      // 已通过
  REJECTED = 2,      // 已拒绝
  REVIEWING = 3      // 审核中
}
```

#### 2.3 文化相关枚举

**文化分类枚举**

```typescript
enum CultureCategory {
  HISTORY = 0,        // 历史
  LITERATURE = 1,      // 文学
  ART = 2,            // 艺术
  CUSTOM = 3,          // 习俗
  FOLKLORE = 4,       // 民间传说
  ARCHITECTURE = 5,    // 建筑
  FOOD = 6,           // 美食
  FESTIVAL = 7,        // 节日
  OTHER = 8            // 其他
}
```

**文化元素类型枚举**

```typescript
enum CultureElementType {
  CHARACTER = 0,      // 人物
  PLACE = 1,          // 地点
  EVENT = 2,          // 事件
  OBJECT = 3,         // 物品
  CONCEPT = 4,        // 概念
  CUSTOM = 5          // 习俗
}
```

**朝代枚举**

```typescript
enum Dynasty {
  UNKNOWN = 0,        // 未知
  XIA = 1,            // 夏
  SHANG = 2,          // 商
  ZHOU = 3,           // 周
  QIN = 4,            // 秦
  HAN = 5,            // 汉
  TANG = 6,           // 唐
  SONG = 7,           // 宋
  YUAN = 8,           // 元
  MING = 9,           // 明
  QING = 10           // 清
}
```

#### 2.4 社交相关枚举

**关注状态枚举**

```typescript
enum FollowStatus {
  NOT_FOLLOWING = 0,  // 未关注
  FOLLOWING = 1,      // 已关注
  MUTUAL = 2          // 互相关注
}
```

**私信状态枚举**

```typescript
enum MessageStatus {
  UNREAD = 0,         // 未读
  READ = 1,           // 已读
  DELETED = 2         // 已删除
}
```

**评论状态枚举**

```typescript
enum CommentStatus {
  NORMAL = 0,         // 正常
  HIDDEN = 1,         // 已隐藏
  DELETED = 2         // 已删除
}
```

#### 2.5 支付相关枚举

**支付方式枚举**

```typescript
enum PaymentMethod {
  ALIPAY = 0,         // 支付宝
  WECHAT = 1,         // 微信支付
  BANK_CARD = 2,      // 银行卡
  STAR_COIN = 3        // 星币
}
```

**支付状态枚举**

```typescript
enum PaymentStatus {
  PENDING = 0,        // 待支付
  PROCESSING = 1,     // 支付中
  SUCCESS = 2,        // 支付成功
  FAILED = 3,         // 支付失败
  REFUNDED = 4        // 已退款
}
```

**订单状态枚举**

```typescript
enum OrderStatus {
  PENDING = 0,        // 待处理
  CONFIRMED = 1,      // 已确认
  COMPLETED = 2,      // 已完成
  CANCELLED = 3,      // 已取消
  REFUNDED = 4        // 已退款
}
```

#### 2.6 系统相关枚举

**日志级别枚举**

```typescript
enum LogLevel {
  DEBUG = 0,          // 调试
  INFO = 1,           // 信息
  WARN = 2,           // 警告
  ERROR = 3,          // 错误
  FATAL = 4           // 致命
}
```

**操作类型枚举**

```typescript
enum OperationType {
  CREATE = 0,         // 创建
  UPDATE = 1,         // 更新
  DELETE = 2,         // 删除
  QUERY = 3,          // 查询
  EXPORT = 4,         // 导出
  IMPORT = 5          // 导入
}
```

**环境类型枚举**

```typescript
enum Environment {
  DEVELOPMENT = 0,     // 开发环境
  TESTING = 1,        // 测试环境
  STAGING = 2,        // 预生产环境
  PRODUCTION = 3      // 生产环境
}
```

### 3. 常量使用规范

#### 3.1 命名规范

**常量命名**
- 使用全大写字母
- 单词之间使用下划线分隔
- 前缀表示常量类别
- 示例：`MAX_PAGE_SIZE`、`USER_STATUS_ACTIVE`

**枚举命名**
- 使用PascalCase
- 枚举值使用全大写字母
- 单词之间使用下划线分隔
- 示例：`UserStatus`、`UserStatus.ACTIVE`

#### 3.2 定义位置

**常量定义位置**
- 系统常量：`src/constants/system.ts`
- 业务常量：`src/constants/business.ts`
- 技术常量：`src/constants/technical.ts`

**枚举定义位置**
- 用户相关枚举：`src/enums/user.ts`
- 内容相关枚举：`src/enums/content.ts`
- 文化相关枚举：`src/enums/culture.ts`
- 社交相关枚举：`src/enums/social.ts`
- 支付相关枚举：`src/enums/payment.ts`
- 系统相关枚举：`src/enums/system.ts`

#### 3.3 使用原则

**常量使用原则**
- 避免魔法数字，使用命名常量
- 常量值不可修改
- 常量定义后需要注释说明
- 常量应该集中管理

**枚举使用原则**
- 使用枚举代替魔法数字
- 枚举值应该有明确含义
- 枚举应该有完整的注释
- 枚举应该有合理的默认值

### 4. 常量维护

#### 4.1 新增常量

**新增流程**
1. 确定常量类别
2. 选择合适的定义位置
3. 按照命名规范定义常量
4. 添加详细的注释说明
5. 更新本文档

**新增示例**

```typescript
// src/constants/business.ts

/**
 * 最大关注数量
 */
export const MAX_FOLLOW_COUNT = 1000;

/**
 * 每日签到奖励星币数量
 */
export const DAILY_CHECKIN_REWARD = 10;
```

#### 4.2 修改常量

**修改流程**
1. 评估修改影响范围
2. 更新常量定义
3. 更新相关代码
4. 更新本文档
5. 进行回归测试

**修改示例**

```typescript
// 修改前
export const MAX_PAGE_SIZE = 50;

// 修改后
export const MAX_PAGE_SIZE = 100;
```

#### 4.3 废弃常量

**废弃流程**
1. 标记为废弃（DEPRECATED）
2. 添加废弃说明
3. 提供替代方案
4. 逐步替换使用
5. 最终删除

**废弾示例**

```typescript
/**
 * @deprecated 使用 MAX_PAGE_SIZE 替代
 * @see MAX_PAGE_SIZE
 */
export const PAGE_SIZE = 20;
```

### 5. 类型安全

#### 5.1 TypeScript类型定义

**常量类型定义**

```typescript
// src/types/constants.ts

export interface SystemConstants {
  APP_NAME: string;
  APP_VERSION: string;
  API_VERSION: string;
  DEFAULT_LANGUAGE: string;
  DEFAULT_TIMEZONE: string;
}

export const SYSTEM_CONSTANTS: SystemConstants = {
  APP_NAME: 'YYC3-Short-Drama',
  APP_VERSION: '1.0.0',
  API_VERSION: 'v1',
  DEFAULT_LANGUAGE: 'zh-CN',
  DEFAULT_TIMEZONE: 'Asia/Shanghai',
};
```

**枚举类型定义**

```typescript
// src/types/enums.ts

export type UserStatusType = UserStatus;
export type UserRoleType = UserRole;
export type ContentStatusType = ContentStatus;

export interface User {
  id: string;
  status: UserStatusType;
  role: UserRoleType;
  // ...其他字段
}
```

#### 5.2 类型检查

**编译时类型检查**
- 使用TypeScript编译器进行类型检查
- 启用严格模式（strict: true）
- 启用空值检查（strictNullChecks: true）

**运行时类型检查**
- 使用类型守卫（Type Guards）
- 使用类型断言（Type Assertions）
- 使用类型推断（Type Inference）

### 6. 最佳实践

#### 6.1 常量使用最佳实践

**避免魔法数字**

```typescript
// 不好的做法
if (user.age >= 18) {
  // ...
}

// 好的做法
const MIN_ADULT_AGE = 18;
if (user.age >= MIN_ADULT_AGE) {
  // ...
}
```

**使用有意义的名称**

```typescript
// 不好的做法
const T1 = 60;
const T2 = 3600;

// 好的做法
const ONE_MINUTE = 60;
const ONE_HOUR = 3600;
```

**集中管理常量**

```typescript
// 不好的做法（分散定义）
const MAX_SIZE = 100;
const MIN_SIZE = 1;

// 好的做法（集中定义）
export const PAGE_SIZE = {
  MAX: 100,
  MIN: 1,
  DEFAULT: 20,
};
```

#### 6.2 枚举使用最佳实践

**使用枚举代替字符串**

```typescript
// 不好的做法
if (user.status === 'active') {
  // ...
}

// 好的做法
if (user.status === UserStatus.ACTIVE) {
  // ...
}
```

**提供枚举工具函数**

```typescript
// src/utils/enum.ts

/**
 * 获取枚举值数组
 */
export function getEnumValues<T>(enumObj: T): number[] {
  return Object.values(enumObj).filter(
    (value) => typeof value === 'number'
  ) as number[];
}

/**
 * 获取枚举描述
 */
export function getEnumDescription(
  enumObj: any,
  value: number
): string {
  const key = Object.keys(enumObj).find(
    (key) => enumObj[key] === value
  );
  return key ? key.replace(/_/g, ' ') : '';
}
```

### 7. 文档维护

#### 7.1 更新频率

- 常量新增时：立即更新
- 常量修改时：立即更新
- 常量废弁时：立即更新
- 定期检查：每季度检查一次

#### 7.2 版本管理

- 文档版本与代码版本同步
- 记录每次变更的内容
- 标注变更的作者和时间
- 维护变更历史记录

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
