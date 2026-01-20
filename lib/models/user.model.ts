/**
 * @file 用户模型
 * @description 处理用户相关的数据库操作和业务逻辑
 * @module lib/models/user.model
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { query } from "@/lib/db"
import bcrypt from "bcryptjs"
import type { RowDataPacket, ResultSetHeader } from "mysql2"

export interface User {
  id: number
  username: string
  phone: string
  email?: string
  password?: string
  avatar?: string
  level: string
  star_coins: number
  is_local_user: boolean
  user_type: "normal" | "creator" | "vip"
  status: "active" | "inactive" | "banned"
  last_login_at?: Date
  created_at: Date
  updated_at: Date
}

export interface CreateUserData {
  username: string
  phone: string
  email?: string
  password?: string
  is_local_user?: boolean
}

// 创建用户表
export async function createUserTable(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(100) NOT NULL,
      phone VARCHAR(20) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      avatar VARCHAR(500),
      level VARCHAR(50) DEFAULT '初级导演',
      star_coins INT DEFAULT 100,
      is_local_user BOOLEAN DEFAULT FALSE,
      user_type ENUM('normal', 'creator', 'vip') DEFAULT 'normal',
      status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
      last_login_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_phone (phone),
      INDEX idx_email (email),
      INDEX idx_status (status),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `
  await query(sql)
}

// 创建用户
export async function createUser(data: CreateUserData): Promise<User> {
  const hashedPassword = data.password ? await bcrypt.hash(data.password, 12) : null

  // 判断是否为洛阳本地用户
  const isLocalUser =
    data.is_local_user || data.phone.startsWith("137") || data.phone.startsWith("138") || data.phone.startsWith("139")

  const userType = isLocalUser ? "vip" : "normal"
  const starCoins = isLocalUser ? 500 : 100

  const sql = `
    INSERT INTO users (username, phone, email, password, is_local_user, user_type, star_coins)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  const result = await query<ResultSetHeader>(sql, [
    data.username,
    data.phone,
    data.email || null,
    hashedPassword,
    isLocalUser,
    userType,
    starCoins,
  ])

  return findUserById(result.insertId)
}

// 根据ID查找用户（带缓存）
export async function findUserById(id: number): Promise<User> {
  const sql = 'SELECT * FROM users WHERE id = ? AND status = "active"'
  const users = await query<RowDataPacket[]>(sql, [id], true) // 使用缓存
  if (!users || users.length === 0) {
    throw new Error("用户不存在")
  }
  return users[0] as User
}

// 根据手机号查找用户（带缓存）
export async function findUserByPhone(phone: string): Promise<User | null> {
  const sql = 'SELECT * FROM users WHERE phone = ? AND status = "active"'
  const users = await query<RowDataPacket[]>(sql, [phone], true) // 使用缓存
  return users && users.length > 0 ? (users[0] as User) : null
}

// 根据邮箱查找用户（带缓存）
export async function findUserByEmail(email: string): Promise<User | null> {
  const sql = 'SELECT * FROM users WHERE email = ? AND status = "active"'
  const users = await query<RowDataPacket[]>(sql, [email], true) // 使用缓存
  return users && users.length > 0 ? (users[0] as User) : null
}

// 验证密码
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// 更新用户最后登录时间
export async function updateLastLogin(userId: number): Promise<void> {
  const sql = "UPDATE users SET last_login_at = NOW() WHERE id = ?"
  await query(sql, [userId])
}

// 更新用户星币
export async function updateStarCoins(userId: number, amount: number, type: "add" | "subtract"): Promise<void> {
  const sql =
    type === "add"
      ? "UPDATE users SET star_coins = star_coins + ? WHERE id = ?"
      : "UPDATE users SET star_coins = star_coins - ? WHERE id = ? AND star_coins >= ?"

  if (type === "subtract") {
    const result = await query<ResultSetHeader>(sql, [amount, userId, amount])
    if (result.affectedRows === 0) {
      throw new Error("星币余额不足")
    }
  } else {
    await query(sql, [amount, userId])
  }
}

// 更新用户信息
export async function updateUser(userId: number, data: Partial<User>): Promise<User> {
  const allowedFields = ["username", "email", "avatar", "level"]
  const updates: string[] = []
  const values: any[] = []

  Object.keys(data).forEach((key) => {
    if (allowedFields.includes(key) && data[key as keyof User] !== undefined) {
      updates.push(`${key} = ?`)
      values.push(data[key as keyof User])
    }
  })

  if (updates.length === 0) {
    return findUserById(userId)
  }

  values.push(userId)
  const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`
  await query(sql, values)

  return findUserById(userId)
}
