<template>
    <div>
        <div class="flex flex-row justify-between items-center text-grey-dark px-4 mb-4 py-3 font-bold tracking-wide text-xs uppercase">
            <span @click.stop="showModal('order-modal', $event)" class="flex flex-row items-center">
                <i class="feather icon-bar-chart-2 cursor-pointer mr-2 text-base"></i>
                Order By
            </span>
            <span @click.stop="showModal('filter-modal', $event)" class="flex flex-row items-center">
                Filter
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

export default new Page()
  .with('search/Bar')
  .use( hasModals({ 'filter-modal': 'filter/Modal', 'order-modal': 'order/Modal' }) )
  .props({
      filters: Array,
      orderBy: Object,
  })
  .vue();
</script>
