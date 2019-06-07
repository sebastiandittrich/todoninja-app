<template>
    <transition name="opacity-slide-up">
        <div class="pb-32">

            <div class="dark:bg-black-deep bg-grey-light">
                <div class="p-4 flex flex-row items-center justify-start text-2xl mx-auto container">
                    <i @click="$router.back()" class="feather icon-arrow-left cursor-pointer select-none"></i>
                    <div class="ml-8">Today</div>
                </div>
            </div>

            <div class="bg-grey-light dark:bg-black-deep">
                <div class="max-w-2xl mx-auto py-8 px-2">
                    <tasks-list v-if="tasks.length > 0" :tasks="tasks" :filter="false"></tasks-list>
                </div>
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
    mixins: [ themeColor({ dark: 'black-deep', light: 'grey-light' }) ],
    data: () => ({

    }),
    computed: {
        tasks() {
            return this.$store.getters['tasks/find']({ query: { today: { $ne: null } } }).data
        }
    },
    methods: {
    },
}
</script>