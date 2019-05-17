<template>
    <div class="mx-auto container shadow-md dark:shadow-xl md:rounded-lg bg-white dark:bg-black p-8 overflow-hidden">
        <div v-if="title" class="font-bold pb-8">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .props({
        title: {
            type: String,
            default: ''
        }
    })
    .vue()

</script>