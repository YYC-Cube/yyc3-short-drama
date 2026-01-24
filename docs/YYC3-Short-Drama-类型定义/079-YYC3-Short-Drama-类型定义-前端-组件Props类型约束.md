---
@file: 079-YYC3-Short-Drama-类型定义-前端-组件Props类型约束.md
@description: YYC3-Short-Drama 前端组件Props的类型定义、默认值、校验规则的统一规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[前端],[组件约束]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 079-YYC3-Short-Drama-类型定义-前端-组件Props类型约束

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-前端-组件Props类型约束相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范前端-组件Props类型约束相关的业务标准与技术落地要求
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

### 3. 前端-组件Props类型约束

#### 3.1 基础组件Props

##### 3.1.1 Button组件

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

**默认值**:
- variant: 'primary'
- size: 'medium'
- disabled: false
- loading: false
- fullWidth: false
- iconPosition: 'left'
- type: 'button'

**校验规则**:
- children 必须提供
- variant 必须为指定枚举值
- size 必须为指定枚举值
- disabled 和 loading 不能同时为 true

##### 3.1.2 Input组件

```typescript
interface InputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  error?: string;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}
```

**默认值**:
- type: 'text'
- disabled: false
- readOnly: false
- required: false

**校验规则**:
- value 和 defaultValue 不能同时提供
- maxLength 必须大于 0
- minLength 必须大于等于 0
- minLength 必须小于等于 maxLength

##### 3.1.3 Card组件

```typescript
interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  cover?: string;
  actions?: React.ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  shadow?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
}
```

**默认值**:
- hoverable: false
- bordered: true
- shadow: 'medium'
- padding: 'medium'

**校验规则**:
- children 必须提供
- cover 必须为有效的URL
- shadow 必须为指定枚举值
- padding 必须为指定枚举值

#### 3.2 业务组件Props

##### 3.2.1 DramaCard组件

```typescript
interface DramaCardProps {
  drama: Drama;
  showCreator?: boolean;
  showStats?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  onClick?: (drama: Drama) => void;
  onLike?: (drama: Drama) => void;
  onComment?: (drama: Drama) => void;
  onShare?: (drama: Drama) => void;
  className?: string;
}
```

**默认值**:
- showCreator: true
- showStats: true
- showCategory: true
- showTags: false

**校验规则**:
- drama 必须提供且包含必要字段
- showCreator、showStats、showCategory、showTags 必须为布尔值

##### 3.2.2 EpisodePlayer组件

```typescript
interface EpisodePlayerProps {
  episode: Episode;
  drama?: Drama;
  autoPlay?: boolean;
  showControls?: boolean;
  showRelated?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
  className?: string;
}
```

**默认值**:
- autoPlay: false
- showControls: true
- showRelated: true

**校验规则**:
- episode 必须提供且包含 videoUrl
- autoPlay、showControls、showRelated 必须为布尔值

##### 3.2.3 UserAvatar组件

```typescript
interface UserAvatarProps {
  user?: User;
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square';
  showBadge?: boolean;
  badge?: React.ReactNode;
  onClick?: (user: User) => void;
  className?: string;
}
```

**默认值**:
- size: 'medium'
- shape: 'circle'
- showBadge: false

**校验规则**:
- user 和 src 至少提供一个
- size 必须为指定枚举值
- shape 必须为指定枚举值
- showBadge 为 true 时 badge 必须提供

##### 3.2.4 CommentList组件

```typescript
interface CommentListProps {
  comments: Comment[];
  dramaId?: UUID;
  episodeId?: UUID;
  showReplies?: boolean;
  maxReplies?: number;
  onLoadMore?: (comment: Comment) => void;
  onReply?: (comment: Comment) => void;
  onLike?: (comment: Comment) => void;
  onDelete?: (comment: Comment) => void;
  className?: string;
}
```

**默认值**:
- showReplies: true
- maxReplies: 3

**校验规则**:
- comments 必须提供且为数组
- dramaId 和 episodeId 至少提供一个
- maxReplies 必须大于 0

##### 3.2.5 CategoryFilter组件

```typescript
interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId?: UUID;
  showAll?: boolean;
  allText?: string;
  onChange?: (categoryId?: UUID) => void;
  className?: string;
}
```

**默认值**:
- showAll: true
- allText: '全部'

**校验规则**:
- categories 必须提供且为数组
- selectedCategoryId 必须为有效的UUID或undefined
- showAll 必须为布尔值

#### 3.3 表单组件Props

##### 3.3.1 Form组件

