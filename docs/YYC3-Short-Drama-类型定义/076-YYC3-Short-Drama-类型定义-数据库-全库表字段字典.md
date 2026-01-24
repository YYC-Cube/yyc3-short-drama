---
@file: 076-YYC3-Short-Drama-类型定义-数据库-全库表字段字典.md
@description: YYC3-Short-Drama 全数据库所有表、字段的定义、类型、注释、约束的完整字典
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[数据库],[字段字典]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 076-YYC3-Short-Drama-类型定义-数据库-全库表字段字典

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-数据库-全库表字段字典相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范数据库-全库表字段字典相关的业务标准与技术落地要求
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

### 3. 数据库-全库表字段字典

#### 3.1 用户表 (users)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| user_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 用户ID，主键 | UUID格式 |
| phone | VARCHAR | 20 | YES | - | INDEX | 手机号 | 唯一索引 |
| email | VARCHAR | 100 | YES | - | INDEX | 邮箱 | 唯一索引 |
| password_hash | VARCHAR | 255 | NO | - | - | 密码哈希 | bcrypt加密 |
| nickname | VARCHAR | 50 | NO | - | - | 昵称 | 长度2-50 |
| avatar | VARCHAR | 500 | YES | - | - | 头像URL | URL格式 |
| bio | VARCHAR | 500 | YES | - | - | 个人简介 | 长度0-500 |
| role | ENUM | - | NO | 'user' | INDEX | 角色 | user/creator/admin/super_admin |
| status | ENUM | - | NO | 'inactive' | INDEX | 状态 | inactive/active/frozen/deleted |
| star_value | INT | - | NO | 0 | - | 星值余额 | 非负整数 |
| star_level | INT | - | NO | 1 | - | 星值等级 | 1-5 |
| last_login_at | TIMESTAMP | - | YES | - | - | 最后登录时间 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储用户基本信息，支持手机号和邮箱两种注册方式，包含角色和状态管理，以及星值经济体系相关字段。

#### 3.2 用户认证表 (user_auth)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| auth_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 认证ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| auth_type | ENUM | - | NO | - | INDEX | 认证类型 | phone/email/wechat/apple |
| auth_key | VARCHAR | 255 | NO | - | - | 认证标识 | 手机号/邮箱/OpenID |
| verified | BOOLEAN | - | NO | false | - | 是否已验证 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储用户认证信息，支持多种认证方式，包括手机号、邮箱、微信和Apple ID。

#### 3.3 创作者表 (creators)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| creator_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 创作者ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| real_name | VARCHAR | 50 | YES | - | - | 真实姓名 | - |
| id_card | VARCHAR | 18 | YES | - | - | 身份证号 | 加密存储 |
| id_card_front | VARCHAR | 500 | YES | - | - | 身份证正面 | URL |
| id_card_back | VARCHAR | 500 | YES | - | - | 身份证背面 | URL |
| business_license | VARCHAR | 500 | YES | - | - | 营业执照 | URL |
| verification_status | ENUM | - | NO | 'pending' | INDEX | 认证状态 | pending/verified/rejected |
| verification_time | TIMESTAMP | - | YES | - | - | 认证时间 | - |
| reject_reason | VARCHAR | 500 | YES | - | - | 拒绝原因 | - |
| total_plays | BIGINT | - | NO | 0 | - | 总播放量 | 非负整数 |
| total_earnings | DECIMAL | 10,2 | NO | 0.00 | - | 总收益 | 非负数 |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储创作者认证信息和收益数据，包含实名认证、资质审核、播放量统计和收益管理功能。

