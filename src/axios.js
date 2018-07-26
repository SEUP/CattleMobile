import Axios from 'axios'

const BaseURL = `http://10.90.0.224:3333`
const axios = Axios.create({
    baseURL: BaseURL,
    timeout: 10000
});

module.exports = {
    axios,
    BaseURL
};
