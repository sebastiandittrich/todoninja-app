<template>
    <div>
        <div class="flex flex-row justify-between items-center text-grey-dark px-4 mb-4 py-3 border rounded-lg">
            <search-bar :filters="filters" class="mr-4"></search-bar>
            <i class="feather icon-filter cursor-pointer" @click.stop="showModal('filter-modal', $event)"></i>
        </div>
        <filter-modal @hide="hideModal('filter-modal')" :state="modalState('filter-modal')" :filters="filters" ></filter-modal>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'

export default new Page()
  .with('search/Bar')
  .use( hasModals({ 'filter-modal': 'filter/Modal' }) )
  .props({
      filters: Array
  })
  .vue();
</script>
