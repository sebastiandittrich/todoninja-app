<template>
    <div class="p-8 min-h-full" style='display: grid; grid-template: "content" 1fr "actions" auto / 1fr'>
            
        <div class="flex flex-col items-center justify-center text-center">
            <slot></slot>
        </div>

        <div class="flex flex-row justify-between font-bold uppercase pt-16" style="grid-area: actions">
            <slot name="actions">
                <div @click="$emit('left-click')" class="text-grey-dark cursor-pointer select-none"><slot name="leftaction">Back</slot></div>
                <div @click="$emit('right-click')" class="text-blue cursor-pointer select-none"><slot name="rightaction">Next</slot></div>
            </slot>
        </div>

    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .vue()
</script>
