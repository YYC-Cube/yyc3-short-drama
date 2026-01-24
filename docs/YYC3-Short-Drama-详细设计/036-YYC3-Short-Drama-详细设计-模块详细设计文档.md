---
@file: 036-YYC3-Short-Drama-详细设计-模块详细设计文档.md
@description: YYC3-Short-Drama 各业务模块的功能、逻辑、接口、数据的详细设计，指导开发落地
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [详细设计],[模块设计],[开发指导]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 036-YYC3-Short-Drama-详细设计-模块详细设计文档

## 概述

本文档详细描述YYC3-Short-Drama短剧平台各业务模块的功能、逻辑、接口和数据设计，为开发团队提供详细的技术实现指导，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景

YYC3-Short-Drama项目是一个基于「五高五标五化」理念的AI驱动短剧创作与分发平台，致力于通过人工智能技术赋能短剧内容创作，打造智能化的短剧生态体系。平台融合AI剧本生成、智能推荐、VR/AR沉浸式体验、星值经济体系等创新功能，为用户提供从创作到消费的全链路服务。

#### 1.2 文档目标

- 详细定义各业务模块的功能边界和交互关系
- 提供清晰的接口设计和数据结构规范
- 指导开发团队进行模块化开发和集成
- 确保系统架构的可扩展性和可维护性

### 2. 设计原则

#### 2.1 五高原则

- **高可用性**：采用微服务架构，实现服务隔离和容错机制，确保系统7x24小时稳定运行
- **高性能**：使用缓存、CDN、异步处理等技术，优化响应时间和处理能力
- **高安全性**：实现JWT认证、RBAC权限控制、数据加密等多层次安全防护
- **高扩展性**：采用插件化架构，支持功能模块的快速扩展和替换
- **高可维护性**：遵循SOLID原则，实现高内聚低耦合的模块设计

#### 2.2 五标体系

- **标准化**：统一使用RESTful API、TypeScript、React等技术栈
- **规范化**：遵循YYC³代码规范，使用ESLint、Prettier等工具保证代码质量
- **自动化**：实现CI/CD自动化流水线，提高开发效率
- **智能化**：集成AI能力，实现智能推荐、剧本生成等功能
- **可视化**：提供监控仪表盘和数据分析界面

#### 2.3 五化架构

- **流程化**：标准化的开发流程和代码审查机制
- **文档化**：完善的API文档和技术文档体系
- **工具化**：使用Docker、Kubernetes等容器化工具
- **数字化**：基于数据驱动的运营决策
- **生态化**：开放的API接口，支持第三方集成

### 3. 模块详细设计

#### 3.1 用户管理模块

##### 3.1.1 模块概述

用户管理模块负责用户的注册、登录、认证、权限管理等核心功能，是整个系统的基础模块。

##### 3.1.2 功能列表

- 用户注册（手机号、邮箱、第三方登录）
- 用户登录（密码、验证码、第三方OAuth）
- 用户信息管理（头像、昵称、简介）
- 认证授权（JWT Token、Refresh Token）
- 权限管理（RBAC角色权限）
- 用户状态管理（激活、冻结、删除）
- 密码管理（修改、重置、强度验证）

##### 3.1.3 核心逻辑

```
用户注册流程：
1. 接收注册请求（手机号/邮箱、密码、验证码）
2. 验证验证码有效性
3. 检查用户是否已存在
4. 密码强度验证
5. 密码加密（bcrypt）
6. 创建用户记录
7. 生成JWT Token
8. 返回用户信息和Token

用户登录流程：
1. 接收登录请求（手机号/邮箱、密码）
2. 查询用户信息
3. 验证密码
4. 检查用户状态
5. 生成JWT Token和Refresh Token
6. 更新最后登录时间
7. 返回用户信息和Token
```

##### 3.1.4 接口设计

**用户注册**

```
POST /api/v1/auth/register
Request:
{
  "phone": "13800138000",
  "email": "user@example.com",
  "password": "Password123!",
  "code": "123456",
  "nickname": "用户昵称"
}
Response:
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "userId": "user_123456",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 7200
  }
}
```

**用户登录**

```
POST /api/v1/auth/login
Request:
{
  "account": "user@example.com",
  "password": "Password123!"
}
Response:
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "userId": "user_123456",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 7200,
    "userInfo": {
      "nickname": "用户昵称",
      "avatar": "https://cdn.example.com/avatar.jpg",
      "role": "user"
    }
  }
}
```

**获取用户信息**

```
GET /api/v1/users/:userId
Headers:
  Authorization: Bearer {token}
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "userId": "user_123456",
    "phone": "13800138000",
    "email": "user@example.com",
    "nickname": "用户昵称",
    "avatar": "https://cdn.example.com/avatar.jpg",
    "bio": "个人简介",
    "role": "user",
    "status": "active",
    "starValue": 1000,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-24T00:00:00Z"
  }
}
```

##### 3.1.5 数据模型

**用户表 (users)**

