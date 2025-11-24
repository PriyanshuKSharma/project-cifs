-- Create database
CREATE DATABASE IF NOT EXISTS cybercrime_db;
USE cybercrime_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  incident_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  incident_date DATE,
  location VARCHAR(255),
  evidence_file VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  admin_response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create tips table
CREATE TABLE IF NOT EXISTS tips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123)
INSERT IGNORE INTO users (name, email, password, role) 
VALUES ('Admin', 'admin@cybercrime.gov', '$2b$10$rBV2kHf/eU9n7Z8QqGJHXOxN5y5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', 'admin');

-- Insert sample tips
INSERT IGNORE INTO tips (title, content) VALUES
('Strong Passwords', 'Use complex passwords with a mix of uppercase, lowercase, numbers, and special characters.'),
('Two-Factor Authentication', 'Enable 2FA on all your important accounts for extra security.'),
('Phishing Awareness', 'Be cautious of suspicious emails, links, and attachments.'),
('Software Updates', 'Keep your operating system and software updated with latest security patches.'),
('Secure Networks', 'Avoid using public Wi-Fi for sensitive transactions. Use VPN when needed.');
