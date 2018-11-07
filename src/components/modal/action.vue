<template>
    <div :class="primary ? 'button button-small mt-0' : 'p-4 cursor-pointer flex flex-row items-center'" @click="$emit('click', $event)">
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