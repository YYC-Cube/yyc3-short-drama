import { z } from 'zod';

/**
 * YYC³ 环境变量配置
 * 使用 Zod 进行类型安全的环境变量验证
 */

// 数据库配置模式
const dbConfigSchema = z.object({
  // 主数据库配置
  DB_MASTER_HOST: z.string().default('localhost'),
  DB_MASTER_PORT: z.string().default('3306'),
  DB_MASTER_USER: z.string().default('yyc3_dj'),
  DB_MASTER_PASS: z.string().default('yyc3_dj'),
  DB_MASTER_NAME: z.string().default('yyc3_my'),
  DB_MASTER_CHARSET: z.string().default('utf8mb4'),
  
  // 从数据库配置（可选）
  DB_SLAVE_HOST: z.string().optional(),
  DB_SLAVE_PORT: z.string().default('3306'),
  DB_SLAVE_USER: z.string().default('yyc3_dj_read'),
  DB_SLAVE_PASS: z.string().default('yyc3_dj'),
  DB_SLAVE_NAME: z.string().default('yyc3_my'),
  DB_SLAVE_CHARSET: z.string().default('utf8mb4'),
  
  // 只读从数据库配置（可选）
  DB_SLAVE_RO_HOST: z.string().optional(),
  DB_SLAVE_RO_PORT: z.string().default('3306'),
  DB_SLAVE_RO_USER: z.string().default('yyc3_dj_readonly'),
  DB_SLAVE_RO_PASS: z.string().default('yyc3_dj'),
  DB_SLAVE_RO_NAME: z.string().default('yyc3_my'),
  DB_SLAVE_RO_CHARSET: z.string().default('utf8mb4'),
});

// 认证配置模式
const authConfigSchema = z.object({
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters long'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_ALGORITHM: z.string().default('HS256'),
  
  REFRESH_TOKEN_SECRET: z.string().min(32, 'REFRESH_TOKEN_SECRET must be at least 32 characters long'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),
  
  BCRYPT_ROUNDS: z.string().default('12'),
});

// 应用配置模式
const appConfigSchema = z.object({
  PORT: z.string().default('3200'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DEV_MODE: z.string().default('true').transform(val => val === 'true'),
  
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3200'),
  NEXT_PUBLIC_API_URL: z.string().default('http://localhost:3200/api'),
  
  APP_NAME: z.string().default('言语逸品 - 河洛文化数字传承平台'),
  COMPANY_NAME: z.string().default('言语逸品'),
  COMPANY_DOMAIN: z.string().default('0379.email'),
});

// 企业邮箱配置模式
const emailConfigSchema = z.object({
  SMTP_HOST: z.string().default('smtp.0379.email'),
  SMTP_PORT: z.string().default('465'),
  SMTP_SECURE: z.string().default('true').transform(val => val === 'true'),
  SMTP_USER: z.string().default('admin@0379.email'),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM_NAME: z.string().default('言语逸品官方'),
  SMTP_FROM_EMAIL: z.string().default('admin@0379.email'),
  SMTP_REPLY_TO: z.string().default('support@0379.email'),
});

// AI 服务配置模式
const aiConfigSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_BASE_URL: z.string().default('https://api.openai.com/v1'),
  OPENAI_DEFAULT_MODEL: z.string().default('gpt-4'),
  
  GROQ_API_KEY: z.string().optional(),
  GROQ_BASE_URL: z.string().default('https://api.groq.com/openai/v1'),
  GROQ_DEFAULT_MODEL: z.string().default('mixtral-8x7b-32768'),
});

// 完整的环境变量模式
const envSchema = z.object({
  ...dbConfigSchema.shape,
  ...authConfigSchema.shape,
  ...appConfigSchema.shape,
  ...emailConfigSchema.shape,
  ...aiConfigSchema.shape,
});

// 类型导出
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * 加载和验证环境变量
 * @returns 验证后的环境变量配置
 */
export function loadEnv(): EnvConfig {
  try {
    const envConfig = envSchema.parse(process.env);
    return envConfig;
  } catch (error) {
    console.error('❌ 环境变量配置错误:', error);
    process.exit(1);
  }
}

// 导出验证后的环境变量
export const env = loadEnv();
