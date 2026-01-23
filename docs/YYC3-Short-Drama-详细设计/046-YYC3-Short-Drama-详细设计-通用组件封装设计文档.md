---
@file: 046-YYC3-Short-Drama-详细设计-通用组件封装设计文档.md
@description: YYC3-Short-Drama 前端/后端通用组件的封装原则与复用规范，提升开发效率
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [详细设计],[组件封装],[复用设计]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 046-YYC3-Short-Drama-详细设计-通用组件封装设计文档

## 概述

本文档详细描述YYC3-Short-Drama短剧平台的通用组件封装设计，包括前端/后端通用组件的封装原则与复用规范，为开发团队提供清晰的组件开发指导。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的AI驱动短剧创作与分发平台，致力于通过人工智能技术赋能短剧内容创作，打造智能化的短剧生态体系。平台融合AI剧本生成、智能推荐、VR/AR沉浸式体验、星值经济体系等创新功能，为用户提供从创作到消费的全链路服务。通用组件的封装和复用是提升开发效率、保证代码质量的关键。

#### 1.2 文档目标
- 提供完整的通用组件封装设计规范
- 详细描述前端和后端通用组件的设计原则
- 提供组件复用规范和最佳实践
- 为开发团队提供清晰的组件开发指导
- 确保组件开发符合YYC³标准规范

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保组件稳定运行，保障用户体验
- **高性能**：优化组件渲染和执行性能，提升用户体验
- **高安全性**：保护组件中的数据和隐私安全，建立安全防护
- **高扩展性**：支持组件快速扩展，适应业务需求变化
- **高可维护性**：便于后续维护和升级，降低维护成本

#### 2.2 五标体系
- **标准化**：统一的组件设计和开发标准
- **规范化**：严格的组件编码规范和代码审查
- **自动化**：使用自动化工具提高组件开发效率
- **智能化**：使用智能工具辅助组件开发
- **可视化**：使用可视化工具监控组件状态

#### 2.3 五化架构
- **流程化**：标准化的组件开发流程和审查流程
- **文档化**：完善的组件注释和文档
- **工具化**：使用高效的组件开发工具和测试工具
- **数字化**：使用数字化工具管理组件
- **生态化**：使用开源组件库和框架

### 3. 组件封装原则

#### 3.1 单一职责原则

**原则说明**
- 每个组件只负责一个功能
- 组件内部逻辑清晰，职责明确
- 避免组件功能过于复杂

**示例**
```typescript
// ❌ 错误示例：组件职责过多
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);

  // 用户信息展示
  // 关注功能
  // 点赞功能
  // 编辑功能
  // ...多个功能混合在一起
};

// ✅ 正确示例：组件职责单一
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <UserAvatar user={user} />
      <UserInfo user={user} />
      <UserActions userId={user.userId} />
    </div>
  );
};

export const UserAvatar: React.FC<{ user: User }> = ({ user }) => {
  return <img src={user.avatar} alt={user.nickname} />;
};

export const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <h3>{user.nickname}</h3>
      <p>{user.bio}</p>
    </div>
  );
};

export const UserActions: React.FC<{ userId: string }> = ({ userId }) => {
  return (
    <div>
      <FollowButton userId={userId} />
      <LikeButton userId={userId} />
    </div>
  );
};
```

#### 3.2 开闭原则

**原则说明**
- 组件对扩展开放，对修改关闭
- 通过props和配置扩展组件功能
- 避免直接修改组件内部实现

**示例**
```typescript
// ❌ 错误示例：直接修改组件
export const Button: React.FC = () => {
  return <button className="btn-primary">点击</button>;
};

// ✅ 正确示例：通过props扩展组件
export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={`btn btn-${type} btn-${size}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? '加载中...' : children}
    </button>
  );
};
```

#### 3.3 接口隔离原则

**原则说明**
- 组件接口应该最小化
- 只暴露必要的props和方法
- 避免不必要的依赖和耦合

**示例**
```typescript
// ❌ 错误示例：接口过于复杂
export interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onFollow: (userId: string) => void;
  onUnfollow: (userId: string) => void;
  onLike: (userId: string) => void;
  onUnlike: (userId: string) => void;
  onShare: (userId: string) => void;
  onBlock: (userId: string) => void;
  onReport: (userId: string) => void;
  // ...过多的props
}

