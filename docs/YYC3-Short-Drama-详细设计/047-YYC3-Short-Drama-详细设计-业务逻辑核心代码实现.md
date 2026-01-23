---
@file: 047-YYC3-Short-Drama-详细设计-业务逻辑核心代码实现.md
@description: YYC3-Short-Drama 项目核心业务逻辑的代码实现与注释规范，保障逻辑正确性
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [详细设计],[核心逻辑],[代码实现]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 047-YYC3-Short-Drama-详细设计-业务逻辑核心代码实现

## 概述

本文档详细描述YYC3-Short-Drama短剧平台的核心业务逻辑代码实现，包括用户管理、短剧管理、评论管理、点赞管理、收藏管理、关注管理、星值管理、支付管理等核心业务逻辑的代码实现与注释规范。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的AI驱动短剧创作与分发平台，致力于通过人工智能技术赋能短剧内容创作，打造智能化的短剧生态体系。平台融合AI剧本生成、智能推荐、VR/AR沉浸式体验、星值经济体系等创新功能，为用户提供从创作到消费的全链路服务。核心业务逻辑的正确实现是平台稳定运行的关键。

#### 1.2 文档目标
- 提供完整的业务逻辑核心代码实现规范
- 详细描述各核心业务逻辑的代码实现
- 提供代码注释规范和最佳实践
- 为开发团队提供清晰的业务逻辑开发指导
- 确保业务逻辑实现符合YYC³标准规范

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保业务逻辑稳定运行，保障用户体验
- **高性能**：优化业务逻辑处理性能，提升用户体验
- **高安全性**：保护业务逻辑中的数据和隐私安全，建立安全防护
- **高扩展性**：支持业务逻辑快速扩展，适应业务需求变化
- **高可维护性**：便于后续维护和升级，降低维护成本

#### 2.2 五标体系
- **标准化**：统一的业务逻辑设计和开发标准
- **规范化**：严格的业务逻辑编码规范和代码审查
- **自动化**：使用自动化工具提高业务逻辑开发效率
- **智能化**：使用智能工具辅助业务逻辑开发
- **可视化**：使用可视化工具监控业务逻辑状态

#### 2.3 五化架构
- **流程化**：标准化的业务逻辑开发流程和审查流程
- **文档化**：完善的业务逻辑注释和文档
- **工具化**：使用高效的业务逻辑开发工具和测试工具
- **数字化**：使用数字化工具管理业务逻辑
- **生态化**：使用开源业务逻辑库和框架

### 3. 用户管理业务逻辑

#### 3.1 用户注册逻辑

