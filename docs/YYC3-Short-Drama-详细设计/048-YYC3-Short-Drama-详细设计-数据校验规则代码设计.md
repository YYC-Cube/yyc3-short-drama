---
@file: 048-YYC3-Short-Drama-详细设计-数据校验规则代码设计.md
@description: YYC3-Short-Drama 前后端数据校验规则的代码实现，包含参数、格式、业务规则校验
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [详细设计],[数据校验],[规则实现]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 048-YYC3-Short-Drama-详细设计-数据校验规则代码设计

## 概述

本文档详细描述YYC3-Short-Drama短剧平台的数据校验规则代码设计，包括前端/后端数据校验规则的代码实现，包含参数校验、格式校验、业务规则校验等。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的AI驱动短剧创作与分发平台，致力于通过人工智能技术赋能短剧内容创作，打造智能化的短剧生态体系。平台融合AI剧本生成、智能推荐、VR/AR沉浸式体验、星值经济体系等创新功能，为用户提供从创作到消费的全链路服务。数据校验是保证数据质量和系统安全的关键环节。

#### 1.2 文档目标
- 提供完整的数据校验规则代码设计规范
- 详细描述前端和后端数据校验规则的实现
- 提供数据校验的最佳实践
- 为开发团队提供清晰的数据校验开发指导
- 确保数据校验实现符合YYC³标准规范

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保数据校验稳定运行，保障数据质量
- **高性能**：优化数据校验性能，提升系统效率
- **高安全性**：保护数据校验过程中的数据安全，建立安全防护
- **高扩展性**：支持数据校验快速扩展，适应业务需求变化
- **高可维护性**：便于后续维护和升级，降低维护成本

#### 2.2 五标体系
- **标准化**：统一的数据校验设计和开发标准
- **规范化**：严格的数据校验编码规范和代码审查
- **自动化**：使用自动化工具提高数据校验开发效率
- **智能化**：使用智能工具辅助数据校验
- **可视化**：使用可视化工具监控数据校验状态

#### 2.3 五化架构
- **流程化**：标准化的数据校验流程和审查流程
- **文档化**：完善的数据校验注释和文档
- **工具化**：使用高效的数据校验开发工具和测试工具
- **数字化**：使用数字化工具管理数据校验
- **生态化**：使用开源数据校验库和框架

### 3. 前端数据校验

#### 3.1 表单校验

**使用Zod进行表单校验**
```typescript
// frontend/validations/user.validation.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z
    .string()
    .min(1, '邮箱不能为空')
    .email('邮箱格式不正确'),
  password: z
    .string()
    .min(1, '密码不能为空')
    .min(8, '密码至少8位')
    .regex(/[A-Z]/, '密码必须包含大写字母')
    .regex(/[a-z]/, '密码必须包含小写字母')
    .regex(/[0-9]/, '密码必须包含数字')
    .regex(/[^A-Za-z0-9]/, '密码必须包含特殊字符'),
  confirmPassword: z
    .string()
    .min(1, '确认密码不能为空'),
  nickname: z
    .string()
    .min(1, '昵称不能为空')
    .min(2, '昵称至少2位')
    .max(20, '昵称最多20位'),
  phone: z
    .string()
    .optional()
    .regex(/^1[3-9]\d{9}$/, '手机号格式不正确'),
  bio: z
    .string()
    .optional()
    .max(500, '简介最多500字'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次密码输入不一致',
  path: ['confirmPassword'],
});

export const updateUserSchema = z.object({
  nickname: z
    .string()
    .min(2, '昵称至少2位')
    .max(20, '昵称最多20位')
    .optional(),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '手机号格式不正确')
    .optional(),
  bio: z
    .string()
    .max(500, '简介最多500字')
    .optional(),
  avatar: z
    .string()
    .url('头像URL格式不正确')
    .optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '邮箱不能为空')
    .email('邮箱格式不正确'),
  password: z
    .string()
    .min(1, '密码不能为空'),
});
```

**使用React Hook Form进行表单管理**
```typescript
// frontend/components/forms/UserForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '@/validations/user.validation';

export const UserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await userService.createUser(data);
      alert('注册成功');
    } catch (error) {
      alert('注册失败');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>邮箱</label>
        <input type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>密码</label>
        <input type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label>确认密码</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>

      <div>
        <label>昵称</label>
        <input type="text" {...register('nickname')} />
        {errors.nickname && <span>{errors.nickname.message}</span>}
      </div>

      <div>
        <label>手机号</label>
        <input type="tel" {...register('phone')} />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      <div>
        <label>简介</label>
        <textarea {...register('bio')} />
        {errors.bio && <span>{errors.bio.message}</span>}
      </div>

      <button type="submit">注册</button>
    </form>
  );
};
```

