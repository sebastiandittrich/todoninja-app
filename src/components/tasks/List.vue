<template>
    <div>
        <filter-bar v-if="filter" :filters="filters" :orderBy="orderBy"></filter-bar>
        <transition-group name="list" tag="div" class="mx-4">
            <tasks-item v-for="task in displayTasks" :task="task" :key="task.id" @click="$emit('item-click', task)"></tasks-item>
        </transition-group>
    </div>
</template>

<script>
import loading from '@/mixins/loading'
import store from '@/mixins/store'
import _ from 'lodash'
import OrderBy from '@/assets/js/OrderBy'

import TasksItem from '@c/tasks/Item'
import FilterBar from '@c/filter/Bar'

export default {
    components: { TasksItem, FilterBar },
    mixins: [ loading, store({ getters: { taskList: 'tasks/list' } }) ],
    props: {
        tasks: {
            type: Array,
            default: undefined
        },
        filter: {
            type: Boolean,
            default: true,
        }
    },
    data: () => ({
        filters: [],
        orderBy: {
            properties: [ OrderBy.filter(order => order.written_name == 'Open/Done')[0].name, OrderBy.filter(order => order.written_name == 'Newest')[0].name ],
            directions: ['asc', 'desc']
        }
    }),
    computed: {
        displayTasks() {
            let tasks = this.tasks !== undefined ? this.tasks : this.taskList

            for(const filter of this.filters) {
                if(filter.full) {
                    tasks = filter.filter(tasks)
                } else {
                    tasks = tasks.filter(filter)
                }
            }

            return _.orderBy(tasks, this.orderBy.properties, this.orderBy.directions)
        }
    }
}
</script>