```typescript
interface User {
  userId: string;           // 用户ID，主键
  phone?: string;           // 手机号
  email?: string;           // 邮箱
  passwordHash: string;     // 密码哈希
  nickname: string;         // 昵称
  avatar?: string;          // 头像URL
  bio?: string;             // 个人简介
  role: UserRole;           // 角色：user/creator/admin/super_admin
  status: UserStatus;       // 状态：inactive/active/frozen/deleted
  starValue: number;        // 星值
  lastLoginAt?: Date;       // 最后登录时间
  createdAt: Date;         // 创建时间
  updatedAt: Date;          // 更新时间
}
```

**用户角色表 (user_roles)**

```typescript
interface UserRole {
  roleId: string;           // 角色ID
  roleName: string;         // 角色名称
  permissions: string[];    // 权限列表
  description?: string;     // 角色描述
  createdAt: Date;
  updatedAt: Date;
}
```

#### 3.2 内容管理模块

##### 3.2.1 模块概述

内容管理模块负责短剧、剧集、场景等内容的管理，包括内容的创建、编辑、审核、发布等功能。

##### 3.2.2 功能列表

- 短剧管理（创建、编辑、删除、查询）
- 剧集管理（添加、排序、状态管理）
- 场景管理（场景描述、角色、台词）
- 内容审核（人工审核、AI审核）
- 内容发布（定时发布、立即发布）
- 内容分类（标签、分类管理）
- 内容搜索（全文搜索、筛选）

##### 3.2.3 核心逻辑

```
内容创建流程：
1. 接收内容创建请求
2. 验证用户权限
3. 内容基础信息校验
4. 创建内容记录（草稿状态）
5. 上传封面、海报等资源
6. 关联标签和分类
7. 提交审核
8. 返回内容ID

内容审核流程：
1. 接收审核请求
2. AI预审核（敏感词、违规内容检测）
3. 人工审核（可选）
4. 审核结果记录
5. 更新内容状态
6. 通知创作者
7. 审核通过后可发布
```

##### 3.2.4 接口设计

**创建短剧**

```
POST /api/v1/dramas
Headers:
  Authorization: Bearer {token}
Request:
{
  "title": "短剧标题",
  "description": "短剧简介",
  "coverImage": "https://cdn.example.com/cover.jpg",
  "posterImage": "https://cdn.example.com/poster.jpg",
  "categoryIds": ["cat_001", "cat_002"],
  "tags": ["爱情", "都市", "职场"],
  "totalEpisodes": 20,
  "duration": 300
}
Response:
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "dramaId": "drama_123456",
    "title": "短剧标题",
    "status": "draft",
    "createdAt": "2026-01-24T00:00:00Z"
  }
}
```

**获取短剧详情**

```
GET /api/v1/dramas/:dramaId
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "dramaId": "drama_123456",
    "title": "短剧标题",
    "description": "短剧简介",
    "coverImage": "https://cdn.example.com/cover.jpg",
    "posterImage": "https://cdn.example.com/poster.jpg",
    "categoryIds": ["cat_001", "cat_002"],
    "categories": [
      {
        "categoryId": "cat_001",
        "categoryName": "都市"
      }
    ],
    "tags": ["爱情", "都市", "职场"],
    "totalEpisodes": 20,
    "publishedEpisodes": 10,
    "duration": 300,
    "status": "published",
    "viewCount": 10000,
    "likeCount": 500,
    "commentCount": 200,
    "creator": {
      "creatorId": "creator_001",
      "nickname": "创作者昵称",
      "avatar": "https://cdn.example.com/avatar.jpg"
    },
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-24T00:00:00Z"
  }
}
```

**获取剧集列表**

```
GET /api/v1/dramas/:dramaId/episodes
Query Parameters:
  - page: 页码（默认1）
  - pageSize: 每页数量（默认20）
  - status: 状态筛选（可选）
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": 20,
    "page": 1,
    "pageSize": 20,
    "episodes": [
      {
        "episodeId": "ep_001",
        "dramaId": "drama_123456",
        "episodeNumber": 1,
        "title": "第一集",
        "description": "剧集简介",
        "duration": 300,
        "status": "published",
        "videoUrl": "https://cdn.example.com/video.mp4",
        "viewCount": 1000,
        "createdAt": "2026-01-01T00:00:00Z"
      }
    ]
  }
}
```

##### 3.2.5 数据模型

**短剧表 (dramas)**

```typescript
interface Drama {
  dramaId: string;           // 短剧ID，主键
  creatorId: string;         // 创作者ID
  title: string;             // 标题
  description: string;       // 简介
  coverImage: string;       // 封面图
  posterImage: string;       // 海报图
  categoryIds: string[];    // 分类ID列表
  tags: string[];            // 标签列表
  totalEpisodes: number;     // 总集数
  publishedEpisodes: number; // 已发布集数
  duration: number;         // 单集时长（秒）
  status: ContentStatus;    // 状态：draft/pending/approved/rejected/published/archived
  viewCount: number;        // 观看次数
  likeCount: number;        // 点赞数
  commentCount: number;     // 评论数
  createdAt: Date;
  updatedAt: Date;
}
```

**剧集表 (episodes)**

```typescript
interface Episode {
  episodeId: string;        // 剧集ID，主键
  dramaId: string;          // 短剧ID
  episodeNumber: number;    // 集数
  title: string;            // 标题
  description: string;      // 简介
  duration: number;        // 时长（秒）
  videoUrl: string;        // 视频URL
  status: ContentStatus;   // 状态
  viewCount: number;       // 观看次数
  createdAt: Date;
  updatedAt: Date;
}
```

