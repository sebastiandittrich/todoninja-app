<template>
    <transition name="slide-right">
        <div>
            <div @click="save" class="rounded-full bg-green-lighter text-green-darker p-2 px-4 flex flex-row items-center justify-center text-base uppercase tracking-wide fixed pin-b pin-r m-8">
                <i class="mi mi-CheckMark text-2xl mr-2"></i>
                Save
            </div>
            <div class="bg-grey-light p-6">
                <div class="flex flex-row items-center justify-between mb-6 text-2xl">
                    <i @click="$router.go(-1)" class="mi mi-ChevronLeft"></i>
                    <div class="flex flex-row items-center text-sm text-grey-darker cursor-pointer" @click="show_workspace_picker = true">
                        <i class="mi mi-Home mr-2 text-base"></i>
                        <span class="font-bold">{{ selectedWorkspaceName }}</span>
                        <i class="mi mi-ChevronDown ml-2 text-base"></i>
                    </div>
                    <i class="mi mi-GlobalNavButton"></i>
                </div>
                <div class="flex flex-row items-center">
                    <i class="mi mi-CircleRing text-2xl mr-6"></i>
                    <inputt iclass="font-bold text-2xl" v-model="task.title" placeholder="My new task" type="text" ></inputt>
                </div>
            </div>
            <div class="m-6">
                <state-presenter v-model="task" class="mb-6"/>
                <div class="font-bold text-sm mb-2">Description</div>
                <textarea class="w-full font-light text-lg" rows="2" placeholder="Describe your task!"></textarea>

                <div class="font-bold text-sm mb-2 mt-6">
                    Tags
                </div>
                <tags-picker class="-mx-6 px-6 overflow-x-auto" v-model="task.tags"></tags-picker>
            </div>
            <workspaces-picker @hide="show_workspace_picker = false" :show="show_workspace_picker" v-model="task.workspaceId"></workspaces-picker>
        </div>
    </transition>
</template> 

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('inputt', 'workspaces/Picker', 'tags/Picker', 'state/Presenter')
    .getters({
        getWorkspace: 'workspaces/get'
    })
    .data(() => {
        return {
            show_workspace_picker: false,
            show_tags_picker: false,
            task: {
                state: 'do',
                title: '',
                description: '',
                today: false,
                workspaceId: null,
                tags : []
            }
        }
    })
    .methods({
        save() {
            this.$store.dispatch('tasks/create', this.task)
        }
    })
    .computed({
        selectedWorkspaceName() {
            return this.task.workspaceId ? this.getWorkspace(this.task.workspaceId).name : 'No workspace'
        }
    })
    .vue()
</script>