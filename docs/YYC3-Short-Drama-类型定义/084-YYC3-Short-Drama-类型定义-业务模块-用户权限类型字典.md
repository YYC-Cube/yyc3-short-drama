---
@file: 084-YYC3-Short-Drama-类型定义-业务模块-用户权限类型字典.md
@description: YYC3-Short-Drama 用户角色、权限、菜单的类型定义与映射关系的完整规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[业务模块],[权限]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 084-YYC3-Short-Drama-类型定义-业务模块-用户权限类型字典

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-业务模块-用户权限类型字典相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范业务模块-用户权限类型字典相关的业务标准与技术落地要求
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

### 3. 用户角色类型定义

#### 3.1 角色枚举定义

```typescript
enum UserRole {
  USER = 'user',
  CREATOR = 'creator',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}
```

#### 3.2 角色详细说明

| 角色代码 | 角色名称 | 角色描述 | 默认权限 | 备注 |
|---------|---------|---------|---------|------|
| user | 文化爱好者 | 普通用户，可浏览短剧、点赞、评论、收藏、购买星值 | 基础浏览权限 | 默认注册角色 |
| creator | 创作者 | 内容创作者，可发布短剧、管理自己的作品、查看创作数据 | 创作者权限 | 需要审核认证 |
| admin | 管理员 | 平台管理员，可管理用户、审核内容、查看平台数据 | 管理员权限 | 由超级管理员分配 |
| super_admin | 超级管理员 | 系统最高权限，可进行系统配置、角色分配、权限管理 | 超级管理员权限 | 系统内置，不可删除 |

### 4. 用户状态类型定义

#### 4.1 状态枚举定义

```typescript
enum UserStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  FROZEN = 'frozen',
  DELETED = 'deleted'
}
```

#### 4.2 状态详细说明

| 状态代码 | 状态名称 | 状态描述 | 可执行操作 | 备注 |
|---------|---------|---------|-----------|------|
| inactive | 未激活 | 用户已注册但未完成邮箱/手机验证 | 发送验证码、重新验证 | 24小时未激活自动删除 |
| active | 正常 | 用户状态正常，可正常使用所有功能 | 所有可用功能 | 正常使用状态 |
| frozen | 冻结 | 用户因违规或安全原因被冻结 | 查看个人资料、申诉 | 需要管理员解冻 |
| deleted | 已删除 | 用户账号已删除 | 无 | 软删除，数据保留30天 |

### 5. 权限类型定义

#### 5.1 权限类型枚举

```typescript
enum PermissionType {
  MENU = 'menu',
  API = 'api',
  DATA = 'data'
}
```

#### 5.2 权限类型说明

| 权限类型 | 说明 | 应用场景 | 示例 |
|---------|------|---------|------|
| menu | 菜单权限 | 控制前端菜单和页面访问 | 短剧管理、用户管理 |
| api | 接口权限 | 控制后端API接口访问 | GET /api/dramas, POST /api/dramas |
| data | 数据权限 | 控制数据访问范围 | 只能查看自己的数据、查看所有数据 |

### 6. 菜单权限定义

#### 6.1 文化爱好者端菜单权限

