import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import HelloWorld from '../components/HelloWorld';
import Counter from '../components/Counter';
import Login from '../components/Login';
import Edit from '../components/Edit';
import Membreed from '../components/Membreed'

const router = new VueRouter({
    pageRouting: true,
    routes: [
        {
            path: '/edit',
            component: Edit,
            meta: {
                title: 'Edit',
            },
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: 'Login',
            },
        },
        {
            path: '/home',
            component: Home,
            meta: {
                title: 'Home',
            },
        },
        {
            path: '/hello',
            component: HelloWorld,
            meta: {
                title: 'Hello World',
            },
        },
        {
            path: '/counter',
            component: Counter,
            meta: {
                title: 'Counter',
            },
        },
        {
            path: '/membreed',
            component: Membreed,
            meta: {
                title: 'Membreed',
            },
        },
        {path: '*', redirect: '/home'},
    ],
});

router.replace('/home');

module.exports = router;
