<template>
    <div class="flex flex-col items-stretch justify-start">
        <div class="mx-6 cursor-pointer select-none mb-8 text-orange font-bold" @click="$router.push('/donate')">
            <i class="feather icon-dollar-sign mr-4"></i>
            Donate
        </div>
        <div class="mx-6 cursor-pointer select-none mb-8" @click="$router.push('/summary')">
            <i class="feather icon-pie-chart mr-4"></i>
            Summary
        </div>
        <div class="mx-6 cursor-pointer select-none" @click="$router.push('/settings')">
            <i class="feather icon-settings mr-4"></i>
            Settings
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