```typescript
interface MenuPermission {
  menuId: string;
  menuName: string;
  menuPath: string;
  icon?: string;
  parentId?: string;
  sort: number;
  roles: UserRole[];
  visible: boolean;
}

const userMenuPermissions: MenuPermission[] = [
  {
    menuId: 'home',
    menuName: '首页',
    menuPath: '/',
    icon: 'home',
    parentId: null,
    sort: 1,
    roles: [UserRole.USER, UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'drama-browse',
    menuName: '短剧浏览',
    menuPath: '/dramas',
    icon: 'play-circle',
    parentId: null,
    sort: 2,
    roles: [UserRole.USER, UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'drama-detail',
    menuName: '短剧详情',
    menuPath: '/dramas/:id',
    parentId: 'drama-browse',
    sort: 1,
    roles: [UserRole.USER, UserRole.CREATOR],
    visible: false
  },
  {
    menuId: 'cultural-resources',
    menuName: '文化资源',
    menuPath: '/resources',
    icon: 'book',
    parentId: null,
    sort: 3,
    roles: [UserRole.USER, UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'personal-center',
    menuName: '个人中心',
    menuPath: '/profile',
    icon: 'user',
    parentId: null,
    sort: 4,
    roles: [UserRole.USER, UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'my-favorites',
    menuName: '我的收藏',
    menuPath: '/profile/favorites',
    parentId: 'personal-center',
    sort: 1,
    roles: [UserRole.USER, UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'my-orders',
    menuName: '我的订单',
    menuPath: '/profile/orders',
    parentId: 'personal-center',
    sort: 2,
    roles: [UserRole.USER, UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'star-recharge',
    menuName: '星值充值',
    menuPath: '/profile/recharge',
    parentId: 'personal-center',
    sort: 3,
    roles: [UserRole.USER, UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'settings',
    menuName: '设置',
    menuPath: '/settings',
    icon: 'setting',
    parentId: null,
    sort: 5,
    roles: [UserRole.USER, UserRole.CREATOR],
    visible: true
  }
]
```

#### 6.2 创作者端菜单权限

```typescript
const creatorMenuPermissions: MenuPermission[] = [
  {
    menuId: 'creator-dashboard',
    menuName: '创作中心',
    menuPath: '/creator',
    icon: 'dashboard',
    parentId: null,
    sort: 1,
    roles: [UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'my-dramas',
    menuName: '我的短剧',
    menuPath: '/creator/dramas',
    parentId: 'creator-dashboard',
    sort: 1,
    roles: [UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'drama-create',
    menuName: '创建短剧',
    menuPath: '/creator/dramas/create',
    parentId: 'my-dramas',
    sort: 1,
    roles: [UserRole.CREATOR],
    visible: false
  },
  {
    menuId: 'drama-edit',
    menuName: '编辑短剧',
    menuPath: '/creator/dramas/:id/edit',
    parentId: 'my-dramas',
    sort: 2,
    roles: [UserRole.CREATOR],
    visible: false
  },
  {
    menuId: 'ai-creation',
    menuName: 'AI创作',
    menuPath: '/creator/ai',
    parentId: 'creator-dashboard',
    sort: 2,
    roles: [UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'script-generation',
    menuName: '剧本生成',
    menuPath: '/creator/ai/script',
    parentId: 'ai-creation',
    sort: 1,
    roles: [UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'content-optimization',
    menuName: '内容优化',
    menuPath: '/creator/ai/optimize',
    parentId: 'ai-creation',
    sort: 2,
    roles: [UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'creator-data',
    menuName: '数据统计',
    menuPath: '/creator/data',
    parentId: 'creator-dashboard',
    sort: 3,
    roles: [UserRole.CREATOR],
    visible: true
  },
  {
    menuId: 'earnings',
    menuName: '收益管理',
    menuPath: '/creator/earnings',
    parentId: 'creator-dashboard',
    sort: 4,
    roles: [UserRole.CREATOR],
    visible: true
  }
]
```

#### 6.3 管理员端菜单权限

