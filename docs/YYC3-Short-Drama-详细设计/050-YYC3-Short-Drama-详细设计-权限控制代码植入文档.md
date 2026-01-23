---
@file: 050-YYC3-Short-Drama-详细设计-权限控制代码植入文档.md
@description: YYC3-Short-Drama 基于角色的权限控制代码实现，包含菜单、接口、数据的权限管控
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [详细设计],[权限控制],[代码植入]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 050-YYC3-Short-Drama-详细设计-权限控制代码植入文档

## 概述

本文档详细描述YYC3-Short-Drama-详细设计-权限控制代码植入文档相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范权限控制代码植入文档相关的业务标准与技术落地要求
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

### 3. 权限控制代码植入文档

#### 3.1 权限控制架构设计

##### 3.1.1 权限控制模型

YYC3-Short-Drama采用基于角色的访问控制（RBAC）模型，结合数据级权限控制，实现多层次、细粒度的权限管理。

```
用户 (User)
  ↓
角色 (Role)
  ↓
权限 (Permission)
  ├─ 菜单权限 (Menu Permission)
  ├─ 接口权限 (API Permission)
  └─ 数据权限 (Data Permission)
```

##### 3.1.2 权限层级结构

```
系统权限体系
├── 系统管理权限
│   ├── 用户管理
│   │   ├── 查看
│   │   ├── 创建
│   │   ├── 编辑
│   │   └── 删除
│   ├── 角色管理
│   ├── 权限管理
│   └── 系统配置
├── 短剧管理权限
│   ├── 短剧列表
│   ├── 短剧创建
│   ├── 短剧编辑
│   ├── 短剧审核
│   └── 短剧发布
├── 内容审核权限
│   ├── 待审核内容
│   ├── 审核历史
│   └── 审核规则
├── 数据分析权限
│   ├── 用户统计
│   ├── 内容统计
│   ├── 收入统计
│   └── 行为分析
└── 运营管理权限
    ├── 活动管理
    ├── 推荐配置
    └── 反馈处理
```

##### 3.1.3 角色定义

| 角色代码 | 角色名称 | 角色描述 | 权限级别 |
|---------|---------|---------|---------|
| SUPER_ADMIN | 超级管理员 | 拥有系统所有权限 | 系统级 |
| ADMIN | 管理员 | 拥有大部分管理权限 | 管理级 |
| CONTENT_MANAGER | 内容管理员 | 负责内容审核和管理 | 内容级 |
| CONTENT_CREATOR | 内容创作者 | 可创建和编辑自己的内容 | 用户级 |
| USER | 普通用户 | 基础用户权限 | 基础级 |
| GUEST | 访客 | 只读权限 | 访客级 |

#### 3.2 权限数据模型设计

##### 3.2.1 数据库表结构

```sql
-- 用户表
CREATE TABLE users (
  user_id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nickname VARCHAR(100),
  avatar VARCHAR(500),
  status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 角色表
CREATE TABLE roles (
  role_id VARCHAR(36) PRIMARY KEY,
  role_code VARCHAR(50) UNIQUE NOT NULL,
  role_name VARCHAR(100) NOT NULL,
  description TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_role_code (role_code),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户角色关联表
CREATE TABLE user_roles (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  role_id VARCHAR(36) NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  assigned_by VARCHAR(36),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
  UNIQUE KEY uk_user_role (user_id, role_id),
  INDEX idx_user_id (user_id),
  INDEX idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 权限表
CREATE TABLE permissions (
  permission_id VARCHAR(36) PRIMARY KEY,
  permission_code VARCHAR(100) UNIQUE NOT NULL,
  permission_name VARCHAR(100) NOT NULL,
  permission_type ENUM('menu', 'api', 'data') NOT NULL,
  resource VARCHAR(100),
  action VARCHAR(50),
  description TEXT,
  parent_id VARCHAR(36),
  sort_order INT DEFAULT 0,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES permissions(permission_id) ON DELETE SET NULL,
  INDEX idx_permission_code (permission_code),
  INDEX idx_permission_type (permission_type),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 角色权限关联表
CREATE TABLE role_permissions (
  id VARCHAR(36) PRIMARY KEY,
  role_id VARCHAR(36) NOT NULL,
  permission_id VARCHAR(36) NOT NULL,
  granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  granted_by VARCHAR(36),
  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id) ON DELETE CASCADE,
  UNIQUE KEY uk_role_permission (role_id, permission_id),
  INDEX idx_role_id (role_id),
  INDEX idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 菜单表
CREATE TABLE menus (
  menu_id VARCHAR(36) PRIMARY KEY,
  menu_code VARCHAR(100) UNIQUE NOT NULL,
  menu_name VARCHAR(100) NOT NULL,
  menu_type ENUM('directory', 'menu', 'button') NOT NULL,
  path VARCHAR(255),
  component VARCHAR(255),
  icon VARCHAR(100),
  parent_id VARCHAR(36),
  sort_order INT DEFAULT 0,
  permission_id VARCHAR(36),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES menus(menu_id) ON DELETE SET NULL,
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id) ON DELETE SET NULL,
  INDEX idx_menu_code (menu_code),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

##### 3.2.2 初始数据

```sql
-- 插入初始角色
INSERT INTO roles (role_id, role_code, role_name, description) VALUES
('role-001', 'SUPER_ADMIN', '超级管理员', '拥有系统所有权限'),
('role-002', 'ADMIN', '管理员', '拥有大部分管理权限'),
('role-003', 'CONTENT_MANAGER', '内容管理员', '负责内容审核和管理'),
('role-004', 'CONTENT_CREATOR', '内容创作者', '可创建和编辑自己的内容'),
('role-005', 'USER', '普通用户', '基础用户权限'),
('role-006', 'GUEST', '访客', '只读权限');

