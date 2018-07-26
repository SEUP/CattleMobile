import Axios from 'axios'

const axios = Axios.create({
    baseURL: `http://172.25.103.193:3333`,
    timeout: 10000
});

module.exports = axios;