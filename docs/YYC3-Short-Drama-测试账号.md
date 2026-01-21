# YYC3-Short-Drama 测试账号文档

## 📋 测试账号信息

### 管理员账号

\`\`\`
邮箱: <admin@0379.email>
手机: 13800138000
密码: Admin@2024
角色: 超级管理员
星币: 10000
等级: 顶级导演
特权: 全部功能访问权限
\`\`\`

### 普通用户账号

#### 用户1 - 洛阳本地用户

\`\`\`
用户名: 张三
手机: 13700000001
密码: User@123456
邮箱: <zhangsan@0379.email>
是否洛阳用户: 是
星币: 500 (本地用户赠送)
等级: 初级导演
用户类型: VIP
\`\`\`

#### 用户2 - 外地用户

\`\`\`
用户名: 李四
手机: 18600000002
密码: User@123456
邮箱: <lisi@example.com>
是否洛阳用户: 否
星币: 100
等级: 初级导演
用户类型: 普通用户
\`\`\`

#### 用户3 - 创作者用户

\`\`\`
用户名: 王五
手机: 13800000003
密码: Creator@2024
邮箱: <wangwu@0379.email>
是否洛阳用户: 是
星币: 1000
等级: 中级导演
用户类型: 创作者
已发布作品: 15部
\`\`\`

### 测试用验证码

\`\`\`
通用测试验证码: 123456
有效期: 10分钟
适用场景: 注册、登录、重置密码
\`\`\`

## 🔐 密码规则

- 最小长度: 6个字符
- 加密方式: bcrypt (12轮)
- 密码示例:
  - `User@123456` - 普通用户
  - `Admin@2024` - 管理员
  - `Creator@2024` - 创作者

## 📱 手机号规则

- 洛阳本地号码前缀: 137, 138, 139
- 本地用户福利:
  - 初始星币: 500 (普通用户100)
  - 自动升级为VIP用户
  - 享受本地文化特权

## 📧 邮箱规则

- 官方邮箱域名: @0379.email
- 支持通用邮箱: @gmail.com, @qq.com, @163.com
- 邮箱用于:
  - 接收验证码
  - 密码重置
  - 系统通知
  - 欢迎邮件

## 🎯 测试场景

### 场景1: 新用户注册

\`\`\`javascript
{
  "username": "测试用户",
  "phone": "13700000001",
  "email": "<test@0379.email>",
  "password": "Test@123456",
  "verificationCode": "123456"
}
\`\`\`

### 场景2: 验证码登录

\`\`\`javascript
{
  "phone": "13800138000",
  "verificationCode": "123456",
  "loginType": "code"
}
\`\`\`

### 场景3: 密码登录

\`\`\`javascript
{
  "phone": "13800138000",
  "password": "Admin@2024",
  "loginType": "password"
}
\`\`\`

### 场景4: 洛阳本地用户注册

\`\`\`javascript
{
  "username": "洛阳本地用户",
  "phone": "13700000001", // 137开头自动识别为本地用户
  "email": "<luoyang@0379.email>",
  "password": "Local@2024",
  "verificationCode": "123456"
}
// 自动获得:
// - 500星币 (非本地用户100)
// - VIP身份
// - 本地文化特权
\`\`\`

## 🔄 数据库初始化

### 创建测试用户SQL

\`\`\`sql
-- 插入管理员账号
INSERT INTO users (username, phone, email, password, level, star_coins, is_local_user, user_type, status)
VALUES
('管理员', '13800138000', '<admin@0379.email>', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK', '顶级导演', 10000, TRUE, 'vip', 'active'),
('张三', '13700000001', 'zhangsan@0379.email', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK', '初级导演', 500, TRUE, 'vip', 'active'),
('李四', '18600000002', '<lisi@example.com>', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK', '初级导演', 100, FALSE, 'normal', 'active'),
('王五', '13800000003', 'wangwu@0379.email', '$2a$12$DifferentHashForCreator', '中级导演', 1000, TRUE, 'creator', 'active');
\`\`\`

## 🛠️ 开发环境配置

### .env.local 测试配置

\`\`\`env

# 测试数据库

DB_HOST=localhost
DB_PORT=3306
DB_NAME=yyc3_my_test
DB_USER=yyc3_dj
DB_PASS=yyc3_dj

# 测试邮箱

SMTP_USER=<admin@0379.email>
SMTP_PASS=your_test_email_password

# JWT密钥(测试环境)

JWT_SECRET=test-secret-key-do-not-use-in-production

# 测试模式

NODE_ENV=development
NEXT_PUBLIC_APP_URL=<http://localhost:3000>
\`\`\`

## 🧪 API测试示例

### 注册测试

\`\`\`bash
curl -X POST <http://localhost:3000/api/auth/register> \
  -H "Content-Type: application/json" \
  -d '{
    "username": "测试用户",
    "phone": "13700000001",
    "email": "<test@0379.email>",
    "password": "Test@123456",
    "verificationCode": "123456"
  }'
\`\`\`

### 登录测试

\`\`\`bash
curl -X POST <http://localhost:3000/api/auth/login> \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "13800138000",
    "password": "Admin@2024",
    "loginType": "password"
  }'
\`\`\`

## ⚠️ 注意事项

1. **不要在生产环境使用这些测试账号**
2. 定期更换测试密码
3. 测试验证码`123456`仅用于开发环境
4. 生产环境必须使用真实短信服务
5. 测试数据库与生产数据库完全隔离

## 📞 技术支持

- 邮箱: <admin@0379.email>
- 文档更新日期: 2024-01-20
- 版本: v1.0.0
