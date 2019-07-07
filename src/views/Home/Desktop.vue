<template>
  <transition name="opacity-slide-up">
    <div class="h-screen overflow-hidden hidden lg:flex flex-row items-stretch justify-stretch">

      <div class="flex flex-col items-stretch justify-between w-1/6 border-r border-grey-light dark:border-grey-darkest">
        <div class="flex flex-col">

          <!-- Search Bar -->
          <greeting :class="{ 'border-b border-grey-light dark:border-grey-darkest': workspace.isInbox() }" class="overflow-hidden"></greeting>

          <!-- View -->
          <select-list>
            <select-item @click="setView('do')" :active="!isToday">
              <i slot="icon" class="feather icon-list"></i>
              All Tasks
            </select-item>
            <select-item @click="setView('today')" :active="isToday">
              <i slot="icon" class="feather icon-sun"></i>
              Today
            </select-item>
          </select-list>

          <!-- Workspaces -->
          <select-list v-if="!isToday" header="workspaces">
            <select-item v-for="workspace of workspaces" :key="workspace.id" @click="setWorkspace(workspace)" :active="isActiveWorkspace(workspace)">
              <i slot="icon" class="feather" :class="workspace.getIcon()"></i>
              {{ workspace.name }}
            </select-item>
          </select-list>

        </div>

        <!-- Navigation -->
        <div class="flex flex-col items-stretch justify-start text-grey-darkest dark:text-grey-lightest mb-8">
          <div class="mx-6 cursor-pointer select-none mb-8" @click="$router.push('/summary')">
            <i class="feather icon-pie-chart mr-4"></i>
            Summary
          </div>
          <div class="mx-6 cursor-pointer select-none" @click="$router.push('/settings')">
            <i class="feather icon-settings mr-4"></i>
            Settings
          </div>
        </div>

      </div>

      <div class="flex flex-col items-stretch justify-start overflow-auto relative" :class="isDetailActive ? 'w-1/2' : 'w-5/6'">

        <!-- Top Bar -->
        <div class="  flex-col items-stretch justify-start border-b border-grey-light dark:border-grey-darkest">

          <div class="mx-8 mt-8 mb-3 text-sm flex flex-row items-center">
            <div class="text-blue dark:text-blue-light font-bold">Todoninja</div>
            <div class="text-blue dark:text-blue-light font-bold mx-2">-</div>
            <div class="text-grey"> Todo PWA</div>
          </div>

          <transition name="opacity" mode="out-in">
            <workspace-presenter v-if="isToday" :workspace="new $FeathersVuex.Workspace({ icon: 'icon-sun', name: 'Today', color: 'yellow' })" ></workspace-presenter>
            <workspace-presenter v-else :key="workspace.id" :workspace="workspace"></workspace-presenter>
          </transition>

          <div v-if="!isToday" class="flex flex-row items-stretch justify-start self-start -mb-px mx-8 mt-2">
            <div @click="setView('do')" :class="isDo ? 'border-blue dark:border-blue-light' : 'border-transparent'" class="border-b-3 flex flex-row items-center pb-6 cursor-pointer select-none">
              <i :class="{ 'opacity-0': !isDo }" :style="{ transform: !isDo ? 'translateX(25%)' : '' }" class="transition feather icon-zap mr-2 text-blue dark:text-blue-light"></i>
              <div :class="isDo ? 'font-bold' : ' text-grey-darkest dark:text-grey'">
                Do
              </div>
              <div :class="isDo ? '' : 'opacity-50'" class="rounded-full bg-blue-lightest dark:bg-blue-darker dark:text-blue-light text-blue px-2 py-1 ml-2 font-bold text-xs">
                {{ tasksCount }}
              </div>
            </div>
            <div @click="setView('all')" :class="isAll ? 'border-blue dark:border-blue-light' : 'border-transparent'" class="border-b-3 flex flex-row items-center pb-6 cursor-pointer select-none ml-8">
              <i :class="{ 'opacity-0': !isAll }" :style="{ transform: !isAll ? 'translateX(25%)' : '' }" class="transition feather icon-list mr-2 text-blue dark:text-blue-light"></i>
              <div :class="isAll ? 'font-bold' : 'text-grey-darkest dark:text-grey'">
                All
              </div>
              <div :class="isAll ? '' : 'opacity-50'" class="rounded-full bg-blue-lightest dark:bg-blue-darker dark:text-blue-light text-blue px-2 py-1 ml-2 font-bold text-xs">
                {{ tasksCount }}
              </div>
            </div>
          </div>
        </div>

        <!-- Task List -->
        <div class="stacking overflow-hidden">
          <transition :name="transition">
            <keep-alive>
              <component @item-click="$router.softPush({ name: 'Tasks.Detail', params: { id: $event.id } })" :is="this.TaskListView" class="pb-32 pt-6 px-6 overflow-auto"></component>
            </keep-alive>
          </transition>
        </div>

        <navigation-item v-if="!($route.name == 'Tasks.Create')" @click="$router.softPush({ path: '/tasks/create' })" class="transition hidden md:flex absolute right-0 bottom-0 z-10 m-8">
          <i class="feather icon-plus text-blue dark:text-blue-light p-3 rounded-full bg-white dark:bg-black-deep shadow-lg mr-4 text-2xl"></i>
        </navigation-item>
      </div>

      <transition name="slide-right">
        <router-view :today="isToday" replaceOnClose :class="isDetailActive ? 'w-2/6' : 'w-0'" class="border-l border-grey-light dark:border-grey-darkest overflow-auto"></router-view>
      </transition>

    </div>
  </transition>
</template>

<style lang="stylus" scoped>

</style>

<script>
import { store } from '@/mixins'

import Base from './Base'
import NavigationItem from '@c/navigation/Item'
import NavigationSidebar from '@c/navigation/Sidebar'
import TasksToday from '@c/tasks/Today'
import SelectList from '@c/home/select/List'
import SelectItem from '@c/home/select/Item'
import WorkspacePresenter from '@c/home/WorkspacePresenter'

export default {
  extends: Base,
  components: {  NavigationItem, NavigationSidebar, TasksToday, SelectList, SelectItem, WorkspacePresenter },
  mixins: [
    store({
      getters: {
        workspaces: 'workspaces/withStandard'
      },
      mutations: {
        setWorkspace: 'workspaces/setCurrent'
      }
    })
  ],
  computed: {
    tasksCount() {
      return this.$store.getters['tasks/currentFind']().data.length
    },
  },

  methods: {
    isActiveWorkspace(workspace) {
      return workspace.id === this.workspace.id
    },
  },
  
}
</script>
