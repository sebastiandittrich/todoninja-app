<template>
    <transition name="slide-right" @after-enter="afterEnter">
        <div v-if="!loading" class="bg-white dark:bg-black dark:text-white">

            <!-- Save Button -->
            <div v-show="isCreate || isEdit" @click="save({ explicit: true })" class="rounded-full bg-green-lighter text-green-darker p-2 px-4 flex flex-row items-center justify-center text-base uppercase tracking-wide fixed bottom-0 right-0 m-8 cursor-pointer select-none">
                <i class="feather icon-check text-2xl mr-2"></i>
                Save
            </div>

            <!-- Header Part -->
            <div class="p-6 relative" :class="task.workspace.isInbox() ? 'inbox-pattern border-b border-grey-light dark:border-grey-darkest' : 'bg-blue-lightest dark:bg-black-deep'">
                <div class="flex flex-row items-center justify-between mb-6 text-2xl">
                    <!-- Back button -->
                    <i @click="$router.go(-1)" class="feather icon-chevron-left lg:hidden cursor-pointer select-none"></i>
                    <i @click="$router.replace('/tasks')" class="feather icon-x hidden lg:block cursor-pointer select-none"></i>

                    <div :class="`text-${task.workspace.getColor()}-darker dark:text-${task.workspace.getColor()}-lighter`" class="flex flex-row items-center text-sm cursor-pointer select-none" @click="showModal('workspaces-picker', $event)">
                        <i v-if="task.workspace.isInbox()" :class="task.workspace.getIcon()" class="feather mr-2"></i>
                        <div v-else :class="`h-3 w-3 mr-2 rounded-lg bg-${task.workspace.getColor()}`"></div>
                        <span class="font-bold">{{ task.workspace.name }}</span>
                        <i class="feather icon-chevron-down ml-2 text-base"></i>
                    </div>
                    <!-- Options Button -->
                    <i :class="{'opacity-0': isCreate}" @click="!isCreate ? showModal('tasks-options', $event) : null" class="feather icon-more-vertical cursor-pointer select-none"></i>
                </div>
                <div class="flex flex-row items-center justify-between">
                    <!-- State -->
                    <done-indicator @change="save()" :task="task" class="text-2xl mr-6 float-left"></done-indicator>

                    <!-- Title -->
                    <inputt @press-enter="save({ explicit: true })" ref="inputt" @input="setEdited" iclass="font-bold text-2xl border-none w-full dark:text-grey-lighter" v-model="task.title" placeholder="My new task" type="text"></inputt>

                    <!-- Today -->
                    <today-indicator @change="save()" :task="task" class="text-2xl ml-6 float-right" darker></today-indicator>
                </div>
            </div>

            <!-- Middle Part -->
            <div class="m-6">

                <!-- Was today -->

                <!-- State -->
                <state-presenter @change="save(); log('state')" v-model="task" class="z-10"/>

                <reminder-presenter class="mt-6 w-full" @change="save(); log('reminder')" v-model="task"></reminder-presenter>
                <div class="font-bold text-sm mb-2 mt-8">Description</div>
                <textarea @input="setEdited" v-model="task.description" class="-z-10 w-full font-light text-lg focus:shadow-lg rounded-lg transition focus:p-2 dark:bg-black" rows="2" placeholder="Describe your task!"></textarea>

                <div class="font-bold text-sm mb-2 mt-6">
                    Tags
                </div>

                <!-- Tags -->
                <tags-picker @input="save()" v-model="task.tags" activeFirst></tags-picker>

            </div>

            <!-- Workspace -->
            <workspaces-picker @input="save()" @hide="hideModal('workspaces-picker')" :state="modalState('workspaces-picker')" v-model="task.workspaceId"></workspaces-picker>
            <!-- Options Modal -->
            <tasks-options @hide="hideModal('tasks-options')" :state="modalState('tasks-options')" :task="task" @delete="$router.go(-1)"></tasks-options>
        </div>
    </transition>
</template>  

<style scoped>
#app:not(.dark) .inbox-pattern {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQoU2NkIALcevj8PyMhdSBFavKSjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQB8xyesWcqJlAAAAABJRU5ErkJggg==) repeat;
}

#app.dark .inbox-pattern::before {
  content: "";
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%;  
  z-index: -1;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQoU2NkIALcevj8PyMhdSBFavKSjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQB8xyesWcqJlAAAAABJRU5ErkJggg==) repeat;
  opacity: .2; 
}
</style>


<script>
import hasModals from '@/mixins/hasModals'
import store from '@/mixins/store'
import Vue from 'vue'
import vuex from '@/store'

import Inputt from '@c/inputt'
import TagsPicker from '@c/tags/Picker'
import StatePresenter from '@c/state/Presenter'
import DoneIndicator from '@c/done/Indicator'
import TodayIndicator from '@c/today/Indicator'
import ReminderPresenter from '@c/reminder/Presenter'
import WorkspacesPicker from '@c/workspaces/Picker'
import TasksOptions from '@c/tasks/Options'

async function fetchData(route) {
    if(!isNaN(route.params.id) && Number.isInteger(parseInt(route.params.id))) {
        return {
            mode: 'view',
            task: await vuex.dispatch('tasks/get', parseInt(route.params.id))
        }
    } else {
        return {
            mode: 'create',
            task: new Vue.$FeathersVuex.Task({ workspaceId: vuex.getters['workspaces/current'].id })
        }
    }
}

export default {
    components: { Inputt, TagsPicker, StatePresenter, DoneIndicator, TodayIndicator, ReminderPresenter },
    mixins : [ 
        hasModals({ WorkspacesPicker, TasksOptions }),
        store({
            getters: {
                getWorkspace: 'workspaces/get',
                currentWorkspace: 'workspaces/current'
            },
            actions: {
                getTask: 'tasks/get',
                loadWorkspace: 'workspaces/get'
            }
        })
    ],
    data: () =>({
        mode: null,
        edited: false,
        task: new (Vue.$FeathersVuex.Task)(),
        loading: true,
    }),
    props: {
        id: {
            type: Number,
            default: null
        }
    },
    methods: {
        setEdited() {
            this.edited = true
        },

        async save({ explicit = false } = {}) {
            console.log('save called')
            // If save is triggered by a change event on a component and 
            // task is in create mode, don't save the task, so the page 
            // will not close unexpected.
            // 
            // If the user explicitly saves the task, 
            // the page will close
            if( !(this.isCreate && !explicit) ) {

                await this.task.save()

                if(explicit) this.$store.dispatch('events/success', { message: 'Task ' + (this.isCreate ? 'created.' : 'saved.') })

                if(this.isCreate) {
                    this.$router.go(-1)
                } else if(this.isEdit) {
                    this.edited = false
                }

            }
        },
        afterEnter() {
            if(this.isCreate) {
                this.$refs.inputt.focus()
            }
        },
    },
    computed: {
        isView() {
            return this.mode == 'view'
        },
        isCreate() {
            return this.mode == 'create'
        },
        isEdit() {
            return this.isView ? this.edited : false
        }
    },
    mounted() {
        this.afterEnter()
    },
    async beforeRouteUpdate(to, from, next) {
        const { mode, task } = await fetchData(to)
        next(vue => {
            vue.mode = mode
            vue.task = task
            vue.$nextTick(() => {
                vue.loading = false
            })
            vue.afterEnter()
        })
    },
    async beforeRouteEnter(to, from, next) {
        const { mode, task } = await fetchData(to)
        next(vue => {
            vue.mode = mode
            vue.task = task
            vue.$nextTick(() => {
                vue.loading = false
            })
        })
    }
}
</script>