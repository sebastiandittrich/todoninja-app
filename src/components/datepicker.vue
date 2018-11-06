<template>
    <modal :state="state" @hide="hide" positioned>

        <headline>Choose a date</headline>

        <div class="mx-8">
            <div v-for="option of options" :key="option.name" class="item" @click="optionClick(option)">
                <i class="mr-4" :class="option.icon"></i>
                {{ option.name }}
            </div>
            <div class="stacking mt-4" @click="pickDate">
                <div class="item">
                    <i class="mr-4 feather icon-calendar"></i>
                    Choose a date
                </div>
                <input type="date" ref="dateinput" class="opacity-25">
            </div>
        </div>

        <actions>
            <!-- <cancel @click="hide"/> -->
            <!-- <action></action> -->
        </actions>

    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'

export default new Modal()
    .props({
        value: Date,
        default: null
    })
    .methods({
        optionClick(option) {
            this.$emit('input', option.date())
            this.$emit('hide')
        },
        pickDate() {
            console.log(this.$refs.dateinput)
            $(this.$refs.dateinput).click()
        }
    })
    .data(() => ({
        options: [
            {
                name: 'Today',
                icon: 'feather icon-chevron-down',
                date() {
                    return new Date()
                }
            },
            {
                name: 'Tomorrow',
                icon: 'feather icon-chevrons-right',
                date() {
                    return moment().add(1, 'days').toDate()
                }
            }
        ]
    }))
    .vue()
</script>

<style scoped>
.item {
    @apply text-lg text-grey-darker font-light rounded-lg px-4 pl-2 py-2 flex flex-row items-center justify-start cursor-pointer;
}
</style>
