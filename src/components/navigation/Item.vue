<template>
<div @click="$emit('click', $event)">
    <router-link v-if="link" :to="link" class="cursor-pointer select-none py-2">
        <slot></slot>
    </router-link>
    <div v-else class="cursor-pointer select-none py-2">
        <slot></slot>
    </div>
</div>
</template>

<script>
    import Page from '@/assets/js/Page'

    export default new Page('NavigationItem')
        .props({
            link: String
        })
        .vue()
</script>