**代码实现**
```typescript
// backend/services/user.service.ts
import { hashPassword, comparePassword } from '@/utils/password';
import { generateToken } from '@/utils/jwt';
import { userRepository } from '@/repositories/user.repository';
import { EmailAlreadyExistsError, InvalidCredentialsError } from '@/errors';

export interface CreateUserParams {
  email: string;
  password: string;
  nickname: string;
  phone?: string;
  bio?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export class UserService {
  /**
   * 创建新用户
   * @param params 用户注册参数
   * @returns 创建的用户信息
   * @throws {EmailAlreadyExistsError} 邮箱已存在时抛出错误
   */
  async createUser(params: CreateUserParams) {
    const { email, password, nickname, phone, bio } = params;

    // 检查邮箱是否已存在
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyExistsError('邮箱已被注册');
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    // 创建用户
    const user = await userRepository.create({
      email,
      password: hashedPassword,
      nickname,
      phone,
      bio,
      status: 'active',
    });

    // 生成JWT令牌
    const token = generateToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
      },
      token,
    };
  }

  /**
   * 用户登录
   * @param params 登录参数
   * @returns 登录用户信息和令牌
   * @throws {InvalidCredentialsError} 凭据无效时抛出错误
   */
  async login(params: LoginParams) {
    const { email, password } = params;

    // 查找用户
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError('邮箱或密码错误');
    }

    // 验证密码
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new InvalidCredentialsError('邮箱或密码错误');
    }

    // 检查用户状态
    if (user.status !== 'active') {
      throw new InvalidCredentialsError('账号已被禁用');
    }

    // 生成JWT令牌
    const token = generateToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
    });

    // 更新最后登录时间
    await userRepository.updateLastLogin(user.userId);

    return {
      user: {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
      },
      token,
    };
  }

  /**
   * 获取用户信息
   * @param userId 用户ID
   * @returns 用户信息
   * @throws {NotFoundError} 用户不存在时抛出错误
   */
  async getUserById(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('用户不存在');
    }

    return {
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      phone: user.phone,
      bio: user.bio,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
      followersCount: user.followersCount,
      followingCount: user.followingCount,
      createdAt: user.createdAt,
    };
  }

  /**
   * 更新用户信息
   * @param userId 用户ID
   * @param params 更新参数
   * @returns 更新后的用户信息
   * @throws {NotFoundError} 用户不存在时抛出错误
   */
  async updateUser(userId: string, params: Partial<CreateUserParams>) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('用户不存在');
    }

    // 如果更新邮箱，检查邮箱是否已存在
    if (params.email && params.email !== user.email) {
      const existingUser = await userRepository.findByEmail(params.email);
      if (existingUser) {
        throw new EmailAlreadyExistsError('邮箱已被注册');
      }
    }

    // 如果更新密码，加密新密码
    if (params.password) {
      params.password = await hashPassword(params.password);
    }

    // 更新用户
    const updatedUser = await userRepository.update(userId, params);

    return {
      userId: updatedUser.userId,
      email: updatedUser.email,
      nickname: updatedUser.nickname,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      avatar: updatedUser.avatar,
      role: updatedUser.role,
      status: updatedUser.status,
    };
  }
}

export const userService = new UserService();
```

#### 3.2 用户关注逻辑

**代码实现**
```typescript
// backend/services/follow.service.ts
import { followRepository } from '@/repositories/follow.repository';
import { userRepository } from '@/repositories/user.repository';
import { NotFoundError, AlreadyFollowingError, NotFollowingError } from '@/errors';

export class FollowService {
  /**
   * 关注用户
   * @param followerId 关注者ID
   * @param followingId 被关注者ID
   * @returns 关注关系
   * @throws {NotFoundError} 用户不存在时抛出错误
   * @throws {AlreadyFollowingError} 已经关注时抛出错误
   */
  async followUser(followerId: string, followingId: string) {
    // 检查是否关注自己
    if (followerId === followingId) {
      throw new ValidationError('不能关注自己');
    }

    // 检查被关注用户是否存在
    const followingUser = await userRepository.findById(followingId);
    if (!followingUser) {
      throw new NotFoundError('被关注用户不存在');
    }

    // 检查是否已经关注
    const existingFollow = await followRepository.findByUsers(followerId, followingId);
    if (existingFollow) {
      throw new AlreadyFollowingError('已经关注该用户');
    }

    // 创建关注关系
    const follow = await followRepository.create({
      followerId,
      followingId,
    });

    // 更新关注数和粉丝数
    await userRepository.incrementFollowingCount(followerId);
    await userRepository.incrementFollowersCount(followingId);

    return follow;
  }

  /**
   * 取消关注
   * @param followerId 关注者ID
   * @param followingId 被关注者ID
   * @returns 取消关注结果
   * @throws {NotFoundError} 关注关系不存在时抛出错误
   */
  async unfollowUser(followerId: string, followingId: string) {
    // 检查关注关系是否存在
    const follow = await followRepository.findByUsers(followerId, followingId);
    if (!follow) {
      throw new NotFollowingError('未关注该用户');
    }

    // 删除关注关系
    await followRepository.delete(follow.followId);

    // 更新关注数和粉丝数
    await userRepository.decrementFollowingCount(followerId);
    await userRepository.decrementFollowersCount(followingId);

    return { success: true };
  }

  /**
   * 获取用户的关注列表
   * @param userId 用户ID
   * @param page 页码
   * @param pageSize 每页数量
   * @returns 关注列表
   */
  async getFollowingList(userId: string, page: number = 1, pageSize: number = 20) {
    const follows = await followRepository.findByFollowerId(userId, page, pageSize);
    const userIds = follows.map(f => f.followingId);
    const users = await userRepository.findByIds(userIds);

    return {
      items: users,
      pagination: {
        page,
        pageSize,
        total: follows.total,
        totalPages: Math.ceil(follows.total / pageSize),
      },
    };
  }

  /**
   * 获取用户的粉丝列表
   * @param userId 用户ID
   * @param page 页码
   * @param pageSize 每页数量
   * @returns 粉丝列表
   */
  async getFollowersList(userId: string, page: number = 1, pageSize: number = 20) {
    const follows = await followRepository.findByFollowingId(userId, page, pageSize);
    const userIds = follows.map(f => f.followerId);
    const users = await userRepository.findByIds(userIds);

    return {
      items: users,
      pagination: {
        page,
        pageSize,
        total: follows.total,
        totalPages: Math.ceil(follows.total / pageSize),
      },
    };
  }
}

export const followService = new FollowService();
```

