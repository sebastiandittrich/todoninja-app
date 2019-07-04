<template>
    <div class="overflow-auto">
        <div>
            <div class="p-4 flex flex-row items-center justify-start text-2xl mx-auto container">
                <i @click="$router.back()" class="feather icon-arrow-left cursor-pointer select-none"></i>
                <div class="ml-8">Stats</div>
            </div>
        </div>

        <div class="text-grey-darker dark:text-grey uppercase text-sm text-center p-4">
            Overview
        </div>
        <div class="flex flex-row flex-wrap justify-around container mx-auto md:justify-center">
            <count class="shadow-lg rounded-lg m-4" :value="users.count.total">Total users</count>
            <count class="shadow-lg rounded-lg m-4" :value="tasks.count.total">Total tasks</count>
            <count class="shadow-lg rounded-lg m-4" :value="tasks.done.total">Tasks done</count>
            <count class="shadow-lg rounded-lg m-4" :value="tasks.open">Tasks open</count>
        </div>

        <div class="text-grey-darker dark:text-grey uppercase text-sm text-center p-4 mt-8">
            Over time
        </div>
        <div class="flex flex-row flex-wrap justify-around container md:mx-auto md:justify-center mb-32 mx-4">
            <time-chart ref="timeChart" :chart-data="{ datasets: [ doneEvolution, totalEvolution ] }"></time-chart>
            <time-chart :chart-data="{ datasets: [ usersEvolution ] }"></time-chart>
        </div>

        <navigation-bar></navigation-bar>

    </div>
</template>

<script>
import { store, themeColor } from '@/mixins'
import { color } from '@/assets/js/helpers'

import Count from '@c/stats/count'
import TimeChart from '@c/stats/charts/time'

export default {
    components: { Count, TimeChart },
    mixins: [ 
        themeColor({ light: 'white', dark: 'black' }),
        store({
            actions: {
                _find: 'stats/find'
            }
        })
    ],
    data: () => ({
        users: {
            count: {
                total: 0,
                evolution: []
            },
        },
        tasks: {
            count: {
                total: 0,
                evolution: []
            },
            done: {
                total: 0,
                evolution: []
            },
            open: 0,
        }
    }),
    methods: {
        async find(query) {
            return this._find({ query: { $sort: { createdAt: -1 }, ...query } })
        },
        async fetchData() {
            this.users.count.total = (await this.find({ $limit: 1, type: 'users:count', $sort: { createdAt: -1 } })).data[0].data
            this.tasks.count.total = (await this.find({ $limit: 1, type: 'tasks:count', $sort: { createdAt: -1 } })).data[0].data
            this.tasks.done.total = (await this.find({ $limit: 1, type: 'tasks:done', $sort: { createdAt: -1 } })).data[0].data
            this.tasks.open = this.tasks.count.total - this.tasks.done.total

            this.tasks.done.evolution = (await this.fetchEvolution({ type: 'tasks:done' })).map(stat => ({ x: stat.createdAt, y: stat.data }))
            this.tasks.count.evolution = (await this.fetchEvolution({ type: 'tasks:count' })).map(stat => ({ x: stat.createdAt, y: stat.data }))
            this.users.count.evolution = (await this.fetchEvolution({ type: 'users:count' })).map(stat => ({ x: stat.createdAt, y: stat.data }))
        },
        async fetchEvolution({ type, precision = 5 }) {
            const { total } = await this.find({ type, $limit: 0 })
            const every = total / precision

            const indexes_to_fetch = Array.from(Array(precision).keys()).map(item => Math.round(item * (total/precision)))

            const fetched = []
            for(const index of indexes_to_fetch) {
                const { data } = await this.find({ type, $limit: 1, $skip: index })
                fetched.push(data[0])
            }
            return fetched
        },
    },
    computed: {
        doneEvolution() {
            return {
                label: 'Done Tasks',
                backgroundColor: color('green'),
                data: this.tasks.done.evolution
            }
        },
        totalEvolution() {
            return {
                label: 'Total Tasks',
                backgroundColor: color({ light: 'blue', dark: 'blue-light'}),
                data: this.tasks.count.evolution
            }
        },
        usersEvolution() {
            return {
                label: 'Total Users',
                backgroundColor: color({ light: 'blue', dark: 'blue-light'}),
                data: this.users.count.evolution
            }
        },
    },
    mounted() {
        this.fetchData()
    }
}
</script>
