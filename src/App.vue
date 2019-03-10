<template>
  <div id="app" class="pb-32 bg-white absolute pin md:-z-20">
    <router-view v-if="!splashscreenVisible" class="absolute pin md:-z-20"/>
    <transition name="splashscreen"  appear>
      <splashscreen v-if="splashscreenVisible" class="absolute pin"></splashscreen>
    </transition>
    <events-list class="absolute pin-t pin-x m-4 z-10"></events-list>
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
  .with('Splashscreen', 'events/List')
  .data(() =>({
    splashscreenVisible: true,
  }))
  .methods({
    async fetchData() {
      this.$store.dispatch('tasks/findAll', { doneAt: null })
      this.$store.dispatch('tags/findAll')

      await this.$store.dispatch('workspaces/findAll')
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
    }
  })
  .created(vue => {
    vue.boot()
  })
  .watch('$store.state.auth.user.id', function() {
    this.boot({ soft: true })
  })
  .vue()

export default test
</script>
