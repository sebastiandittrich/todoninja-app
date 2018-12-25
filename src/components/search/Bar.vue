<template>
    <div class="flex flex-row items-center p-4">
        <i class="feather icon-search mr-4 text-grey-darker"></i>
        <inputt iclass="border-none" class="inline-flex" v-model="query" placeholder="Search for a task..." type="text"></inputt>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('inputt')
    .data(() => ({ query: null }))
    .watch('query', function(to, from) {
        this.$store.commit('tasks/setCurrentFilter', { path: 'query.title.$like', value: to})
    })
    .vue()
</script>
