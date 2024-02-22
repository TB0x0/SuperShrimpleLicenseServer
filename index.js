// TB0x0 SSLS 2024

// Imports
const express = require('express');
const mysql = require('mysql2/promise');
const models = require('./models')

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL Connection Configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

// Middleware to parse incoming JSON requests
app.use(express.json());

// MySQL Connection
let pool;

// Connect to MySQL
(async () => {
    try {
        pool = await mysql.createPool(dbConfig);
        console.log('Connected to MySQL');
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        process.exit(1); // Terminate the application if unable to connect to MySQL
    }
})();

// API endpoints

// License generation endpoints
app.post('/api/generatelicense', async (req, res) => {
    try {
        // Extract license information from the request body
        const { key, product, expirationDate } = req.body;

        // Validate input
        if (!key || !product || !expirationDate) {
            return res.status(400).json({ error: 'Invalid input.' });
        }

        // Insert license information into the 'licenses' table
        const insertedId = models.addLicense(key, license, expirationDate);

        // Respond with success message
        res.status(201).json({ message: 'License successfully added.', insertedId });
    } catch (error) {
        console.error('Error inserting license:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to retrieve a license by key
app.get('/api/licenses/:key', async (req, res) => {
    try {
        // Extract the license key from the request parameters
        const { key } = req.params;

        // Validate input
        if (!key) {
            return res.status(400).json({ error: 'Invalid input. Please provide a license key.' });
        }

        // Query the 'licenses' table to retrieve the license by key
        const retrievedLicense = models.getLicenseByKey(key);

        // Check if the license key was found in the database
        if (retrievedLicense.length === 0) {
            return res.status(404).json({ error: 'License not found.' });
        }

        // Respond with license information
        res.status(200).json({ key: retrievedLicense[0].key, product: retrievedLicense[0].product, expirationDate: retrievedLicense[0].expirationDate });
    } catch (error) {
        console.error('Error retrieving license:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});