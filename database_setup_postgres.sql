-- PostgreSQL Database Setup for Cybercrime Prevention App

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reports table
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
);

-- Create tips table
CREATE TABLE IF NOT EXISTS tips (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO users (name, email, password, role) 
VALUES ('Admin', 'admin@cybercrime.gov', '$2b$10$8K1p/a0dLN7yxlxC8BYBzOGEWoKBa5EiUTkiHQGvUbfxAZqQvqQvK', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample tips
INSERT INTO tips (title, content) VALUES
('Strong Passwords', 'Use complex passwords with a mix of uppercase, lowercase, numbers, and special characters. Avoid using personal information.'),
('Two-Factor Authentication', 'Enable 2FA on all your important accounts. This adds an extra layer of security beyond just your password.'),
('Phishing Awareness', 'Be cautious of suspicious emails, links, and attachments. Verify sender identity before clicking or downloading anything.'),
('Software Updates', 'Keep your operating system, browsers, and software updated with the latest security patches.'),
('Secure Networks', 'Avoid using public Wi-Fi for sensitive transactions. Use VPN when connecting to untrusted networks.')
ON CONFLICT DO NOTHING;