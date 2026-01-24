---
@file: 078-YYC3-Short-Drama-类型定义-前端-TypeScript全局类型声明.md
@description: YYC3-Short-Drama 前端TS全局公共类型、接口、枚举的统一声明与约束
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[前端],[TypeScript]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 078-YYC3-Short-Drama-类型定义-前端-TypeScript全局类型声明

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-前端-TypeScript全局类型声明相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范前端-TypeScript全局类型声明相关的业务标准与技术落地要求
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

### 3. 前端-TypeScript全局类型声明

#### 3.1 基础类型定义

```typescript
declare global {
  type UUID = string;
  type Timestamp = number;
  type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
  interface JSONObject {
    [key: string]: JSONValue;
  }
  interface JSONArray extends Array<JSONValue> {}
}
```

#### 3.2 枚举类型定义

```typescript
declare global {
  enum UserRole {
    USER = 'user',
    CREATOR = 'creator',
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin'
  }

  enum UserStatus {
    INACTIVE = 'inactive',
    ACTIVE = 'active',
    FROZEN = 'frozen',
    DELETED = 'deleted'
  }

  enum AuthType {
    PHONE = 'phone',
    EMAIL = 'email',
    WECHAT = 'wechat',
    APPLE = 'apple'
  }

  enum VerificationStatus {
    PENDING = 'pending',
    VERIFIED = 'verified',
    REJECTED = 'rejected'
  }

  enum DramaStatus {
    DRAFT = 'draft',
    REVIEWING = 'reviewing',
    PUBLISHED = 'published',
    REJECTED = 'rejected',
    ARCHIVED = 'archived'
  }

  enum ResourceType {
    HERITAGE = 'heritage',
    STORY = 'story',
    ARTIFACT = 'artifact',
    CUSTOM = 'custom',
    LANDMARK = 'landmark'
  }

  enum RelationType {
    REFERENCE = 'reference',
    INSPIRATION = 'inspiration',
    SOURCE = 'source'
  }

  enum CategoryStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
  }

  enum TargetType {
    DRAMA = 'drama',
    EPISODE = 'episode',
    COMMENT = 'comment',
    CREATOR = 'creator'
  }

  enum OrderType {
    STAR = 'star',
    EPISODE = 'episode',
    VIP = 'vip'
  }

  enum OrderStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed',
    CANCELLED = 'cancelled',
    REFUNDED = 'refunded'
  }

  enum PaymentMethod {
    ALIPAY = 'alipay',
    WECHAT = 'wechat'
  }

  enum TransactionType {
    PURCHASE = 'purchase',
    EARNING = 'earning',
    REFUND = 'refund',
    REWARD = 'reward'
  }

  enum MembershipType {
    MONTHLY = 'monthly',
    QUARTERLY = 'quarterly',
    YEARLY = 'yearly'
  }

  enum MembershipStatus {
    ACTIVE = 'active',
    EXPIRED = 'expired',
    CANCELLED = 'cancelled'
  }

  enum MessageType {
    SYSTEM = 'system',
    INTERACTION = 'interaction',
    PROMOTION = 'promotion'
  }

  enum NotificationType {
    LIKE = 'like',
    COMMENT = 'comment',
    FOLLOW = 'follow',
    SYSTEM = 'system'
  }

  enum FeedbackType {
    BUG = 'bug',
    SUGGESTION = 'suggestion',
    COMPLAINT = 'complaint',
    OTHER = 'other'
  }

  enum FeedbackStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    RESOLVED = 'resolved',
    CLOSED = 'closed'
  }

  enum OperationType {
    LOGIN = 'login',
    LOGOUT = 'logout',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete'
  }

  enum OperationStatus {
    SUCCESS = 'success',
    FAILED = 'failed'
  }

  enum GenerationType {
    SCRIPT = 'script',
    IMAGE = 'image',
    VIDEO = 'video'
  }

  enum GenerationStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    FAILED = 'failed'
  }
}
```

#### 3.3 用户相关类型

```typescript
declare global {
  interface User {
    userId: UUID;
    phone?: string;
    email?: string;
    nickname: string;
    avatar?: string;
    bio?: string;
    role: UserRole;
    status: UserStatus;
    starValue: number;
    starLevel: number;
    lastLoginAt?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }

  interface UserAuth {
    authId: UUID;
    userId: UUID;
    authType: AuthType;
    authKey: string;
    verified: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }

  interface Creator {
    creatorId: UUID;
    userId: UUID;
    realName?: string;
    idCard?: string;
    idCardFront?: string;
    idCardBack?: string;
    businessLicense?: string;
    verificationStatus: VerificationStatus;
    verificationTime?: Timestamp;
    rejectReason?: string;
    totalPlays: number;
    totalEarnings: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }

  interface UserProfile extends User {
    creator?: Creator;
    isCreator: boolean;
  }
}
```

