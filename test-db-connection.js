/**
 * @file 数据库连接测试脚本
 * @description 测试数据库连接状态
 * @author YYC³
 * @version 1.0.0
 */

// 加载环境变量
require('dotenv').config({ path: '.env.local' });

// 导入数据库连接
const { testConnection } = require('./lib/db');

async function testDbConnection() {
  console.log('🔍 测试数据库连接...');
  console.log('📋 连接信息:');
  console.log('   主机:', process.env.DB_HOST || 'localhost');
  console.log('   端口:', process.env.DB_PORT || '3306');
  console.log('   用户:', process.env.DB_USER || 'yyc3_dj');
  console.log('   数据库:', process.env.DB_NAME || 'yyc3_my');

  try {
    const isConnected = await testConnection();
    if (isConnected) {
      console.log('✅ 数据库连接成功!');
    } else {
      console.log('❌ 数据库连接失败!');
    }
  } catch (error) {
    console.error('❌ 测试数据库连接时发生错误:', error);
  }
}

testDbConnection();
