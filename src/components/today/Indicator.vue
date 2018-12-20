<template>
    <div class="stacking" @click.stop="toggleToday">
        <transition name="scale">
            <i v-if="task.wasToday()" key="wastoday" class="feather icon-star text-red"></i>
            <i v-else-if="!task.isToday()" key="nottoday" class="feather icon-star text-grey-light"></i>
            <i v-else key="today" class="feather icon-star text-orange"></i>
        </transition>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .props({
        task: Object
    })
    .methods({
        toggleToday() {
            this.task.toggleToday()
            this.$emit('change')
        }
    })
    .vue()

</script>