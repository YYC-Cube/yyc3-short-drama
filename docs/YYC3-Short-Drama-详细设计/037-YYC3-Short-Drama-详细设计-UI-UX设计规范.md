---
@file: 037-YYC3-Short-Drama-详细设计-UI-UX设计规范.md
@description: YYC3-Short-Drama 前端界面设计、交互逻辑、视觉规范的统一标准，保障用户体验一致
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [详细设计],[UI设计],[UX规范]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 037-YYC3-Short-Drama-详细设计-UI-UX设计规范

## 概述

本文档详细描述YYC3-Short-Drama短剧平台的UI/UX设计规范，包括设计原则、色彩系统、字体规范、组件规范、响应式设计等内容，确保平台界面的一致性和用户体验的优质性。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的AI驱动短剧创作与分发平台，致力于通过人工智能技术赋能短剧内容创作，打造智能化的短剧生态体系。平台融合AI剧本生成、智能推荐、VR/AR沉浸式体验、星值经济体系等创新功能，为用户提供从创作到消费的全链路服务。

#### 1.2 文档目标
- 建立统一的UI/UX设计规范，确保平台界面一致性
- 提供清晰的设计指导，提升开发效率
- 优化用户体验，提高用户满意度和留存率
- 支持多端适配，确保跨平台体验一致性

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：界面简洁直观，操作流程清晰，确保用户能够快速上手
- **高性能**：优化页面加载速度和交互响应时间，提升用户体验
- **高安全性**：保护用户隐私，提供清晰的安全提示和反馈
- **高扩展性**：设计系统支持功能扩展和主题切换
- **高可维护性**：组件化设计，便于后续维护和迭代

#### 2.2 五标体系
- **标准化**：统一的设计语言和交互模式
- **规范化**：严格遵循设计规范，确保一致性
- **自动化**：使用设计系统和组件库，提高设计效率
- **智能化**：智能推荐和个性化界面
- **可视化**：直观的数据展示和可视化反馈

#### 2.3 五化架构
- **流程化**：标准化的设计流程和评审机制
- **文档化**：完善的设计文档和组件文档
- **工具化**：使用Figma、Sketch等设计工具
- **数字化**：基于数据的设计决策
- **生态化**：开放的设计系统，支持第三方集成

### 3. 设计理念

#### 3.1 核心设计理念
- **简洁至上**：去除冗余元素，突出核心内容
- **用户中心**：以用户需求为导向，优化用户体验
- **情感连接**：通过视觉和交互建立情感共鸣
- **创新体验**：融合新技术，提供创新交互方式
- **文化传承**：融入河洛文化元素，体现文化特色

#### 3.2 设计关键词
- 现代、简洁、智能、沉浸、互动、个性化

### 4. 色彩系统

#### 4.1 主色调

**品牌主色**
```
Primary Blue: #1890FF
Primary Dark: #096DD9
Primary Light: #40A9FF
```

**辅助色**
```
Success Green: #52C41A
Warning Orange: #FAAD14
Error Red: #FF4D4F
Info Cyan: #13C2C2
```

#### 4.2 中性色

**灰色系**
```
Gray 1: #FFFFFF (纯白)
Gray 2: #FAFAFA (背景色)
Gray 3: #F5F5F5 (分割线)
Gray 4: #E8E8E8 (边框)
Gray 5: #D9D9D9 (禁用)
Gray 6: #BFBFBF (占位符)
Gray 7: #8C8C8C (次要文本)
Gray 8: #595959 (主要文本)
Gray 9: #262626 (标题)
Gray 10: #000000 (纯黑)
```

#### 4.3 功能色

**功能色应用场景**
```
- Primary Blue: 主要按钮、链接、选中状态
- Success Green: 成功提示、完成状态
- Warning Orange: 警告提示、待处理状态
- Error Red: 错误提示、删除操作
- Info Cyan: 信息提示、通知
```

#### 4.4 渐变色

**品牌渐变**
```
Primary Gradient: linear-gradient(135deg, #1890FF 0%, #096DD9 100%)
Warm Gradient: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)
Cool Gradient: linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)
```

### 5. 字体规范

#### 5.1 字体家族

