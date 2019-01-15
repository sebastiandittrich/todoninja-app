<template>
    <modal :state="state" @hide="hide">

            <headline>Filter</headline>

            <div class="mx-4">
                <filter-picker></filter-picker>
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
    .vue()
</script>

<style>

</style>
