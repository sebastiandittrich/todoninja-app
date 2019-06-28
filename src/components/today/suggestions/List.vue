<template>
    <transition-group name="list">
            <div v-for="group of groups" :key="group.name || 'null'">
                <div class="font-bold uppercase tracking-wide text-xs mb-4 text-grey-dark">
                    {{ group.name }}
                </div>
                <tasks-list @item-click="$router.push({ name: 'Tasks.Detail', params: { id: $event.id } })" :filter="false" :tasks="group.tasks"></tasks-list>
            </div>
        </transition-group>
</template>

<script>
import { differenceBy, concat } from 'lodash'

import TasksList from '@c/tasks/List'

export default {
    components: { TasksList },
    props: {
        filter: false,
    },
    methods: {
        tasks(query) {
            const inPast = { $lte: moment().endOf('day') }

            return this.$store.getters['tasks/find']({ query: { 
                today: null,
                doneAt: null,
                ...query    
            }}).data
        }
    },
    computed: {
        groups() {
            return [
                { name: 'Overdue', tasks: this.deadlineOver },
                { name: 'Today', tasks: this.deadlineToday },
                { name: 'Tomorrow', tasks: this.deadlineTomorrow },
                { name: 'Other', tasks: this.other },
            ].filter(group => group.tasks.length > 0)
        },
        deadlineOver() {
            return this.tasks({ deadline: { $lt: moment().startOf('day') } })
        },
        deadlineToday() {
            const limit = { $lt: moment().endOf('day'), $gt: moment().startOf('day') }
            
            return this.tasks({ $or: [ { deadline: limit }, { reminder: limit } ] })
        },
        deadlineTomorrow() {
            const limit = { $lt: moment().add(1, 'day').endOf('day'), $gt: moment().add(1, 'day').startOf('day') }

            return this.tasks({ $or: [ { deadline: limit }, { remindAt: limit } ] })
        },
        other() {
            return differenceBy(this.tasks(), concat(this.deadlineOver, this.deadlineToday, this.deadlineTomorrow))
        }
    }
}
</script>

<style>

</style>