#### 3.2 短剧表单校验

**短剧创建校验**
```typescript
// frontend/validations/drama.validation.ts
import { z } from 'zod';

export const createDramaSchema = z.object({
  title: z
    .string()
    .min(1, '标题不能为空')
    .min(2, '标题至少2位')
    .max(100, '标题最多100字'),
  description: z
    .string()
    .min(1, '描述不能为空')
    .min(10, '描述至少10字')
    .max(500, '描述最多500字'),
  coverImage: z
    .string()
    .min(1, '封面图不能为空')
    .url('封面图URL格式不正确'),
  posterImage: z
    .string()
    .url('海报图URL格式不正确')
    .optional(),
  categoryIds: z
    .array(z.string())
    .min(1, '至少选择一个分类'),
  tags: z
    .array(z.string())
    .max(10, '最多10个标签')
    .optional(),
  totalEpisodes: z
    .number()
    .min(1, '总集数必须大于0')
    .max(1000, '总集数不能超过1000'),
});

export const createEpisodeSchema = z.object({
  dramaId: z
    .string()
    .min(1, '短剧ID不能为空'),
  episodeNumber: z
    .number()
    .min(1, '剧集编号必须大于0'),
  title: z
    .string()
    .min(1, '标题不能为空')
    .min(2, '标题至少2位')
    .max(100, '标题最多100字'),
  description: z
    .string()
    .max(500, '描述最多500字')
    .optional(),
  videoUrl: z
    .string()
    .min(1, '视频URL不能为空')
    .url('视频URL格式不正确'),
  duration: z
    .number()
    .min(1, '时长必须大于0')
    .max(3600, '时长不能超过3600秒'),
  thumbnailUrl: z
    .string()
    .url('缩略图URL格式不正确')
    .optional(),
});
```

#### 3.3 评论表单校验

**评论创建校验**
```typescript
// frontend/validations/comment.validation.ts
import { z } from 'zod';

export const createCommentSchema = z.object({
  dramaId: z
    .string()
    .min(1, '短剧ID不能为空'),
  content: z
    .string()
    .min(1, '评论内容不能为空')
    .min(1, '评论内容至少1字')
    .max(500, '评论内容最多500字'),
  parentId: z
    .string()
    .optional(),
});
```

### 4. 后端数据校验

#### 4.1 请求参数校验

**使用Zod进行请求参数校验**
```typescript
// backend/validations/user.validation.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z
    .string()
    .email('邮箱格式不正确'),
  password: z
    .string()
    .min(8, '密码至少8位')
    .regex(/[A-Z]/, '密码必须包含大写字母')
    .regex(/[a-z]/, '密码必须包含小写字母')
    .regex(/[0-9]/, '密码必须包含数字')
    .regex(/[^A-Za-z0-9]/, '密码必须包含特殊字符'),
  nickname: z
    .string()
    .min(2, '昵称至少2位')
    .max(20, '昵称最多20位'),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '手机号格式不正确')
    .optional(),
  bio: z
    .string()
    .max(500, '简介最多500字')
    .optional(),
});

export const updateUserSchema = z.object({
  nickname: z
    .string()
    .min(2, '昵称至少2位')
    .max(20, '昵称最多20位')
    .optional(),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '手机号格式不正确')
    .optional(),
  bio: z
    .string()
    .max(500, '简介最多500字')
    .optional(),
  avatar: z
    .string()
    .url('头像URL格式不正确')
    .optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email('邮箱格式不正确'),
  password: z
    .string(),
});
```

**使用校验中间件**
```typescript
// backend/middleware/validation.middleware.ts
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

**在路由中使用校验中间件**
```typescript
// backend/routes/user.routes.ts
import { Hono } from 'hono';
import { validationMiddleware } from '@/middleware/validation.middleware';
import { createUserSchema, updateUserSchema } from '@/validations/user.validation';
import { userController } from '@/controllers/user.controller';

const app = new Hono();

app.post('/', validationMiddleware(createUserSchema), userController.createUser);
app.put('/:userId', validationMiddleware(updateUserSchema), userController.updateUser);

export default app;
```

#### 4.2 短剧数据校验

**短剧创建校验**
```typescript
// backend/validations/drama.validation.ts
import { z } from 'zod';

