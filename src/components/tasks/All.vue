<template>
    <div class="flex flex-col">
        <tasks-list @item-click="$emit('item-click', $event)" :tasks="tasks"></tasks-list>
        <tasks-placeholder v-if="tasks.length < 1 && !moreTasksAvailable">
        </tasks-placeholder>
        <bbutton :loading="loading" v-if="moreTasksAvailable" @click="loadDoneClick">
            Load {{ moreTasksAvailable }} done tasks
        </bbutton>
    </div>
</template>

<script>
import { store, loading } from '@/mixins'

import TasksList from '@c/tasks/List'
import TasksPlaceholder from '@c/tasks/Placeholder'

export default {
    components: { TasksList, TasksPlaceholder },
    mixins: [
        loading,
        store({
            getters: {
                findTasks: 'tasks/currentFind'
            },
        })
    ],
    data: () => ({
        moreTasksAvailable: true
    }),
    computed: {
        tasks() {
            return this.findTasks().data
        }
    },
    methods: {
        loadDoneClick() {
            this.load(async () => await this.$store.dispatch('tasks/findAll'))
        },
        async updateTaskCount(length) {
            const res = this.$store.dispatch('tasks/find', { query: { $limit: 0, workspaceId: this.$store.getters['workspaces/current'].id } })
            this.moreTasksAvailable = (await res).total - length
        }
    },
    watch: {
        'tasks.length': 'updateTaskCount'
    },
    created() { 
        this.updateTaskCount(this.tasks.length)
    }
}
</script>