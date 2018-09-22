<template>
    <div class="bg-theme-gradient py-6 text-white flex flex-row items-center justify-around text-3xl font-light">
        {{ greeting }}
    </div>
</template>

<script>
import Page from '@/assets/js/Page';

export default new Page('Greeting')
  .computed({
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
      result += '!';
      return result;
    },
  })
  .vue();
</script>
