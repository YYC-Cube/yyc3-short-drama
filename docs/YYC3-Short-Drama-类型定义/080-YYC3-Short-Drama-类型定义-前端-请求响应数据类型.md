---
@file: 080-YYC3-Short-Drama-类型定义-前端-请求响应数据类型.md
@description: YYC3-Short-Drama 前端接口请求与响应数据的类型定义，保障前后端数据一致性
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[前端],[接口数据]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 080-YYC3-Short-Drama-类型定义-前端-请求响应数据类型

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-前端-请求响应数据类型相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范前端-请求响应数据类型相关的业务标准与技术落地要求
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

### 3. 前端-请求响应数据类型

#### 3.1 通用请求类型

##### 3.1.1 基础请求参数

```typescript
interface BaseRequestParams {
  timestamp?: number;
  requestId?: string;
  clientVersion?: string;
  deviceInfo?: {
    platform: 'web' | 'ios' | 'android' | 'miniprogram';
    osVersion?: string;
    appVersion?: string;
    deviceId?: string;
  };
}
```

##### 3.1.2 分页请求参数

```typescript
interface PaginationRequestParams extends BaseRequestParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

##### 3.1.3 过滤请求参数

```typescript
interface FilterRequestParams extends BaseRequestParams {
  filters?: Record<string, any>;
  keyword?: string;
  dateRange?: {
    startDate?: string;
    endDate?: string;
  };
}
```

#### 3.2 通用响应类型

##### 3.2.1 基础响应结构

```typescript
interface BaseResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  timestamp: number;
  requestId?: string;
}
```

##### 3.2.2 分页响应结构

```typescript
interface PaginationResponse<T = any> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

##### 3.2.3 错误响应结构

```typescript
interface ErrorResponse {
  success: false;
  code: number;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
    code?: string;
  }>;
  timestamp: number;
  requestId?: string;
}
```

#### 3.3 用户相关请求响应类型

##### 3.3.1 用户注册请求

```typescript
interface UserRegisterRequest extends BaseRequestParams {
  phone?: string;
  email?: string;
  password: string;
  nickname: string;
  verificationCode: string;
  authType: 'phone' | 'email';
}
```

##### 3.3.2 用户登录请求

```typescript
interface UserLoginRequest extends BaseRequestParams {
  authType: 'phone' | 'email' | 'wechat' | 'apple';
  phone?: string;
  email?: string;
  password?: string;
  verificationCode?: string;
  openId?: string;
  accessToken?: string;
}
```

##### 3.3.3 用户信息响应

```typescript
interface UserResponse extends User {
  token?: string;
  refreshToken?: string;
  expiresIn?: number;
}
```

##### 3.3.4 用户更新请求

```typescript
interface UserUpdateRequest extends BaseRequestParams {
  nickname?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  email?: string;
}
```

#### 3.4 短剧相关请求响应类型

##### 3.4.1 短剧列表请求

```typescript
interface DramaListRequest extends PaginationRequestParams, FilterRequestParams {
  categoryId?: string;
  status?: DramaStatus;
  creatorId?: string;
  isAiGenerated?: boolean;
  tags?: string[];
}
```

##### 3.4.2 短剧详情响应

```typescript
interface DramaDetailResponse extends Drama {
  isLiked?: boolean;
  isFavorited?: boolean;
  isPurchased?: boolean;
  relatedDramas?: Drama[];
  creatorProfile?: Creator;
}
```

##### 3.4.3 短剧创建请求

```typescript
interface DramaCreateRequest extends BaseRequestParams {
  title: string;
  description?: string;
  coverImage: string;
  videoUrl: string;
  duration: number;
  categoryId: string;
  tags?: string[];
  isAiGenerated: boolean;
  aiModel?: string;
  starPrice?: number;
}
```

##### 3.4.4 短剧更新请求

```typescript
interface DramaUpdateRequest extends BaseRequestParams {
  dramaId: string;
  title?: string;
  description?: string;
  coverImage?: string;
  videoUrl?: string;
  duration?: number;
  categoryId?: string;
  tags?: string[];
  starPrice?: number;
}
```

##### 3.4.5 剧集列表请求

```typescript
interface EpisodeListRequest extends PaginationRequestParams {
  dramaId: string;
}
```

##### 3.4.6 剧集详情响应

```typescript
interface EpisodeDetailResponse extends Episode {
  isPurchased?: boolean;
  isLiked?: boolean;
  dramaInfo?: Drama;
}
```

#### 3.5 互动相关请求响应类型

##### 3.5.1 点赞请求

```typescript
interface LikeRequest extends BaseRequestParams {
  targetType: 'drama' | 'episode' | 'comment';
  targetId: string;
}
```

##### 3.5.2 取消点赞请求

```typescript
interface UnlikeRequest extends BaseRequestParams {
  targetType: 'drama' | 'episode' | 'comment';
  targetId: string;
}
```