#### 3.4 短剧表 (dramas)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| drama_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 短剧ID，主键 | UUID格式 |
| creator_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 创作者ID | 关联creators表 |
| title | VARCHAR | 100 | NO | - | INDEX | 短剧标题 | 长度1-100 |
| description | TEXT | - | YES | - | - | 短剧描述 | - |
| cover_image | VARCHAR | 500 | NO | - | - | 封面图片 | URL格式 |
| video_url | VARCHAR | 500 | NO | - | - | 视频地址 | URL格式 |
| duration | INT | - | NO | 0 | - | 视频时长 | 秒 |
| category_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 分类ID | 关联categories表 |
| tags | JSON | - | YES | - | - | 标签列表 | JSON数组 |
| status | ENUM | - | NO | 'draft' | INDEX | 状态 | draft/reviewing/published/rejected/archived |
| is_ai_generated | BOOLEAN | - | NO | false | - | 是否AI生成 | - |
| ai_model | VARCHAR | 50 | YES | - | - | AI模型 | - |
| view_count | BIGINT | - | NO | 0 | - | 播放量 | 非负整数 |
| like_count | INT | - | NO | 0 | - | 点赞数 | 非负整数 |
| comment_count | INT | - | NO | 0 | - | 评论数 | 非负整数 |
| share_count | INT | - | NO | 0 | - | 分享数 | 非负整数 |
| star_price | DECIMAL | 10,2 | NO | 0.00 | - | 星值价格 | 非负数 |
| total_earnings | DECIMAL | 10,2 | NO | 0.00 | - | 总收益 | 非负数 |
| published_at | TIMESTAMP | - | YES | - | INDEX | 发布时间 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储短剧基本信息，支持AI生成标识，包含分类、标签、状态管理，以及播放量、点赞数、评论数、分享数等互动数据统计。

#### 3.5 短剧集数表 (drama_episodes)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| episode_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 集数ID，主键 | UUID格式 |
| drama_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 短剧ID | 关联dramas表 |
| episode_number | INT | - | NO | 0 | - | 集数 | 正整数 |
| title | VARCHAR | 100 | YES | - | - | 集标题 | - |
| description | TEXT | - | YES | - | - | 集描述 | - |
| cover_image | VARCHAR | 500 | YES | - | - | 封面图片 | URL格式 |
| video_url | VARCHAR | 500 | NO | - | - | 视频地址 | URL格式 |
| duration | INT | - | NO | 0 | - | 视频时长 | 秒 |
| is_free | BOOLEAN | - | NO | true | - | 是否免费 | - |
| star_price | DECIMAL | 10,2 | NO | 0.00 | - | 星值价格 | 非负数 |
| view_count | BIGINT | - | NO | 0 | - | 播放量 | 非负整数 |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储短剧的分集信息，支持免费和付费模式，包含每集的标题、描述、视频地址和播放量统计。

#### 3.6 文化资源表 (cultural_resources)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| resource_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 资源ID，主键 | UUID格式 |
| resource_type | ENUM | - | NO | - | INDEX | 资源类型 | heritage/story/artifact/custom/landmark |
| title | VARCHAR | 100 | NO | - | INDEX | 资源标题 | 长度1-100 |
| description | TEXT | - | YES | - | - | 资源描述 | - |
| cover_image | VARCHAR | 500 | YES | - | - | 封面图片 | URL格式 |
| content | JSON | - | YES | - | - | 资源内容 | JSON格式 |
| tags | JSON | - | YES | - | - | 标签列表 | JSON数组 |
| location | JSON | - | YES | - | - | 地理位置 | JSON格式 |
| era | VARCHAR | 50 | YES | - | INDEX | 历史时期 | - |
| status | ENUM | - | NO | 'active' | INDEX | 状态 | active/archived |
| view_count | BIGINT | - | NO | 0 | - | 浏览量 | 非负整数 |
| usage_count | INT | - | NO | 0 | - | 使用次数 | 非负整数 |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储河洛文化资源信息，包括文化遗产、历史故事、文物、自定义内容和地标，支持地理位置和历史时期标注。

#### 3.7 文化资源关联表 (cultural_resource_relations)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| relation_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 关联ID，主键 | UUID格式 |
| resource_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 资源ID | 关联cultural_resources表 |
| target_type | ENUM | - | NO | - | INDEX | 目标类型 | drama/episode |
| target_id | VARCHAR | 36 | NO | - | - | 目标ID | - |
| relation_type | ENUM | - | NO | - | - | 关联类型 | reference/inspiration/source |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 创建时间 | - |

**表说明**: 存储文化资源与短剧或剧集的关联关系，支持引用、灵感和来源三种关联类型。

#### 3.8 分类表 (categories)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| category_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 分类ID，主键 | UUID格式 |
| parent_id | VARCHAR | 36 | YES | - | FOREIGN KEY | 父分类ID | 关联categories表 |
| name | VARCHAR | 50 | NO | - | - | 分类名称 | 长度1-50 |
| description | VARCHAR | 200 | YES | - | - | 分类描述 | - |
| icon | VARCHAR | 500 | YES | - | - | 分类图标 | URL格式 |
| sort_order | INT | - | NO | 0 | - | 排序顺序 | 非负整数 |
| status | ENUM | - | NO | 'active' | - | 状态 | active/inactive |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储短剧分类信息，支持多级分类结构，包含分类名称、描述、图标和排序功能。

