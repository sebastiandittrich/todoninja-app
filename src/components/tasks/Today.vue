<template>
    <div>
        <tasks-list :tasks="tasks"></tasks-list>

        <div v-if="yesterdayTasks.length > 0" class="font-bold text-sm m-4 mt-16 text-grey-darker">
            <i class="feather icon-chevron-left mr-2"></i>
            From yesterday
        </div>
        <tasks-list :tasks="yesterdayTasks"></tasks-list>

        <div v-if="earlierTasks.length > 0" class="font-bold text-sm m-4 mt-8 text-grey-darker">
            <i class="feather icon-chevrons-left mr-2"></i>
            Earlier
        </div>
        <tasks-list :tasks="earlierTasks"></tasks-list>

        <transition name="opacity-slide-up">
            <div v-if="tasks.length < 1 && yesterdayTasks.length < 1 && earlierTasks.length < 1" class="flex flex-col items-center">
                <img src="/img/today_done.svg" alt="woman jumping and smartphone with checkmark on it" class="w-1/2 mt-8">
                <div class="font-light text-xl text-blue-darkest px-8 mt-8 text-center">
                    Everything is done for today.
                    <div class="text-sm font-bold mt-4">Now you're free!</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Page from '@/assets/js/Page'

    export default new Page()
        .with('tasks/List')
        .getters({
            _findTasks: 'tasks/filteredFind'
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