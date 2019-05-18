<template>
    <step @left-click="done" @right-click="next">

        <illustration src="/img/onboarding.svg"></illustration>

        <headline class="mt-16">
            Ready for a quick tutorial?
        </headline>

        <description class="mt-8">
            You will learn how Todoninja works and even create your first tasks and workspaces.
        </description>

        <div slot="leftaction">No, thanks</div>
        <div slot="rightaction">Let's Go! <i class="feather icon-chevron-right"></i></div>

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
