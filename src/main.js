import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import store from './store';
import { initAuth } from 'feathers-vuex';

Vue.config.productionTip = false;

window.initAuth = initAuth;
window.store = store;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');


