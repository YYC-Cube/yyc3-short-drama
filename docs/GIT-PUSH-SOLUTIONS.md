# 🔧 Git 推送失败解决方案 (HTTP 403 错误)

## 问题描述

```
fatal: unable to access 'https://github.com/YYC-Cube/yyc3-short-drama.git/':
The requested URL returned error: 403
```

**原因**: Git HTTPS 认证失败（Token过期、权限不足、或需要重新授权）

---

## 🎯 解决方案（按推荐顺序）

### 方案 1: 使用 GitHub CLI（最简单）⭐⭐⭐⭐⭐

#### 前置条件

```bash
# 检查是否已安装GitHub CLI
gh --version

# 如果未安装：
# macOS:
brew install gh

# 或下载: https://github.com/cli/cli/releases
```

#### 操作步骤

```bash
# 1. 登录GitHub（会打开浏览器授权）
gh auth login

# 选择:
# - GitHub.com
# - HTTPS
# - Login with a web browser（推荐）

# 2. 授权完成后，重新推送
cd /Volumes/Max/yyc3-short-drama
gh repo sync  # 同步远程状态
git push origin main
```

**优势**: 官方工具，安全可靠，Token自动管理

---

### 方案 2: 使用 Personal Access Token (PAT) ⭐⭐⭐⭐

#### Step 1: 创建GitHub Personal Access Token

1. 打开浏览器访问: <https://github.com/settings/tokens>
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. 配置Token:

   ```
   Note: YYC³-deploy-token (或任意名称)
   Expiration: 90 days (或根据需求)
   ✅ 勾选权限:
      - repo (完整仓库访问)
      - workflow (GitHub Actions)
      - write:packages (如果需要)
   ```

4. 点击 **"Generate token"**
5. **立即复制Token**（只显示一次！格式类似: `ghp_xxxxxxxxxxxx`）

#### Step 2: 使用Token推送

**方式A: URL中包含Token（临时）**

```bash
# 格式: https://TOKEN@github.com/用户名/仓库名.git
git remote set-url origin https://YOUR_TOKEN_HERE@github.com/YYC-Cube/yyc3-short-drama.git

# 推送
git push origin main

# 推送成功后，移除Token（安全考虑）
git remote set-url origin https://github.com/YYC-Cube/yyc3-short-drama.git
```

**方式B: 使用Git凭据存储器（推荐）**

```bash
# macOS使用Keychain
git config --global credential.helper osxkeychain

# 推送时会弹出密码输入框
# 用户名: 你的GitHub用户名
# 密码: 粘贴刚才复制的Token（不是GitHub密码！）

git push origin main
```

---

### 方案 3: 切换到SSH协议（推荐长期使用）⭐⭐⭐⭐⭐

#### Step 1: 检查SSH密钥

```bash
# 检查是否有现有的SSH密钥
ls ~/.ssh/id_*.pub

# 如果没有，生成新的密钥对
ssh-keygen -t ed25519 -C "your_email@example.com"
# 一路回车（或设置密码短语增强安全性）

# 查看公钥内容
cat ~/.ssh/id_ed25519.pub
# 复制输出内容
```

#### Step 2: 添加SSH密钥到GitHub

1. 打开: <https://github.com/settings/keys>
2. 点击 **"New SSH key"**
3. Title: `MacBook-Pro` (或你的设备名称)
4. Key type: **Authentication Key**
5. Key: 粘贴刚才复制的公钥内容（`ssh-ed25519 AAAA...`）
6. 点击 **"Add SSH key"**

#### Step 3: 测试SSH连接

```bash
ssh -T git@github.com
# 应该看到: Hi YYC-Cube! You've successfully authenticated...
```

#### Step 4: 更换远程地址为SSH

```bash
cd /Volumes/Max/yyc3-short-drama

# 更换为SSH地址
git remote set-url origin git@github.com:YYC-Cube/yyc3-short-drama.git

# 验证
git remote -v
# 应显示:
# origin  git@github.com:YYC-Cube/yyc3-short-drama.git (fetch)
# origin  git@github.com:YYC-Cube/yyc3-short-drama.git (push)

# 推送（无需输入密码）
git push origin main
```

