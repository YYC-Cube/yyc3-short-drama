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
import { findUserByPhone, createUser } from '@/lib/models/user.model';
import { verifyCode } from '@/lib/models/verification-code.model';
import { sendWelcomeEmail } from '@/lib/services/email.service';
import {
  validateRequestParams,
  generateAuthToken,
  setAuthCookie,
  createErrorResponse,
  handleAuthError
} from '@/lib/auth/auth-utils';

// Mock dependencies
jest.mock('@/lib/models/user.model');
jest.mock('@/lib/models/verification-code.model');
jest.mock('@/lib/services/email.service');
jest.mock('@/lib/auth/auth-utils');

import { POST } from '@/app/api/auth/register/route';

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

const mockCreateErrorResponse = createErrorResponse as jest.MockedFunction<typeof createErrorResponse>;
mockCreateErrorResponse.mockImplementation((error, status = 400) => {
  return {
    status,
    json: jest.fn().mockResolvedValue({ success: false, error }),
  } as any;
});

const mockHandleAuthError = handleAuthError as jest.MockedFunction<typeof handleAuthError>;
mockHandleAuthError.mockImplementation((error, message = '认证失败') => {
  return {
    status: 500,
    json: jest.fn().mockResolvedValue({ success: false, error: message }),
  } as any;
});

const mockFindUserByPhone = findUserByPhone as jest.MockedFunction<typeof findUserByPhone>;
const mockCreateUser = createUser as jest.MockedFunction<typeof createUser>;
const mockVerifyCode = verifyCode as jest.MockedFunction<typeof verifyCode>;
const mockSendWelcomeEmail = sendWelcomeEmail as jest.MockedFunction<typeof sendWelcomeEmail>;
const mockValidateRequestParams = validateRequestParams as jest.MockedFunction<typeof validateRequestParams>;
const mockGenerateAuthToken = generateAuthToken as jest.MockedFunction<typeof generateAuthToken>;
const mockSetAuthCookie = setAuthCookie as jest.MockedFunction<typeof setAuthCookie>;

describe('Register API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST', () => {
    it('should return error when required fields are missing', async () => {
      // Mock validation failure
      mockValidateRequestParams.mockReturnValue({ isValid: false, error: '请填写完整信息' });

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({})
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(400);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, error: '请填写完整信息' });
    });

    it('should return error when verification code is invalid', async () => {
      // Mock validation success
      mockValidateRequestParams.mockReturnValue({ isValid: true });

      // Mock invalid verification code
      mockVerifyCode.mockResolvedValue(false);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ username: '测试用户', phone: '13800138000', code: '123456' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(400);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, error: '验证码错误或已过期' });
    });

    it('should return error when user already exists', async () => {
      // Mock validation success
      mockValidateRequestParams.mockReturnValue({ isValid: true });

      // Mock valid verification code
      mockVerifyCode.mockResolvedValue(true);

      // Mock existing user
      mockFindUserByPhone.mockResolvedValue({ id: 1, phone: '13800138000' } as any);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ username: '测试用户', phone: '13800138000', code: '123456' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(400);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, error: '该手机号已注册' });
    });

    it('should register successfully without email', async () => {
      // Mock validation success
      mockValidateRequestParams.mockReturnValue({ isValid: true });

      // Mock valid verification code
      mockVerifyCode.mockResolvedValue(true);

      // Mock user not found
      mockFindUserByPhone.mockResolvedValue(null);

      // Mock user creation
      const mockUser = {
        id: 1,
        username: '测试用户',
        phone: '13800138000',
        password: 'hashed-password',
        is_local_user: true,
        user_type: 'normal'
      };
      mockCreateUser.mockResolvedValue(mockUser);

      // Mock token generation
      const mockToken = 'mock-jwt-token';
      mockGenerateAuthToken.mockReturnValue(mockToken);

      // Mock set auth cookie
      mockSetAuthCookie.mockImplementation((response: any) => {
        // Do nothing for mock
      });

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ username: '测试用户', phone: '13800138000', code: '123456' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual({
        message: '注册成功',
        user: {
          id: 1,
          username: '测试用户',
          phone: '13800138000',
          is_local_user: true,
          user_type: 'normal'
        }
      });

      // Verify all mocks were called
      expect(mockValidateRequestParams).toHaveBeenCalledWith({ username: '测试用户', phone: '13800138000', code: '123456' }, ['username', 'phone', 'code']);
      expect(mockVerifyCode).toHaveBeenCalledWith('13800138000', '123456', 'register');
      expect(mockFindUserByPhone).toHaveBeenCalledWith('13800138000');
      expect(mockCreateUser).toHaveBeenCalledWith({ username: '测试用户', phone: '13800138000' });
      expect(mockGenerateAuthToken).toHaveBeenCalledWith(1);
      expect(mockSetAuthCookie).toHaveBeenCalled();
      expect(mockSendWelcomeEmail).not.toHaveBeenCalled();
    });

    it('should register successfully with email and send welcome email', async () => {
      // Mock validation success
      mockValidateRequestParams.mockReturnValue({ isValid: true });

      // Mock valid verification code
      mockVerifyCode.mockResolvedValue(true);

      // Mock user not found
      mockFindUserByPhone.mockResolvedValue(null);

      // Mock user creation
      const mockUser = {
        id: 1,
        username: '测试用户',
        phone: '13800138000',
        email: 'test@example.com',
        password: 'hashed-password',
        is_local_user: true,
        user_type: 'normal'
      };
      mockCreateUser.mockResolvedValue(mockUser);

      // Mock token generation
      const mockToken = 'mock-jwt-token';
      mockGenerateAuthToken.mockReturnValue(mockToken);

      // Mock set auth cookie
      mockSetAuthCookie.mockImplementation((response: any) => {
        // Do nothing for mock
      });

      // Mock send welcome email
      mockSendWelcomeEmail.mockResolvedValue(undefined);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ username: '测试用户', phone: '13800138000', code: '123456', email: 'test@example.com' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual({
        message: '注册成功',
        user: {
          id: 1,
          username: '测试用户',
          phone: '13800138000',
          email: 'test@example.com',
          is_local_user: true,
          user_type: 'normal'
        }
      });

      // Verify all mocks were called
      expect(mockValidateRequestParams).toHaveBeenCalledWith({ username: '测试用户', phone: '13800138000', code: '123456', email: 'test@example.com' }, ['username', 'phone', 'code']);
      expect(mockVerifyCode).toHaveBeenCalledWith('13800138000', '123456', 'register');
      expect(mockFindUserByPhone).toHaveBeenCalledWith('13800138000');
      expect(mockCreateUser).toHaveBeenCalledWith({ username: '测试用户', phone: '13800138000', email: 'test@example.com' });
      expect(mockGenerateAuthToken).toHaveBeenCalledWith(1);
      expect(mockSetAuthCookie).toHaveBeenCalled();
      expect(mockSendWelcomeEmail).toHaveBeenCalledWith('test@example.com', '测试用户');
    });

    it('should handle errors gracefully', async () => {
      // Mock validation success
      mockValidateRequestParams.mockReturnValue({ isValid: true });

      // Mock error during verification
      const mockError = new Error('Database connection failed');
      mockVerifyCode.mockRejectedValue(mockError);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ username: '测试用户', phone: '13800138000', code: '123456' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, error: '注册失败' });
    });
  });
});