```typescript
interface FormProps<T = any> {
  initialValues?: Partial<T>;
  onSubmit?: (values: T) => void | Promise<void>;
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
  onReset?: () => void;
  validate?: (values: T) => FormErrors | Promise<FormErrors>;
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelCol?: number;
  wrapperCol?: number;
  className?: string;
}
```

**默认值**:
- layout: 'vertical'
- labelCol: 6
- wrapperCol: 18

**校验规则**:
- labelCol 必须在 1-24 之间
- wrapperCol 必须在 1-24 之间
- labelCol + wrapperCol 必须等于 24

##### 3.3.2 FormItem组件

```typescript
interface FormItemProps {
  name?: string;
  label?: string;
  required?: boolean;
  rules?: ValidationRule[];
  help?: string;
  extra?: string;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  hasFeedback?: boolean;
  colon?: boolean;
  className?: string;
}
```

**默认值**:
- required: false
- hasFeedback: true
- colon: true

**校验规则**:
- name 必须为字符串
- required 为 true 时 label 必须提供
- rules 必须为数组

##### 3.3.3 Select组件

```typescript
interface SelectProps<T = any> {
  value?: T;
  defaultValue?: T;
  options?: Array<{ label: string; value: T; disabled?: boolean }>;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  filterOption?: (input: string, option: any) => boolean;
  loading?: boolean;
  mode?: 'single' | 'multiple' | 'tags';
  maxTagCount?: number;
  onChange?: (value: T | T[]) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}
```

**默认值**:
- disabled: false
- allowClear: false
- showSearch: false
- mode: 'single'

**校验规则**:
- value 和 defaultValue 不能同时提供
- options 必须为数组
- mode 为 multiple 或 tags 时 value 必须为数组
- maxTagCount 必须大于 0

#### 3.4 布局组件Props

##### 3.4.1 Layout组件

```typescript
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
```

**校验规则**:
- children 必须提供

##### 3.4.2 Header组件

```typescript
interface HeaderProps {
  children: React.ReactNode;
  fixed?: boolean;
  transparent?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
  showUser?: boolean;
  onLogoClick?: () => void;
  onSearch?: (keyword: string) => void;
  className?: string;
}
```

**默认值**:
- fixed: false
- transparent: false
- showLogo: true
- showSearch: true
- showUser: true

**校验规则**:
- children 必须提供
- fixed、transparent、showLogo、showSearch、showUser 必须为布尔值

##### 3.4.3 Sidebar组件

```typescript
interface SidebarProps {
  menuItems: MenuItem[];
  selectedKey?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  onMenuClick?: (key: string) => void;
  className?: string;
}
```

**默认值**:
- collapsed: false

**校验规则**:
- menuItems 必须提供且为数组
- collapsed 必须为布尔值

##### 3.4.4 Footer组件

```typescript
interface FooterProps {
  children?: React.ReactNode;
  showCopyright?: boolean;
  showLinks?: boolean;
  links?: Array<{ label: string; href: string }>;
  className?: string;
}
```

**默认值**:
- showCopyright: true
- showLinks: true

**校验规则**:
- links 必须为数组
- showLinks 为 true 时 links 必须提供

#### 3.5 反馈组件Props

##### 3.5.1 Modal组件

```typescript
interface ModalProps {
  visible: boolean;
  title?: string;
  content?: React.ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  width?: number | string;
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  className?: string;
}
```

**默认值**:
- okText: '确定'
- cancelText: '取消'
- width: 520
- centered: false
- closable: true
- maskClosable: true
- destroyOnClose: false

**校验规则**:
- visible 必须提供且为布尔值
- width 必须为正数
- onOk 和 onCancel 至少提供一个

##### 3.5.2 Drawer组件

```typescript
interface DrawerProps {
  visible: boolean;
  title?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  width?: number | string;
  height?: number | string;
  onClose?: () => void;
  closable?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  className?: string;
}
```

**默认值**:
- placement: 'right'
- width: 300
- closable: true
- maskClosable: true
- destroyOnClose: false

**校验规则**:
- visible 必须提供且为布尔值
- placement 必须为指定枚举值
- width 和 height 必须为正数
- placement 为 top 或 bottom 时 height 必须提供
- placement 为 left 或 right 时 width 必须提供

##### 3.5.3 Toast组件

```typescript
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  className?: string;
}
```

**默认值**:
- type: 'info'
- duration: 3000

**校验规则**:
- message 必须提供且为非空字符串
- type 必须为指定枚举值
- duration 必须大于 0

#### 3.6 数据展示组件Props

##### 3.6.1 Table组件

