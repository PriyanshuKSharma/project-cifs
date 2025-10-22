const db = require('../config/database');

class Tip {
  static async findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tips ORDER BY created_at DESC';
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async create(tipData) {
    const { title, content } = tipData;
    
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO tips (title, content) VALUES (?, ?)';
      db.query(query, [title, content], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tips WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async update(id, tipData) {
    const { title, content } = tipData;
    
    return new Promise((resolve, reject) => {
      const query = 'UPDATE tips SET title = ?, content = ? WHERE id = ?';
      db.query(query, [title, content, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM tips WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = Tip;