<template>
    <transition name="opacity-slide-up">
        <div class="pb-32">
            <div class="p-4 hidden lg:flex flex-row items-center justify-start text-2xl mx-auto container">
                <i @click="$router.back()" class="feather icon-arrow-left cursor-pointer select-none"></i>
                <div class="ml-8">Summary</div>
            </div>

            <div class="flex flex-col items-center justify-center p-8">
                <div class="text-grey-dark font-bold tracking-wide uppercase text-xs mb-8">
                    Current week
                </div>
                <progress-circle :radius="130" :completed="weeks[0] && weeks[0].relation >= 1" :basecolor="relationColor(weeks[0] ? weeks[0].relation : 1)" :data="weeks[0] ? weeks[0].data : []" :total="{ name: 'Created', value: weeks[0] ? weeks[0].total : 0 }" legend></progress-circle>
            </div>

            <div class="container md:mx-auto">
                <transition-group name="opacity">
                    <div v-for="year of years" :key="year.year">
                        <div class="text-center text-grey-dark font-bold tracking-wide uppercase text-xs mb-8 mt-16">
                            {{ year.year == moment().year() ? 'Current year' : year.year }}
                        </div>
                        <summary-week-list :value="year.weeks" class="rounded-lg border border-grey-light mx-4"></summary-week-list>
                    </div>
                </transition-group>
                <infinite-loading key="loader" @infinite="loadMore"></infinite-loading>
            </div>

            <!-- Space for bottom bar -->
            <div class="h-32"></div>
        </div>
    </transition>
</template>

<script>
import State from '@/assets/js/State'
import _ from 'lodash'

import SummaryWeekList from '@c/summary/week/List'
import ProgressCircle from '@c/progress/Circle'
import InfiniteLoading from 'vue-infinite-loading'

export default {
    components: { SummaryWeekList, ProgressCircle, InfiniteLoading },
    data: () => ({
        weeks: [],
        nextweek: 0,
    }),
    computed: {
        years() {
            const grouped = _.groupBy(this.weeks.slice(1), week => week.to.year())
            return _.orderBy(Object.keys(grouped).map(year => ({ year, weeks: grouped[year] })), 'year', 'desc')
        }
    },
    methods: {
        async fetchWeek(week) {
            const from = moment().weekday( -(week * 7) )
            const to = moment().weekday( -(week * 7) + 7 )

            const done = (await this.$store.dispatch('tasks/find', { pagination: false, query: { $limit: 0, doneAt: { $gte: from, $lte: to } } })).total
            const created = (await this.$store.dispatch('tasks/find', { pagination: false, query: { $limit: 0, createdAt: { $gte: from, $lte: to } } })).total

            const relation = done / created
            const color = this.relationColor(relation)

            return { from, to, color, relation, number: week, total: created, data: [ { name: 'Done', value: done } ] }
        },

        async fetchData() {
            // for(let week = 0; week < 5; week++) {
            //     this.weeks.push(await this.fetchWeek(week))
            // }
        },
        relationColor(relation) {
            if(relation <= 0) return 'red'
            else if(relation < 0.5) return 'orange'
            else return 'green'
        },
        async loadMore($state) {
            this.weeks.push(await this.fetchWeek(this.nextweek))
            this.nextweek++
            $state.loaded()
        },
        moment(...args) {
            return moment(...args)
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>