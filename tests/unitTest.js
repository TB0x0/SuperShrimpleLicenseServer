// TB0x0 SSLS 2024

const axios = require('axios');

// Test License Generation
async function sendRequests() {
    const requestData = {
        license: '1234jjh',
        product: 'test_product_name',
        expirationDate: '2024-12-31'
    };

    const request1 = axios.post('http://localhost:3000/api/generateLicense', requestData);
    const request2 = axios.get('http://localhost:3000/api/licenses/1234jjh');
    const request3 = axios.post('http://localhost:3000/api/removelicense/1234jjh');

    // Run requests concurrently
    await axios.all([request1, request2, request3]).then(axios.spread(function (res1, res2, res3) {
        console.log(res1.data);
        console.log(res2.data);
        console.log(res3.data);
    }));
}

sendRequests();