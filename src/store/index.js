import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import counter from './modules/counter';
import user from './modules/user';
import choice from './modules/choice';
import district from './modules/districtSelect';
import cattle from './modules/cattle';

import change_type from './modules/manage/C1_changeType';
import breeder_female from './modules/manage/C2_breeder_female';
import breeder_male from './modules/manage/C2_breeder_male';
import khun from './modules/manage/C2_khun';
import vaccine from './modules/manage/C3_vaccine';
import worm from './modules/manage/C4_worm';
import treat from './modules/manage/C5_treat';
import milk from './modules/manage/C5_milk';
import sell from './modules/manage/C6_sell';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
 
const store = new Vuex.Store({
    modules: {
        counter: counter,
        user: user,
        choice: choice,
        district: district,
        cattle:cattle,
        change_type:change_type,
        breeder_female:breeder_female,
        breeder_male:breeder_male,
        khun:khun,
        vaccine:vaccine,
        worm:worm,
        treat:treat,
        milk:milk,
        sell:sell,
    },
 
});

Vue.prototype.$store = store;

module.exports = store;