<template>
    <div class="fixed pin-b bg-white w-full flex flex-row justify-around items-center" style="filter: drop-shadow(0px 0px 5px rgba(0,0,0,.3))">
        <navigation-item>
            <i class="mi mi-Home text-blue text-xl"></i>
        </navigation-item>
        <navigation-item>
            <i class="mi mi-Filter text-blue text-xl"></i>
        </navigation-item>
        <navigation-item>
            <i class="mi mi-Search text-blue text-xl"></i>
        </navigation-item>
        <navigation-item link="/tasks/create">
            <i class="mi mi-Add text-white bg-blue p-2 text-md rounded-full"></i>
        </navigation-item>
        <navigation-item>
            <i class="mi mi-GlobalNavButton text-blue text-xl"></i>
        </navigation-item>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page('NavigationBar')
    .with('navigation/Item')
    .vue()
</script>
