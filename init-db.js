const { Pool } = require('pg');
const bcrypt = require('bcrypt');

async function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.log('No DATABASE_URL found, skipping PostgreSQL initialization');
    return;
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Initializing PostgreSQL database...');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create reports table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        incident_type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        incident_date DATE,
        location VARCHAR(255),
        evidence_file VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        admin_response TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tips table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tips (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await pool.query(`
      INSERT INTO users (name, email, password, role) 
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
    `, ['Admin', 'admin@cybercrime.gov', hashedPassword, 'admin']);

    // Insert sample tips
    const tips = [
      ['Strong Passwords', 'Use complex passwords with a mix of uppercase, lowercase, numbers, and special characters.'],
      ['Two-Factor Authentication', 'Enable 2FA on all your important accounts for extra security.'],
      ['Phishing Awareness', 'Be cautious of suspicious emails, links, and attachments.'],
      ['Software Updates', 'Keep your operating system and software updated with latest security patches.'],
      ['Secure Networks', 'Avoid using public Wi-Fi for sensitive transactions. Use VPN when needed.']
    ];

    for (const [title, content] of tips) {
      await pool.query(`
        INSERT INTO tips (title, content) 
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `, [title, content]);
    }

    console.log('Database initialized successfully!');
    console.log('Admin login: admin@cybercrime.gov / admin123');

  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();