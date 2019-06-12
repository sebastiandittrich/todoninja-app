<template>
    <transition name="opacity-slide-up">
        <div class="pb-32">

            <div class="dark:bg-black-deep bg-grey-light">
                <div class="p-4 px-6 flex flex-row items-center justify-start text-2xl mx-auto container">
                    <i @click="$router.back()" class="feather icon-arrow-left cursor-pointer select-none"></i>
                    <div class="ml-8">Today</div>
                </div>
            </div>

            <div class="bg-grey-light dark:bg-black-deep">
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
    computed: {
        tasks() {
            return this.$store.getters['tasks/find']({ query: { today: { $ne: null }, doneAt: { $or: [ { $gte: moment().startOf('day') }, null ] } } }).data
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