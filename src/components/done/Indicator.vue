<template>
    <div class="stacking cursor-pointer select-none" @click.stop="toggleState">
        <transition name="scale">
            <i v-if="!task.isDone()" key="undone" class="feather icon-circle text-grey-darker"></i>
            <i v-else key="done" class="feather icon-check-circle text-green"></i>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        task: Object
    },
    methods: {
        toggleState() {
            this.task.toggleState()
            this.$store.dispatch('events/success', { 
                message: 'Task ' + (this.task.isDone() ? 'done' : 'undone'),
                actions: [
                    {
                        name: 'undo',
                        click: () => this.task.toggleState(),
                    }
                ]
            })
            this.$emit('change')
        }
    }
}
</script>