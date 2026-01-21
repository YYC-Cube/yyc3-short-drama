import pool from '@/lib/db';

// Mock mysql2
jest.mock('mysql2/promise', () => {
  const mockPool = {
    getConnection: jest.fn().mockResolvedValue({
      query: jest.fn(),
      release: jest.fn(),
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
    query: jest.fn(),
    end: jest.fn(),
  };

  return {
    createPool: jest.fn(() => mockPool),
  };
});

describe('Database Connection', () => {
  describe('pool', () => {
    it('should return a database pool instance', () => {
      expect(pool).toBeDefined();
      expect(typeof pool.getConnection).toBe('function');
      expect(typeof pool.query).toBe('function');
      expect(typeof pool.end).toBe('function');
    });
  });
});
