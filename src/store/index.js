import Vue from 'vue';
import Vuex from 'vuex';
import { FeathersVuex } from '@/store/feathers-vuex'
import modules from '@/store/modules'
import plugins from '@/store/plugins'

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  mutations: {
    setCurrentWorkspace() {
      console.log('yeah!')
    }
  },
  modules,
  plugins,
});