export const createDramaSchema = z.object({
  title: z
    .string()
    .min(2, '标题至少2位')
    .max(100, '标题最多100字'),
  description: z
    .string()
    .min(10, '描述至少10字')
    .max(500, '描述最多500字'),
  coverImage: z
    .string()
    .url('封面图URL格式不正确'),
  posterImage: z
    .string()
    .url('海报图URL格式不正确')
    .optional(),
  categoryIds: z
    .array(z.string())
    .min(1, '至少选择一个分类'),
  tags: z
    .array(z.string())
    .max(10, '最多10个标签')
    .optional(),
  totalEpisodes: z
    .number()
    .min(1, '总集数必须大于0')
    .max(1000, '总集数不能超过1000'),
});

export const createEpisodeSchema = z.object({
  dramaId: z
    .string(),
  episodeNumber: z
    .number()
    .min(1, '剧集编号必须大于0'),
  title: z
    .string()
    .min(2, '标题至少2位')
    .max(100, '标题最多100字'),
  description: z
    .string()
    .max(500, '描述最多500字')
    .optional(),
  videoUrl: z
    .string()
    .url('视频URL格式不正确'),
  duration: z
    .number()
    .min(1, '时长必须大于0')
    .max(3600, '时长不能超过3600秒'),
  thumbnailUrl: z
    .string()
    .url('缩略图URL格式不正确')
    .optional(),
});
```

#### 4.3 评论数据校验

**评论创建校验**
```typescript
// backend/validations/comment.validation.ts
import { z } from 'zod';

export const createCommentSchema = z.object({
  dramaId: z
    .string(),
  content: z
    .string()
    .min(1, '评论内容至少1字')
    .max(500, '评论内容最多500字'),
  parentId: z
    .string()
    .optional(),
});
```

### 5. 业务规则校验

#### 5.1 用户业务规则校验

**邮箱唯一性校验**
```typescript
// backend/validations/business/user.business.validation.ts
import { userRepository } from '@/repositories/user.repository';
import { ValidationError } from '@/errors';

export async function validateEmailUnique(email: string, excludeUserId?: string) {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser && existingUser.userId !== excludeUserId) {
    throw new ValidationError('邮箱已被注册');
  }
}

export async function validateNicknameUnique(nickname: string, excludeUserId?: string) {
  const existingUser = await userRepository.findByNickname(nickname);
  if (existingUser && existingUser.userId !== excludeUserId) {
    throw new ValidationError('昵称已被使用');
  }
}
```

#### 5.2 短剧业务规则校验

**短剧状态校验**
```typescript
// backend/validations/business/drama.business.validation.ts
import { dramaRepository } from '@/repositories/drama.repository';
import { ValidationError } from '@/errors';

export async function validateDramaExists(dramaId: string) {
  const drama = await dramaRepository.findById(dramaId);
  if (!drama) {
    throw new ValidationError('短剧不存在');
  }
  return drama;
}

export async function validateDramaOwner(dramaId: string, userId: string) {
  const drama = await validateDramaExists(dramaId);
  if (drama.creatorId !== userId) {
    throw new ValidationError('无权操作该短剧');
  }
  return drama;
}

export async function validateDramaPublishable(dramaId: string) {
  const drama = await validateDramaExists(dramaId);
  if (drama.status !== 'draft') {
    throw new ValidationError('短剧状态不允许发布');
  }
  if (drama.publishedEpisodes === 0) {
    throw new ValidationError('至少需要发布一集才能发布短剧');
  }
  return drama;
}
```

#### 5.3 关注业务规则校验

**关注关系校验**
```typescript
// backend/validations/business/follow.business.validation.ts
import { followRepository } from '@/repositories/follow.repository';
import { userRepository } from '@/repositories/user.repository';
import { ValidationError } from '@/errors';

export async function validateUserExists(userId: string) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new ValidationError('用户不存在');
  }
  return user;
}

export async function validateNotSelf(followerId: string, followingId: string) {
  if (followerId === followingId) {
    throw new ValidationError('不能关注自己');
  }
}

export async function validateNotFollowing(followerId: string, followingId: string) {
  const existingFollow = await followRepository.findByUsers(followerId, followingId);
  if (existingFollow) {
    throw new ValidationError('已经关注该用户');
  }
}

export async function validateFollowing(followerId: string, followingId: string) {
  const follow = await followRepository.findByUsers(followerId, followingId);
  if (!follow) {
    throw new ValidationError('未关注该用户');
  }
  return follow;
}
```

### 6. 自定义校验规则

#### 6.1 自定义校验器

**密码强度校验器**
```typescript
// backend/validators/password.validator.ts
import { z } from 'zod';

export const passwordStrengthValidator = (value: string) => {
  let strength = 0;
  
  if (value.length >= 8) strength += 1;
  if (value.length >= 12) strength += 1;
  if (/[A-Z]/.test(value)) strength += 1;
  if (/[a-z]/.test(value)) strength += 1;
  if (/[0-9]/.test(value)) strength += 1;
  if (/[^A-Za-z0-9]/.test(value)) strength += 1;
  
  return strength;
};

