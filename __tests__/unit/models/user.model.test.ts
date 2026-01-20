import { createUser, findUserByPhone, updateLastLogin, updateStarCoins } from '@/lib/models/user.model';
import { query } from '@/lib/db';

// 模拟数据库查询
jest.mock('@/lib/db', () => ({
  query: jest.fn(),
}));

const mockQuery = query as jest.MockedFunction<typeof query>;

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      // Mock the insert result
      mockQuery.mockResolvedValueOnce([{ insertId: 1 }]);
      // Mock the findUserById result
      mockQuery.mockResolvedValueOnce([{
        id: 1,
        username: 'Test User',
        phone: '13800138000',
        email: 'test@example.com',
        level: '初级导演',
        star_coins: 500,
        is_local_user: true,
        user_type: 'vip',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      }]);

      const userData = {
        username: 'Test User',
        phone: '13800138000',
        email: 'test@example.com',
      };

      const result = await createUser(userData);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.username).toBe('Test User');
      expect(result.phone).toBe('13800138000');
      expect(result.email).toBe('test@example.com');
      expect(result.is_local_user).toBe(true);
      expect(result.user_type).toBe('vip');
      expect(result.star_coins).toBe(500);
    });

    it('should create a non-local user successfully', async () => {
      // Mock the insert result
      mockQuery.mockResolvedValueOnce([{ insertId: 2 }]);
      // Mock the findUserById result
      mockQuery.mockResolvedValueOnce([{
        id: 2,
        username: 'Non-local User',
        phone: '13912345678',
        level: '初级导演',
        star_coins: 100,
        is_local_user: false,
        user_type: 'normal',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      }]);

      const userData = {
        username: 'Non-local User',
        phone: '13912345678',
      };

      const result = await createUser(userData);

      expect(result).toBeDefined();
      expect(result.id).toBe(2);
      expect(result.is_local_user).toBe(false);
      expect(result.user_type).toBe('normal');
      expect(result.star_coins).toBe(100);
    });
  });

  describe('findUserByPhone', () => {
    it('should find a user by phone', async () => {
      const mockUser = {
        id: 1,
        username: 'Test User',
        phone: '13800138000',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockQuery.mockResolvedValueOnce([mockUser]);

      const result = await findUserByPhone('13800138000');

      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      mockQuery.mockResolvedValueOnce([null]);

      const result = await findUserByPhone('13800138000');

      expect(result).toBeNull();
    });
  });

  describe('updateLastLogin', () => {
    it('should update last login time', async () => {
      mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]);

      await updateLastLogin(1);

      expect(mockQuery).toHaveBeenCalledWith('UPDATE users SET last_login_at = NOW() WHERE id = ?', [1]);
    });
  });

  describe('updateStarCoins', () => {
    it('should add star coins successfully', async () => {
      mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]);

      await updateStarCoins(1, 100, 'add');

      expect(mockQuery).toHaveBeenCalledWith('UPDATE users SET star_coins = star_coins + ? WHERE id = ?', [100, 1]);
    });

    it('should subtract star coins successfully', async () => {
      mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]);

      await updateStarCoins(1, 50, 'subtract');

      expect(mockQuery).toHaveBeenCalledWith('UPDATE users SET star_coins = star_coins - ? WHERE id = ? AND star_coins >= ?', [50, 1, 50]);
    });

    it('should throw error when insufficient star coins', async () => {
      mockQuery.mockResolvedValueOnce([{ affectedRows: 0 }]);

      await expect(updateStarCoins(1, 500, 'subtract')).rejects.toThrow('星币余额不足');
    });
  });
});
