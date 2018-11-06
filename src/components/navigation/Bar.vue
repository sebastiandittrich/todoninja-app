<template>
    <div>
        <div class="fixed pin-b pin-x bg-white flex flex-row justify-around items-center text-xl px-2 py-3 text-grey-dark rounded-t-lg nav-bar">
            <navigation-item @click="showModal('workspaces-picker')">
                <div style="display: grid; grid-"></div>
                <i class="feather icon-home"></i>
                <i class="w-1 h-1 rounded-full bg-blue"></i>
            </navigation-item>
            <navigation-item>
                <i class="feather icon-filter"></i>
            </navigation-item>
            <navigation-item>
                <i class="feather icon-search"></i>
            </navigation-item>
            <navigation-item link="/tasks/create" class="add-icon transition">
                <i class="feather icon-plus text-white p-3 rounded-full bg-blue -mt-8 -mx-3"></i>
            </navigation-item>
            <navigation-item link="/settings">
                <i class="feather icon-menu"></i>
            </navigation-item>
        </div>
        <workspaces-picker :value="activeWorkspace" @input="changeWorkspace" :state="modalState('workspaces-picker')" @hide="hideModal('workspaces-picker')"></workspaces-picker>
    </div>
</template>

<style scoped>
    .nav-bar {
        filter: drop-shadow(0px 0px 50px rgba(0,0,0,0.11));
    }
    .add-icon {
        filter: drop-shadow(0px 10px 10px hsl(224, 28%, 38%));
        /* color: hsl(224, 28%, 38%);
        background: hsl(224, 20%, 85%);
        padding: 0.5rem;
        border-radius: 100%;
        width: 3rem;
        height: 3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center; */
    }
</style>


<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'

export default new Page('NavigationBar')
    .with('navigation/Item')
    .use( hasModals({ 'workspaces-picker': 'workspaces/Picker' }) )
    .data(() => ({
        activeWorkspace: null
    }))
    .methods({
        changeWorkspace(id) {
            this.activeWorkspace = id
            if(id != undefined) {
                this.$store.commit('tasks/setCurrentFilter', { path: 'query.workspaceId', value: id})
            } else {
                this.$store.commit('tasks/removeCurrentFilter', { path: 'query.workspaceId' })
            }
        }
    })
    .vue()
</script>
