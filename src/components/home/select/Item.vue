<template>
    <div @click="$emit('click', $event)" :class="{ 'font-bold': active, 'text-grey-darkest dark:text-grey': !active }" class="px-4 py-2 cursor-pointer select-none flex flex-row items-center transition">
        <div :class="{ 'opacity-0': !active }" :style="{ transform: !active ? 'translateX(25%)' : '' }" class="text-blue dark:text-blue-light transition mr-4">
            <slot name="icon"></slot>
        </div>
        <span class="transition">
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        active: { type: Boolean, default: false }
    }
}
</script>

<style>

</style>
