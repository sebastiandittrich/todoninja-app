<template>
    <transition name="opacity-slide-up">
        <div class="pb-32">

            <div class="flex flex-col items-center justify-center p-8">
                <div class="text-grey-dark font-bold tracking-wide uppercase text-xs mb-8">
                    Current week
                </div>
                <progress-circle :radius="130" :completed="weeks[0] && weeks[0].relation >= 1" :basecolor="relationColor(weeks[0] ? weeks[0].relation : 1)" :data="weeks[0] ? weeks[0].data : []" :total="{ name: 'Created', value: weeks[0] ? weeks[0].total : 0 }" legend></progress-circle>
            </div>

            <div class="text-center text-grey-dark font-bold tracking-wide uppercase text-xs mb-8 mt-16">
                Last month
            </div>

            <transition-group tag="div" name="list" class="flex-col items-stretch rounded-lg border mx-4">
                <div v-for="week of weeks.slice(1)" :key="week.number" class="flex flex-row items-center p-4">
                    <progress-circle :basecolor="relationColor(week.relation)" :completed="week.relation >= 1" :data="week.data" :total="{ name: 'Created', value: week.total }" :radius="50" :stroke="8"></progress-circle>
                    <div class="ml-4">
                        <div class="font-bold text-black">
                            {{ week.from.format('wo') }} Week of Year
                        </div>
                        <div class="text-grey-dark">
                            {{ week.data[0].value }} Done / {{ week.total }} Created
                        </div>
                    </div>
                </div>
            </transition-group>

            <!-- Space for bottom bar -->
            <div class="h-32"></div>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'
import ProgressCircle from '@/components/ProgressCircle'
import State from '@/assets/js/State'

ProgressCircle.name = "progress-circle"

export default new Page()
    .with(ProgressCircle)
    .data(() => ({
        weeks: []
    }))
    .methods({
        async fetchWeek(week) {
            const from = moment().weekday( -(week * 7) )
            const to = moment().weekday( -(week * 7) + 7 )

            const done = (await this.$store.dispatch('tasks/find', { pagination: false, query: { $limit: 0, doneAt: { $gte: from, $lte: to } } })).total
            const created = (await this.$store.dispatch('tasks/find', { pagination: false, query: { $limit: 0, createdAt: { $gte: from, $lte: to } } })).total

            return { from, to, number: week, total: created, relation: done / created, data: [ { name: 'Done', value: done } ] }
        },

        async fetchData() {
            for(let week = 0; week < 5; week++) {
                this.weeks.push(await this.fetchWeek(week))
            }
        },
        relationColor(relation) {
            if(relation <= 0) return 'red'
            else if(relation < 0.5) return 'orange'
            else return 'green'
        }
    })
    .mounted(vue => {
        vue.fetchData()
    })
    .vue()
</script>