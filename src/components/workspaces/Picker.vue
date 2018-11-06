<template>
    <modal :state="state" @hide="hide" positioned>
        <headline>
            Workspaces
        </headline>

        <div class="text-lg flex flex-col items-stretch px-4">
            <div v-for="workspace of workspaces" :key="workspace.id" @click="workspaceClick(workspace.id)" class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer" :class="value == workspace.id ? 'text-blue font-black' : 'font-light'">
                <i class="feather icon-check mr-4" :class="value == workspace.id ? '' : 'opacity-0'"></i>
                {{ workspace.name }}
                <i v-if="value == workspace.id" class="feather icon-x float-right ml-auto text-sm text-grey" @click.stop="workspaceClick(null)"></i>
                <i v-if="manage" @click="showModal('confirmator', { data: workspace.id })" class="feather icon-trash float-right ml-auto text-sm text-grey"></i>
            </div>
        </div>

        <actions>
            <action @click="showModal('creator', $event)"> <i class="feather icon-plus mr-2"></i> Create </action>
            <cancel @click="hide"/>
        </actions>

        <div slot="submodals">
            <creator :state="modalState('creator')" @created="workspaceClick($event.id)" @hide="hideModal('creator')"></creator>
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
    .use( hasModals({ 'creator': 'workspaces/Creator', 'confirmator': 'confirmator' }) )
    .props({
        value: Number,
        manage: {
            type: Boolean,
            default: false
        }
    })
    .getters({
        workspaces: 'workspaces/list'
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
            return await this.$store.dispatch('workspaces/remove', id)
        }
    })
    .vue()
</script>