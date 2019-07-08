<template>
    <div>
        <div class="flex flex-row justify-between items-center text-grey-dark px-4 mb-4 py-3 font-bold tracking-wide text-xs uppercase">
            <span @click.stop="showModal('order-modal', $event)" class="flex flex-row items-center" :class="orderBy.properties.length > 0 ? 'text-blue dark:text-blue-light' : ''">
                <i class="feather icon-bar-chart-2 cursor-pointer mr-2 text-base transition"></i>
                <!-- Order By -->
                <transition name="opacity">
                    <span v-if="orderBy.properties.length > 0" class="cursor-pointer select-none">
                        {{ detailedOrderBy.filter(order => order.name == orderBy.properties[0])[0].written_name }}
                    </span>
                </transition>
            </span>
            <span @click.stop="showModal('filter-modal', $event)" class="flex flex-row items-center">
                <!-- Filter -->
                <i class="feather icon-filter cursor-pointer ml-2 text-base"></i>
            </span>
        </div>
        <filter-modal @hide="hideModal('filter-modal')" :state="modalState('filter-modal')" :filters="filters" ></filter-modal>
        <order-modal @hide="hideModal('order-modal')" :state="modalState('order-modal')" :orderBy="orderBy" ></order-modal>
    </div>
</template>

<script>
import hasModals from '@/mixins/hasModals'
import OrderBy from '@/assets/js/OrderBy'

import FilterModal from '@c/filter/Modal'
import OrderModal from '@c/order/Modal'

export default {
    mixins: [
        hasModals({ FilterModal, OrderModal })
    ],
    props: {
        filters: Array,
        orderBy: Object,
    },
    data: () => ({
        detailedOrderBy: OrderBy
    })
}
</script>
