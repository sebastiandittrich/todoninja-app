<template>
    <div class="flex flex-row items-center justify-start mb-4" @click="$router.push({ name: 'Tasks.Detail', params: { id: task.id } })">
        <done-indicator :task="task" class="text-xl mr-4"></done-indicator>
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
import Page from '@/assets/js/Page'

export default new Page('TasksItem')
    .with('done/Indicator')
    .props({
        task: Object
    })
    .vue()
</script>