### 4. 短剧管理业务逻辑

#### 4.1 短剧创建逻辑

**代码实现**
```typescript
// backend/services/drama.service.ts
import { dramaRepository } from '@/repositories/drama.repository';
import { episodeRepository } from '@/repositories/episode.repository';
import { NotFoundError, ValidationError } from '@/errors';

export interface CreateDramaParams {
  title: string;
  description: string;
  coverImage: string;
  posterImage?: string;
  categoryIds: string[];
  tags?: string[];
  totalEpisodes: number;
  creatorId: string;
}

export class DramaService {
  /**
   * 创建短剧
   * @param params 短剧创建参数
   * @returns 创建的短剧信息
   * @throws {ValidationError} 参数验证失败时抛出错误
   */
  async createDrama(params: CreateDramaParams) {
    const {
      title,
      description,
      coverImage,
      posterImage,
      categoryIds,
      tags,
      totalEpisodes,
      creatorId,
    } = params;

    // 验证标题长度
    if (title.length < 2 || title.length > 100) {
      throw new ValidationError('标题长度必须在2-100之间');
    }

    // 验证描述长度
    if (description.length < 10 || description.length > 500) {
      throw new ValidationError('描述长度必须在10-500之间');
    }

    // 验证总集数
    if (totalEpisodes < 1) {
      throw new ValidationError('总集数必须大于0');
    }

    // 验证分类数量
    if (!categoryIds || categoryIds.length === 0) {
      throw new ValidationError('至少选择一个分类');
    }

    // 创建短剧
    const drama = await dramaRepository.create({
      title,
      description,
      coverImage,
      posterImage,
      categoryIds,
      tags,
      totalEpisodes,
      publishedEpisodes: 0,
      creatorId,
      status: 'draft',
    });

    return {
      dramaId: drama.dramaId,
      title: drama.title,
      description: drama.description,
      coverImage: drama.coverImage,
      posterImage: drama.posterImage,
      categoryIds: drama.categoryIds,
      tags: drama.tags,
      totalEpisodes: drama.totalEpisodes,
      publishedEpisodes: drama.publishedEpisodes,
      status: drama.status,
      createdAt: drama.createdAt,
    };
  }

  /**
   * 发布短剧
   * @param dramaId 短剧ID
   * @param creatorId 创建者ID
   * @returns 发布的短剧信息
   * @throws {NotFoundError} 短剧不存在时抛出错误
   * @throws {ValidationError} 短剧状态不允许发布时抛出错误
   */
  async publishDrama(dramaId: string, creatorId: string) {
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new NotFoundError('短剧不存在');
    }

    // 验证是否为创建者
    if (drama.creatorId !== creatorId) {
      throw new ValidationError('无权发布该短剧');
    }

    // 验证短剧状态
    if (drama.status !== 'draft') {
      throw new ValidationError('短剧状态不允许发布');
    }

    // 验证是否至少有一集
    if (drama.publishedEpisodes === 0) {
      throw new ValidationError('至少需要发布一集才能发布短剧');
    }

    // 更新短剧状态为已发布
    const updatedDrama = await dramaRepository.update(dramaId, {
      status: 'published',
      publishedAt: new Date(),
    });

    return {
      dramaId: updatedDrama.dramaId,
      title: updatedDrama.title,
      status: updatedDrama.status,
      publishedAt: updatedDrama.publishedAt,
    };
  }

  /**
   * 获取短剧列表
   * @param params 查询参数
   * @returns 短剧列表
   */
  async getDramaList(params: {
    page?: number;
    pageSize?: number;
    categoryIds?: string[];
    tags?: string[];
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const {
      page = 1,
      pageSize = 20,
      categoryIds,
      tags,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    const dramas = await dramaRepository.find({
      page,
      pageSize,
      categoryIds,
      tags,
      status,
      sortBy,
      sortOrder,
    });

    return {
      items: dramas.items,
      pagination: {
        page,
        pageSize,
        total: dramas.total,
        totalPages: Math.ceil(dramas.total / pageSize),
      },
    };
  }

  /**
   * 获取短剧详情
   * @param dramaId 短剧ID
   * @returns 短剧详情
   * @throws {NotFoundError} 短剧不存在时抛出错误
   */
  async getDramaById(dramaId: string) {
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new NotFoundError('短剧不存在');
    }

    // 增加浏览量
    await dramaRepository.incrementViewCount(dramaId);

    return {
      dramaId: drama.dramaId,
      title: drama.title,
      description: drama.description,
      coverImage: drama.coverImage,
      posterImage: drama.posterImage,
      categoryIds: drama.categoryIds,
      tags: drama.tags,
      totalEpisodes: drama.totalEpisodes,
      publishedEpisodes: drama.publishedEpisodes,
      status: drama.status,
      viewCount: drama.viewCount,
      likeCount: drama.likeCount,
      commentCount: drama.commentCount,
      creatorId: drama.creatorId,
      createdAt: drama.createdAt,
      publishedAt: drama.publishedAt,
    };
  }
}

export const dramaService = new DramaService();
```

