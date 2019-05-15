<template>
    <span @click="click" :class="{'text-blue dark:text-blue-light font-bold': isActive, 'text-grey-darkest dark:text-grey border-transparent': !isActive}" class="transition px-4 py-2 flex flex-row items-center cursor-pointer select-none">
        <div :class="{ 'opacity-0': !isActive }" :style="{ transform: !isActive ? 'translateX(25%)' : '' }" class="transition mr-2">
            <slot name="icon"></slot>
        </div>
        <slot></slot>
    </span>
</template>

<script>
import Page from '@/assets/js/Page';

export default new Page('SectionsItem')
  .props({
      link: String,
  })
  .methods({
      click() {
          this.$router.replace({ ...this.$route, query: { ...this.$route.query, view: this.link }})
      }
  })
  .computed({
      isActive() {
          return !['do', 'today', 'all'].includes(this.$route.query.view) ? this.link == 'do' : this.$route.query.view == this.link
      }
  })
  .vue();

</script>