#### 3.9 点赞表 (likes)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| like_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 点赞ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| target_type | ENUM | - | NO | - | INDEX | 目标类型 | drama/episode/comment |
| target_id | VARCHAR | 36 | NO | - | - | 目标ID | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |

**表说明**: 存储用户点赞记录，支持对短剧、剧集和评论的点赞操作。

**索引**: UNIQUE KEY uk_user_target (user_id, target_type, target_id)

#### 3.10 评论表 (comments)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| comment_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 评论ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| target_type | ENUM | - | NO | - | INDEX | 目标类型 | drama/episode |
| target_id | VARCHAR | 36 | NO | - | - | 目标ID | - |
| parent_id | VARCHAR | 36 | YES | - | FOREIGN KEY | 父评论ID | 关联comments表 |
| content | TEXT | - | NO | - | - | 评论内容 | 长度1-1000 |
| like_count | INT | - | NO | 0 | - | 点赞数 | 非负整数 |
| status | ENUM | - | NO | 'active' | INDEX | 状态 | active/deleted |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储用户评论信息，支持对短剧和剧集的评论，支持多级回复结构。

#### 3.11 收藏表 (favorites)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| favorite_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 收藏ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| target_type | ENUM | - | NO | - | INDEX | 目标类型 | drama/creator |
| target_id | VARCHAR | 36 | NO | - | - | 目标ID | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |

**表说明**: 存储用户收藏记录，支持对短剧和创作者的收藏操作。

**索引**: UNIQUE KEY uk_user_target (user_id, target_type, target_id)

#### 3.12 订单表 (orders)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| order_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 订单ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| order_type | ENUM | - | NO | - | INDEX | 订单类型 | star/episode/vip |
| target_id | VARCHAR | 36 | YES | - | - | 目标ID | - |
| amount | DECIMAL | 10,2 | NO | 0.00 | - | 订单金额 | 非负数 |
| star_amount | INT | - | NO | 0 | - | 星值数量 | 非负整数 |
| status | ENUM | - | NO | 'pending' | INDEX | 订单状态 | pending/paid/failed/cancelled/refunded |
| payment_method | ENUM | - | YES | - | - | 支付方式 | alipay/wechat |
| payment_id | VARCHAR | 100 | YES | - | - | 支付ID | - |
| paid_at | TIMESTAMP | - | YES | - | - | 支付时间 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储用户订单信息，支持星值充值、剧集购买和VIP会员购买，包含支付状态和支付方式管理。

#### 3.13 交易记录表 (transactions)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| transaction_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 交易ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| transaction_type | ENUM | - | NO | - | INDEX | 交易类型 | purchase/earning/refund/reward |
| amount | DECIMAL | 10,2 | NO | 0.00 | - | 交易金额 | 可正可负 |
| star_amount | INT | - | NO | 0 | - | 星值数量 | 可正可负 |
| balance_after | INT | - | NO | 0 | - | 交易后余额 | 非负整数 |
| description | VARCHAR | 200 | YES | - | - | 交易描述 | - |
| related_id | VARCHAR | 36 | YES | - | - | 关联ID | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |

**表说明**: 存储用户星值交易记录，包括购买、收益、退款和奖励，记录每次交易的金额、星值变化和余额。

#### 3.14 VIP会员表 (vip_memberships)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| membership_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 会员ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| membership_type | ENUM | - | NO | - | INDEX | 会员类型 | monthly/quarterly/yearly |
| start_date | DATE | - | NO | - | - | 开始日期 | - |
| end_date | DATE | - | NO | - | - | 结束日期 | - |
| status | ENUM | - | NO | 'active' | INDEX | 状态 | active/expired/cancelled |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储VIP会员信息，支持月度、季度和年度会员，包含会员有效期和状态管理。

#### 3.15 消息表 (messages)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| message_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 消息ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| message_type | ENUM | - | NO | - | INDEX | 消息类型 | system/interaction/promotion |
| title | VARCHAR | 100 | NO | - | - | 消息标题 | 长度1-100 |
| content | TEXT | - | YES | - | - | 消息内容 | - |
| is_read | BOOLEAN | - | NO | false | - | 是否已读 | - |
| read_at | TIMESTAMP | - | YES | - | - | 阅读时间 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |

