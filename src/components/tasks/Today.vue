<template>
    <div>
        <tasks-list :tasks="tasks" :filter="false"></tasks-list>

        <div v-if="yesterdayTasks.length > 0" class="font-bold text-sm m-4 mt-16 text-grey-darker dark:text-grey-dark">
            <i class="feather icon-chevron-left mr-2"></i>
            From yesterday
        </div>
        <tasks-list :tasks="yesterdayTasks" :filter="false"></tasks-list>

        <div v-if="earlierTasks.length > 0" class="font-bold text-sm m-4 mt-8 text-grey-darker dark:text-grey-dark">
            <i class="feather icon-chevrons-left mr-2"></i>
            Earlier
        </div>
        <tasks-list :tasks="earlierTasks" :filter="false"></tasks-list>

        <tasks-placeholder image="/img/today_done.svg" v-if="tasks.length < 1 && yesterdayTasks.length < 1 && earlierTasks.length < 1">
            Everything is done for today.
            <div slot="subtitle">Now you're free!</div>
        </tasks-placeholder>
    </div>
</template>

<script>
    import Page from '@/assets/js/Page'

    export default new Page()
        .with('tasks/List', 'tasks/Placeholder')
        .getters({
            _findTasks: 'tasks/currentFind'
        })
        .methods({
            findTasks(...args) {
                return this._findTasks(...args).data.filter(task => !task.isDone())
            }
        })
        .computed({
            tasksDate() {
                return moment().format('YYYY-MM-DD')
            },
            yesterdayTasksDate() {
                return moment().subtract(1, 'day').format('YYYY-MM-DD')
            },
            tasks() {
                return this.findTasks({query: { today: this.tasksDate }})
            },
            yesterdayTasks() {
                return this.findTasks({ query: { today: this.yesterdayTasksDate } })
            },
            earlierTasks() {
                return this.findTasks({ query: { today: { $ne: null, $nin: [ this.tasksDate, this.yesterdayTasksDate ] } } })
            }
        })
        .vue()    
</script>