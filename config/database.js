const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sigma',
  password: 'sigma', // Update with your MySQL password
  database: 'cybercrime_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;