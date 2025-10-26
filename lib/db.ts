import mysql from "mysql2/promise"

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "yyc3_dj",
  password: process.env.DB_PASS || "yyc3_dj",
  database: process.env.DB_NAME || "yyc3_my",
  charset: process.env.DB_CHARSET || "utf8mb4",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

// 查询函数
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params)
    return results as T
  } catch (error) {
    console.error("数据库查询错误:", error)
    throw error
  }
}

// 测试数据库连接
export async function testConnection(): Promise<boolean> {
  try {
    await pool.query("SELECT 1")
    console.log("✅ 数据库连接成功")
    return true
  } catch (error) {
    console.error("❌ 数据库连接失败:", error)
    return false
  }
}

// 关闭连接池
export async function closePool(): Promise<void> {
  await pool.end()
}

export default pool
