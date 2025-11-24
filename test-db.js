const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sigma',
  password: 'sigma',
  database: 'cybercrime_db'
});

connection.connect(async (err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
  
  console.log('✅ Connected to MySQL database');
  
  // Test users table
  connection.query('SHOW TABLES LIKE "users"', (err, results) => {
    if (err) {
      console.error('❌ Error checking users table:', err.message);
    } else if (results.length === 0) {
      console.error('❌ Users table does not exist! Run: mysql -u sigma -p cybercrime_db < schema.sql');
    } else {
      console.log('✅ Users table exists');
      
      // Try to insert a test user
      const testUser = {
        name: 'Test User',
        email: 'test@test.com',
        phone: '1234567890',
        password: 'test123'
      };
      
      bcrypt.hash(testUser.password, 10, (err, hash) => {
        if (err) {
          console.error('❌ Password hashing failed:', err.message);
          connection.end();
          return;
        }
        
        connection.query(
          'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
          [testUser.name, testUser.email, testUser.phone, hash],
          (err, result) => {
            if (err) {
              if (err.code === 'ER_DUP_ENTRY') {
                console.log('⚠️  Test user already exists (this is OK)');
              } else {
                console.error('❌ Failed to insert test user:', err.message);
              }
            } else {
              console.log('✅ Test user created successfully! ID:', result.insertId);
            }
            connection.end();
          }
        );
      });
    }
  });
});
