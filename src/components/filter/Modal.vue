<template>
    <modal :state="state" @hide="hide" positioned>

            <headline>Filter</headline>

            <div class="mx-4">
                <filter-picker :filters="filters"></filter-picker>
            </div>

            <actions>
                <!-- <cancel @click="hide"/> -->
            </actions>

    </modal>
</template>

<script>
import isModal from '@/mixins/isModal'

import FilterPicker from '@c/filter/Picker'

export default {
    components: { FilterPicker },
    mixins: [ isModal ],
    props: {
        filters: Array
    },
}
</script>

<style>

</style>
