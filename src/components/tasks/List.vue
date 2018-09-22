<template>
    <div class="mx-4">
        <tasks-item v-for="task in tasks" :task="task" :key="task.id.str"></tasks-item>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
  .with('tasks/Item')
  .getters({tasks: 'tasks/list'})
  .vue();
</script>
