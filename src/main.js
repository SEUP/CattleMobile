import Vue from 'nativescript-vue';

import router from './router';

import store from './store';

import './styles.scss';

import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    'fa': './font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

Vue.registerElement('CardView', () => require('nativescript-cardview').CardView)

import Axios from 'axios'

const axios = Axios.create({
    baseURL: `http://172.25.103.193:3333`,
    timeout: 10000
});

Vue.prototype.$http = axios;


new Vue({

  router,

  store,

}).$start();
