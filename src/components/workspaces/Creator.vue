<template>
    <modal :state="state" @hide="hide" @after-enter="afterEnter">
        <headline>
            Create workspace
        </headline>

        <div class="mx-8">
            <inputt placeholder="Name your workspace" ref="inputt" type="text" v-model="workspace.name"></inputt>
        </div>

        <actions>
            <cancel @click="hide"></cancel>
            <action @click="createWorkspaceClick"> Create <i class="feather icon-check ml-2"></i> </action>
        </actions>
    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'
import loading from '@/assets/js/traits/loading'

export default new Modal()
    .with('inputt')
    .use(loading)
    .data(() => ({
        workspace: {
            name: ''
        }
    }))
    .methods({
        async createWorkspaceClick() {
            const created = await this.$store.dispatch('workspaces/create', this.workspace)
            this.workspace.name = ''
            this.$emit('created', created)
            this.$emit('hide')
        },
        afterEnter() {
            this.$refs.inputt.focus()
        }
    })
    .vue()
</script>