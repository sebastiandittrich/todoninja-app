<template>
    <div>
        <tasks-list :tasks="tasks"></tasks-list>
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
    .mounted(vue => vue.$store.dispatch('tasks/findAll'))
    .vue()    
</script>