**表说明**: 存储用户消息信息，包括系统通知、互动消息和推广消息，支持已读状态管理。

#### 3.16 通知表 (notifications)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| notification_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 通知ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| notification_type | ENUM | - | NO | - | INDEX | 通知类型 | like/comment/follow/system |
| title | VARCHAR | 100 | YES | - | - | 通知标题 | - |
| content | TEXT | - | YES | - | - | 通知内容 | - |
| target_type | ENUM | - | YES | - | - | 目标类型 | drama/episode/comment |
| target_id | VARCHAR | 36 | YES | - | - | 目标ID | - |
| is_read | BOOLEAN | - | NO | false | - | 是否已读 | - |
| read_at | TIMESTAMP | - | YES | - | - | 阅读时间 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |

**表说明**: 存储用户通知信息，包括点赞、评论、关注和系统通知，支持已读状态管理。

#### 3.17 反馈表 (feedback)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| feedback_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 反馈ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| feedback_type | ENUM | - | NO | - | INDEX | 反馈类型 | bug/suggestion/complaint/other |
| title | VARCHAR | 100 | NO | - | - | 反馈标题 | 长度1-100 |
| content | TEXT | - | NO | - | - | 反馈内容 | 长度1-2000 |
| images | JSON | - | YES | - | - | 图片列表 | JSON数组 |
| status | ENUM | - | NO | 'pending' | INDEX | 处理状态 | pending/processing/resolved/closed |
| reply | TEXT | - | YES | - | - | 回复内容 | - |
| replied_at | TIMESTAMP | - | YES | - | - | 回复时间 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储用户反馈信息，包括Bug报告、建议、投诉和其他反馈，支持图片上传和处理状态跟踪。

#### 3.18 系统配置表 (system_configs)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| config_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 配置ID，主键 | UUID格式 |
| config_key | VARCHAR | 100 | NO | - | UNIQUE KEY | 配置键 | 唯一 |
| config_value | TEXT | - | YES | - | - | 配置值 | JSON格式 |
| description | VARCHAR | 200 | YES | - | - | 配置描述 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储系统配置信息，支持动态配置管理，配置值以JSON格式存储。

#### 3.19 操作日志表 (operation_logs)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| log_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 日志ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | YES | - | FOREIGN KEY | 用户ID | 关联users表 |
| operation_type | ENUM | - | NO | - | INDEX | 操作类型 | login/logout/create/update/delete |
| resource_type | VARCHAR | 50 | YES | - | - | 资源类型 | - |
| resource_id | VARCHAR | 36 | YES | - | - | 资源ID | - |
| ip_address | VARCHAR | 50 | YES | - | - | IP地址 | - |
| user_agent | VARCHAR | 500 | YES | - | - | 用户代理 | - |
| request_data | JSON | - | YES | - | - | 请求数据 | JSON格式 |
| response_data | JSON | - | YES | - | - | 响应数据 | JSON格式 |
| status | ENUM | - | NO | 'success' | INDEX | 操作状态 | success/failed |
| error_message | TEXT | - | YES | - | - | 错误信息 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |

**表说明**: 存储系统操作日志，记录用户操作行为，包括登录、登出、创建、更新、删除等操作，支持IP地址、用户代理和请求数据记录。

#### 3.20 AI生成记录表 (ai_generation_logs)

| 字段名 | 数据类型 | 长度 | 允许NULL | 默认值 | 键类型 | 字段说明 | 约束条件 |
|--------|----------|------|----------|--------|--------|----------|----------|
| log_id | VARCHAR | 36 | NO | - | PRIMARY KEY | 日志ID，主键 | UUID格式 |
| user_id | VARCHAR | 36 | NO | - | FOREIGN KEY | 用户ID | 关联users表 |
| generation_type | ENUM | - | NO | - | INDEX | 生成类型 | script/image/video |
| input_data | JSON | - | NO | - | - | 输入数据 | JSON格式 |
| output_data | JSON | - | YES | - | - | 输出数据 | JSON格式 |
| model_name | VARCHAR | 50 | YES | - | - | 模型名称 | - |
| model_version | VARCHAR | 20 | YES | - | - | 模型版本 | - |
| tokens_used | INT | - | YES | - | - | 使用的Token数 | 非负整数 |
| duration | INT | - | YES | - | - | 生成时长 | 毫秒 |
| status | ENUM | - | NO | 'pending' | INDEX | 生成状态 | pending/processing/completed/failed |
| error_message | TEXT | - | YES | - | - | 错误信息 | - |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | INDEX | 创建时间 | - |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | - | 更新时间 | 自动更新 |

