<template>
    <transition name="opacity-slide-up">
        <div v-if="show" class="fixed bottom-0 inset-x-0 flex flex-col items-stretch pointer-events-none z-10 container mx-auto">
            <div class="self-end z-10">
                <transition name="opacity-slide-up">
                    <slot></slot>
                </transition>
            </div>
            <div class="lg:hidden bg-white dark:bg-black-deep flex flex-row justify-around items-center text-xl px-2 py-3 text-grey dark:text-grey-dark rounded-t-lg nav-bar pointer-events-auto">
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
    </transition>
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
        text: {
            type: String,
            required: false
        }
    },
    computed: {
        show() {
            return this.$store.getters['modals/open'] <= 0
        }
    }
}
</script>
