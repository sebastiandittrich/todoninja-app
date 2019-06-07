<template>
  <div id="app" :class="dark ? 'dark' : ''" class="h-full overflow-auto bg-white dark:bg-black absolute inset-0 lg:-z-20">
    <router-view v-if="!splashscreenVisible" class="lg:-z-20 h-full"/>
    <transition name="splashscreen" appear>
      <splashscreen v-if="splashscreenVisible" class="absolute inset-0"></splashscreen>
    </transition>
    <events-list class="fixed top-0 inset-x-0 m-4 z-10"></events-list>
    <transition name="opacity-slide-up">
      <navigation-bar v-if="showNavBar && !splashscreenVisible" :showAddButton="showAddButton" class="lg:hidden z-10"></navigation-bar>
    </transition>
  </div>
</template>

<script>
import '@/assets/css/micon.min.css'
import '@/assets/css/main.css';
import '@/assets/css/iconfont.css';
import '@/assets/css/transitions.css'
import * as Sentry from '@sentry/browser'
import { store, themeColor } from '@/mixins'

import Splashscreen from '@c/Splashscreen'
import EventsList from '@c/events/List'
import NavigationBar from '@c/navigation/Bar'
import Progress from 'vue-top-progress'

export default {
  components: { Splashscreen, EventsList, NavigationBar, Progress },
  mixins: [
    themeColor({ dark: 'black', light: 'white' }),
    store({
      getters: {
        dark: 'theme/isDark'
      }
    })
  ],
  metaInfo: {
    title: 'Todoninja'
  },
  data: () => ({
    splashscreenVisible: true,
    loading: false
  }),
  methods: {
    async fetchWorkspaceSpecific() {
      await this.$store.dispatch('tasks/findAll', { doneAt: null, workspaceId: this.$store.getters['workspaces/current'].id })
    },
    async fetchToday() {
      this.$store.dispatch('tasks/findAll', { today: { $ne: null }, doneAt: null })
    },
    async fetchData() {
      await this.$store.dispatch('workspaces/findAll')

      await this.fetchWorkspaceSpecific()
      this.$store.dispatch('tags/findAll')
      this.fetchToday()
    },
    initSentry() {
      Sentry.configureScope(scope => {
        if(this.$store.state.auth.user) {
          scope.setUser({
            id: this.$store.state.auth.user.id,
            name: this.$store.state.auth.user.name,
          })
        }
      })
    },
    async boot({ soft } = {}) {
      if(!soft) {
        await this.bootUI()
      }
      try {
        if(!soft) {
          await this.$store.dispatch('auth/authenticate')
        }
        await this.fetchData()
        this.splashscreenVisible = false
      } catch(error) {
        this.splashscreenVisible = false
      }
      // Check for tutorial
      if(this.$store.state.auth.accessToken && this.$store.getters['tutorial/done'] == false) {
        this.$router.replace('/tutorial')
      }
      await this.$store.dispatch('push/initialize')

      // Always do this last
      this.initSentry()
    },

    bootUI() {
      $("body").on('mousewheel', '.horizontal-scrolling', function(event) {
        this.scrollLeft = this.scrollLeft + event.originalEvent.deltaY

        event.preventDefault();
      });
    }
  },
  computed: {
    showAddButton() {
      return this.$route.meta.showAddButton == true
    },
    showNavBar() {
      return !this.$route.meta.hideNavBar && this.$store.getters['modals/open'] <= 0
    }
  },
  created() {
    this.boot()
  },
  watch: {
    '$store.state.auth.user.id': function() {
      this.boot({ soft: true })
    },
    '$store.state.workspaces.currentId': 'fetchWorkspaceSpecific',
  },
}
</script>
