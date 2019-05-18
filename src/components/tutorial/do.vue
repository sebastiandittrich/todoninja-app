<template>
    <step @left-click="previous" @right-click="next">

        <i class="text-5xl text-blue feather icon-zap"></i>

        <headline class="mt-16">
            The Do State
        </headline>

        <description class="mt-8">
            If you could to the task now, its state is <span class="font-bold">Do</span>.
        </description>

    </step>
</template>

<script>
import isStep from '@/mixins/isStep'

export default {
    mixins: [ isStep ]
}
</script>

<style>

</style>
