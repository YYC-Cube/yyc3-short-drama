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
      'Please use a strong random value for security.'
    )
  }

  return secret
}

/**
 * JWT secret instance - initialized once and cached.
 * Using a function with closure for thread-safe lazy initialization.
 */
let jwtSecretInstance: string | null = null
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
