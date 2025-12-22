/**
 * JWT Configuration and Validation
 * 
 * This module provides centralized JWT secret management with security validations.
 * The JWT_SECRET environment variable MUST be set for the application to function.
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
      `Current length: ${secret.length} characters. ` +
      'Please use a strong random value for security.'
    )
  }

  return secret
}

/**
 * JWT secret instance - initialized once and validated on first access
 */
let jwtSecretInstance: string | null = null

/**
 * Gets the JWT secret with caching for performance.
 * The secret is validated only once on first access.
 * 
 * @throws {Error} If JWT_SECRET is not set or doesn't meet security requirements
 * @returns {string} The validated JWT secret
 */
export function getJWTSecretCached(): string {
  if (jwtSecretInstance === null) {
    jwtSecretInstance = getJWTSecret()
  }
  return jwtSecretInstance
}