// ✅ 正确示例：接口最小化
export interface UserCardProps {
  user: User;
  onAction?: (action: string, userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onAction }) => {
  const handleAction = (action: string) => {
    onAction?.(action, user.userId);
  };

  return (
    <div className="user-card">
      <UserAvatar user={user} />
      <UserInfo user={user} />
      <UserActions onAction={handleAction} />
    </div>
  );
};
```

#### 3.4 依赖倒置原则

**原则说明**
- 组件应该依赖抽象而不是具体实现
- 使用依赖注入的方式传递依赖
- 提高组件的可测试性和可复用性

**示例**
```typescript
// ❌ 错误示例：直接依赖具体实现
export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return <div>{/* 用户列表 */}</div>;
};

// ✅ 正确示例：依赖抽象
export interface UserService {
  getUsers(): Promise<User[]>;
}

export interface UserListProps {
  userService: UserService;
}

export const UserList: React.FC<UserListProps> = ({ userService }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.getUsers().then(setUsers);
  }, [userService]);

  return <div>{/* 用户列表 */}</div>;
};

// 使用依赖注入
<UserList userService={userService} />
```

### 4. 前端通用组件设计

#### 4.1 基础UI组件

**Button组件**
```typescript
// shared/components/ui/Button.tsx
import React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  block?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  block = false,
  className,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'yyc-button',
        `yyc-button--${variant}`,
        `yyc-button--${size}`,
        block && 'yyc-button--block',
        loading && 'yyc-button--loading',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="yyc-button__spinner" />}
      {icon && <span className="yyc-button__icon">{icon}</span>}
      <span className="yyc-button__content">{children}</span>
    </button>
  );
};
```

**Input组件**
```typescript
// shared/components/ui/Input.tsx
import React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  prefix,
  suffix,
  className,
  ...props
}) => {
  return (
    <div className="yyc-input-wrapper">
      {label && <label className="yyc-input__label">{label}</label>}
      <div className="yyc-input__container">
        {prefix && <span className="yyc-input__prefix">{prefix}</span>}
        <input
          className={cn(
            'yyc-input',
            error && 'yyc-input--error',
            className
          )}
          {...props}
        />
        {suffix && <span className="yyc-input__suffix">{suffix}</span>}
      </div>
      {error && <span className="yyc-input__error">{error}</span>}
    </div>
  );
};
```

**Modal组件**
```typescript
// shared/components/ui/Modal.tsx
import React, { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  footer,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  if (!open) return null;

  return (
    <div className="yyc-modal-backdrop" ref={modalRef} onClick={handleBackdropClick}>
      <div className={cn('yyc-modal', className)}>
        {title && (
          <div className="yyc-modal__header">
            <h2 className="yyc-modal__title">{title}</h2>
            <button className="yyc-modal__close" onClick={onClose}>
              ×
            </button>
          </div>
        )}
        <div className="yyc-modal__body">{children}</div>
        {footer && <div className="yyc-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};
```

#### 4.2 业务组件

**UserCard组件**
```typescript
// shared/components/business/UserCard.tsx
import React from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types/user';

export interface UserCardProps {
  user: User;
  onFollow?: (userId: string) => void;
  onUnfollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  showActions?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onFollow,
  onUnfollow,
  onMessage,
  showActions = true,
}) => {
  const [following, setFollowing] = React.useState(user.isFollowing);

  const handleFollow = () => {
    if (following) {
      onUnfollow?.(user.userId);
      setFollowing(false);
    } else {
      onFollow?.(user.userId);
      setFollowing(true);
    }
  };

  return (
    <div className="yyc-user-card">
      <Avatar src={user.avatar} alt={user.nickname} size="large" />
      <div className="yyc-user-card__info">
        <h3 className="yyc-user-card__name">{user.nickname}</h3>
        <p className="yyc-user-card__bio">{user.bio}</p>
        <div className="yyc-user-card__stats">
          <span>{user.followersCount} 粉丝</span>
          <span>{user.followingCount} 关注</span>
        </div>
      </div>
      {showActions && (
        <div className="yyc-user-card__actions">
          <Button
            variant={following ? 'ghost' : 'primary'}
            size="small"
            onClick={handleFollow}
          >
            {following ? '已关注' : '关注'}
          </Button>
          <Button variant="ghost" size="small" onClick={() => onMessage?.(user.userId)}>
            私信
          </Button>
        </div>
      )}
    </div>
  );
};
```

**DramaCard组件**
```typescript
// shared/components/business/DramaCard.tsx
import React from 'react';
import { Image } from '@/components/ui/Image';
import { Button } from '@/components/ui/Button';
import type { Drama } from '@/types/drama';

export interface DramaCardProps {
  drama: Drama;
  onClick?: (dramaId: string) => void;
  onLike?: (dramaId: string) => void;
  onFavorite?: (dramaId: string) => void;
  onShare?: (dramaId: string) => void;
  showActions?: boolean;
}

export const DramaCard: React.FC<DramaCardProps> = ({
  drama,
  onClick,
  onLike,
  onFavorite,
  onShare,
  showActions = true,
}) => {
  const [liked, setLiked] = React.useState(drama.isLiked);
  const [favorited, setFavorited] = React.useState(drama.isFavorited);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      onLike?.(drama.dramaId);
    }
  };

  const handleFavorite = () => {
    if (favorited) {
      setFavorited(false);
    } else {
      setFavorited(true);
      onFavorite?.(drama.dramaId);
    }
  };

  return (
    <div className="yyc-drama-card" onClick={() => onClick?.(drama.dramaId)}>
      <div className="yyc-drama-card__cover">
        <Image src={drama.coverImage} alt={drama.title} />
        <span className="yyc-drama-card__episodes">
          {drama.publishedEpisodes}/{drama.totalEpisodes}集
        </span>
      </div>
      <div className="yyc-drama-card__info">
        <h3 className="yyc-drama-card__title">{drama.title}</h3>
        <p className="yyc-drama-card__description">{drama.description}</p>
        <div className="yyc-drama-card__stats">
          <span>👁 {drama.viewCount}</span>
          <span>👍 {drama.likeCount}</span>
          <span>💬 {drama.commentCount}</span>
        </div>
      </div>
      {showActions && (
        <div className="yyc-drama-card__actions">
          <Button
            variant="ghost"
            size="small"
            icon={liked ? '❤️' : '🤍'}
            onClick={handleLike}
          />
          <Button
            variant="ghost"
            size="small"
            icon={favorited ? '⭐' : '☆'}
            onClick={handleFavorite}
          />
          <Button
            variant="ghost"
            size="small"
            icon="📤"
            onClick={() => onShare?.(drama.dramaId)}
          />
        </div>
      )}
    </div>
  );
};
```

#### 4.3 布局组件

**Container组件**
```typescript
// shared/components/layout/Container.tsx
import React from 'react';
import { cn } from '@/utils/cn';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  maxWidth = 'lg',
}) => {
  return (
    <div className={cn('yyc-container', `yyc-container--${maxWidth}`, className)}>
      {children}
    </div>
  );
};
```

**Grid组件**
```typescript
// shared/components/layout/Grid.tsx
import React from 'react';
import { cn } from '@/utils/cn';

