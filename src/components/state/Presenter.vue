<template>
    <div>
        <div class="flex flex-row items-center justify-between" @click="showModal('state-picker', $event)">
            <div class="flex flex-row items-center justify-start">
                <span class="icon-presenter">
                    <i class="w-8 h-8 bg-blue rounded-full"></i>
                    <i class="text-white" :class="activeState.icon"></i>
                </span>
                <div class="flex flex-col items-start justify-start ml-2">
                    <div class="font-bold text-sm">
                        {{ activeState.name }} {{ value.isWaiting() ? 'for' : null }}
                    </div>
                    <div class="font-light text-lg">
                        {{ value.isWaiting() ? value.waiting_for : value.humanDeadline() }}
                    </div>
                </div>
            </div>
            <div v-if="value.isWaiting()" @click.stop="showModal('personpicker', $event)" class="button-secondary button-small mt-0">
                <i class="feather icon-edit mr-2"></i>
                Person
            </div>
            <div v-else-if="value.hasDeadline()" @click.stop="showModal('datepicker', $event)" class="button-secondary button-small mt-0">
                <i class="feather icon-edit mr-2"></i>
                Date
            </div>
            <div v-else @click.stop="showModal('datepicker', $event)" class="button-secondary button-small mt-0">
                <i class="feather icon-plus mr-2"></i>
                Add Date
            </div>
        </div>
        <state-picker @change="$emit('change', $event)" v-model="value" :state="modalState('state-picker')" @hide="hideModal('state-picker')"/>
        <personpicker @input="$emit('change', $event)" v-model="value.waiting_for" :state="modalState('personpicker')" @hide="hideModal('personpicker')"></personpicker>
        <datepicker @input="$emit('change', $event)" v-model="value.deadlineAsDate" :state="modalState('datepicker')" @hide="hideModal('datepicker')"></datepicker>
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
    .use( hasModals({ 'state-picker': 'state/Picker', 'personpicker': 'personpicker', 'datepicker': 'datepicker' }) )
    .vue()
</script>