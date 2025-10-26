import { query } from "@/lib/db"
import type { RowDataPacket, ResultSetHeader } from "mysql2"

export interface VerificationCode {
  id: number
  phone: string
  code: string
  purpose: "login" | "register" | "reset_password"
  expires_at: Date
  attempts: number
  is_used: boolean
  created_at: Date
}

// 创建验证码表
export async function createVerificationCodeTable(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS verification_codes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      phone VARCHAR(20) NOT NULL,
      code VARCHAR(10) NOT NULL,
      purpose ENUM('login', 'register', 'reset_password') NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      attempts INT DEFAULT 0,
      is_used BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_phone_purpose (phone, purpose),
      INDEX idx_expires_at (expires_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `
  await query(sql)
}

// 创建验证码
export async function createVerificationCode(
  phone: string,
  purpose: "login" | "register" | "reset_password",
): Promise<string> {
  // 生成6位随机验证码
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  // 设置过期时间为5分钟
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

  const sql = `
    INSERT INTO verification_codes (phone, code, purpose, expires_at)
    VALUES (?, ?, ?, ?)
  `

  await query<ResultSetHeader>(sql, [phone, code, purpose, expiresAt])

  return code
}

// 验证验证码
export async function verifyCode(
  phone: string,
  code: string,
  purpose: "login" | "register" | "reset_password",
): Promise<boolean> {
  const sql = `
    SELECT * FROM verification_codes
    WHERE phone = ? AND code = ? AND purpose = ?
    AND expires_at > NOW() AND is_used = FALSE
    ORDER BY created_at DESC
    LIMIT 1
  `

  const [codes] = await query<RowDataPacket[]>(sql, [phone, code, purpose])

  if (!codes) {
    return false
  }

  const verificationCode = codes as VerificationCode

  // 增加尝试次数
  const updateSql = "UPDATE verification_codes SET attempts = attempts + 1 WHERE id = ?"
  await query(updateSql, [verificationCode.id])

  // 检查尝试次数
  if (verificationCode.attempts >= 3) {
    return false
  }

  // 标记为已使用
  const markUsedSql = "UPDATE verification_codes SET is_used = TRUE WHERE id = ?"
  await query(markUsedSql, [verificationCode.id])

  return true
}

// 清理过期验证码
export async function cleanupExpiredCodes(): Promise<void> {
  const sql = "DELETE FROM verification_codes WHERE expires_at < NOW()"
  await query(sql)
}
