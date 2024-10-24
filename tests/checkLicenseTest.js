// TB0x0 SSLS 2024

const axios = require('axios');

// Test no license given
axios.get('http://localhost:3000/api/licenses/')
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });

// Test a nonexistent license
axios.get('http://localhost:3000/api/licenses/randomlicense123')
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });

// Test an existing license
axios.get('http://localhost:3000/api/licenses/1234jAh')
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });