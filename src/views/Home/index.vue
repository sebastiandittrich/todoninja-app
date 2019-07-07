<template>
  <div>
    <div class="lg:hidden">
      <mobile v-bind="$attrs"></mobile>
    </div>
    <div class="hidden lg:block">
      <desktop v-bind="$attrs"></desktop>
    </div>
  </div>
</template>

<script>
import Desktop from './Desktop'
import Mobile from './Mobile'

export default {
  components: { Mobile, Desktop },  
}
</script>
