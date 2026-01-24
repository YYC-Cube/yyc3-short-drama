---
@file: 086-YYC3-Short-Drama-类型定义-业务模块-文化内容类型文档.md
@description: YYC3-Short-Drama 河洛文化内容、展示、交互的类型定义与数据规则的完整规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[业务模块],[文化内容]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 086-YYC3-Short-Drama-类型定义-业务模块-文化内容类型文档

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-业务模块-文化内容类型文档相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范业务模块-文化内容类型文档相关的业务标准与技术落地要求
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

### 3. 文化内容类型定义

#### 3.1 内容形式类型枚举

```typescript
enum CulturalContentForm {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  INTERACTIVE = 'interactive',
  IMMERSIVE = 'immersive',
  MIXED = 'mixed'
}
```

#### 3.2 内容形式类型说明

| 类型代码 | 类型名称 | 类型描述 | 适用场景 | 示例 |
|---------|---------|---------|---------|------|
| text | 文本内容 | 纯文本或富文本内容 | 历史介绍、文化解读 | 历史人物传记、文化背景介绍 |
| image | 图像内容 | 静态图像内容 | 文物图片、艺术作品 | 唐三彩图片、龙门石窟照片 |
| video | 视频内容 | 动态视频内容 | 纪录片、教学视频 | 河洛文化纪录片、工艺制作视频 |
| audio | 音频内容 | 纯音频内容 | 讲解、音乐、戏曲 | 河洛大鼓音频、豫剧唱段 |
| interactive | 交互内容 | 可交互的内容形式 | 问答、测验、游戏 | 文化知识问答、历史事件排序 |
| immersive | 沉浸式内容 | VR/AR沉浸式体验 | 虚拟游览、增强现实 | 龙门石窟VR游览、文物AR展示 |
| mixed | 混合内容 | 多种形式组合的内容 | 综合展示、多媒体 | 图文音视频结合的文化展示 |

### 4. 文化内容展示类型定义

#### 4.1 展示类型枚举

```typescript
enum CulturalContentDisplayType {
  LIST = 'list',
  GRID = 'grid',
  CAROUSEL = 'carousel',
  TIMELINE = 'timeline',
  MAP = 'map',
  TREE = 'tree',
  GALLERY = 'gallery',
  STORY = 'story'
}
```

#### 4.2 展示类型说明

| 展示代码 | 展示名称 | 展示描述 | 适用内容 | 交互方式 |
|---------|---------|---------|---------|---------|
| list | 列表展示 | 垂直或水平列表形式 | 文化资源列表、历史事件列表 | 点击展开、滚动浏览 |
| grid | 网格展示 | 多列网格布局形式 | 图片集合、文物展示 | 点击查看详情、筛选排序 |
| carousel | 轮播展示 | 自动或手动轮播形式 | 精选内容、推荐内容 | 左右切换、自动播放 |
| timeline | 时间轴展示 | 按时间顺序展示 | 历史事件、朝代更替 | 点击节点查看详情 |
| map | 地图展示 | 在地图上标注展示 | 历史遗迹、文化遗址 | 点击标记查看信息 |
| tree | 树形展示 | 层级树形结构展示 | 文化分类、知识体系 | 展开折叠节点 |
| gallery | 画廊展示 | 大图画廊形式展示 | 艺术作品、文物图片 | 点击放大、左右切换 |
| story | 故事展示 | 故事化叙述形式展示 | 文化传说、历史故事 | 翻页浏览、互动选择 |

### 5. 文化内容交互类型定义

#### 5.1 交互类型枚举

```typescript
enum CulturalContentInteractionType {
  VIEW = 'view',
  LIKE = 'like',
  COMMENT = 'comment',
  FAVORITE = 'favorite',
  SHARE = 'share',
  DOWNLOAD = 'download',
  QUIZ = 'quiz',
  SURVEY = 'survey',
  FEEDBACK = 'feedback',
  CUSTOMIZE = 'customize'
}
```

#### 5.2 交互类型说明