##### 3.5.3 评论列表请求

```typescript
interface CommentListRequest extends PaginationRequestParams {
  targetType: 'drama' | 'episode';
  targetId: string;
  parentId?: string;
}
```

##### 3.5.4 评论创建请求

```typescript
interface CommentCreateRequest extends BaseRequestParams {
  targetType: 'drama' | 'episode';
  targetId: string;
  content: string;
  parentId?: string;
}
```

##### 3.5.5 收藏请求

```typescript
interface FavoriteRequest extends BaseRequestParams {
  targetType: 'drama' | 'creator';
  targetId: string;
}
```

##### 3.5.6 取消收藏请求

```typescript
interface UnfavoriteRequest extends BaseRequestParams {
  targetType: 'drama' | 'creator';
  targetId: string;
}
```

#### 3.6 订单与支付相关请求响应类型

##### 3.6.1 星值充值请求

```typescript
interface StarRechargeRequest extends BaseRequestParams {
  amount: number;
  paymentMethod: 'alipay' | 'wechat';
}
```

##### 3.6.2 剧集购买请求

```typescript
interface EpisodePurchaseRequest extends BaseRequestParams {
  episodeId: string;
  paymentMethod?: 'alipay' | 'wechat' | 'star';
}
```

##### 3.6.3 VIP会员购买请求

```typescript
interface VipPurchaseRequest extends BaseRequestParams {
  membershipType: 'monthly' | 'quarterly' | 'yearly';
  paymentMethod?: 'alipay' | 'wechat' | 'star';
}
```

##### 3.6.4 订单创建响应

```typescript
interface OrderCreateResponse {
  orderId: string;
  orderNo: string;
  amount: number;
  paymentUrl?: string;
  qrCode?: string;
  expireTime: number;
}
```

##### 3.6.5 支付状态查询请求

```typescript
interface PaymentStatusRequest extends BaseRequestParams {
  orderId: string;
}
```

##### 3.6.6 支付状态响应

```typescript
interface PaymentStatusResponse {
  orderId: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  paidAt?: number;
  transactionId?: string;
}
```

#### 3.7 消息与通知相关请求响应类型

##### 3.7.1 消息列表请求

```typescript
interface MessageListRequest extends PaginationRequestParams {
  messageType?: 'system' | 'interaction' | 'promotion';
  isRead?: boolean;
}
```

##### 3.7.2 消息标记已读请求

```typescript
interface MessageReadRequest extends BaseRequestParams {
  messageId: string;
}
```

##### 3.7.3 通知列表请求

```typescript
interface NotificationListRequest extends PaginationRequestParams {
  notificationType?: 'like' | 'comment' | 'follow' | 'system';
  isRead?: boolean;
}
```

##### 3.7.4 通知标记已读请求

```typescript
interface NotificationReadRequest extends BaseRequestParams {
  notificationId: string;
}
```

#### 3.8 反馈相关请求响应类型

##### 3.8.1 反馈创建请求

```typescript
interface FeedbackCreateRequest extends BaseRequestParams {
  feedbackType: 'bug' | 'suggestion' | 'complaint' | 'other';
  title: string;
  content: string;
  images?: string[];
}
```

##### 3.8.2 反馈列表请求

```typescript
interface FeedbackListRequest extends PaginationRequestParams {
  feedbackType?: 'bug' | 'suggestion' | 'complaint' | 'other';
  status?: 'pending' | 'processing' | 'resolved' | 'closed';
}
```

#### 3.9 文化资源相关请求响应类型

##### 3.9.1 文化资源列表请求

```typescript
interface CulturalResourceListRequest extends PaginationRequestParams, FilterRequestParams {
  resourceType?: 'heritage' | 'story' | 'artifact' | 'custom' | 'landmark';
  era?: string;
  location?: {
    latitude?: number;
    longitude?: number;
    radius?: number;
  };
}
```

##### 3.9.2 文化资源详情响应

```typescript
interface CulturalResourceDetailResponse extends CulturalResource {
  relatedDramas?: Drama[];
  relatedResources?: CulturalResource[];
}
```

#### 3.10 分类相关请求响应类型

##### 3.10.1 分类列表请求

```typescript
interface CategoryListRequest extends BaseRequestParams {
  parentId?: string;
  includeChildren?: boolean;
}
```

##### 3.10.2 分类树响应

```typescript
interface CategoryTreeResponse extends Category {
  children?: CategoryTreeResponse[];
  dramaCount?: number;
}
```

#### 3.11 创作者相关请求响应类型

##### 3.11.1 创作者认证请求

```typescript
interface CreatorVerifyRequest extends BaseRequestParams {
  realName: string;
  idCard: string;
  idCardFront: string;
  idCardBack: string;
  businessLicense?: string;
}
```

##### 3.11.2 创作者信息响应

```typescript
interface CreatorProfileResponse extends Creator {
  user: User;
  dramaCount: number;
  followerCount: number;
  totalEarnings: number;
  recentDramas?: Drama[];
}
```

