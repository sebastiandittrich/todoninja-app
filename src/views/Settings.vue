<template>
    <transition name="slide-right">
        <div>
            <!-- Header Bar -->
            <div class="bg-grey-lighter p-4 flex flex-row items-center justify-start text-2xl">
                <i class="feather icon-arrow-left" @click="$router.back()"></i>
                <div class="ml-8">Settings</div>
            </div>

            <!-- User -->
            <div class="p-4 pt-8 bg-grey-lighter">
                <div class="flex flex-row items-center justify-start">
                    <div class="rounded-full border-grey-light border-2 overflow-hidden h-16 w-16 flex items-center justify-center bg-white mr-8">
                        <img src="/img/logo.svg" class="h-8">
                    </div>
                    <div class="flex flex-col">
                        <div class="font-bold">
                            {{ user.name }}
                        </div>
                        <div class="text-grey-darker">
                            {{ user.email }}
                        </div>
                    </div>
                </div>
                <div class="flex flex-row justify-end">
                    <div @click="logoutClick" class="button-red">Logout</div>
                </div>
            </div>

            <!-- Workspaces -->
            <div class="m-4 mt-8 mx-0">
                <div class="mx-4 flex flex-row items-center justify-between">
                    <div class="font-bold">
                        Workspaces
                    </div>
                    <div class="text-blue font-light" @click="showModal('workspaces-picker')">
                        Manage
                        <i class="feather icon-chevron-right"></i>
                    </div>
                </div>
                <div class="flex flex-row items-center justify-start mt-4 overflow-x-auto pb-2">
                    <div v-for="workspace of workspaces" :key="workspace.id" class="rounded-lg p-2 border-grey-lighter border-2 ml-4 -mr-2 whitespace-no-wrap">
                        {{ workspace.name }}
                    </div>
                </div>
            </div>
            <workspaces-picker :value="null" manage @hide="hideModal('workspaces-picker')" :state="modalState('workspaces-picker')"></workspaces-picker>

            <!-- Tags -->
            <div class="m-4 mt-8 mx-0">
                <div class="mx-4 flex flex-row items-center justify-between">
                    <div class="font-bold">
                        Tags
                    </div>
                    <div class="font-light" :class="tags_remove ? 'text-green' : 'text-blue'" @click="tags_remove = !tags_remove">
                        <i v-if="tags_remove" class="feather icon-check"></i>
                        {{ tags_remove ? 'Done' : 'Delete some tags' }}
                        <i v-if="!tags_remove" class="feather icon-chevron-right"></i>
                    </div>
                </div>
                <div class="overflow-x-auto mt-4">
                    <tags-picker :value="[]" class="ml-4" :remove="tags_remove"></tags-picker>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'

export default new Page()
    .with('tags/Picker')
    .use( hasModals({ 'workspaces-picker': 'workspaces/Picker' }) )
    .state({
        user: state => state.auth.user
    })
    .actions({
        logout: 'auth/logout'
    })
    .getters({
        workspaces: 'workspaces/list',
        tags: 'tags/list'
    })
    .data(() => ({
        tags_remove: false,
    }))
    .methods({
        async logoutClick() {
            await this.logout()
            this.$router.push('/')
        }
    })
    .vue()
</script>

<style>

</style>