**表说明**: 存储AI生成记录，包括剧本、图片和视频生成，记录输入输出数据、模型信息、Token使用量和生成状态。

#### 3.21 数据库索引汇总

| 表名 | 索引名 | 索引类型 | 索引字段 | 说明 |
|------|--------|----------|----------|------|
| users | idx_phone | INDEX | phone | 手机号索引 |
| users | idx_email | INDEX | email | 邮箱索引 |
| users | idx_role | INDEX | role | 角色索引 |
| users | idx_status | INDEX | status | 状态索引 |
| users | idx_created_at | INDEX | created_at | 创建时间索引 |
| user_auth | idx_auth_type | INDEX | auth_type | 认证类型索引 |
| creators | idx_verification_status | INDEX | verification_status | 认证状态索引 |
| dramas | idx_title | INDEX | title | 标题索引 |
| dramas | idx_status | INDEX | status | 状态索引 |
| dramas | idx_published_at | INDEX | published_at | 发布时间索引 |
| dramas | idx_created_at | INDEX | created_at | 创建时间索引 |
| cultural_resources | idx_resource_type | INDEX | resource_type | 资源类型索引 |
| cultural_resources | idx_title | INDEX | title | 标题索引 |
| cultural_resources | idx_era | INDEX | era | 历史时期索引 |
| cultural_resources | idx_status | INDEX | status | 状态索引 |
| cultural_resources | idx_created_at | INDEX | created_at | 创建时间索引 |
| cultural_resource_relations | idx_resource_id | INDEX | resource_id | 资源ID索引 |
| cultural_resource_relations | idx_target_type | INDEX | target_type | 目标类型索引 |
| likes | idx_user_id | INDEX | user_id | 用户ID索引 |
| likes | idx_target_type | INDEX | target_type | 目标类型索引 |
| likes | idx_created_at | INDEX | created_at | 创建时间索引 |
| comments | idx_user_id | INDEX | user_id | 用户ID索引 |
| comments | idx_target_type | INDEX | target_type | 目标类型索引 |
| comments | idx_status | INDEX | status | 状态索引 |
| comments | idx_created_at | INDEX | created_at | 创建时间索引 |
| favorites | idx_user_id | INDEX | user_id | 用户ID索引 |
| favorites | idx_target_type | INDEX | target_type | 目标类型索引 |
| favorites | idx_created_at | INDEX | created_at | 创建时间索引 |
| orders | idx_user_id | INDEX | user_id | 用户ID索引 |
| orders | idx_order_type | INDEX | order_type | 订单类型索引 |
| orders | idx_status | INDEX | status | 订单状态索引 |
| orders | idx_created_at | INDEX | created_at | 创建时间索引 |
| transactions | idx_user_id | INDEX | user_id | 用户ID索引 |
| transactions | idx_transaction_type | INDEX | transaction_type | 交易类型索引 |
| transactions | idx_created_at | INDEX | created_at | 创建时间索引 |
| vip_memberships | idx_user_id | INDEX | user_id | 用户ID索引 |
| vip_memberships | idx_membership_type | INDEX | membership_type | 会员类型索引 |
| vip_memberships | idx_status | INDEX | status | 状态索引 |
| messages | idx_user_id | INDEX | user_id | 用户ID索引 |
| messages | idx_message_type | INDEX | message_type | 消息类型索引 |
| messages | idx_created_at | INDEX | created_at | 创建时间索引 |
| notifications | idx_user_id | INDEX | user_id | 用户ID索引 |
| notifications | idx_notification_type | INDEX | notification_type | 通知类型索引 |
| notifications | idx_created_at | INDEX | created_at | 创建时间索引 |
| feedback | idx_user_id | INDEX | user_id | 用户ID索引 |
| feedback | idx_feedback_type | INDEX | feedback_type | 反馈类型索引 |
| feedback | idx_status | INDEX | status | 处理状态索引 |
| feedback | idx_created_at | INDEX | created_at | 创建时间索引 |
| operation_logs | idx_user_id | INDEX | user_id | 用户ID索引 |
| operation_logs | idx_operation_type | INDEX | operation_type | 操作类型索引 |
| operation_logs | idx_status | INDEX | status | 操作状态索引 |
| operation_logs | idx_created_at | INDEX | created_at | 创建时间索引 |
| ai_generation_logs | idx_user_id | INDEX | user_id | 用户ID索引 |
| ai_generation_logs | idx_generation_type | INDEX | generation_type | 生成类型索引 |
| ai_generation_logs | idx_status | INDEX | status | 生成状态索引 |
| ai_generation_logs | idx_created_at | INDEX | created_at | 创建时间索引 |

