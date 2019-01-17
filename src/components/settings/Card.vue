<template>
    <div class="mx-auto container shadow-md md:rounded-lg bg-white p-8 overflow-hidden">
        <!-- <div v-if="title" class="font-bold text-blue pb-8 mb-8 -mx-8 px-8 -mt-8 pt-8 border-b-2 border-blue-lightest">{{ title }}</div> -->
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