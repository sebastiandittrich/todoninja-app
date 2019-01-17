<template>
  <transition name="opacity-slide-down">
    <div class="bg-red-lightest rounded-lg text-red p-4" :class="emphasize ? 'emphasize' : ''" v-if="error">
        <div class="font-bold">
            {{ header }}
        </div>
        <div class="mt-4 text-red-darker">
            {{ message }}
        </div>
    </div>
  </transition>
</template>

<style scoped>
  @keyframes emphasize {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  .emphasize {
    animation: emphasize 0.82s cubic-bezier(.36,.07,.19,.97) both;
    perspective: 1000px;
    transform: translate3d(0,0,0);
    backface-visibility: hidden;
  }
</style>


<script>
export default {
  props: ['error'],
  data: () => ({
    emphasize: false
  }),
  methods: {
    shake() {
      this.emphasize = true
      setTimeout(() => this.emphasize = false, 820)
    }
  },
  computed: {
    header() {
      return this.error ? this.error.header : '';
    },
    message() {
      return this.error ? this.error.message : '';
    },
  },
  watch: {
    error: function(to, from) {
      if(from) {
        this.shake()
      }
    }
  }
};
</script>
