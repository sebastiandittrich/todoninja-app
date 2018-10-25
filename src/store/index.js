import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '@/assets/js/FeathersClient';
import merge from 'deepmerge';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    service('tasks', {
      instanceDefaults: {
        state: 0,
        title: '',
        doneAt: null,
        description: '',
        tags: [],
        workspaceId: null, 
        workspace: 'Workspace'
      },

      state: {
        currentFilter: {},
      },
      getters: {
        filteredFind(state, getters) {
          return function(filter = {}) {
            return getters['find'](merge(state.currentFilter, filter))
          }
        }
      },
      mutations: {
        mergeCurrentFilter(state, payload) {
          state.currentFilter = merge(state.currentFilter, payload, { arrayMerge: (destination, source) => source })
        },
        removeCurrentFilter(state, { path } = {}) {
          if(path != undefined) {
            path = path.split('.')
            const last = path.pop()
            let current = state.currentFilter

            for(const breadcrumb of path) {
              if(typeof current[breadcrumb] != 'object') {
                Vue.set(current, breadcrumb, {})
              }

              current = current[breadcrumb]
            }

            Vue.delete(current, last)
          } else {
            state.currentFilter = {}
          }
        },
        setCurrentFilter(state, { path, value }) {
          if(path != undefined) {
            path = path.split('.')
            const last = path.pop()
            let current = state.currentFilter

            for(const breadcrumb of path) {
              if(typeof current[breadcrumb] != 'object') {
                Vue.set(current, breadcrumb, {})
              }

              current = current[breadcrumb]
            }

            Vue.set(current, last, value)
          } else {
            state.currentFilter = value
          }
        }
      },
      actions: {
        async findAll({ dispatch }, options = {}) {
          options = Object.assign({
            $limit: 10,
            $skip: 0,
          }, options)
    
          const countquery = await dispatch('find', { query: { $limit: 0 } })
          const total = countquery.total
    
          for(options.$skip; options.$skip < total; options.$skip = options.$skip + options.$limit) {
            await dispatch('find', { query: { ...options }})
          }
        }
      }
    }),
    service('tags'),
    service('workspaces'),
    service('users'),
    // Setup the auth plugin.
    auth({ userService: 'users' }),
  ],
});
