<template>
    <action @click="$emit('click', $event)">
        Cancel
    </action>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('action:modal/action')
    .vue()
</script>