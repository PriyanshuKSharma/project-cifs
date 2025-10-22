# Cybercrime Prevention App - Deployment Guide

## 🚀 Quick Start

### Local Development
```bash
git clone <your-repo-url>
cd cybercrime-prevention-app
npm install
cp .env.example .env  # Edit with your MySQL credentials
mysql -u root -p < database_setup.sql
npm run dev
```

## 🌐 Hosting Options

### 1. Render (Recommended - Free)
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Connect GitHub → New Web Service
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node.js
5. Add environment variables (see below)
6. Deploy

### 2. Railway (Easy Deploy)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub account
3. Deploy from repository
4. Add MySQL database service
5. Set environment variables

### 3. Heroku (Classic)
```bash
heroku create your-app-name
heroku addons:create jawsdb:kitefin  # MySQL database
git push heroku main
```

## 🔧 Environment Variables

Set these on your hosting platform:

```env
# Database (get from hosting provider)
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=cybercrime_db

# Security
SESSION_SECRET=your_random_secret_key_here
NODE_ENV=production

# App Config
PORT=3000
MAX_FILE_SIZE=5242880
```

## 🗄️ Database Setup

### Cloud MySQL Options:
- **PlanetScale** (free tier)
- **Railway MySQL** 
- **Heroku ClearDB**
- **Render PostgreSQL** (modify code for PostgreSQL)

### Setup Steps:
1. Create cloud database
2. Import `database_setup.sql`
3. Update `.env` with connection details
4. Default admin: `admin@cybercrime.gov` / `admin123`

## 📁 File Structure for Deployment

```
cybercrime-prevention-app/
├── .env                 # Environment variables (don't commit)
├── .gitignore          # Exclude sensitive files
├── package.json        # Dependencies
├── app.js             # Main server file
├── database_setup.sql  # Database schema
├── public/            # Static assets
├── views/             # EJS templates
├── routes/            # Express routes
├── models/            # Database models
└── uploads/           # File uploads (create on server)
```

## 🔒 Security Checklist

- [1] Change default admin password
- [2] Use strong `SESSION_SECRET`
- [3] Database credentials secured
- [4] File upload restrictions enabled
- [5] HTTPS enabled (hosting provider handles this)
- [6] Input validation active

## 🐛 Common Issues

**Database Connection Failed:**
- Check environment variables
- Verify database is running
- Test connection string

**File Upload Errors:**
- Ensure `uploads/` directory exists
- Check file size limits
- Verify file permissions

**Session Issues:**
- Set strong `SESSION_SECRET`
- Check if sessions are persisting

## 📞 Support

**Default Admin Login:**
- Email: `admin@cybercrime.gov`
- Password: `admin123`
- **⚠️ Change immediately after first login!**

**Emergency Contacts:**
- Cyber Crime Helpline: 1930
- Email: report@cybercrime.gov.in

## 🔄 Updates

To update your deployed app:
```bash
git add .
git commit -m "Update description"
git push origin main
```

Most hosting platforms auto-deploy from GitHub pushes.

---

**Made with ❤️ for cybersecurity awareness and public safety**