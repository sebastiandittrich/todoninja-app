<template>
    <progress-circle :total="{ name: 'Today', value: this.total.length || 1 }" :data="[ { name: 'Done', value: this.done.length } ]" :completed="progress >= 1" :radius="50" :stroke="8"></progress-circle>
</template>

<script>
import Progress from './Progress'
import ProgressCircle from '@c/progress/Circle'

export default {
    extends: Progress,
    components: { ProgressCircle }
}
</script>

<style>

</style>