**场景表 (scenes)**

```typescript
interface Scene {
  sceneId: string;          // 场景ID，主键
  episodeId: string;       // 剧集ID
  sceneNumber: number;     // 场景序号
  location: string;        // 场景地点
  description: string;     // 场景描述
  characters: string[];    // 角色列表
  lines: SceneLine[];      // 台词列表
  createdAt: Date;
  updatedAt: Date;
}

interface SceneLine {
  characterId: string;     // 角色ID
  characterName: string;   // 角色名称
  content: string;         // 台词内容
  action?: string;         // 动作描述
}
```

#### 3.3 AI剧本生成模块

##### 3.3.1 模块概述

AI剧本生成模块利用大语言模型技术，为创作者提供智能剧本生成、优化、续写等功能，提升创作效率。

##### 3.3.2 功能列表

- 剧本生成（根据主题、角色、情节生成剧本）
- 剧本优化（优化台词、情节、节奏）
- 剧本续写（基于已有内容续写）
- 角色对话生成（生成角色对话）
- 情节建议（提供情节发展建议）
- 风格调整（调整剧本风格）
- 多语言支持（中英文剧本生成）

##### 3.3.3 核心逻辑

```
剧本生成流程：
1. 接收生成请求（主题、角色、风格、长度等）
2. 构建Prompt模板
3. 调用AI模型（GPT-4/Claude-3）
4. 解析生成结果
5. 格式化为剧本结构
6. 保存剧本草稿
7. 返回生成结果

剧本优化流程：
1. 接收优化请求（剧本内容、优化目标）
2. 分析剧本结构
3. 识别优化点（台词、情节、节奏）
4. 调用AI模型进行优化
5. 对比优化前后差异
6. 生成优化建议
7. 返回优化结果
```

##### 3.3.4 接口设计

**生成剧本**

```
POST /api/v1/ai/scripts/generate
Headers:
  Authorization: Bearer {token}
Request:
{
  "theme": "都市爱情",
  "genre": "爱情",
  "style": "轻松",
  "mainCharacters": [
    {
      "name": "男主角",
      "personality": "阳光开朗",
      "background": "职场新人"
    },
    {
      "name": "女主角",
      "personality": "温柔善良",
      "background": "设计师"
    }
  ],
  "plotOutline": "两人在职场相遇，经历误会后相爱",
  "episodeCount": 10,
  "durationPerEpisode": 300
}
Response:
{
  "code": 200,
  "message": "生成成功",
  "data": {
    "scriptId": "script_123456",
    "title": "都市爱情剧本",
    "episodes": [
      {
        "episodeNumber": 1,
        "title": "初遇",
        "scenes": [
          {
            "sceneNumber": 1,
            "location": "办公室",
            "description": "男主角第一天上班",
            "lines": [
              {
                "character": "男主角",
                "content": "大家好，我是新来的小王"
              }
            ]
          }
        ]
      }
    ],
    "createdAt": "2026-01-24T00:00:00Z"
  }
}
```

**优化剧本**

```
POST /api/v1/ai/scripts/optimize
Headers:
  Authorization: Bearer {token}
Request:
{
  "scriptId": "script_123456",
  "optimizeType": "dialogue",
  "target": "使对话更加自然生动"
}
Response:
{
  "code": 200,
  "message": "优化成功",
  "data": {
    "optimizedScript": {
      "scriptId": "script_123456",
      "episodes": [
        {
          "episodeNumber": 1,
          "title": "初遇",
          "scenes": [
            {
              "sceneNumber": 1,
              "location": "办公室",
              "description": "男主角第一天上班",
              "lines": [
                {
                  "character": "男主角",
                  "content": "大家好，我是新来的小王，请多关照！",
                  "originalContent": "大家好，我是新来的小王",
                  "changeReason": "增加礼貌用语，使对话更自然"
                }
              ]
            }
          ]
        }
      ]
    },
    "suggestions": [
      "建议增加更多角色互动细节",
      "可以添加一些职场环境描写"
    ]
  }
}
```

**续写剧本**

```
POST /api/v1/ai/scripts/continue
Headers:
  Authorization: Bearer {token}
Request:
{
  "scriptId": "script_123456",
  "episodeNumber": 1,
  "continueFrom": "scene_005",
  "continueLength": 3
}
Response:
{
  "code": 200,
  "message": "续写成功",
  "data": {
    "continuedScenes": [
      {
        "sceneNumber": 6,
        "location": "咖啡厅",
        "description": "两人第一次正式交谈",
        "lines": [
          {
            "character": "男主角",
            "content": "这里的咖啡不错"
          },
          {
            "character": "女主角",
            "content": "是啊，我经常来"
          }
        ]
      }
    ]
  }
}
```

##### 3.3.5 数据模型

**剧本表 (scripts)**

```typescript
interface Script {
  scriptId: string;         // 剧本ID，主键
  creatorId: string;        // 创作者ID
  title: string;            // 标题
  theme: string;            // 主题
  genre: string;            // 类型
  style: string;            // 风格
  status: ScriptStatus;     // 状态：draft/generated/optimized/completed
  episodeCount: number;     // 集数
  totalScenes: number;      // 总场景数
  aiModel: string;          // 使用的AI模型
  createdAt: Date;
  updatedAt: Date;
}
```

**剧本内容表 (script_contents)**

```typescript
interface ScriptContent {
  contentId: string;        // 内容ID，主键
  scriptId: string;         // 剧本ID
  episodeNumber: number;    // 集数
  sceneNumber: number;      // 场景序号
  location: string;         // 场景地点
  description: string;      // 场景描述
  lines: ScriptLine[];      // 台词列表
  createdAt: Date;
  updatedAt: Date;
}

interface ScriptLine {
  characterId: string;      // 角色ID
  characterName: string;    // 角色名称
  content: string;          // 台词内容
  action?: string;          // 动作描述
  emotion?: string;         // 情绪标记
}
```

#### 3.4 智能推荐模块

##### 3.4.1 模块概述

智能推荐模块基于用户行为、内容特征、知识图谱等多维度数据，为用户提供个性化的短剧推荐服务。

##### 3.4.2 功能列表

- 个性化推荐（基于用户画像推荐）
- 热门推荐（基于热门度推荐）
- 相似推荐（基于内容相似度推荐）
- 协同过滤推荐（基于用户行为推荐）
- 知识图谱推荐（基于知识图谱推荐）
- 实时推荐（基于实时行为推荐）
- 推荐理由展示（展示推荐理由）

##### 3.4.3 核心逻辑

```
推荐流程：
1. 收集用户行为数据（观看、点赞、评论、分享）
2. 构建用户画像（兴趣偏好、观看习惯）
3. 计算内容特征（类型、标签、演员、导演）
4. 构建知识图谱（人物关系、情节关联）
5. 多模型融合推荐（协同过滤、内容推荐、知识图谱）
6. 排序和去重
7. 实时调整推荐结果
8. 返回推荐列表
```

##### 3.4.4 接口设计

**获取推荐列表**

```
GET /api/v1/recommendations
Headers:
  Authorization: Bearer {token}
Query Parameters:
  - type: 推荐类型（personalized/hot/similar）
  - limit: 返回数量（默认20）
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "type": "personalized",
    "recommendations": [
      {
        "dramaId": "drama_001",
        "title": "推荐短剧1",
        "coverImage": "https://cdn.example.com/cover.jpg",
        "matchScore": 0.95,
        "reason": "基于您的观看历史推荐",
        "tags": ["爱情", "都市"]
      }
    ]
  }
}
```

**获取相似短剧**

```
GET /api/v1/dramas/:dramaId/similar
Query Parameters:
  - limit: 返回数量（默认10）
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "dramaId": "drama_001",
    "similarDramas": [
      {
        "dramaId": "drama_002",
        "title": "相似短剧1",
        "coverImage": "https://cdn.example.com/cover.jpg",
        "similarity": 0.85,
        "commonTags": ["爱情", "都市"]
      }
    ]
  }
}
```

##### 3.4.5 数据模型

**用户画像表 (user_profiles)**

```typescript
interface UserProfile {
  profileId: string;        // 画像ID，主键
  userId: string;          // 用户ID
  preferences: {
    genres: string[];       // 偏好类型
    tags: string[];         // 偏好标签
    actors: string[];       // 偏好演员
    directors: string[];    // 偏好导演
  };
  behaviors: {
    watchTime: number;      // 观看时长
    likeCount: number;      // 点赞次数
    commentCount: number;   // 评论次数
    shareCount: number;     // 分享次数
  };
  lastUpdated: Date;       // 最后更新时间
}
```

**推荐记录表 (recommendation_logs)**

```typescript
interface RecommendationLog {
  logId: string;           // 记录ID，主键
  userId: string;          // 用户ID
  dramaId: string;         // 短剧ID
  recommendationType: string; // 推荐类型
  matchScore: number;      // 匹配分数
  reason: string;          // 推荐理由
  clicked: boolean;        // 是否点击
  watched: boolean;        // 是否观看
  createdAt: Date;
}
```

#### 3.5 VR/AR沉浸式体验模块

##### 3.5.1 模块概述

VR/AR沉浸式体验模块为用户提供虚拟现实和增强现实的短剧观看体验，提升用户的沉浸感和互动性。

##### 3.5.2 功能列表

- VR模式切换（切换到VR观看模式）
- AR场景叠加（在现实场景中叠加短剧内容）
- 360度全景视频（支持360度全景视频播放）
- 交互式剧情（用户选择剧情走向）
- 角色互动（与虚拟角色互动）
- 场景漫游（在虚拟场景中漫游）
- 手势识别（通过手势控制播放）

##### 3.5.3 核心逻辑

```
VR模式切换流程：
1. 检测设备VR支持
2. 初始化VR环境
3. 加载360度全景视频
4. 设置VR视角控制
5. 启用VR渲染
6. 进入VR模式

AR场景叠加流程：
1. 启动摄像头
2. 识别现实场景
3. 加载AR内容
4. 叠加虚拟元素
5. 实时追踪
6. 渲染AR场景
```

##### 3.5.4 接口设计

**获取VR内容**