**中文字体**
```
Primary Font: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
```

**英文字体**
```
Primary Font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

**数字字体**
```
Primary Font: "SF Mono", "Roboto Mono", "Monaco", "Consolas", monospace
```

#### 5.2 字号规范

**标题字号**
```
H1: 36px / 1.2 (页面主标题)
H2: 30px / 1.3 (区块标题)
H3: 24px / 1.4 (小节标题)
H4: 20px / 1.5 (子标题)
H5: 18px / 1.5 (小组标题)
H6: 16px / 1.5 (最小标题)
```

**正文字号**
```
Large: 16px / 1.6 (大号正文)
Medium: 14px / 1.6 (标准正文)
Small: 12px / 1.6 (小号正文)
```

**辅助字号**
```
Caption: 12px / 1.5 (说明文字)
Overline: 10px / 1.5 (标签文字)
```

#### 5.3 字重规范

```
Light: 300 (300)
Regular: 400 (400)
Medium: 500 (500)
Semibold: 600 (600)
Bold: 700 (700)
```

#### 5.4 行高规范

```
Tight: 1.2 (标题)
Normal: 1.5 (正文)
Relaxed: 1.8 (长文本)
```

### 6. 间距规范

#### 6.1 基础间距

**间距单位**
```
XS: 4px
SM: 8px
MD: 16px
LG: 24px
XL: 32px
XXL: 48px
```

#### 6.2 组件间距

**内边距**
```
Button Padding: 8px 16px
Card Padding: 24px
Modal Padding: 32px
Form Padding: 24px
```

**外边距**
```
Section Margin: 48px
Component Margin: 24px
List Item Margin: 16px
```

#### 6.3 布局间距

**栅格间距**
```
Grid Gap: 24px
Column Gap: 16px
Row Gap: 16px
```

### 7. 圆角规范

#### 7.1 圆角尺寸

```
XS: 2px (小元素)
SM: 4px (按钮、输入框)
MD: 8px (卡片)
LG: 12px (模态框)
XL: 16px (大卡片)
Round: 50% (圆形元素)
```

#### 7.2 应用场景

```
- XS: 标签、徽章
- SM: 按钮、输入框、下拉框
- MD: 卡片、面板
- LG: 模态框、对话框
- XL: 大型卡片、容器
- Round: 头像、图标按钮
```

### 8. 阴影规范

#### 8.1 阴影层级

**Level 1**
```
Box Shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
```

**Level 2**
```
Box Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
```

**Level 3**
```
Box Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
```

**Level 4**
```
Box Shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

#### 8.2 应用场景

```
- Level 1: 悬停状态、轻微提升
- Level 2: 卡片、面板
- Level 3: 模态框、对话框
- Level 4: 下拉菜单、弹出层
```

### 9. 组件规范

#### 9.1 按钮组件

**按钮类型**
```
Primary Button: 主按钮，用于主要操作
Secondary Button: 次要按钮，用于次要操作
Text Button: 文本按钮，用于低优先级操作
Link Button: 链接按钮，用于导航
Icon Button: 图标按钮，用于图标操作
```

**按钮状态**
```
Default: 默认状态
Hover: 悬停状态
Active: 点击状态
Disabled: 禁用状态
Loading: 加载状态
```

**按钮尺寸**
```
Large: 40px (大按钮)
Medium: 32px (中按钮)
Small: 24px (小按钮)
```

#### 9.2 输入框组件

**输入框类型**
```
Text Input: 文本输入框
Password Input: 密码输入框
Number Input: 数字输入框
Email Input: 邮箱输入框
Search Input: 搜索输入框
Textarea: 多行文本框
```

**输入框状态**
```
Default: 默认状态
Focus: 聚焦状态
Error: 错误状态
Success: 成功状态
Disabled: 禁用状态
```

**输入框尺寸**
```
Large: 40px (大输入框)
Medium: 32px (中输入框)
Small: 24px (小输入框)
```

#### 9.3 卡片组件

**卡片类型**
```
Basic Card: 基础卡片
Cover Card: 封面卡片
Action Card: 操作卡片
Grid Card: 网格卡片
```