export interface GridProps {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 3,
  gap = 16,
  className,
}) => {
  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: `${gap}px`,
  };

  return (
    <div className={cn('yyc-grid', className)} style={style}>
      {children}
    </div>
  );
};
```

### 5. 后端通用组件设计

#### 5.1 中间件组件

**认证中间件**
```typescript
// shared/middleware/auth.middleware.ts
import { Context, Next } from 'hono';
import { verifyToken } from '@/utils/jwt';
import { UnauthorizedError } from '@/errors';

export const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new UnauthorizedError('未提供认证令牌');
  }

  try {
    const decoded = verifyToken(token);
    c.set('userId', decoded.userId);
    c.set('userRole', decoded.role);
    await next();
  } catch (error) {
    throw new UnauthorizedError('无效的认证令牌');
  }
};
```

**角色中间件**
```typescript
// shared/middleware/role.middleware.ts
import { Context, Next } from 'hono';
import { ForbiddenError } from '@/errors';

export const roleMiddleware = (roles: string[]) => {
  return async (c: Context, next: Next) => {
    const userRole = c.get('userRole');

    if (!roles.includes(userRole)) {
      throw new ForbiddenError('权限不足');
    }

    await next();
  };
};
```

**限流中间件**
```typescript
// shared/middleware/rateLimit.middleware.ts
import { Context, Next } from 'hono';
import { TooManyRequestsError } from '@/errors';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const requestMap = new Map<string, { count: number; resetTime: number }>();

