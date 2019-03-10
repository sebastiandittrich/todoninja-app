<template>
    <div>
        <filter-bar v-if="filter" :filters="filters" :orderBy="orderBy"></filter-bar>
        <transition-group name="list" tag="div" class="mx-4">
            <tasks-item v-for="task in displayTasks" :task="task" :key="task.id"></tasks-item>
            <div key="loader" class="flex flex-row items-center justify-center w-full">
                <Loader color="#45547c" class="" :loading="$store.state.tasks.isFindPending"></Loader>
            </div>
        </transition-group>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'
import loading from '@/assets/js/traits/loading'
import _ from 'lodash'

export default new Page()
  .with('tasks/Item', 'filter/Bar')
  .use(loading)
  .props({
      tasks: {
          type: Array,
          default: undefined
      },
      filter: {
          type: Boolean,
          default: true,
      }
  })
  .data(() => ({
      filters: [],
      orderBy: {
          properties: ['updatedAt'],
          directions: ['desc']
      }
  }))
  .getters({taskList: 'tasks/list'})
  .computed({
      displayTasks() {
          let tasks = this.tasks !== undefined ? this.tasks : this.taskList

          for(const filter of this.filters) {
              if(filter.full) {
                  tasks = filter.filter(tasks)
              } else {
                  tasks = tasks.filter(filter)
              }
          }

          return _.orderBy(tasks, this.orderBy.properties, this.orderBy.directions)
      }
  })
  .vue();
</script>
