<template>
    <div>
        <div class="flex flex-row items-center justify-start" @click="showModal('state-picker', $event)">
            <span class="icon-presenter">
                <i class="w-8 h-8 bg-blue rounded-full"></i>
                <i class="text-white" :class="activeState.icon"></i>
            </span>
            <div class="flex flex-col items-start justify-start ml-2">
                <div class="font-bold text-sm">
                    {{ activeState.name }}
                </div>
                <div class="font-light text-lg">
                    {{ value.humanDeadline() }}
                </div>
            </div>
        </div>
        <state-picker @change="$emit('change', $event)" v-model="value" :state="modalState('state-picker')" @hide="hideModal('state-picker')"/>
    </div>
</template> 

<style scoped>
    .icon-presenter {
        display: grid;
        grid-template: "icons" auto / auto;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }
    .icon-presenter > i {
        grid-area: icons;
    }
</style>


<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'
import State from '@/assets/js/State'

export default new Page()
    .props({
        value: Object
    })
    .data(() => ({
        states: State.states,
    }))
    .computed({
        activeState() {
            return this.states.filter(state => this.value.state == state.state)[0]
        },
    })
    .use( hasModals({ 'state-picker': 'state/Picker' }) )
    .vue()
</script>