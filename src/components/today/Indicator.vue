<template>
    <transition name="scale">
        <div class="stacking cursor-pointer select-none" @click.stop="toggleToday" v-if="!task.isDone()">
            <transition name="scale">
                <i v-if="task.wasToday()" key="wastoday" class="feather icon-sun text-red"></i>
                <i v-else-if="task.isToday()" key="today" class="feather icon-sun text-orange"></i>
                <i v-else key="nottoday" class="feather icon-sun" :class="{'text-grey-light dark:text-grey-darker': !darker, 'text-grey dark:text-grey-darker': darker }"></i>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        task: Object,
        darker: {
            default: false,
            type: Boolean,
        }
    },
    methods: {
        toggleToday() {
            this.task.toggleToday()
            this.$emit('change')
        }
    }
}
</script>