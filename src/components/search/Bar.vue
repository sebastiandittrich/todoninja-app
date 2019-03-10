<template>
    <div class="flex flex-row items-center w-full">
        <i class="feather icon-search mr-4 text-grey-darker"></i>
        <inputt ref="searchinputt" iclass="border-none" class="inline-flex w-full" v-model="query" placeholder="Search for a task..." type="text" @press-enter="$emit('press-enter', $event)"></inputt>
        <i v-if="query" @click="query = ''" class="feather icon-x text-grey-darker cursor-pointer"></i>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'
import Fuse from 'fuse.js'

export default new Page()
    .with('inputt')
    .props({
        filters: {
            type: Array,
            default: () => []
        }
    })
    .data(() => ({ query: '' }))
    .getters({ tasks: 'tasks/list' })
    .methods({
        focus() {
            this.$refs.searchinputt.focus()
        },
        searchedTasks(tasks) {
            if(!this.query) {
                return tasks
            }
            const fuse = new Fuse(tasks, { keys: ['title', 'description', 'waiting_for'] })
            return fuse.search(this.query)
        }
    })
    .mounted(vue => {
        vue.filters.push({ full: true, filter: vue.searchedTasks })
    })
    .vue()
</script>
