<template>
    <div>
        <div class="flex flex-row items-center justify-between cursor-pointer select-none" @click="showModal('state-picker', $event)">
            <div class="flex flex-row items-center justify-start">
                <span class="icon-presenter">
                    <i class="w-8 h-8 bg-blue dark:bg-blue-light rounded-full"></i>
                    <i class="text-white" :class="activeState.icon"></i>
                </span>
                <div class="flex flex-col items-start justify-start ml-2">
                    <div class="font-bold text-sm">
                        {{ activeState.name }} {{ value.isWaiting() ? 'for' : null }}
                    </div>
                    <div v-if="value.state === 1" class="flex flex-row items-center justify-start"> <!-- Was postponed, is now do again -->
                      <i class="feather icon-chevrons-right text-grey-darkest"></i>
                      <div class="text-sm text-grey-darker">
                        {{ value.humanDeadline() }}
                      </div>
                    </div>
                    <div v-else class="font-light text-lg">
                        {{ value.isWaiting() ? value.waiting_for : value.humanDeadline() }}
                    </div>
                </div>
            </div>
            <div v-if="value.isWaiting()">
                <div @click.stop="showModal('personpicker', $event)" class="button-secondary button-small mt-0 rounded-r-none border-r-0">
                    <i class="feather icon-edit"></i>
                </div>
                <div @click.stop="showModal('datepicker', $event)" class="button-secondary button-small mt-0 rounded-l-none" :class="{ 'text-orange dark:text-orange border-orange dark:border-orange bg-orange-lightest dark:bg-orange-darkest': value.isDeadlineOver(), 'text-blue dark:text-blue-light border-blue dark:border-blue-light dark:bg-blue-darkest bg-blue-lightest': value.isDeadlineToday(), 'font-bold': value.isDeadlineOver() || value.isDeadlineToday() }">
                    <i v-if="!value.hasDeadline()" class="feather icon-plus mr-2"></i>
                    {{ value.hasDeadline() ? value.humanDeadline() : 'Deadline' }}
                </div>
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
        <datepicker @input="$emit('change', $event)" v-model="value.deadline" :state="modalState('datepicker')" @hide="hideModal('datepicker')"></datepicker>
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
import hasModals from '@/mixins/hasModals'
import State from '@/assets/js/State'

import StatePicker from '@c/state/Picker'
import Personpicker from '@c/personpicker'
import Datepicker from '@c/datepicker'

export default {
    mixins: [ hasModals({ StatePicker, Personpicker, Datepicker }) ],
    props: {
        value: Object
    },
    data: () => ({
        states: State.states,
    }),
    computed: {
        activeState() {
            return this.states.filter(state => this.value.getState() == state.state)[0]
        },
    }
}
</script>
