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
import Profile from '../components/Farmer/Profile'
import EditProfile from "../components/Farmer/EditProfile"
import Farm from '../components/Farmer/Farm'
import EditFarm from "../components/Farmer/EditFarm"
import CattleAddForm from "../components/Male/CattleAddForm"
import CattleEditFormMale from "../components/Male/CattleEditFormMale"

const router = new VueRouter({
    pageRouting: true,
    routes: [
        {
            path: '/cattle/male/edit',
            component: CattleEditFormMale,
            meta: {
                title: 'EditMaleBreed',
            },
        },
        {
            path: '/cattle/male/add',
            component: CattleAddForm,
            meta: {
                title: 'AddMaleBreed',
            },
        },
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
            path: '/profile-edit',
            component: EditProfile,
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
        {
            path: '/farm-edit',
            component: EditFarm,
            meta: {
                title: 'Profile',
            },
        },
        {path: '*', redirect: '/home'},
    ],
});

router.replace('/login');

module.exports = router;
