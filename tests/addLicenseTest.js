// TB0x0 SSLS 2024

const axios = require('axios');

const requestData = {
    key: '0000_00000',
    product: 'test_product_name',
    expirationDate: '2024-12-31'
};

axios.post('http://localhost:3000/api/generate', requestData)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });