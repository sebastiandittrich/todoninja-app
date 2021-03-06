import Vue from 'vue';
import BaseRouter from 'vue-router';
import store from '@/store'
import merge from 'deepmerge'

class Router extends BaseRouter {
  mergeRoutes(base, extension) {
    if(extension.name) {
      const { name, params, query } = base
      return merge({ name, params, query }, extension)
    } else {
      const { path, query } = base
      return merge({ path, query }, extension)
    }
  }
  softPush(route, ...args) {
    return this.push(this.mergeRoutes(this.currentRoute, route), ...args)
  }
  softReplace(route, ...args) {
    return this.replace(this.mergeRoutes(this.currentRoute, route), ...args)
  }
}

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
      meta: { showAddButton: true },
      children: [
        {
          path: 'create',
          name: 'Tasks.Create',
          component: page('Tasks.Detail'),
          meta: { hideNavBar: true },
          props: route => ({ id: null }),
        },
        {
          path: ':id',
          name: 'Tasks.Detail',
          component: page('Tasks.Detail'),
          meta: { hideNavBar: true },
          props: route => ({ id: parseInt(route.params.id) }),
        },
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: page('Settings'),
    },

    {
      path: '/search/:query?',
      name: 'Search',
      component: page('Search'),
      props: route => ({ query: decodeURIComponent(route.params.query || '') })
    },

    {
      path: '/tutorial',
      name: 'Tutorial',
      component: page('Tutorial'),
      meta: { hideNavBar: true }
    },

    {
      path: '/today',
      name: 'Today',
      component: page('Today'),
      meta: { },
      children: [
        { path: 'task/:id', name: 'Today.Detail', component: page('Tasks.Detail'), props: route => ({ id: parseInt(route.params.id) || null, today: true }) }
      ]
    },

    {
      path: '/summary',
      name: 'Summary',
      component: page('Summary'),
      meta: { }
    },

    {
      path: '/stats',
      name: 'Stats',
      component: page('Stats.Index'),
      meta: { guest: true }
    },

    {
      path: '/login',
      name: 'login',
      meta: { guest: 'only', hideNavBar: true },
      component: page('Login'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { guest: 'only', hideNavBar: true },
      component: page('Register'),
    },
    {
      path: '*',
      name: '404',
      component: page('404')
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  // Check if some of the matched routes have the "guest" meta field
  if(to.matched.some(route => route.meta.guest)) {
    if(to.matched.some(route => route.meta.guest == 'only')) {
      if(store.state.auth.accessToken) {
        next('/')
      } else {
        store.dispatch('auth/authenticate')
        .then(() => next('/'))
        .catch(() => next())
      }
    } else {
      next()
    }
  } else {
    if(store.state.auth.accessToken) {
      next()
    } else {
      store.dispatch('auth/authenticate')
      .then(() => next())
      .catch(() => next('/login'))
    }
  }
})

export default router