const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Tip = require('../models/Tip');
const Report = require('../models/Report');

// Homepage
router.get('/', async (req, res) => {
  try {
    const tips = await Tip.findAll();
    
    // If user is logged in, show personalized dashboard
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        // Admin dashboard data
        const stats = await Report.getStats();
        const recentReports = await Report.findRecent(5);
        return res.render('index', { 
          tips: tips.slice(0, 3),
          stats,
          recentReports,
          user: req.session.user
        });
      } else {
        // Regular user dashboard data
        const reports = await Report.findByUserId(req.session.user.id);
        return res.render('index', { 
          tips: tips.slice(0, 3),
          reports,
          user: req.session.user
        });
      }
    }
    
    // Not logged in - show public homepage
    res.render('index', { tips: tips.slice(0, 3), user: null });
  } catch (error) {
    console.error('Homepage error:', error);
    res.render('index', { tips: [], user: req.session.user || null });
  }
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect(req.session.user.role === 'admin' ? '/' : '/dashboard');
  }
  res.render('login');
});

// Register page
router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect(req.session.user.role === 'admin' ? '/' : '/dashboard');
  }
  res.render('register');
});

// Test registration page
router.get('/test-register', (req, res) => {
  res.sendFile(__dirname + '/../direct-register.html');
});

// Login POST
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    const isValidPassword = await User.validatePassword(password, user.password);
    if (!isValidPassword) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    req.flash('success', 'Welcome back, ' + user.name + '!');
    res.redirect(user.role === 'admin' ? '/' : '/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    req.flash('error', 'Login failed: ' + error.message);
    res.redirect('/login');
  }
});

// Register POST
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    console.log('=== REGISTRATION START ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);

    if (!name || !email || !password || !confirmPassword) {
      console.log('ERROR: Missing required fields');
      req.flash('error', 'Please fill in all required fields');
      return res.redirect('/register');
    }

    if (password.length < 6) {
      console.log('ERROR: Password too short');
      req.flash('error', 'Password must be at least 6 characters');
      return res.redirect('/register');
    }

    if (password !== confirmPassword) {
      console.log('ERROR: Passwords do not match');
      req.flash('error', 'Passwords do not match');
      return res.redirect('/register');
    }

    console.log('Checking if email exists...');
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      console.log('ERROR: Email already exists');
      req.flash('error', 'Email already registered');
      return res.redirect('/register');
    }

    console.log('Creating user in database...');
    const result = await User.create({ name, email, phone: phone || null, password });
    console.log('SUCCESS: User created!', result);
    
    req.flash('success', 'Account created successfully! Please login.');
    return res.redirect('/login');
  } catch (error) {
    console.error('FATAL ERROR:', error);
    req.flash('error', 'Registration failed: ' + error.message);
    return res.redirect('/register');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Quick register API for testing
router.post('/api/quick-register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    await User.create({ name, email, phone, password });
    res.json({ success: true, message: 'User created' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Tips page for all users
router.get('/tips', async (req, res) => {
  try {
    const tips = await Tip.findAll();
    res.render('tips', { tips });
  } catch (error) {
    res.render('tips', { tips: [] });
  }
});

module.exports = router;