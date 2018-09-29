import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '@/assets/js/FeathersClient';

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
        description: '',
        tags: [],
        workspaceId: null, 
        workspace: 'Workspace'
      }
    }),
    service('tags'),
    service('workspaces'),
    service('users'),
    // Setup the auth plugin.
    auth({ userService: 'users' }),
  ],
});
