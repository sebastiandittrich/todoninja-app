<template>
    <step @left-click="previous" @right-click="next">

        <i class="feather icon-clock text-5xl text-blue"></i>

        <headline class="mt-16">
            Waiting for someone?
        </headline>

        <description class="mt-8">
            When you are waiting for someone else in order to get a task done, set its state to <span class="font-bold">Waiting</span>.
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
