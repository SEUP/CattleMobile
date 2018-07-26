import axios from '../../axios'
import router from '../../router'
const applicationSettings = require("application-settings");

const state = {
    user: null,
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    }
};

const actions = {
    reLogin: ({commit}) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${applicationSettings.getString('token')}`;
    },
    login: ({commit}, form) => {
        console.log("user/login", form.username, form.password)
        let promise = axios.post('/api/v1/farmer/login', form)
        promise.then((r) => {
            console.log("user/login", r.data)
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
    },
    getAvatar: ({dispatch, state, commit}) => {
        let promise = axios.get(`/api/v1/farmer/farmers/${user.id}/avatar`);
        promise.then((r) => {

        })
        return promise;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
