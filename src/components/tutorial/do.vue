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
import Step from '@/components/tutorial/Step'

export default new Step()

    .vue()
</script>

<style>

</style>
