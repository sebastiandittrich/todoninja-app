<template>
    <modal :state="state" @hide="hide" positioned>

            <headline>Order by</headline>

            <div class="mx-4">
                <order-picker :orderBy="orderBy"></order-picker>
            </div>

            <actions>
                <!-- <cancel @click="hide"/> -->
            </actions>

    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'

export default new Modal()
    .with('order/Picker')
    .props({
        orderBy: Object
    })
    .vue()
</script>

<style>

</style>
