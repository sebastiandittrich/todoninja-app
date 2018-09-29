import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import store from './store';
import { initAuth } from 'feathers-vuex';
import Page from './assets/js/Page';

Vue.config.productionTip = false;

window.initAuth = initAuth;
window.store = store;
window.Page = Page
window.Vue = Vue

window.vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');


