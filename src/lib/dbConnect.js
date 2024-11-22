// /lib/dbConnect.js

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,       //
  user: process.env.DB_USER,       // your DB username
  password: process.env.DB_PASS,   // your DB password
  database: process.env.DB_NAME,   // your DB name
  waitForConnections: true,
  connectionLimit: 10,             // ad
  queueLimit: 0,
  
});

export default pool;
