const db = require('../config/database');

class Report {
  static async create(reportData) {
    const { user_id, incident_type, description, evidence_file, incident_date } = reportData;
    
    try {
      if (process.env.DATABASE_URL) {
        // PostgreSQL
        const query = 'INSERT INTO reports (user_id, incident_type, description, evidence_file, incident_date) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const result = await db.query(query, [user_id, incident_type, description, evidence_file, incident_date]);
        return result.rows[0];
      } else {
        // MySQL
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO reports (user_id, incident_type, description, evidence_file, incident_date) VALUES (?, ?, ?, ?, ?)';
          db.query(query, [user_id, incident_type, description, evidence_file, incident_date], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      if (process.env.DATABASE_URL) {
        // PostgreSQL
        const query = 'SELECT * FROM reports WHERE user_id = $1 ORDER BY created_at DESC';
        const result = await db.query(query, [userId]);
        return result.rows;
      } else {
        // MySQL
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC';
          db.query(query, [userId], (err, results) => {
            if (err) reject(err);
            else resolve(results);
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
        const query = 'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id WHERE r.id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
      } else {
        // MySQL
        return new Promise((resolve, reject) => {
          const query = 'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id WHERE r.id = ?';
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

  static async findAll() {
    try {
      if (process.env.DATABASE_URL) {
        // PostgreSQL
        const query = 'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC';
        const result = await db.query(query);
        return result.rows;
      } else {
        // MySQL
        return new Promise((resolve, reject) => {
          const query = 'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC';
          db.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateStatus(id, status, adminResponse = null) {
    try {
      if (process.env.DATABASE_URL) {
        // PostgreSQL
        const query = 'UPDATE reports SET status = $1, admin_response = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *';
        const result = await db.query(query, [status, adminResponse, id]);
        return result.rows[0];
      } else {
        // MySQL
        return new Promise((resolve, reject) => {
          const query = 'UPDATE reports SET status = ?, admin_response = ? WHERE id = ?';
          db.query(query, [status, adminResponse, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async count() {
    try {
      if (process.env.DATABASE_URL) {
        const query = 'SELECT COUNT(*) as count FROM reports';
        const result = await db.query(query);
        return result.rows[0].count;
      } else {
        return new Promise((resolve, reject) => {
          const query = 'SELECT COUNT(*) as count FROM reports';
          db.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results[0].count);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async countByStatus(status) {
    try {
      if (process.env.DATABASE_URL) {
        const query = 'SELECT COUNT(*) as count FROM reports WHERE status = $1';
        const result = await db.query(query, [status]);
        return result.rows[0].count;
      } else {
        return new Promise((resolve, reject) => {
          const query = 'SELECT COUNT(*) as count FROM reports WHERE status = ?';
          db.query(query, [status], (err, results) => {
            if (err) reject(err);
            else resolve(results[0].count);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async findRecent(limit = 5) {
    try {
      if (process.env.DATABASE_URL) {
        const query = 'SELECT r.*, u.name as user_name FROM reports r JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC LIMIT $1';
        const result = await db.query(query, [limit]);
        return result.rows;
      } else {
        return new Promise((resolve, reject) => {
          const query = 'SELECT r.*, u.name as user_name FROM reports r JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC LIMIT ?';
          db.query(query, [limit], (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async findAllWithUsers() {
    return this.findAll();
  }

  static async findByIdWithUser(id) {
    return this.findById(id);
  }

  static async getStats() {
    try {
      if (process.env.DATABASE_URL) {
        // PostgreSQL
        const query = `
          SELECT 
            COUNT(*) as total,
            COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
            COUNT(CASE WHEN status = 'review' THEN 1 END) as review,
            COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved,
            COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
          FROM reports
        `;
        const result = await db.query(query);
        return result.rows[0];
      } else {
        // MySQL
        return new Promise((resolve, reject) => {
          const query = `
            SELECT 
              COUNT(*) as total,
              SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
              SUM(CASE WHEN status = 'review' THEN 1 ELSE 0 END) as review,
              SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved,
              SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
            FROM reports
          `;
          db.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          });
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Report;