#### 4.2 剧集管理逻辑

**代码实现**
```typescript
// backend/services/episode.service.ts
import { episodeRepository } from '@/repositories/episode.repository';
import { dramaRepository } from '@/repositories/drama.repository';
import { NotFoundError, ValidationError } from '@/errors';

export interface CreateEpisodeParams {
  dramaId: string;
  episodeNumber: number;
  title: string;
  description?: string;
  videoUrl: string;
  duration: number;
  thumbnailUrl?: string;
}

export class EpisodeService {
  /**
   * 创建剧集
   * @param params 剧集创建参数
   * @returns 创建的剧集信息
   * @throws {NotFoundError} 短剧不存在时抛出错误
   * @throws {ValidationError} 参数验证失败时抛出错误
   */
  async createEpisode(params: CreateEpisodeParams) {
    const {
      dramaId,
      episodeNumber,
      title,
      description,
      videoUrl,
      duration,
      thumbnailUrl,
    } = params;

    // 检查短剧是否存在
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new NotFoundError('短剧不存在');
    }

    // 验证剧集编号
    if (episodeNumber < 1 || episodeNumber > drama.totalEpisodes) {
      throw new ValidationError('剧集编号超出范围');
    }

    // 检查剧集是否已存在
    const existingEpisode = await episodeRepository.findByDramaIdAndEpisodeNumber(
      dramaId,
      episodeNumber
    );
    if (existingEpisode) {
      throw new ValidationError('该剧集已存在');
    }

    // 创建剧集
    const episode = await episodeRepository.create({
      dramaId,
      episodeNumber,
      title,
      description,
      videoUrl,
      duration,
      thumbnailUrl,
      status: 'published',
    });

    // 更新短剧的已发布集数
    await dramaRepository.incrementPublishedEpisodes(dramaId);

    return {
      episodeId: episode.episodeId,
      dramaId: episode.dramaId,
      episodeNumber: episode.episodeNumber,
      title: episode.title,
      description: episode.description,
      videoUrl: episode.videoUrl,
      duration: episode.duration,
      thumbnailUrl: episode.thumbnailUrl,
      status: episode.status,
      createdAt: episode.createdAt,
    };
  }

  /**
   * 获取短剧的剧集列表
   * @param dramaId 短剧ID
   * @returns 剧集列表
   * @throws {NotFoundError} 短剧不存在时抛出错误
   */
  async getEpisodesByDramaId(dramaId: string) {
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new NotFoundError('短剧不存在');
    }

    const episodes = await episodeRepository.findByDramaId(dramaId);

    return {
      items: episodes,
      total: episodes.length,
    };
  }

  /**
   * 获取剧集详情
   * @param episodeId 剧集ID
   * @returns 剧集详情
   * @throws {NotFoundError} 剧集不存在时抛出错误
   */
  async getEpisodeById(episodeId: string) {
    const episode = await episodeRepository.findById(episodeId);
    if (!episode) {
      throw new NotFoundError('剧集不存在');
    }

    // 增加播放量
    await episodeRepository.incrementViewCount(episodeId);

    return {
      episodeId: episode.episodeId,
      dramaId: episode.dramaId,
      episodeNumber: episode.episodeNumber,
      title: episode.title,
      description: episode.description,
      videoUrl: episode.videoUrl,
      duration: episode.duration,
      thumbnailUrl: episode.thumbnailUrl,
      status: episode.status,
      viewCount: episode.viewCount,
      createdAt: episode.createdAt,
    };
  }
}

export const episodeService = new EpisodeService();
```

