-- Create admin user with correct password hash
USE cybercrime_db;

-- Delete existing admin if exists
DELETE FROM users WHERE email = 'admin@cybercrime.gov';

-- Insert admin user (password: admin123)
INSERT INTO users (name, email, phone, password, role) VALUES 
('Admin User', 'admin@cybercrime.gov', '1234567890', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');