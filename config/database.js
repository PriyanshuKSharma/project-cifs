const mysql = require('mysql2');
const { Pool } = require('pg');

// Use PostgreSQL for production (Render) or MySQL for local development
if (process.env.DATABASE_URL) {
  // PostgreSQL for Render deployment
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  module.exports = {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end()
  };
} else {
  // MySQL for local development
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'sigma',
    password: 'sigma',
    database: 'cybercrime_db'
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
  
  module.exports = connection;
}