#### 3.4 短剧相关类型

```typescript
declare global {
  interface Drama {
    dramaId: UUID;
    creatorId: UUID;
    title: string;
    description?: string;
    coverImage: string;
    videoUrl: string;
    duration: number;
    categoryId: UUID;
    tags?: string[];
    status: DramaStatus;
    isAiGenerated: boolean;
    aiModel?: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
    starPrice: number;
    totalEarnings: number;
    publishedAt?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    creator?: Creator;
    category?: Category;
    episodes?: Episode[];
  }

  interface Episode {
    episodeId: UUID;
    dramaId: UUID;
    episodeNumber: number;
    title?: string;
    description?: string;
    coverImage?: string;
    videoUrl: string;
    duration: number;
    isFree: boolean;
    starPrice: number;
    viewCount: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }

  interface Category {
    categoryId: UUID;
    parentId?: UUID;
    name: string;
    description?: string;
    icon?: string;
    sortOrder: number;
    status: CategoryStatus;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    children?: Category[];
  }
}
```

#### 3.5 文化资源相关类型

```typescript
declare global {
  interface CulturalResource {
    resourceId: UUID;
    resourceType: ResourceType;
    title: string;
    description?: string;
    coverImage?: string;
    content?: JSONObject;
    tags?: string[];
    location?: JSONObject;
    era?: string;
    status: CategoryStatus;
    viewCount: number;
    usageCount: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }

  interface CulturalResourceRelation {
    relationId: UUID;
    resourceId: UUID;
    targetType: TargetType;
    targetId: UUID;
    relationType: RelationType;
    createdAt: Timestamp;
    resource?: CulturalResource;
  }
}
```

#### 3.6 互动相关类型

```typescript
declare global {
  interface Like {
    likeId: UUID;
    userId: UUID;
    targetType: TargetType;
    targetId: UUID;
    createdAt: Timestamp;
    user?: User;
  }

  interface Comment {
    commentId: UUID;
    userId: UUID;
    targetType: TargetType;
    targetId: UUID;
    parentId?: UUID;
    content: string;
    likeCount: number;
    status: UserStatus;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    user?: User;
    replies?: Comment[];
  }

  interface Favorite {
    favoriteId: UUID;
    userId: UUID;
    targetType: TargetType;
    targetId: UUID;
    createdAt: Timestamp;
    user?: User;
  }
}
```

#### 3.7 订单与支付相关类型

```typescript
declare global {
  interface Order {
    orderId: UUID;
    userId: UUID;
    orderType: OrderType;
    targetId?: UUID;
    amount: number;
    starAmount: number;
    status: OrderStatus;
    paymentMethod?: PaymentMethod;
    paymentId?: string;
    paidAt?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    user?: User;
  }

  interface Transaction {
    transactionId: UUID;
    userId: UUID;
    transactionType: TransactionType;
    amount: number;
    starAmount: number;
    balanceAfter: number;
    description?: string;
    relatedId?: UUID;
    createdAt: Timestamp;
    user?: User;
  }

  interface VipMembership {
    membershipId: UUID;
    userId: UUID;
    membershipType: MembershipType;
    startDate: Timestamp;
    endDate: Timestamp;
    status: MembershipStatus;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    user?: User;
  }
}
```

#### 3.8 消息与通知相关类型

```typescript
declare global {
  interface Message {
    messageId: UUID;
    userId: UUID;
    messageType: MessageType;
    title: string;
    content?: string;
    isRead: boolean;
    readAt?: Timestamp;
    createdAt: Timestamp;
    user?: User;
  }

  interface Notification {
    notificationId: UUID;
    userId: UUID;
    notificationType: NotificationType;
    title?: string;
    content?: string;
    targetType?: TargetType;
    targetId?: UUID;
    isRead: boolean;
    readAt?: Timestamp;
    createdAt: Timestamp;
    user?: User;
  }
}
```

#### 3.9 反馈与日志相关类型