export const rateLimitMiddleware = (config: RateLimitConfig) => {
  return async (c: Context, next: Next) => {
    const clientId = c.req.header('X-Client-ID') || c.req.header('X-Forwarded-For') || 'unknown';
    const now = Date.now();

    let clientData = requestMap.get(clientId);

    if (!clientData || now > clientData.resetTime) {
      clientData = {
        count: 0,
        resetTime: now + config.windowMs,
      };
      requestMap.set(clientId, clientData);
    }

    if (clientData.count >= config.maxRequests) {
      throw new TooManyRequestsError('请求过于频繁');
    }

    clientData.count++;
    await next();
  };
};
```

#### 5.2 验证组件

**请求验证器**
```typescript
// shared/validators/request.validator.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(8, '密码至少8位'),
  nickname: z.string().min(2, '昵称至少2位'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确').optional(),
  bio: z.string().max(500, '简介最多500字').optional(),
});

export const updateUserSchema = z.object({
  nickname: z.string().min(2, '昵称至少2位').optional(),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确').optional(),
  bio: z.string().max(500, '简介最多500字').optional(),
  avatar: z.string().url('头像URL格式不正确').optional(),
});

export const createDramaSchema = z.object({
  title: z.string().min(2, '标题至少2位').max(100, '标题最多100字'),
  description: z.string().min(10, '简介至少10字').max(500, '简介最多500字'),
  coverImage: z.string().url('封面图URL格式不正确'),
  posterImage: z.string().url('海报图URL格式不正确').optional(),
  categoryIds: z.array(z.string()).min(1, '至少选择一个分类'),
  tags: z.array(z.string()).optional(),
  totalEpisodes: z.number().min(1, '至少1集'),
});
```

**验证中间件**
```typescript
// shared/middleware/validation.middleware.ts
import { Context, Next } from 'hono';
import { z } from 'zod';
import { ValidationError } from '@/errors';

export const validationMiddleware = <T extends z.ZodTypeAny>(schema: T) => {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      const validatedData = schema.parse(body);
      c.set('validatedData', validatedData);
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.errors[0].message);
      }
      throw error;
    }
  };
};
```

#### 5.3 错误处理组件

**错误处理器**
```typescript
// shared/errors/error.handler.ts
import { Context, Next } from 'hono';
import { AppError, NotFoundError, UnauthorizedError, ForbiddenError, ValidationError } from '@/errors';

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error('Error:', error);

    if (error instanceof AppError) {
      return c.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
          },
        },
        error.statusCode
      );
    }

    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: error.errors[0].message,
          },
        },
        400
      );
    }

    return c.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '服务器内部错误',
        },
      },
      500
    );
  }
};
```

**错误类**
```typescript
// shared/errors/app.error.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_SERVER_ERROR'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = '资源不存在') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = '未授权') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = '禁止访问') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string = '参数验证失败') {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message: string = '请求过于频繁') {
    super(message, 429, 'TOO_MANY_REQUESTS');
    this.name = 'TooManyRequestsError';
  }
}
```

### 6. 组件复用规范

#### 6.1 组件命名规范

**命名规则**
- 组件名称使用PascalCase
- 组件文件名与组件名称一致
- 组件目录按功能分类

**示例**
```
components/
├── ui/                    # UI基础组件
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── Avatar.tsx
├── business/              # 业务组件
│   ├── UserCard.tsx
│   ├── DramaCard.tsx
│   └── CommentList.tsx
└── layout/               # 布局组件
    ├── Container.tsx
    ├── Grid.tsx
    └── Header.tsx
