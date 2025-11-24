const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Public: get all tips (JSON)
router.get('/tips', async (req, res) => {
  try {
    const [tips] = await pool.query('SELECT id, title, content, created_at FROM tips ORDER BY created_at DESC');
    res.json({ ok: true, tips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'DB error' });
  }
});

// Authenticated: get current user's reports
router.get('/reports', async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json({ ok: false, error: 'Unauthorized' });
    const [reports] = await pool.query('SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC', [req.session.user.id]);
    res.json({ ok: true, reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'DB error' });
  }
});

// Public: get a single report by id (if allowed)
router.get('/report/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reports WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ ok: false, error: 'Not found' });
    const report = rows[0];
    // if requested by non-admin, ensure owner
    if (!req.session.user || (req.session.user.role !== 'admin' && req.session.user.id !== report.user_id)) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }
    res.json({ ok: true, report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'DB error' });
  }
});

// Admin: get all reports (admin only)
router.get('/admin/reports', async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'admin') return res.status(401).json({ ok: false, error: 'Unauthorized' });
    const [reports] = await pool.query('SELECT r.*, u.name AS user_name, u.email AS user_email FROM reports r LEFT JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC');
    res.json({ ok: true, reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'DB error' });
  }
});

// Admin: get a single report (admin only)
router.get('/admin/report/:id', async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'admin') return res.status(401).json({ ok: false, error: 'Unauthorized' });
    const [rows] = await pool.query('SELECT r.*, u.name AS user_name, u.email AS user_email FROM reports r LEFT JOIN users u ON r.user_id = u.id WHERE r.id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, report: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'DB error' });
  }
});

// Admin: update report status (PATCH) - body: { status: 'open'|'investigating'|'closed' }
router.patch('/admin/report/:id/status', async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'admin') return res.status(401).json({ ok: false, error: 'Unauthorized' });
    const { status } = req.body;
    if (!status) return res.status(400).json({ ok: false, error: 'Missing status' });
    const allowed = ['open', 'investigating', 'closed'];
    if (!allowed.includes(status)) return res.status(400).json({ ok: false, error: 'Invalid status' });
    const [result] = await pool.query('UPDATE reports SET status = ? WHERE id = ?', [status, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'DB error' });
  }
});

module.exports = router;