#### 3.22 数据库外键关系汇总

| 表名 | 外键名 | 外键字段 | 关联表 | 关联字段 | 级联规则 |
|------|--------|----------|--------|----------|----------|
| user_auth | fk_user_auth_user_id | user_id | users | user_id | CASCADE |
| creators | fk_creators_user_id | user_id | users | user_id | CASCADE |
| dramas | fk_dramas_creator_id | creator_id | creators | creator_id | CASCADE |
| dramas | fk_dramas_category_id | category_id | categories | category_id | CASCADE |
| drama_episodes | fk_drama_episodes_drama_id | drama_id | dramas | drama_id | CASCADE |
| cultural_resource_relations | fk_crr_resource_id | resource_id | cultural_resources | resource_id | CASCADE |
| categories | fk_categories_parent_id | parent_id | categories | category_id | CASCADE |
| likes | fk_likes_user_id | user_id | users | user_id | CASCADE |
| comments | fk_comments_user_id | user_id | users | user_id | CASCADE |
| comments | fk_comments_parent_id | parent_id | comments | comment_id | CASCADE |
| favorites | fk_favorites_user_id | user_id | users | user_id | CASCADE |
| orders | fk_orders_user_id | user_id | users | user_id | CASCADE |
| transactions | fk_transactions_user_id | user_id | users | user_id | CASCADE |
| vip_memberships | fk_vip_memberships_user_id | user_id | users | user_id | CASCADE |
| messages | fk_messages_user_id | user_id | users | user_id | CASCADE |
| notifications | fk_notifications_user_id | user_id | users | user_id | CASCADE |
| feedback | fk_feedback_user_id | user_id | users | user_id | CASCADE |
| operation_logs | fk_operation_logs_user_id | user_id | users | user_id | CASCADE |
| ai_generation_logs | fk_ai_generation_logs_user_id | user_id | users | user_id | CASCADE |

#### 3.23 数据库约束汇总

| 表名 | 约束名 | 约束类型 | 约束字段 | 约束说明 |
|------|--------|----------|----------|----------|
| users | uk_users_phone | UNIQUE | phone | 手机号唯一 |
| users | uk_users_email | UNIQUE | email | 邮箱唯一 |
| user_auth | uk_user_auth_auth_key | UNIQUE | auth_key | 认证标识唯一 |
| likes | uk_likes_user_target | UNIQUE | user_id, target_type, target_id | 用户目标唯一 |
| favorites | uk_favorites_user_target | UNIQUE | user_id, target_type, target_id | 用户目标唯一 |
| system_configs | uk_system_configs_config_key | UNIQUE | config_key | 配置键唯一 |

#### 3.24 数据库触发器汇总

| 触发器名 | 触发表 | 触发时机 | 触发事件 | 触发说明 |
|----------|--------|----------|----------|----------|
| trg_users_updated_at | users | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_user_auth_updated_at | user_auth | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_creators_updated_at | creators | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_dramas_updated_at | dramas | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_drama_episodes_updated_at | drama_episodes | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_cultural_resources_updated_at | cultural_resources | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_categories_updated_at | categories | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_comments_updated_at | comments | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_orders_updated_at | orders | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_vip_memberships_updated_at | vip_memberships | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_feedback_updated_at | feedback | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_system_configs_updated_at | system_configs | AFTER | UPDATE | 自动更新updated_at字段 |
| trg_ai_generation_logs_updated_at | ai_generation_logs | AFTER | UPDATE | 自动更新updated_at字段 |

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
