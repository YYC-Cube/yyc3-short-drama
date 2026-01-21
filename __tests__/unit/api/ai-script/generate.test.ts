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

import { POST } from '@/app/api/ai-script/generate/route';
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
jest.mock('ai');
jest.mock('@ai-sdk/openai');

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

describe('AI Script Generate API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set environment variables
    process.env.JWT_SECRET = 'test-jwt-secret-32-characters-long';
  });

  describe('POST', () => {
    it('should return error when not authenticated', async () => {
      // Create mock request without auth token
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue(null) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ theme: '测试主题' })
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
        json: jest.fn().mockResolvedValue({ theme: '测试主题' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(401);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, message: '认证失败' });
    });

    it('should return error when theme is missing', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Create mock request without theme
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
      expect(responseData).toEqual({ success: false, message: '请提供剧本主题' });
    });

    it('should generate script successfully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI text generation
      mockGenerateText.mockResolvedValue({
        text: '标题：测试剧本\n人物：角色1, 角色2\n场景：现代都市\n剧本正文：这是一个测试剧本内容。'
      });

      // Create mock request
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          theme: '测试主题',
          style: '现代',
          length: '短',
          characters: '2-3个主要角色',
          setting: '现代都市'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('剧本生成成功');
      expect(responseData.data.script).toBeDefined();
      expect(responseData.data.script.title).toBe('测试剧本');
      expect(responseData.data.script.content).toBe('标题：测试剧本\n人物：角色1, 角色2\n场景：现代都市\n剧本正文：这是一个测试剧本内容。');

      // Verify mocks were called
      expect(mockJwtVerify).toHaveBeenCalledWith('valid-token', 'test-jwt-secret-32-characters-long');
      expect(mockGenerateText).toHaveBeenCalled();
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
        json: jest.fn().mockResolvedValue({ theme: '测试主题' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, message: '生成剧本失败，请稍后重试' });
    });
  });
});
