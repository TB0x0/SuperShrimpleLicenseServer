// TB0x0 SSLS 2024

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Licenses Model
const Licenses = {
    async addLicense(key, product, expirationDate) {
        const [result] = await pool.query('INSERT INTO licenses (key, license, expirationDate) VALUES (?, ?, ?)', [key, license, expirationDate]);
        return result.insertId;
    },

    async getLicenseByKey(key) {
        const [license] = await pool.query('SELECT * FROM licenses WHERE key = ?', [key]);
        return license[0];
    }
};

// License Admin Model
const LicenseAdmin = {
    async addAdmin(username, password) {
        const [result] = await pool.query('INSERT INTO license_admin (username, pwdHash) VALUES (?, ?)', [username, pwdHash]);
        return result.insertId;
    },

    async getAdminByUsername(username) {
        const [admin] = await pool.query('SELECT * FROM license_admin WHERE username = ?', [username]);
        return admin[0];
    }
};

module.exports = { Licenses, LicenseAdmin };