<template>
    <div class="px-4 py-2 font-bold uppercase text-grey-dark cursor-pointer select-none select-none" :class="primary ? 'text-blue dark:text-blue-light tracking-wide' : ''" @click="$emit('click', $event)">
        <slot></slot>
    </div>
</template> 

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .props({
        primary: {
            type: Boolean,
            default: false,
        }
    })
    .vue()
</script>