**卡片内容**
```
Cover: 封面图
Title: 标题
Description: 描述
Actions: 操作按钮
Footer: 底部信息
```

#### 9.4 导航组件

**导航类型**
```
Top Navigation: 顶部导航
Side Navigation: 侧边导航
Tab Navigation: 标签导航
Breadcrumb: 面包屑
Pagination: 分页
```

**导航状态**
```
Default: 默认状态
Active: 激活状态
Hover: 悬停状态
Disabled: 禁用状态
```

#### 9.5 反馈组件

**反馈类型**
```
Alert: 警告提示
Message: 消息提示
Notification: 通知提示
Modal: 模态框
Drawer: 抽屉
Popover: 气泡卡片
Tooltip: 文字提示
```

**反馈状态**
```
Success: 成功状态
Info: 信息状态
Warning: 警告状态
Error: 错误状态
```

#### 9.6 数据展示组件

**数据展示类型**
```
Table: 表格
List: 列表
Card: 卡片
Tree: 树形控件
Timeline: 时间轴
Calendar: 日历
Statistic: 统计数值
Progress: 进度条
```

#### 9.7 反馈组件

**反馈类型**
```
Loading: 加载中
Empty: 空状态
Error: 错误状态
404: 页面不存在
403: 无权限
500: 服务器错误
```

### 10. 图标规范

#### 10.1 图标风格

**图标类型**
```
Outline Icons: 线性图标
Filled Icons: 填充图标
Duotone Icons: 双色图标
```

**图标尺寸**
```
XS: 12px
SM: 16px
MD: 20px
LG: 24px
XL: 32px
XXL: 48px
```

#### 10.2 图标使用

**图标应用场景**
```
- 导航图标: 24px
- 功能图标: 20px
- 状态图标: 16px
- 装饰图标: 32px+
```

### 11. 响应式设计

#### 11.1 断点规范

**断点定义**
```
XS: < 576px (手机)
SM: >= 576px (大手机)
MD: >= 768px (平板)
LG: >= 992px (小桌面)
XL: >= 1200px (桌面)
XXL: >= 1600px (大桌面)
```

#### 11.2 响应式策略

**布局响应**
```
- Mobile: 单列布局
- Tablet: 两列布局
- Desktop: 三列布局
- Large Desktop: 四列布局
```

**字体响应**
```
- Mobile: 基础字号
- Tablet: 基础字号 + 2px
- Desktop: 基础字号 + 4px
```

**间距响应**
```
- Mobile: 基础间距
- Tablet: 基础间距 * 1.2
- Desktop: 基础间距 * 1.5
```

### 12. 动效规范

#### 12.1 动效原则

**动效目标**
```
- 提升用户体验
- 增强交互反馈
- 引导用户注意力
- 传递状态变化
```

**动效原则**
```
- 自然流畅
- 有意义
- 可预测
- 可控
```

#### 12.2 动效时长

**动效时长**
```
Fast: 100ms (微交互)
Normal: 200ms (标准交互)
Slow: 300ms (复杂交互)
```

#### 12.3 缓动函数

**缓动类型**
```
Ease: ease-in-out (标准)
Ease In: ease-in (进入)
Ease Out: ease-out (退出)
Linear: linear (线性)
```

### 13. 无障碍设计

#### 13.1 无障碍原则

**WCAG 2.1 标准**
```
- 可感知性
- 可操作性
- 可理解性
- 健壮性
```

#### 13.2 无障碍实践

**键盘导航**
```
- Tab 键导航
- Enter/Space 键激活
- Esc 键关闭
```

**屏幕阅读器**
```
- ARIA 标签
- 语义化 HTML
- 焦点管理
```

**色彩对比**
```
- 文本对比度 >= 4.5:1
- 大文本对比度 >= 3:1
- 图标对比度 >= 3:1
```

### 14. 页面布局规范

#### 14.1 页面结构

**页面布局**
```
Header: 顶部导航
Main: 主要内容
Sidebar: 侧边栏 (可选)
Footer: 底部信息
```

#### 14.2 布局模式

**布局类型**
```
Fixed Layout: 固定布局
Fluid Layout: 流式布局
Responsive Layout: 响应式布局
```

#### 14.3 内容层级

