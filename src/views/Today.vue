<template>
    <transition name="opacity-slide-up">
        <div class="pb-32">

            <div :class="isAddingFromScratch ? 'dark:bg-grey-darkest bg-grey-lighter' : 'dark:bg-black-deep bg-grey-light'" class="transition">
                <div class="p-4 flex flex-row items-center justify-start text-2xl mx-auto container">
                    <i @click="$router.back()" class="feather icon-arrow-left cursor-pointer select-none"></i>
                    <div class="ml-8">Today</div>
                </div>
            </div>

            <div class="bg-grey-light dark:bg-black-deep" v-if="!isAddingFromScratch">
                <div class="max-w-2xl mx-auto py-8 px-2">
                    <tasks-list :tasks="tasks" :filter="false"></tasks-list>
                </div>
            </div>

            <div @click="areSuggestionsVisible = !areSuggestionsVisible" class="cursor-pointer select-none flex flex-col items-center justify-center bg-grey-lighter dark:bg-grey-darkest">
                <div :class="areSuggestionsVisible ? 'text-grey-dark dark:text-grey' : 'text-blue dark:text-blue-light'" class="p-4 font-bold uppercase tracking-wide text-sm flex flex-row items-center">
                    <i class="feather icon-compass mr-2"></i> Suggestions <i :class="areSuggestionsVisible ? 'icon-chevron-up' : 'icon-chevron-down'" class="feather ml-2"></i>
                </div>
                <transition name="expand">
                    <div v-if="areSuggestionsVisible" class="container mx-auto mt-8 font-bold text-xl max-w-2xl">
                        <tasks-list :tasks="suggestions" :filter="false" ></tasks-list>
                    </div>
                </transition>
            </div>

            <!-- Space for bottom bar -->
            <div class="h-32"></div>
        </div>
    </transition>
</template>

<script>
import { themeColor } from '@/mixins'

import TasksList from '@c/tasks/List'

export default {
    components: { TasksList },
    mixins: [ themeColor((vue) => (vue.isAddingFromScratch ? { dark: 'grey-darkest', light: 'grey-lighter' } : { dark: 'black-deep', light: 'grey-light' })) ],
    data: () => ({
        areSuggestionsVisible: false
    }),
    computed: {
        tasks() {
            return this.$store.getters['tasks/find']({ query: { today: { $ne: null }, doneAt: { $or: [ { $gt: moment().startOf('day') }, null ] } } }).data
        },
        isAddingFromScratch() {
            return this.tasks.length < 1
        },
        suggestions() {
            const inPast = { $lte: moment().endOf('day') }
            return this.$store.getters['tasks/find']({ query: { 
                today: null,
                doneAt: null, 
                $or: [
                    { deadline: inPast },
                    { remindAt: inPast }
                ]
            }}).data
        },
    },
    methods: {
        mayShowSuggestions() {
            if(this.isAddingFromScratch) {
                this.areSuggestionsVisible = true
            } else if(this.suggestions.length < 1) {
                this.areSuggestionsVisible = false
            }
        }
    },
    watch: {
        'tasks.length': 'mayShowSuggestions'
    },
    mounted() {
        this.mayShowSuggestions()
    }
}
</script>