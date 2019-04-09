<template>
    <transition name="opacity-slide-up">
        <div class="bg-grey-lighter">
            <!-- Header Bar -->
            <div>
                <div class="p-4 flex flex-row items-center justify-start text-2xl mx-auto container">
                    <i @click="$router.back()" class="feather icon-arrow-left cursor-pointer select-none"></i>
                    <div class="ml-8">Settings</div>
                </div>
            </div>

            <!-- User -->
            <div>
                <div class="mx-auto container p-4 pt-8">
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
            </div>

            <settings-card>
                <!-- Workspaces -->
                <div class="">
                    <div class="flex flex-row items-center justify-between">
                        <div class="font-bold">
                            Workspaces
                        </div>
                        <div class="text-blue font-light cursor-pointer select-none" @click="showModal('workspaces-picker')">
                            Manage
                            <i class="feather icon-chevron-right"></i>
                        </div>
                    </div>
                    <div class="flex flex-row items-center justify-start mt-4 horizontal-scrolling pb-2 -mx-8">
                        <div v-for="workspace of workspaces" :key="workspace.id" class="rounded-lg p-2 border-grey-lighter border-2 ml-8 -mr-6 whitespace-no-wrap">
                            {{ workspace.name }}
                        </div>
                    </div>
                </div>
                <workspaces-picker :value="null" manage @hide="hideModal('workspaces-picker')" :state="modalState('workspaces-picker')"></workspaces-picker>

                <!-- Tags -->
                <div class="mt-8">
                    <div class="flex flex-row items-center justify-between">
                        <div class="font-bold">
                            Tags
                        </div>
                        <div class="font-light cursor-pointer select-none" :class="tags_remove ? 'text-green' : 'text-blue'" @click="tags_remove = !tags_remove">
                            <i v-if="tags_remove" class="feather icon-check"></i>
                            {{ tags_remove ? 'Done' : 'Delete some tags' }}
                            <i v-if="!tags_remove" class="feather icon-chevron-right"></i>
                        </div>
                    </div>
                    <div class="mt-4 -mx-8">
                        <tags-picker :value="[]" class="pl-8" :remove="tags_remove"></tags-picker>
                    </div>
                </div>
            </settings-card>

            <settings-card title="Notifications" class="mt-8">
                <push-toggle></push-toggle>
            </settings-card>

            <settings-card title="Info" class="mt-8 mb-32">
                <a target="_blank" href="https://gitlab.com/ninja-labs/todoninja-v2/blob/master/CHANGELOG.md">
                    <div class="-mx-8 px-8 py-3 active:bg-grey-lightest">Changelog</div>
                </a>
                <div class="-mx-8 px-8 py-3 cursor-pointer select-none active:bg-grey-lightest">
                    <div class="">Version</div>
                    <div class="text-grey-dark text-sm">You are using version {{ version }}</div>
                </div>
            </settings-card>

        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'

export default new Page()
    .with('tags/Picker', 'settings/Card', 'push/Toggle')
    .use( hasModals({ 'workspaces-picker': 'workspaces/Picker' }) )
    .state({
        user: state => state.auth.user,
    })
    .actions({
        logout: 'auth/logout',
    })
    .getters({
        workspaces: 'workspaces/list',
        tags: 'tags/list',
    })
    .data(() => ({
        tags_remove: false,
    }))
    .computed({
        version() {
            return JSON.parse(unescape(process.env.PACKAGE_JSON || '%7Bversion%3A0%7D')).version
        },
    })
    .methods({
        async logoutClick() {
            await this.logout()
            window.location.reload()
        },
    })
    .vue()
</script>

<style>

</style>
