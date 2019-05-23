import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import store from './store';
import { initAuth } from 'feathers-vuex';
import VueTouch from 'vue-touch'
import VueMeta from 'vue-meta'
import * as Sentry from '@sentry/browser'
import Overdrive from 'vue-overdrive'
import { log, timeout, color } from '@/mixins'
import 'jquery'
import 'jquery-mousewheel'

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

Vue.use(VueTouch)
Vue.use(Overdrive)
Vue.use(VueMeta)

Vue.mixin(log)
Vue.mixin(timeout)
Vue.mixin(color)

Vue.config.productionTip = false;

window.vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

window.Vue = Vue
window.initAuth = initAuth;
window.store = store;