export const strongPasswordSchema = z
  .string()
  .min(8, '密码至少8位')
  .refine((value) => passwordStrengthValidator(value) >= 4, {
    message: '密码强度不足',
  });
```

**URL格式校验器**
```typescript
// backend/validators/url.validator.ts
import { z } from 'zod';

export const imageUrlValidator = z
  .string()
  .url('URL格式不正确')
  .refine((value) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const extension = value.substring(value.lastIndexOf('.')).toLowerCase();
    return allowedExtensions.includes(extension);
  }, {
    message: '只支持jpg、jpeg、png、gif、webp格式的图片',
  });

export const videoUrlValidator = z
  .string()
  .url('URL格式不正确')
  .refine((value) => {
    const allowedExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
    const extension = value.substring(value.lastIndexOf('.')).toLowerCase();
    return allowedExtensions.includes(extension);
  }, {
    message: '只支持mp4、mov、avi、mkv格式的视频',
  });
```

#### 6.2 自定义错误消息

**中文错误消息**
```typescript
// backend/validators/error-messages.ts
import { z } from 'zod';

export const errorMessages: z.ZodErrorMap = (error, ctx) => {
  if (error.code === z.ZodIssueCode.invalid_string) {
    switch (error.validation) {
      case 'email':
        return { message: '邮箱格式不正确' };
      case 'url':
        return { message: 'URL格式不正确' };
      case 'uuid':
        return { message: 'UUID格式不正确' };
      default:
        return { message: '字符串格式不正确' };
    }
  }

  if (error.code === z.ZodIssueCode.too_small) {
    if (error.type === 'string') {
      return { message: `字符串长度不能少于${error.minimum}位` };
    }
    if (error.type === 'number') {
      return { message: `数字不能小于${error.minimum}` };
    }
    if (error.type === 'array') {
      return { message: `数组长度不能少于${error.minimum}` };
    }
  }

  if (error.code === z.ZodIssueCode.too_big) {
    if (error.type === 'string') {
      return { message: `字符串长度不能超过${error.maximum}位` };
    }
    if (error.type === 'number') {
      return { message: `数字不能超过${error.maximum}` };
    }
    if (error.type === 'array') {
      return { message: `数组长度不能超过${error.maximum}` };
    }
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(errorMessages);
```

### 7. 数据校验最佳实践

#### 7.1 前端校验最佳实践

**实时校验**
```typescript
// frontend/hooks/useFormValidation.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormValidation = <T extends z.ZodTypeAny>(
  schema: T,
  defaultValues?: z.infer<T>
) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    watch,
    setValue,
    trigger,
  };
};
```

**防抖校验**
```typescript
// frontend/hooks/useDebounceValidation.ts
import { useEffect, useRef } from 'react';

export const useDebounceValidation = (
  value: any,
  delay: number,
  callback: (value: any) => void
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, callback]);
};
```

#### 7.2 后端校验最佳实践

**分层校验**
```typescript
// backend/services/user.service.ts
export class UserService {
  async createUser(params: CreateUserParams) {
    // 第一层：参数格式校验（在中间件中完成）
    
    // 第二层：业务规则校验
    await validateEmailUnique(params.email);
    await validateNicknameUnique(params.nickname);
    
    // 第三层：数据处理
    const hashedPassword = await hashPassword(params.password);
    
    // 第四层：数据持久化
    const user = await userRepository.create({
      ...params,
      password: hashedPassword,
    });
    
    return user;
  }
}
```

**校验结果缓存**
```typescript
// backend/cache/validation.cache.ts
import { LRUCache } from 'lru-cache';

const validationCache = new LRUCache<string, boolean>({
  max: 1000,
  ttl: 1000 * 60 * 5, // 5分钟
});

export async function validateEmailUniqueCached(email: string): Promise<boolean> {
  const cacheKey = `email:${email}`;
  
  if (validationCache.has(cacheKey)) {
    return validationCache.get(cacheKey)!;
  }
  
  const existingUser = await userRepository.findByEmail(email);
  const isUnique = !existingUser;
  
  validationCache.set(cacheKey, isUnique);
  
  return isUnique;
}
```

### 8. 总结

本文档详细描述了YYC3-Short-Drama短剧平台的数据校验规则代码设计，包括前端/后端数据校验规则的代码实现，包含参数校验、格式校验、业务规则校验等。通过这些数据校验规则的实施，可以确保数据质量、提升系统安全性、优化用户体验，为平台的稳定运行和业务扩展提供坚实的数据校验基础。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
