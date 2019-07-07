<template>
    <div>
        <transition name="opacity">
            <div v-if="tasks.length > 0 && openTasks.length == 0" class="container mx-auto mt-32 mb-64 flex flex-col items-center justify-center">
                <today-quote class="mx-8"></today-quote>
            </div>
        </transition>

        <tasks-list @item-click="$emit('item-click', $event)" :tasks="tasks" :filter="false"></tasks-list>

        <transition name="opacity">
            <div v-if="tasks.length > 0" class="flex flex-col items-center justify-center mt-16">
                <div @click="showModal('today-suggestions-modal')" class=" text-sm text-blue dark:text-blue-light px-4 py-3 font-bold tracking-wide uppercase select-none cursor-pointer">
                    <i class="feather icon-compass mr-2"></i> Suggestions
                </div>
            </div>
        </transition>

        <today-suggestions-modal @hide="hideModal('today-suggestions-modal')" :state="modalState('today-suggestions-modal')"></today-suggestions-modal>
    </div>
</template>

<script>
import { hasModals } from '@/mixins'

import TasksList from '@c/tasks/List'
import TodayQuote from '@c/today/Quote'
import TodaySuggestionsModal from '@c/today/suggestions/Modal'

export default {
    components: { TasksList, TodayQuote },
    mixins: [ hasModals({ TodaySuggestionsModal }) ],
    computed: {
        tasks() {
            return this.$store.getters['tasks/today'].data
        },
        openTasks() {
            return this.tasks.filter(task => !task.isDone())
        },
    }
}
</script>