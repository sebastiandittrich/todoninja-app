<template>
    <transition name="opacity">
        <div class="md:overflow-auto md:bg-grey-lighter text-black" style="display: grid; grid-template: 'content' 1fr 'footer' auto / auto">
            <div class="md:my-8 bg-white md:rounded-lg md:shadow-lg container mx-auto md:max-w-2/3 lg:max-w-1/2 md:self-center" style="grid-area: content">
                <transition name="opacity" mode="out-in">
                    <component :is="currentStep" @next="next" @previous="previous" @done="done"></component>
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
import { store, themeColor } from '@/mixins'

const steps = [ 'welcome', 'inboxintro', 'workspacesintro', 'states', 'do', 'postponed', 'calendar', 'waiting', 'ready' ]
const components = steps.reduce((components, step) => ({ ...components, [step]: () => import(`@c/tutorial/${step}`) }), {})

export default {
    components: { ...components },
    mixins: [
        themeColor('white'),
        store({
            mutations: {
                _next: 'tutorial/next',
                _previous: 'tutorial/previous',
                _done: 'tutorial/skip',
            },
            getters: {
                step: 'tutorial/step'
            },
        })
    ],
    data: () => ({
        steps,
    }),
    computed: {
        currentStep() {
            return this.steps[this.step]
        }
    },
    methods: {
        next() {
            if(this.step + 1 < this.steps.length) {
                this._next()
            } else {
                this.done()
            }
        },
        previous() {
            if(this.step > 0) {
                this._previous()
            }
        },
        done() {
            this._done()
            this.$router.replace('/')
        }
    }
}
</script>

<style>

</style>
