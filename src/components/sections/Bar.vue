<template>
    <div class="flex flex-row justify-around items-center">
        <sections-item link="do">
            <i slot="icon" class="feather icon-zap mr-2"></i>
            Do
        </sections-item>
        <sections-item link="today">
            <i slot="icon" class="feather icon-sun mr-2"></i>
            Today
        </sections-item>
        <sections-item link="all">
            <i slot="icon" class="feather icon-list mr-2"></i>
            All
        </sections-item>
    </div>
</template>


<script>
import Item from './Item';
import Page from '@/assets/js/Page';

export default new Page('SectionsBar')
  .with('sections/Item')
  .vue();
</script>