```typescript
const adminMenuPermissions: MenuPermission[] = [
  {
    menuId: 'admin-dashboard',
    menuName: '管理后台',
    menuPath: '/admin',
    icon: 'dashboard',
    parentId: null,
    sort: 1,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'user-management',
    menuName: '用户管理',
    menuPath: '/admin/users',
    parentId: 'admin-dashboard',
    sort: 1,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'role-management',
    menuName: '角色管理',
    menuPath: '/admin/roles',
    parentId: 'admin-dashboard',
    sort: 2,
    roles: [UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'permission-management',
    menuName: '权限管理',
    menuPath: '/admin/permissions',
    parentId: 'admin-dashboard',
    sort: 3,
    roles: [UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'drama-management',
    menuName: '短剧管理',
    menuPath: '/admin/dramas',
    parentId: 'admin-dashboard',
    sort: 4,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'content-audit',
    menuName: '内容审核',
    menuPath: '/admin/audit',
    parentId: 'admin-dashboard',
    sort: 5,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'creator-management',
    menuName: '创作者管理',
    menuPath: '/admin/creators',
    parentId: 'admin-dashboard',
    sort: 6,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'order-management',
    menuName: '订单管理',
    menuPath: '/admin/orders',
    parentId: 'admin-dashboard',
    sort: 7,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'star-value-management',
    menuName: '星值管理',
    menuPath: '/admin/star-value',
    parentId: 'admin-dashboard',
    sort: 8,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'resource-management',
    menuName: '资源管理',
    menuPath: '/admin/resources',
    parentId: 'admin-dashboard',
    sort: 9,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'system-config',
    menuName: '系统配置',
    menuPath: '/admin/config',
    parentId: 'admin-dashboard',
    sort: 10,
    roles: [UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'data-statistics',
    menuName: '数据统计',
    menuPath: '/admin/statistics',
    parentId: 'admin-dashboard',
    sort: 11,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  },
  {
    menuId: 'log-management',
    menuName: '日志管理',
    menuPath: '/admin/logs',
    parentId: 'admin-dashboard',
    sort: 12,
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    visible: true
  }
]
```

### 7. 接口权限定义

#### 7.1 接口权限枚举

```typescript
enum ApiPermission {
  USER_READ = 'user:read',
  USER_WRITE = 'user:write',
  USER_DELETE = 'user:delete',
  
  DRAMA_READ = 'drama:read',
  DRAMA_WRITE = 'drama:write',
  DRAMA_DELETE = 'drama:delete',
  DRAMA_AUDIT = 'drama:audit',
  
  EPISODE_READ = 'episode:read',
  EPISODE_WRITE = 'episode:write',
  EPISODE_DELETE = 'episode:delete',
  
  COMMENT_READ = 'comment:read',
  COMMENT_WRITE = 'comment:write',
  COMMENT_DELETE = 'comment:delete',
  
  LIKE_READ = 'like:read',
  LIKE_WRITE = 'like:write',
  LIKE_DELETE = 'like:delete',
  
  FAVORITE_READ = 'favorite:read',
  FAVORITE_WRITE = 'favorite:write',
  FAVORITE_DELETE = 'favorite:delete',
  
  ORDER_READ = 'order:read',
  ORDER_WRITE = 'order:write',
  ORDER_DELETE = 'order:delete',
  
  STAR_VALUE_READ = 'star_value:read',
  STAR_VALUE_WRITE = 'star_value:write',
  
  CREATOR_READ = 'creator:read',
  CREATOR_WRITE = 'creator:write',
  CREATOR_DELETE = 'creator:delete',
  CREATOR_AUDIT = 'creator:audit',
  
  RESOURCE_READ = 'resource:read',
  RESOURCE_WRITE = 'resource:write',
  RESOURCE_DELETE = 'resource:delete',
  
  AI_GENERATE = 'ai:generate',
  AI_OPTIMIZE = 'ai:optimize',
  
  ROLE_READ = 'role:read',
  ROLE_WRITE = 'role:write',
  ROLE_DELETE = 'role:delete',
  
  PERMISSION_READ = 'permission:read',
  PERMISSION_WRITE = 'permission:write',
  
  SYSTEM_CONFIG_READ = 'config:read',
  SYSTEM_CONFIG_WRITE = 'config:write',
  
  STATISTICS_READ = 'statistics:read',
  
  LOG_READ = 'log:read',
  LOG_DELETE = 'log:delete'
}
```

#### 7.2 角色与接口权限映射

