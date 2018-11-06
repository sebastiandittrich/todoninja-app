<template>
    <div class="flex flex-col">
        <tasks-list :tasks="tasks"></tasks-list>
        <div class="button" @click="loadDoneClick">
            Load done tasks
        </div>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('tasks/List')
    .getters({
        findTasks: 'tasks/filteredFind'
    })
    .computed({
        tasks() {
            return this.findTasks().data
        }
    })
    .methods({
        loadDoneClick() {
            this.$store.dispatch('tasks/findAll')
        }
    })
    .vue()    
</script>