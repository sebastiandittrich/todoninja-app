<template>
    <div>
        <tasks-list :tasks="tasks"></tasks-list>
        <transition name="opacity-slide-up">
            <div v-if="tasks.length < 1" class="flex flex-col items-center">
                <img src="/img/success.svg" alt="woman jumping and smartphone with checkmark on it" class="w-1/2 mt-8">
                <div class="font-light text-xl text-blue-darkest px-8 mt-8 text-center">
                    There is nothing more you can do.
                    <div class="text-sm font-bold mt-4">Sit back and relax!</div>
                </div>
            </div>
        </transition>
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

                list.push(this.findTasks().filter(task => task.isDo() ))

                return _.uniqBy(_.flatten(list), 'id')
            }
        })
        .vue()
</script>