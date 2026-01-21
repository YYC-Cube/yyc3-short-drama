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

import { NextRequest } from 'next/server';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((input, init) => ({
    url: input instanceof URL ? input.href : input,
    method: init?.method || 'GET',
    headers: new Headers(init?.headers),
    body: init?.body,
    json: jest.fn().mockResolvedValue(init?.body),
    text: jest.fn().mockResolvedValue(JSON.stringify(init?.body)),
    cookies: {
      get: jest.fn().mockReturnValue(null),
    },
    headers: {
      get: jest.fn().mockReturnValue(null),
    },
  })),
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status || 200,
      json: jest.fn().mockResolvedValue(data),
      cookies: {
        set: jest.fn(),
        delete: jest.fn(),
        get: jest.fn(),
        getAll: jest.fn(),
      },
    })),
    redirect: jest.fn((url, status) => ({
      status: status || 302,
      headers: {
        get: jest.fn((name) => name === 'Location' ? url : null),
      },
      json: jest.fn().mockResolvedValue(null),
    })),
  },
}));

// Mock dependencies
jest.mock('@ai-sdk/openai', () => ({
  openai: jest.fn(() => ({
    generate: jest.fn(),
    stream: jest.fn()
  }))
}));

// Mock env module
jest.mock('@/lib/env', () => ({
  env: {
    JWT_SECRET: 'test-jwt-secret-32-characters-long',
    JWT_EXPIRES_IN: '7d',
    JWT_ALGORITHM: 'HS256'
  }
}));

// Mock jwt.JsonWebTokenError
const mockJsonWebTokenError = jest.fn().mockImplementation(function(message) {
  this.name = 'JsonWebTokenError';
  this.message = message;
});

// Mock jwt module
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  JsonWebTokenError: function(message) {
    this.name = 'JsonWebTokenError';
    this.message = message;
  }
}));

const jwt = require('jsonwebtoken');
const mockJwtVerify = jwt.verify as jest.MockedFunction<typeof jwt.verify>;

// Mock AI generateText
const mockGenerateText = jest.fn();
jest.mock('ai', () => ({
  generateText: (...args: any[]) => mockGenerateText(...args)
}));

// Import POST function after mocking dependencies
import { POST } from '@/app/api/ai-script/titles/route';

describe('AI Script Titles API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('POST', () => {
    it('should return error when not authenticated', async () => {
      // Create mock request without auth token
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue(null) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ content: '测试剧本内容' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(401);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, message: '请先登录' });
    });

    it('should return error when authentication fails', async () => {
      // Mock JWT verification failure
      const jwt = require('jsonwebtoken');
      mockJwtVerify.mockImplementation(() => {
        const error = new jwt.JsonWebTokenError('Invalid token');
        throw error;
      });

      // Create mock request with invalid token
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'invalid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ content: '测试剧本内容' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(401);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, message: '认证失败' });
    });

    it('should return error when both content and theme are missing', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Create mock request without content or theme
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({})
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(400);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, message: '请提供剧本内容或主题' });
    });

    it('should generate titles from content successfully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI text generation
      mockGenerateText.mockResolvedValue({
        text: `1. [标题1：测试标题1]
2. [标题2：测试标题2]
3. [标题3：测试标题3]
4. [标题4：测试标题4]
5. [标题5：测试标题5]`
      });

      // Create mock request with content
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          content: '测试剧本内容，这是一个很长的剧本内容，用于测试标题生成功能。' 
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('标题生成成功');
      expect(responseData.data.titles).toEqual([
        '[标题1：测试标题1]',
        '[标题2：测试标题2]',
        '[标题3：测试标题3]',
        '[标题4：测试标题4]',
        '[标题5：测试标题5]'
      ]);

      // Verify mocks were called
      expect(mockJwtVerify).toHaveBeenCalledWith('valid-token', 'test-jwt-secret-32-characters-long');
      expect(mockGenerateText).toHaveBeenCalled();
    });

    it('should generate titles from theme successfully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI text generation
      mockGenerateText.mockResolvedValue({
        text: `1. [标题1：测试标题1]
2. [标题2：测试标题2]
3. [标题3：测试标题3]
4. [标题4：测试标题4]
5. [标题5：测试标题5]`
      });

      // Create mock request with theme
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          theme: '爱情故事',
          style: '现代'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('标题生成成功');
      expect(responseData.data.titles).toEqual([
        '[标题1：测试标题1]',
        '[标题2：测试标题2]',
        '[标题3：测试标题3]',
        '[标题4：测试标题4]',
        '[标题5：测试标题5]'
      ]);
    });

    it('should generate titles from theme without style successfully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI text generation
      mockGenerateText.mockResolvedValue({
        text: `1. [标题1：测试标题1]
2. [标题2：测试标题2]
3. [标题3：测试标题3]
4. [标题4：测试标题4]
5. [标题5：测试标题5]`
      });

      // Create mock request with theme but no style
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          theme: '爱情故事'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('标题生成成功');
    });

    it('should handle errors gracefully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI generation error
      const mockError = new Error('AI generation failed');
      mockGenerateText.mockRejectedValue(mockError);

      // Create mock request
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          content: '测试剧本内容'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, message: '生成标题失败，请稍后重试' });
    });
  });
});
