/**
 * 组件目录索引文件生成器
 * 自动为组件目录创建索引文件，简化导入
 */

import { generateIndexFiles } from "../utils/file-structure-optimizer"

// 组件目录列表
const componentDirectories = [
  "components/auth",
  "components/ai-script",
  "components/cultural-crossing",
  "components/cultural-gene",
  "components/home",
  "components/navigation",
  "components/profile",
  "components/shared",
  "components/social-system",
  "components/star-economy",
]

// 生成索引文件
const generatedFiles = generateIndexFiles(componentDirectories)

console.log("已生成以下索引文件:")
generatedFiles.forEach((file) => console.log(`- ${file}`))
