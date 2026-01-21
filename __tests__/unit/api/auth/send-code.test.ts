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
import { createVerificationCode, checkRateLimit } from '@/lib/models/verification-code.model';
import { sendSmsCode } from '@/lib/services/sms.service';
import { sendVerificationCodeEmail } from '@/lib/services/email.service';
import { env } from '@/lib/env';

// Mock dependencies
jest.mock('@/lib/models/verification-code.model');
jest.mock('@/lib/services/sms.service');
jest.mock('@/lib/services/email.service');
jest.mock('@/lib/env', () => ({
  env: {
    NODE_ENV: 'test',
  },
}));

import { POST } from '@/app/api/auth/send-code/route';

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

const mockCreateVerificationCode = createVerificationCode as jest.MockedFunction<typeof createVerificationCode>;
const mockCheckRateLimit = checkRateLimit as jest.MockedFunction<typeof checkRateLimit>;
const mockSendSmsCode = sendSmsCode as jest.MockedFunction<typeof sendSmsCode>;
const mockSendVerificationCodeEmail = sendVerificationCodeEmail as jest.MockedFunction<typeof sendVerificationCodeEmail>;

describe('Send Code API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST', () => {
    it('should return error when missing required parameters', async () => {
      // Create mock request without required parameters
      const mockRequest = {
        json: jest.fn().mockResolvedValue({})
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(400);
      const responseData = await response.json();
      expect(responseData).toEqual({ error: '缺少必要参数' });
    });

    it('should return error when sending too frequently', async () => {
      // Mock rate limit check to fail
      mockCheckRateLimit.mockResolvedValue(false);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ phone: '13800138000', type: 'login' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(429);
      const responseData = await response.json();
      expect(responseData).toEqual({ error: '发送过于频繁，请1分钟后再试' });

      // Verify mock was called
      expect(mockCheckRateLimit).toHaveBeenCalledWith('13800138000', 'login', 'phone');
    });

    it('should send SMS verification code successfully', async () => {
      // Mock rate limit check to pass
      mockCheckRateLimit.mockResolvedValue(true);

      // Mock verification code creation
      const mockCode = '123456';
      mockCreateVerificationCode.mockResolvedValue(mockCode);

      // Mock SMS sending to succeed
      mockSendSmsCode.mockResolvedValue({ success: true });

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ phone: '13800138000', type: 'login' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual({ message: '验证码发送成功' });

      // Verify all mocks were called
      expect(mockCheckRateLimit).toHaveBeenCalledWith('13800138000', 'login', 'phone');
      expect(mockCreateVerificationCode).toHaveBeenCalledWith('13800138000', 'login', 'phone');
      expect(mockSendSmsCode).toHaveBeenCalledWith('13800138000', mockCode);
      expect(mockSendVerificationCodeEmail).not.toHaveBeenCalled();
    });

    it('should send email verification code successfully', async () => {
      // Mock rate limit check to pass
      mockCheckRateLimit.mockResolvedValue(true);

      // Mock verification code creation
      const mockCode = '123456';
      mockCreateVerificationCode.mockResolvedValue(mockCode);

      // Mock email sending to succeed
      mockSendVerificationCodeEmail.mockResolvedValue(undefined);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ email: 'test@example.com', type: 'register' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual({ message: '验证码发送成功' });

      // Verify all mocks were called
      expect(mockCheckRateLimit).toHaveBeenCalledWith('test@example.com', 'register', 'email');
      expect(mockCreateVerificationCode).toHaveBeenCalledWith('test@example.com', 'register', 'email');
      expect(mockSendVerificationCodeEmail).toHaveBeenCalledWith('test@example.com', mockCode, 'register');
      expect(mockSendSmsCode).not.toHaveBeenCalled();
    });

    it('should return error when SMS sending fails', async () => {
      // Mock rate limit check to pass
      mockCheckRateLimit.mockResolvedValue(true);

      // Mock verification code creation
      const mockCode = '123456';
      mockCreateVerificationCode.mockResolvedValue(mockCode);

      // Mock SMS sending to fail
      mockSendSmsCode.mockResolvedValue({ success: false, message: '短信发送失败' });

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ phone: '13800138000', type: 'login' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData).toEqual({ error: '短信发送失败' });

      // Verify all mocks were called
      expect(mockCheckRateLimit).toHaveBeenCalledWith('13800138000', 'login', 'phone');
      expect(mockCreateVerificationCode).toHaveBeenCalledWith('13800138000', 'login', 'phone');
      expect(mockSendSmsCode).toHaveBeenCalledWith('13800138000', mockCode);
    });

    it('should handle errors gracefully', async () => {
      // Mock rate limit check to throw error
      const mockError = new Error('Database connection failed');
      mockCheckRateLimit.mockRejectedValue(mockError);

      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ phone: '13800138000', type: 'login' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData).toEqual({ error: '发送验证码失败' });

      // Verify mock was called
      expect(mockCheckRateLimit).toHaveBeenCalledWith('13800138000', 'login', 'phone');
    });
  });
});
