---
@file: 041-YYC3-Short-Drama-详细设计-数据模型设计文档.md
@description: YYC3-Short-Drama 业务数据模型的详细定义，包含实体、属性、关系与约束规则
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [详细设计],[数据模型],[业务实体]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 041-YYC3-Short-Drama-详细设计-数据模型设计文档

## 概述

本文档详细描述YYC3-Short-Drama短剧平台的业务数据模型，包含实体、属性、关系与约束规则，为数据库设计和API开发提供清晰的参考依据。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的AI驱动短剧创作与分发平台，致力于通过人工智能技术赋能短剧内容创作，打造智能化的短剧生态体系。平台融合AI剧本生成、智能推荐、VR/AR沉浸式体验、星值经济体系等创新功能，为用户提供从创作到消费的全链路服务。

#### 1.2 文档目标
- 提供完整的业务数据模型定义
- 详细描述实体、属性、关系与约束规则
- 为数据库设计和API开发提供清晰的参考依据
- 确保数据模型符合YYC³标准规范

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保数据模型支持高可用性架构设计
- **高性能**：优化数据结构，提升查询性能
- **高安全性**：保护用户数据和隐私安全，建立多层次安全防护
- **高扩展性**：支持业务快速扩展，适应未来发展需求
- **高可维护性**：便于后续维护和升级，降低运维成本

#### 2.2 五标体系
- **标准化**：统一的数据模型标准和命名规范
- **规范化**：严格的数据约束和验证规则
- **自动化**：支持自动化数据迁移和版本管理
- **智能化**：支持智能数据分析和挖掘
- **可视化**：支持数据可视化和监控

#### 2.3 五化架构
- **流程化**：标准化的数据流程和生命周期管理
- **文档化**：完善的数据模型文档和注释
- **工具化**：使用ORM工具和数据建模工具
- **数字化**：支持数字化数据治理
- **生态化**：支持第三方数据集成

### 3. 数据模型设计

#### 3.1 用户相关数据模型

##### 3.1.1 用户表 (users)

**实体定义**
```typescript
interface User {
  userId: string;           // 用户ID，主键
  phone?: string;           // 手机号，唯一索引
  email?: string;           // 邮箱，唯一索引
  passwordHash: string;     // 密码哈希
  nickname: string;         // 昵称
  avatar?: string;          // 头像URL
  bio?: string;             // 个人简介
  role: UserRole;           // 角色：user/creator/admin/super_admin
  status: UserStatus;       // 状态：inactive/active/frozen/deleted
  starValue: number;        // 星值余额
  starLevel: number;        // 星值等级：1-5
  lastLoginAt?: Date;       // 最后登录时间
  createdAt: Date;          // 创建时间
  updatedAt: Date;          // 更新时间
}

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
```

**数据库表定义**
```sql
CREATE TABLE users (
  user_id VARCHAR(36) PRIMARY KEY,
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  avatar VARCHAR(500),
  bio VARCHAR(500),
  role ENUM('user', 'creator', 'admin', 'super_admin') NOT NULL DEFAULT 'user',
  status ENUM('inactive', 'active', 'frozen', 'deleted') NOT NULL DEFAULT 'inactive',
  star_value INT NOT NULL DEFAULT 0,
  star_level INT NOT NULL DEFAULT 1,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone (phone),
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- userId: 主键，UUID格式
- phone: 手机号格式验证，11位数字，唯一
- email: 邮箱格式验证，唯一
- passwordHash: 必填，使用bcrypt加密
- nickname: 必填，2-20个字符
- avatar: 可选，URL格式
- bio: 可选，最多500个字符
- role: 必填，默认user
- status: 必填，默认inactive
- starValue: 必填，默认0，非负数
- starLevel: 必填，默认1，1-5之间
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新

##### 3.1.2 用户画像表 (user_profiles)

**实体定义**
```typescript
interface UserProfile {
  profileId: string;        // 画像ID，主键
  userId: string;           // 用户ID，外键
  gender?: string;          // 性别：male/female/other
  birthday?: Date;          // 生日
  location?: string;        // 地理位置
  device?: string;          // 设备类型：ios/android/web
  preferences: UserPreferences; // 用户偏好
  behavior: UserBehaviorPatterns; // 行为模式
  features: UserFeatures;   // 特征向量
  createdAt: Date;          // 创建时间
  updatedAt: Date;          // 更新时间
}

