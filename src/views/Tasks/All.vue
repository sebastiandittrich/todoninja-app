<template>
    <tasks-list :tasks="tasks"></tasks-list>
</template>

<script>
    import Page from '@/assets/js/Page'

    export default new Page()
        .with('tasks/List')
        .getters({
            findTasks: 'tasks/find'
        })
        .computed({
            tasks() {
                return this.findTasks().data
            }
        })
        .vue()    
</script>