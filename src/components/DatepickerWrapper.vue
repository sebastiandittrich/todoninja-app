<template>
    <modal :state="state" @hide="hide" positioned>

        <headline>Choose a date</headline>

        <div class="mx-8">
            <datepicker :value="value" @input="$emit('input', $event); timeout(() => $emit('hide'), 150)" inline ref="dateinput" input-class="hidden" calendar-class="vue-datepicker mr-auto ml-auto"></datepicker>
        </div>

        <actions>
            <!-- <cancel @click="hide"/> -->
            <!-- <action></action> -->
        </actions>

    </modal>
</template>


<script>
import Modal from '@/assets/js/Modal'
import DatePicker from 'vuejs-datepicker'

DatePicker.name = 'datepicker'

export default new Modal()
    .with(DatePicker)
    .props({
        value: {
            type: Date,
            default: null
        }
    })
    .vue()
</script>
