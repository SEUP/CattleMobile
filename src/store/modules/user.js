import {axios, BaseURL} from '../../axios'
import router from '../../router'
import * as http from 'http'

const applicationSettings = require("application-settings");

const state = {
    user: null,
    farm: null,
    userImage: null,
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setUserImage(state, dataUrl) {
        state.userImage = dataUrl;
    },
    setFarm(state, farm) {
        console.log('setFarm', farm);
        state.farm = farm;
    }
};

const actions = {
    logout: async () => {
        applicationSettings.remove('token');
        axios.defaults.headers.common['Authorization'] = ``;
    },
    reLogin: async ({commit}) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${applicationSettings.getString('token')}`;
    },
    login: async ({commit}, form) => {
        console.log("user/login")
        let result = await axios.post('/api/v1/farmer/login', form)
            .then((r) => {
                // console.log("user/login", r.data)
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
                // console.log("user/getUser", r.data)
                commit("setUser", r.data);
                return r.data;
            })
            .catch((error) => {
                console.log(error.stack);
            })
        return result;
    },

    newFarm: async ({state, commit}) => {
        console.log('newFarm')
        let result = await axios.get(`/api/v1/farmer/farmers/${state.user.id}/farms/create`)
            .then((response) => {
                commit("setFarm", response.data)
                return response.data
            }).catch((error) => {
                return null
            })
        return result
    },
    getFarm: async ({state, commit, dispatch}) => {
        console.log('getFarm', state.user.id)

        let result = await axios.get(`/api/v1/farmer/farmers/${state.user.id}/farms`)
            .then(async (response) => {
                if (response.data) {
                    console.log("getFarm", response.data);
                    commit("setFarm", response.data)
                    return response.data
                } else {
                    return await dispatch('newFarm');
                }
            }).catch((error) => {
                return null
            })
        return result
    },

    async updateFarm({commit, state}, params) {
        console.log('updateFarm', state.user.id,params)

        if (params.id) {
            let result = await axios.put(`/api/v1/farmer/farmers/${state.user.id}/farms/${params.id}`, params)
                .then(async (response) => {
                    console.log('success', response.data);
                    commit("setFarm", response.data)
                    return response.data;
                })
                .catch((error) => {
                    console.log(error.stack)
                    return null
                })
            return result
        } else {
            let result = await axios.post(`/api/v1/farmer/farmers/${state.user.id}/farms`, params)
                .then(async (response) => {
                    console.log('success', response.data);
                    commit("setFarm", response.data)
                    return response.data;
                })
                .catch((error) => {
                    console.log(error.stack)
                    return null
                })
            return result
        }


    },

    async downloadAvatar(context, params) {
        console.log('downloadAvatar');
        return await http.getImage(`${BaseURL}/api/v1/farmer/farmers/${context.state.user.id}/avatar`).then((r) => {
            // getImage method returns ImageSource object
            // console.log("downloadAvatar", r);
            let base64 = r.toBase64String('png', 1);
            let url = `data:image/png;base64,${base64}`
            // console.log("downloadAvatar", url);
            context.commit('setUserImage', url);
            return r;
        }, (e) => {
            console.log(e.stack)
        });
    },

    async uploadAvatar(context, dataUrl) {
        let url = dataUrl
        console.log('uploadAvatar')
        let result = await
            axios.post(`/api/v1/farmer/farmers/${context.state.user.id}/avatar`, {img: url})
                .then((response) => {
                    console.log('uploadAvatar','success')
                    context.commit("setUser", response.data)
                    context.dispatch('downloadAvatar')
                    return response.data
                })
                .catch((error) => {
                    console.log(error.stack)
                    return null
                })
        return result
    },

    async updateUser(context, params) {
        let result = axios.put(`/api/v1/farmer/farmers/${params.id}`, params)
            .then(async (response) => {
                let farmer = response.data
                context.commit("setUser", farmer)
                return farmer;
            }).catch((error) => {
                return null
            })
        return result
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
