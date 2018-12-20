<template>
    <div class="flex flex-col justify-between items-stretch h-full">
        <div>
            <div class="font-bold m-8 mt-4 mb-4 ml-6">
                Workspaces
            </div>
            <div class="flex flex-col items-stretch justify-start">
                <item v-for="workspace in workspaces" :key="workspace.id" @click="changeWorkspace(workspace.id)" :active="isWorkspaceActive(workspace)">
                    {{ workspace.name }}
                </item>
            </div>
        </div>
        <div>
            <item @click="$router.push('/settings')" icon="feather icon-settings">Settings</item>
        </div>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('item:navigation/SidebarItem')
    .getters({
        workspaces: 'workspaces/list'
    })
    .data(() => ({
        
    }))
    .computed({
        activeWorkspace() {
            const filter = this.$store.state.tasks.currentFilter
            if(filter && filter.query && filter.query.workspaceId) {
                return filter.query.workspaceId
            } else {
                return null
            }
        },
    })
    .methods({
        isWorkspaceActive(workspace) {
            if(this.activeWorkspace === null) {
                return false
            }
            return workspace.id === this.activeWorkspace
        },
        changeWorkspace(id) {
            if(!this.isWorkspaceActive({ id })) {
                this.$store.commit('tasks/setCurrentFilter', { path: 'query.workspaceId', value: id})
            } else {
                this.$store.commit('tasks/removeCurrentFilter', { path: 'query.workspaceId' })
            }
        }
    })
    .vue()
</script>

