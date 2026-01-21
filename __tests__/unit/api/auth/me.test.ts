// Mock TransformStream for AI SDK
if (typeof TransformStream === 'undefined') {
  global.TransformStream = class {
    constructor() {
      return {
        readable: new ReadableStream(),
        writable: new WritableStream()
      };
    }
  } as any;
}

// NextRequest and NextResponse are mocked below
import { findUserById } from '@/lib/models/user.model';
import { getJWTSecretCached } from '@/lib/jwt-config';
import { verify } from 'jsonwebtoken';

// Mock dependencies
jest.mock('@/lib/models/user.model');
jest.mock('@/lib/jwt-config');
jest.mock('jsonwebtoken');

import { GET } from '@/app/api/auth/me/route';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status || 200,
      json: jest.fn().mockResolvedValue(data),
      cookies: {
        set: jest.fn(),
        delete: jest.fn(),
      },
    })),
  },
}));

const mockFindUserById = findUserById as jest.MockedFunction<typeof findUserById>;
const mockGetJWTSecretCached = getJWTSecretCached as jest.MockedFunction<typeof getJWTSecretCached>;
const mockVerify = verify as jest.MockedFunction<typeof verify>;

describe('Get Current User API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return error when not logged in', async () => {
      // Create mock request without auth token
      const mockRequest = {
        cookies: {
          get: jest.fn().mockReturnValue(undefined)
        }
      } as unknown as NextRequest;

      // Call the GET function
      const response = await GET(mockRequest);

      // Verify response
      expect(response.status).toBe(401);
      const responseData = await response.json();
      expect(responseData).toEqual({ error: '未登录' });

      // Verify mock was called
      expect(mockRequest.cookies.get).toHaveBeenCalledWith('auth_token');
    });

    it('should return error when token is invalid', async () => {
      // Mock JWT secret
      const mockSecret = 'test-jwt-secret';
      mockGetJWTSecretCached.mockReturnValue(mockSecret);

      // Mock verify to throw error
      mockVerify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Create mock request with auth token
      const mockRequest = {
        cookies: {
          get: jest.fn().mockReturnValue({ value: 'invalid-token' })
        }
      } as unknown as NextRequest;

      // Call the GET function
      const response = await GET(mockRequest);

      // Verify response
      expect(response.status).toBe(401);
      const responseData = await response.json();
      expect(responseData).toEqual({ error: '认证失败' });

      // Verify mocks were called
      expect(mockRequest.cookies.get).toHaveBeenCalledWith('auth_token');
      expect(mockVerify).toHaveBeenCalledWith('invalid-token', mockSecret);
    });

    it('should return error when user not found', async () => {
      // Mock JWT secret
      const mockSecret = 'test-jwt-secret';
      mockGetJWTSecretCached.mockReturnValue(mockSecret);

      // Mock verify to return decoded token
      const mockDecoded = { userId: 1 };
      mockVerify.mockReturnValue(mockDecoded);

      // Mock findUserById to return null
      mockFindUserById.mockResolvedValue(null);

      // Create mock request with auth token
      const mockRequest = {
        cookies: {
          get: jest.fn().mockReturnValue({ value: 'valid-token' })
        }
      } as unknown as NextRequest;

      // Call the GET function
      const response = await GET(mockRequest);

      // Verify response
      expect(response.status).toBe(401);
      const responseData = await response.json();
      expect(responseData).toEqual({ error: '认证失败' });

      // Verify mocks were called
      expect(mockRequest.cookies.get).toHaveBeenCalledWith('auth_token');
      expect(mockVerify).toHaveBeenCalledWith('valid-token', mockSecret);
      expect(mockFindUserById).toHaveBeenCalledWith(1);
    });

    it('should return user information successfully', async () => {
      // Mock JWT secret
      const mockSecret = 'test-jwt-secret';
      mockGetJWTSecretCached.mockReturnValue(mockSecret);

      // Mock verify to return decoded token
      const mockDecoded = { userId: 1 };
      mockVerify.mockReturnValue(mockDecoded);

      // Mock findUserById to return user
      const mockUser = {
        id: 1,
        username: '测试用户',
        phone: '13800138000',
        email: 'test@example.com',
        password: 'hashed-password',
        is_local_user: true,
        user_type: 'normal'
      };
      mockFindUserById.mockResolvedValue(mockUser);

      // Create mock request with auth token
      const mockRequest = {
        cookies: {
          get: jest.fn().mockReturnValue({ value: 'valid-token' })
        }
      } as unknown as NextRequest;

      // Call the GET function
      const response = await GET(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual({
        user: {
          id: 1,
          username: '测试用户',
          phone: '13800138000',
          email: 'test@example.com',
          is_local_user: true,
          user_type: 'normal'
        }
      });

      // Verify mocks were called
      expect(mockRequest.cookies.get).toHaveBeenCalledWith('auth_token');
      expect(mockVerify).toHaveBeenCalledWith('valid-token', mockSecret);
      expect(mockFindUserById).toHaveBeenCalledWith(1);
    });

    it('should handle errors gracefully', async () => {
      // Mock JWT secret
      const mockSecret = 'test-jwt-secret';
      mockGetJWTSecretCached.mockReturnValue(mockSecret);

      // Mock verify to throw error
      mockVerify.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      // Create mock request with auth token
      const mockRequest = {
        cookies: {
          get: jest.fn().mockReturnValue({ value: 'valid-token' })
        }
      } as unknown as NextRequest;

      // Call the GET function
      const response = await GET(mockRequest);

      // Verify response
      expect(response.status).toBe(401);
      const responseData = await response.json();
      expect(responseData).toEqual({ error: '认证失败' });

      // Verify mocks were called
      expect(mockRequest.cookies.get).toHaveBeenCalledWith('auth_token');
      expect(mockVerify).toHaveBeenCalledWith('valid-token', mockSecret);
    });
  });
});
