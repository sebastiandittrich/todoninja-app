<template>
    <modal :state="state" @hide="hide" positioned>
        <headline>
            Workspaces
        </headline>

        <transition-group name="list" class="text-lg flex flex-col items-stretch px-4 text-black">
            <div v-for="workspace of workspaces" :key="workspace.id" @click="workspaceClick(workspace.id)" class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer select-none" :class="value == workspace.id ? `text-${workspace.readableColor()} font-black` : 'font-light'">
                <i class="feather rounded-full text-xs icon-check mr-4" :class="{ [`bg-${workspace.readableColor()} text-white p-1`]: value == workspace.id, [`opacity-50 text-transparent p-0 border-4 border-white bg-${workspace.readableColor()}`]: value != workspace.id}"></i>
                {{ workspace.name }}
                <i v-if="value == workspace.id" class="feather icon-x float-right ml-auto text-sm text-grey cursor-pointer select-none" @click.stop="workspaceClick(null)"></i>
                <div v-if="manage" class="float-right ml-auto text-sm text-grey">
                    <i @click="showModal('editor', { data: workspace })" class="feather icon-edit cursor-pointer select-none mr-4"></i>
                    <i @click="showModal('confirmator', { data: workspace.id })" class="feather icon-trash cursor-pointer select-none"></i>
                </div>
            </div>
        </transition-group>

        <actions>
            <action @click="showModal('creator', $event)"> <i class="feather icon-plus mr-2"></i> Create </action>
            <cancel @click="hide"/>
        </actions>

        <div slot="submodals">
            <creator :state="modalState('creator')" @created="workspaceClick($event.id)" @hide="hideModal('creator')"></creator>
            <creator edit :state="modalState('editor')" @hide="hideModal('editor')"></creator>
            <confirmator @confirm="deleteWorkspace" @hide="hideModal('confirmator')" :state="modalState('confirmator')" title="Delete workspace">
                Are you sure you want to delete this workspace?

                <div slot="confirm" class="button-red">Delete</div>
            </confirmator>
        </div>
    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'
import hasModals from '@/assets/js/traits/hasModals'

export default new Modal()
    .use( hasModals({ 'creator': 'workspaces/Creator', 'confirmator': 'confirmator' }, [ 'editor' ]) )
    .props({
        value: Number,
        manage: {
            type: Boolean,
            default: false
        }
    })
    .getters({
        standard_workspaces: 'workspaces/withStandard',
        manage_workspaces: 'workspaces/list'
    })
    .computed({
        workspaces() {
            if(this.manage) {
                return this.manage_workspaces
            } else {
                return this.standard_workspaces
            }
        }
    })
    .methods({
        workspaceClick(id) {
            if(this.manage) {
                return true
            }

            this.$emit('input', id)
            this.$emit('hide')
        },
        async deleteWorkspace(id) {
            const ret = await this.$store.dispatch('workspaces/remove', id)
            this.$store.dispatch('events/success', { message: 'Workspace deleted.', color: 'orange' })
        }
    })
    .vue()
</script>