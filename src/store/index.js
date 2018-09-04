import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import counter from './modules/counter';
import user from './modules/user';
import choice from './modules/choice';
import district from './modules/districtSelect'
import cattle from './modules/cattle'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
 
const store = new Vuex.Store({
    modules: {
        counter: counter,
        user: user,
        choice: choice,
        district: district,
        cattle:cattle,
    },
 
});

Vue.prototype.$store = store;

module.exports = store;