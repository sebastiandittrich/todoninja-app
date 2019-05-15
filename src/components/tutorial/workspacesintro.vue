<template>
    <step @left-click="previous" @right-click="next">

        <illustration src="/img/tutorial/workspaces.svg"></illustration>

        <headline class="mt-16">
            Your Workspaces
        </headline>

        <description class="mt-8">
            Todoninja is an app without lists. All your tasks are organized in <span class="font-bold">workspaces</span>. <br><br> If you want to, you can now create your first Workspaces!
        </description>

        <transition-group tag="div" :class="{'mt-16': added.length > 0, 'mt-8': added.length < 1}" name="opacity">
            <div v-for="workspace of added" :key="workspace.id" class="font-bold mt-2">
                <i class="feather icon-check text-green mr-2"></i>
                {{ workspace.name }}
            </div>
        </transition-group>

        <div class="text-blue font-bold mt-8 cursor-pointer select-none" @click="showModal('workspaces-creator')">
            <i class="feather icon-plus"></i>
            Create a Workspace
        </div>

        <description class="mt-16">
            <span class="font-bold">Suggestion:</span> Use things like "Home" or "Work" to be more productive!
        </description>

        <div slot="rightaction">{{ added.length > 0 ? 'Done' : 'Skip' }}</div>

        <!-- <div class="mt-16 mt-8">
            <div class="font-bold">
                Suggestions
            </div>
            <div class="mt-4 text-grey-dark">
                <div class="font-bold">
                    <i class="feather icon-plus"></i>
                    Home
                </div>
                <div class="font-bold mt-4">
                    <i class="feather icon-plus"></i>
                    Work
                </div>
            </div>
        </div> -->
        <workspaces-creator :state="modalState('workspaces-creator')"  @hide="hideModal('workspaces-creator')"></workspaces-creator>
    </step>
</template>

<script>
import Step from '@/components/tutorial/Step'
import hasModals from '@/assets/js/traits/hasModals'

export default new Step()
    .use( hasModals({ 'workspaces-creator': 'workspaces/Creator' }) )
    .getters({
        added: 'workspaces/list'
    })
    .vue()
</script>

<style>

</style>
