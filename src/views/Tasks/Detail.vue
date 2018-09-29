<template>
    <transition name="slide-right" @after-enter="afterEnter">
        <div class="bg-white">
            <div v-show="isCreate || isEdit" @click="save" class="rounded-full bg-green-lighter text-green-darker p-2 px-4 flex flex-row items-center justify-center text-base uppercase tracking-wide fixed pin-b pin-r m-8">
                <i class="feather icon-check text-2xl mr-2"></i>
                Save
            </div>
            <div class="bg-grey-light p-6">
                <div class="flex flex-row items-center justify-between mb-6 text-2xl">
                    <i @click="$router.go(-1)" class="feather icon-chevron-left"></i>
                    <div class="flex flex-row items-center text-sm text-grey-darker cursor-pointer" @click="showModal('workspaces-picker', $event)">
                        <i class="feather icon-home mr-2 text-base"></i>
                        <span class="font-bold">{{ selectedWorkspaceName }}</span>
                        <i class="feather icon-chevron-down ml-2 text-base"></i>
                    </div>
                    <i class="feather icon-menu"></i>
                </div>
                <div class="flex flex-row items-center">
                    <i class="feather icon-circle text-2xl mr-6"></i>
                    <inputt @press-enter="save" ref="inputt" iclass="font-bold text-2xl" v-model="task.title" placeholder="My new task" type="text"></inputt>
                </div>
            </div>
            <div class="m-6">
                <state-presenter v-model="task" class="z-10 mb-6"/>
                <div class="font-bold text-sm mb-2">Description</div>
                <textarea class="-z-10 w-full font-light text-lg focus:shadow-lg rounded-lg transition focus:p-2" rows="2" placeholder="Describe your task!"></textarea>

                <div class="font-bold text-sm mb-2 mt-6">
                    Tags
                </div>
                <tags-picker class="-mx-6 px-6 overflow-x-auto" v-model="task.tags"></tags-picker>
            </div>
            <workspaces-picker @hide="hideModal('workspaces-picker')" :state="modalState('workspaces-picker')" v-model="task.workspaceId"></workspaces-picker>
        </div>
    </transition>
</template> 

<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'
import Vue from 'vue'

export default new Page()
    .with('inputt', 'workspaces/Picker', 'tags/Picker', 'state/Presenter')
    .use( hasModals({ 'workspaces-picker': 'workspaces/Picker' }) )

    .getters({
        getWorkspace: 'workspaces/get'
    })
    .actions({
        getTask: 'tasks/get'
    })

    .data(() =>({
        mode: null,
        task: new (Vue.$FeathersVuex.Task)()
    }))
    .methods({
        async save() {
            console.log(this.task)
            await this.task.save()
            if(this.isCreate) {
                this.$router.go(-1)
            }
        },
        afterEnter() {
            if(this.isCreate) {
                this.$refs.inputt.focus()
            }
        },

        async fetchData() {
            if(!isNaN(this.$route.params.id) && Number.isInteger(parseInt(this.$route.params.id))) {
                this.mode = 'view'
                this.task = (await this.getTask(parseInt(this.$route.params.id))).clone()
            } else {
                this.mode = 'create'
                this.task = new this.$FeathersVuex.Task()
            }
            console.log(this.task)
        }
    })
    .computed({
        selectedWorkspaceName() {
            return this.task.workspaceId ? this.getWorkspace(this.task.workspaceId).name : 'No workspace'
        },

        isView() {
            return this.mode == 'view'
        },
        isCreate() {
            return this.mode == 'create'
        },
        isEdit() {

        }
    })

    .created(vue => {
        vue.fetchData()
    })
    .watch('$route', 'fetchData')

    .vue()
</script>