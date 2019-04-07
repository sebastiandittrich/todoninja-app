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
            <div class="container mx-auto stacking pb-32">
                <transition name="opacity-slide-up">
                    <tasks-placeholder v-if="query.length <= 0" image="/img/search.svg">
                        Find any task you need.
                        <div slot="subtitle">Enter a search term to get started!</div>
                    </tasks-placeholder>
                    <tasks-placeholder v-else-if="tasks.length <= 0" image="/img/empty.svg">
                        Nothing found :(
                        <div slot="subtitle">Try to find a better search term!</div>
                    </tasks-placeholder>
                    <transition-group v-else name="list">
                        <div v-for="workspaceId of groups" :key="workspaceId || 'null'">
                            <div class="mx-4 mt-8 mb-4 font-bold flex flex-row items-center justify-between" :class="`text-${workspace(workspaceId).readableColor()}`">
                                <div>
                                    <i class="feather icon-home mr-2"></i>
                                    {{ workspace(workspaceId).name }}
                                </div>
                                <div v-if="currentWorkspace.id === workspaceId" class="font-light ml-2">
                                    (Current)
                                </div>
                            </div>
                            <tasks-list :filter="false" :tasks="grouped[workspaceId]"></tasks-list>
                        </div>
                    </transition-group>
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'
import Fuse from 'fuse.js'
import _ from 'lodash'

export default new Page()
    .with('inputt', 'tasks/List', 'tasks/Placeholder')
    .data(() => ({
        fuse: null,
        fetched: []
    }))
    .props({
        query: {
            type: String,
            default: ''
        }
    })
    .getters({
        _tasks: 'tasks/list',
        workspace: 'workspaces/getWithStandard',
        currentWorkspace: 'workspaces/current',
    })
    .actions({
        find: 'tasks/find',
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
        },
        async fetchFromServer() {
            console.log()
            if(!this.query || this.query.trim().length < 1) {
                return this.fetched = []
            }

            const likequery = '%' + this.query.split('').join('%') + '%'

            this.fetched = (await this.find({ query: { title: { $like: likequery } }, pagination: false })).data
        }
    })
    .computed({
        tasks() {
            console.log(this.fetched)
            if(!this.fuse) {
                return _.uniqBy([...this._tasks, ...this.fetched], 'id')
            }
            return _.uniqBy([...this.fuse.search(this.query), ...this.fetched], 'id')
        },

        grouped() {
            return _.groupBy(this.tasks, task => task.workspace.id)
        },

        groups() {
            // Object.keys returns an array of strings
            const groupnames = Object.keys(this.grouped).map(id => id === 'null' ? null : Number(id))
            return _.orderBy(groupnames, [ id => id === this.currentWorkspace.id ? 0 : 1 ])
        }
    })
    .created(vue => {
        vue.initFuse()
        vue.focus()
        vue.fetchFromServer()
    })
    .watch('query', 'fetchFromServer')
    .vue()
</script>

<style>

</style>
