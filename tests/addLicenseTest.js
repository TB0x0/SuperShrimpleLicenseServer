// TB0x0 SSLS 2024

const axios = require('axios');

const requestData = {
    license: '1234Test3',
    product: 'test_product_name',
    expirationDate: '2024-12-31'
};

const requestData2 = {
    license: 'QEFR-1476-UIYR-I95T',
    product: 'Product 2',
    expirationDate: '2024-10-31'
};

axios.post('http://localhost:3000/api/generateLicense', requestData)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });

axios.post('http://localhost:3000/api/generateLicense', requestData2)
.then(response => {
    console.log('Response:', response.data);
})
.catch(error => {
    console.error('Error:', error.response.data);
});