```
GET /api/v1/vr/dramas/:dramaId
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "dramaId": "drama_001",
    "title": "VR短剧",
    "vrContent": {
      "videoUrl": "https://cdn.example.com/360_video.mp4",
      "hotspots": [
        {
          "id": "hotspot_001",
          "position": { "x": 0, "y": 0, "z": 0 },
          "title": "互动点1",
          "action": "show_dialogue"
        }
      ]
    }
  }
}
```

**获取AR场景**

```
GET /api/v1/ar/scenes/:sceneId
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "sceneId": "scene_001",
    "arContent": {
      "modelUrl": "https://cdn.example.com/model.glb",
      "position": { "x": 0, "y": 0, "z": -1 },
      "scale": 1.0,
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "animations": [
        {
          "name": "idle",
          "url": "https://cdn.example.com/idle.anim"
        }
      ]
    }
  }
}
```

##### 3.5.5 数据模型

**VR内容表 (vr_contents)**

```typescript
interface VRContent {
  contentId: string;       // 内容ID，主键
  dramaId: string;         // 短剧ID
  episodeId: string;       // 剧集ID
  videoUrl: string;        // 360度视频URL
  hotspots: VRHotspot[];   // 互动热点
  createdAt: Date;
  updatedAt: Date;
}

interface VRHotspot {
  id: string;              // 热点ID
  position: {              // 位置坐标
    x: number;
    y: number;
    z: number;
  };
  title: string;           // 标题
  description?: string;    // 描述
  action: string;          // 触发动作
}
```

**AR场景表 (ar_scenes)**

```typescript
interface ARScene {
  sceneId: string;         // 场景ID，主键
  dramaId: string;         // 短剧ID
  modelUrl: string;        // 3D模型URL
  position: {               // 位置
    x: number;
    y: number;
    z: number;
  };
  scale: number;           // 缩放比例
  rotation: {               // 旋转角度
    x: number;
    y: number;
    z: number;
  };
  animations: ARAnimation[]; // 动画列表
  createdAt: Date;
  updatedAt: Date;
}

interface ARAnimation {
  name: string;            // 动画名称
  url: string;             // 动画URL
  duration: number;        // 动画时长
}
```

#### 3.6 星值经济体系模块

##### 3.6.1 模块概述

星值经济体系模块为用户提供星值获取、消费、交易等功能，构建完整的虚拟经济体系。

##### 3.6.2 功能列表

- 星值获取（观看、分享、创作等行为获取星值）
- 星值消费（解锁剧集、打赏创作者等）
- 星值交易（用户间星值交易）
- 星值兑换（兑换实物奖励）
- 星值记录（星值收支记录）
- 星值等级（星值等级系统）
- 星值活动（星值活动奖励）

##### 3.6.3 核心逻辑

```
星值获取流程：
1. 用户完成特定行为（观看、分享、创作）
2. 验证行为有效性
3. 计算星值奖励
4. 更新用户星值余额
5. 记录星值获取记录
6. 更新星值等级
7. 返回星值变化

星值消费流程：
1. 用户发起消费请求
2. 验证用户星值余额
3. 扣除相应星值
4. 记录星值消费记录
5. 更新相关服务状态
6. 返回消费结果
```

##### 3.6.4 接口设计

**获取星值余额**

```
GET /api/v1/star-value/balance
Headers:
  Authorization: Bearer {token}
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "userId": "user_123456",
    "balance": 1000,
    "level": 3,
    "levelName": "三星用户",
    "nextLevel": {
      "level": 4,
      "levelName": "四星用户",
      "requiredStarValue": 2000
    }
  }
}
```

**星值消费**

```
POST /api/v1/star-value/consume
Headers:
  Authorization: Bearer {token}
Request:
{
  "type": "unlock_episode",
  "targetId": "ep_001",
  "amount": 100
}
Response:
{
  "code": 200,
  "message": "消费成功",
  "data": {
    "transactionId": "tx_123456",
    "userId": "user_123456",
    "amount": 100,
    "balance": 900,
    "type": "unlock_episode",
    "createdAt": "2026-01-24T00:00:00Z"
  }
}
```

**获取星值记录**

```
GET /api/v1/star-value/records
Headers:
  Authorization: Bearer {token}
Query Parameters:
  - type: 记录类型（earn/consume）
  - page: 页码（默认1）
  - pageSize: 每页数量（默认20）
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": 100,
    "page": 1,
    "pageSize": 20,
    "records": [
      {
        "recordId": "record_001",
        "type": "earn",
        "amount": 10,
        "reason": "观看短剧",
        "balance": 1000,
        "createdAt": "2026-01-24T00:00:00Z"
      }
    ]
  }
}
```

##### 3.6.5 数据模型

**星值账户表 (star_value_accounts)**

```typescript
interface StarValueAccount {
  accountId: string;       // 账户ID，主键
  userId: string;         // 用户ID
  balance: number;        // 星值余额
  level: number;          // 星值等级
  totalEarned: number;    // 累计获取
  totalConsumed: number;  // 累计消费
  createdAt: Date;
  updatedAt: Date;
}
```

**星值记录表 (star_value_records)**

```typescript
interface StarValueRecord {
  recordId: string;       // 记录ID，主键
  userId: string;         // 用户ID
  type: StarValueType;    // 类型：earn/consume/transfer
  amount: number;         // 金额
  reason: string;         // 原因
  balance: number;        // 交易后余额
  relatedId?: string;     // 关联ID（剧集ID、交易ID等）
  createdAt: Date;
}
```

