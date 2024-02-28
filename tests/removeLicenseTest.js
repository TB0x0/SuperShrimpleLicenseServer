// TB0x0 SSLS 2024

const axios = require('axios');

// Test non existent license
axios.post('http://localhost:3000/api/removelicense/nonexistent')
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });

// Test license removal
axios.post('http://localhost:3000/api/removelicense/1234jjh')
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });
