import { randomBytes, randomInt } from "crypto"

/**
 * Generate a cryptographically secure random string of digits
 * @param length The length of the code to generate
 * @returns A string of random digits
 */
export function generateSecureCode(length: number = 6): string {
  let code = ""
  for (let i = 0; i < length; i++) {
    // Generate a secure random number between 0-9
    code += randomInt(0, 10).toString()
  }
  return code
}

/**
 * Generate a cryptographically secure random ID
 * @param prefix Optional prefix for the ID
 * @returns A secure random ID string
 */
export function generateSecureId(prefix: string = ""): string {
  const timestamp = Date.now()
  const randomPart = randomBytes(6).toString("hex")
  return prefix ? `${prefix}_${timestamp}_${randomPart}` : `${timestamp}_${randomPart}`
}

/**
 * Generate a cryptographically secure random token
 * @param bytes Number of random bytes (default: 32)
 * @returns A secure random token as hex string
 */
export function generateSecureToken(bytes: number = 32): string {
  return randomBytes(bytes).toString("hex")
}

/**
 * Generate a cryptographically secure random alphanumeric string
 * @param length Length of the string
 * @returns A secure random alphanumeric string
 */
export function generateSecureAlphanumeric(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""

  for (let i = 0; i < length; i++) {
    // Use randomInt to avoid modulo bias
    result += chars[randomInt(0, chars.length)]
  }

  return result
}
