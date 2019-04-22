<template>
    <step @left-click="previous" @right-click="next">

        <img src="/img/tutorial/inbox.png" class="w-full">

        <headline class="mt-16">
            The Inbox view
        </headline>

        <description class="mt-8">
            This is your Inbox view. Here you can collect all the stuff you would like to do <span class="font-bold">eventually</span>.<br><br>
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