| 交互代码 | 交互名称 | 交互描述 | 权限要求 | 数据记录 |
|---------|---------|---------|---------|---------|
| view | 浏览 | 查看文化内容详情 | 所有用户 | 浏览次数、浏览时长 |
| like | 点赞 | 对文化内容表示喜欢 | 所有用户 | 点赞数、点赞用户 |
| comment | 评论 | 对文化内容发表评论 | 所有用户 | 评论数、评论内容 |
| favorite | 收藏 | 将文化内容加入收藏夹 | 所有用户 | 收藏数、收藏用户 |
| share | 分享 | 分享文化内容到外部平台 | 所有用户 | 分享数、分享平台 |
| download | 下载 | 下载文化内容资源 | 已登录用户 | 下载次数、下载用户 |
| quiz | 问答 | 参与文化知识问答 | 所有用户 | 答题记录、正确率 |
| survey | 调查 | 参与文化内容调查 | 所有用户 | 调查结果、用户反馈 |
| feedback | 反馈 | 对文化内容提供反馈 | 所有用户 | 反馈内容、反馈评分 |
| customize | 个性化 | 个性化推荐或定制内容 | 已登录用户 | 用户偏好、定制记录 |

### 6. 文化内容状态定义

#### 6.1 内容状态枚举

```typescript
enum CulturalContentStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  REVIEWING = 'reviewing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PUBLISHED = 'published',
  FEATURED = 'featured',
  ARCHIVED = 'archived',
  DELETED = 'deleted'
}
```

#### 6.2 内容状态说明

| 状态代码 | 状态名称 | 状态描述 | 可执行操作 | 展示状态 |
|---------|---------|---------|-----------|---------|
| draft | 草稿 | 内容创建中，未提交审核 | 编辑、删除、提交审核 | 不展示 |
| pending_review | 待审核 | 内容已提交，等待审核 | 查看详情、撤回审核 | 不展示 |
| reviewing | 审核中 | 内容正在审核 | 查看详情 | 不展示 |
| approved | 已通过 | 内容审核通过，等待发布 | 发布、编辑后重新提交 | 不展示 |
| rejected | 已拒绝 | 内容审核未通过 | 查看原因、修改后重新提交 | 不展示 |
| published | 已发布 | 内容已发布，用户可见 | 浏览、点赞、评论、收藏 | 正常展示 |
| featured | 精选 | 内容被标记为精选 | 浏览、点赞、评论、收藏 | 优先展示 |
| archived | 已归档 | 内容已归档，不再显示 | 查看历史、恢复归档 | 不展示 |
| deleted | 已删除 | 内容已删除，不可恢复 | 无 | 不展示 |

### 7. 文化内容分类定义

#### 7.1 内容分类枚举

```typescript
enum CulturalContentCategory {
  KNOWLEDGE = 'knowledge',
  STORY = 'story',
  EXHIBITION = 'exhibition',
  COURSE = 'course',
  ACTIVITY = 'activity',
  NEWS = 'news',
  RESEARCH = 'research',
  RESOURCE = 'resource'
}
```

#### 7.2 内容分类说明

| 分类代码 | 分类名称 | 分类描述 | 内容示例 | 更新频率 |
|---------|---------|---------|---------|---------|
| knowledge | 知识科普 | 文化知识普及内容 | 历史知识、文化解读 | 定期更新 |
| story | 故事传说 | 文化故事和传说内容 | 神话传说、历史故事 | 定期更新 |
| exhibition | 展览展示 | 文化展览和展示内容 | 文物展览、艺术展览 | 不定期 |
| course | 课程教学 | 文化教育课程内容 | 文化课程、教学视频 | 定期更新 |
| activity | 活动资讯 | 文化活动信息 | 文化节庆、文化活动 | 实时更新 |
| news | 新闻资讯 | 文化新闻和资讯 | 文化新闻、考古发现 | 实时更新 |
| research | 研究成果 | 文化研究成果 | 学术论文、研究报告 | 不定期 |
| resource | 资源下载 | 文化资源下载内容 | 文档下载、图片下载 | 定期更新 |

### 8. 文化内容元数据定义

#### 8.1 元数据结构