```

#### 6.2 组件文档规范

**组件文档模板**
```typescript
/**
 * @file Button组件
 * @description 通用按钮组件，支持多种样式和尺寸
 * @component Button
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   点击我
 * </Button>
 * ```
 * @author YYC³
 * @version 1.0.0
 */

import React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮样式变体 */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 是否加载中 */
  loading?: boolean;
  /** 图标 */
  icon?: React.ReactNode;
  /** 是否块级按钮 */
  block?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  block = false,
  className,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'yyc-button',
        `yyc-button--${variant}`,
        `yyc-button--${size}`,
        block && 'yyc-button--block',
        loading && 'yyc-button--loading',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="yyc-button__spinner" />}
      {icon && <span className="yyc-button__icon">{icon}</span>}
      <span className="yyc-button__content">{children}</span>
    </button>
  );
};
```

#### 6.3 组件测试规范

**测试模板**
```typescript
// shared/components/ui/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should show loading state when loading prop is true', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText('加载中...')).toBeInTheDocument();
  });

  it('should apply correct variant class', () => {
    const { container } = render(<Button variant="secondary">Click me</Button>);
    expect(container.firstChild).toHaveClass('yyc-button--secondary');
  });

  it('should apply correct size class', () => {
    const { container } = render(<Button size="large">Click me</Button>);
    expect(container.firstChild).toHaveClass('yyc-button--large');
  });
});
```

### 7. 组件性能优化

#### 7.1 React性能优化

**使用React.memo**
```typescript
export const UserCard = React.memo<UserCardProps>(({ user }) => {
  return (
    <div className="user-card">
      <Avatar src={user.avatar} alt={user.nickname} />
      <h3>{user.nickname}</h3>
    </div>
  );
});
```

**使用useMemo**
```typescript
export const DramaList: React.FC<DramaListProps> = ({ dramas }) => {
  const sortedDramas = useMemo(() => {
    return [...dramas].sort((a, b) => b.viewCount - a.viewCount);
  }, [dramas]);

  return (
    <div>
      {sortedDramas.map(drama => (
        <DramaCard key={drama.dramaId} drama={drama} />
      ))}
    </div>
  );
};
```

**使用useCallback**
```typescript
export const UserActions: React.FC<UserActionsProps> = ({ userId, onFollow, onUnfollow }) => {
  const handleFollow = useCallback(() => {
    onFollow(userId);
  }, [userId, onFollow]);

  const handleUnfollow = useCallback(() => {
    onUnfollow(userId);
  }, [userId, onUnfollow]);

  return (
    <div>
      <Button onClick={handleFollow}>关注</Button>
      <Button onClick={handleUnfollow}>取消关注</Button>
    </div>
  );
};
```

#### 7.2 代码分割

**动态导入**
```typescript
import { lazy, Suspense } from 'react';

const DramaCard = lazy(() => import('./DramaCard'));
const UserCard = lazy(() => import('./UserCard'));

export const DramaList: React.FC = ({ dramas }) => {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      {dramas.map(drama => (
        <DramaCard key={drama.dramaId} drama={drama} />
      ))}
    </Suspense>
  );
};
```

### 8. 总结

本文档详细描述了YYC3-Short-Drama短剧平台的通用组件封装设计，包括前端/后端通用组件的封装原则与复用规范。通过这些设计原则和规范的实施，可以确保组件开发高效、稳定、可维护，为平台的稳定运行和业务扩展提供坚实的组件基础。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
