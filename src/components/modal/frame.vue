<template>
    <transition name="modal">
        <div v-show="show">
            <div class="h-full w-full bg-black opacity-50 absolute pin dimmer" @click="$emit('hide')"></div>
            <div class="bg-white rounded-t-lg absolute pin-b pin-x content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template> 

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .props('show')
    .vue()
</script>