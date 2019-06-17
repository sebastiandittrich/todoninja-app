<template>
    <div>
        <transition name="opacity" mode="out-in">
            <div key="progress" v-if="progress < 1" class="flex flex-col stretch justify-start p-4">
                <div class="stacking h-2">
                    <div class="bg-grey-lighter dark:bg-grey-darkest rounded-full h-full"></div>
                    <div :style="{width: `${percent}%`}" class="bg-green rounded-full h-full transition"></div>
                </div>
                
                <div class="flex flex-row items-center justify-between mt-2">
                    <transition name="opacity" mode="out-in">
                        <div :key="percent" class="text-grey-dark dark:text-grey-dark text-sm flex flex-row items-center">
                            {{ percent }}%
                        </div>
                    </transition>
                    <div class="text-grey-dark dark:text-grey-dark text-sm flex flex-row items-center">
                        {{ done.length }} done
                    </div>
                </div>
            </div>
            <div v-else key="done" class="p-6">
                 <div class="flex flex-row items-center justify-start">
                    <i class="feather icon-check text-green text-5xl font-bold"></i>
                    <div class="ml-8">
                        <div class="font-bold">Everything is done for today.</div>
                        <div class="font-light">Time to take a break.</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    computed: {
        progress() {
            return this.done.length / this.total.length
        },
        percent() {
            return Math.round(this.progress * 100)
        },
        total() {
            return this.$store.getters['tasks/today'].data
        },
        done() {
            return this.total.filter(task => task.isDone())
        }
    }
}
</script>

<style>

</style>
