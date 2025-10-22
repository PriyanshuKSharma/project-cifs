const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create(userData) {
    const { name, email, phone, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      if (process.env.DATABASE_URL) {
        // PostgreSQL
        const query = 'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await db.query(query, [name, email, phone, hashedPassword]);
        return result.rows[0];
      } else {
        // MySQL
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
          db.query(query, [name, email, phone, hashedPassword], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      if (process.env.DATABASE_URL) {
        // PostgreSQL
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await db.query(query, [email]);
        return result.rows[0];
      } else {
        // MySQL
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM users WHERE email = ?';
          db.query(query, [email], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      if (process.env.DATABASE_URL) {
        // PostgreSQL
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
      } else {
        // MySQL
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM users WHERE id = ?';
          db.query(query, [id], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;