<template>
    <div>
        <div class="fixed pin-b pin-x bg-white flex flex-row justify-around items-center text-xl px-2 py-3 text-grey-dark rounded-t-lg nav-bar">
            <navigation-item @click="showModal('workspaces-picker')">
                <div class="stacking">
                    <i class="feather icon-home"></i>
                    <div v-if="workspaceFilterActive" class="w-2 h-2 bg-blue rounded-full -mt-2 -mr-1" style="justify-self: end"></div>
                </div>
            </navigation-item>
            <navigation-item @click="showModal('filter-modal')">
                <div class="stacking">
                    <i class="feather icon-filter"></i>
                    <div v-if="filterActive" class="w-2 h-2 bg-blue rounded-full -mt-2 -mr-1" style="justify-self: end"></div>
                </div>
            </navigation-item>
            <navigation-item @click="showModal('search-modal')">
                <div class="stacking">
                    <i class="feather icon-search"></i>
                    <div v-if="searchActive" class="w-2 h-2 bg-blue rounded-full -mt-2 -mr-1" style="justify-self: end"></div>
                </div>
            </navigation-item>
            <navigation-item link="/tasks/create" class="add-icon transition">
                <i class="feather icon-plus text-white p-3 rounded-full bg-blue -mt-8 -mx-3"></i>
            </navigation-item>
            <navigation-item link="/settings">
                <i class="feather icon-settings"></i>
            </navigation-item>
        </div>
        <workspaces-picker :value="activeWorkspace" @input="changeWorkspace" :state="modalState('workspaces-picker')" @hide="hideModal('workspaces-picker')"></workspaces-picker>
        <filter-modal :state="modalState('filter-modal')" @hide="hideModal('filter-modal')"></filter-modal>
        <search-modal ref="searchmodal" :state="modalState('search-modal')" @hide="hideModal('search-modal')"></search-modal>
    </div>
</template>

<style scoped>
    .nav-bar {
        filter: drop-shadow(0px 0px 50px rgba(0,0,0,0.11));
    }
    .add-icon {
        filter: drop-shadow(0px 10px 10px hsl(224, 28%, 38%));
    }
</style>


<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'
import _ from 'lodash'

export default new Page('NavigationBar')
    .with('navigation/Item')
    .use( hasModals({ 'workspaces-picker': 'workspaces/Picker', 'filter-modal': 'filter/Modal', 'search-modal': 'search/Modal' }) )
    .computed({
        activeWorkspace() {
            const filter = this.$store.state.tasks.currentFilter
            if(filter && filter.query && filter.query.workspaceId) {
                return filter.query.workspaceId
            } else {
                return null
            }
        },
        workspaceFilterActive() {
            const filter = this.$store.state.tasks.currentFilter
            if(filter && filter.query && filter.query.workspaceId) {
                return true
            } else {
                return false
            }
        },
        searchActive() {
            return !!_.get(this, '$store.state.tasks.currentFilter.$meta.search.active')
        },
        filterActive() {
            return !!_.get(this, '$store.state.tasks.currentFilter.$meta.filter.active')
        }
    })
    .methods({
        changeWorkspace(id) {
            // if(id != undefined) {
            //     this.$store.commit('tasks/setCurrentFilter', { path: 'query.workspaceId', value: id})
            // } else {
            //     this.$store.commit('tasks/removeCurrentFilter', { path: 'query.workspaceId' })
            // }
        }
    })
    .created(vue => window.bar = vue)
    .vue()
</script>