### 5. 互动管理业务逻辑

#### 5.1 点赞管理逻辑

**代码实现**
```typescript
// backend/services/like.service.ts
import { likeRepository } from '@/repositories/like.repository';
import { dramaRepository } from '@/repositories/drama.repository';
import { NotFoundError, AlreadyLikedError, NotLikedError } from '@/errors';

export class LikeService {
  /**
   * 点赞短剧
   * @param userId 用户ID
   * @param dramaId 短剧ID
   * @returns 点赞结果
   * @throws {NotFoundError} 短剧不存在时抛出错误
   * @throws {AlreadyLikedError} 已经点赞时抛出错误
   */
  async likeDrama(userId: string, dramaId: string) {
    // 检查短剧是否存在
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new NotFoundError('短剧不存在');
    }

    // 检查是否已经点赞
    const existingLike = await likeRepository.findByUserAndDrama(userId, dramaId);
    if (existingLike) {
      throw new AlreadyLikedError('已经点赞该短剧');
    }

    // 创建点赞
    await likeRepository.create({
      userId,
      dramaId,
    });

    // 增加短剧点赞数
    await dramaRepository.incrementLikeCount(dramaId);

    return { success: true };
  }

  /**
   * 取消点赞
   * @param userId 用户ID
   * @param dramaId 短剧ID
   * @returns 取消点赞结果
   * @throws {NotLikedError} 未点赞时抛出错误
   */
  async unlikeDrama(userId: string, dramaId: string) {
    // 检查点赞是否存在
    const like = await likeRepository.findByUserAndDrama(userId, dramaId);
    if (!like) {
      throw new NotLikedError('未点赞该短剧');
    }

    // 删除点赞
    await likeRepository.delete(like.likeId);

    // 减少短剧点赞数
    await dramaRepository.decrementLikeCount(dramaId);

    return { success: true };
  }

  /**
   * 检查用户是否点赞短剧
   * @param userId 用户ID
   * @param dramaId 短剧ID
   * @returns 是否点赞
   */
  async isLiked(userId: string, dramaId: string): Promise<boolean> {
    const like = await likeRepository.findByUserAndDrama(userId, dramaId);
    return !!like;
  }
}

export const likeService = new LikeService();
```

#### 5.2 评论管理逻辑

