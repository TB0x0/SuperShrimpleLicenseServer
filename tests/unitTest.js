// TB0x0 SSLS 2024

const axios = require('axios');

// Test License Generation
function sendRequests() {
    const requestData = {
        license: '1234jAh',
        product: 'test_product_name',
        expirationDate: '2024-12-31'
    };

    const request1 = axios.post('http://localhost:3000/api/generateLicense', requestData);
    const request2 = axios.get('http://localhost:3000/api/licenses/1234jAh');
    const request3 = axios.post('http://localhost:3000/api/removelicense/1234jAh');

    // Run requests sequentially
    request1.then(response1 => {
        console.log('Unit Test 1: License Generation....Sent');
        return request2;
    })
    .then(response2 => {
        console.log('Unit Test 2: License Existence Check.....Sent');
    })
    
}

sendRequests();