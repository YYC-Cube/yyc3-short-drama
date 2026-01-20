/**
 * @file JWT配置管理
 * @description 处理JWT令牌的生成和验证配置，包含安全验证和性能优化
 * @module lib/jwt-config
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

/**
 * Validates and retrieves the JWT secret from environment variables.
 * 
 * Security Requirements:
 * - JWT_SECRET must be set in environment variables
 * - JWT_SECRET must be at least 32 characters long
 * - No fallback or default values are provided for security reasons
 * 
 * @throws {Error} If JWT_SECRET is not set or doesn't meet security requirements
 * @returns {string} The validated JWT secret
 */
export function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error(
      'SECURITY ERROR: JWT_SECRET environment variable is not set. ' +
      'This is required for secure authentication. ' +
      'Please set JWT_SECRET in your .env.local file with a strong random value (minimum 32 characters).'
    )
  }

  if (secret.length < 32) {
    throw new Error(
      'SECURITY ERROR: JWT_SECRET must be at least 32 characters long. ' +
      'Please use a strong random value for security.'
    )
  }

  return secret
}

/**
 * Gets the JWT expiration time from environment variables.
 * @returns {string} The JWT expiration time
 */
export function getJWTExpiration(): string {
  return process.env.JWT_EXPIRATION || "7d"
}

/**
 * JWT secret instance - initialized once and cached.
 * Using a function with closure for thread-safe lazy initialization.
 */
let jwtSecretInstance: string | null = null
let jwtExpirationInstance: string | null = null
let isInitializing = false

/**
 * Gets the JWT secret with caching for performance.
 * The secret is validated only once on first access.
 * Thread-safe implementation prevents multiple validations.
 * 
 * @throws {Error} If JWT_SECRET is not set or doesn't meet security requirements
 * @returns {string} The validated JWT secret
 */
export function getJWTSecretCached(): string {
  // Return cached value if already initialized
  if (jwtSecretInstance !== null) {
    return jwtSecretInstance
  }

  // Prevent concurrent initialization
  if (isInitializing) {
    // Wait briefly and retry if another call is initializing
    // In practice, this scenario is extremely rare in Node.js single-threaded execution
    throw new Error('JWT secret initialization in progress')
  }

  try {
    isInitializing = true
    jwtSecretInstance = getJWTSecret()
    return jwtSecretInstance
  } finally {
    isInitializing = false
  }
}

/**
 * Gets the JWT expiration time with caching for performance.
 * @returns {string} The JWT expiration time
 */
export function getJWTExpirationCached(): string {
  if (jwtExpirationInstance !== null) {
    return jwtExpirationInstance
  }
  jwtExpirationInstance = getJWTExpiration()
  return jwtExpirationInstance
}

/**
 * Clears the JWT configuration cache.
 * Useful for testing or when environment variables change.
 */
export function clearJWTConfigCache(): void {
  jwtSecretInstance = null
  jwtExpirationInstance = null
  console.log("🔄 JWT配置缓存已清除")
}

/**
 * Validates the JWT configuration.
 * @returns {boolean} True if configuration is valid, false otherwise
 */
export function validateJWTConfig(): boolean {
  try {
    getJWTSecret()
    getJWTExpiration()
    return true
  } catch (error) {
    console.error("JWT配置验证失败:", error)
    return false
  }
}
