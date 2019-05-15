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
import _ from 'lodash'
import store from '@/mixins/store'

import TasksList from '@c/tasks/List'
import TasksPlaceholder from '@c/tasks/Placeholder'

export default {
    components: { TasksList, TasksPlaceholder },
    mixins: [
        store({
            getters: {
                _find: 'tasks/currentFind'
            }
        })
    ],
    methods: {
        find(query) {
            return this._find({ query: { doneAt: null, ...query } }).data
        },
    },
    computed: {
        tasks() {
            const list = [ ]
            const now = moment()

            list.push(this.find().filter( task => task.isDo() ))

            return _.uniqBy(_.flatten(list), 'id')
        }
    }
}
</script>