<template>
    <div class="flex flex-row items-center justify-start mb-4">
        <i class="mi mi-CircleRing mr-4 text-grey text-xl"></i>
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
