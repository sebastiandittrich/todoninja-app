<template>
    <transition name="scale">
        <div class="stacking" @click.stop="toggleToday" v-if="!task.isDone()">
            <transition name="scale">
                <i v-if="task.wasToday()" key="wastoday" class="feather icon-star text-red"></i>
                <i v-else-if="!task.isToday()" key="nottoday" class="feather icon-star" :class="{'text-grey-light': !darker, 'text-grey': darker }"></i>
                <i v-else key="today" class="feather icon-star text-orange"></i>
            </transition>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .props({
        task: Object,
        darker: {
            default: false,
            type: Boolean,
        }
    })
    .methods({
        toggleToday() {
            this.task.toggleToday()
            this.$emit('change')
        }
    })
    .vue()

</script>