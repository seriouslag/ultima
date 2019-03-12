import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AppLoading from './components/AppLoading.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
});
