<template>
    <div class="flex flex-col">
        <tasks-list :tasks="tasks"></tasks-list>
        <div v-if="moreTasksAvailable" class="button" @click="loadDoneClick">
            Load more tasks
        </div>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('tasks/List')
    .data(() => ({
        moreTasksAvailable: true
    }))
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
        },
    })
    .watch('tasks.length', function(length) {
        this.moreTasksAvailable = this.$store.dispatch('tasks/find', { query: { $limit: 0 } }).total > length
    })
    .vue()    
</script>