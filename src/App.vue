<template>
  <div id="app" class="pb-32 bg-white absolute pin">
    <router-view class="absolute pin"/>
  </div>
</template>

<script>
import '@/assets/css/micon.min.css'
import '@/assets/css/transitions.css'
import '@/assets/css/main.css';
import '@/assets/css/iconfont.css';
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
