<template>
    <div class="text-sm font-bold mx-8 mt-4 mb-8 text-center" :class="'text-' + color">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'blue'
        }
    }
}
</script>