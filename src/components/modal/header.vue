<template>
    <div class="text-sm font-bold mx-8 mt-4 mb-8 text-center" :class="'text-' + color">
        <slot></slot>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .props({
        color: {
            type: String,
            default: 'blue'
        }
    })
    .vue()
</script>