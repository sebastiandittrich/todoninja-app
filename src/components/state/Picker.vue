<template>
    <modal :state="state" @hide="hide" positioned>

        <headline>Choose state</headline>

        <div class="mx-8">
            <div class="text-lg flex flex-col items-stretch">
                <div v-for="state of states" :key="state.state" @click="stateClick(state, $event)" :class="isActive(state) ? 'text-blue font-black' : 'font-light text-grey-darker'" class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer">
                    <i class="mr-4" :class="{[state.icon]: true, 'text-grey-dark': !isActive(state)}"></i>
                    {{ state.name }}
                </div>
            </div>
        </div>

        <actions>
            <cancel @click="hide"/>
        </actions>

        <div slot="submodals">
            <datepicker v-model="value.deadlineAsDate" @hide="hideModal('datepicker')" :state="modalState('datepicker')"></datepicker>
            <personpicker v-model="value.waiting_for" @hide="hideModal('personpicker')" :state="modalState('personpicker')"></personpicker>
        </div>

    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'
import State from '@/assets/js/State'
import hasModals from '@/assets/js/traits/hasModals'

export default new Modal()
    .use( hasModals({ 'datepicker': 'datepicker', 'personpicker': 'personpicker' }) )
    .props({
        value: Object
    })
    .data(() => ({
        states: State.states
    }))
    .methods({
        async stateClick(state, $event) {
            // Just do if state has changed
            if(state.state != this.value.state) {

                if(state.state == State.waiting) {
                    await this.showModal('personpicker')
                } else if(state.state == State.do) {
                    this.value.resetDeadline()
                } else {
                    await this.showModal('datepicker', $event)
                }
                if(state.state != State.waiting) {
                    this.value.waiting_for = null
                }
                this.value.state = state.state
                this.$emit('change')

            }
            setTimeout(() => this.$emit('hide'), 150)
        },
        isActive(state) {
            return this.value.state == state.state
        }
    })
    .vue()
</script>