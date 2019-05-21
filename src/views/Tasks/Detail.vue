<template>
    <transition name="slide-right" @after-enter="afterEnter">
        <div v-if="task" class="bg-white dark:bg-black dark:text-white pb-32">

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
                <div class="flex flex-row items-start justify-between">
                    <!-- State -->
                    <done-indicator @change="save()" :task="task" class="text-2xl mr-6 float-left"></done-indicator>

                    <!-- Title -->
                    <textarea-autosize @keyup.enter="save({ explicit: true })" ref="inputt" @input="edited++; debounceSave()" class="font-bold text-2xl border-none w-full dark:text-grey-lighter bg-transparent" rows="1" v-model="task.title" placeholder="My new task"></textarea-autosize>

                    <!-- Today -->
                    <today-indicator @change="save()" :task="task" class="text-2xl ml-6 float-right" darker></today-indicator>
                </div>
            </div>

            <!-- Middle Part -->
            <div class="m-6">

                <!-- Was today -->

                <!-- State -->
                <state-presenter @change="save()" v-model="task" class="z-10"/>

                <reminder-presenter class="mt-6 w-full" @change="save()" v-model="task"></reminder-presenter>
                <div class="font-bold text-sm mb-2 mt-8">Description</div>
                <textarea-autosize @input="edited++; debounceSave()" v-model="task.description" class="-z-10 w-full font-light text-lg rounded-lg transition dark:bg-black" rows="2" placeholder="Describe your task!"></textarea-autosize>

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
  pointer-events: none;
  content: "";
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%;  
  z-index: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQoU2NkIALcevj8PyMhdSBFavKSjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQB8xyesWcqJlAAAAABJRU5ErkJggg==) repeat;
  opacity: .2; 
}
</style>


<script>
import { hasModals, store, themeColor, debounce } from '@/mixins'
import Vue from 'vue'
import vuex from '@/store'
import _ from 'lodash'

import Inputt from '@c/inputt'
import TagsPicker from '@c/tags/Picker'
import StatePresenter from '@c/state/Presenter'
import DoneIndicator from '@c/done/Indicator'
import TodayIndicator from '@c/today/Indicator'
import ReminderPresenter from '@c/reminder/Presenter'
import WorkspacesPicker from '@c/workspaces/Picker'
import TasksOptions from '@c/tasks/Options'
import TextareaAutosize from 'vue-textarea-autosize'

export default {
    components: { Inputt, TagsPicker, StatePresenter, DoneIndicator, TodayIndicator, ReminderPresenter },
    mixins : [
        themeColor(vue => ({ 
            dark: vue && vue.task && vue.task.workspace.isInbox() ? 'black' : 'black-deep',
            light: vue && vue.task && vue.task.workspace.isInbox() ? 'white' : 'blue-lightest'
        })),
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
        task: null,
        original_task: null,
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

        remove() {
            if(this.isCreate) {
                this.$router.back()
            } else {
                this.task.reset()
                this.edited = false
            }
        },

        debounceSave: _.debounce(function() {
            setTimeout(() => {
                this.save()
            }, 0);
        }, 500),

        async save({ explicit = false } = {}) {
            // If save is triggered by a change event on a component and 
            // task is in create mode, don't save the task, so the page 
            // will not close unexpected.
            // 
            // If the user explicitly saves the task, 
            // the page will close
            if( !(this.isCreate && !explicit) ) {

                const lastEdited = this.edited
                setTimeout(() => {
                    if(this.edited == lastEdited) this.edited = 0
                }, 500);
                await this.task.save()

                if(explicit) this.$store.dispatch('events/success', { message: 'Task ' + (this.isCreate ? 'created.' : 'saved.') })

                if(this.isCreate) {
                    this.$router.go(-1)
                }

            }
        },
        afterEnter() {
            if(this.isCreate) {
                this.$refs.inputt.$el.focus()
            }
        },
        async fetchData() {
            if(!isNaN(this.id) && Number.isInteger(parseInt(this.id))) {
                this.mode = 'view'
                this.original_task = (await this.getTask(parseInt(this.id)))
            } else {
                this.mode = 'create'
                this.task = new this.$FeathersVuex.Task({ workspaceId: this.currentWorkspace.id })
            }
        }

    },
    computed: {
        isView() {
            return this.mode == 'view'
        },
        isCreate() {
            return this.mode == 'create'
        },
        isEdit() {
            return this.isView ? this.edited != 0 : false
        }
    },
    created() {
        this.fetchData()
    },
    watch: {
        id: function() {
            this.fetchData()
            this.afterEnter() 
        },
        original_task: {
            deep: true,
            handler(to) {
                if(this.edited == 0) {
                    this.task = to.clone()
                }
            }
        },
        edited(to) {
            console.log('edited', to)
        }
    }
}
</script>