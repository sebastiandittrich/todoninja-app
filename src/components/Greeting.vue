<template>
  <div>
    <div :class="{ 'border-b border-grey-light': selectedWorkspace.isInbox() }" class="py-4 px-6 flex flex-row items-center justify-between lg:py-6 transition" :style="!selectedWorkspace.isInbox() ? gradient : { background: 'transparent' }" @click="$router.push('/search')">
      <span :class="{ 'text-grey-lighter': !selectedWorkspace.isInbox(), 'text-grey-darker': selectedWorkspace.isInbox() }" class="cursor-pointer select-none mr-2 truncate"><i class="feather icon-search mr-2"></i> Search for a task...</span>
      <div v-if="isExtended" :class="{ 'text-white': !selectedWorkspace.isInbox() }" class="md:hidden flex flex-row items-center text-sm cursor-pointer select-none" @click.stop="showModal('workspaces-picker', $event)">
        <i v-if="selectedWorkspace.isInbox()" class="feather icon-inbox mr-2"></i>
        <div v-else :class="`h-3 w-3 mr-2 rounded-full border-white border-3`"></div>
        <span class="font-bold">{{ selectedWorkspace.name }}</span>
        <i class="feather icon-chevron-down ml-2 text-base"></i>
      </div>
    </div>
    <workspaces-picker @hide="hideModal('workspaces-picker')" :state="modalState('workspaces-picker')" :value="selectedWorkspace.id" @input="$store.commit('workspaces/setCurrent', $event, { root: true })"></workspaces-picker>
  </div>
</template>

<script>
import Page from '@/assets/js/Page';
import hasModals from '@/assets/js/traits/hasModals'
import { theme } from '@/../tailwind.config.js'

const colors = theme.colors

export default new Page('Greeting')
  .use( hasModals({ 'workspaces-picker': 'workspaces/Picker' }) )
  .getters({
    selectedWorkspace: 'workspaces/current'
  })
  .computed({
    isExtended() {
      return !!this.$store.state.auth.user
    },
    gradient() {
      return {
        background: 'linear-gradient(-45deg,' + colors[this.selectedWorkspace.getColor() + '-dark'] + ', ' + colors[this.selectedWorkspace.getColor()] + ')'
      }
    },
    greeting() {
      let result = '';
      const hours = new Date().getHours();
      if (hours > 17 || hours < 5) {
        result += 'Good Evening';
      } else if (hours >= 5 && hours < 10) {
        result += 'Good Morning';
      } else {
        result += 'Hello';
      }
      if(this.$store.state.auth.user) {
        result += ', ' + this.$store.state.auth.user.name.split(' ')[0]
      }
      result += '!';
      return result;
    },
  })
  .vue();
</script>
