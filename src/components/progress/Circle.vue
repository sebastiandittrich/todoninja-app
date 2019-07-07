<template>
    <div class="flex flex-row items-center justify-around">
        <div class="stacking">
            <svg class="progress" :width="radius" :height="radius" :viewBox="`0 0 ${radius} ${radius}`">
                <circle class="progress__meter" :cx="circlePos" :cy="circlePos" :r="innerRadius" :stroke-width="stroke" :style="{ stroke: totalcolor() }" />
                <circle v-for="section of ordered" :key="section.name" class="progress__value" :cx="circlePos" :cy="circlePos" :r="innerRadius" :stroke-width="stroke" :style="{ strokeDasharray: circumference, strokeDashoffset: offset(section), stroke: color(section) }" />
            </svg>
            <transition name="opacity">
                <div v-if="completed" class="flex flex-row items-center justify-center">
                    <i class="feather icon-check" :style="{ 'font-size': innerRadius * (2/3) + 'px' }" :class="'text-' + basecolor"></i>
                </div>
            </transition>
        </div>
        <transition-group v-if="legend" name="list" class="font-xs text-grey-dark ml-8">
            <div v-for="section of [ ...ordered.slice().reverse(), total ]" :key="section.name" class="flex flex-row mt-2">
                <div class="rounded-full w-4 h-4 mr-2" :style="{ background: color(section) || totalcolor() }"></div> {{ section.name }} (<span class="text-black dark:text-white font-bold">{{ section.value }}</span>) 
            </div>
        </transition-group>
    </div>
</template>

<style scoped>

.progress {
	transform: rotate(-90deg);
}

.progress__meter,
.progress__value {
	fill: none;
}

.progress__value {
	stroke-linecap: round;
	transition: stroke-dashoffset 0.5s;
}
</style>


<script>
import _ from 'lodash'
import { theme } from '@/../tailwind.config.js'
const colors = theme.colors

const shades = [
        [ ],
        [ '' ],
        [ '-dark', '-lighter' ],
        [ '-darker', '', '-lighter'],
        [ '-darkest', '-dark', '-light', '-lighter' ],
        [ '-darkest', '-dark', '', '-light', 'lighter' ],
        [ '-darkest', '-darker', '-dark', '', '-light', '-lighter' ]
    ]


export default {
    name: 'progress-circle',
    props: {
        basecolor: {
            type: String,
            default: 'green'
        },
        data: {
            type: Array,
            default: () => []
        },
        total: {
            type: Object,
            default: null
        },
        legend: {
            type: Boolean,
            default: false,
        },
        completed: {
            type: Boolean,
            default: false
        },
        radius: {
            type: Number,
            default: 170
        },
        stroke: {
            type: Number,
            default: 16
        }
    },
    methods: {
        offset (section) {
            const value = this.ordered.slice(this.ordered.indexOf(section)).reduce((added, section) => added + section.value, 0 )
            const progress = value / this.steps
            const dashoffset = this.circumference * Math.max(0, 1 - progress)
        
            return dashoffset
        },
        color(section) {
            return colors[this.basecolor + shades[this.ordered.length].slice().reverse()[this.ordered.indexOf(section)]]
        },
        totalcolor() {
            if(this.$store.getters['theme/isDark']) {
                return colors[this.basecolor + '-darker']
            }
            return colors[this.basecolor + '-lightest']
        }
    },
    computed: {
        ordered() {
            return _.orderBy(this.data.filter(section => section.value >= 0), 'value', 'desc')
        },
        steps() {
            return this.total != null ? this.total.value : this.ordered.reduce((added, section) => section.value + added, 0)
        },
        circlePos () {
            return Math.round(this.radius / 2)
        },
        innerRadius () {
            return Math.round((this.radius - this.stroke) / 2)
        },
        circumference () {
            return 2 * Math.PI * this.innerRadius
        }
    }
}
</script>