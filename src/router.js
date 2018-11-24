import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'

Vue.use(Router);

function page(name) {
  return () => import(`@/views/${name.replace('.', '/')}`);
}

const router = new Router({
  mode: 'hash',
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
      meta: { guest: true },
      component: page('Login'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { guest: true },
      component: page('Register'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // Check if some of the matched routes have the "guest" meta field
  if(to.matched.some(route => route.meta.guest)) {
    next()
  } else {
    if(store.state.auth.accesToken) {
      next()
    } else {
      store.dispatch('auth/authenticate')
      .then(() => next())
      .catch(() => next('/login'))
    }
  }
})

export default router