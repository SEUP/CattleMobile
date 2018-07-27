import {axios} from '../../axios'
import router from '../../router'
import http from 'http'

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
    logout : async ()=>{
        applicationSettings.remove('token');
        axios.defaults.headers.common['Authorization'] = ``;
    },
    reLogin: async ({commit}) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${applicationSettings.getString('token')}`;
    },
    login: async ({commit}, form) => {
        console.log("user/login", form.username, form.password)
        let result = await axios.post('/api/v1/farmer/login', form)
            .then((r) => {
                console.log("user/login", r.data)
                applicationSettings.setString("token", r.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${applicationSettings.getString('token')}`;
                console.log('user/login', 'finish')

                return r.data;
            })

        return result
    },
    getUser: async ({commit}) => {
        console.log("user/getUser")
        let result = await axios.get('/api/v1/farmer/user')
            .then((r) => {
                console.log("user/getUser", r.data)
                commit("setUser", r.data);
                return r.data;
            })
        return result;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
