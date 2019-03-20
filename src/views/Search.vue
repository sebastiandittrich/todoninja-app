<template>
    <transition name="opacity-slide-up">
        <div>
            <div class="px-4 py-4 shadow-md text-grey-darker bg-white sticky pin-t pin-x">
                <div class="container mx-auto flex flex-row items-center ">
                    <i @click="$router.back()" class="feather icon-arrow-left text-2xl mr-4 cursor-pointer"></i>
                    <inputt ref="searchinputt" iclass="border-none" class="inline-flex w-full" @input="setQuery" :value="query" placeholder="Search for a task..." type="text"></inputt>
                    <i v-if="query.length > 0" @click="setQuery(''); focus()" class="feather icon-x text-grey-darker cursor-pointer"></i>
                </div>
            </div>
            <div class="container mx-auto stacking">
                <transition name="opacity-slide-up">
                    <tasks-list v-if="query.length > 0" class="mt-8" :tasks="tasks"></tasks-list>
                    <tasks-placeholder v-else image="/img/search.svg">
                        Find any task you need.
                        <div slot="subtitle">Enter a search term to get started!</div>
                    </tasks-placeholder>
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'
import Fuse from 'fuse.js'

export default new Page()
    .with('inputt', 'tasks/List', 'tasks/Placeholder')
    .data(() => ({
        fuse: null
    }))
    .props({
        query: {
            type: String,
            default: ''
        }
    })
    .getters({
        _tasks: 'tasks/list'
    })
    .methods({
        focus() {
            if(this.$refs.searchinputt) {
                this.$refs.searchinputt.focus()
            } else {
                setTimeout(this.focus, 0)
            }
        },
        initFuse() {
            this.fuse = new Fuse(this._tasks, { keys: ['title', 'description', 'waiting_for'], shouldSort: true })
        },
        setQuery(query) {
            this.$router.replace('/search/' + encodeURIComponent(query))
        }
    })
    .computed({
        tasks() {
            if(!this.fuse) {
                return this._tasks
            }
            return this.fuse.search(this.query)
        }
    })
    .created(vue => {
        vue.initFuse()
        vue.focus()
    })
    .vue()
</script>

<style>

</style>
