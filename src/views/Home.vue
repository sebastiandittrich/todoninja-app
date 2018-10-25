<template>
  <transition name="scale">
    <div>

      <greeting class="rounded-lg m-2 shadow-lg"></greeting>
      <sections-bar></sections-bar>

      <div class="stacking overflow-hidden">
        <transition :name="transition">
          <keep-alive>
            <router-view class="pb-32"></router-view>
          </keep-alive>
        </transition>
      </div>

      <navigation-bar></navigation-bar>

    </div>
  </transition>
</template>

<script>
import Page from '@/assets/js/Page';
import auth from '@/assets/js/traits/auth';

const p = new Page()
  .with('Greeting', 'sections/Bar', 'tasks/List', 'navigation/Bar')
  .data(() => ({
    transition: 'opacity-slide-right'
  }))
  .watch('$route', function(to, from) {
    console.log(from)
    if(from.name == 'Tasks.Do') {
      this.transition = 'opacity-slide-left'
    } else if(from.name == 'Tasks.All') {
      this.transition = 'opacity-slide-right'
    } else if(from.name == 'Tasks.Today') {
      if(to.name == 'Tasks.Do') {
        this.transition = 'opacity-slide-right'
      } else if(to.name == 'Tasks.All') {
        this.transition = 'opacity-slide-left'
      }
    }
  })
  .use(auth)
  .vue();

  console.log(p)

  export default p
</script>
