<template>
    <transition name="opacity-slide-up">
        <div class="pb-32">

            <topbar class="dark:bg-black-deep">
                Today
            </topbar>

            <div class="dark:bg-black-deep">
                <transition name="opacity" mode="out-in">
                    <today-progress v-if="tasks.length > 0" class="container mx-auto px-2"></today-progress>
                    <day-start-placeholder v-else class="mt-32 p-8" @click="showModal('today-suggestions-modal')"></day-start-placeholder>
                </transition>
            </div>

            <transition name="opacity">
                <div v-if="tasks.length > 0 && openTasks.length == 0" class="container mx-auto h-2/3 flex flex-col items-center justify-center">
                    <today-quote class="mx-8"></today-quote>
                </div>
            </transition>

            <tasks-list @item-click="$router.push('/today/task/' + $event.id)" class="mt-8 container mx-auto" :tasks="tasks" :filter="false"></tasks-list>

            <transition name="opacity">
                <div v-if="tasks.length > 0" class="flex flex-col items-center justify-center mt-16">
                    <div @click="showModal('today-suggestions-modal')" class=" text-sm text-blue dark:text-blue-light px-4 py-3 font-bold tracking-wide uppercase select-none cursor-pointer">
                        <i class="feather icon-compass mr-2"></i> Suggestions
                    </div>
                </div>
            </transition>

            <today-suggestions-modal @hide="hideModal('today-suggestions-modal')" :state="modalState('today-suggestions-modal')"></today-suggestions-modal>

            <navigation-bar v-if="!isDetailOpen">
                <navigation-button @click="$router.push('/today/task/create')">
                    <i class="feather icon-plus"></i>
                </navigation-button>
            </navigation-bar>

            <transition name="opacity">
                <div @click="$router.back()" v-if="isDetailOpen" class="fixed inset-0 bg-black opacity-50 cursor-pointer hidden lg:block"></div>
            </transition>
            <router-view class="fixed inset-0 lg:left-auto lg:max-w-md lg:rounded-l-lg lg:shadow-xl"></router-view>

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
        themeColor({ dark: 'black-deep', light: 'white' }),
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
        },
        isDetailOpen() {
            return this.$route.name == 'Today.Detail'
        }
    },
}
</script>