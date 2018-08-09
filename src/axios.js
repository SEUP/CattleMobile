import Axios from 'axios'

const BaseURL = `http://10.0.2.2:3333`;

const axios = Axios.create({
    baseURL: BaseURL,
    timeout: 10000
});

module.exports = {
    axios,
    BaseURL
};
