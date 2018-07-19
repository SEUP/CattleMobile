import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import HelloWorld from '../components/HelloWorld';
import Counter from '../components/Counter';
import Login from '../components/Login';
import Edit from '../components/Edit';

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
    {path: '*', redirect: '/home'},
  ],
});

router.replace('/login');

module.exports = router;
