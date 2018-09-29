<template>
    <div :class="classes" class="flex flex-col items-stretch justify-start">
        <label v-if="name" class="text-xs pt-4 pb-2 text-blue transition-long block" :class="{focused: focused || value.length > 0}">
            {{ focused || value.length > 0 ? name : ' ' }}
        </label>
        <input  @focusin="focused = true"
                @focusout="focused = false"
                v-bind:value="value" @input="$emit('input', $event.target.value)"
                @keyup.enter="$emit('press-enter', $event)"
                :type="type"
                :placeholder="focused || value.length > 0 || !name ? placeholder : name"
                :class="iclass"
                class="bg-transparent border-b-2 border-grey-light block focus:border-blue transition"
                :autofocus="autofocus"
                ref="input">
    </div>
</template>

<style scoped>

    label:not(.focused) {
        color: #dae1e7;
    }

</style>

<script>
export default {
  props: ['name', 'type', 'value', 'placeholder', 'classes', 'iclass', 'autofocus'],
  data() {
    return {
      focused: false,
    };
  },
  methods: {
      focus() {
          this.$nextTick(() => this.$refs.input.focus())
      }
  },
};
</script>
