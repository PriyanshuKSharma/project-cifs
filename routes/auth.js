const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Tip = require('../models/Tip');

// Homepage
router.get('/', async (req, res) => {
  try {
    const tips = await Tip.findAll();
    res.render('index', { tips: tips.slice(0, 3) });
  } catch (error) {
    res.render('index', { tips: [] });
  }
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect(req.session.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
  }
  res.render('login');
});

// Register page
router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('register');
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

    req.flash('success', 'Login successful');
    res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
  } catch (error) {
    req.flash('error', 'Login failed');
    res.redirect('/login');
  }
});

// Register POST
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/register');
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      req.flash('error', 'Email already registered');
      return res.redirect('/register');
    }

    await User.create({ name, email, phone, password });
    req.flash('success', 'Registration successful. Please login.');
    res.redirect('/login');
  } catch (error) {
    req.flash('error', 'Registration failed');
    res.redirect('/register');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;