**星值等级表 (star_value_levels)**

```typescript
interface StarValueLevel {
  level: number;          // 等级
  levelName: string;      // 等级名称
  requiredStarValue: number; // 所需星值
  benefits: string[];     // 等级权益
  createdAt: Date;
  updatedAt: Date;
}
```

#### 3.7 社交互动模块

##### 3.7.1 模块概述

社交互动模块为用户提供评论、点赞、分享、关注等社交功能，构建活跃的用户社区。

##### 3.7.2 功能列表

- 评论功能（发表评论、回复评论）
- 点赞功能（点赞短剧、点赞评论）
- 分享功能（分享到社交平台）
- 关注功能（关注创作者、关注用户）
- 私信功能（发送私信）
- 动态功能（发布动态、查看动态）
- 举报功能（举报违规内容）

##### 3.7.3 核心逻辑

```
评论功能流程：
1. 用户发表评论
2. 内容审核（敏感词检测）
3. 保存评论记录
4. 更新短剧评论数
5. 通知相关用户
6. 返回评论信息

点赞功能流程：
1. 用户点赞内容
2. 检查是否已点赞
3. 更新点赞状态
4. 更新内容点赞数
5. 通知内容创作者
6. 返回点赞结果
```

##### 3.7.4 接口设计

**发表评论**

```
POST /api/v1/comments
Headers:
  Authorization: Bearer {token}
Request:
{
  "targetType": "drama",
  "targetId": "drama_001",
  "content": "这部短剧很好看！",
  "parentId": null
}
Response:
{
  "code": 200,
  "message": "评论成功",
  "data": {
    "commentId": "comment_123456",
    "userId": "user_123456",
    "targetType": "drama",
    "targetId": "drama_001",
    "content": "这部短剧很好看！",
    "likeCount": 0,
    "replyCount": 0,
    "createdAt": "2026-01-24T00:00:00Z"
  }
}
```

**点赞内容**

```
POST /api/v1/likes
Headers:
  Authorization: Bearer {token}
Request:
{
  "targetType": "drama",
  "targetId": "drama_001"
}
Response:
{
  "code": 200,
  "message": "点赞成功",
  "data": {
    "likeId": "like_123456",
    "userId": "user_123456",
    "targetType": "drama",
    "targetId": "drama_001",
    "isLiked": true,
    "totalLikes": 501,
    "createdAt": "2026-01-24T00:00:00Z"
  }
}
```

**关注用户**

```
POST /api/v1/follows
Headers:
  Authorization: Bearer {token}
Request:
{
  "targetUserId": "user_789012"
}
Response:
{
  "code": 200,
  "message": "关注成功",
  "data": {
    "followId": "follow_123456",
    "followerId": "user_123456",
    "followingId": "user_789012",
    "isFollowing": true,
    "createdAt": "2026-01-24T00:00:00Z"
  }
}
```

##### 3.7.5 数据模型

**评论表 (comments)**

```typescript
interface Comment {
  commentId: string;      // 评论ID，主键
  userId: string;         // 用户ID
  targetType: string;     // 目标类型（drama/episode/comment）
  targetId: string;       // 目标ID
  content: string;        // 评论内容
  parentId?: string;      // 父评论ID（回复时使用）
  likeCount: number;      // 点赞数
  replyCount: number;     // 回复数
  status: CommentStatus;  // 状态：normal/hidden/deleted
  createdAt: Date;
  updatedAt: Date;
}
```

**点赞表 (likes)**

```typescript
interface Like {
  likeId: string;         // 点赞ID，主键
  userId: string;         // 用户ID
  targetType: string;     // 目标类型（drama/episode/comment）
  targetId: string;       // 目标ID
  createdAt: Date;
}
```

**关注表 (follows)**

```typescript
interface Follow {
  followId: string;       // 关注ID，主键
  followerId: string;     // 关注者ID
  followingId: string;    // 被关注者ID
  createdAt: Date;
}
```

#### 3.8 支付订阅模块

##### 3.8.1 模块概述

支付订阅模块为用户提供付费解锁、会员订阅、打赏创作者等支付功能。

##### 3.8.2 功能列表

- 付费解锁（解锁剧集、解锁短剧）
- 会员订阅（月度会员、年度会员）
- 打赏功能（打赏创作者）
- 订单管理（订单查询、订单退款）
- 支付方式（微信支付、支付宝、星值支付）
- 发票管理（申请发票、查看发票）

##### 3.8.3 核心逻辑

```
付费解锁流程：
1. 用户选择要解锁的内容
2. 计算解锁费用
3. 创建订单
4. 调用支付接口
5. 支付成功回调
6. 更新订单状态
7. 解锁内容
8. 通知用户
9. 返回解锁结果

会员订阅流程：
1. 用户选择会员套餐
2. 创建订阅订单
3. 调用支付接口
4. 支付成功回调
5. 更新会员状态
6. 开通会员权益
7. 通知用户
8. 返回订阅结果
```

##### 3.8.4 接口设计

**创建订单**

