<template>
    <div class="flex flex-row items-center justify-between mb-4" @click="$router.push({ name: 'Tasks.Detail', params: { id: task.id }, query: $route.query })">
        <div class="flex flex-row items-center justify-start">
            <done-indicator @change="save" :task="task" class="text-xl mr-4"></done-indicator>
            <div>
                <div class="font-bold text-xl">
                    {{ task.title }}
                </div>
                <div class="text-sm font-light text-grey-darker">
                    <span v-if="task.isDeadlineToday()" class="font-bold text-blue">
                        Today &bull;
                    </span>
                    <span>
                        {{ States.states.filter(state => state.state == task.state)[0].name }}
                    </span>
                </div>
            </div>
        </div>
        <today-indicator @change="save" :task="task" class="text-xl ml-4"></today-indicator>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'
import States from '@/assets/js/State'

export default new Page('TasksItem')
    .with('done/Indicator', 'today/Indicator')
    .props({
        task: Object
    })
    .data(() => ({
        States
    }))
    .methods({
        save() {
            this.task.save()
        }
    })
    .vue()
</script>
