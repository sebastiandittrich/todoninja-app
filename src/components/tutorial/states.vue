<template>
    <step @left-click="previous" @right-click="next">

        <img class="h-48 rounded-lg shadow-md" src="/img/tutorial/states.png" >

        <headline class="mt-16">
            The Four States
        </headline>

        <description class="mt-8">
            There are for possible states a task can have.<br><br>

            Let's walk through a quick guide how to use them!
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