```
POST /api/v1/orders
Headers:
  Authorization: Bearer {token}
Request:
{
  "type": "unlock_episode",
  "targetId": "ep_001",
  "paymentMethod": "wechat"
}
Response:
{
  "code": 200,
  "message": "订单创建成功",
  "data": {
    "orderId": "order_123456",
    "userId": "user_123456",
    "type": "unlock_episode",
    "targetId": "ep_001",
    "amount": 100,
    "paymentMethod": "wechat",
    "status": "pending",
    "paymentUrl": "weixin://wxpay/bizpayurl?pr=xxx",
    "expiresAt": "2026-01-24T00:30:00Z",
    "createdAt": "2026-01-24T00:00:00Z"
  }
}
```

**支付回调**

```
POST /api/v1/payments/callback
Request:
{
  "orderId": "order_123456",
  "transactionId": "wx_1234567890",
  "status": "success",
  "paidAt": "2026-01-24T00:05:00Z"
}
Response:
{
  "code": 200,
  "message": "支付成功",
  "data": {
    "orderId": "order_123456",
    "status": "paid",
    "paidAt": "2026-01-24T00:05:00Z"
  }
}
```

**打赏创作者**

```
POST /api/v1/tips
Headers:
  Authorization: Bearer {token}
Request:
{
  "creatorId": "creator_001",
  "dramaId": "drama_001",
  "amount": 500,
  "message": "作品很棒！",
  "paymentMethod": "star_value"
}
Response:
{
  "code": 200,
  "message": "打赏成功",
  "data": {
    "tipId": "tip_123456",
    "userId": "user_123456",
    "creatorId": "creator_001",
    "dramaId": "drama_001",
    "amount": 500,
    "message": "作品很棒！",
    "createdAt": "2026-01-24T00:00:00Z"
  }
}
```

##### 3.8.5 数据模型

**订单表 (orders)**

```typescript
interface Order {
  orderId: string;         // 订单ID，主键
  userId: string;          // 用户ID
  type: OrderType;         // 订单类型：unlock_episode/unlock_drama/subscription/tip
  targetId: string;        // 目标ID
  amount: number;          // 金额（分）
  paymentMethod: string;   // 支付方式：wechat/alipay/star_value
  status: OrderStatus;     // 订单状态：pending/paid/failed/refunded
  transactionId?: string;  // 第三方交易ID
  paidAt?: Date;           // 支付时间
  expiresAt?: Date;        // 过期时间
  createdAt: Date;
  updatedAt: Date;
}
```

**会员表 (memberships)**

```typescript
interface Membership {
  membershipId: string;    // 会员ID，主键
  userId: string;         // 用户ID
  plan: MembershipPlan;   // 会员计划：monthly/yearly
  startDate: Date;         // 开始日期
  endDate: Date;          // 结束日期
  status: MembershipStatus; // 状态：active/expired/cancelled
  autoRenew: boolean;     // 自动续费
  createdAt: Date;
  updatedAt: Date;
}
```

**打赏记录表 (tips)**

```typescript
interface Tip {
  tipId: string;           // 打赏ID，主键
  userId: string;          // 打赏用户ID
  creatorId: string;       // 创作者ID
  dramaId: string;         // 短剧ID
  amount: number;          // 打赏金额
  message?: string;        // 打赏留言
  createdAt: Date;
}
```

#### 3.9 数据分析模块

##### 3.9.1 模块概述

数据分析模块为运营团队提供用户行为分析、内容效果分析、业务指标分析等功能，支持数据驱动的决策。

##### 3.9.2 功能列表

- 用户分析（用户增长、用户活跃、用户留存）
- 内容分析（内容热度、内容转化、内容反馈）
- 收入分析（收入趋势、收入构成、收入预测）
- 行为分析（观看行为、互动行为、付费行为）
- 漏斗分析（转化漏斗、留存漏斗）
- 实时监控（实时数据、实时告警）
- 报表导出（数据报表、趋势报表）

##### 3.9.3 核心逻辑

```
数据分析流程：
1. 收集用户行为数据
2. 数据清洗和预处理
3. 数据聚合和计算
4. 生成分析指标
5. 可视化展示
6. 异常检测和告警
7. 生成分析报告
```

##### 3.9.4 接口设计

**获取用户分析数据**

```
GET /api/v1/analytics/users
Query Parameters:
  - startDate: 开始日期
  - endDate: 结束日期
  - metrics: 指标列表（new_users/active_users/retention_rate）
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "period": {
      "startDate": "2026-01-01",
      "endDate": "2026-01-24"
    },
    "metrics": {
      "newUsers": 1000,
      "activeUsers": 5000,
      "retentionRate": 0.65
    },
    "trends": [
      {
        "date": "2026-01-01",
        "newUsers": 50,
        "activeUsers": 200
      }
    ]
  }
}
```

**获取内容分析数据**

```
GET /api/v1/analytics/content
Query Parameters:
  - startDate: 开始日期
  - endDate: 结束日期
  - dramaId: 短剧ID（可选）
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "period": {
      "startDate": "2026-01-01",
      "endDate": "2026-01-24"
    },
    "totalViews": 100000,
    "totalLikes": 5000,
    "totalComments": 1000,
    "topDramas": [
      {
        "dramaId": "drama_001",
        "title": "热门短剧1",
        "views": 10000,
        "likes": 500,
        "comments": 100
      }
    ]
  }
}
```

