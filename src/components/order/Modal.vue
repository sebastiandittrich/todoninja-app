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
import isModal from '@/mixins/isModal'

import OrderPicker from '@c/order/Picker'

export default {
    components: { OrderPicker },
    mixins: [ isModal ],
    props: {
        orderBy: Object
    }
}
</script>

<style>

</style>
