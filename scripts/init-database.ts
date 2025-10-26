import { createUserTable } from "@/lib/models/user.model"
import { createVerificationCodeTable } from "@/lib/models/verification-code.model"
import { testConnection } from "@/lib/db"

async function initDatabase() {
  console.log("🚀 开始初始化数据库...")

  try {
    // 测试数据库连接
    const isConnected = await testConnection()
    if (!isConnected) {
      throw new Error("数据库连接失败")
    }
    console.log("✅ 数据库连接成功")

    // 创建用户表
    await createUserTable()
    console.log("✅ 用户表创建成功")

    // 创建验证码表
    await createVerificationCodeTable()
    console.log("✅ 验证码表创建成功")

    console.log("🎉 数据库初始化完成！")
  } catch (error) {
    console.error("❌ 数据库初始化失败:", error)
    process.exit(1)
  }
}

initDatabase()
