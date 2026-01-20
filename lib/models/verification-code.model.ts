import { query } from "@/lib/db"
import type { RowDataPacket, ResultSetHeader } from "mysql2"
import { generateSecureCode } from "@/lib/crypto-utils"

export interface VerificationCode {
  id: number
  phone: string
  email?: string
  code: string
  type: "register" | "login" | "reset"
  used: boolean
  expires_at: Date
  created_at: Date
}

// 创建验证码表
export async function createVerificationCodeTable(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS verification_codes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      phone VARCHAR(20),
      email VARCHAR(255),
      code VARCHAR(10) NOT NULL,
      type ENUM('register', 'login', 'reset') NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_phone (phone),
      INDEX idx_email (email),
      INDEX idx_expires_at (expires_at),
      INDEX idx_type (type)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `
  await query(sql)
}

// 生成验证码
export function generateCode(length = 6): string {
  // Use cryptographically secure random number generation
  return generateSecureCode(length)
}

// 创建验证码记录
export async function createVerificationCode(
  contact: string,
  type: "register" | "login" | "reset",
  contactType: "phone" | "email" = "phone",
): Promise<string> {
  const code = generateCode(6)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10分钟后过期

  const sql = `
    INSERT INTO verification_codes (${contactType}, code, type, expires_at)
    VALUES (?, ?, ?, ?)
  `

  await query<ResultSetHeader>(sql, [contact, code, type, expiresAt])

  return code
}

// 验证验证码
export async function verifyCode(
  contact: string,
  code: string,
  type: "register" | "login" | "reset",
  contactType: "phone" | "email" = "phone",
): Promise<boolean> {
  const sql = `
    SELECT * FROM verification_codes
    WHERE ${contactType} = ? AND code = ? AND type = ? AND used = FALSE AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1
  `

  const rows = await query<RowDataPacket[]>(sql, [contact, code, type])

  if (!rows || rows.length === 0) {
    return false
  }

  // 标记验证码为已使用
  const updateSql = "UPDATE verification_codes SET used = TRUE WHERE id = ?"
  await query(updateSql, [rows[0].id])

  return true
}

// 清理过期验证码
export async function cleanupExpiredCodes(): Promise<void> {
  const sql =
    "DELETE FROM verification_codes WHERE expires_at < NOW() OR (used = TRUE AND created_at < DATE_SUB(NOW(), INTERVAL 24 HOUR))"
  await query(sql)
}

// 检查验证码发送频率限制
export async function checkRateLimit(
  contact: string,
  type: "register" | "login" | "reset",
  contactType: "phone" | "email" = "phone",
): Promise<boolean> {
  const sql = `
    SELECT COUNT(*) as count FROM verification_codes
    WHERE ${contactType} = ? AND type = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 MINUTE)
  `

  const [rows] = await query<RowDataPacket[]>(sql, [contact, type])
  const count = (rows as any).count || 0

  // 1分钟内最多发送1次
  return count === 0
}
