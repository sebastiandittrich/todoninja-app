<template>
    <div class="mx-auto container shadow-md md:rounded-lg bg-white p-8 overflow-hidden">
        <div v-if="title" class="font-bold pb-8">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>