```typescript
interface RoleApiPermissionMapping {
  role: UserRole;
  permissions: ApiPermission[];
}

const roleApiPermissionMappings: RoleApiPermissionMapping[] = [
  {
    role: UserRole.USER,
    permissions: [
      ApiPermission.DRAMA_READ,
      ApiPermission.EPISODE_READ,
      ApiPermission.COMMENT_READ,
      ApiPermission.COMMENT_WRITE,
      ApiPermission.LIKE_WRITE,
      ApiPermission.LIKE_DELETE,
      ApiPermission.FAVORITE_WRITE,
      ApiPermission.FAVORITE_DELETE,
      ApiPermission.ORDER_READ,
      ApiPermission.ORDER_WRITE,
      ApiPermission.STAR_VALUE_READ,
      ApiPermission.RESOURCE_READ
    ]
  },
  {
    role: UserRole.CREATOR,
    permissions: [
      ApiPermission.DRAMA_READ,
      ApiPermission.DRAMA_WRITE,
      ApiPermission.DRAMA_DELETE,
      ApiPermission.EPISODE_READ,
      ApiPermission.EPISODE_WRITE,
      ApiPermission.EPISODE_DELETE,
      ApiPermission.COMMENT_READ,
      ApiPermission.COMMENT_WRITE,
      ApiPermission.COMMENT_DELETE,
      ApiPermission.LIKE_WRITE,
      ApiPermission.LIKE_DELETE,
      ApiPermission.FAVORITE_WRITE,
      ApiPermission.FAVORITE_DELETE,
      ApiPermission.ORDER_READ,
      ApiPermission.ORDER_WRITE,
      ApiPermission.STAR_VALUE_READ,
      ApiPermission.STAR_VALUE_WRITE,
      ApiPermission.RESOURCE_READ,
      ApiPermission.AI_GENERATE,
      ApiPermission.AI_OPTIMIZE
    ]
  },
  {
    role: UserRole.ADMIN,
    permissions: [
      ApiPermission.USER_READ,
      ApiPermission.USER_WRITE,
      ApiPermission.DRAMA_READ,
      ApiPermission.DRAMA_WRITE,
      ApiPermission.DRAMA_DELETE,
      ApiPermission.DRAMA_AUDIT,
      ApiPermission.EPISODE_READ,
      ApiPermission.EPISODE_WRITE,
      ApiPermission.EPISODE_DELETE,
      ApiPermission.COMMENT_READ,
      ApiPermission.COMMENT_DELETE,
      ApiPermission.ORDER_READ,
      ApiPermission.ORDER_WRITE,
      ApiPermission.ORDER_DELETE,
      ApiPermission.STAR_VALUE_READ,
      ApiPermission.STAR_VALUE_WRITE,
      ApiPermission.CREATOR_READ,
      ApiPermission.CREATOR_WRITE,
      ApiPermission.CREATOR_AUDIT,
      ApiPermission.RESOURCE_READ,
      ApiPermission.RESOURCE_WRITE,
      ApiPermission.RESOURCE_DELETE,
      ApiPermission.STATISTICS_READ,
      ApiPermission.LOG_READ
    ]
  },
  {
    role: UserRole.SUPER_ADMIN,
    permissions: [
      ApiPermission.USER_READ,
      ApiPermission.USER_WRITE,
      ApiPermission.USER_DELETE,
      ApiPermission.DRAMA_READ,
      ApiPermission.DRAMA_WRITE,
      ApiPermission.DRAMA_DELETE,
      ApiPermission.DRAMA_AUDIT,
      ApiPermission.EPISODE_READ,
      ApiPermission.EPISODE_WRITE,
      ApiPermission.EPISODE_DELETE,
      ApiPermission.COMMENT_READ,
      ApiPermission.COMMENT_WRITE,
      ApiPermission.COMMENT_DELETE,
      ApiPermission.ORDER_READ,
      ApiPermission.ORDER_WRITE,
      ApiPermission.ORDER_DELETE,
      ApiPermission.STAR_VALUE_READ,
      ApiPermission.STAR_VALUE_WRITE,
      ApiPermission.CREATOR_READ,
      ApiPermission.CREATOR_WRITE,
      ApiPermission.CREATOR_DELETE,
      ApiPermission.CREATOR_AUDIT,
      ApiPermission.RESOURCE_READ,
      ApiPermission.RESOURCE_WRITE,
      ApiPermission.RESOURCE_DELETE,
      ApiPermission.ROLE_READ,
      ApiPermission.ROLE_WRITE,
      ApiPermission.ROLE_DELETE,
      ApiPermission.PERMISSION_READ,
      ApiPermission.PERMISSION_WRITE,
      ApiPermission.SYSTEM_CONFIG_READ,
      ApiPermission.SYSTEM_CONFIG_WRITE,
      ApiPermission.STATISTICS_READ,
      ApiPermission.LOG_READ,
      ApiPermission.LOG_DELETE
    ]
  }
]
```

