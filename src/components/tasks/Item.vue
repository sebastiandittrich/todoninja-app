<template>
    <div class="flex flex-row items-center justify-start mb-4" @click="$router.push({ name: 'Tasks.Detail', params: { id: task.id } })">
        <i v-show="task.doneAt == null" class="feather icon-circle mr-4 text-grey text-xl"></i>
        <i v-show="task.doneAt != null" class="feather icon-check-circle mr-4 text-green text-xl"></i>
        <div>
            <div class="font-bold text-xl">
                {{ task.title }}
            </div>
            <div>
                {{ task.description }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TasksItem',
  props: ['task'],
};
</script>
