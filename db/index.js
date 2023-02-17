import mysql from 'mysql2';

// 按需导出数据库连接对象
export const db = mysql.createPool({
  port: 3306,
  host: '127.0.0.1',
  database: 'xinwenxitong',
  user: 'root',
  password: 'admin123'
});