**代码实现**
```typescript
// backend/services/comment.service.ts
import { commentRepository } from '@/repositories/comment.repository';
import { dramaRepository } from '@/repositories/drama.repository';
import { NotFoundError, ValidationError } from '@/errors';

export interface CreateCommentParams {
  dramaId: string;
  userId: string;
  content: string;
  parentId?: string;
}

export class CommentService {
  /**
   * 创建评论
   * @param params 评论创建参数
   * @returns 创建的评论信息
   * @throws {NotFoundError} 短剧不存在时抛出错误
   * @throws {ValidationError} 参数验证失败时抛出错误
   */
  async createComment(params: CreateCommentParams) {
    const { dramaId, userId, content, parentId } = params;

    // 检查短剧是否存在
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new NotFoundError('短剧不存在');
    }

    // 验证评论内容
    if (!content || content.trim().length === 0) {
      throw new ValidationError('评论内容不能为空');
    }

    if (content.length > 500) {
      throw new ValidationError('评论内容不能超过500字');
    }

    // 如果是回复评论，检查父评论是否存在
    if (parentId) {
      const parentComment = await commentRepository.findById(parentId);
      if (!parentComment) {
        throw new NotFoundError('父评论不存在');
      }

      if (parentComment.dramaId !== dramaId) {
        throw new ValidationError('父评论不属于该短剧');
      }
    }

    // 创建评论
    const comment = await commentRepository.create({
      dramaId,
      userId,
      content,
      parentId,
    });

    // 增加短剧评论数
    await dramaRepository.incrementCommentCount(dramaId);

    return {
      commentId: comment.commentId,
      dramaId: comment.dramaId,
      userId: comment.userId,
      content: comment.content,
      parentId: comment.parentId,
      likeCount: comment.likeCount,
      replyCount: comment.replyCount,
      createdAt: comment.createdAt,
    };
  }

  /**
   * 获取短剧的评论列表
   * @param dramaId 短剧ID
   * @param page 页码
   * @param pageSize 每页数量
   * @returns 评论列表
   * @throws {NotFoundError} 短剧不存在时抛出错误
   */
  async getCommentsByDramaId(dramaId: string, page: number = 1, pageSize: number = 20) {
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new NotFoundError('短剧不存在');
    }

    const comments = await commentRepository.findByDramaId(dramaId, page, pageSize);

    return {
      items: comments.items,
      pagination: {
        page,
        pageSize,
        total: comments.total,
        totalPages: Math.ceil(comments.total / pageSize),
      },
    };
  }

  /**
   * 删除评论
   * @param commentId 评论ID
   * @param userId 用户ID
   * @returns 删除结果
   * @throws {NotFoundError} 评论不存在时抛出错误
   * @throws {ValidationError} 无权删除评论时抛出错误
   */
  async deleteComment(commentId: string, userId: string) {
    const comment = await commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundError('评论不存在');
    }

    // 验证是否为评论作者
    if (comment.userId !== userId) {
      throw new ValidationError('无权删除该评论');
    }

    // 删除评论
    await commentRepository.delete(commentId);

    // 减少短剧评论数
    await dramaRepository.decrementCommentCount(comment.dramaId);

    return { success: true };
  }
}

export const commentService = new CommentService();
```

### 6. 星值管理业务逻辑

