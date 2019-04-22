<template>
    <img :src="src" alt="" class="w-4/5 md:w-1/2">
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .props({
        src: String
    })
    .vue()
</script>
