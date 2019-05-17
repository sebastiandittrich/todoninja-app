<template>
    <div class="px-4 py-2 font-bold uppercase text-grey-dark cursor-pointer select-none select-none" :class="primary ? 'text-blue dark:text-blue-light tracking-wide' : ''" @click="$emit('click', $event)">
        <slot></slot>
    </div>
</template> 

<script>
export default {
    props: {
        primary: {
            type: Boolean,
            default: false,
        }
    }
}
</script>