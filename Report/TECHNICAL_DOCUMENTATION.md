# Technical Documentation

## System Requirements
- Node.js 16+ 
- MySQL 8.0+ or PostgreSQL 12+
- 512MB RAM minimum
- 1GB storage space

## Installation Guide

### Local Development
```bash
git clone https://github.com/PriyanshuKSharma/project-cifs
cd project-cifs
npm install
cp .env.example .env
# Configure database credentials in .env
npm run dev
```

### Production Deployment
```bash
# Render.com deployment via Blueprint
# Database: PostgreSQL (auto-configured)
# Build: npm install
# Start: npm start
```

## API Endpoints

### Authentication
- `POST /login` - User login
- `POST /register` - User registration  
- `GET /logout` - User logout

### Reports
- `GET /reports` - List user reports
- `POST /report/new` - Create new report
- `GET /report/:id` - View report details
- `PUT /report/:id/status` - Update report status (Admin)

### Admin
- `GET /admin/dashboard` - Admin statistics
- `GET /admin/reports` - All reports management
- `GET /admin/tips` - Tips management

## Database Models

### User Model
```javascript
{
  id: INTEGER PRIMARY KEY,
  name: VARCHAR(100),
  email: VARCHAR(100) UNIQUE,
  phone: VARCHAR(15),
  password: VARCHAR(255), // bcrypt hashed
  role: ENUM('user', 'admin'),
  created_at: TIMESTAMP
}
```

### Report Model  
```javascript
{
  id: INTEGER PRIMARY KEY,
  user_id: INTEGER FOREIGN KEY,
  title: VARCHAR(200),
  description: TEXT,
  incident_type: VARCHAR(50),
  evidence_file: VARCHAR(255),
  status: ENUM('pending', 'review', 'resolved', 'rejected'),
  admin_response: TEXT,
  created_at: TIMESTAMP
}
```

## Security Implementation
- **Password Security:** bcrypt with salt rounds
- **Session Security:** HTTP-only cookies, secure flags
- **File Upload Security:** Type validation, size limits
- **Input Validation:** Server-side validation for all inputs
- **SQL Injection Prevention:** Parameterized queries

## Performance Optimizations
- Database indexing on frequently queried fields
- Efficient query patterns with joins
- Static asset optimization
- Responsive image loading
- Minimal JavaScript bundle

## Error Handling
- Comprehensive try-catch blocks
- User-friendly error messages
- Server error logging
- Graceful degradation for failed operations