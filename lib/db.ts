import mysql from "mysql2/promise"

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME || "yyc3_my",
  user: process.env.DB_USER || "yyc3_dj",
  password: process.env.DB_PASS || "yyc3_dj",
  charset: process.env.DB_CHARSET || "utf8mb4",
  collation: process.env.DB_COLLATION || "utf8mb4_unicode_ci",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
}

// 创建连接池
let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

// 执行查询
export async function query<T = any>(sql: string, values?: any[]): Promise<T> {
  const connection = await getPool().getConnection()
  try {
    const [results] = await connection.execute(sql, values)
    return results as T
  } finally {
    connection.release()
  }
}

// 执行事务
export async function transaction<T>(callback: (connection: mysql.PoolConnection) => Promise<T>): Promise<T> {
  const connection = await getPool().getConnection()
  try {
    await connection.beginTransaction()
    const result = await callback(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

// 测试数据库连接
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await getPool().getConnection()
    await connection.ping()
    connection.release()
    return true
  } catch (error) {
    console.error("数据库连接失败:", error)
    return false
  }
}
