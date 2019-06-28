<template>
    <div @click="$emit('click', $event)">
        <div class="text-2xl text-white p-3 rounded-full bg-blue dark:bg-blue-light shadow-lg m-8 cursor-pointer select-none leading-none pointer-events-auto">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
