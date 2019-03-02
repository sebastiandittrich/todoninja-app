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

const test = new Page()
  .with('Splashscreen', 'events/List')
  .data(() =>({
    splashscreenVisible: true,
  }))
  .methods({
    async fetchData() {
        await this.$store.dispatch('tasks/findAll', { doneAt: null })
        await this.$store.dispatch('workspaces/findAll')
        await this.$store.dispatch('tags/findAll')
    },
    async boot() {
      try {
        await this.$store.dispatch('auth/authenticate')
        this.fetchData()
        this.splashscreenVisible = false
      } catch(error) {
        this.splashscreenVisible = false
      }
      await this.$store.dispatch('push/initialize')
      this.$store.commit('tasks/setCurrentFilter', { path: 'query.workspaceId', value: null })
    }
  })
  .created(vue => {
    vue.boot()
  })
  .watch('$store.state.auth.user.id', 'fetchData')
  .vue()

export default test
</script>