##### 3.11.3 创作者列表请求

```typescript
interface CreatorListRequest extends PaginationRequestParams, FilterRequestParams {
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  sortBy?: 'totalPlays' | 'totalEarnings' | 'createdAt';
}
```

#### 3.12 AI生成相关请求响应类型

##### 3.12.1 剧本生成请求

```typescript
interface ScriptGenerateRequest extends BaseRequestParams {
  prompt: string;
  style?: string;
  duration?: number;
  characters?: string[];
  setting?: string;
}
```

##### 3.12.2 图片生成请求

```typescript
interface ImageGenerateRequest extends BaseRequestParams {
  prompt: string;
  style?: string;
  size?: '256x256' | '512x512' | '1024x1024';
  count?: number;
}
```

##### 3.12.3 视频生成请求

```typescript
interface VideoGenerateRequest extends BaseRequestParams {
  script: string;
  style?: string;
  duration?: number;
  resolution?: '720p' | '1080p' | '4k';
}
```

##### 3.12.4 AI生成响应

```typescript
interface AiGenerateResponse {
  taskId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: {
    url?: string;
    content?: string;
    thumbnail?: string;
  };
  progress?: number;
  estimatedTime?: number;
}
```

##### 3.12.5 AI生成状态查询请求

```typescript
interface AiGenerateStatusRequest extends BaseRequestParams {
  taskId: string;
}
```

#### 3.13 搜索相关请求响应类型

##### 3.13.1 搜索请求

```typescript
interface SearchRequest extends PaginationRequestParams {
  keyword: string;
  searchType?: 'all' | 'drama' | 'creator' | 'resource';
  filters?: {
    categoryId?: string;
    resourceType?: string;
    dateRange?: {
      startDate?: string;
      endDate?: string;
    };
  };
}
```

##### 3.13.2 搜索响应

```typescript
interface SearchResponse {
  dramas?: Drama[];
  creators?: Creator[];
  resources?: CulturalResource[];
  totalResults: number;
  searchTime: number;
}
```

#### 3.14 统计相关请求响应类型

##### 3.14.1 用户统计数据请求

```typescript
interface UserStatsRequest extends BaseRequestParams {
  startDate?: string;
  endDate?: string;
}
```

##### 3.14.2 用户统计数据响应

```typescript
interface UserStatsResponse {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalEarnings: number;
  dailyStats?: Array<{
    date: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    earnings: number;
  }>;
}
```

##### 3.14.3 创作者统计数据请求

```typescript
interface CreatorStatsRequest extends BaseRequestParams {
  startDate?: string;
  endDate?: string;
  dramaId?: string;
}
```

##### 3.14.4 创作者统计数据响应

```typescript
interface CreatorStatsResponse {
  totalPlays: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalEarnings: number;
  followerCount: number;
  dramaCount: number;
  dramaStats?: Array<{
    dramaId: string;
    title: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    earnings: number;
  }>;
  dailyStats?: Array<{
    date: string;
    plays: number;
    likes: number;
    comments: number;
    shares: number;
    earnings: number;
  }>;
}
```

#### 3.15 系统配置相关请求响应类型

##### 3.15.1 系统配置请求

```typescript
interface SystemConfigRequest extends BaseRequestParams {
  configKeys?: string[];
}
```

##### 3.15.2 系统配置响应

```typescript
interface SystemConfigResponse {
  configs: Record<string, any>;
  version: string;
  updateTime: number;
}
```

### 4. 请求响应类型使用规范

#### 4.1 请求类型规范
- 所有请求必须继承 BaseRequestParams
- 请求参数必须明确指定类型
- 可选参数使用 ? 标记
- 必要参数必须提供

#### 4.2 响应类型规范
- 所有响应必须符合 BaseResponse 结构
- 响应数据必须明确指定类型
- 分页响应必须使用 PaginationResponse
- 错误响应必须使用 ErrorResponse

#### 4.3 类型转换规范
- 前端请求类型与后端DTO类型保持一致
- 前端响应类型与后端BO类型保持一致
- 日期时间统一使用时间戳
- 金额统一使用数字类型

#### 4.4 错误处理规范
- 统一处理错误响应
- 根据错误码显示对应错误信息
- 网络错误统一处理
- 超时错误统一处理

### 5. 请求响应最佳实践

#### 5.1 请求最佳实践
- 使用请求拦截器统一处理请求
- 添加请求标识和追踪
- 设置合理的超时时间
- 实现请求重试机制

#### 5.2 响应最佳实践
- 使用响应拦截器统一处理响应
- 统一处理业务错误
- 缓存常用响应数据
- 实现响应数据转换

#### 5.3 类型安全最佳实践
- 使用TypeScript类型检查
- 避免使用any类型
- 使用类型守卫进行类型检查
- 实现运行时类型校验

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
