// TB0x0 SSLS 2024

const axios = require('axios');

const requestData = {
    key: '1234jjh'
};
axios.get('http://localhost:3000/api/licenses/')
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });

axios.get('http://localhost:3000/api/licenses/1234jjh')
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });