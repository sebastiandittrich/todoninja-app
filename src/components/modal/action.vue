<template>
    <div class="p-4 cursor-pointer flex flex-row items-center" @click="$emit('click', $event)">
        <slot></slot>
    </div>
</template> 

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .vue()
</script>