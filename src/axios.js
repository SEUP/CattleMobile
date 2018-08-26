import Axios from 'axios'

const BaseURL = `http://mct.ict.up.ac.th:10008/`;

const axios = Axios.create({
    baseURL: BaseURL,
    timeout: 10000
});

module.exports = {
    axios,
    BaseURL
};