interface UserPreferences {
  categories: Map<string, number>; // 分类偏好
  tags: Map<string, number>;        // 标签偏好
  durations: Map<string, number>;   // 时长偏好
  times: Map<string, number>;       // 时间偏好
}

interface UserBehaviorPatterns {
  time: Map<number, number>;       // 时间模式
  frequency: Map<string, number>;   // 频率模式
  duration: Map<string, number>;    // 时长模式
}

interface UserFeatures {
  vector: number[];        // 特征向量
  dimension: number;       // 维度
}
```

**数据库表定义**
```sql
CREATE TABLE user_profiles (
  profile_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  gender ENUM('male', 'female', 'other'),
  birthday DATE,
  location VARCHAR(100),
  device ENUM('ios', 'android', 'web'),
  preferences JSON,
  behavior JSON,
  features JSON,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_gender (gender),
  INDEX idx_device (device)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- profileId: 主键，UUID格式
- userId: 必填，外键关联users表
- gender: 可选，male/female/other
- birthday: 可选，日期格式
- location: 可选，最多100个字符
- device: 可选，ios/android/web
- preferences: 可选，JSON格式
- behavior: 可选，JSON格式
- features: 可选，JSON格式
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新

##### 3.1.3 星值记录表 (star_value_transactions)

**实体定义**
```typescript
interface StarValueTransaction {
  transactionId: string;   // 交易ID，主键
  userId: string;          // 用户ID，外键
  type: TransactionType;   // 交易类型：earn/consume/recharge
  amount: number;         // 金额
  balance: number;        // 交易后余额
  behaviorType?: string;  // 行为类型
  actionType?: string;    // 动作类型
  description?: string;   // 描述
  createdAt: Date;        // 创建时间
}

enum TransactionType {
  EARN = 'earn',
  CONSUME = 'consume',
  RECHARGE = 'recharge'
}
```

**数据库表定义**
```sql
CREATE TABLE star_value_transactions (
  transaction_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  type ENUM('earn', 'consume', 'recharge') NOT NULL,
  amount INT NOT NULL,
  balance INT NOT NULL,
  behavior_type VARCHAR(50),
  action_type VARCHAR(50),
  description VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- transactionId: 主键，UUID格式
- userId: 必填，外键关联users表
- type: 必填，earn/consume/recharge
- amount: 必填，非负数
- balance: 必填，非负数
- behaviorType: 可选，最多50个字符
- actionType: 可选，最多50个字符
- description: 可选，最多500个字符
- createdAt: 必填，自动生成

#### 3.2 内容相关数据模型

##### 3.2.1 短剧表 (dramas)

**实体定义**
```typescript
interface Drama {
  dramaId: string;           // 短剧ID，主键
  creatorId: string;         // 创作者ID，外键
  title: string;             // 标题
  description: string;       // 简介
  coverImage: string;       // 封面图URL
  posterImage: string;      // 海报图URL
  categoryIds: string[];    // 分类ID列表
  tags: string[];            // 标签列表
  totalEpisodes: number;     // 总集数
  publishedEpisodes: number; // 已发布集数
  duration: number;         // 单集时长（秒）
  status: ContentStatus;    // 状态：draft/pending/approved/rejected/published/archived
  viewCount: number;        // 观看次数
  likeCount: number;        // 点赞数
  commentCount: number;     // 评论数
  shareCount: number;       // 分享数
  favoriteCount: number;    // 收藏数
  quality: string;          // 质量：high/medium/low
  createdAt: Date;          // 创建时间
  updatedAt: Date;          // 更新时间
  publishedAt?: Date;       // 发布时间
}

enum ContentStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}
```

**数据库表定义**
```sql
CREATE TABLE dramas (
  drama_id VARCHAR(36) PRIMARY KEY,
  creator_id VARCHAR(36) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  cover_image VARCHAR(500) NOT NULL,
  poster_image VARCHAR(500) NOT NULL,
  category_ids JSON NOT NULL,
  tags JSON NOT NULL,
  total_episodes INT NOT NULL,
  published_episodes INT NOT NULL DEFAULT 0,
  duration INT NOT NULL,
  status ENUM('draft', 'pending', 'approved', 'rejected', 'published', 'archived') NOT NULL DEFAULT 'draft',
  view_count INT NOT NULL DEFAULT 0,
  like_count INT NOT NULL DEFAULT 0,
  comment_count INT NOT NULL DEFAULT 0,
  share_count INT NOT NULL DEFAULT 0,
  favorite_count INT NOT NULL DEFAULT 0,
  quality ENUM('high', 'medium', 'low') NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP NULL,
  FOREIGN KEY (creator_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_creator_id (creator_id),
  INDEX idx_status (status),
  INDEX idx_category_ids (category_ids(255)),
  INDEX idx_tags (tags(255)),
  INDEX idx_quality (quality),
  INDEX idx_created_at (created_at),
  INDEX idx_published_at (published_at),
  FULLTEXT INDEX ft_title (title),
  FULLTEXT INDEX ft_description (description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- dramaId: 主键，UUID格式
- creatorId: 必填，外键关联users表
- title: 必填，2-100个字符
- description: 必填，10-5000个字符
- coverImage: 必填，URL格式
- posterImage: 必填，URL格式
- categoryIds: 必填，JSON数组
- tags: 必填，JSON数组
- totalEpisodes: 必填，1-1000
- publishedEpisodes: 必填，默认0，不超过totalEpisodes
- duration: 必填，30-600秒
- status: 必填，默认draft
- viewCount: 必填，默认0，非负数
- likeCount: 必填，默认0，非负数
- commentCount: 必填，默认0，非负数
- shareCount: 必填，默认0，非负数
- favoriteCount: 必填，默认0，非负数
- quality: 必填，默认medium
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新
- publishedAt: 可选，日期格式

##### 3.2.2 剧集表 (episodes)

**实体定义**
```typescript
interface Episode {
  episodeId: string;       // 剧集ID，主键
  dramaId: string;         // 短剧ID，外键
  episodeNumber: number;   // 集数
  title: string;           // 标题
  description: string;     // 简介
  coverImage: string;     // 封面图URL
  videoUrl: string;        // 视频URL
  duration: number;        // 时长（秒）
  status: ContentStatus;  // 状态：draft/pending/approved/rejected/published/archived
  viewCount: number;       // 观看次数
  likeCount: number;       // 点赞数
  commentCount: number;    // 评论数
  createdAt: Date;        // 创建时间
  updatedAt: Date;        // 更新时间
  publishedAt?: Date;     // 发布时间
}
```

**数据库表定义**
```sql
CREATE TABLE episodes (
  episode_id VARCHAR(36) PRIMARY KEY,
  drama_id VARCHAR(36) NOT NULL,
  episode_number INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  cover_image VARCHAR(500) NOT NULL,
  video_url VARCHAR(500) NOT NULL,
  duration INT NOT NULL,
  status ENUM('draft', 'pending', 'approved', 'rejected', 'published', 'archived') NOT NULL DEFAULT 'draft',
  view_count INT NOT NULL DEFAULT 0,
  like_count INT NOT NULL DEFAULT 0,
  comment_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP NULL,
  FOREIGN KEY (drama_id) REFERENCES dramas(drama_id) ON DELETE CASCADE,
  UNIQUE KEY uk_drama_episode (drama_id, episode_number),
  INDEX idx_drama_id (drama_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_published_at (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- episodeId: 主键，UUID格式
- dramaId: 必填，外键关联dramas表
- episodeNumber: 必填，正整数
- title: 必填，2-100个字符
- description: 可选，最多5000个字符
- coverImage: 必填，URL格式
- videoUrl: 必填，URL格式
- duration: 必填，30-600秒
- status: 必填，默认draft
- viewCount: 必填，默认0，非负数
- likeCount: 必填，默认0，非负数
- commentCount: 必填，默认0，非负数
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新
- publishedAt: 可选，日期格式
- (dramaId, episodeNumber): 唯一索引

##### 3.2.3 剧本表 (scripts)

**实体定义**
```typescript
interface Script {
  scriptId: string;        // 剧本ID，主键
  creatorId: string;        // 创作者ID，外键
  title: string;            // 标题
  type: string;             // 类型
  style: string;           // 风格
  characters: Character[]; // 角色列表
  episodes: ScriptEpisode[]; // 剧集列表
  metadata: ScriptMetadata; // 元数据
  status: ContentStatus;   // 状态：draft/pending/approved/rejected/published/archived
  createdAt: Date;         // 创建时间
  updatedAt: Date;         // 更新时间
}

interface Character {
  name: string;            // 姓名
  age: number;            // 年龄
  gender: string;          // 性别
  personality: string;     // 性格
  background: string;     // 背景
}

interface ScriptEpisode {
  episodeNumber: number;  // 集数
  title: string;           // 标题
  scenes: Scene[];         // 场景列表
}

interface Scene {
  sceneNumber: number;     // 场景编号
  location: string;        // 地点
  time: string;           // 时间
  characters: string[];   // 角色列表
  dialogue: Dialogue[];    // 对话列表
  actions: string[];       // 动作描述
}

interface Dialogue {
  character: string;      // 角色
  line: string;          // 台词
  action?: string;        // 动作
}

interface ScriptMetadata {
  version: string;        // 版本
  status: string;         // 状态
  aiModel: string;        // AI模型
  generatedAt: Date;     // 生成时间
}
```

**数据库表定义**
```sql
CREATE TABLE scripts (
  script_id VARCHAR(36) PRIMARY KEY,
  creator_id VARCHAR(36) NOT NULL,
  title VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  style VARCHAR(50) NOT NULL,
  characters JSON NOT NULL,
  episodes JSON NOT NULL,
  metadata JSON NOT NULL,
  status ENUM('draft', 'pending', 'approved', 'rejected', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_creator_id (creator_id),
  INDEX idx_type (type),
  INDEX idx_style (style),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- scriptId: 主键，UUID格式
- creatorId: 必填，外键关联users表
- title: 必填，2-100个字符
- type: 必填，最多50个字符
- style: 必填，最多50个字符
- characters: 必填，JSON格式
- episodes: 必填，JSON格式
- metadata: 必填，JSON格式
- status: 必填，默认draft
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新

##### 3.2.4 分类表 (categories)

**实体定义**
```typescript
interface Category {
  categoryId: string;      // 分类ID，主键
  name: string;            // 名称
  slug: string;            // URL别名
  description?: string;    // 描述
  icon?: string;           // 图标URL
  parentId?: string;       // 父分类ID
  sortOrder: number;       // 排序
  status: ContentStatus;  // 状态：active/inactive
  createdAt: Date;        // 创建时间
  updatedAt: Date;        // 更新时间
}
```

**数据库表定义**
```sql
CREATE TABLE categories (
  category_id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(500),
  icon VARCHAR(500),
  parent_id VARCHAR(36),
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(category_id) ON DELETE SET NULL,
  INDEX idx_parent_id (parent_id),
  INDEX idx_status (status),
  INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- categoryId: 主键，UUID格式
- name: 必填，2-50个字符
- slug: 必填，URL格式，唯一
- description: 可选，最多500个字符
- icon: 可选，URL格式
- parentId: 可选，外键关联categories表
- sortOrder: 必填，默认0
- status: 必填，默认active
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新

##### 3.2.5 标签表 (tags)

**实体定义**
```typescript
interface Tag {
  tagId: string;          // 标签ID，主键
  name: string;            // 名称
  slug: string;            // URL别名
  description?: string;    // 描述
  color?: string;          // 颜色
  sortOrder: number;       // 排序
  status: ContentStatus;  // 状态：active/inactive
  createdAt: Date;        // 创建时间
  updatedAt: Date;        // 更新时间
}
```

**数据库表定义**
```sql
CREATE TABLE tags (
  tag_id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(500),
  color VARCHAR(20),
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- tagId: 主键，UUID格式
- name: 必填，2-50个字符
- slug: 必填，URL格式，唯一
- description: 可选，最多500个字符
- color: 可选，颜色格式
- sortOrder: 必填，默认0
- status: 必填，默认active
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新

#### 3.3 社交相关数据模型

##### 3.3.1 评论表 (comments)

**实体定义**
```typescript
interface Comment {
  commentId: string;      // 评论ID，主键
  userId: string;         // 用户ID，外键
  dramaId?: string;       // 短剧ID，外键
  episodeId?: string;     // 剧集ID，外键
  parentId?: string;      // 父评论ID
  content: string;        // 内容
  likeCount: number;       // 点赞数
  replyCount: number;      // 回复数
  status: ContentStatus;  // 状态：active/hidden/deleted
  createdAt: Date;        // 创建时间
  updatedAt: Date;        // 更新时间
}
```

**数据库表定义**
```sql
CREATE TABLE comments (
  comment_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  drama_id VARCHAR(36),
  episode_id VARCHAR(36),
  parent_id VARCHAR(36),
  content TEXT NOT NULL,
  like_count INT NOT NULL DEFAULT 0,
  reply_count INT NOT NULL DEFAULT 0,
  status ENUM('active', 'hidden', 'deleted') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (drama_id) REFERENCES dramas(drama_id) ON DELETE CASCADE,
  FOREIGN KEY (episode_id) REFERENCES episodes(episode_id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_drama_id (drama_id),
  INDEX idx_episode_id (episode_id),
  INDEX idx_parent_id (parent_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- commentId: 主键，UUID格式
- userId: 必填，外键关联users表
- dramaId: 可选，外键关联dramas表
- episodeId: 可选，外键关联episodes表
- parentId: 可选，外键关联comments表
- content: 必填，1-1000个字符
- likeCount: 必填，默认0，非负数
- replyCount: 必填，默认0，非负数
- status: 必填，默认active
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新

##### 3.3.2 点赞表 (likes)

**实体定义**
```typescript
interface Like {
  likeId: string;         // 点赞ID，主键
  userId: string;         // 用户ID，外键
  dramaId?: string;       // 短剧ID，外键
  episodeId?: string;     // 剧集ID，外键
  commentId?: string;     // 评论ID，外键
  createdAt: Date;        // 创建时间
}
```

**数据库表定义**
```sql
CREATE TABLE likes (
  like_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  drama_id VARCHAR(36),
  episode_id VARCHAR(36),
  comment_id VARCHAR(36),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (drama_id) REFERENCES dramas(drama_id) ON DELETE CASCADE,
  FOREIGN KEY (episode_id) REFERENCES episodes(episode_id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
  UNIQUE KEY uk_user_drama (user_id, drama_id),
  UNIQUE KEY uk_user_episode (user_id, episode_id),
  UNIQUE KEY uk_user_comment (user_id, comment_id),
  INDEX idx_user_id (user_id),
  INDEX idx_drama_id (drama_id),
  INDEX idx_episode_id (episode_id),
  INDEX idx_comment_id (comment_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- likeId: 主键，UUID格式
- userId: 必填，外键关联users表
- dramaId: 可选，外键关联dramas表
- episodeId: 可选，外键关联episodes表
- commentId: 可选，外键关联comments表
- (userId, dramaId): 唯一索引
- (userId, episodeId): 唯一索引
- (userId, commentId): 唯一索引
- createdAt: 必填，自动生成

##### 3.3.3 收藏表 (favorites)

**实体定义**
```typescript
interface Favorite {
  favoriteId: string;    // 收藏ID，主键
  userId: string;        // 用户ID，外键
  dramaId?: string;      // 短剧ID，外键
  episodeId?: string;    // 剧集ID，外键
  createdAt: Date;       // 创建时间
}
```

**数据库表定义**
```sql
CREATE TABLE favorites (
  favorite_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  drama_id VARCHAR(36),
  episode_id VARCHAR(36),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (drama_id) REFERENCES dramas(drama_id) ON DELETE CASCADE,
  FOREIGN KEY (episode_id) REFERENCES episodes(episode_id) ON DELETE CASCADE,
  UNIQUE KEY uk_user_drama (user_id, drama_id),
  UNIQUE KEY uk_user_episode (user_id, episode_id),
  INDEX idx_user_id (user_id),
  INDEX idx_drama_id (drama_id),
  INDEX idx_episode_id (episode_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- favoriteId: 主键，UUID格式
- userId: 必填，外键关联users表
- dramaId: 可选，外键关联dramas表
- episodeId: 可选，外键关联episodes表
- (userId, dramaId): 唯一索引
- (userId, episodeId): 唯一索引
- createdAt: 必填，自动生成

##### 3.3.4 关注表 (follows)

**实体定义**
```typescript
interface Follow {
  followId: string;      // 关注ID，主键
  followerId: string;     // 关注者ID，外键
  followingId: string;    // 被关注者ID，外键
  createdAt: Date;        // 创建时间
}
```

**数据库表定义**
```sql
CREATE TABLE follows (
  follow_id VARCHAR(36) PRIMARY KEY,
  follower_id VARCHAR(36) NOT NULL,
  following_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (follower_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE KEY uk_follower_following (follower_id, following_id),
  INDEX idx_follower_id (follower_id),
  INDEX idx_following_id (following_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- followId: 主键，UUID格式
- followerId: 必填，外键关联users表
- followingId: 必填，外键关联users表
- (followerId, followingId): 唯一索引
- createdAt: 必填，自动生成

#### 3.4 支付相关数据模型

##### 3.4.1 订单表 (orders)

**实体定义**
```typescript
interface Order {
  orderId: string;         // 订单ID，主键
  userId: string;         // 用户ID，外键
  orderNo: string;        // 订单号，唯一
  type: OrderType;        // 订单类型：membership/gift/recharge
  amount: number;         // 金额
  status: OrderStatus;    // 状态：pending/paid/cancelled/refunded
  paymentMethod?: string; // 支付方式
  paymentId?: string;     // 支付ID
  paidAt?: Date;         // 支付时间
  createdAt: Date;        // 创建时间
  updatedAt: Date;        // 更新时间
}

enum OrderType {
  MEMBERSHIP = 'membership',
  GIFT = 'gift',
  RECHARGE = 'recharge'
}

enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}
```

**数据库表定义**
```sql
CREATE TABLE orders (
  order_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  order_no VARCHAR(50) NOT NULL UNIQUE,
  type ENUM('membership', 'gift', 'recharge') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'paid', 'cancelled', 'refunded') NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_id VARCHAR(100),
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_order_no (order_no),
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- orderId: 主键，UUID格式
- userId: 必填，外键关联users表
- orderNo: 必填，唯一
- type: 必填，membership/gift/recharge
- amount: 必填，正数
- status: 必填，默认pending
- paymentMethod: 可选，最多50个字符
- paymentId: 可选，最多100个字符
- paidAt: 可选，日期格式
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新

##### 3.4.2 会员订阅表 (memberships)

**实体定义**
```typescript
interface Membership {
  membershipId: string;  // 订阅ID，主键
  userId: string;        // 用户ID，外键
  type: MembershipType;  // 类型：monthly/yearly
  status: MembershipStatus; // 状态：active/expired/cancelled
  startDate: Date;       // 开始日期
  endDate: Date;         // 结束日期
  createdAt: Date;       // 创建时间
  updatedAt: Date;       // 更新时间
}

enum MembershipType {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

enum MembershipStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}
```

**数据库表定义**
```sql
CREATE TABLE memberships (
  membership_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  type ENUM('monthly', 'yearly') NOT NULL,
  status ENUM('active', 'expired', 'cancelled') NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_start_date (start_date),
  INDEX idx_end_date (end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- membershipId: 主键，UUID格式
- userId: 必填，外键关联users表
- type: 必填，monthly/yearly
- status: 必填，默认active
- startDate: 必填，日期格式
- endDate: 必填，日期格式，晚于startDate
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新

#### 3.5 系统相关数据模型

##### 3.5.1 消息表 (messages)

**实体定义**
```typescript
interface Message {
  messageId: string;     // 消息ID，主键
  userId: string;        // 用户ID，外键
  type: MessageType;     // 类型：system/interaction/comment
  title: string;        // 标题
  content: string;       // 内容
  isRead: boolean;       // 是否已读
  createdAt: Date;       // 创建时间
}

enum MessageType {
  SYSTEM = 'system',
  INTERACTION = 'interaction',
  COMMENT = 'comment'
}
```

**数据库表定义**
```sql
CREATE TABLE messages (
  message_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  type ENUM('system', 'interaction', 'comment') NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- messageId: 主键，UUID格式
- userId: 必填，外键关联users表
- type: 必填，system/interaction/comment
- title: 必填，最多200个字符
- content: 必填，最多5000个字符
- isRead: 必填，默认false
- createdAt: 必填，自动生成

##### 3.5.2 系统配置表 (system_configs)

**实体定义**
```typescript
interface SystemConfig {
  configId: string;      // 配置ID，主键
  key: string;           // 键，唯一
  value: string;         // 值
  description?: string;  // 描述
  createdAt: Date;       // 创建时间
  updatedAt: Date;       // 更新时间
}
```

**数据库表定义**
```sql
CREATE TABLE system_configs (
  config_id VARCHAR(36) PRIMARY KEY,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_key (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**约束规则**
- configId: 主键，UUID格式
- key: 必填，唯一，最多100个字符
- value: 必填，最多5000个字符
- description: 可选，最多500个字符
- createdAt: 必填，自动生成
- updatedAt: 必填，自动更新

### 4. 数据关系图

```
users (用户表)
  ├── user_profiles (用户画像表) - 1:1
  ├── star_value_transactions (星值记录表) - 1:N
  ├── dramas (短剧表) - 1:N
  ├── scripts (剧本表) - 1:N
  ├── comments (评论表) - 1:N
  ├── likes (点赞表) - 1:N
  ├── favorites (收藏表) - 1:N
  ├── follows (关注表) - 1:N (follower)
  ├── follows (关注表) - 1:N (following)
  ├── orders (订单表) - 1:N
  ├── memberships (会员订阅表) - 1:N
  └── messages (消息表) - 1:N

dramas (短剧表)
  ├── episodes (剧集表) - 1:N
  ├── comments (评论表) - 1:N
  ├── likes (点赞表) - 1:N
  └── favorites (收藏表) - 1:N

episodes (剧集表)
  ├── comments (评论表) - 1:N
  ├── likes (点赞表) - 1:N
  └── favorites (收藏表) - 1:N

comments (评论表)
  └── comments (评论表) - 1:N (自关联)

categories (分类表)
  └── categories (分类表) - 1:N (自关联)
```

### 5. 总结

本文档详细描述了YYC3-Short-Drama短剧平台的业务数据模型，包含用户相关、内容相关、社交相关、支付相关和系统相关的数据模型。通过这些数据模型的实施，可以确保平台的数据结构清晰、关系明确、约束严格，为平台的稳定运行和业务扩展提供坚实的数据基础。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
