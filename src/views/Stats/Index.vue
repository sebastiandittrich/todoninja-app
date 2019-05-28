<template>
    <div class="">
        <div>
            <div class="p-4 flex flex-row items-center justify-start text-2xl mx-auto container">
                <i @click="$router.back()" class="feather icon-arrow-left cursor-pointer select-none"></i>
                <div class="ml-8">Stats</div>
            </div>
        </div>

        <div class="text-grey-darker uppercase text-sm text-center p-4">
            Overview
        </div>
        <div class="flex flex-row flex-wrap justify-around">
            <count class="shadow-lg rounded-lg m-4" :value="users.count">Total users</count>
            <count class="shadow-lg rounded-lg m-4" :value="tasks.count">Total tasks</count>
            <count class="shadow-lg rounded-lg m-4" :value="tasks.done">Tasks done</count>
            <count class="shadow-lg rounded-lg m-4" :value="tasks.open">Tasks open</count>
        </div>
    </div>
</template>

<script>
import Count from '@c/stats/count'

export default {
    components: { Count },
    data: () => ({
        users: {
            count: 0
        },
        tasks: {
            count: 0,
            done: 0,
            open: 0
        }
    }),
    methods: {
        async fetchData() {
            this.users.count = (await this.$store.dispatch('stats/find', { query: { $limit: 1, type: 'users:count', $sort: { createdAt: -1 } } })).data[0].data
            this.tasks.count = (await this.$store.dispatch('stats/find', { query: { $limit: 1, type: 'tasks:count', $sort: { createdAt: -1 } } })).data[0].data
            this.tasks.done = (await this.$store.dispatch('stats/find', { query: { $limit: 1, type: 'tasks:done', $sort: { createdAt: -1 } } })).data[0].data
            this.tasks.open = this.tasks.count - this.tasks.done
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>
