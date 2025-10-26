#!/usr/bin/env tsx

/**
 * 文件架构优化器 - 自动执行脚本
 * 扫描项目文件结构，识别问题并执行优化
 */

import { analyzeFileStructure, generateIndexFiles, optimizeImports } from "../utils/file-structure-optimizer"

console.log("🚀 启动文件架构优化器...")
console.log("=".repeat(50))

// 1. 分析文件结构
console.log("📊 分析项目文件结构...")
const report = analyzeFileStructure()

console.log("\n📋 分析报告:")
console.log(`- 发现 ${report.misplacedFiles.length} 个位置错误的文件`)
console.log(`- 建议 ${report.suggestedMoves.length} 个文件移动操作`)
console.log(`- 检测到 ${report.redundantImports.length} 个文件存在冗余导入`)
console.log(`- 需要创建 ${report.missingIndexFiles.length} 个索引文件`)

// 2. 生成索引文件
console.log("\n📁 生成组件索引文件...")
const indexFiles = generateIndexFiles(report.missingIndexFiles)
console.log(`✅ 已生成 ${indexFiles.length} 个索引文件:`)
indexFiles.forEach((file) => console.log(`   - ${file}`))

// 3. 优化导入语句
console.log("\n🔧 优化导入语句...")
const filesWithRedundantImports = report.redundantImports.map((item) => item.file)
const optimizedImports = optimizeImports(filesWithRedundantImports)
console.log(`✅ 已优化 ${optimizedImports} 个导入语句`)

// 4. 显示建议的文件移动操作
console.log("\n📦 建议的文件移动操作:")
report.suggestedMoves.forEach((move) => {
  console.log(`   📄 ${move.from} → ${move.to}`)
})

// 5. 总结
console.log("\n" + "=".repeat(50))
console.log("✨ 文件架构优化完成!")
console.log("\n📈 优化效果:")
console.log(`- 创建了 ${indexFiles.length} 个索引文件，简化导入路径`)
console.log(`- 优化了 ${optimizedImports} 个导入语句，减少冗余`)
console.log(`- 识别了 ${report.suggestedMoves.length} 个文件重组机会`)

console.log("\n🎯 下一步建议:")
console.log("1. 手动执行建议的文件移动操作")
console.log("2. 更新相关的导入语句")
console.log("3. 运行测试确保功能正常")
console.log("4. 提交代码变更")

console.log("\n🔗 相关页面:")
console.log("- 项目管理面板: /project-management")
console.log("- 性能监控中心: 在项目管理面板中查看")
