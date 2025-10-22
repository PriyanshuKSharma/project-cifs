const bcrypt = require('bcrypt');
const db = require('./config/database');

async function createAdmin() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Delete existing admin
    db.query('DELETE FROM users WHERE email = ?', ['admin@cybercrime.gov'], (err) => {
      if (err) console.log('No existing admin to delete');
      
      // Insert new admin
      const query = 'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)';
      db.query(query, ['Admin User', 'admin@cybercrime.gov', '1234567890', hashedPassword, 'admin'], (err, result) => {
        if (err) {
          console.error('Error creating admin:', err);
        } else {
          console.log('✅ Admin user created successfully!');
          console.log('Email: admin@cybercrime.gov');
          console.log('Password: admin123');
        }
        process.exit();
      });
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();