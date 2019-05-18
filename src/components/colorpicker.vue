<template>
    <modal :state="state" @hide="hide">
        <headline>
            Choose a color
        </headline>

        <div class="mx-8 flex flex-row items-center justify-center flex-wrap">
            <div v-for="color of colors" :key="color.id" @click="select(color)" :class="'bg-' + color.value + ''" class="rounded-full mr-4 mb-4 h-8 w-8">

            </div>
        </div>

        <actions>
        </actions>
    </modal>
</template>

<script>
import { isModal } from '@/mixins'
import colors from '@/assets/js/Colors'

export default {
    mixins: [ isModal ],
    props: {
        value: String
    },
    data: () => ({
        colors,
    }),
    methods: {
        select({ value }) {
            this.$emit('input', value)
            this.hide()
        }
    }
}
</script>