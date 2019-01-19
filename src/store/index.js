import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '@/assets/js/FeathersClient';
import Task from '@/assets/js/Models/Task'
import { state, getters, mutations, actions } from '@/store/serviceextension'
import uuid from 'uuid/v4'

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
  modules: {
    events: {
      namespaced: true,
      state: {
        all: []
      },
      getters: {
        list(state) {
          return state.all.filter(event => event.show)
        }
      },
      mutations: {
        add(state, event) {
          event = Object.assign({
            message: '',
            icon: '',
            color: 'blue',
            duration: 5
          }, event, { show: true, id: uuid() })

          state.all.push(event)

          if(event.duration > 0) setTimeout(() => event.show = false, event.duration * 1000)
          return event
        },
      },
      actions: {
        success({ commit }, event) {
          return commit('add', Object.assign({
            message: 'Success!',
            icon: 'feather icon-check',
            color: 'green',
            duration: 2
          }, event))
        },
        error({ commit }, event) {
          return commit('add', Object.assign({
            message: 'Something went wrong.',
            icon: 'feather icon-alert-circle',
            color: 'red',
            duration: 5
          }, event))
        },
      }
    }
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
    service('workspaces', { state, getters, mutations, actions }),
    service('users', { state, getters, mutations, actions }),
    // Setup the auth plugin.
    auth({ userService: 'users' }),
  ],
});