```typescript
interface CulturalContentMetadata {
  contentId: string;
  contentForm: CulturalContentForm;
  displayType: CulturalContentDisplayType;
  category: CulturalContentCategory;
  title: string;
  subtitle?: string;
  description: string;
  keywords: string[];
  tags: string[];
  coverImage: string;
  thumbnailImage?: string;
  contentData: ContentData;
  author?: string;
  source?: string;
  period?: string;
  location?: string;
  status: CulturalContentStatus;
  priority: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  favoriteCount: number;
  shareCount: number;
  downloadCount: number;
  rating: number;
  ratingCount: number;
  publishAt?: Date;
  expireAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface ContentData {
  text?: TextContent;
  images?: ImageContent[];
  videos?: VideoContent[];
  audio?: AudioContent;
  interactive?: InteractiveContent;
  immersive?: ImmersiveContent;
}
```

#### 8.2 元数据约束规则

| 字段 | 数据类型 | 必填 | 约束规则 | 示例 |
|------|---------|------|---------|------|
| contentId | string | 是 | UUID格式，唯一标识 | "550e8400-e29b-41d4-a716-446655440000" |
| contentForm | enum | 是 | 必须是预定义的内容形式 | "text" |
| displayType | enum | 是 | 必须是预定义的展示类型 | "list" |
| category | enum | 是 | 必须是预定义的内容分类 | "knowledge" |
| title | string | 是 | 2-100个字符 | "河洛文化概述" |
| subtitle | string | 否 | 最多50个字符 | "中华文明的源头" |
| description | string | 是 | 10-5000个字符 | "河洛文化是中华文明的重要源头..." |
| keywords | string[] | 是 | 至少1个，最多10个关键词 | ["河洛文化", "中华文明"] |
| tags | string[] | 是 | 至少1个，最多20个标签 | ["文化", "历史", "洛阳"] |
| coverImage | string | 是 | URL格式，支持http/https | "https://example.com/cover.jpg" |
| thumbnailImage | string | 否 | URL格式，缩略图 | "https://example.com/thumb.jpg" |
| contentData | object | 是 | 根据contentForm填充对应数据 | 见下方详细定义 |
| author | string | 否 | 最多100个字符 | "文化研究专家" |
| source | string | 否 | 最多500个字符，注明来源 | "河洛文化研究院" |
| period | string | 否 | 历史时期描述 | "公元前2070年-公元220年" |
| location | string | 否 | 地理位置描述 | "河南省洛阳市" |
| status | enum | 是 | 必须是预定义的状态 | "published" |
| priority | number | 是 | 1-100，数字越大优先级越高 | 80 |
| viewCount | number | 是 | 非负整数，默认0 | 1000 |
| likeCount | number | 是 | 非负整数，默认0 | 500 |
| commentCount | number | 是 | 非负整数，默认0 | 200 |
| favoriteCount | number | 是 | 非负整数，默认0 | 150 |
| shareCount | number | 是 | 非负整数，默认0 | 100 |
| downloadCount | number | 是 | 非负整数，默认0 | 50 |
| rating | number | 是 | 0-5，保留1位小数，默认0 | 4.5 |
| ratingCount | number | 是 | 非负整数，默认0 | 100 |
| publishAt | Date | 否 | 发布时间，状态为published时必填 | "2025-01-24T00:00:00Z" |
| expireAt | Date | 否 | 过期时间，可选 | "2025-12-31T00:00:00Z" |
| createdAt | Date | 是 | 自动生成时间戳 | "2025-01-24T00:00:00Z" |
| updatedAt | Date | 是 | 自动更新时间戳 | "2025-01-24T00:00:00Z" |

### 9. 内容数据结构定义

#### 9.1 文本内容结构

```typescript
interface TextContent {
  content: string;
  format: 'plain' | 'markdown' | 'html';
  wordCount: number;
  readingTime: number;
  sections?: TextSection[];
}

interface TextSection {
  sectionId: string;
  title: string;
  content: string;
  order: number;
}
```

#### 9.2 图像内容结构

```typescript
interface ImageContent {
  imageId: string;
  imageUrl: string;
  thumbnailUrl: string;
  title?: string;
  description?: string;
  width: number;
  height: number;
  size: number;
  format: string;
  order: number;
}
```

#### 9.3 视频内容结构

```typescript
interface VideoContent {
  videoId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title?: string;
  description?: string;
  duration: number;
  size: number;
  format: string;
  resolution: string;
  order: number;
  subtitles?: Subtitle[];
}

interface Subtitle {
  language: string;
  url: string;
  format: string;
}
```

#### 9.4 音频内容结构

