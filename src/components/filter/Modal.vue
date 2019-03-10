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
import Modal from '@/assets/js/Modal'

export default new Modal()
    .with('filter/Picker')
    .props({
        filters: Array
    })
    .vue()
</script>

<style>

</style>
