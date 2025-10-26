# 🔧 问题排查指南

## 登录成功但无法进入系统

### 问题现象
- 登录页面显示"登录成功"提示
- 页面没有跳转到主页
- 控制台可能有错误信息

### 解决方案

#### 1. 检查浏览器控制台
打开浏览器开发者工具（F12），查看Console标签页：
\`\`\`
✅ 登录成功，用户信息: {...}
🚀 准备跳转到主页...
\`\`\`

如果看到上述日志，说明登录流程正常。

#### 2. 检查Cookie设置
在开发者工具的Application > Cookies中检查：
- 是否存在 `auth-token` cookie
- cookie的域名和路径是否正确
- cookie是否已过期

#### 3. 检查网络请求
在Network标签页查看：
- `/api/auth/login` 是否返回200状态码
- 响应数据是否包含用户信息和token
- `/api/auth/me` 请求是否成功

#### 4. 清除缓存和Cookie
\`\`\`bash
# 在浏览器中
1. 打开设置 > 隐私和安全 > 清除浏览数据
2. 选择"Cookie和其他网站数据"
3. 点击"清除数据"
4. 刷新页面重新登录
\`\`\`

#### 5. 检查环境变量
确保 `.env.local` 文件包含：
\`\`\`env
JWT_SECRET=your-secret-key-min-32-characters
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yyc3_my
DB_USER=yyc3_dj
DB_PASS=yyc3_dj
\`\`\`

#### 6. 重启开发服务器
\`\`\`bash
# 停止当前服务器 (Ctrl + C)
# 重新启动
npm run dev
\`\`\`

### 测试步骤

1. **使用测试账号**
   \`\`\`
   手机号: 13800138000
   验证码: 123456
   \`\`\`

2. **观察控制台日志**
   - 应该看到登录流程的每一步日志
   - 注意任何错误或警告信息

3. **验证登录状态**
   - 登录成功后，访问 `/main` 应该正常显示
   - 刷新页面后应该保持登录状态

### 常见错误

#### 错误1: "Token无效"
**原因**: JWT密钥不匹配或token格式错误
**解决**: 检查环境变量中的JWT_SECRET

#### 错误2: "未授权访问"
**原因**: Cookie未设置或已过期
**解决**: 清除浏览器Cookie，重新登录

#### 错误3: "数据库连接失败"
**原因**: 数据库配置错误或服务未启动
**解决**: 
\`\`\`bash
# 检查MySQL服务
mysql -u yyc3_dj -p yyc3_my

# 测试数据库连接
npm run db:test
\`\`\`

#### 错误4: 页面一直转圈
**原因**: 前端状态管理问题
**解决**: 
1. 打开React DevTools
2. 检查AuthContext的状态
3. 确认user对象是否正确设置

### 调试技巧

#### 1. 启用详细日志
\`\`\`typescript
// 在 contexts/auth-context.tsx 中添加
useEffect(() => {
  console.log("🔍 Auth状态变化:", { user, isAuthenticated, isLoading })
}, [user, isAuthenticated, isLoading])
\`\`\`

#### 2. 检查Middleware
\`\`\`typescript
// 在 middleware.ts 中查看日志
console.log("🔍 Middleware检查:", { pathname, hasToken: !!token })
\`\`\`

#### 3. 验证API响应
\`\`\`bash
# 使用curl测试登录API
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"13800138000","verificationCode":"123456","loginType":"code"}'
\`\`\`

### 需要帮助？

如果以上方法都无法解决问题，请：

1. 记录详细的错误信息
2. 截图浏览器控制台
3. 提供复现步骤
4. 联系技术支持: admin@0379.email

---

## 🎯 快速诊断命令

\`\`\`bash
# 1. 检查环境变量
cat .env.local

# 2. 测试数据库连接
npm run db:test

# 3. 初始化数据库
npm run db:init

# 4. 创建测试用户
npm run db:seed

# 5. 启动开发服务器（带详细日志）
DEBUG=* npm run dev
\`\`\`

## 📞 技术支持

- 邮箱: admin@0379.email
- 文档: `/docs/TEST_ACCOUNTS.md`
- 问题报告: 请提供浏览器控制台截图
