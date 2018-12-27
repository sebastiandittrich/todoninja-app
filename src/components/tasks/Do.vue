<template>
    <div>
        <tasks-list :tasks="tasks"></tasks-list>
    </div>
</template>

<script>
    import Page from '@/assets/js/Page'
    import _ from 'lodash'

    export default new Page()
        .with('tasks/List')
        .getters({
            filteredFind: 'tasks/filteredFind'
        })
        .methods({
            findTasks(query) {
                return this.filteredFind({ query: { doneAt: null, ...query } }).data
            },
        })
        .computed({
            tasks() {
                const list = [ ]

                list.push(this.findTasks({ state: 0 }))
                list.push(this.findTasks().filter(task => task.isDeadlineToday() ))

                return _.uniqBy(_.flatten(list), 'id')
            }
        })
        .vue()
</script>