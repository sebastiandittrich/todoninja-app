<template>
    <span @click="click" :class="{'text-blue font-bold': isActive, 'text-grey-darkest border-transparent': !isActive}" class="transition px-4 py-2 flex flex-row items-center cursor-pointer select-none">
        <div :class="{ 'opacity-0': !isActive }" :style="{ transform: !isActive ? 'translateX(25%)' : '' }" class="text-blue transition mr-2">
            <slot name="icon"></slot>
        </div>
        <slot></slot>
    </span>
</template>

<script>
export default {
    props: {
        link: String,
    },
    methods: {
        click() {
            this.$router.replace({ ...this.$route, query: { ...this.$route.query, view: this.link }})
        }
    },
    computed: {
        isActive() {
            return !['do', 'today', 'all'].includes(this.$route.query.view) ? this.link == 'do' : this.$route.query.view == this.link
        }
    }
}
</script>