```typescript
interface AudioContent {
  audioId: string;
  audioUrl: string;
  title?: string;
  description?: string;
  duration: number;
  size: number;
  format: string;
  bitrate: number;
  order: number;
  transcript?: string;
}
```

#### 9.5 交互内容结构

```typescript
interface InteractiveContent {
  interactionType: 'quiz' | 'survey' | 'game';
  questions?: Question[];
  surveyItems?: SurveyItem[];
  gameConfig?: GameConfig;
}

interface Question {
  questionId: string;
  question: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  points: number;
  order: number;
}

interface SurveyItem {
  itemId: string;
  question: string;
  type: 'rating' | 'choice' | 'text';
  options?: string[];
  required: boolean;
  order: number;
}

interface GameConfig {
  gameType: string;
  config: Record<string, any>;
  rules: string[];
  scoring: Record<string, number>;
}
```

#### 9.6 沉浸式内容结构

```typescript
interface ImmersiveContent {
  immersiveType: 'vr' | 'ar';
  vrContent?: VRContent;
  arContent?: ARContent;
}

interface VRContent {
  vrId: string;
  sceneUrl: string;
  thumbnailUrl: string;
  title?: string;
  description?: string;
  hotspots?: Hotspot[];
  audioUrl?: string;
  format: string;
}

interface ARContent {
  arId: string;
  modelUrl: string;
  markerUrl?: string;
  title?: string;
  description?: string;
  interactionMode: 'tap' | 'gesture' | 'voice';
  format: string;
}

interface Hotspot {
  hotspotId: string;
  position: { x: number; y: number; z: number };
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
}
```

### 10. 文化内容推荐规则

#### 10.1 推荐类型枚举

```typescript
enum CulturalContentRecommendationType {
  PERSONALIZED = 'personalized',
  POPULAR = 'popular',
  LATEST = 'latest',
  FEATURED = 'featured',
  RELATED = 'related',
  TRENDING = 'trending'
}
```

#### 10.2 推荐类型说明

| 推荐代码 | 推荐名称 | 推荐描述 | 推荐算法 | 适用场景 |
|---------|---------|---------|---------|---------|
| personalized | 个性化推荐 | 基于用户兴趣和行为推荐 | 协同过滤、内容推荐 | 首页推荐、个人中心 |
| popular | 热门推荐 | 基于浏览量和互动量推荐 | 热度排序 | 热门内容、排行榜 |
| latest | 最新推荐 | 基于发布时间推荐 | 时间倒序 | 最新内容、更新提醒 |
| featured | 精选推荐 | 编辑精选的高质量内容 | 人工筛选 | 精选专区、推荐位 |
| related | 相关推荐 | 基于内容相似度推荐 | 内容相似度计算 | 详情页相关推荐 |
| trending | 趋势推荐 | 基于近期增长趋势推荐 | 趋势分析 | 趋势榜单、热点 |

#### 10.3 推荐权重配置

```typescript
interface RecommendationWeight {
  recommendationType: CulturalContentRecommendationType;
  weight: number;
  conditions?: RecommendationCondition[];
}

interface RecommendationCondition {
  field: string;
  operator: 'eq' | 'gt' | 'lt' | 'in';
  value: any;
}

const recommendationWeights: RecommendationWeight[] = [
  {
    recommendationType: CulturalContentRecommendationType.PERSONALIZED,
    weight: 0.4,
    conditions: [
      { field: 'user.loginCount', operator: 'gt', value: 5 }
    ]
  },
  {
    recommendationType: CulturalContentRecommendationType.POPULAR,
    weight: 0.25,
    conditions: [
      { field: 'content.viewCount', operator: 'gt', value: 1000 }
    ]
  },
  {
    recommendationType: CulturalContentRecommendationType.LATEST,
    weight: 0.15
  },
  {
    recommendationType: CulturalContentRecommendationType.FEATURED,
    weight: 0.1,
    conditions: [
      { field: 'content.status', operator: 'eq', value: 'featured' }
    ]
  },
  {
    recommendationType: CulturalContentRecommendationType.RELATED,
    weight: 0.1
  }
]
```

### 11. 文化内容搜索规则

#### 11.1 搜索类型枚举

```typescript
enum CulturalContentSearchType {
  FULLTEXT = 'fulltext',
  KEYWORD = 'keyword',
  TAG = 'tag',
  CATEGORY = 'category',
  FILTER = 'filter'
}
```

