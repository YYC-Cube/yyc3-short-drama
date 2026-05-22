# 🚀 GitHub Pages 部署配置完整指南

## 📋 目录
- [前置条件](#前置条件)
- [快速开始](#快速开始)
- [详细配置步骤](#详细配置步骤)
- [域名绑定（drama.yyc3.top）](#域名绑定dramayyc3top)
- [常见问题排查](#常见问题排查)

---

## 前置条件

### ✅ 必须具备
1. **GitHub 仓库**: 代码已推送到 GitHub
2. **pnpm 包管理器**: 项目使用 pnpm (非 npm/yarn)
3. **Node.js 18+**: 运行环境要求
4. **自定义域名**: drama.yyc3.top 已购买

### 🔧 需要配置的 GitHub Secrets

进入仓库 → **Settings** → **Secrets and variables** → **Actions**

| Secret名称 | 说明 | 是否必需 |
|-----------|------|---------|
| `GITHUB_TOKEN` | GitHub自动提供 | ✅ 自动 |
| 无需额外Secret | GitHub Pages部署无需外部Token | - |

> 💡 **优势**: 相比Vercel，GitHub Pages无需配置任何第三方API密钥！

---

## 快速开始

### 方式一：自动化部署（推荐）

#### 步骤1: 启用 GitHub Pages
```
1. 进入仓库 Settings → Pages
2. Source 选择 "GitHub Actions"
3. （无需选择分支，CI/CD会自动处理）
```

#### 步骤2: 推送代码触发部署
```bash
# 确保在main分支
git checkout main

# 添加所有修改
git add .
git commit -m "feat: 配置GitHub Pages自动化部署"

# 推送到main分支（自动触发CI/CD）
git push origin main
```

#### 步骤3: 查看部署状态
```
仓库 → Actions → CI/CD - GitHub Pages Deploy
查看构建和部署进度
```

### 方式二：手动部署（测试用）

```bash
# 1. 安装依赖
pnpm install

# 2. 本地构建
pnpm run build

# 3. 检查产物
ls -lh out/

# 4. 手动部署到gh-pages分支
npx gh-pages -d out --branch gh-pages
```

---

## 详细配置步骤

### 1️⃣ GitHub 仓库设置

#### 启用 GitHub Pages
1. 访问: `https://github.com/你的用户名/仓库名/settings/pages`
2. **Build and deployment** → Source: 选择 **"GitHub Actions"**
3. 保存设置

#### 设置权限（重要！）
```
Settings → Actions → General → Workflow permissions
选择: "Read and write permissions"
✅ 允许GitHub Actions创建和写入Pages
```

### 2️⃣ 域名 DNS 配置

#### 对于根域名: drama.yyc3.top

在您的DNS服务商添加记录：

| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| **CNAME** | drama | `<your-username>.github.io` | 3600 |

或使用A记录：

| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| **A** | drama | `185.199.108.153` | 3600 |
| **A** | drama | `185.199.109.153` | 3600 |
| **A** | drama | `185.199.110.153` | 3600 |
| **A** | drama | `185.199.111.153` | 3600 |

#### 在GitHub设置自定义域名
```
Settings → Pages → Custom domain
输入: drama.yyc3.top
点击 Save
```

> ⏱️ DNS生效时间: 通常5分钟-24小时

### 3️⃣ HTTPS 自动证书

GitHub Pages 会**自动为自定义域名提供Let's Encrypt SSL证书**

验证方法：
```bash
curl -I https://drama.yyc3.top
# 应该看到 HTTP/2 200 和 SSL信息
```

### 4️⃣ 强制HTTPS（推荐）

在仓库中创建 `.nojekyll` 文件：
```bash
touch public/.nojekyll
git add public/.nojekyll
git commit -m "chore: 禁用Jekyll处理"
git push
```

---

## 域名绑定（drama.yyc3.top）完整流程

### 场景：您已有主域名 yyc3.top

#### 步骤1: DNS服务商操作（以阿里云为例）

登录阿里云域名控制台 → 找到 yyc3.top → 解析设置

添加以下记录：

```
记录类型: CNAME
主机记录: drama
记录值: your-github-username.github.io.
TTL: 10分钟
```

#### 步骤2: GitHub端配置

1. 仓库 Settings → Pages
2. Custom domain 输入框填写: `drama.yyc3.top`
3. 点击 **Save**
4. 等待DNS验证（通常几分钟）
5. 勾选 **Enforce HTTPS**（强制HTTPS）

#### 步骤3: 验证部署成功

```bash
# 方法1: curl测试
curl -L https://drama.yyc3.top

# 方法2: 浏览器访问
打开浏览器访问: https://drama.yyc3.top

# 方法3: 查看GitHub Pages日志
Actions → 最新的deploy job → 查看详情
```

---

## 工作流详解

### CI/CD 流程图

```
Git Push (main分支)
    ↓
[Job 1] 质量检测与构建
    ├── pnpm install --frozen-lockfile
    ├── ESLint检查
    ├── TypeScript类型检查
    ├── 单元测试
    └── next build (生成out/目录)
        ↓
    ↓ 上传构建Artifact
        ↓
[Job 2] GitHub Pages部署 (仅main分支push触发)
    ├── 下载构建产物
    ├── 配置Pages
    ├── 上传到Pages服务
    └── 部署完成
        ↓
https://drama.yyc3.top ✅
```

### 触发条件说明

| 事件 | 行为 | 说明 |
|------|------|------|
| Push to main | 构建并部署 | 完整的CI/CD流程 |
| PR to main | 仅构建测试 | 不部署，PR评论通知 |
| 手动触发 | 可选择环境 | workflow_dispatch支持 |

---

## 常见问题排查

### ❌ 问题1: 构建失败 - API路由错误

**原因**: Next.js静态导出不支持API路由

**解决方案**:
```javascript
// next.config.mjs 已配置
output: 'export' // 自动跳过API路由

// 或者将API路由移到单独的服务器项目
```

### ❌ 问题2: 图片404

**原因**: 静态导出后路径变化

**解决方案**:
```tsx
// 使用相对路径
<Image src="/images/logo.png" alt="Logo" />

// 或使用public目录绝对路径
<img src="/images/logo.png" alt="Logo" />
```

### ❌ 问题3: 页面空白或路由错误

**原因**: trailingSlash配置问题

**解决方案**:
```javascript
// next.config.mjs 已配置
trailingSlash: true // 所有URL末尾加斜杠
```

### ❌ 问题4: DNS解析失败

**排查命令**:
```bash
# 检查DNS是否生效
nslookup drama.yyc3.top

# 应返回GitHub IP:
# 185.199.108.153 ~ 185.199.111.153
```

### ❌ 问题5: HTTPS证书未生效

**解决步骤**:
1. 等待DNS完全生效（最多24小时）
2. GitHub Pages Settings → 移除自定义域名
3. 重新添加自定义域名
4. 勾选 Enforce HTTPS

### ❌ 问题6: 构建太慢

**优化建议**:
```bash
# 清理缓存重新安装
pnpm run clean
rm -rf node_modules
pnpm install

# 使用增量构建（已配置）
# pnpm-lock.yaml + frozen-lockfile
```

---

## 性能优化建议

### 1. 减少构建体积
```bash
# 分析包大小
pnpm run build:analyze

# 目标: out/目录 < 10MB (不含图片)
```

### 2. CDN加速（可选）
```javascript
// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? 'https://cdn.yyc3.top' : '',
}
```

### 3. 缓存策略
GitHub Pages 默认缓存策略：
- HTML: no-cache
- CSS/JS: max-age=1年（基于内容哈希）
- 图片: max-age=1年

---

## 监控与维护

### 查看部署历史
```
仓库 → Actions → CI/CD - GitHub Pages Deploy
点击具体运行查看日志
```

### 设置部署失败通知
编辑 `.github/workflows/ci.yml`，取消注释通知部分：
```yaml
# 可集成钉钉、企业微信、Slack等
```

### 定期更新依赖
```bash
# 每月执行一次
pnpm update
pnpm run build # 验证构建
git commit -am "chore: 更新依赖"
git push # 触发部署
```

---

## 回滚方案

### 快速回滚到上一版本
```bash
# 查看部署历史
git log --oneline -10

# 回滚到指定版本
git revert HEAD
git push origin main # 自动触发重新部署
```

### 紧急回滚（禁用Pages）
```
Settings → Pages 
→ Source: 选择 "Deploy from a branch" 
→ 选择 "None"
→ 立即下线
```

---

## 成功标志 ✅

当您看到以下内容时，说明部署成功：

1. ✅ Actions显示绿色 ✓
2. ✅ 访问 https://drama.yyc3.top 正常显示
3. ✅ 地址栏显示🔒锁图标（HTTPS）
4. ✅ Lighthouse评分 > 90
5. ✅ 所有页面路由正常工作

---

## 技术支持

遇到问题时：

1. 查看 [GitHub Pages官方文档](https://docs.github.com/en/pages)
2. 检查 Actions 日志中的错误信息
3. 参考本项目的 `.github/workflows/ci.yml` 注释
4. 提交 Issue 到本仓库

---

**最后更新**: 2026-05-22  
**适用版本**: Phase 1 - 基础设施修复  
**下一步**: Phase 2 安全加固 → [SECURITY.md](./SECURITY.md)