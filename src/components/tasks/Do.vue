<template>
    <div>
        <tasks-list :tasks="tasks"></tasks-list>

        <tasks-placeholder image="/img/success.svg" v-if="tasks.length < 1">
            There is nothing more you can do.
            <div slot="subtitle">Sit back and relax!</div>
        </tasks-placeholder>
    </div>
</template>

<script>
    import Page from '@/assets/js/Page'
    import _ from 'lodash'

    export default new Page()
        .with('tasks/List', 'tasks/Placeholder')
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
                const now = moment()

                list.push(this.findTasks().filter( task => task.isDo() || task.doneMoment().diff(now, 'seconds') < 5 ))

                return _.uniqBy(_.flatten(list), 'id')
            }
        })
        .vue()
</script>