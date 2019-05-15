<template>
    <step @left-click="previous" @right-click="done">

        <illustration src="/img/tutorial/ready.svg"></illustration>

        <headline class="mt-16">
            Congratiulations!
        </headline>

        <description class="mt-8">
            You are now prepared for using Todoninja! <br><br>

            Add your first task by clicking the plus icon in the bottom right corner on the next screen.
        </description>

        <div slot="rightaction"><i class="feather icon-check"></i> Done</div>

    </step>
</template>

<script>
import Step from '@/components/tutorial/Step'

export default new Step()

    .vue()
</script>

<style>

</style>
