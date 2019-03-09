import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '@/assets/js/FeathersClient';
import Task from '@/assets/js/Models/Task'
import Workspace from '@/assets/js/Models/Workspace'
import { state, getters, mutations, actions } from '@/store/serviceextension'
import events from '@/store/modules/events'
import push from '@/store/modules/push'

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

const store = new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    events,
    push
  },
  plugins: [
    service('tasks', {
      instanceDefaults: Task,
      state,
      getters,
      mutations,
      actions,
    }),
    service('tags', { state, getters, mutations, actions }),
    service('workspaces', {
      instanceDefaults: Workspace,
      state, getters: {
      ...getters,
      getStandard() {
        return new Vue.$FeathersVuex.Workspace({ id: null, name: 'Standard', color: 'blue' })
      },
      withStandard(state, getters) {
        return [ getters['getStandard'], ...getters['list'] ]
      },
      current(state, getters, rootState) {
        if(!rootState.tasks.currentFilter.query || !rootState.tasks.currentFilter.query.workspaceId) {
          return getters['getStandard']
        }
        return getters['get'](rootState.tasks.currentFilter.query.workspaceId)
      }
    }, mutations: {
      ...mutations,
      setCurrent(state, current, rootState) {
        current = current.id ? current.id : current

        if(!rootState.tasks.currentFilter.query) {
          rootState.tasks.currentFilter.query = { workspaceId: current }
        } else {
          rootState.tasks.currentFilter.query.workspaceId = current
        }
      },
    }, actions }),
    service('push-subscriptions', { state, getters, mutations, actions }),
    service('users', { state, getters, mutations, actions }),
    // Setup the auth plugin.
    auth({ userService: 'users' }),
  ],
});

export default store