// Input validation and sanitization
const validator = require('validator');

const sanitizeInput = (req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = validator.escape(req.body[key]);
      }
    }
  }
  next();
};

// CSRF protection
const csrfProtection = (req, res, next) => {
  if (req.method === 'POST' && req.session) {
    const token = req.body._csrf || req.headers['x-csrf-token'];
    if (!token || token !== req.session.csrfToken) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
  }
  next();
};

module.exports = { sanitizeInput, csrfProtection };