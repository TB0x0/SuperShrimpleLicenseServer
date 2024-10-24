// TB0x0 SSLS 2024

// Imports
const express = require('express');
const mysql = require('mysql2/promise');
const models = require('./models')

require("dotenv").config()

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

// Ensure the pool is accessible from the api endpoints (not sure if this is good code)
let pool;

// Connect to MySQL
(async () => {
    try {
        pool = await mysql.createPool(dbConfig);
        console.log('MySQL Connection Successful......');
        console.log('---API Access is Ready---')
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        process.exit(1); // Terminate the application if unable to connect to MySQL
    }
})();

// API endpoints

// License generation endpoint <COMPLETE>
app.post('/api/generatelicense', async (req, res) => {
    try {
        //Debug: console.log(req.body)
        // Extract license information from the request body
        const { license, product, expirationDate } = req.body;

        // Validate input
        if (!license || !product || !expirationDate) {
            return res.status(400).json({ error: 'Invalid input.' });
        }
        let licenseCheck = await models.Licenses.getLicenseByKey(license, pool)
        //Debug: console.log(licenseCheck)
        
        // Insert license information into the 'licenses' table
        if (licenseCheck.length === 0) { // if the promise returns an empty array its len will be 0. Simple check to make sure license doesn't exist.
            const insertedId = models.Licenses.addLicense(license, product, expirationDate, pool);
            // Respond with success message
            res.status(201).json({ message: 'License successfully added.', insertedId });
        }
        else {
            console.error('License already exists');
            return res.status(400).json({ error: 'License already exists.' });
        }
    } catch (error) {
        console.error('Error inserting license:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// License removal endpoint <COMPLETE>
app.post('/api/removelicense/:license', async (req, res) => {
    try {
        console.log("Removal API accessed. License: ", req.params.license)
        // Extract the license key from the request parameters

        // Validate input
        if (!req.params.license) {
            console.log('Invalid input. Please provide a license key.')
            return res.status(400).json({ error: 'Invalid input. Please provide a license key.' });
        }

        const removeId = await models.Licenses.removeLicenseByKey(req.params.license, pool);

        if (removeId.affectedRows != 0) {
            // Respond with success message
            console.log('License successfully removed.')
            res.status(201).json({ message: 'License successfully removed.', removeId });
        }
        else {
            console.error('License does not exist');
            return res.status(400).json({ error: 'License does not exist.' });
        }

    }
    catch (error) {
        console.error('Error removing license:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// License retrieval endpoint - by key <COMPLETE>
app.get('/api/licenses/:license', async (req, res) => {
    try {
        // Extract the license key from the request parameters
        const paramLicense  = req.params.license;

        // Validate input
        if (!paramLicense) {
            return res.status(400).json({ error: 'Invalid input. Please provide a license key.' });
        }

        // Query the 'licenses' table to retrieve the license by key
        const retrievedLicense = await models.Licenses.getLicenseByKey(paramLicense, pool);

        // Check if the license key was found in the database
        if (retrievedLicense.length === 0) {
            console.log(paramLicense, ', License not Found.')
            return res.status(404).json({ error: 'License not found' });
        }else {
            // Respond with license information
            console.log(paramLicense, ", Valid license(s) retrieved: ", retrievedLicense.length)
            res.status(200).json({
            licenseData: retrievedLicense,
            });
            }

        
    } catch (error) {
        console.error('Error retrieving license:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-');
    console.log('-_-_-_- WELCOME TO SSLS -_-_-_-');
    console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-');
    console.log('Server Starting......');
    console.log(`Server is running on http://localhost:${PORT}`);
});