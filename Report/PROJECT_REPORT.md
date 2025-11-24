# Cybercrime Reporting System - Project Report

## Project Overview
**Project Name:** CyberGuard - Cybercrime Prevention & Reporting Web Application  
**Technology Stack:** Node.js, Express.js, EJS, MySQL/PostgreSQL, Tailwind CSS  
**Deployment:** Render.com (Free Tier)  
**Repository:** https://github.com/PriyanshuKSharma/project-cifs

## Features Implemented

### User Management
- User registration and authentication with bcrypt password hashing
- Role-based access control (Admin/User)
- Session management with express-session
- Secure login/logout functionality

### Cybercrime Reporting
- Incident report submission with file upload support
- Report status tracking (Pending, Under Review, Resolved, Rejected)
- Evidence attachment (Images, PDFs up to 5MB)
- Report categorization by crime type

### Admin Dashboard
- Comprehensive statistics and analytics
- Report management with status updates
- User management capabilities
- Tips and prevention content management

### Security Features
- Password hashing with bcrypt
- Input validation and sanitization
- File upload restrictions and validation
- Session-based authentication
- SQL injection prevention with parameterized queries

## Technical Architecture

### Backend (Express.js)
- **Routes:** Authentication, User management, Admin operations, API endpoints
- **Models:** User, Report, Tip with database abstraction
- **Middleware:** Authentication, file upload (Multer), session management
- **Database:** Dual support for MySQL and PostgreSQL

### Frontend (EJS Templates)
- Responsive design with Tailwind CSS
- Role-based UI rendering
- Mobile-first approach
- Professional cybersecurity theme

### Database Schema
```sql
Users: id, name, email, phone, password, role, created_at
Reports: id, user_id, title, description, incident_type, evidence_file, status, created_at
Tips: id, title, content, category, created_at
```

## Deployment Configuration
- **Platform:** Render.com
- **Database:** PostgreSQL (Free tier)
- **Environment:** Production-ready with environment variables
- **Auto-deployment:** GitHub integration

## Key Achievements
1. **Full-stack Implementation** - Complete CRUD operations for all entities
2. **Security Best Practices** - Implemented industry-standard security measures
3. **Responsive Design** - Mobile-friendly interface
4. **Role-based Access** - Separate interfaces for users and administrators
5. **File Upload System** - Secure evidence attachment functionality
6. **Production Deployment** - Live application on cloud platform

## Future Enhancements
- Email notifications for report updates
- Real-time chat support
- Advanced analytics and reporting
- Mobile application
- Multi-language support

## Live Application
**URL:** https://project-cifs.onrender.com  
**Admin Login:** admin@cybercrime.gov / admin123  
**Test User:** Create new account via registration

---
*Developed as part of Cybercrime & Forensic Investigation Systems course*