-- 插入初始权限
INSERT INTO permissions (permission_id, permission_code, permission_name, permission_type, resource, action, description) VALUES
-- 系统管理权限
('perm-001', 'system:user:view', '查看用户', 'api', 'user', 'view', '查看用户列表和详情'),
('perm-002', 'system:user:create', '创建用户', 'api', 'user', 'create', '创建新用户'),
('perm-003', 'system:user:edit', '编辑用户', 'api', 'user', 'edit', '编辑用户信息'),
('perm-004', 'system:user:delete', '删除用户', 'api', 'user', 'delete', '删除用户'),
('perm-005', 'system:role:view', '查看角色', 'api', 'role', 'view', '查看角色列表和详情'),
('perm-006', 'system:role:create', '创建角色', 'api', 'role', 'create', '创建新角色'),
('perm-007', 'system:role:edit', '编辑角色', 'api', 'role', 'edit', '编辑角色信息'),
('perm-008', 'system:role:delete', '删除角色', 'api', 'role', 'delete', '删除角色'),
('perm-009', 'system:permission:view', '查看权限', 'api', 'permission', 'view', '查看权限列表和详情'),
('perm-010', 'system:config:view', '查看配置', 'api', 'config', 'view', '查看系统配置'),
('perm-011', 'system:config:edit', '编辑配置', 'api', 'config', 'edit', '编辑系统配置'),

-- 短剧管理权限
('perm-020', 'drama:list:view', '查看短剧列表', 'api', 'drama', 'view', '查看短剧列表'),
('perm-021', 'drama:create', '创建短剧', 'api', 'drama', 'create', '创建新短剧'),
('perm-022', 'drama:edit', '编辑短剧', 'api', 'drama', 'edit', '编辑短剧信息'),
('perm-023', 'drama:delete', '删除短剧', 'api', 'drama', 'delete', '删除短剧'),
('perm-024', 'drama:publish', '发布短剧', 'api', 'drama', 'publish', '发布短剧'),
('perm-025', 'drama:audit', '审核短剧', 'api', 'drama', 'audit', '审核短剧'),

-- 内容审核权限
('perm-030', 'audit:pending', '待审核内容', 'api', 'audit', 'pending', '查看待审核内容'),
('perm-031', 'audit:approve', '审核通过', 'api', 'audit', 'approve', '审核通过内容'),
('perm-032', 'audit:reject', '审核拒绝', 'api', 'audit', 'reject', '审核拒绝内容'),
('perm-033', 'audit:history', '审核历史', 'api', 'audit', 'history', '查看审核历史'),

-- 数据分析权限
('perm-040', 'analytics:user', '用户统计', 'api', 'analytics', 'user', '查看用户统计数据'),
('perm-041', 'analytics:content', '内容统计', 'api', 'analytics', 'content', '查看内容统计数据'),
('perm-042', 'analytics:revenue', '收入统计', 'api', 'analytics', 'revenue', '查看收入统计数据'),
('perm-043', 'analytics:behavior', '行为分析', 'api', 'analytics', 'behavior', '查看用户行为分析'),

