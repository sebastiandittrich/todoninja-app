<template>
    <div :style="gradient" class="py-6 px-4 text-white text-center text-2xl font-light flex flex-col items-center justify-center overflow-hidden">
        <span v-if="!isExtended">{{ greeting }}</span>
        <div v-if="isExtended" class="flex flex-row items-center text-sm text-grey-lighter cursor-pointer select-none" @click="showModal('workspaces-picker', $event)">
            <i class="feather icon-home mr-2 text-base"></i>
            <span class="font-bold">{{ selectedWorkspace.name }}</span>
            <i class="feather icon-chevron-down ml-2 text-base"></i>
        </div>
        <workspaces-picker @hide="hideModal('workspaces-picker')" :state="modalState('workspaces-picker')" :value="selectedWorkspace.id" @input="$store.commit('workspaces/setCurrent', $event, { root: true })"></workspaces-picker>
    </div>
</template>

<script>
import Page from '@/assets/js/Page';
import hasModals from '@/assets/js/traits/hasModals'
import { colors } from '@/../tailwind.js'

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
