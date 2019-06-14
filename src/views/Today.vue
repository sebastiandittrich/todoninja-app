<template>
    <transition name="opacity-slide-up">
        <div class="pb-32">

            <div class="dark:bg-black-deep bg-grey-light">
                <div class="p-4 px-6 flex flex-row items-center justify-start text-2xl mx-auto container">
                    <i @click="$router.back()" class="feather icon-arrow-left cursor-pointer select-none"></i>
                    <div class="ml-8">Today</div>
                </div>
            </div>

            <div v-if="tasks.length > 0 || doneTasks.length < 1" class="bg-grey-light dark:bg-black-deep">
                <div class="max-w-2xl mx-auto py-8 px-2 pb-10">
                    <transition name="opacity" mode="out-in">
                        <tasks-list key="placeholder" v-if="tasks.length > 0" :tasks="tasks" :filter="false"></tasks-list>
                        <div key="list" class="flex flex-col items-center justify-start" v-else>
                            <img src="/img/todaystart.svg" class="w-2/3" >
                            <div class="mt-8 font-bold text-xl">
                                No Tasks for today.
                            </div>
                            <div @click="showModal('tasks-modal')" class="button bg-blue text-white rounded-full px-4 py-3 mt-6">
                                <i class="feather icon-compass mr-2"></i> Suggestions
                            </div>
                        </div>
                    </transition>
                </div>
            </div>

            <div v-if="doneTasks.length > 0" class="bg-grey-lighter py-4 px-2">
                <div v-if="doneTasks.length > 0 && tasks.length < 1" class="-my-4 -mx-2 px-6 pt-4 pb-10 flex flex-col items-center" style="background: linear-gradient(180deg, #DAE1E7 0%, #F1F5F8 100%);">
                    <div class="flex flex-row items-center">
                        <i class="feather icon-coffee text-orange-dark text-5xl"></i>
                        <div class="ml-8">
                            <div class="font-bold">Everything is done for today.</div>
                            <div class="font-light">Time to take a break.</div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg border-2 border-grey py-2 px-4 text-xs uppercase text-grey-darker font-bold mt-8 z-10">
                        Fun fact
                    </div>
                    <div class="bg-white rounded-lg py-8 px-4 italic text-2xl -mt-4 text-center" style="font-family: 'Lora', serif;">
                        7% of American adults believe that chocolate milk comes from brown cows.
                    </div>
                </div>
                <div @click="areDoneTasksVisible = !areDoneTasksVisible" class="flex flex-row items-center justify-start px-4 mt-4">
                    <transition-group name="list" class="flex flex-row items-center justify-start">
                        <i v-for="n in doneTasks.length" :key="n" :class="{ '-ml-3': n > 1 }" class="feather icon-check-circle text-green bg-grey-lighter rounded-full text-xl" :style="n > 1 ? 'padding: 2px' : ''"></i>
                    </transition-group>
                    <div class="ml-2 text-grey-darker text-sm flex flex-row items-center">
                        {{ doneTasks.length }} done <i class="feather icon-chevron-down ml-1"></i>
                    </div>
                </div>
                <transition name="expand">
                    <div v-if="areDoneTasksVisible" class="mt-8">
                        <tasks-list :tasks="doneTasks" :filter="false"></tasks-list>
                    </div>
                </transition>
            </div>

            <tasks-modal :tasks="suggestions" headline="Suggestions" @hide="hideModal('tasks-modal')" :state="modalState('tasks-modal')"></tasks-modal>

            <navigation-bar>
                <navigation-button @click="showModal('tasks-modal')">
                    <i class="feather icon-compass"></i>
                </navigation-button>
            </navigation-bar>

            <!-- Space for bottom bar -->
            <div class="h-32"></div>

        </div>
    </transition>
</template>

<script>
import { themeColor, hasModals } from '@/mixins'

import TasksList from '@c/tasks/List'
import TasksModal from '@c/tasks/Modal'

export default {
    components: { TasksList },
    mixins: [ 
        themeColor({ dark: 'black-deep', light: 'grey-light' }),
        hasModals({ TasksModal })
    ],
    data: () => ({
        areDoneTasksVisible: false,
    }),
    computed: {
        tasks() {
            return this.$store.getters['tasks/find']({ query: { today: { $ne: null }, doneAt: null } }).data
        },
        doneTasks() {
            return this.$store.getters['tasks/find']({ query: { doneAt: { $gte: moment().startOf('day') } } }).data
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
}
</script>