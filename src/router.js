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
      redirect: '/tasks/do',
    },
    {
      path: '/tasks/',
      name: 'Tasks',
      component: page('Home'),
      children: [
        { path: 'do', component: page('Tasks.Do'), name: 'Tasks.Do' },
        { path: 'today', component: page('Tasks.Today'), name: 'Tasks.Today' },
        { path: 'all', component: page('Tasks.All'), name: 'Tasks.All' }
      ]
    },
    {
      path: '/tasks/create',
      name: 'Tasks.Create',
      component: page('Tasks.Detail'),
    },
    {
      path: '/tasks/:id',
      name: 'Tasks.Detail',
      component: page('Tasks.Detail'),
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
