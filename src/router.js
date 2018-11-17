import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function page(name) {
  return () => import(`@/views/${name.replace('.', '/')}`);
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/tasks',
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: page('Home'),
      props: route => ({ view: route.query.view }),
      children: [
        {
          path: 'create',
          name: 'Tasks.Create',
          component: page('Tasks.Detail'),
        },
        {
          path: ':id',
          name: 'Tasks.Detail',
          component: page('Tasks.Detail'),
        },
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: page('Settings'),
    },

    {
      path: '/login',
      name: 'login',
      component: page('Login'),
    },
    {
      path: '/register',
      name: 'register',
      component: page('Register'),
    },
  ],
});
