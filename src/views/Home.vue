<template>
  <transition name="scale">
    <div>

      <greeting class="rounded-lg m-2 shadow-lg"></greeting>
      <sections-bar></sections-bar>

      <tasks-list class="pb-32"></tasks-list>

      <navigation-bar></navigation-bar>

    </div>
  </transition>
</template>

<script>
import Page from '@/assets/js/Page';
import auth from '@/assets/js/traits/auth';

const p = new Page()
  .with('Greeting', 'sections/Bar', 'tasks/List', 'navigation/Bar')
  .use(auth)
  .created(vue => {
    window.router = vue.$route
  })
  .vue();

  console.log(p)

  export default p
</script>
