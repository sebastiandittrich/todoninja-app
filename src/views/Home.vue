<template>
  <transition name="move-left">
    <div class="page">

      <greeting ref="greeting" class="rounded-lg m-2 shadow-lg md:hidden"></greeting>

      <sections-bar class="md:bg-blue-lightest md:p-4 md:pt-6" style="grid-area: sections"></sections-bar>

      <div class="hidden md:block" style="grid-area: sidebar"><navigation-sidebar class="md:bg-blue-lightest"></navigation-sidebar></div>

      <div class="hidden md:block" style="grid-area: search"><search-bar class="bg-blue-lightest pl-6 h-full" ></search-bar></div>

      <div style="grid-area: tasks">
        <div class="hidden md:block p-2 mb-6" style="background: linear-gradient(hsl(224, 15%, 90%) 47%, white 46%)">
          <greeting class="rounded-lg shadow-md"></greeting>
        </div>
        <div class="stacking overflow-hidden mx-2">
          <transition :name="transition">
            <keep-alive>
              <component :is="this.TaskListView" class="pb-32"></component>
            </keep-alive>
          </transition>
        </div>
      </div>

      <navigation-bar class="md:hidden"></navigation-bar>
      <router-view class="absolute pin md:static z-10 md:z-10" style="grid-area: detail"></router-view>

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

  .with('Greeting', 'sections/Bar', 'tasks/List', 'navigation/Bar', 'navigation/Sidebar', 'tasks/Do', 'tasks/Today', 'tasks/All', 'search/Bar')

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

  .watch('$route', function(to, from) {
    console.log(from)
    if(from.name == 'Tasks.Do') {
      this.transition = 'opacity-slide-left'
    } else if(from.name == 'Tasks.All') {
      this.transition = 'opacity-slide-right'
    } else if(from.name == 'Tasks.Today') {
      if(to.name == 'Tasks.Do') {
        this.transition = 'opacity-slide-right'
      } else if(to.name == 'Tasks.All') {
        this.transition = 'opacity-slide-left'
      }
    }
  })
  .vue();
</script>
