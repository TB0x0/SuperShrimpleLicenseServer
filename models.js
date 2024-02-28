// TB0x0 SSLS 2024

const mysql = require('mysql2/promise');

// Licenses Model
const Licenses = {
    async addLicense(license, product, expirationDate, pool) {
        const [result] = await pool.query('INSERT INTO licenses (license, product, expirationDate) VALUES (?, ?, ?)', [license, product, expirationDate]);
        return result.insertId;
    },

    async removeLicenseByKey(license, pool) {
        const [result] = await pool.query('DELETE FROM licenses WHERE license = ?', [license]);
        return result;
    },

    async getLicenseByKey(license, pool) {
        const [retLicense] = await pool.query('SELECT * FROM licenses WHERE license = ?', [license]);
        return retLicense;
    }
};

// License Admin Model
const LicenseAdmin = {
    async addAdmin(username, password, pool) {
        const [result] = await pool.query('INSERT INTO license_admin (username, pwdHash) VALUES (?, ?)', [username, pwdHash]);
        return result.insertId;
    },

    async getAdminByUsername(username, pool) {
        const [admin] = await pool.query('SELECT * FROM license_admin WHERE username = ?', [username]);
        return admin[0];
    }
};

module.exports = { Licenses, LicenseAdmin };