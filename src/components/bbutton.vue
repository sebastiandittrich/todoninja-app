<template>
    <div :class="`cursor-pointer select-none text-${this.foreground} font-bold self-center mt-8 bg-${this.background} px-8 py-4 rounded-lg transition stacking items-center ${!loading ? `hover:bg-${this.foreground} hover:text-white` : ''}`" style="display: inline-grid" @click="!loading ? $emit('click', $event) : null">
        <div :class="loading ? 'opacity-25' : ''">
            <slot></slot>
        </div>
        <Loader v-if="loading" class="h-full" :thickness="8" :color="foreground | color"></Loader>
    </div>
</template>

<script>
import { color, dependsOnTheme } from '@/assets/js/helpers'

import Loader from '@c/loader'

export default {
    components: { Loader },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'blue'
        }
    },
    computed: {
        background() {
            return dependsOnTheme({ light: `${this.color}-lightest`, dark: `${this.color}-darker`})
        },
        foreground() {
            return dependsOnTheme({ light: `${this.color}`, dark: `${this.color}-lighter`})
        }
    }
}
</script>