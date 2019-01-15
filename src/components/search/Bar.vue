<template>
    <div class="flex flex-row items-center p-4">
        <i class="feather icon-search mr-4 text-grey-darker"></i>
        <inputt ref="searchinputt" iclass="border-none" class="inline-flex" v-model="query" placeholder="Search for a task..." type="text" @press-enter="$emit('press-enter', $event)"></inputt>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'
import Fuse from 'fuse.js'

export default new Page()
    .with('inputt')
    .data(() => ({ query: null }))
    .getters({ tasks: 'tasks/list' })
    .methods({
        searchFilter(task) {
            if(!this.query) {
                return true
            }
            
            return this.searchedTasks.includes(task)
        },
        focus() {
            this.$refs.searchinputt.focus()
        }
    })
    .computed({
        searchedTasks() {
            const fuse = new Fuse(this.tasks, { keys: ['title', 'description', 'waiting_for'] })
            return fuse.search(this.query)
        }
    })
    .watch('query', function(to) {
        const path = '$meta.search.active'
        const value = !!to

        this.$store.commit('tasks/setCurrentFilter', {path, value})
    })
    .created(vue => {
        vue.$store.commit('tasks/addCurrentFilterFunction', vue.searchFilter)
    })
    .vue()
</script>
