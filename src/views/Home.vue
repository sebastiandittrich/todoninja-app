<template>
  <transition name="opacity-slide-up">
    <div class="">

      <!-- Normal Page -->
      <div class="overflow-hidden hidden lg:flex flex-row items-stretch justify-stretch h-full">

        <div class="flex flex-col items-stretch justify-between w-1/6 border-r">
          <div class="flex flex-col">

            <!-- Search Bar -->
            <greeting class="overflow-hidden"></greeting>

            <!-- Sections -->
            <div class="mx-4 mt-8">
              <div class="text-grey font-bold tracking-wide text-xs uppercase ml-12 mb-2">
                Sections
              </div>
              <sections-bar></sections-bar>
            </div>

            <!-- Workspaces -->
            <div class="mx-4 mt-8">
              <div class="text-grey font-bold tracking-wide text-xs uppercase ml-12 mb-2">
                Workspaces
              </div>
              <div class="flex flex-col items-start justify-start">
                <div v-for="workspace of workspaces" :key="workspace.id" @click="setWorkspace(workspace)" :class="{ 'text-blue font-bold': isActiveWorkspace(workspace), 'text-grey-darkest': !isActiveWorkspace(workspace) }" class="px-4 py-2 cursor-pointer select-none flex flex-row items-center transition">
                  <i :class="{ [workspace.getIcon()]: true, 'opacity-0': !isActiveWorkspace(workspace) }" :style="{ transform: !isActiveWorkspace(workspace) ? 'translateX(25%)' : '' }" class="text-blue feather transition mr-4"></i>
                  <span>{{ workspace.name }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Navigation -->
          <div class="flex flex-col items-stretch justify-start text-grey-darkest mb-8">
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
          <div class="  flex-col items-stretch justify-start border-b">

            <div class="mx-8 mt-8 mb-3 text-sm flex flex-row items-center">
              <div class="text-blue font-bold">Todoninja</div>
              <div class="text-blue font-bold mx-2">-</div>
              <div class="text-grey"> Todo PWA</div> 
            </div>

            <transition name="opacity" mode="out-in">
              <div :key="workspace.id" class="text-5xl m-8 mt-0 flex flex-row items-center justify-start">
                <i class="feather text-3xl mr-4 rounded-lg p-2" :class="{ [workspace.getIcon()]: true, [`bg-${workspace.getColor()}-lightest text-${workspace.getColor()}`]: !workspace.isInbox(), 'border-2 border-grey': workspace.isInbox() }"></i>
                {{ workspace.name }}
              </div>
            </transition>

            <div class="flex flex-row items-stretch justify-start self-start -mb-px mx-8 mt-2">
              <div :class="!isInbox ? 'border-blue' : 'border-transparent'" class="border-b-3 flex flex-row items-center pb-6 cursor-pointer select-none">
                <div :class="!isInbox ? '' : 'opacity-50'" class="rounded-full bg-blue-lightest text-blue px-2 py-1 mr-2 font-bold text-xs">
                  {{ tasksCount }}
                </div>
                <div :class="!isInbox ? 'font-bold' : ''">
                  Tasks
                </div>
              </div>

              <!-- <div :class="isInbox ? 'border-blue' : 'border-transparent'" class="border-b-3 flex flex-row items-center pb-6 cursor-pointer select-none ml-12">
                <div :class="isInbox ? '' : 'opacity-50'" class="rounded-full bg-blue-lightest text-blue px-2 py-1 mr-2 font-bold text-xs">
                  {{ 0 }}
                </div>
                <div :class="isInbox ? 'font-bold' : 'text-grey'">
                  Inbox
                </div>
              </div> -->
            </div>
          </div>

          <!-- Task List -->
          <div class="stacking overflow-hidden">
            <transition :name="transition">
              <keep-alive>
                <component :is="this.TaskListView" class="pb-32 pt-6 px-6 overflow-auto"></component>
              </keep-alive>
            </transition>
          </div>

          <navigation-item v-if="!($route.name == 'Tasks.Create')" link="/tasks/create" class="transition hidden md:flex absolute pin-r pin-b z-10 m-8">
            <i class="feather icon-plus text-blue p-3 rounded-full bg-white shadow-lg mr-4 text-2xl"></i>
          </navigation-item>
        </div>

        <router-view :class="isDetailActive ? 'w-2/6' : 'w-0'" class="border-l"></router-view>

      </div>

      <!-- Mobile Page ------------------------------------------------------------------------------- -->
      <v-touch @swipe="listSwipe" :swipe-options="{direction: 'horizontal'}" class="lg:hidden min-h-full">

        <greeting :class="{ 'border': workspace.isInbox() }" class="rounded-lg m-2 mx-4 overflow-hidden shadow"></greeting>

        <sections-bar class="m-6 mb-10"></sections-bar>

        <div class="stacking overflow-hidden mx-2">
          <transition :name="transition">
            <keep-alive>
              <component :is="this.TaskListView" class="pb-32"></component>
            </keep-alive>
          </transition>
        </div>
        
        <router-view class="fixed pin z-10 overflow-x-hidden"></router-view>

      </v-touch>

    </div>
  </transition>
</template>

<style lang="stylus" scoped>

</style>

<script>
import Page from '@/assets/js/Page';
// import hasModals from '@/assets/js/traits/hasModals'

export default new Page()

  .with('Greeting', 'sections/Bar', 'tasks/List', 'navigation/Bar', 'navigation/Item', 'navigation/Sidebar', 'tasks/Do', 'tasks/Today', 'tasks/All')

  .data(() => ({
    transition: 'opacity-slide-right'
  }))

  .getters({
    workspace: 'workspaces/current',
    workspaces: 'workspaces/withStandard'
  })

  .mutations({
    setWorkspace: 'workspaces/setCurrent'
  })

  .props({ view: { type: String, default: 'do', } })
  .computed({
    TaskListView() {
      if(this.view == 'do') {
        return 'tasks-do'
      } else if(this.view == 'today') {
        return 'tasks-today'
      } else if(this.view == 'all') {
        return 'tasks-all'
      } else {
        return 'tasks-do'
      }
    },
    isInbox() {
      return false
    },
    tasksCount() {
      return this.$store.getters['tasks/currentFind']().data.length
    },
    isDetailActive() {
      return [ 'Tasks.Create', 'Tasks.Detail' ].includes(this.$route.name)
    }
  })

  .methods({
    isActiveWorkspace(workspace) {
      return workspace.id === this.workspace.id
    },

    listSwipe({ direction }) {
      direction = direction == 2 ? 'left' : (direction == 4 ? 'right' : 'other')
      let name = null
      console.log(this.TaskListView + direction)
      if(this.TaskListView == 'tasks-do' && direction == 'left') {
        name = 'today'
      } else if(this.TaskListView == 'tasks-today') {
        if(direction == 'left') {
          name = 'all'
        } else if (direction == 'right') {
          name = 'do'
        }
      } else if(this.TaskListView == 'tasks-all' && direction == 'right') {
        name = 'today'
      }
      if(name) {
        this.$router.replace({ ...this.$route, query: { ...this.$route.query, view: name }})
      }
    }
  })

  .watch('$route', function(to, from) {
    if(from.query.view == 'do') {
      this.transition = 'opacity-slide-left'
    } else if(from.query.view == 'all') {
      this.transition = 'opacity-slide-right'
    } else if(from.query.view == 'today') {
      if(to.query.view == 'do') {
        this.transition = 'opacity-slide-right'
      } else if(to.query.view == 'all') {
        this.transition = 'opacity-slide-left'
      }
    }
  })
  .vue();
</script>
