<template>
    <div>

        <div v-if="isPositioned">
            <transition name="popup" @after-enter="$emit('after-enter', $event)" @before-enter="$emit('before-enter', $event)">
                <div v-show="state.show" class="z-10 fixed inset-0 stacking items-end md:items-center justify-items-stretch md:justify-items-center">
                    <div class="opacity-25 h-full w-full bg-black dark:bg-white dimmer z-10 cursor-pointer select-none" @click="$emit('hide')"></div>
                    <div @click.stop="" ref="content" class="content shadow-lg rounded-lg fixed bg-white dark:bg-black overflow-hidden z-10" :style="positionedStyle">
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </div>

        <div v-else>
            <transition name="modal" @after-enter="$emit('after-enter', $event)" @before-enter="$emit('before-enter', $event)">
                <div v-if="state.show" class="z-10 fixed inset-0 stacking items-end md:items-center justify-items-stretch md:justify-items-center">
                    <div class="opacity-50 h-full w-full bg-black dark:bg-white dimmer z-10 cursor-pointer select-none" @click="$emit('hide')"></div>
                    <div @click="$emit('hide')" class="max-h-full overflow-auto z-10 content">
                        <div @click.stop="" class="rounded-t-lg md:shadow-lg md:rounded-lg md:m-4 mt-32 bg-white dark:bg-black overflow-hidden">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        
        <slot name="submodals"></slot>
    </div>
</template> 

<script>
import themeColor from '@/mixins/themeColor'
import { color, blend_colors } from '@/assets/js/helpers'

export default {
    mixins: [ 
        themeColor(vue => {
            const base_color = $('meta[data-vmid=themeColor]').prop('content') || '#ffffff'
            const overlay_color = color({ dark: 'white', light: 'black' })
            if(vue.state.show) {
                return blend_colors(base_color, overlay_color, (vue.isPositioned ? 0.25 : 0.5))
            } else {
                return undefined
            }
        })
    ],
    props: {
        state: Object,
        positioned: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isPositioned() {
            return !!this.positioned && (this.state.position.x != undefined && this.state.position.y != undefined)
        },
        contentStyle() {
            if(this.isPositioned) {
                return this.positionedStyle
            } else {
                return this.defaultStyle
            }
        },
        defaultStyle() {
            return {}
        },
        positionedStyle() {
            const elementdims = { width: 0, height: 0 }
            const element = $(this.$refs.content)
            if(element) {
                elementdims.width = element.actual('width')
                elementdims.height = element.actual('height')
            }
            const maxleft = window.innerWidth - elementdims.width - 5
            const maxtop = window.innerHeight - elementdims.height - 5
            const minleft = 5
            const mintop = 5

            const obj =  {
                top: Math.max(Math.min(this.state.position.y, maxtop), mintop) + 'px',
                left: Math.max(Math.min(this.state.position.x - elementdims.width/2, maxleft), minleft) + 'px',
                'max-width': '95%'
            }
            return obj
        }
    },
}
</script>