-- 菜单权限
('perm-100', 'menu:system', '系统管理', 'menu', 'system', 'view', '系统管理菜单'),
('perm-101', 'menu:drama', '短剧管理', 'menu', 'drama', 'view', '短剧管理菜单'),
('perm-102', 'menu:audit', '内容审核', 'menu', 'audit', 'view', '内容审核菜单'),
('perm-103', 'menu:analytics', '数据分析', 'menu', 'analytics', 'view', '数据分析菜单');
```

#### 3.3 前端权限控制实现

##### 3.3.1 权限指令实现

```typescript
// frontend/directives/permission.directive.ts
import { Directive, DirectiveBinding } from 'vue';
import { usePermissionStore } from '@/stores/permission';

export const permissionDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const permissionStore = usePermissionStore();
    const permissions = permissionStore.permissions;

    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = permissions.some(permission => {
        return value.includes(permission);
      });

      if (!hasPermission) {
        el.parentNode?.removeChild(el);
      }
    } else {
      throw new Error('需要权限！如 v-permission="[\'system:user:create\']"');
    }
  },
};

export default permissionDirective;
```

##### 3.3.2 权限Store实现

```typescript
// frontend/stores/permission.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiClient } from '@/utils/apiClient';

export const usePermissionStore = defineStore('permission', () => {
  const permissions = ref<string[]>([]);
  const menus = ref<Menu[]>([]);
  const loading = ref(false);

  const hasPermission = computed(() => (permission: string | string[]) => {
    if (!permission) return true;
    
    if (Array.isArray(permission)) {
      return permissions.value.some(p => permission.includes(p));
    }
    
    return permissions.value.includes(permission);
  });

  const hasAnyPermission = computed(() => (permissionList: string[]) => {
    return permissionList.some(permission => permissions.value.includes(permission));
  });

  const hasAllPermissions = computed(() => (permissionList: string[]) => {
    return permissionList.every(permission => permissions.value.includes(permission));
  });

  async function fetchPermissions() {
    loading.value = true;
    try {
      const response = await apiClient.get('/api/permissions/me');
      permissions.value = response.data.permissions;
      menus.value = response.data.menus;
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  function clearPermissions() {
    permissions.value = [];
    menus.value = [];
  }

  return {
    permissions,
    menus,
    loading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    fetchPermissions,
    clearPermissions,
  };
});

interface Menu {
  menuId: string;
  menuCode: string;
  menuName: string;
  menuType: 'directory' | 'menu' | 'button';
  path?: string;
  component?: string;
  icon?: string;
  parentId?: string;
  sortOrder: number;
  children?: Menu[];
}
```

##### 3.3.3 路由权限控制

```typescript
// frontend/router/guards/permission.guard.ts
import { Router } from 'vue-router';
import { usePermissionStore } from '@/stores/permission';
import { useUserStore } from '@/stores/user';
import { NProgress } from 'nprogress';

export function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    const userStore = useUserStore();
    const permissionStore = usePermissionStore();

    if (!userStore.isLoggedIn) {
      if (to.meta.requiresAuth !== false) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
        return;
      }
      next();
      return;
    }

    if (permissionStore.permissions.length === 0) {
      try {
        await permissionStore.fetchPermissions();
      } catch (error) {
        console.error('Failed to fetch permissions:', error);
        next('/login');
        return;
      }
    }

    if (to.meta.permissions) {
      const requiredPermissions = to.meta.permissions as string[];
      const hasPermission = permissionStore.hasAnyPermission(requiredPermissions);

      if (!hasPermission) {
        next('/403');
        return;
      }
    }

    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
```

##### 3.3.4 权限组件封装

```typescript
// frontend/components/Permission/PermissionWrapper.tsx
import React from 'react';
import { usePermission } from '@/hooks/usePermission';

interface PermissionWrapperProps {
  permissions: string | string[];
  type?: 'any' | 'all';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionWrapper: React.FC<PermissionWrapperProps> = ({
  permissions,
  type = 'any',
  fallback = null,
  children,
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();

  let hasAccess = false;

  if (Array.isArray(permissions)) {
    if (type === 'all') {
      hasAccess = hasAllPermissions(permissions);
    } else {
      hasAccess = hasAnyPermission(permissions);
    }
  } else {
    hasAccess = hasPermission(permissions);
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
```

```typescript
// frontend/hooks/usePermission.ts
import { usePermissionStore } from '@/stores/permission';

export function usePermission() {
  const permissionStore = usePermissionStore();

  const hasPermission = (permission: string) => {
    return permissionStore.hasPermission(permission);
  };

  const hasAnyPermission = (permissionList: string[]) => {
    return permissionStore.hasAnyPermission(permissionList);
  };

  const hasAllPermissions = (permissionList: string[]) => {
    return permissionStore.hasAllPermissions(permissionList);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissions: permissionStore.permissions,
    menus: permissionStore.menus,
  };
}
```

##### 3.3.5 菜单渲染组件

```typescript
// frontend/components/Menu/MenuTree.tsx
import React from 'react';
import { usePermission } from '@/hooks/usePermission';
import { Menu as AntMenu } from 'antd';
import type { MenuProps } from 'antd';

interface MenuItem {
  menuId: string;
  menuName: string;
  menuType: 'directory' | 'menu' | 'button';
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export const MenuTree: React.FC<{ menus: MenuItem[] }> = ({ menus }) => {
  const { hasPermission } = usePermission();

  const filterMenus = (menus: MenuItem[]): MenuItem[] => {
    return menus
      .filter(menu => {
        if (menu.menuType === 'button') {
          return false;
        }
        return true;
      })
      .map(menu => ({
        ...menu,
        children: menu.children ? filterMenus(menu.children) : undefined,
      }));
  };

  const convertToAntMenuItems = (menus: MenuItem[]): MenuProps['items'] => {
    return menus.map(menu => ({
      key: menu.menuId,
      label: menu.menuName,
      icon: menu.icon,
      path: menu.path,
      children: menu.children ? convertToAntMenuItems(menu.children) : undefined,
    }));
  };

  const filteredMenus = filterMenus(menus);
  const menuItems = convertToAntMenuItems(filteredMenus);

  return <AntMenu items={menuItems} />;
};
```

#### 3.4 后端权限控制实现

##### 3.4.1 权限中间件

```typescript
// backend/middleware/permission.middleware.ts
import { Context, Next } from 'hono';
import { ForbiddenError } from '@/shared/errors';
import { permissionService } from '@/services/permission';

export const requirePermissions = (...requiredPermissions: string[]) => {
  return async (c: Context, next: Next) => {
    const userId = c.get('userId');

    if (!userId) {
      throw new ForbiddenError('未登录');
    }

    const hasPermission = await permissionService.checkPermissions(
      userId,
      requiredPermissions
    );

    if (!hasPermission) {
      throw new ForbiddenError('权限不足');
    }

    await next();
  };
};

export const requireAnyPermission = (...requiredPermissions: string[]) => {
  return async (c: Context, next: Next) => {
    const userId = c.get('userId');

    if (!userId) {
      throw new ForbiddenError('未登录');
    }

    const hasPermission = await permissionService.checkAnyPermission(
      userId,
      requiredPermissions
    );

    if (!hasPermission) {
      throw new ForbiddenError('权限不足');
    }

    await next();
  };
};

export const requireRole = (...requiredRoles: string[]) => {
  return async (c: Context, next: Next) => {
    const userId = c.get('userId');

    if (!userId) {
      throw new ForbiddenError('未登录');
    }

    const hasRole = await permissionService.checkRoles(userId, requiredRoles);

    if (!hasRole) {
      throw new ForbiddenError('角色权限不足');
    }

    await next();
  };
};
```

##### 3.4.2 权限服务实现

```typescript
// backend/services/permission.service.ts
import { rolePermissionRepository } from '@/repositories/role-permission.repository';
import { userRoleRepository } from '@/repositories/user-role.repository';
import { permissionRepository } from '@/repositories/permission.repository';
import { roleRepository } from '@/repositories/role.repository';
import { NotFoundError } from '@/shared/errors';
import { logger } from '@/utils/logger';

export class PermissionService {
  async getUserPermissions(userId: string): Promise<string[]> {
    logger.info('Fetching user permissions', { userId });

    const userRoles = await userRoleRepository.findByUserId(userId);
    
    if (userRoles.length === 0) {
      return [];
    }

    const roleIds = userRoles.map(ur => ur.roleId);
    const rolePermissions = await rolePermissionRepository.findByRoleIds(roleIds);
    const permissionIds = rolePermissions.map(rp => rp.permissionId);
    const permissions = await permissionRepository.findByIds(permissionIds);

    return permissions.map(p => p.permissionCode);
  }

  async getUserRoles(userId: string): Promise<string[]> {
    logger.info('Fetching user roles', { userId });

    const userRoles = await userRoleRepository.findByUserId(userId);
    const roleIds = userRoles.map(ur => ur.roleId);
    const roles = await roleRepository.findByIds(roleIds);

    return roles.map(r => r.roleCode);
  }

  async checkPermissions(userId: string, requiredPermissions: string[]): Promise<boolean> {
    logger.info('Checking permissions', { userId, requiredPermissions });

    const userPermissions = await this.getUserPermissions(userId);

    return requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );
  }

  async checkAnyPermission(userId: string, requiredPermissions: string[]): Promise<boolean> {
    logger.info('Checking any permission', { userId, requiredPermissions });

    const userPermissions = await this.getUserPermissions(userId);

    return requiredPermissions.some(permission => 
      userPermissions.includes(permission)
    );
  }

  async checkRoles(userId: string, requiredRoles: string[]): Promise<boolean> {
    logger.info('Checking roles', { userId, requiredRoles });

    const userRoles = await this.getUserRoles(userId);

    return requiredRoles.some(role => userRoles.includes(role));
  }

  async assignRoleToUser(userId: string, roleId: string, assignedBy: string): Promise<void> {
    logger.info('Assigning role to user', { userId, roleId, assignedBy });

    const userRole = await userRoleRepository.findByUserIdAndRoleId(userId, roleId);
    if (userRole) {
      throw new Error('用户已拥有该角色');
    }

    await userRoleRepository.create({
      userId,
      roleId,
      assignedBy,
    });
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<void> {
    logger.info('Removing role from user', { userId, roleId });

    const userRole = await userRoleRepository.findByUserIdAndRoleId(userId, roleId);
    if (!userRole) {
      throw new NotFoundError('UserRole', `${userId}-${roleId}`);
    }

    await userRoleRepository.delete(userRole.id);
  }

  async grantPermissionToRole(roleId: string, permissionId: string, grantedBy: string): Promise<void> {
    logger.info('Granting permission to role', { roleId, permissionId, grantedBy });

    const rolePermission = await rolePermissionRepository.findByRoleIdAndPermissionId(
      roleId,
      permissionId
    );
    if (rolePermission) {
      throw new Error('角色已拥有该权限');
    }

    await rolePermissionRepository.create({
      roleId,
      permissionId,
      grantedBy,
    });
  }

  async revokePermissionFromRole(roleId: string, permissionId: string): Promise<void> {
    logger.info('Revoking permission from role', { roleId, permissionId });

    const rolePermission = await rolePermissionRepository.findByRoleIdAndPermissionId(
      roleId,
      permissionId
    );
    if (!rolePermission) {
      throw new NotFoundError('RolePermission', `${roleId}-${permissionId}`);
    }

    await rolePermissionRepository.delete(rolePermission.id);
  }

  async getUserMenus(userId: string): Promise<Menu[]> {
    logger.info('Fetching user menus', { userId });

    const userPermissions = await this.getUserPermissions(userId);
    const allMenus = await menuRepository.findAll();

    const filterMenus = (menus: Menu[], permissions: string[]): Menu[] => {
      return menus
        .filter(menu => {
          if (!menu.permissionId) {
            return true;
          }
          return permissions.includes(menu.permissionId);
        })
        .map(menu => ({
          ...menu,
          children: menu.children ? filterMenus(menu.children, permissions) : undefined,
        }));
    };

    return filterMenus(allMenus, userPermissions);
  }
}

export const permissionService = new PermissionService();

interface Menu {
  menuId: string;
  menuCode: string;
  menuName: string;
  menuType: 'directory' | 'menu' | 'button';
  path?: string;
  component?: string;
  icon?: string;
  parentId?: string;
  sortOrder: number;
  permissionId?: string;
  children?: Menu[];
}
```

##### 3.4.3 权限API路由

```typescript
// backend/routes/permission.routes.ts
import { Hono } from 'hono';
import { authMiddleware } from '@/middleware/auth.middleware';
import { requirePermissions, requireRole } from '@/middleware/permission.middleware';
import { permissionService } from '@/services/permission';

const app = new Hono();

app.use('*', authMiddleware);

app.get('/me', async (c) => {
  const userId = c.get('userId');
  const permissions = await permissionService.getUserPermissions(userId);
  const menus = await permissionService.getUserMenus(userId);

  return c.json({
    success: true,
    data: {
      permissions,
      menus,
    },
  });
});

app.get('/check', async (c) => {
  const userId = c.get('userId');
  const { permissions } = await c.req.json();

  const hasPermission = await permissionService.checkPermissions(
    userId,
    permissions
  );

  return c.json({
    success: true,
    data: {
      hasPermission,
    },
  });
});

app.post('/roles/:roleId/permissions', requirePermissions('system:role:edit'), async (c) => {
  const roleId = c.param('roleId');
  const { permissionId } = await c.req.json();
  const grantedBy = c.get('userId');

  await permissionService.grantPermissionToRole(roleId, permissionId, grantedBy);

  return c.json({
    success: true,
    message: '权限授予成功',
  });
});

app.delete('/roles/:roleId/permissions/:permissionId', requirePermissions('system:role:edit'), async (c) => {
  const roleId = c.param('roleId');
  const permissionId = c.param('permissionId');

  await permissionService.revokePermissionFromRole(roleId, permissionId);

  return c.json({
    success: true,
    message: '权限撤销成功',
  });
});

app.post('/users/:userId/roles', requirePermissions('system:user:edit'), async (c) => {
  const userId = c.param('userId');
  const { roleId } = await c.req.json();
  const assignedBy = c.get('userId');

  await permissionService.assignRoleToUser(userId, roleId, assignedBy);

  return c.json({
    success: true,
    message: '角色分配成功',
  });
});

app.delete('/users/:userId/roles/:roleId', requirePermissions('system:user:edit'), async (c) => {
  const userId = c.param('userId');
  const roleId = c.param('roleId');

  await permissionService.removeRoleFromUser(userId, roleId);

  return c.json({
    success: true,
    message: '角色移除成功',
  });
});

export default app;
```

##### 3.4.4 数据权限控制

```typescript
// backend/decorators/data-permission.decorator.ts
import { Context, Next } from 'hono';
import { permissionService } from '@/services/permission';

export function DataPermission(resource: string, action: string) {
  return async (c: Context, next: Next) => {
    const userId = c.get('userId');
    const permissionCode = `${resource}:${action}`;

    const hasPermission = await permissionService.checkPermissions(userId, [permissionCode]);

    if (!hasPermission) {
      return c.json(
        {
          success: false,
          error: {
            code: 'PERMISSION_DENIED',
            message: '数据权限不足',
          },
        },
        403
      );
    }

    await next();
  };
}

export function OwnerOnly(resource: string) {
  return async (c: Context, next: Next) => {
    const userId = c.get('userId');
    const resourceId = c.param('id');

    const isOwner = await checkOwnership(userId, resourceId, resource);

    if (!isOwner) {
      return c.json(
        {
          success: false,
          error: {
            code: 'NOT_OWNER',
            message: '只能操作自己的数据',
          },
        },
        403
      );
    }

    await next();
  };
}

async function checkOwnership(userId: string, resourceId: string, resource: string): Promise<boolean> {
  switch (resource) {
    case 'drama':
      return await checkDramaOwnership(userId, resourceId);
    case 'comment':
      return await checkCommentOwnership(userId, resourceId);
    default:
      return false;
  }
}

async function checkDramaOwnership(userId: string, dramaId: string): Promise<boolean> {
  const drama = await dramaRepository.findById(dramaId);
  return drama?.creatorId === userId;
}

async function checkCommentOwnership(userId: string, commentId: string): Promise<boolean> {
  const comment = await commentRepository.findById(commentId);
  return comment?.userId === userId;
}
```

#### 3.5 权限管理界面

##### 3.5.1 角色管理页面

```typescript
// frontend/pages/admin/roles/index.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { usePermission } from '@/hooks/usePermission';
import { apiClient } from '@/utils/apiClient';

interface Role {
  roleId: string;
  roleCode: string;
  roleName: string;
  description: string;
  status: string;
}

export const RoleManagement: React.FC = () => {
  const { hasPermission } = usePermission();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      message.error('获取角色列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingRole(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRole) {
        await apiClient.put(`/api/roles/${editingRole.roleId}`, values);
        message.success('角色更新成功');
      } else {
        await apiClient.post('/api/roles', values);
        message.success('角色创建成功');
      }
      setModalVisible(false);
      fetchRoles();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns = [
    {
      title: '角色代码',
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (status === 'active' ? '启用' : '禁用'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Role) => (
        <>
          {hasPermission('system:role:edit') && (
            <Button type="link" onClick={() => handleEdit(record)}>
              编辑
            </Button>
          )}
          {hasPermission('system:role:delete') && (
            <Button type="link" danger>
              删除
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {hasPermission('system:role:create') && (
          <Button type="primary" onClick={handleCreate}>
            创建角色
          </Button>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="roleId"
        loading={loading}
      />
      <Modal
        title={editingRole ? '编辑角色' : '创建角色'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="roleCode"
            label="角色代码"
            rules={[{ required: true, message: '请输入角色代码' }]}
          >
            <Input placeholder="请输入角色代码" />
          </Form.Item>
          <Form.Item
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="请输入描述" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
```

##### 3.5.2 权限分配页面

```typescript
// frontend/pages/admin/roles/[roleId]/permissions.tsx
import React, { useState, useEffect } from 'react';
import { Tree, Button, message } from 'antd';
import { usePermission } from '@/hooks/usePermission';
import { apiClient } from '@/utils/apiClient';

interface Permission {
  permissionId: string;
  permissionCode: string;
  permissionName: string;
  children?: Permission[];
}

export const PermissionAssignment: React.FC<{ roleId: string }> = ({ roleId }) => {
  const { hasPermission } = usePermission();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPermissions();
    fetchRolePermissions();
  }, [roleId]);

  const fetchPermissions = async () => {
    try {
      const response = await apiClient.get('/api/permissions');
      setPermissions(response.data);
    } catch (error) {
      message.error('获取权限列表失败');
    }
  };

  const fetchRolePermissions = async () => {
    try {
      const response = await apiClient.get(`/api/roles/${roleId}/permissions`);
      setCheckedKeys(response.data.map((p: any) => p.permissionId));
    } catch (error) {
      message.error('获取角色权限失败');
    }
  };

  const handleSave = async () => {
    if (!hasPermission('system:role:edit')) {
      message.error('权限不足');
      return;
    }

    setLoading(true);
    try {
      await apiClient.put(`/api/roles/${roleId}/permissions`, {
        permissionIds: checkedKeys,
      });
      message.success('权限保存成功');
    } catch (error) {
      message.error('权限保存失败');
    } finally {
      setLoading(false);
    }
  };

  const convertToTreeData = (permissions: Permission[]): any[] => {
    return permissions.map(permission => ({
      title: permission.permissionName,
      key: permission.permissionId,
      children: permission.children ? convertToTreeData(permission.children) : undefined,
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleSave} loading={loading}>
          保存权限
        </Button>
      </div>
      <Tree
        checkable
        checkedKeys={checkedKeys}
        onCheck={setCheckedKeys}
        treeData={convertToTreeData(permissions)}
      />
    </div>
  );
};
```

#### 3.6 权限测试

##### 3.6.1 权限单元测试

```typescript
// tests/unit/services/permission.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { permissionService } from '@/services/permission';
import { rolePermissionRepository } from '@/repositories/role-permission.repository';
import { userRoleRepository } from '@/repositories/user-role.repository';
import { permissionRepository } from '@/repositories/permission.repository';
import { roleRepository } from '@/repositories/role.repository';

vi.mock('@/repositories/role-permission.repository');
vi.mock('@/repositories/user-role.repository');
vi.mock('@/repositories/permission.repository');
vi.mock('@/repositories/role.repository');

describe('PermissionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserPermissions', () => {
    it('should return user permissions', async () => {
      const userId = 'user-001';
      const userRoles = [
        { userId, roleId: 'role-001' },
      ];
      const rolePermissions = [
        { roleId: 'role-001', permissionId: 'perm-001' },
        { roleId: 'role-001', permissionId: 'perm-002' },
      ];
      const permissions = [
        { permissionId: 'perm-001', permissionCode: 'system:user:view' },
        { permissionId: 'perm-002', permissionCode: 'system:user:create' },
      ];

      vi.mocked(userRoleRepository.findByUserId).mockResolvedValue(userRoles);
      vi.mocked(rolePermissionRepository.findByRoleIds).mockResolvedValue(rolePermissions);
      vi.mocked(permissionRepository.findByIds).mockResolvedValue(permissions);

      const result = await permissionService.getUserPermissions(userId);

      expect(result).toEqual(['system:user:view', 'system:user:create']);
      expect(userRoleRepository.findByUserId).toHaveBeenCalledWith(userId);
      expect(rolePermissionRepository.findByRoleIds).toHaveBeenCalledWith(['role-001']);
      expect(permissionRepository.findByIds).toHaveBeenCalledWith(['perm-001', 'perm-002']);
    });

    it('should return empty array if user has no roles', async () => {
      const userId = 'user-001';
      vi.mocked(userRoleRepository.findByUserId).mockResolvedValue([]);

      const result = await permissionService.getUserPermissions(userId);

      expect(result).toEqual([]);
    });
  });

  describe('checkPermissions', () => {
    it('should return true if user has all required permissions', async () => {
      const userId = 'user-001';
      const requiredPermissions = ['system:user:view', 'system:user:create'];
      
      vi.mocked(userRoleRepository.findByUserId).mockResolvedValue([
        { userId, roleId: 'role-001' },
      ]);
      vi.mocked(rolePermissionRepository.findByRoleIds).mockResolvedValue([
        { roleId: 'role-001', permissionId: 'perm-001' },
        { roleId: 'role-001', permissionId: 'perm-002' },
      ]);
      vi.mocked(permissionRepository.findByIds).mockResolvedValue([
        { permissionId: 'perm-001', permissionCode: 'system:user:view' },
        { permissionId: 'perm-002', permissionCode: 'system:user:create' },
      ]);

      const result = await permissionService.checkPermissions(userId, requiredPermissions);

      expect(result).toBe(true);
    });

    it('should return false if user does not have all required permissions', async () => {
      const userId = 'user-001';
      const requiredPermissions = ['system:user:view', 'system:user:delete'];
      
      vi.mocked(userRoleRepository.findByUserId).mockResolvedValue([
        { userId, roleId: 'role-001' },
      ]);
      vi.mocked(rolePermissionRepository.findByRoleIds).mockResolvedValue([
        { roleId: 'role-001', permissionId: 'perm-001' },
      ]);
      vi.mocked(permissionRepository.findByIds).mockResolvedValue([
        { permissionId: 'perm-001', permissionCode: 'system:user:view' },
      ]);

      const result = await permissionService.checkPermissions(userId, requiredPermissions);

      expect(result).toBe(false);
    });
  });
});
```

```typescript
// tests/unit/middleware/permission.middleware.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Hono } from 'hono';
import { requirePermissions } from '@/middleware/permission.middleware';
import { permissionService } from '@/services/permission';

vi.mock('@/services/permission');

describe('Permission Middleware', () => {
  let app: Hono;

  beforeEach(() => {
    app = new Hono();
    vi.clearAllMocks();
  });

  it('should allow access if user has required permissions', async () => {
    vi.mocked(permissionService.checkPermissions).mockResolvedValue(true);

    app.get('/test', requirePermissions('system:user:view'), (c) => {
      return c.json({ success: true });
    });

    const res = await app.request('/test', {
      headers: {
        'Authorization': 'Bearer valid-token',
      },
    });

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(res.status).toBe(200);
  });

  it('should deny access if user does not have required permissions', async () => {
    vi.mocked(permissionService.checkPermissions).mockResolvedValue(false);

    app.get('/test', requirePermissions('system:user:view'), (c) => {
      return c.json({ success: true });
    });

    const res = await app.request('/test', {
      headers: {
        'Authorization': 'Bearer valid-token',
      },
    });

    expect(res.status).toBe(403);
  });
});
```

#### 3.7 权限配置文件

```typescript
// shared/config/permission.config.ts
export interface PermissionConfig {
  permissions: Permission[];
  roles: Role[];
  defaultPermissions: Record<string, string[]>;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  type: 'menu' | 'api' | 'data';
  resource: string;
  action: string;
  description?: string;
}

export interface Role {
  id: string;
  code: string;
  name: string;
  description?: string;
  permissions: string[];
}

export const permissionConfig: PermissionConfig = {
  permissions: [
    {
      id: 'perm-001',
      code: 'system:user:view',
      name: '查看用户',
      type: 'api',
      resource: 'user',
      action: 'view',
      description: '查看用户列表和详情',
    },
    {
      id: 'perm-002',
      code: 'system:user:create',
      name: '创建用户',
      type: 'api',
      resource: 'user',
      action: 'create',
      description: '创建新用户',
    },
    {
      id: 'perm-003',
      code: 'system:user:edit',
      name: '编辑用户',
      type: 'api',
      resource: 'user',
      action: 'edit',
      description: '编辑用户信息',
    },
    {
      id: 'perm-004',
      code: 'system:user:delete',
      name: '删除用户',
      type: 'api',
      resource: 'user',
      action: 'delete',
      description: '删除用户',
    },
  ],
  roles: [
    {
      id: 'role-001',
      code: 'SUPER_ADMIN',
      name: '超级管理员',
      description: '拥有系统所有权限',
      permissions: ['*'],
    },
    {
      id: 'role-002',
      code: 'ADMIN',
      name: '管理员',
      description: '拥有大部分管理权限',
      permissions: [
        'system:user:view',
        'system:user:create',
        'system:user:edit',
        'system:role:view',
        'system:role:create',
        'system:role:edit',
      ],
    },
  ],
  defaultPermissions: {
    USER: ['drama:view', 'comment:create'],
    GUEST: ['drama:view'],
  },
};
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
