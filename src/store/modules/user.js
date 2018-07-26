import axios from '../../axios'
import router from '../../router'

const state = {
    user: null,
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    }
};

const actions = {
    login: ({commit}, form) => {
        console.log("user/login", form)
        let promise = axios.post('/api/v1/farmer/login', form)
        promise.then((r) => {
            console.log("user/login", r.data)
            let applicationSettings = require("application-settings");
            applicationSettings.setString("token", r.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${applicationSettings.getString('token')}`;
            console.log('user/login', 'finish')
        })
        return promise
    },
    getUser: ({commit}) => {
        console.log("user/getUser")
        let promise = axios.get('/api/v1/farmer/user')
        promise.then((r) => {
            console.log("user/getUser", r.data)
            commit("setUser", r.data);
        })
        return promise
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