#### 11.2 搜索类型说明

| 搜索代码 | 搜索名称 | 搜索描述 | 搜索范围 | 示例 |
|---------|---------|---------|---------|------|
| fulltext | 全文搜索 | 在标题、描述、内容中搜索 | 所有文本字段 | "河洛文化" |
| keyword | 关键词搜索 | 在关键词中搜索 | keywords字段 | ["河洛", "文化"] |
| tag | 标签搜索 | 在标签中搜索 | tags字段 | ["文化", "历史"] |
| category | 分类搜索 | 按分类搜索 | category字段 | "knowledge" |
| filter | 筛选搜索 | 按条件筛选 | 多个字段组合 | 状态+时间+类型 |

#### 11.3 搜索排序规则

```typescript
enum CulturalContentSortType {
  RELEVANCE = 'relevance',
  TIME_DESC = 'time_desc',
  TIME_ASC = 'time_asc',
  VIEWS_DESC = 'views_desc',
  VIEWS_ASC = 'views_asc',
  LIKES_DESC = 'likes_desc',
  LIKES_ASC = 'likes_asc',
  RATING_DESC = 'rating_desc',
  RATING_ASC = 'rating_asc',
  PRIORITY_DESC = 'priority_desc'
}
```

### 12. 文化内容缓存策略

#### 12.1 缓存类型

```typescript
enum CulturalContentCacheType {
  HOT = 'hot',
  FEATURED = 'featured',
  LATEST = 'latest',
  USER_FAVORITE = 'user_favorite',
  USER_HISTORY = 'user_history'
}
```

#### 12.2 缓存配置

```typescript
interface CacheConfig {
  cacheType: CulturalContentCacheType;
  ttl: number;
  maxSize: number;
  refreshInterval: number;
  preload: boolean;
}

const cacheConfigs: CacheConfig[] = [
  {
    cacheType: CulturalContentCacheType.HOT,
    ttl: 3600,
    maxSize: 100,
    refreshInterval: 300,
    preload: true
  },
  {
    cacheType: CulturalContentCacheType.FEATURED,
    ttl: 7200,
    maxSize: 50,
    refreshInterval: 600,
    preload: true
  },
  {
    cacheType: CulturalContentCacheType.LATEST,
    ttl: 600,
    maxSize: 100,
    refreshInterval: 60,
    preload: true
  },
  {
    cacheType: CulturalContentCacheType.USER_FAVORITE,
    ttl: 1800,
    maxSize: 1000,
    refreshInterval: 300,
    preload: false
  },
  {
    cacheType: CulturalContentCacheType.USER_HISTORY,
    ttl: 900,
    maxSize: 50,
    refreshInterval: 0,
    preload: false
  }
]
```

### 13. 附录

#### 13.1 文化内容类型速查表

| 内容形式 | 展示类型 | 交互类型 | 适用场景 | 缓存策略 |
|---------|---------|---------|---------|---------|
| text | list, story | view, like, comment, favorite | 知识科普、故事传说 | user_history |
| image | grid, gallery | view, like, comment, favorite, download | 展览展示、艺术作品 | hot |
| video | list, carousel | view, like, comment, favorite | 课程教学、纪录片 | latest |
| audio | list | view, like, comment, favorite | 戏曲音乐、讲解音频 | featured |
| interactive | list, story | view, quiz, survey, feedback | 知识问答、互动游戏 | user_favorite |
| immersive | gallery, story | view, like, comment, favorite | VR游览、AR展示 | hot |

#### 13.2 内容状态流转图

```
草稿 (draft)
  ↓ 提交审核
待审核 (pending_review)
  ↓ 开始审核
审核中 (reviewing)
  ├─ 通过 → 已通过 (approved) → 发布 → 已发布 (published)
  └─ 拒绝 → 已拒绝 (rejected) → 修改 → 草稿 (draft)

已发布 (published)
  ↓ 标记精选
精选 (featured)
  ↓ 取消精选
已发布 (published)

已发布 (published) / 精选 (featured)
  ↓ 归档
已归档 (archived)
  ↓ 恢复
已发布 (published)

任何状态
  ↓ 删除
已删除 (deleted)
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
