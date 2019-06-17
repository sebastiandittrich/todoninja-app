<template>
    <transition name="opacity-slide-up">
        <div class="pb-32">

            <topbar class="dark:bg-black-deep bg-grey-light">Today</topbar>

            <div class="bg-grey-light dark:bg-black-deep">
                <transition name="opacity" mode="out-in">
                    <today-progress v-if="tasks.length > 0" class="container mx-auto"></today-progress>
                    <day-start-placeholder v-else class="bg-grey-light dark:bg-black-deep p-8" @click="showModal('today-suggestions-modal')"></day-start-placeholder>
                </transition>
            </div>

            <transition name="opacity">
                <today-quote v-if="tasks.length > 0 && openTasks.length == 0" class="my-16 mx-8 container mx-auto"></today-quote>
            </transition>

            <tasks-list class="mt-6 container mx-auto" :tasks="tasks" :filter="false"></tasks-list>

            <!-- <div v-if="tasks.length > 0 || doneTasks.length < 1" class="bg-grey-light dark:bg-black-deep">
                <div class="max-w-2xl mx-auto py-8 px-2 pb-10">
                    <transition name="opacity" mode="out-in">
                        <tasks-list key="placeholder" v-if="tasks.length > 0" :tasks="tasks" :filter="false"></tasks-list>
                        <day-start-placeholder v-else @click="showModal('today-suggestions-modal')"></day-start-placeholder>
                    </transition>
                </div>
            </div>
        
            <div v-if="doneTasks.length > 0" class="bg-grey-light dark:bg-grey-darkest py-4 px-2">
                <transition name="opacity">
                    <div v-if="doneTasks.length > 0 && tasks.length < 1" class="-my-4 -mx-2 px-6 pt-4 pb-10 flex flex-col items-center">
                       
                        
                        <quote class="mt-8" :quote="quote"></quote>

                    </div>
                </transition>
            </div> -->

            <today-suggestions-modal @hide="hideModal('today-suggestions-modal')" :state="modalState('today-suggestions-modal')"></today-suggestions-modal>

            <navigation-bar>
                <navigation-button @click="showModal('today-suggestions-modal')">
                    <i class="feather icon-compass"></i>
                </navigation-button>
            </navigation-bar>

            <!-- Space for bottom bar -->
            <div class="h-32"></div>

        </div>
    </transition>
</template>

<script>
import { themeColor, hasModals, colorfunction } from '@/mixins'

import TasksList from '@c/tasks/List'
import TodaySuggestionsModal from '@c/today/suggestions/Modal'
import Topbar from '@c/Topbar'
import DayStartPlaceholder from '@c/today/DayStartPlaceholder'
import TodayQuote from '@c/today/Quote'
import TodayProgress from '@c/today/Progress'

export default {
    components: { TasksList, Topbar, DayStartPlaceholder, TodayQuote, TodayProgress },
    mixins: [ 
        themeColor({ dark: 'black-deep', light: 'grey-light' }),
        hasModals({ TodaySuggestionsModal }),
        colorfunction
    ],
    data: () => ({ progress: 0.5 }),
    computed: {
        tasks() {
            return this.$store.getters['tasks/today'].data
        },
        openTasks() {
            return this.tasks.filter(task => !task.isDone())
        }
    },
}
</script>