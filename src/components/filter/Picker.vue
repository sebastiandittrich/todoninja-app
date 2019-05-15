<template>
    <div class="mx-4 md:mx-6">
        <!-- Filter -->
        <div class="font-bold text-sm md:text-base md:mt-8">Tags</div>
        <div class="overflow-auto -mx-8 md:-mx-6 mt-2">
            <tags-picker class="mx-8 md:mx-6" v-model="tags" hideAddTag></tags-picker>
        </div>

        <!-- State -->
        <div class="font-bold text-sm md:text-base mt-8">State</div>
        <div class="mt-2 overflow-x-auto -mx-8 md:-mx-6 text-grey-darker">
            <div class="flex flex-row items-center justify-start pb-2 mx-8 md:mx-6">
                <div v-for="state of State.states" :key="state.state" @click="stateClick(state)" :class="states.includes(state.state) ? 'border-blue text-white bg-blue' : 'border-grey-lighter md:border-grey'" class="rounded-lg p-2 border-2 mr-2 whitespace-no-wrap transition cursor-pointer select-none">
                    {{ state.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import State from '@/assets/js/State'
import store from '@/mixins/store'

import TagsPicker from '@c/tags/Picker'

export default {
    components: { TagsPicker },
    mixins: [
        store({
            getters: {
                currentWorkspace: 'workspaces/current'
            },
        })
    ],
    props: {
        filters: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        tags: [],
        states: [],
        State,
    }),
    methods: {
        stateClick(state) {
            if(this.states.includes(state.state)) {
                this.states.splice(this.states.indexOf(state.state), 1)
            } else {
                this.states.push(state.state)
            }
        },

        tagsFilter(task) {
            if(this.tags.length < 1) {
                return true
            }
            for(let tag of this.tags) {
                if(task.tags.includes(tag)) {
                    return true
                }
            }
            return false
        },
        stateFilter(task) {
            if(this.states.length < 1) {
                return true
            }
            return this.states.includes(task.state)
        },
    },
    mounted() {
        this.tagsFilter.written_name = 'tags'
        this.stateFilter.written_name = 'state'
        this.filters.push(this.tagsFilter)
        this.filters.push(this.stateFilter)
    },
    watch: {
        'currentWorkspace.id': function() {
            this.state = []
            this.tags = []
        }
    }
}
</script>

<style>

</style>
