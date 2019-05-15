<template>
    <div>
        <div class="flex flex-row justify-between items-center text-grey-dark px-4 mb-4 py-3 font-bold tracking-wide text-xs uppercase">
            <span @click.stop="showModal('order-modal', $event)" class="flex flex-row items-center" :class="orderBy.properties.length > 0 ? 'text-blue dark:text-blue-light' : ''">
                <i class="feather icon-bar-chart-2 cursor-pointer mr-2 text-base transition"></i>
                <!-- Order By -->
                <transition name="opacity">
                    <span v-if="orderBy.properties.length > 0">
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
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'
import OrderBy from '@/assets/js/OrderBy'

export default new Page()
  .use( hasModals({ 'filter-modal': 'filter/Modal', 'order-modal': 'order/Modal' }) )
  .props({
      filters: Array,
      orderBy: Object,
  })
  .data(() => ({
      detailedOrderBy: OrderBy
  }))
  .vue();
</script>
