import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const mode = 'history';
const base = process.env.BASE_URL;

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
    meta: {
      admin: true,
    },
    children: [
      {
        path: '/',
        name: 'admin',
        component: () => import(/* webpackChunkName: "adminHome" */ './views/AdminHome.vue'),
        meta: {
          admin: true,
        },
      },
      {
        path: 'events',
        meta: {
          admin: true,
        },
        component: () => import(/* webpackChunkName: "adminEvents" */ './views/Events.vue'),
        children: [
          {
            name: 'adminEvents',
            path: '/',
            component: () => import(/* webpackChunkName: "adminEvents" */ './views/EventsHome.vue'),
            meta: {
              admin: true,
            },
          },
          {
            name: 'editEvent',
            path: ':id',
            component: () => import(/* webpackChunkName: "adminEvents" */ './views/EventEdit.vue'),
            meta: {
              admin: true,
            },
          },
        ],
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
];

const router = new Router({
  mode,
  base,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta || !to.meta.admin) {
    next();
    return;
  }

  if (store.getters.role && store.getters.role.toLowerCase() === 'admin'.toLowerCase()) {
    next();
    return;
  }

  next({
    name: 'login',
    query: {
      redirect: to.fullPath,
    },
  });
});

export { router, routes };
