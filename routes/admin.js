const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Tip = require('../models/Tip');

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    req.flash('error', 'Admin access required');
    return res.redirect('/login');
  }
  next();
};

// Admin dashboard
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    const stats = await Report.getStats();
    const recentReports = await Report.findRecent(5);
    
    res.render('admin/dashboard', {
      stats,
      recentReports
    });
  } catch (error) {
    req.flash('error', 'Error loading dashboard');
    res.render('admin/dashboard', {
      stats: { total: 0, pending: 0, review: 0, resolved: 0, rejected: 0 },
      recentReports: []
    });
  }
});

// All reports
router.get('/reports', requireAdmin, async (req, res) => {
  try {
    const reports = await Report.findAllWithUsers();
    res.render('admin/reports', { reports });
  } catch (error) {
    req.flash('error', 'Error loading reports');
    res.render('admin/reports', { reports: [] });
  }
});

// View specific report
router.get('/report/:id', requireAdmin, async (req, res) => {
  try {
    const report = await Report.findByIdWithUser(req.params.id);
    
    if (!report) {
      req.flash('error', 'Report not found');
      return res.redirect('/admin/reports');
    }

    res.render('admin/report-detail', { report });
  } catch (error) {
    req.flash('error', 'Error loading report');
    res.redirect('/admin/reports');
  }
});

// Update report status
router.post('/report/:id/update', requireAdmin, async (req, res) => {
  try {
    const { status, admin_response } = req.body;
    await Report.updateStatus(req.params.id, status, admin_response);
    
    req.flash('success', 'Report updated successfully');
    res.redirect(`/admin/report/${req.params.id}`);
  } catch (error) {
    req.flash('error', 'Error updating report');
    res.redirect(`/admin/report/${req.params.id}`);
  }
});

// Manage tips
router.get('/tips', requireAdmin, async (req, res) => {
  try {
    const tips = await Tip.findAll();
    res.render('admin/tips', { tips });
  } catch (error) {
    req.flash('error', 'Error loading tips');
    res.render('admin/tips', { tips: [] });
  }
});

// Add new tip
router.post('/tips', requireAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;
    await Tip.create({ title, content });
    
    req.flash('success', 'Tip added successfully');
    res.redirect('/admin/tips');
  } catch (error) {
    req.flash('error', 'Error adding tip');
    res.redirect('/admin/tips');
  }
});

// Delete tip
router.post('/tips/:id/delete', requireAdmin, async (req, res) => {
  try {
    await Tip.delete(req.params.id);
    req.flash('success', 'Tip deleted successfully');
    res.redirect('/admin/tips');
  } catch (error) {
    req.flash('error', 'Error deleting tip');
    res.redirect('/admin/tips');
  }
});

module.exports = router;