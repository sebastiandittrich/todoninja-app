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
      alias: '/tasks',
      redirect: '/tasks/sections/do',
    },
    {
      path: '/tasks/sections/:section',
      name: 'do',
      component: page('Home'),
    },
    {
      path: '/tasks/create',
      name: 'Tasks.Create',
      component: page('Tasks.Create'),
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
