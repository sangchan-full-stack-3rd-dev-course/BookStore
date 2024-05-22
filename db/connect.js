const mysql = require('mysql2');

// .env로 민감한 정보 관리
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PSWORD,
  dataString: true
});

module.exports = connection;