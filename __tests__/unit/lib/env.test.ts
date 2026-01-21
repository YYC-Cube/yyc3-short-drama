import { loadEnv } from '@/lib/env';

// Mock console.error
jest.spyOn(console, 'error').mockImplementation();
jest.spyOn(console, 'log').mockImplementation();

// Mock process.exit
const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`process.exit called with code ${code}`);
});

describe('Environment Variable Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear all environment variables
    Object.keys(process.env).forEach(key => {
      delete process.env[key];
    });
  });

  afterAll(() => {
    mockExit.mockRestore();
  });

  describe('loadEnv', () => {
    it('should return default values in test environment', () => {
      // Set NODE_ENV to test
      process.env.NODE_ENV = 'test';

      // Call loadEnv
      const env = loadEnv();

      // Verify default values
      expect(env.DB_MASTER_HOST).toBe('localhost');
      expect(env.DB_MASTER_PORT).toBe('3306');
      expect(env.JWT_SECRET).toBe('test-jwt-secret-123456789012345678901234567890');
      expect(env.REFRESH_TOKEN_SECRET).toBe('test-refresh-token-secret-123456789012345678901234567890');
      expect(env.PORT).toBe('3200');
      expect(env.NODE_ENV).toBe('test');
    });

    it('should validate and return environment variables in production', () => {
      // Set NODE_ENV to production
      process.env.NODE_ENV = 'production';

      // Set required environment variables
      process.env.DB_MASTER_HOST = 'db.example.com';
      process.env.DB_MASTER_PORT = '3306';
      process.env.DB_MASTER_USER = 'production_user';
      process.env.DB_MASTER_PASS = 'production_pass';
      process.env.DB_MASTER_NAME = 'production_db';
      process.env.DB_MASTER_CHARSET = 'utf8mb4';
      process.env.JWT_SECRET = 'production-jwt-secret-123456789012345678901234567890';
      process.env.REFRESH_TOKEN_SECRET = 'production-refresh-token-secret-123456789012345678901234567890';

      // Call loadEnv
      const env = loadEnv();

      // Verify values
      expect(env.DB_MASTER_HOST).toBe('db.example.com');
      expect(env.JWT_SECRET).toBe('production-jwt-secret-123456789012345678901234567890');
      expect(env.NODE_ENV).toBe('production');
    });

    it('should exit process with invalid JWT_SECRET in production', () => {
      // Set NODE_ENV to production
      process.env.NODE_ENV = 'production';

      // Set required environment variables but with invalid JWT_SECRET
      process.env.DB_MASTER_HOST = 'db.example.com';
      process.env.DB_MASTER_PORT = '3306';
      process.env.DB_MASTER_USER = 'production_user';
      process.env.DB_MASTER_PASS = 'production_pass';
      process.env.DB_MASTER_NAME = 'production_db';
      process.env.DB_MASTER_CHARSET = 'utf8mb4';
      process.env.JWT_SECRET = 'short-secret'; // Too short
      process.env.REFRESH_TOKEN_SECRET = 'production-refresh-token-secret-123456789012345678901234567890';

      // Expect process.exit to be called
      expect(() => loadEnv()).toThrow('process.exit called with code 1');
      expect(console.error).toHaveBeenCalled();
    });

    it('should exit process with missing required variables in production', () => {
      // Set NODE_ENV to production
      process.env.NODE_ENV = 'production';

      // Don't set any environment variables

      // Expect process.exit to be called
      expect(() => loadEnv()).toThrow('process.exit called with code 1');
      expect(console.error).toHaveBeenCalled();
    });

    it('should use defaults for optional variables', () => {
      // Set NODE_ENV to production
      process.env.NODE_ENV = 'production';

      // Set required environment variables
      process.env.DB_MASTER_HOST = 'db.example.com';
      process.env.DB_MASTER_PORT = '3306';
      process.env.DB_MASTER_USER = 'production_user';
      process.env.DB_MASTER_PASS = 'production_pass';
      process.env.DB_MASTER_NAME = 'production_db';
      process.env.DB_MASTER_CHARSET = 'utf8mb4';
      process.env.JWT_SECRET = 'production-jwt-secret-123456789012345678901234567890';
      process.env.REFRESH_TOKEN_SECRET = 'production-refresh-token-secret-123456789012345678901234567890';

      // Call loadEnv
      const env = loadEnv();

      // Verify defaults for optional variables
      expect(env.DB_SLAVE_HOST).toBeUndefined();
      expect(env.DB_SLAVE_PORT).toBe('3306');
      expect(env.JWT_EXPIRES_IN).toBe('7d');
      expect(env.SMTP_SECURE).toBe(true);
    });

    it('should use provided values for optional variables', () => {
      // Set NODE_ENV to production
      process.env.NODE_ENV = 'production';

      // Set required environment variables
      process.env.DB_MASTER_HOST = 'db.example.com';
      process.env.DB_MASTER_PORT = '3306';
      process.env.DB_MASTER_USER = 'production_user';
      process.env.DB_MASTER_PASS = 'production_pass';
      process.env.DB_MASTER_NAME = 'production_db';
      process.env.DB_MASTER_CHARSET = 'utf8mb4';
      process.env.JWT_SECRET = 'production-jwt-secret-123456789012345678901234567890';
      process.env.REFRESH_TOKEN_SECRET = 'production-refresh-token-secret-123456789012345678901234567890';

      // Set optional variables
      process.env.DB_SLAVE_HOST = 'slave.example.com';
      process.env.JWT_EXPIRES_IN = '14d';
      process.env.SMTP_SECURE = 'false';

      // Call loadEnv
      const env = loadEnv();

      // Verify provided values
      expect(env.DB_SLAVE_HOST).toBe('slave.example.com');
      expect(env.JWT_EXPIRES_IN).toBe('14d');
      expect(env.SMTP_SECURE).toBe(false);
    });
  });
});
