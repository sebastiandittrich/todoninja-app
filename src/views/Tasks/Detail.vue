<template>
    <div v-if="task" class="bg-white dark:bg-black dark:text-white pb-32">

        <!-- Save Button -->
        <div v-show="isCreate || isEdit" class="fixed bottom-0 right-0 m-8 flex flex-row items-center" >
            <!-- <div @click="remove" class="rounded-full bg-red-lighter text-red-darker p-2 mr-4 flex flex-row items-center justify-center text-base uppercase tracking-wide cursor-pointer select-none">
                <i class="feather icon-trash"></i>
            </div> -->
            <div @click="save({ explicit: true })" class="rounded-full bg-green-lighter text-green-darker p-2 px-4 flex flex-row items-center justify-center text-base uppercase tracking-wide cursor-pointer select-none">
                <i class="feather icon-check text-2xl mr-2"></i>
                Save
            </div>
        </div>

        <!-- Header Part -->
        <div class="p-6 relative" :class="task.workspace.isInbox() ? 'inbox-pattern border-b border-grey-light dark:border-grey-darkest' : 'bg-blue-lightest dark:bg-black-deep'">
            <div class="flex flex-row items-center justify-between mb-6 text-2xl">
                <!-- Back button -->
                <i v-if="replaceOnClose" @click="$router.softReplace({ path: '/tasks' })" class="feather icon-x cursor-pointer select-none"></i>
                <i v-else @click="$router.go(-1)" class="feather icon-chevron-left cursor-pointer select-none"></i>

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
                <textarea-autosize @keyup.enter="save({ explicit: true })" ref="inputt" @input="setEdited" class="font-bold text-2xl border-none w-full dark:text-grey-lighter bg-transparent leading-none" rows="1" v-model="task.title" placeholder="My new task"></textarea-autosize>

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

            <div class="stacking">
                <textarea-autosize @input="setEdited" v-model="task.description" class="break-all bg-transparent description-edit" placeholder="Describe your task!"></textarea-autosize>
                <div class="description-rendered break-all" v-html="task.renderedDescription()"></div>
            </div>

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

.description-edit {
  opacity: 0;
}
.description-rendered {
  @apply pointer-events-none;
  z-index: 1;
}


.description-edit:focus {
  opacity: 1;
  z-index: 1;
}

.description-edit:focus + .description-rendered {
  opacity: 0;
  z-index: 0;
}

</style>

<style>
.description-rendered a.link {
  @apply font-normal pointer-events-auto;
}
</style>



<script>
import { hasModals, store, themeColor } from '@/mixins'
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
        loading: true,
    }),
    props: {
        id: {
            type: Number,
            default: null
        },
        today: {
            type: Boolean,
            default: false
        },
        replaceOnClose: {
            type: Boolean, 
            default: false
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

        async save({ explicit = false } = {}) {
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
                    this.fetchData()
                } else if(this.isEdit) {
                    this.edited = false
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
                this.task = (await this.getTask(parseInt(this.id)))
            } else {
                this.mode = 'create'
                this.task = new this.$FeathersVuex.Task({ workspaceId: this.currentWorkspace.id, today: this.today ? new Date().toString() : null })
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
            return this.isView ? this.edited : false
        }
    },
    created() {
        this.fetchData()
    },
    mounted() {
        this.afterEnter()
    },
    watch: {
        id: function() {
            this.fetchData()
            this.afterEnter() 
        },
        today: function(to) {
            if(this.isCreate && to != this.task.isToday()) {
                this.task.toggleToday()
            }
        }
    }
}
</script>