**代码实现**
```typescript
// backend/services/starValue.service.ts
import { starValueRepository } from '@/repositories/star-value.repository';
import { userRepository } from '@/repositories/user.repository';
import { NotFoundError, ValidationError } from '@/errors';

export interface StarValueTransactionParams {
  userId: string;
  amount: number;
  type: 'earn' | 'spend';
  reason: string;
  relatedId?: string;
}

export class StarValueService {
  /**
   * 增加星值
   * @param params 星值增加参数
   * @returns 星值交易结果
   * @throws {NotFoundError} 用户不存在时抛出错误
   * @throws {ValidationError} 参数验证失败时抛出错误
   */
  async earnStarValue(params: StarValueTransactionParams) {
    const { userId, amount, reason, relatedId } = params;

    // 验证金额
    if (amount <= 0) {
      throw new ValidationError('星值金额必须大于0');
    }

    // 检查用户是否存在
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('用户不存在');
    }

    // 创建星值交易记录
    const transaction = await starValueRepository.create({
      userId,
      amount,
      type: 'earn',
      reason,
      relatedId,
    });

    // 增加用户星值
    await userRepository.incrementStarValue(userId, amount);

    return {
      transactionId: transaction.transactionId,
      userId: transaction.userId,
      amount: transaction.amount,
      type: transaction.type,
      reason: transaction.reason,
      createdAt: transaction.createdAt,
    };
  }

  /**
   * 消费星值
   * @param params 星值消费参数
   * @returns 星值交易结果
   * @throws {NotFoundError} 用户不存在时抛出错误
   * @throws {ValidationError} 参数验证失败时抛出错误
   */
  async spendStarValue(params: StarValueTransactionParams) {
    const { userId, amount, reason, relatedId } = params;

    // 验证金额
    if (amount <= 0) {
      throw new ValidationError('星值金额必须大于0');
    }

    // 检查用户是否存在
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('用户不存在');
    }

    // 验证星值余额
    if (user.starValue < amount) {
      throw new ValidationError('星值余额不足');
    }

    // 创建星值交易记录
    const transaction = await starValueRepository.create({
      userId,
      amount,
      type: 'spend',
      reason,
      relatedId,
    });

    // 减少用户星值
    await userRepository.decrementStarValue(userId, amount);

    return {
      transactionId: transaction.transactionId,
      userId: transaction.userId,
      amount: transaction.amount,
      type: transaction.type,
      reason: transaction.reason,
      createdAt: transaction.createdAt,
    };
  }

  /**
   * 获取用户的星值交易记录
   * @param userId 用户ID
   * @param page 页码
   * @param pageSize 每页数量
   * @returns 星值交易记录列表
   */
  async getStarValueTransactions(userId: string, page: number = 1, pageSize: number = 20) {
    const transactions = await starValueRepository.findByUserId(userId, page, pageSize);

    return {
      items: transactions.items,
      pagination: {
        page,
        pageSize,
        total: transactions.total,
        totalPages: Math.ceil(transactions.total / pageSize),
      },
    };
  }

  /**
   * 获取用户的星值余额
   * @param userId 用户ID
   * @returns 星值余额
   * @throws {NotFoundError} 用户不存在时抛出错误
   */
  async getStarValueBalance(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('用户不存在');
    }

    return {
      userId: user.userId,
      starValue: user.starValue,
    };
  }
}

export const starValueService = new StarValueService();
```

### 7. 支付管理业务逻辑

**代码实现**
```typescript
// backend/services/payment.service.ts
import { paymentRepository } from '@/repositories/payment.repository';
import { dramaRepository } from '@/repositories/drama.repository';
import { NotFoundError, ValidationError } from '@/errors';

export interface CreatePaymentParams {
  userId: string;
  dramaId: string;
  amount: number;
  paymentMethod: string;
}

export class PaymentService {
  /**
   * 创建支付订单
   * @param params 支付创建参数
   * @returns 支付订单信息
   * @throws {NotFoundError} 短剧不存在时抛出错误
   * @throws {ValidationError} 参数验证失败时抛出错误
   */
  async createPayment(params: CreatePaymentParams) {
    const { userId, dramaId, amount, paymentMethod } = params;

    // 验证金额
    if (amount <= 0) {
      throw new ValidationError('支付金额必须大于0');
    }

    // 检查短剧是否存在
    const drama = await dramaRepository.findById(dramaId);
    if (!drama) {
      throw new NotFoundError('短剧不存在');
    }

    // 检查是否已购买
    const existingPayment = await paymentRepository.findByUserAndDrama(userId, dramaId);
    if (existingPayment && existingPayment.status === 'success') {
      throw new ValidationError('已购买该短剧');
    }

    // 创建支付订单
    const payment = await paymentRepository.create({
      userId,
      dramaId,
      amount,
      paymentMethod,
      status: 'pending',
    });

    return {
      paymentId: payment.paymentId,
      userId: payment.userId,
      dramaId: payment.dramaId,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      createdAt: payment.createdAt,
    };
  }

  /**
   * 完成支付
   * @param paymentId 支付订单ID
   * @returns 支付完成结果
   * @throws {NotFoundError} 支付订单不存在时抛出错误
   * @throws {ValidationError} 支付状态不允许完成时抛出错误
   */
  async completePayment(paymentId: string) {
    const payment = await paymentRepository.findById(paymentId);
    if (!payment) {
      throw new NotFoundError('支付订单不存在');
    }

    // 验证支付状态
    if (payment.status !== 'pending') {
      throw new ValidationError('支付状态不允许完成');
    }

    // 更新支付状态为成功
    const updatedPayment = await paymentRepository.update(paymentId, {
      status: 'success',
      completedAt: new Date(),
    });

    return {
      paymentId: updatedPayment.paymentId,
      status: updatedPayment.status,
      completedAt: updatedPayment.completedAt,
    };
  }

  /**
   * 获取用户的支付记录
   * @param userId 用户ID
   * @param page 页码
   * @param pageSize 每页数量
   * @returns 支付记录列表
   */
  async getPaymentHistory(userId: string, page: number = 1, pageSize: number = 20) {
    const payments = await paymentRepository.findByUserId(userId, page, pageSize);

    return {
      items: payments.items,
      pagination: {
        page,
        pageSize,
        total: payments.total,
        totalPages: Math.ceil(payments.total / pageSize),
      },
    };
  }
}

export const paymentService = new PaymentService();
```

