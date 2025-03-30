-- Database schema for Volunteer Platform
CREATE DATABASE IF NOT EXISTS volunteer_platform;
USE volunteer_platform;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('volunteer', 'organization') NOT NULL DEFAULT 'volunteer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  image_url VARCHAR(255),
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Participants table (volunteers signed up for opportunities)
CREATE TABLE IF NOT EXISTS participants (
  opportunity_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (opportunity_id, user_id),
  FOREIGN KEY (opportunity_id) REFERENCES opportunities(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample data (optional)
INSERT INTO users (email, password, role) VALUES 
('volunteer@example.com', '$2b$10$exampleexampleexampleexampleex', 'volunteer'),
('org@example.com', '$2b$10$exampleexampleexampleexampleex', 'organization');

INSERT INTO opportunities (title, description, location, date, user_id) VALUES
('Community Cleanup', 'Help clean up the local park and surrounding areas', 'Central Park', '2023-12-15 09:00:00', 2),
('Food Bank Assistance', 'Help sort and package food donations for distribution', 'Downtown Food Bank', '2023-12-20 10:00:00', 2);