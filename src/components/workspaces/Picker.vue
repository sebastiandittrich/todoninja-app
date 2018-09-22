<template>
    <div>
        <transition name="modal">
            <div v-show="show && !show_submodal">
                <div class="h-full w-full bg-black opacity-50 absolute pin dimmer" @click="$emit('hide')"></div>
                <div class="bg-white rounded-t-xl absolute pin-b pin-x content">
                    <div class="text-sm font-bold text-blue mx-8 mt-4 mb-8 text-center">Workspaces</div>
                    <div class="text-lg flex flex-col items-stretch px-4">
                        <div v-for="workspace of workspaces" @click="workspaceClick(workspace.id)" class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer" :class="value == workspace.id ? 'text-blue font-black' : 'font-light'">
                            <i class="mi mi-Accept mr-4" :class="value == workspace.id ? '' : 'opacity-0'"></i>
                            {{ workspace.name }}
                            <i v-if="value == workspace.id" class="mi mi-Cancel float-right ml-auto text-sm text-grey" @click.stop="workspaceClick(null)"></i>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between items-center p-4 text-sm font-light text-grey-darker">
                        <div class="p-4 cursor-pointer flex flex-row items-center" @click="createWorkspaceClick"><i class="mi mi-Add mr-2"></i> Create</div>
                        <div class="p-4 cursor-pointer flex flex-row items-center" @click="$emit('hide')">Close <i class="mi mi-Cancel ml-2"></i></div>
                    </div>
                </div>
            </div>
        </transition>
        <workspaces-creator :show="show_submodal" @created="workspaceClick($event.id)" @hide="show_submodal = false"></workspaces-creator>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('workspaces/Creator')
    .props('show', 'value')
    .data(() => ({
        show_submodal: false,
    }))
    .getters({
        workspaces: 'workspaces/list'
    })
    .methods({
        workspaceClick(id) {
            this.$emit('input', id)
            this.$emit('hide')
        },
        createWorkspaceClick() {
            this.show_submodal = true
        }
    })
    .vue()
</script>