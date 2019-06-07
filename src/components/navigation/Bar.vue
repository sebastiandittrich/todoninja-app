<template>
    <div class="fixed bottom-0 inset-x-0 flex flex-col items-stretch pointer-events-none">
        <transition name="opacity-slide-up">
            <navigation-item v-if="showAddButton" link="/tasks/create" class="self-end m-8 z-10 pointer-events-auto">
                <i class="feather icon-plus text-2xl text-blue p-3 rounded-full bg-white dark:bg-black-deep dark:text-blue-light shadow-lg"></i>
            </navigation-item>
        </transition>
        <div class="bg-white dark:bg-black-deep flex flex-row justify-around items-center text-xl px-2 py-3 text-grey dark:text-grey-dark rounded-t-lg nav-bar pointer-events-auto">
            <navigation-item link="/today">
                <i class="feather icon-sun"></i>
            </navigation-item>
            <navigation-item link="/tasks">
                <i class="feather icon-list"></i>
            </navigation-item>
            <navigation-item link="/settings">
                <i class="feather icon-settings"></i>
            </navigation-item>
        </div>
    </div>
</template>

<style scoped>
    .nav-bar {
        filter: drop-shadow(0px 0px 50px rgba(0,0,0,0.11));
    }
</style>

<script>
import _ from 'lodash'

import NavigationItem from '@c/navigation/Item'

export default {
    components: { NavigationItem },
    props: {
        showAddButton: {
            type: Boolean,
            default: true
        }
    }
}
</script>
