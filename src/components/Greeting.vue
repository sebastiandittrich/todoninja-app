<template>
    <div class="bg-theme-gradient py-6 text-white text-center text-3xl font-light">
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
      if(this.$store.state.auth.user) {
        result += ', ' + this.$store.state.auth.user.name.split(' ')[0]
      }
      result += '!';
      return result;
    },
  })
  .vue();
</script>
