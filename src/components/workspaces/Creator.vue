<template>
    <modal :state="state" @hide="hide" @after-enter="afterEnter">
        <headline>
            {{ this.edit ? 'Edit' : 'Create' }} workspace
        </headline>

        <div class="mx-8 flex flex-row items-center">
            <div @click="showModal('colorpicker', $event)" class="h-8 w-8 rounded-full mr-4" :class="'bg-' + workspace.getColor() + ''"></div>
            <inputt placeholder="Choose a name" ref="inputt" type="text" v-model="workspace.name"></inputt>
        </div>

        <actions>
            <cancel @click="hide"></cancel>
            <action @click="createWorkspaceClick"> {{ this.edit ? 'Save' : 'Create' }} <i class="feather icon-check ml-2"></i> </action>
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
    .props({
        edit: {
            type: Boolean,
            default: false,
        }
    })
    .use( hasModals({ colorpicker: 'colorpicker' }) )
    .data(() => ({
        workspace: null
    }))
    .methods({
        async createWorkspaceClick() {
            const created = await this.workspace.save()
            this.workspace = new this.$FeathersVuex.Workspace()
            if(this.edit) {
                this.$emit('updated', created)
            } else {
                this.$emit('created', created)
            }

            this.hide()

            if(this.edit) {
                this.$store.dispatch('events/success', { message: 'Workspace saved.' })
            } else {
                this.$store.dispatch('events/success', { message: 'Workspace created.' })
            }
        },
        afterEnter() {
            this.$refs.inputt.focus()
        }
    })
    .watch('state.data', function() {
        if(this.edit) {
            this.workspace = this.state.data.clone()
        }
    })
    .created(vue => {
        vue.workspace = new vue.$FeathersVuex.Workspace()
    })
    .vue()
</script>