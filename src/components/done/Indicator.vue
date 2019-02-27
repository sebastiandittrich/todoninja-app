<template>
    <div class="stacking cursor-pointer select-none" @click.stop="toggleState">
        <transition name="scale">
            <i v-if="!task.isDone()" key="undone" class="feather icon-circle text-grey-darker"></i>
            <i v-else key="done" class="feather icon-check-circle text-green"></i>
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
        toggleState() {
            this.task.toggleState()
            this.$emit('change')
        }
    })
    .vue()

</script>