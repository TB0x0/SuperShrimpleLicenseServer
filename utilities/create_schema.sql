-- TB0x0 SSLS 2024
-- Schema creation script

-- Create 'licenses' table
CREATE TABLE IF NOT EXISTS licenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  license VARCHAR(255) NOT NULL,
  product VARCHAR(255) NOT NULL,
  expirationDate DATE NOT NULL
);

-- Create 'license_admin' table
CREATE TABLE IF NOT EXISTS license_admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  pwdHash VARCHAR(255) NOT NULL
);