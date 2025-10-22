const db = require('../config/database');

class Report {
  static async create(reportData) {
    const { user_id, incident_type, description, evidence_file, incident_date } = reportData;
    
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO reports (user_id, incident_type, description, evidence_file, incident_date) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [user_id, incident_type, description, evidence_file, incident_date], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC';
      db.query(query, [userId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id WHERE r.id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC';
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async updateStatus(id, status, adminResponse = null) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE reports SET status = ?, admin_response = ? WHERE id = ?';
      db.query(query, [status, adminResponse, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async getStats() {
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
}

module.exports = Report;