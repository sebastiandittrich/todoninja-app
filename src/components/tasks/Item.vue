<template>
    <div class="flex flex-row items-center justify-between mb-4 cursor-pointer select-none" @click="$emit('click')">
        <div class="flex flex-row items-center justify-start">
            <done-indicator @change="save" :task="task" class="text-xl mr-4"></done-indicator>
            <div>
                <div class="dark:text-white font-bold text-xl transition" :class="task.isDone() ? 'text-grey-darker' : ''">
                    {{ task.title }}
                </div>
                <transition name="expand">
                    <div class="text-sm font-light text-grey-darker dark:text-grey flex flex-row items-center flex-no-wrap info overflow-hidden" v-if="!task.isDone()">
                        <div>
                            {{ States.states.filter(state => state.state == task.getState())[0].name }}
                        </div>
                        <div v-if="task.state != States.postponed">
                          <div v-if="task.isDeadlineToday()" class="ml-1">
                              &bull;
                              <span class="text-blue dark:text-blue-light font-bold">
                                  Today
                              </span>
                          </div>
                          <div v-if="task.isDeadlineOver()" class="ml-1">
                              &bull;
                              <span class="text-orange-light font-bold">
                                  {{ task.deadlineMoment().fromNow() }}
                              </span>
                          </div>
                        </div>
                        <div v-if="task.remindAtMoment() && task.remindAtMoment().isAfter()" class="ml-1">
                            &bull;
                            <span class="inline-flex flex-row items-center">
                                <i class="feather icon-clock mx-1 text-xs"></i>{{ task.humanRemindAt() }}
                            </span>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <today-indicator @change="save" :task="task" class="text-xl ml-4"></today-indicator>
    </div>
</template>

<style scoped>
.info > * {
    flex: 0 0 auto
}
</style>

<script>
import States from '@/assets/js/State'

import DoneIndicator from '@c/done/Indicator'
import TodayIndicator from '@c/today/Indicator'

export default {
    components: { DoneIndicator, TodayIndicator },
    props: {
        task: Object
    },
    data: () => ({
        States
    }),
    methods: {
        save() {
            this.task.save()
        },
    }
}
</script>