```typescript
interface TableProps<T = any> {
  columns: ColumnProps<T>[];
  dataSource: T[];
  rowKey?: string | ((record: T) => string);
  loading?: boolean;
  pagination?: PaginationConfig | false;
  bordered?: boolean;
  size?: 'small' | 'middle' | 'large';
  showHeader?: boolean;
  scroll?: { x?: number | string; y?: number | string };
  onRow?: (record: T, index?: number) => any;
  onChange?: (pagination: any, filters: any, sorter: any) => void;
  className?: string;
}
```

**默认值**:
- loading: false
- bordered: false
- size: 'middle'
- showHeader: true

**校验规则**:
- columns 必须提供且为数组
- dataSource 必须提供且为数组
- rowKey 必须提供
- size 必须为指定枚举值

##### 3.6.2 List组件

```typescript
interface ListProps<T = any> {
  dataSource: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
  pagination?: PaginationConfig | false;
  bordered?: boolean;
  split?: boolean;
  grid?: { gutter?: number; column?: number };
  className?: string;
}
```

**默认值**:
- loading: false
- bordered: false
- split: true

**校验规则**:
- dataSource 必须提供且为数组
- renderItem 必须提供且为函数
- bordered、split 必须为布尔值

##### 3.6.3 Empty组件

```typescript
interface EmptyProps {
  image?: string | React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}
```

**默认值**:
- description: '暂无数据'

**校验规则**:
- image 必须为字符串或ReactNode
- description 必须为字符串

#### 3.7 导航组件Props

##### 3.7.1 Tabs组件

```typescript
interface TabsProps {
  items: Array<{ key: string; label: string; children?: React.ReactNode }>;
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  size?: 'small' | 'large' | 'default';
  animated?: boolean;
  className?: string;
}
```

**默认值**:
- tabPosition: 'top'
- size: 'default'
- animated: true

**校验规则**:
- items 必须提供且为数组
- activeKey 和 defaultActiveKey 不能同时提供
- tabPosition 必须为指定枚举值
- size 必须为指定枚举值

##### 3.7.2 Breadcrumb组件

```typescript
interface BreadcrumbProps {
  items: Array<{ label: string; href?: string; onClick?: () => void }>;
  separator?: string | React.ReactNode;
  className?: string;
}
```

**默认值**:
- separator: '/'

**校验规则**:
- items 必须提供且为数组
- separator 必须为字符串或ReactNode

#### 3.8 上传组件Props

##### 3.8.1 Upload组件

```typescript
interface UploadProps {
  action?: string;
  listType?: 'text' | 'picture' | 'picture-card';
  fileList?: FileInfo[];
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxCount?: number;
  disabled?: boolean;
  loading?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  onChange?: (fileList: FileInfo[]) => void;
  onPreview?: (file: FileInfo) => void;
  onRemove?: (file: FileInfo) => void | Promise<boolean>;
  className?: string;
}
```

**默认值**:
- listType: 'picture-card'
- multiple: false
- disabled: false
- loading: false

**校验规则**:
- listType 必须为指定枚举值
- fileList 必须为数组
- maxSize 必须大于 0
- maxCount 必须大于 0
- accept 必须为有效的MIME类型

#### 3.9 组件Props通用规范

##### 3.9.1 命名规范
- Props接口使用 PascalCase 命名
- Props属性使用 camelCase 命名
- 事件处理函数以 on 开头
- 布尔属性使用 is、has、show、can 等前缀

##### 3.9.2 类型定义规范
- 所有Props必须明确指定类型
- 可选属性使用 ? 标记
- 回调函数必须明确参数和返回值类型
- 联合类型使用 | 连接

##### 3.9.3 默认值规范
- 为所有可选属性提供合理的默认值
- 默认值应该在组件文档中明确说明
- 默认值应该符合业务逻辑
- 避免使用 undefined 作为默认值

##### 3.9.4 校验规则规范
- 必要属性必须标记为必填
- 属性值必须在有效范围内
- 相关属性之间要保持一致性
- 提供清晰的错误提示信息

### 4. Props校验实现

#### 4.1 PropTypes校验

```typescript
import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};
```

#### 4.2 TypeScript类型校验

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
```

#### 4.3 运行时校验

```typescript
const validateProps = (props: ButtonProps, componentName: string) => {
  if (props.disabled && props.loading) {
    console.warn(`${componentName}: disabled and loading cannot both be true`);
  }
  if (props.variant && !['primary', 'secondary', 'outline', 'text', 'danger'].includes(props.variant)) {
    console.warn(`${componentName}: invalid variant value`);
  }
};
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