##### 3.9.5 数据模型

**分析指标表 (analytics_metrics)**

```typescript
interface AnalyticsMetric {
  metricId: string;       // 指标ID，主键
  metricName: string;     // 指标名称
  metricType: string;     // 指标类型：user/content/revenue
  value: number;          // 指标值
  date: Date;             // 日期
  dimensions: {            // 维度信息
    [key: string]: any;
  };
  createdAt: Date;
}
```

**用户行为日志表 (user_behavior_logs)**

```typescript
interface UserBehaviorLog {
  logId: string;          // 日志ID，主键
  userId: string;         // 用户ID
  eventType: string;      // 事件类型：view/like/comment/share
  targetType: string;     // 目标类型
  targetId: string;       // 目标ID
  metadata: {             // 元数据
    [key: string]: any;
  };
  timestamp: Date;        // 时间戳
}
```

#### 3.10 系统管理模块

##### 3.10.1 模块概述

系统管理模块为管理员提供用户管理、内容管理、系统配置、权限管理等功能。

##### 3.10.2 功能列表

- 用户管理（用户查询、用户禁用、用户删除）
- 内容管理（内容审核、内容下架、内容推荐）
- 系统配置（系统参数、功能开关）
- 权限管理（角色管理、权限分配）
- 日志管理（操作日志、系统日志）
- 数据备份（数据备份、数据恢复）
- 系统监控（系统状态、性能监控）

##### 3.10.3 核心逻辑

```
内容审核流程：
1. 管理员查看待审核内容
2. 审核内容（人工审核或AI辅助）
3. 审核结果记录
4. 更新内容状态
5. 通知创作者
6. 审核通过后可发布

用户管理流程：
1. 管理员查询用户列表
2. 查看用户详情
3. 执行管理操作（禁用/删除）
4. 记录操作日志
5. 通知用户
```

##### 3.10.4 接口设计

**获取待审核内容**

```
GET /api/v1/admin/content/pending
Headers:
  Authorization: Bearer {admin_token}
Query Parameters:
  - page: 页码（默认1）
  - pageSize: 每页数量（默认20）
Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": 100,
    "page": 1,
    "pageSize": 20,
    "items": [
      {
        "dramaId": "drama_001",
        "title": "待审核短剧",
        "creator": {
          "creatorId": "creator_001",
          "nickname": "创作者昵称"
        },
        "submittedAt": "2026-01-24T00:00:00Z"
      }
    ]
  }
}
```

**审核内容**

```
POST /api/v1/admin/content/review
Headers:
  Authorization: Bearer {admin_token}
Request:
{
  "dramaId": "drama_001",
  "status": "approved",
  "comment": "内容符合规范"
}
Response:
{
  "code": 200,
  "message": "审核成功",
  "data": {
    "dramaId": "drama_001",
    "status": "approved",
    "reviewedAt": "2026-01-24T00:00:00Z"
  }
}
```

##### 3.10.5 数据模型

**审核记录表 (review_records)**

```typescript
interface ReviewRecord {
  recordId: string;       // 记录ID，主键
  reviewerId: string;     // 审核人ID
  targetType: string;     // 目标类型
  targetId: string;       // 目标ID
  status: string;          // 审核结果：approved/rejected
  comment?: string;       // 审核意见
  createdAt: Date;
}
```

**操作日志表 (operation_logs)**

```typescript
interface OperationLog {
  logId: string;          // 日志ID，主键
  operatorId: string;     // 操作人ID
  operation: string;      // 操作类型
  target?: string;        // 操作目标
  details: {              // 操作详情
    [key: string]: any;
  };
  ip: string;             // IP地址
  userAgent: string;      // 用户代理
  createdAt: Date;
}
```

### 4. 模块间交互关系

#### 4.1 交互关系图

```
用户管理模块
    ↓
内容管理模块 ←→ AI剧本生成模块
    ↓
智能推荐模块
    ↓
VR/AR沉浸式体验模块
    ↓
星值经济体系模块 ←→ 支付订阅模块
    ↓
社交互动模块
    ↓
数据分析模块
    ↓
系统管理模块
```

#### 4.2 数据流向

```
用户行为数据 → 数据分析模块 → 智能推荐模块
内容创作数据 → AI剧本生成模块 → 内容管理模块
用户互动数据 → 社交互动模块 → 星值经济体系模块
支付数据 → 支付订阅模块 → 星值经济体系模块
```

### 5. 技术实现要点

#### 5.1 性能优化

- 使用Redis缓存热点数据
- 使用CDN加速静态资源
- 使用消息队列异步处理
- 数据库读写分离
- 使用Elasticsearch优化搜索

#### 5.2 安全防护

- JWT认证和授权
- RBAC权限控制
- 数据加密存储
- API限流和防刷
- SQL注入防护
- XSS防护

#### 5.3 可扩展性

- 微服务架构
- 插件化设计
- 配置化管理
- API版本控制
- 数据库分库分表

### 6. 总结

本文档详细描述了YYC3-Short-Drama短剧平台各业务模块的功能、逻辑、接口和数据设计，为开发团队提供了详细的技术实现指导。各模块遵循「五高五标五化」的设计原则，确保系统的高可用性、高性能、高安全性、高扩展性和高可维护性。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
