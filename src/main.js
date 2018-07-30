import "babel-polyfill";
import Vue from 'nativescript-vue';
import router from './router';
import store from './store';
import './styles.scss';
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import * as http from 'http'

Vue.use(require('nativescript-ui-sidedrawer/vue'))

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
    'fa': './font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

Vue.registerElement('CardView', () => require('nativescript-cardview').CardView)

import {axios, BaseURL} from './axios'

Vue.prototype.$axios = axios;
Vue.prototype.$baseUrl = BaseURL
Vue.prototype.$http = http;

const moment = require('moment')
require('moment/locale/th')

Vue.use(require('vue-moment'),{
    moment
});

new Vue({
    router,
    store,
}).$start();
