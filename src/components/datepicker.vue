<template>
    <modal :state="state" @hide="hide" positioned>

        <headline>At which day?</headline>

        <div class="mx-8">
            <div v-for="option of options" :key="option.name" class="item" @click="optionClick(option)">
                <i class="mr-4" :class="option.icon"></i>
                {{ option.name }} ({{ option.moment().format('dddd') }})
            </div>
            <div class="mt-4 item" @click="showModal('datepicker')">
                <i class="mr-4 feather icon-calendar"></i>
                {{ pickdateText }}
                <i v-if="value" @click.stop="deleteDate" class="feather icon-x ml-4 -mr-4"></i>
            </div>
            
        </div>

        <actions>
            <!-- <cancel @click="hide"/> -->
            <!-- <action></action> -->
        </actions>

        <div slot="submodals">
            <datepicker :value="value" @input="pickDate" @hide="hideModal('datepicker'); timeout(() => $emit('hide'), 150)" :state="modalState('datepicker')"></datepicker>
        </div>

    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'
import hasModals from '@/assets/js/traits/hasModals'

export default new Modal()
    .use( hasModals({datepicker: 'DatepickerWrapper'}) )
    .props({
        value: Date,
        default: null
    })
    .methods({
        optionClick(option) {
            this.$emit('input', option.moment().toDate())
            this.$emit('hide')
        },
        pickDate($event) {
            this.$emit('input', $event)
        },
        deleteDate() {
            this.$emit('input', null)
            this.$emit('hide')
        }
    })
    .computed({
        pickdateText() {
            if(!this.value) {
                return 'Choose a date'
            } 
            
            return moment(this.value).format('D. MMMM YYYY')
        }
    })
    .data(() => ({
        options: [
            {
                name: 'Tomorrow',
                icon: 'feather icon-chevron-right',
                moment() {
                    return moment().add(1, 'days')
                }
            },
            {
                name: 'Next Week',
                icon: 'feather icon-chevrons-right',
                moment() {
                    return moment().add(1, 'week').startOf('week')
                }
            },
        ]
    }))
    .vue()
</script>

<style scoped>
.item {
    @apply text-lg text-grey-darker font-light rounded-lg px-4 pl-2 py-2 flex flex-row items-center justify-start cursor-pointer;
}
</style>
