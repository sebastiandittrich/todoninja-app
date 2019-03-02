<template>
    <modal :state="state" @hide="hide" @after-enter="afterEnter">
        <headline>
            Create workspace
        </headline>

        <div class="mx-8 flex flex-row items-center">
            <div @click="showModal('colorpicker', $event)" class="h-8 w-8 rounded-full mr-4" :class="'bg-' + workspace.color"></div>
            <inputt placeholder="Choose a name" ref="inputt" type="text" v-model="workspace.name"></inputt>
        </div>

        <actions>
            <cancel @click="hide"></cancel>
            <action @click="createWorkspaceClick"> Create <i class="feather icon-check ml-2"></i> </action>
        </actions>

        <div slot="submodals">
            <colorpicker v-model="workspace.color" :state="modalState('colorpicker')" @hide="hideModal('colorpicker')"></colorpicker>
        </div>
    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'
import hasModals from '@/assets/js/traits/hasModals'

export default new Modal()
    .with('inputt')
    .use( hasModals({ colorpicker: 'colorpicker' }) )
    .data(() => ({
        workspace: null
    }))
    .methods({
        async createWorkspaceClick() {
            const created = await this.$store.dispatch('workspaces/create', this.workspace)
            this.workspace = new this.$FeathersVuex.Workspace()
            this.$emit('created', created)
            this.$emit('hide')
            this.$store.dispatch('events/success', { message: 'Workspace created.' })
        },
        afterEnter() {
            this.$refs.inputt.focus()
        }
    })
    .created(vue => vue.workspace = new vue.$FeathersVuex.Workspace())
    .vue()
</script>