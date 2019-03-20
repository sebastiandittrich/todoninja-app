<template>
  <div id="app" class="pb-32 bg-white absolute pin lg:-z-20">
    <router-view v-if="!splashscreenVisible" class="absolute pin lg:-z-20"/>
    <transition name="splashscreen"  appear>
      <splashscreen v-if="splashscreenVisible" class="absolute pin"></splashscreen>
    </transition>
    <events-list class="absolute pin-t pin-x m-4 z-10"></events-list>
    <transition name="opacity-slide-up">
      <navigation-bar v-if="showNavBar" :showAddButton="showAddButton" class="lg:hidden z-10"></navigation-bar>
    </transition>
  </div>
</template>

<script>
import '@/assets/css/micon.min.css'
import '@/assets/css/main.css';
import '@/assets/css/iconfont.css';
import '@/assets/css/transitions.css'
import Page from '@/assets/js/Page'
import * as Sentry from '@sentry/browser'

const test = new Page()
  .with('Splashscreen', 'events/List', 'navigation/Bar')
  .data(() =>({
    splashscreenVisible: true,
  }))
  .methods({
    async fetchWorkspaceSpecific() {
      await this.$store.dispatch('tasks/findAll', { doneAt: null, workspaceId: this.$store.getters['workspaces/current'].id })
    },
    async fetchData() {
      await this.$store.dispatch('workspaces/findAll')

      await this.fetchWorkspaceSpecific()
      this.$store.dispatch('tags/findAll')
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
        this.bootUI()
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
  })
  .computed({
    showAddButton() {
      return this.$route.meta.showAddButton == true
    },
    showNavBar() {
      return !this.$route.meta.hideNavBar && this.$store.getters['modals/open'] <= 0
    }
  })
  .created(vue => {
    vue.boot()
  })
  .watch('$store.state.auth.user.id', function() {
    this.boot({ soft: true })
  })
  .watch('$store.state.workspaces.currentId', 'fetchWorkspaceSpecific')
  .vue()

export default test
</script>
