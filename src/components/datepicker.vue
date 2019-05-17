<template>
    <modal :state="state" @hide="hide" positioned>

        <headline>At which day?</headline>

        <div class="mx-8">
            <div v-for="option of options" :key="option.name" class="item cursor-pointer select-none" @click="optionClick(option)">
                <i class="mr-4" :class="option.icon"></i>
                {{ option.name }} ({{ type == 'datetime' ? option.moment().format('dddd [at] H:mm A') : option.moment().format('dddd') }})
            </div>
            <div class="mt-4 item cursor-pointer select-none" @click="$refs.datetime.open($event)">
                <i class="mr-4 feather icon-calendar"></i>
                {{ pickdateText }}
                <i v-if="value" @click.stop="deleteDate" class="feather icon-x ml-4 -mr-4 cursor-pointer select-none"></i>
            </div>
            
        </div>

        <actions>
            <!-- <cancel @click="hide"/> -->
            <!-- <action></action> -->
        </actions>

        <div slot="submodals">
            <datetime :type="type" input-class="hidden" auto ref="datetime" :value="value" @input="pickDate" @close="timeout(() => $emit('hide'), 150)"></datetime>
        </div>

    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'
import hasModals from '@/assets/js/traits/hasModals'
import {Datetime} from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Datetime.name = 'datetime'

export default new Modal()
    .with(Datetime)
    .props({
        value: String,
        type: {
            type: String,
            default: 'date'
        }
    })
    .methods({
        optionClick(option) {
            this.$emit('input', option.moment().format())
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
                    return moment().add(1, 'days').startOf('day').add(9, 'hours')
                }
            },
            {
                name: 'Next Week',
                icon: 'feather icon-chevrons-right',
                moment() {
                    return moment().add(1, 'week').startOf('week').add(9, 'hours')
                }
            },
        ]
    }))
    .vue()
</script>

<style scoped>
.item {
    @apply text-lg text-grey-darker font-light rounded-lg px-4 pl-2 py-2 flex flex-row items-center justify-start cursor-pointer select-none;
}

#app.dark .item {
    @apply text-grey-lighter
}
</style>
