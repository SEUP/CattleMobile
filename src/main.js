import Vue from 'nativescript-vue';

import router from './router';

import store from './store';

import './styles.scss';

import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
    'fa': './font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

Vue.registerElement('CardView', () => require('nativescript-cardview').CardView)

import axios from './axios'

Vue.prototype.$http = axios;


new Vue({

    router,

    store,

}).$start();
