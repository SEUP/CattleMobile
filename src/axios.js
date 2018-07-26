import Axios from 'axios'

const axios = Axios.create({
    baseURL: `http://10.0.2.2:3333`,
    timeout: 10000
});

module.exports = axios;