<template>
    <modal :state="state" @hide="hide" positioned>

        <headline>Choose state</headline>

        <div class="mx-8">
            <div class="text-lg flex flex-col items-stretch">
                <div v-for="state of states" :key="state.state" @click="stateClick(state)" :class="isActive(state) ? 'text-blue font-black' : 'font-light text-grey-darker'" class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer">
                    <i class="mr-4" :class="{[state.icon]: true, 'text-grey-dark': !isActive(state)}"></i>
                    {{ state.name }}
                </div>
            </div>
        </div>

        <actions>
            <cancel @click="hide"/>
        </actions>

    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'
import State from '@/assets/js/State'

export default new Modal()
    .props({
        value: Number
    })
    .data(() => ({
        states: State.states
    }))
    .methods({
        stateClick(state) {
            this.$emit('input', state.state)
            this.$emit('hide')
        },
        isActive(state) {
            return this.value == state.state
        }
    })
    .vue()
</script>