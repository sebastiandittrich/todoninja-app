<template>
    <div class="bg-red-lightest rounded-lg text-red p-4" v-show="error">
        <div class="font-bold">
            {{ header }}
        </div>
        <div class="mt-4 text-red-darker">
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
  props: ['error'],
  computed: {
    header() {
      return this.error ? this.error.header : '';
    },
    message() {
      return this.error ? this.error.message : '';
    },
  },
};
</script>
