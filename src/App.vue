<template>
  <div id="app" class="pb-32 bg-white absolute pin">
    <router-view class="absolute pin bg-white"/>
  </div>
</template>

<script>
import '@/assets/css/micon.min.css'
import '@/assets/css/main.css';
import '@/assets/css/iconfont.css';
import '@/assets/css/transitions.css'
import Page from '@/assets/js/Page'

export default new Page()
  .created(async vue => {
    console.log('Starting...')
    await vue.$store.dispatch('auth/authenticate')
    vue.$store.dispatch('workspaces/findAll')
    vue.$store.dispatch('tags/findAll')
    vue.$store.dispatch('tasks/findAll', { doneAt: null })
  })
  .vue()
</script>