**优势**:

- ✅ 无需每次输入密码
- ✅ 更安全（基于密钥而非密码）
- ✅ 不会遇到Token过期问题

---

### 方案 4: 使用GitHub Desktop GUI（适合不熟悉命令行）⭐⭐⭐

#### 步骤

1. 下载安装: <https://desktop.github.com/>
2. 打开应用 → File → Add local repository
3. 选择路径: `/Volumes/Max/yyc3-short-drama`
4. 登录GitHub账号（浏览器弹出授权）
5. 在界面上点击 **"Push origin"** 按钮
6. 观察推送进度

**优势**: 图形界面，操作直观

---

## 🔍 故障排查

### 问题1: Token仍然报错403

```bash
# 检查Token权限
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/user
# 应返回你的用户信息JSON

# 如果返回401: Token无效或已撤销
# 如果返回403: Token缺少repo权限
```

### 问题2: SSH连接超时

```bash
# 测试网络连通性
ssh -vT git@github.com
# 查看详细日志，检查防火墙/代理设置

# 如果在公司网络，可能需要配置代理
git config --global http.proxy http://proxy.company.com:8080
git config --global https.proxy http://proxy.company.com:8080
```

### 问题3: macOS Keychain问题

```bash
# 清除旧的凭据
git credential-osxkeychain get <<EOF
protocol=https
host=github.com
EOF
# 输入Ctrl+C取消（这会列出存储的凭据）

# 或直接删除Keychain中的GitHub条目
# 打开 → 钥匙串访问 → 搜索 github.com → 删除相关条目
```

---

## ✅ 推送成功验证

执行推送后应该看到类似输出：

```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 8 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (10/10), 8.5 KiB | 2.12 MiB/s, done.
Total 10 (delta 5), reused 0 (delta 0), pack-reused 0
To https://github.com/YYC-Cube/yyc3-short-drama.git
   02d5a99..0e5a8bb  main -> main
```

### 推送后的下一步

1. **访问Actions页面查看构建**:

   ```
   https://github.com/YYC-Cube/yyc3-short-drama/actions
   ```

2. **等待CI/CD完成**（预计3-5分钟）:
   - Job 1: 质量检测与构建 (~2分钟)
   - Job 2: GitHub Pages部署 (~1分钟)

3. **启用GitHub Pages**（首次需要）:

   ```
   Settings → Pages → Source: 选择 "GitHub Actions"
   ```

4. **配置自定义域名**:

   ```
   Settings → Pages → Custom domain: drama.yyc3.top
   ```

5. **访问网站验证**:

   ```
   https://drama.yyc3.top
   ```

---

## 📞 推荐方案总结

| 场景 | 推荐方案 | 难度 | 安全性 |
|------|---------|------|--------|
| 快速一次性推送 | 方案1 (GitHub CLI) | ⭐简单 | ⭐⭐⭐⭐ |
| 团队协作开发 | 方案3 (SSH) | ⭐⭐中等 | ⭐⭐⭐⭐⭐ |
| CI/CD服务器 | 方案2 (PAT) | ⭐⭐中等 | ⭐⭐⭐ |
| 新手/GUI用户 | 方案4 (Desktop) | ⭐极简 | ⭐⭐⭐ |

---

## 🎯 立即行动建议

**如果您想现在就完成推送**:

1. **最快方式**: 执行方案1（安装gh CLI，2分钟搞定）
2. **一劳永逸**: 执行方案3（配置SSH，以后都不用输密码）
3. **临时应急**: 执行方案2（用Token推送一次）

选择一个方案后告诉我，我可以提供更详细的指导！

---

**最后更新**: 2026-05-22
**适用场景**: Phase 1 部署阶段
**下一步**: [GITHUB-PAGES-DEPLOY-GUIDE.md](./GITHUB-PAGES-DEPLOY-GUIDE.md)
