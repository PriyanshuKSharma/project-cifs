const mysql = require('mysql2/promise');
const { Pool: PgPool } = require('pg');

// Export a unified query interface that returns [rows, fields] similar to mysql2/promise
if (process.env.DATABASE_URL) {
  // PostgreSQL (production)
  const pool = new PgPool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  module.exports = {
    query: async (text, params) => {
      const res = await pool.query(text, params);
      // return [rows, fields-like]
      return [res.rows, res.fields || null];
    },
    end: () => pool.end()
  };
} else {
  // MySQL (local dev)
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'sigma',
    password: process.env.DB_PASS || 'sigma',
    database: process.env.DB_NAME || 'cybercrime_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  module.exports = pool;
}