### 8. 代码注释规范

#### 8.1 函数注释规范

**注释模板**
```typescript
/**
 * 函数简短描述
 * @param paramName 参数描述
 * @returns 返回值描述
 * @throws {ErrorType} 错误类型和描述
 * @example
 * ```typescript
 * const result = functionName(param1, param2);
 * ```
 */
```

**示例**
```typescript
/**
 * 创建新用户
 * @param params 用户注册参数
 * @returns 创建的用户信息
 * @throws {EmailAlreadyExistsError} 邮箱已存在时抛出错误
 * @example
 * ```typescript
 * const user = await userService.createUser({
 *   email: 'user@example.com',
 *   password: 'password123',
 *   nickname: '用户昵称',
 * });
 * ```
 */
async createUser(params: CreateUserParams) {
  // 实现代码
}
```

#### 8.2 类注释规范

**注释模板**
```typescript
/**
 * 类简短描述
 * @class ClassName
 * @description 类的详细描述
 * @author 作者
 * @version 版本
 */
```

**示例**
```typescript
/**
 * 用户服务类 - 处理用户相关业务逻辑
 * @class UserService
 * @description 提供用户注册、登录、信息更新等功能
 * @author YYC³
 * @version 1.0.0
 */
export class UserService {
  // 类实现
}
```

#### 8.3 行内注释规范

**注释规范**
```typescript
// 单行注释：简短说明

/*
 * 多行注释：
 * 详细说明
 * 可以有多行
 */

// TODO: 待办事项
// FIXME: 需要修复的问题
// HACK: 临时解决方案
// NOTE: 重要说明
```

**示例**
```typescript
async createUser(params: CreateUserParams) {
  // 检查邮箱是否已存在
  const existingUser = await userRepository.findByEmail(params.email);
  if (existingUser) {
    throw new EmailAlreadyExistsError('邮箱已被注册');
  }

  // 加密密码
  const hashedPassword = await hashPassword(params.password);

  // 创建用户
  const user = await userRepository.create({
    email: params.email,
    password: hashedPassword,
    nickname: params.nickname,
  });

  // 生成JWT令牌
  const token = generateToken({
    userId: user.userId,
    email: user.email,
    role: user.role,
  });

  return { user, token };
}
```

### 9. 总结

本文档详细描述了YYC3-Short-Drama短剧平台的核心业务逻辑代码实现，包括用户管理、短剧管理、互动管理、星值管理、支付管理等核心业务逻辑的代码实现与注释规范。通过这些业务逻辑的实现，可以确保平台功能完整、逻辑正确、性能稳定，为平台的稳定运行和业务扩展提供坚实的业务逻辑基础。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
