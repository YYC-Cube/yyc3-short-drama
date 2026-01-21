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

// Mock ai module
jest.mock('ai', () => ({
  generateText: jest.fn()
}));

// Get the mock generateText function
const { generateText: mockGenerateText } = require('ai');
const mockedGenerateText = mockGenerateText as jest.MockedFunction<any>;

// Import POST function after mocking dependencies
import { POST } from '@/app/api/ai-script/optimize/route';
describe('AI Script Optimize API', () => {
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
        json: jest.fn().mockResolvedValue({ content: '测试剧本内容', optimizationType: 'dialogue' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(401);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, message: '认证失败' });
    });

    it('should return error when content is missing', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Create mock request without content
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ optimizationType: 'dialogue' })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(400);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, message: '请提供要优化的剧本内容' });
    });

    it('should optimize script with dialogue type successfully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI text generation
      mockedGenerateText.mockResolvedValue({
        text: '优化后的剧本内容'
      });

      // Create mock request
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          content: '测试剧本内容',
          optimizationType: 'dialogue'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('对话优化完成');
      expect(responseData.data.originalContent).toBe('测试剧本内容');
      expect(responseData.data.optimizedContent).toBe('优化后的剧本内容');
      expect(responseData.data.optimizationType).toBe('dialogue');
      expect(responseData.data.optimizationName).toBe('对话优化');

      // Verify mocks were called
      expect(mockJwtVerify).toHaveBeenCalledWith('valid-token', 'test-jwt-secret-32-characters-long');
      expect(mockedGenerateText).toHaveBeenCalled();
    });

    it('should optimize script with structure type successfully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI text generation
      mockedGenerateText.mockResolvedValue({
        text: '优化后的剧本内容'
      });

      // Create mock request
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          content: '测试剧本内容',
          optimizationType: 'structure'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('结构优化完成');
      expect(responseData.data.optimizationType).toBe('structure');
      expect(responseData.data.optimizationName).toBe('结构优化');
    });

    it('should optimize script with emotion type successfully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI text generation
      mockedGenerateText.mockResolvedValue({
        text: '优化后的剧本内容'
      });

      // Create mock request
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          content: '测试剧本内容',
          optimizationType: 'emotion'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('情感优化完成');
      expect(responseData.data.optimizationType).toBe('emotion');
      expect(responseData.data.optimizationName).toBe('情感优化');
    });

    it('should optimize script with cultural type successfully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI text generation
      mockedGenerateText.mockResolvedValue({
        text: '优化后的剧本内容'
      });

      // Create mock request
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          content: '测试剧本内容',
          optimizationType: 'cultural'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('文化优化完成');
      expect(responseData.data.optimizationType).toBe('cultural');
      expect(responseData.data.optimizationName).toBe('文化优化');
    });

    it('should optimize script with default type successfully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI text generation
      mockedGenerateText.mockResolvedValue({
        text: '优化后的剧本内容'
      });

      // Create mock request
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          content: '测试剧本内容',
          optimizationType: 'unknown'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('综合优化完成');
      expect(responseData.data.optimizationType).toBe('unknown');
      expect(responseData.data.optimizationName).toBe('综合优化');
    });

    it('should handle errors gracefully', async () => {
      // Mock JWT verification success
      mockJwtVerify.mockReturnValue({});

      // Mock AI generation error
      const mockError = new Error('AI optimization failed');
      mockedGenerateText.mockRejectedValue(mockError);

      // Create mock request
      const mockRequest = {
        cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
        headers: { get: jest.fn().mockReturnValue(null) },
        json: jest.fn().mockResolvedValue({ 
          content: '测试剧本内容',
          optimizationType: 'dialogue'
        })
      } as unknown as NextRequest;

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify response
      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData).toEqual({ success: false, message: '优化剧本失败，请稍后重试' });
    });
  });
});