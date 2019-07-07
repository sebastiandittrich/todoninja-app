<template>
  <transition name="opacity-slide-up">
    <div class="h-full">
      <v-touch @swipe="listSwipe" :swipe-options="{direction: 'horizontal'}" class="min-h-full">

        <greeting :class="{ 'border border-grey-light dark:border-none': workspace.isInbox() }" class="rounded-lg m-2 mx-4 overflow-hidden shadow dark:shadow-2xl dark:bg-black-deep"></greeting>

        <sections-bar class="m-6 mb-10"></sections-bar>

        <div class="stacking overflow-hidden mx-2">
          <transition :name="transition">
            <keep-alive>
              <component @item-click="$router.push({ name: 'Tasks.Detail', params: { id: $event.id }, query: $route.query })" :is="this.TaskListView" class="pb-32"></component>
            </keep-alive>
          </transition>
        </div>
        <transition name="slide-right">
          <router-view class="fixed inset-0 z-10 overflow-x-hidden"></router-view>
        </transition>

      </v-touch>

      <!-- Navigation Bar -->
      <navigation-bar v-if="!isDetailActive">
        <navigation-button class="lg:hidden">
          <router-link to="/tasks/create">
            <i class="feather icon-plus"></i>
          </router-link>
        </navigation-button>
      </navigation-bar>

    </div>
  </transition>
</template>

<script>
import { store, themeColor, color } from '@/mixins'

import Base from './Base'
import SectionsBar from '@c/sections/Bar'

export default {
    extends: Base,
    components: { SectionsBar },
    computed: {
        isToday() {
            return false
        }
    },

    methods: {
        listSwipe({ direction }) {
            direction = direction == 2 ? 'left' : (direction == 4 ? 'right' : 'other')

            if(this.isDo && direction == 'left') {
                this.setView('all')  
            } else if(this.isAll && direction == 'right') {
                this.setView('do')
            }
        }
    },
}
</script>
