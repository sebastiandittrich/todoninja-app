<template>
    <div class="stacking" @click.stop="toggleState">
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
        async toggleState() {
            this.task.toggleState()
            await this.task.save()
        }
    })
    .vue()

</script>