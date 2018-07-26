import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import HelloWorld from '../components/HelloWorld';
import Counter from '../components/Counter';
import Login from '../components/Login';
import Edit from '../components/Edit';
import MaleBreed from '../components/MaleBreed'
import FemaleBreed from '../components/FemaleBreed'
import MeatBreed from '../components/MeatBreed'
import YoungBreed from '../components/YoungBreed'
import Profile from '../components/Profile'
import Farm from '../components/Farm'

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
            path: '/malebreed',
            component: MaleBreed,
            meta: {
                title: 'MaleBreed',
            },
        },
        {
            path: '/femalebreed',
            component: FemaleBreed,
            meta: {
                title: 'FemaleBreed',
            },
        },
        {
            path: '/meatbreed',
            component: MeatBreed,
            meta: {
                title: 'MeatBreed',
            },
        },
        {
            path: '/youngbreed',
            component: YoungBreed,
            meta: {
                title: 'YoungBreed',
            },
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                title: 'Profile',
            },
        },
        {
            path: '/farm',
            component: Farm,
            meta: {
                title: 'Farm',
            },
        },
        {path: '*', redirect: '/home'},
    ],
});

router.replace('/malebreed');

module.exports = router;
