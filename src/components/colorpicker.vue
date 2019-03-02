<template>
    <modal :state="state" @hide="hide">
        <headline>
            Choose a color
        </headline>

        <div class="mx-8 flex flex-row items-center justify-center flex-wrap">
            <div v-for="color of colors" :key="color.id" @click="select(color)" :class="'bg-' + color.value" class="rounded-full mr-4 mb-4 h-8 w-8">

            </div>
        </div>

        <actions>
        </actions>
    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'
import colors from '@/assets/js/Colors'

export default new Modal()
    .props({
        value: String
    })
    .data(() => ({
        colors,
    }))
    .methods({
        select({ value }) {
            this.$emit('input', value)
            this.hide()
        }
    })
    .vue()
</script>