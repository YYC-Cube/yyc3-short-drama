#!/bin/bash

# ============================================================================
# YYC³ 短剧平台 - Phase 1 部署验证脚本
# 用途: 验证所有配置是否正确，准备GitHub Pages部署
# ============================================================================

set -e  # 遇到错误立即退出

echo "🚀 ==========================================================="
echo "   YYC³ 短剧平台 - Phase 1 基础设施修复验证"
echo "   时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo "==========================================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 计数器
PASS_COUNT=0
FAIL_COUNT=0
WARN_COUNT=0

# 辅助函数
pass() {
    echo -e "${GREEN}✅ PASS${NC}: $1"
    ((PASS_COUNT++))
}

fail() {
    echo -e "${RED}❌ FAIL${NC}: $1"
    ((FAIL_COUNT++))
}

warn() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
    ((WARN_COUNT++))
}

# ============================================================================
# 检查 1: 文件结构完整性
# ============================================================================
echo "📋 [1/10] 检查文件结构完整性..."
echo ""

REQUIRED_FILES=(
    ".github/workflows/ci.yml"
    "next.config.mjs"
    "package.json"
    "tsconfig.json"
    "tailwind.config.ts"
    ".env.example"
    ".gitignore"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        pass "文件存在: $file"
    else
        fail "文件缺失: $file"
    fi
done

echo ""

# ============================================================================
# 检查 2: CI/CD 配置验证
# ============================================================================
echo "🔧 [2/10] 验证 CI/CD 配置..."
echo ""

if [ -f ".github/workflows/ci.yml" ]; then
    # 检查关键配置项
    if grep -q "pnpm/action-setup" .github/workflows/ci.yml; then
        pass "CI/CD使用pnpm (正确)"
    else
        fail "CI/CD未配置pnpm"
    fi
    
    if grep -q "actions/deploy-pages" .github/workflows/ci.yml; then
        pass "CI/CD配置GitHub Pages部署"
    else
        fail "CI/CD缺少GitHub Pages部署步骤"
    fi
    
    if grep -q "amondnet/vercel-action" .github/workflows/ci.yml; then
        warn "检测到旧Vercel配置残留（应已移除）"
    else
        pass "无旧Vercel配置残留"
    fi
    
    if grep -q "frozen-lockfile" .github/workflows/ci.yml; then
        pass "使用冻结锁文件（安全最佳实践）"
    else
        warn "未使用frozen-lockfile"
    fi
fi

echo ""

# ============================================================================
# 检查 3: Next.js 静态导出配置
# ============================================================================
echo "⚙️  [3/10] 验证 Next.js 静态导出配置..."
echo ""

if [ -f "next.config.mjs" ]; then
    if grep -q "output: 'export'" next.config.mjs; then
        pass "启用静态导出模式 (output: 'export')"
    else
        fail "未配置静态导出！"
    fi
    
    if grep -q "trailingSlash: true" next.config.mjs; then
        pass "配置trailingSlash (GitHub Pages推荐)"
    else
        warn "未配置trailingSlash"
    fi
    
    if grep -q "unoptimized: true" next.config.mjs; then
        pass "图片优化已禁用（静态导出必需）"
    else
        fail "必须禁用图片优化用于静态导出"
    fi
fi

echo ""

# ============================================================================
# 检查 4: 包管理器一致性
# ============================================================================
echo "📦 [4/10] 检查包管理器配置..."
echo ""

if [ -f "pnpm-lock.yaml" ]; then
    pass "存在 pnpm-lock.yaml (pnpm项目)"
else
    fail "缺少 pnpm-lock.yaml"
fi

if [ -f "package-lock.json" ]; then
    warn "存在 package-lock.json (npm锁文件，建议删除)"
else
    pass "无npm锁文件冲突"
fi

if [ -f "yarn.lock" ]; then
    warn "存在 yarn.lock (yarn锁文件)"
else
    pass "无yarn锁文件冲突"
fi

echo ""

# ============================================================================
# 检查 5: 安全配置
# ============================================================================
echo "🔒 [5/10] 检查安全配置..."
echo ""

if [ -f ".gitignore" ]; then
    if grep -q "\.env\*" .gitignore; then
        pass ".gitignore包含.env*规则"
    else
        fail ".gitignore缺少.env*规则！"
    fi
    
    if grep -q "node_modules" .gitignore; then
        pass ".gitignore包含node_modules规则"
    else
        fail ".gitignore缺少node_modules规则"
    fi
fi

if [ -f ".env.example" ]; then
    pass "环境变量模板文件存在"
else
    fail "缺少.env.example模板文件"
fi

if [ -f "SECURITY.md" ]; then
    pass "安全策略文档存在"
else
    warn "建议添加SECURITY.md文档"
fi

echo ""

# ============================================================================
# 检查 6: 备份文件
# ============================================================================
echo "💾 [6/10] 检查备份文件..."
echo ""

if [ -f ".github/workflows/ci.yml.backup-vercel" ]; then
    pass "旧CI/CD配置已备份"
else
    warn "未找到旧配置备份（可选）"
fi

echo ""

# ============================================================================
# 检查 7: TypeScript配置
# ============================================================================
echo "📝 [7/10] 检查TypeScript配置..."
echo ""

if [ -f "tsconfig.json" ]; then
    if grep -q '"strict": true' tsconfig.json; then
        pass "TypeScript严格模式已启用"
    else
        warn "建议启用TypeScript严格模式"
    fi
    
    if grep -q '"@/\*: \[".*/"\]' tsconfig.json || grep -q '@/*' tsconfig.json; then
        pass "路径别名 @/* 已配置"
    else
        fail "路径别名未配置"
    fi
fi

echo ""

# ============================================================================
# 检查 8: package.json 脚本增强
# ============================================================================
echo "🛠️  [8/10] 检查构建脚本..."
echo ""

if [ -f "package.json" ]; then
    if grep -q '"type-check"' package.json; then
        pass "新增type-check脚本"
    else
        warn "缺少type-check脚本"
    fi
    
    if grep -q '"clean"' package.json; then
        pass "新增clean清理脚本"
    else
        warn "缺少clean脚本"
    fi
    
    if grep -q '"deploy:' package.json; then
        pass "新增部署相关脚本"
    else
        warn "缺少部署辅助脚本"
    fi
fi

echo ""

# ============================================================================
# 检查 9: 文档完整性
# ============================================================================
echo "📚 [9/10] 检查文档..."
echo ""

DOC_FILES=(
    "README.md"
    "docs/GITHUB-PAGES-DEPLOY-GUIDE.md"
    "SECURITY.md"
)

for doc in "${DOC_FILES[@]}"; do
    if [ -f "$doc" ]; then
        pass "文档存在: $doc"
    else
        warn "文档缺失: $doc (可选)"
    fi
done

echo ""

# ============================================================================
# 检查 10: Git状态预检
# ============================================================================
echo "🔍 [10/10] Git状态预检..."
echo ""

if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    pass "当前在Git仓库中"
    
    # 检查是否有未提交的更改
    if [ -n "$(git status --porcelain)" ]; then
        CHANGED_FILES=$(git status --porcelain | wc -l | tr -d ' ')
        warn "有 ${CHANGED_FILES} 个文件待提交（Phase 1修改）"
        
        echo ""
        echo "📊 待提交的文件:"
        git status --short | head -20
    else
        pass "工作区干净（所有更改已提交）"
    fi
else
    warn "不在Git仓库中（本地开发正常）"
fi

echo ""

# ============================================================================
# 总结报告
# ============================================================================
echo "==========================================================="
echo "📊 验证结果总结"
echo "==========================================================="
echo ""
echo -e "${GREEN}✅ 通过: ${PASS_COUNT}${NC} 项"
echo -e "${RED}❌ 失败: ${FAIL_COUNT}${NC} 项"
echo -e "${YELLOW}⚠️  警告: ${WARN_COUNT}${NC} 项"
echo ""

TOTAL=$((PASS_COUNT + FAIL_COUNT + WARN_COUNT))
PERCENT=$((PASS_COUNT * 100 / TOTAL))

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}🎉 恭喜！所有关键检查通过！${NC}"
    echo -e "${GREEN}   准备度评分: ${PERCENT}%${NC}"
    echo ""
    echo "📝 下一步操作:"
    echo "   1. 运行: git add ."
    echo "   2. 运行: git commit -m 'feat: Phase 1 - GitHub Pages自动化部署配置'"
    echo "   3. 运行: git push origin main"
    echo "   4. 查看: https://github.com/你的用户名/仓库名/actions"
    echo "   5. 等待: 构建完成后访问 https://drama.yyc3.top"
    exit 0
else
    echo -e "${_red}⚠️  发现 ${FAIL_COUNT} 个问题需要修复！${NC}"
    echo -e "   准备度评分: ${PERCENT}%"
    echo ""
    echo "🔧 请先修复上述失败项后再继续部署"
    exit 1
fi
