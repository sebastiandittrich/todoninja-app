<template>
    <div class="flex flex-col">
        <tasks-list :tasks="tasks"></tasks-list>
        <div v-if="moreTasksAvailable" class="button" @click="loadDoneClick">
            Load {{ moreTasksAvailable }} more tasks
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
        async updateTaskCount(length) {
            const res = this.$store.dispatch('tasks/find', { query: { $limit: 0 } })
            console.log(res)
            this.moreTasksAvailable = (await res).total - length
        }
    })
    .watch('tasks.length', 'updateTaskCount')
    .created(vue => vue.updateTaskCount(vue.tasks.length))
    .vue()    
</script>