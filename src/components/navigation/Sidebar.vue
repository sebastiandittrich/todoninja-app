<template>
    <div class="flex flex-col justify-between items-stretch h-full">
        <div>
            <div class="font-bold m-8 mt-4 mb-4 ml-6">
                Workspaces
            </div>
            <div class="flex flex-col items-stretch justify-start">
                <item v-for="workspace in workspaces" :key="workspace.id" @click="changeWorkspace(workspace.id)" :active="isWorkspaceActive(workspace)" :color="workspace.color">
                    {{ workspace.name }}
                </item>
            </div>
            <filter-picker></filter-picker>
        </div>
        <div>
            <item @click="$router.push('/settings')" icon="feather icon-settings">Settings</item>
        </div>
    </div>
</template>

<script>
import store from '@/mixins/store'

import Item from '@c/navigation/SidebarItem'
import FilterPicker from '@c/filter/Picker'

export default {
    components: { Item, FilterPicker },
    mixins: [
        store({
            getters: {
                workspaces: 'workspaces/withStandard',
                activeWorkspace: 'workspaces/current',
                changeWorkspace: 'workspaces/setCurrent'
            },
        })
    ],
    methods: {
        isWorkspaceActive(workspace) {
            return workspace.id === this.activeWorkspace
        },
    }
}
</script>

