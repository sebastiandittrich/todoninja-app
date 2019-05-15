<template>
    <div class="flex flex-row lg:flex-col justify-around lg:justify-start items-center lg:items-start">
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
import SectionsItem from '@c/sections/Item'

export default {
    components: { SectionsItem }
}
</script>
