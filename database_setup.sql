-- Create database
CREATE DATABASE IF NOT EXISTS cybercrime_db;
USE cybercrime_db;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Reports table
CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  incident_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  evidence_file VARCHAR(255),
  incident_date DATE NOT NULL,
  status ENUM('pending', 'review', 'resolved', 'rejected') DEFAULT 'pending',
  admin_response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tips table
CREATE TABLE tips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, phone, password, role) VALUES 
('Admin User', 'admin@cybercrime.gov', '1234567890', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample prevention tips
INSERT INTO tips (title, content) VALUES 
('Strong Password Protection', 'Use complex passwords with a mix of letters, numbers, and symbols. Never reuse passwords across multiple accounts.'),
('Phishing Email Awareness', 'Be cautious of suspicious emails asking for personal information. Always verify sender authenticity before clicking links.'),
('Social Media Privacy', 'Review your privacy settings regularly and avoid sharing sensitive personal information publicly.'),
('Safe Online Shopping', 'Only shop on secure websites (HTTPS) and use trusted payment methods. Avoid public Wi-Fi for transactions.');

-- Note: Admin login credentials
-- Email: admin@cybercrime.gov
-- Password: admin123