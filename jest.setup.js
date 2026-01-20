import '@testing-library/jest-dom';

// 模拟环境变量
process.env.JWT_SECRET = 'test-jwt-secret-32-characters-long';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_USER = 'test';
process.env.DB_PASS = 'test';
process.env.DB_NAME = 'test';
