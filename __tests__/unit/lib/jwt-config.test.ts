import { JWT_CONFIG, REFRESH_TOKEN_CONFIG } from '@/lib/jwt-config';

describe('JWT Configuration', () => {
  describe('JWT_CONFIG', () => {
    it('should have correct JWT configuration', () => {
      expect(JWT_CONFIG).toBeDefined();
      expect(JWT_CONFIG.secret).toBeDefined();
      expect(JWT_CONFIG.secret.length).toBeGreaterThanOrEqual(32);
      expect(JWT_CONFIG.expiresIn).toBe('7d');
      expect(JWT_CONFIG.algorithm).toBe('HS256');
    });
  });

  describe('REFRESH_TOKEN_CONFIG', () => {
    it('should have correct refresh token configuration', () => {
      expect(REFRESH_TOKEN_CONFIG).toBeDefined();
      expect(REFRESH_TOKEN_CONFIG.secret).toBeDefined();
      expect(REFRESH_TOKEN_CONFIG.secret.length).toBeGreaterThanOrEqual(32);
      expect(REFRESH_TOKEN_CONFIG.expiresIn).toBe('30d');
      expect(REFRESH_TOKEN_CONFIG.algorithm).toBe('HS256');
    });
  });

  it('should have different secrets for JWT and refresh token', () => {
    expect(JWT_CONFIG.secret).not.toBe(REFRESH_TOKEN_CONFIG.secret);
  });
});
