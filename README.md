# Cybercrime Prevention & Reporting Web Application

A comprehensive web application for reporting cybercrimes, tracking case status, and learning prevention techniques.

## 🚀 Features

### For Users:
- **User Registration & Authentication** - Secure account creation and login
- **Cybercrime Reporting** - Submit detailed incident reports with evidence
- **Report Tracking** - Monitor the status of submitted reports
- **Prevention Tips** - Access cybersecurity best practices and tips
- **Dashboard** - Personal dashboard with report statistics

### For Admins:
- **Admin Dashboard** - Overview of all reports with statistics
- **Report Management** - Review, update status, and respond to reports
- **Tips Management** - Create and manage prevention tips
- **Status Updates** - Send responses and updates to users

## 🛠️ Tech Stack

- **Frontend:** EJS, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** bcrypt, express-session
- **File Upload:** Multer
- **UI/UX:** Responsive design with Font Awesome icons

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone or Download the Project
```bash
# If using git
git clone <repository-url>
cd cybercrime-prevention-app

# Or extract the downloaded files to your project directory
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

#### Create MySQL Database:
1. Open MySQL command line or MySQL Workbench
2. Run the SQL script provided in `database_setup.sql`:

```bash
mysql -u root -p < database_setup.sql
```

Or manually execute the SQL commands from `database_setup.sql` file.

#### Update Database Configuration:
Edit `config/database.js` and update your MySQL credentials:

```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',     // Update this
  password: 'your_mysql_password', // Update this
  database: 'cybercrime_db'
});
```

### 4. Create Required Directories
```bash
# Create uploads directory for file storage
mkdir uploads
```

### 5. Start the Application

#### Development Mode:
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The application will be available at: `http://localhost:3000`

## 👤 Default Admin Account

After running the database setup, you can login as admin with:

- **Email:** admin@cybercrime.gov
- **Password:** admin123

**⚠️ Important:** Change the default admin password after first login!

## 📁 Project Structure

```
cybercrime-prevention-app/
├── config/
│   └── database.js          # Database configuration
├── controllers/             # Route controllers (if needed)
├── models/
│   ├── User.js             # User model
│   ├── Report.js           # Report model
│   └── Tip.js              # Tip model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── user.js             # User routes
│   └── admin.js            # Admin routes
├── views/
│   ├── partials/
│   │   ├── header.ejs      # Header partial
│   │   └── footer.ejs      # Footer partial
│   ├── admin/              # Admin views
│   │   ├── dashboard.ejs
│   │   ├── reports.ejs
│   │   ├── report-detail.ejs
│   │   └── tips.ejs
│   ├── index.ejs           # Homepage
│   ├── login.ejs           # Login page
│   ├── register.ejs        # Registration page
│   ├── dashboard.ejs       # User dashboard
│   ├── report-form.ejs     # Report submission form
│   ├── reports.ejs         # User reports list
│   ├── report-detail.ejs   # Report details
│   └── tips.ejs            # Prevention tips
├── public/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── main.js         # Client-side JavaScript
│   └── images/             # Static images
├── uploads/                # File uploads directory
├── app.js                  # Main application file
├── package.json            # Dependencies and scripts
├── database_setup.sql      # Database schema
└── README.md              # This file
```

## 🔐 Security Features

- **Password Hashing:** bcrypt for secure password storage
- **Session Management:** Express sessions for authentication
- **Input Validation:** Server-side validation for all forms
- **File Upload Security:** File type and size restrictions
- **SQL Injection Prevention:** Parameterized queries

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎯 Usage Guide

### For Users:

1. **Register:** Create a new account with your details
2. **Login:** Access your account
3. **Report Crime:** Submit cybercrime incidents with evidence
4. **Track Reports:** Monitor status updates from authorities
5. **Learn:** Read prevention tips and best practices

### For Admins:

1. **Login:** Use admin credentials
2. **Dashboard:** View statistics and recent reports
3. **Manage Reports:** Review, update status, and respond
4. **Manage Tips:** Add, edit, or delete prevention tips

## 🚨 Incident Types Supported

- Phishing
- Identity Theft
- Financial Fraud
- Cyberbullying
- Ransomware
- Social Media Fraud
- Online Shopping Fraud
- Email Scam
- Other

## 📞 Emergency Contacts

- **Cyber Crime Helpline:** 1930
- **Email:** report@cybercrime.gov.in

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   - Check MySQL service is running
   - Verify database credentials in `config/database.js`
   - Ensure database `cybercrime_db` exists

2. **File Upload Issues:**
   - Check `uploads/` directory exists and has write permissions
   - Verify file size is under 5MB
   - Ensure file type is supported

3. **Port Already in Use:**
   - Change port in `app.js` or kill process using port 3000

### Development Tips:

- Use `npm run dev` for development with auto-restart
- Check browser console for JavaScript errors
- Monitor server logs for backend issues

## 🔄 Future Enhancements

- Email notifications for report updates
- Real-time chat support
- Advanced search and filtering
- Data analytics and reporting
- Mobile app version
- Multi-language support

## 📄 License

This project is created for educational purposes. Feel free to modify and use as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section

---

**Made with ❤️ for cybersecurity awareness and public safety**