```typescript
declare global {
  interface Feedback {
    feedbackId: UUID;
    userId: UUID;
    feedbackType: FeedbackType;
    title: string;
    content: string;
    images?: string[];
    status: FeedbackStatus;
    reply?: string;
    repliedAt?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    user?: User;
  }

  interface OperationLog {
    logId: UUID;
    userId?: UUID;
    operationType: OperationType;
    resourceType?: string;
    resourceId?: UUID;
    ipAddress?: string;
    userAgent?: string;
    requestData?: JSONObject;
    responseData?: JSONObject;
    status: OperationStatus;
    errorMessage?: string;
    createdAt: Timestamp;
    user?: User;
  }

  interface AiGenerationLog {
    logId: UUID;
    userId: UUID;
    generationType: GenerationType;
    inputData: JSONObject;
    outputData?: JSONObject;
    modelName?: string;
    modelVersion?: string;
    tokensUsed?: number;
    duration?: number;
    status: GenerationStatus;
    errorMessage?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    user?: User;
  }
}
```

#### 3.10 系统配置相关类型

```typescript
declare global {
  interface SystemConfig {
    configId: UUID;
    configKey: string;
    configValue?: JSONObject;
    description?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }
}
```

#### 3.11 API响应类型

```typescript
declare global {
  interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    code?: number;
    message?: string;
    timestamp: Timestamp;
  }

  interface PaginationResponse<T = any> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }

  interface ListResponse<T = any> extends ApiResponse<PaginationResponse<T>> {}
}
```

#### 3.12 分页与查询参数类型

```typescript
declare global {
  interface PaginationParams {
    page: number;
    pageSize: number;
  }

  interface SortParams {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }

  interface FilterParams {
    [key: string]: any;
  }

  interface QueryParams extends PaginationParams, SortParams, FilterParams {}
}
```

#### 3.13 表单与验证类型

```typescript
declare global {
  interface FormFieldError {
    field: string;
    message: string;
  }

  interface FormErrors {
    [field: string]: string;
  }

  interface ValidationResult {
    valid: boolean;
    errors: FormFieldError[];
  }
}
```

#### 3.14 路由与导航类型

```typescript
declare global {
  interface RouteParams {
    [key: string]: string;
  }

  interface QueryParams {
    [key: string]: string | string[] | undefined;
  }

  interface NavigationState {
    from?: string;
    params?: RouteParams;
    query?: QueryParams;
  }
}
```

#### 3.15 主题与样式类型

```typescript
declare global {
  type ThemeMode = 'light' | 'dark' | 'auto';

  interface ThemeConfig {
    mode: ThemeMode;
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  }

  interface Breakpoints {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  }
}
```

#### 3.16 文件与媒体类型

```typescript
declare global {
  interface FileInfo {
    name: string;
    size: number;
    type: string;
    url: string;
    thumbnailUrl?: string;
  }

  interface VideoInfo extends FileInfo {
    duration: number;
    width: number;
    height: number;
  }

  interface ImageInfo extends FileInfo {
    width: number;
    height: number;
  }
}
```

#### 3.17 统计与分析类型

```typescript
declare global {
  interface Statistics {
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    totalFollowers: number;
    totalEarnings: number;
  }

  interface AnalyticsData {
    date: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    earnings: number;
  }

  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color?: string;
    }[];
  }
}
```

#### 3.18 工具类型

```typescript
declare global {
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };

  type Required<T> = {
    [P in keyof T]-?: T[P];
  };

  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type Nullable<T> = T | null;

  type Optional<T> = T | undefined;

  type Maybe<T> = T | null | undefined;
}
```

### 4. 类型使用规范

#### 4.1 命名规范
- 接口使用 PascalCase 命名
- 类型别名使用 PascalCase 命名
- 枚举使用 PascalCase 命名，枚举值使用 UPPER_CASE 命名
- 常量使用 UPPER_CASE 命名

#### 4.2 类型定义规范
- 所有类型定义必须明确指定字段类型
- 可选字段使用 ? 标记
- 只读字段使用 readonly 标记
- 联合类型使用 | 连接
- 交叉类型使用 & 连接

#### 4.3 类型导入导出规范
- 公共类型定义在 global.d.ts 文件中
- 模块特定类型定义在模块文件中
- 类型导出使用 export 关键字
- 类型导入使用 import type 语法

### 5. 类型安全最佳实践

#### 5.1 避免使用 any
- 尽量避免使用 any 类型
- 使用 unknown 替代 any
- 使用泛型提供类型安全
- 使用类型守卫进行类型检查

#### 5.2 使用严格模式
- 启用 TypeScript 严格模式
- 启用 noImplicitAny 选项
- 启用 strictNullChecks 选项
- 启用 noImplicitReturns 选项

#### 5.3 类型推断
- 合理使用类型推断
- 避免过度类型注解
- 使用 as const 断言
- 使用类型推断简化代码

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
