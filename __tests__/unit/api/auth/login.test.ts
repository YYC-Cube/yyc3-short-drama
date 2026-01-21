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
import { findUserByPhone, updateLastLogin } from '@/lib/models/user.model';
import { verifyCode } from '@/lib/models/verification-code.model';
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
jest.mock('@/lib/auth/auth-utils');

import { POST } from '@/app/api/auth/login/route';

// Mock NextResponse
const mockNextResponse = {
  json: jest.fn().mockReturnValue({
    status: 200,
    json: jest.fn().mockResolvedValue({}),
    cookies: {
      set: jest.fn(),
      delete: jest.fn(),
    },
  }),
};

// Mock NextResponse.json
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

// Mock the successful response
const mockSuccessResponse = {
  status: 200,
  json: jest.fn().mockResolvedValue({
    message: '登录成功',
    user: {},
  }),
  cookies: {
    set: jest.fn(),
    delete: jest.fn(),
  },
};

// Mock createErrorResponse and handleAuthError
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
const mockUpdateLastLogin = updateLastLogin as jest.MockedFunction<typeof updateLastLogin>;
const mockVerifyCode = verifyCode as jest.MockedFunction<typeof verifyCode>;
const mockValidateRequestParams = validateRequestParams as jest.MockedFunction<typeof validateRequestParams>;
const mockGenerateAuthToken = generateAuthToken as jest.MockedFunction<typeof generateAuthToken>;
const mockSetAuthCookie = setAuthCookie as jest.MockedFunction<typeof setAuthCookie>;

describe('Login API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST', () => {
    it('should return error when phone or code is missing', async () => {
      // Mock validation failure
      mockValidateRequestParams.mockReturnValue({ isValid: false, error: '请填写手机号和验证码' });

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({})
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Debug: log response object
      console.log('Response:', response);
      console.log('Response status:', response.status);

      // Verify response
      expect(response.status).toBe(400);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, error: '请填写手机号和验证码' });
    });

    it('should return error when verification code is invalid', async () => {
      // Mock validation success
      mockValidateRequestParams.mockReturnValue({ isValid: true });

      // Mock invalid verification code
      mockVerifyCode.mockResolvedValue(false);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ phone: '13800138000', code: '123456' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(400);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, error: '验证码错误或已过期' });
    });

    it('should return error when user does not exist', async () => {
      // Mock validation success
      mockValidateRequestParams.mockReturnValue({ isValid: true });

      // Mock valid verification code
      mockVerifyCode.mockResolvedValue(true);

      // Mock user not found
      mockFindUserByPhone.mockResolvedValue(null);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ phone: '13800138000', code: '123456' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(404);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, error: '用户不存在，请先注册' });
    });

    it('should return success when login is successful', async () => {
      // Mock validation success
      mockValidateRequestParams.mockReturnValue({ isValid: true });

      // Mock valid verification code
      mockVerifyCode.mockResolvedValue(true);

      // Mock user found
      const mockUser = {
        id: 1,
        phone: '13800138000',
        username: '测试用户',
        email: 'test@example.com',
        password: 'hashed-password',
        avatar: '',
        level: '初级导演',
        star_coins: 100,
        is_local_user: true,
        user_type: 'normal'
      };
      mockFindUserByPhone.mockResolvedValue(mockUser);

      // Mock update last login
      mockUpdateLastLogin.mockResolvedValue(undefined);

      // Mock token generation
      const mockToken = 'mock-jwt-token';
      mockGenerateAuthToken.mockReturnValue(mockToken);

      // Mock set auth cookie
      mockSetAuthCookie.mockImplementation((response: NextResponse) => {
        // Do nothing for mock
      });

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ phone: '13800138000', code: '123456' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual({
        message: '登录成功',
        user: {
          id: 1,
          phone: '13800138000',
          username: '测试用户',
          email: 'test@example.com',
          avatar: '',
          level: '初级导演',
          star_coins: 100,
          is_local_user: true,
          user_type: 'normal'
        }
      });

      // Verify all mocks were called
      expect(mockValidateRequestParams).toHaveBeenCalledWith({ phone: '13800138000', code: '123456' }, ['phone', 'code']);
      expect(mockVerifyCode).toHaveBeenCalledWith('13800138000', '123456', 'login');
      expect(mockFindUserByPhone).toHaveBeenCalledWith('13800138000');
      expect(mockUpdateLastLogin).toHaveBeenCalledWith(1);
      expect(mockGenerateAuthToken).toHaveBeenCalledWith(1);
      expect(mockSetAuthCookie).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      // Mock validation success
      mockValidateRequestParams.mockReturnValue({ isValid: true });

      // Mock error during verification
      const mockError = new Error('Database connection failed');
      mockVerifyCode.mockRejectedValue(mockError);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ phone: '13800138000', code: '123456' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, error: '登录失败' });
    });
  });
});
