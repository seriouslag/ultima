import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AppLoading from './components/AppLoading.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
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
      meta: {
        admin: true,
      },
      children: [
        {
          path: 'events',
          name: 'adminEvents',
          component: () => import(/* webpackChunkName: "adminEvents" */ './views/Events.vue'),
          meta: {
            admin: true,
          },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ './views/LoginView.vue'),
        },
      ],
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.admin) {
    next();
    return;
  }

  if (store.getters.role && store.getters.role.toLowerCase === 'admin'.toLowerCase()) {
    next();
    return;
  }

  next({ name: 'login' });
});

export default router;
