<template>
  <div id="app" class="pb-32">
    <router-view class="absolute pin bg-white"/>
  </div>
</template>

<script>
import '@/assets/css/micon.min.css'
import '@/assets/css/transitions.css'
import '@/assets/css/main.css';
import Page from '@/assets/js/Page'

export default new Page()
  .created(async vue => {
    console.log('Starting...')
    await vue.$store.dispatch('auth/authenticate')
    vue.$store.dispatch('workspaces/find')
    vue.$store.dispatch('tasks/find')
    vue.$store.dispatch('tags/find')
  })
  .vue()
</script>
