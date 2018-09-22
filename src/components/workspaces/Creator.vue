<template>
    <transition name="modal">
        <div v-show="show">
            <div class="h-full w-full bg-black opacity-50 absolute pin dimmer" @click="$emit('hide')"></div>
            <div class="bg-white rounded-t-xl absolute pin-b pin-x content">
                <div class="text-sm font-bold text-blue mx-8 mt-4 mb-8 text-center">Create workspace</div>
                <div class="mx-8">
                    <inputt placeholder="Name your workspace" type="text" v-model="workspace.name"></inputt>
                </div>
                <div class="flex flex-row justify-between items-center p-4 text-sm font-light text-grey-darker">
                    <div class="p-4 cursor-pointer flex flex-row items-center" @click="$emit('hide')"><i class="mi mi-Cancel ml-2"></i> Close</div>
                    <div class="p-4 cursor-pointer flex flex-row items-center" @click="createWorkspaceClick">Create <i class="mi mi-CheckMark ml-2"></i></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'
import loading from '@/assets/js/traits/loading'

export default new Page('WorkspaceCreator')
    .with('inputt')
    .use(loading)
    .props('show')
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