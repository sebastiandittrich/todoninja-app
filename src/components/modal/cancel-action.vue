<template>
    <action @click="$emit('click', $event)">
        Cancel
    </action>
</template>

<script>
import Action from '@c/modal/action'

export default {
    components: { Action }
}
</script>