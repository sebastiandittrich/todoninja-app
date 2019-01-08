<template>
    <div class="flex flex-row items-center justify-between mb-4" @click="$router.push({ name: 'Tasks.Detail', params: { id: task.id }, query: $route.query })">
        <div class="flex flex-row items-center justify-start">
            <done-indicator @change="save" :task="task" class="text-xl mr-4"></done-indicator>
            <div>
                <div class="font-bold text-xl transition" :class="task.isDone() ? 'text-grey-darker' : ''">
                    {{ task.title }}
                </div>
                <transition name="expand">
                    <div class="text-sm font-light text-grey-darker" v-if="!task.isDone()">
                        <span>
                            {{ States.states.filter(state => state.state == task.state)[0].name }}
                        </span>
                        <span v-if="task.isDeadlineToday()">
                            &bull;
                            <span class="text-blue font-bold">
                                Today
                            </span>
                        </span>
                        <span v-if="task.isDeadlineOver()">
                            &bull;
                            <span class="text-orange-light font-bold">
                                {{ task.deadlineMoment().fromNow() }} 
                            </span>
                        </span>
                    </div>
                </transition>
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
        },

        // enter(el, done) {
        //     $(el).slideDown(300, done)
        // },
        // leave(el, done) {
        //     $(el).slideUp(300, done)
        // }
    })
    .vue()
</script>
