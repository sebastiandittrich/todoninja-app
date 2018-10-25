<template>
    <transition-group name="list" tag="div" class="mx-4" @enter="enter">
        <tasks-item v-for="task in displayTasks" :task="task" :key="task.id"></tasks-item>
        <div key="loader" class="flex flex-row items-center justify-center w-full">
            <Loader color="#45547c" class="" :loading="$store.state.tasks.isFindPending"></Loader>
        </div>
    </transition-group>
</template>

<script>
import Page from '@/assets/js/Page'
import loading from '@/assets/js/traits/loading'

export default new Page()
  .with('tasks/Item')
  .use(loading)
  .props({
      tasks: {
          type: Array,
          default: undefined
      }
  })
  .getters({taskList: 'tasks/list'})
  .methods({
    enter(el, done) {
      // var delay = el.dataset.index * 150
      setTimeout(() => {
       done() 
      }, 1000);
    }
  })
  .computed({
      displayTasks() {
          return this.tasks !== undefined ? this.tasks : this.taskList
      }
  })
  .vue();
</script>
