<template>
<div @click="$emit('click', $event)">
    <router-link v-if="link" :to="link" class="router-link cursor-pointer select-none py-2 block">
        <slot></slot>
    </router-link>
    <div v-else class="cursor-pointer select-none py-2">
        <slot></slot>
    </div>
</div>
</template>

<style scoped>
    .router-link.router-link-active {
        @apply text-blue;
    }

    #app.dark .router-link.router-link-active {
         @apply text-blue-light
    }

    .router-link-active .indicator {
        transform: translateY(50%)
    }
    .indicator {
        transform: translateY(100%);
    }
</style>


<script>
export default {
    props: {
        link: String
    }
}
</script>