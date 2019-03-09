import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import store from './store';
import { initAuth } from 'feathers-vuex';
import Page from './assets/js/Page';
import VueTouch from 'vue-touch'
import * as Sentry from '@sentry/browser'
import Overdrive from 'vue-overdrive'

if(window.location.href.includes('ref=makerads')) {
  window.location.href = 'https://todoninja.de/?ref=makerads'
}

if(process.env.NODE_ENV == 'production') {
  Sentry.init({
    dsn: 'https://00c93f88d8b845e8a632ac75e906f86b@sentry.io/1320758',
    integrations: [new Sentry.Integrations.Vue({ Vue })],
    environment: process.env.NODE_ENV,
    release: JSON.parse(unescape(process.env.PACKAGE_JSON || '%7Bversion%3A0%7D')).version
  })
}

window.Vue = Vue

Vue.use(VueTouch)
Vue.use(Overdrive)

Vue.config.productionTip = false;

window.initAuth = initAuth;
window.store = store;
window.Page = Page

window.vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');