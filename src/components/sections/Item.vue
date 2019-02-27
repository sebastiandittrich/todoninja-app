<template>
    <span @click="click" :class="{'router-link-active': isActive}" class="sections-item text-xl cursor-pointer select-none py-2 flex flex-row items-center font-light text-grey-darkest transition">
        <slot></slot>
    </span>
</template>

<script>
import Page from '@/assets/js/Page';

export default new Page('SectionsItem')
  .props({
      link: String
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
