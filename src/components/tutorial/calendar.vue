<template>
    <step @left-click="previous" @right-click="next">

        <i class="feather icon-calendar text-5xl text-blue"></i>

        <headline class="mt-16">
            The Calendar State
        </headline>

        <description class="mt-8">
            You can use the <span class="font-bold">Calendar</span> state if you have planned this task for a specific date.<br>
        </description>

    </step>
</template>

<script>
import isStep from '@/mixins/isStep'

export default {
    mixins: [ isStep ]
}

export default new Step()

    .vue()
</script>

<style>

</style>
