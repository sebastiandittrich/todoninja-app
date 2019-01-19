<template>
  <transition name="move-left">
    <div class="page">

      <greeting ref="greeting" class="rounded-lg m-2 shadow-lg md:hidden"></greeting>

      <sections-bar class="md:bg-blue-lightest md:p-4 md:pt-6" style="grid-area: sections"></sections-bar>

      <div class="hidden md:block overflow-hidden" style="grid-area: sidebar"><navigation-sidebar class="md:bg-blue-lightest"></navigation-sidebar></div>

      <div class="hidden md:block" style="grid-area: search"><search-bar class="bg-blue-lightest pl-6 h-full" ></search-bar></div>


      <v-touch @swipe="listSwipe" :swipe-options="{direction: 'horizontal'}" style="grid-area: tasks" class="relative overflow-auto">
        <div class="hidden md:block p-2 mb-6 sticky pin-t pin-x" style="background: linear-gradient(hsl(224, 15%, 90%) 47%, white 46%)">
          <greeting class="rounded-lg shadow-md"></greeting>
        </div>
        <div class="stacking overflow-hidden mx-2">
          <transition :name="transition">
            <keep-alive>
              <component :is="this.TaskListView" class="pb-32"></component>
            </keep-alive>
          </transition>
        </div>
      </v-touch>

      <navigation-bar class="md:hidden"></navigation-bar>
      <router-view class="fixed pin md:static z-10 md:z-10 overflow-x-hidden" style="grid-area: detail"></router-view>

      <navigation-item v-if="!($route.name == 'Tasks.Create')" link="/tasks/create" class="add-icon transition hidden md:flex fixed pin-r pin-b z-10 m-8" style="margin-right: calc(50% + 2rem); filter: drop-shadow(0px 10px 10px hsl(224, 28%, 38%));">
          <i class="feather icon-plus text-white p-3 rounded-full bg-blue"></i>
      </navigation-item>

    </div>
  </transition>
</template>

<style lang="stylus" scoped>
@screen md
  .page
    display grid
    grid-template "search sections detail" auto "sidebar tasks detail" 1fr / 2fr 3fr 5fr
</style>

<script>
import Page from '@/assets/js/Page';

export default new Page()

  .with('Greeting', 'sections/Bar', 'tasks/List', 'navigation/Bar', 'navigation/Item', 'navigation/Sidebar', 'tasks/Do', 'tasks/Today', 'tasks/All', 'search/Bar')

  .data(() => ({
    transition: 'opacity-slide-right'
  }))

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
    }
  })

  .methods({
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