### 8. 数据权限定义

#### 8.1 数据权限类型

```typescript
enum DataPermissionType {
  ALL = 'all',
  DEPARTMENT = 'department',
  SELF = 'self',
  CUSTOM = 'custom'
}
```

#### 8.2 数据权限说明

| 权限类型 | 说明 | 适用场景 | 示例 |
|---------|------|---------|------|
| all | 全部数据 | 可查看所有数据 | 超级管理员查看所有用户数据 |
| department | 部门数据 | 可查看本部门数据 | 管理员查看自己负责的创作者数据 |
| self | 个人数据 | 只能查看自己的数据 | 创作者只能查看自己的短剧数据 |
| custom | 自定义数据 | 自定义数据范围 | 根据业务规则自定义数据访问范围 |

#### 8.3 数据权限配置

```typescript
interface DataPermissionConfig {
  resource: string;
  permissionType: DataPermissionType;
  role: UserRole;
  customCondition?: string;
}

const dataPermissionConfigs: DataPermissionConfig[] = [
  {
    resource: 'user',
    permissionType: DataPermissionType.ALL,
    role: UserRole.SUPER_ADMIN
  },
  {
    resource: 'user',
    permissionType: DataPermissionType.SELF,
    role: UserRole.USER
  },
  {
    resource: 'drama',
    permissionType: DataPermissionType.ALL,
    role: UserRole.SUPER_ADMIN
  },
  {
    resource: 'drama',
    permissionType: DataPermissionType.SELF,
    role: UserRole.CREATOR
  },
  {
    resource: 'order',
    permissionType: DataPermissionType.SELF,
    role: UserRole.USER
  },
  {
    resource: 'order',
    permissionType: DataPermissionType.ALL,
    role: UserRole.ADMIN
  }
]
```

### 9. 权限验证规则

#### 9.1 菜单权限验证

```typescript
function hasMenuPermission(userRole: UserRole, menuId: string): boolean {
  const allMenus = [...userMenuPermissions, ...creatorMenuPermissions, ...adminMenuPermissions];
  const menu = allMenus.find(m => m.menuId === menuId);
  return menu ? menu.roles.includes(userRole) : false;
}
```

#### 9.2 接口权限验证

```typescript
function hasApiPermission(userRole: UserRole, apiPermission: ApiPermission): boolean {
  const mapping = roleApiPermissionMappings.find(m => m.role === userRole);
  return mapping ? mapping.permissions.includes(apiPermission) : false;
}
```

#### 9.3 数据权限验证

```typescript
function hasDataPermission(
  userRole: UserRole,
  resource: string,
  dataOwnerId: string,
  currentUserId: string
): boolean {
  const config = dataPermissionConfigs.find(
    c => c.resource === resource && c.role === userRole
  );
  
  if (!config) return false;
  
  switch (config.permissionType) {
    case DataPermissionType.ALL:
      return true;
    case DataPermissionType.SELF:
      return dataOwnerId === currentUserId;
    case DataPermissionType.DEPARTMENT:
      return checkDepartmentMembership(currentUserId, dataOwnerId);
    case DataPermissionType.CUSTOM:
      return evaluateCustomCondition(config.customCondition, currentUserId, dataOwnerId);
    default:
      return false;
  }
}
```

