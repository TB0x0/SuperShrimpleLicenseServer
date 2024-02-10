// TB0x0 2024 SSLS

// Imports
const express = require('express');
const mysql = require('mysql');

const app = express();

// Parse incoming json requests
app.use(express.json());

// MySQL DB Implementation
const dbConfig = {
	host: '',
	user: '',
	password: '',
	database: '',
};

// MySQL connection pool
const pool = mysql.createPool(dbConfig);

// API Endpoints

// License creation endpoint
app.post('/api/generate', (req, res) => {
	
	// Extract license fields
	const { key, product, expiration } = req.body;

	// Input validation
	if (!key || !product || !expirationDate) {
		return res.status(400).json({error: 'Invalid input'});
    }
    
    // Insert into database
    const insertQuery = 'INSERT INTO licenses (key, product, expiration)'
    const values = [key, product, expiration];
    
    pool.query(insertQuery, values, (error, results) => {
        if (error) {
            console.error('Error adding license to database:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // If no error respond with success
        res.status(201).json({ message: 'License added successfully.' });
    });
});

// License verification endpoint
app.get('/api/licenses/:key', (req, res) => {
	
	// Extract key
	const { key } = req.params;

	// Input validation
	if (!key) {
		return res.status(400).json({error: 'Invalid input'});
    }
		
    // Insert into database
    const selectQuery = 'SELECT * FROM licenses WHERE `key` = ?';
    const values = [key];
    
    pool.query(insertQuery, values, (error, results) => {
        if (error) {
            console.error('Error verifying license:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // Verify if license key was in database
        if (results.length === 0) {
            return res.status(404).json({ error: 'License not found.'  });
            }
            
        // If no error respond license
        res.status(200).json({ key: license.key, product: license.product, expiration: license.expiration});
    });
});


// Listen for incoming connections on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

