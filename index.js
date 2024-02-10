// TB0x0 2024 SSLS

// Imports
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = process.env.PORT || 3000;

// Connection URL and Database Name
const url = 'mongodb://localhost:27017'; // Mongo server IP:Port
const dbName = 'SSLS-Licenses'; // Mongo database name

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB Connection
let client;

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((connectedClient) => {
    console.log('Connected to MongoDB');
    client = connectedClient;
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Terminate the application if unable to connect to MongoDB
  });

// API endpoints
  
// License generation endpoints
app.post('/api/generate', async (req, res) => {
  try {
    // Extract license information from the request body
    const { key, product, expirationDate } = req.body;

    // Validate input
    if (!key || !product || !expirationDate) {
      return res.status(400).json({ error: 'Invalid input.' });
    }

    // Get the MongoDB database
    const db = client.db(dbName);

    // Insert license information into the 'licenses' collection
    const result = await db.collection('licenses').insertOne({ key, product, expirationDate });

    // Respond with success message
    res.status(201).json({ message: 'License successfully added.', insertedId: result.insertedId });
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

    // Get the MongoDB database
    const db = client.db(dbName);

    // Query the 'licenses' collection to retrieve the license by key
    const license = await db.collection('licenses').findOne({ key });

    // Check if the license key was found in the database
    if (!license) {
      return res.status(404).json({ error: 'License not found.' });
    }

    // Respond with license information
    res.status(200).json({ key: license.key, product: license.product, expirationDate: license.expirationDate });
  } catch (error) {
    console.error('Error retrieving license:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
