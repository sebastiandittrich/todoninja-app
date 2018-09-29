<template>
    <transition-group name="list" tag="div" class="mx-4">
        <tasks-item v-for="task in displayTasks" :task="task" :key="task.id"></tasks-item>
    </transition-group>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
  .with('tasks/Item')
  .props({
      tasks: {
          type: Array,
          default: undefined
      }
  })
  .getters({taskList: 'tasks/list'})
  .computed({
      displayTasks() {
          return this.tasks !== undefined ? this.tasks : this.taskList
      }
  })
  .vue();
</script>
