const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');
const Tip = require('../models/Tip');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'user') {
    req.flash('error', 'Please login to access this page');
    return res.redirect('/login');
  }
  next();
};

// User dashboard
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const reports = await Report.findByUserId(req.session.user.id);
    res.render('dashboard', { reports });
  } catch (error) {
    req.flash('error', 'Error loading dashboard');
    res.render('dashboard', { reports: [] });
  }
});

// New report form
router.get('/report/new', requireAuth, (req, res) => {
  res.render('report-form');
});

// Submit new report
router.post('/report/new', requireAuth, upload.single('evidence'), async (req, res) => {
  try {
    const { incident_type, description, incident_date } = req.body;
    const evidence_file = req.file ? req.file.filename : null;

    await Report.create({
      user_id: req.session.user.id,
      incident_type,
      description,
      evidence_file,
      incident_date
    });

    req.flash('success', 'Report submitted successfully');
    res.redirect('/reports');
  } catch (error) {
    req.flash('error', 'Error submitting report');
    res.redirect('/report/new');
  }
});

// User's reports
router.get('/reports', requireAuth, async (req, res) => {
  try {
    const reports = await Report.findByUserId(req.session.user.id);
    res.render('reports', { reports });
  } catch (error) {
    req.flash('error', 'Error loading reports');
    res.render('reports', { reports: [] });
  }
});

// View specific report
router.get('/report/:id', requireAuth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report || report.user_id !== req.session.user.id) {
      req.flash('error', 'Report not found');
      return res.redirect('/reports');
    }

    res.render('report-detail', { report });
  } catch (error) {
    req.flash('error', 'Error loading report');
    res.redirect('/reports');
  }
});



module.exports = router;