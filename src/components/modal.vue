<template>
    <transition name="modal">
        <div v-show="show">
            <div class="h-full w-full bg-black opacity-50 absolute pin dimmer cursor-pointer select-none" @click="$emit('hide')"></div>
            <div class="bg-white rounded-t-xl absolute pin-b pin-x content" style="max-width: 90%">
                <div class="text-sm font-bold text-blue mx-8 mt-4 mb-8 text-center"> <slot name="header"></slot> </div>
                <div class="mx-8">
                    <slot></slot>
                </div>
                <div class="flex flex-row justify-between items-center p-4 text-sm font-light text-grey-darker">
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page('WorkspaceCreator')
    .with('inputt')
    .props({
        show: Boolean
    })
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
        }
    })
    .vue()
</script>