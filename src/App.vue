<template>
  <div id="app" class="pb-32 bg-white absolute pin">
    <router-view class="absolute pin"/>
  </div>
</template>

<script>
import '@/assets/css/micon.min.css'
import '@/assets/css/main.css';
import '@/assets/css/iconfont.css';
import '@/assets/css/transitions.css'
import Page from '@/assets/js/Page'

export default new Page()
  .methods({
    async findAll(name, options = {}) {
      options = Object.assign({
        limit: 10,
        skip: 0,
        query: {}
      }, options)

      const countquery = await this.$store.dispatch(name + '/find', { query: { $limit: 0 } })
      const total = countquery.total

      for(var currentskip = options.skip; currentskip < total; currentskip = currentskip + options.limit) {
        await this.$store.dispatch(name + '/find', { query: { ...options.query, $limit: options.limit, $skip: currentskip, } })
      }
    }
  })
  .created(async vue => {
    console.log('Starting...')
    await vue.$store.dispatch('auth/authenticate')
    vue.findAll('workspaces')
    vue.findAll('tags')
    vue.findAll('tasks', {
      query: {
        doneAt: null,
      }
    })
  })
  .vue()
</script>
