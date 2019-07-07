<template>
    <div class="mx-4 mt-8">
        <div v-if="header" class="text-grey font-bold tracking-wide text-xs uppercase ml-12 mb-2">
            {{ header }}
        </div>
        <div class="flex flex-col items-start justify-start">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        header: { type: String, default: null },
        items: { type: Array, default: () => [] }
    },
}
</script>

<style>

</style>
