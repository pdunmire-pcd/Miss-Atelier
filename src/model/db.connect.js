import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'missatelier',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'miss_atelier',
});

pool.getConnection()
  .then(conn => {
    console.log("MySQL connected successfully!");
    conn.release();
  })
  .catch(err => {
    console.error("MySQL connection error code:", err.code);
    console.error("MySQL connection error number:", err.errno);
    console.error("MySQL full error:", err.message);
  });

export default pool;