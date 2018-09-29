<template>
    <router-link :to="link" class="sections-item text-xl cursor-pointer py-2 flex flex-row items-center font-light text-grey-darkest transition">
        <slot></slot>
    </router-link>
</template>

<script>
import Page from '@/assets/js/Page';

export default new Page('SectionsItem')
  .props({
      link: String
  })
  .vue();

</script>
