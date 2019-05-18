<template>
    <step @left-click="previous" @right-click="next">

        <i class="feather icon-chevrons-right text-5xl text-blue"></i>

        <headline class="mt-16">
            Postponed Tasks
        </headline>

        <description class="mt-8">
            Set the state to <span class="font-bold">Postponed</span> if you can only do this task from later on.
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