### 10. 权限缓存策略

#### 10.1 缓存设计

```typescript
interface PermissionCache {
  userId: string;
  role: UserRole;
  menuPermissions: string[];
  apiPermissions: string[];
  dataPermissions: Record<string, DataPermissionType>;
  expireAt: number;
}

const permissionCache = new Map<string, PermissionCache>();

function getPermissionCache(userId: string): PermissionCache | null {
  const cache = permissionCache.get(userId);
  if (!cache) return null;
  
  if (Date.now() > cache.expireAt) {
    permissionCache.delete(userId);
    return null;
  }
  
  return cache;
}

function setPermissionCache(userId: string, cache: PermissionCache): void {
  cache.expireAt = Date.now() + 30 * 60 * 1000;
  permissionCache.set(userId, cache);
}
```

#### 10.2 缓存失效策略

- 用户角色变更时清除缓存
- 权限配置变更时清除所有缓存
- 缓存过期时间30分钟
- 支持手动清除指定用户缓存

### 11. 权限审计日志

#### 11.1 审计日志结构

```typescript
interface PermissionAuditLog {
  logId: string;
  userId: string;
  role: UserRole;
  action: string;
  resource: string;
  permission: string;
  result: 'success' | 'failure';
  reason?: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
}
```

#### 11.2 审计日志记录

```typescript
function logPermissionAccess(
  userId: string,
  role: UserRole,
  action: string,
  resource: string,
  permission: string,
  result: 'success' | 'failure',
  reason?: string
): void {
  const log: PermissionAuditLog = {
    logId: generateId(),
    userId,
    role,
    action,
    resource,
    permission,
    result,
    reason,
    ip: getClientIp(),
    userAgent: getUserAgent(),
    timestamp: new Date()
  };
  
  saveAuditLog(log);
}
```

### 12. 权限管理API

#### 12.1 获取用户权限

```typescript
interface GetUserPermissionsResult {
  role: UserRole;
  menuPermissions: MenuPermission[];
  apiPermissions: ApiPermission[];
  dataPermissions: Record<string, DataPermissionType>;
}
```

#### 12.2 检查权限

```typescript
interface CheckPermissionRequest {
  resource: string;
  action: string;
  permissionType: PermissionType;
}

interface CheckPermissionResponse {
  hasPermission: boolean;
  reason?: string;
}
```

#### 12.3 分配角色

```typescript
interface AssignRoleRequest {
  userId: string;
  role: UserRole;
  reason?: string;
}
```

### 13. 附录

#### 13.1 权限速查表

| 功能模块 | 菜单权限 | 接口权限 | 数据权限 |
|---------|---------|---------|---------|
| 用户管理 | admin/users | user:read, user:write | all (super_admin) |
| 短剧浏览 | /dramas | drama:read | all |
| 短剧创作 | /creator/dramas | drama:write | self |
| 短剧审核 | /admin/audit | drama:audit | all |
| 内容评论 | /dramas/:id/comments | comment:write | self |
| 订单管理 | /admin/orders | order:read, order:write | all (admin) |

#### 13.2 角色权限对比表

| 权限项 | 文化爱好者 | 创作者 | 管理员 | 超级管理员 |
|-------|-----------|-------|-------|-----------|
| 浏览短剧 | ✅ | ✅ | ✅ | ✅ |
| 创建短剧 | ❌ | ✅ | ❌ | ✅ |
| 编辑短剧 | ❌ | 仅自己 | ❌ | ✅ |
| 删除短剧 | ❌ | 仅自己 | ✅ | ✅ |
| 审核短剧 | ❌ | ❌ | ✅ | ✅ |
| 管理用户 | ❌ | ❌ | 查看 | ✅ |
| 分配角色 | ❌ | ❌ | ❌ | ✅ |
| 系统配置 | ❌ | ❌ | ❌ | ✅ |
| 查看统计 | ❌ | 仅自己 | ✅ | ✅ |

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
