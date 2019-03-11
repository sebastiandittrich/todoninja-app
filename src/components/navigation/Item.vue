<template>
<div @click="$emit('click', $event)">
    <router-link v-if="link" :to="link" class="router-link cursor-pointer select-none py-2">
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

    .router-link-active .indicator {
        transform: translateY(50%)
    }
    .indicator {
        transform: translateY(100%);
    }
</style>


<script>
    import Page from '@/assets/js/Page'

    export default new Page('NavigationItem')
        .props({
            link: String
        })
        .vue()
</script>