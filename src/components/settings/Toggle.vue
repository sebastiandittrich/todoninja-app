<template>
    <div class="flex flex-row items-center justify-between">
        <div class="-mx-8 px-8 py-3">
            <div class="">{{ title }}</div>
            <div class="text-grey-dark text-sm">
                <slot></slot>
            </div>
        </div>
        <switchbox @click="$emit('click', $event)" :value="value" :disabled="disabled"></switchbox>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .props({
        value: Boolean,
        disabled: {
            type: Boolean,
            default: false
        }
    })
    .vue()
</script>

<style>

</style>
