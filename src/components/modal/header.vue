<template>
    <div class="text-sm font-bold mx-8 mt-4 mb-8 text-center text-blue dark:text-blue-light">
        <slot></slot>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .vue()
</script>