**层级结构**
```
L1: 页面级别
L2: 区块级别
L3: 组件级别
L4: 元素级别
```

### 15. 交互规范

#### 15.1 交互原则

**交互目标**
```
- 简洁直观
- 反馈及时
- 容错性强
- 效率高效
```

#### 15.2 交互模式

**交互类型**
```
Click: 点击交互
Hover: 悬停交互
Drag: 拖拽交互
Swipe: 滑动交互
Pinch: 缩放交互
```

#### 15.3 交互反馈

**反馈类型**
```
Visual: 视觉反馈
Audio: 音频反馈
Haptic: 触觉反馈
```

### 16. 表单规范

#### 16.1 表单布局

**表单类型**
```
Vertical Form: 垂直表单
Horizontal Form: 水平表单
Inline Form: 内联表单
Grid Form: 网格表单
```

#### 16.2 表单验证

**验证时机**
```
On Blur: 失焦验证
On Change: 变更验证
On Submit: 提交验证
```

**验证状态**
```
Default: 默认状态
Success: 成功状态
Warning: 警告状态
Error: 错误状态
Validating: 验证中
```

#### 16.3 表单反馈

**反馈方式**
```
Inline: 内联提示
Tooltip: 工具提示
Alert: 警告提示
Modal: 模态提示
```

### 17. 数据可视化规范

#### 17.1 图表类型

**图表类型**
```
Line Chart: 折线图
Bar Chart: 柱状图
Pie Chart: 饼图
Area Chart: 面积图
Scatter Chart: 散点图
Heatmap: 热力图
```

#### 17.2 图表配色

**配色方案**
```
Primary: 主色系
Secondary: 辅助色系
Diverging: 发散色系
Sequential: 顺序色系
```

#### 17.3 图表交互

**交互类型**
```
Hover: 悬停交互
Click: 点击交互
Zoom: 缩放交互
Filter: 筛选交互
```

### 18. 移动端规范

#### 18.1 移动端布局

**布局特点**
```
- 单列布局
- 底部导航
- 手势操作
- 触摸优化
```

#### 18.2 移动端交互

**交互方式**
```
Tap: 点击
Long Press: 长按
Swipe: 滑动
Pinch: 缩放
```

#### 18.3 移动端优化

**优化策略**
```
- 减少加载时间
- 优化触摸目标
- 简化操作流程
- 提供离线支持
```

### 19. 暗色模式

#### 19.1 暗色模式原则

**设计原则**
```
- 降低亮度
- 保持对比度
- 减少眼睛疲劳
- 节省电量
```

#### 19.2 暗色模式配色

**暗色配色**
```
Background: #141414
Surface: #1F1F1F
Border: #303030
Text Primary: #E0E0E0
Text Secondary: #A0A0A0
```

#### 19.3 暗色模式切换

**切换方式**
```
- 系统跟随
- 手动切换
- 定时切换
```

### 20. 设计交付

#### 20.1 设计文件

**文件格式**
```
Figma: .fig
Sketch: .sketch
Adobe XD: .xd
```

#### 20.2 设计标注

**标注内容**
```
- 尺寸标注
- 间距标注
- 颜色标注
- 字体标注
```

#### 20.3 设计资源

**资源类型**
```
- 切图资源
- 图标资源
- 字体资源
- 样式资源
```

### 21. 设计评审

#### 21.1 评审流程

**评审阶段**
```
- 初稿评审
- 细节评审
- 最终评审
```

#### 21.2 评审标准

**评审维度**
```
- 视觉效果
- 交互体验
- 可用性
- 一致性
```

### 22. 设计迭代

#### 22.1 迭代流程

**迭代步骤**
```
- 需求分析
- 设计方案
- 用户测试
- 方案优化
```

#### 22.2 迭代原则

**迭代原则**
```
- 用户导向
- 数据驱动
- 持续优化
```

### 23. 总结

本文档详细描述了YYC3-Short-Drama短剧平台的UI/UX设计规范，包括设计原则、色彩系统、字体规范、组件规范、响应式设计等内容。遵循这些规范，可以确保平台界面的一致性和用户体验的优质性，为用户提供优秀的使用体验。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
