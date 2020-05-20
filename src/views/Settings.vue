<template>
    <transition name="opacity-slide-up">
        <div class="bg-grey-lighter dark:bg-grey-darker overflow-auto">
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
                        <div class="rounded-full border-grey-light dark:border-grey-dark border-2 overflow-hidden h-16 w-16 flex items-center justify-center bg-white dark:bg-grey mr-8">
                            <img src="/img/logo.svg" class="h-8">
                        </div>
                        <div class="flex flex-col">
                            <div class="font-bold">
                                {{ user.name }}
                            </div>
                            <div class="text-grey-darker dark:text-grey-lighter">
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
                        <div class="text-blue dark:text-blue-light font-light cursor-pointer select-none" @click="showModal('workspaces-picker')">
                            Manage
                            <i class="feather icon-chevron-right"></i>
                        </div>
                    </div>
                    <div class="my-4">
                        <div class="flex flex-row items-center justify-start flex-wrap -mt-2">
                            <div v-for="workspace of workspaces" :key="workspace.id" class="rounded-lg p-2 dark:text-grey-lighter border-grey-lighter dark:border-grey-darker border-2 mr-2 mt-2 whitespace-no-wrap">
                                {{ workspace.name }}
                            </div>
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
                        <div class="font-light cursor-pointer select-none" :class="tags_remove ? 'text-green' : 'text-blue dark:text-blue-light'" @click="tags_remove = !tags_remove">
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

            <settings-card title="Design" class="mt-8">
                <div class="flex flex-row items-center justify-between -mx-8 px-8 py-3" @click="setDark(!dark)">
                    <div>
                        <div class="">Dark mode</div>
                        <div class="text-grey-dark text-sm">
                            Turn everything black!
                        </div>
                    </div>
                    <switchbox :value="dark"></switchbox>
                </div>
            </settings-card>

            <settings-card title="Notifications" class="mt-8">
                <push-toggle></push-toggle>
            </settings-card>

            <settings-card title="Info" class="mt-8">
                <router-link to="/stats">
                    <div class="-mx-8 px-8 py-3">Statistics</div>
                </router-link>
                <a target="_blank" href="https://gitlab.com/ninja-labs/todoninja-v2/blob/master/CHANGELOG.md">
                    <div class="-mx-8 px-8 py-3">Changelog</div>
                </a>
                <div class="-mx-8 px-8 py-3 cursor-pointer select-none">
                    <div class="">Version</div>
                    <div class="text-grey-dark text-sm">You are using version {{ version }}</div>
                </div>
            </settings-card>

            <settings-card title="About" class="mt-8 mb-32">
                <a target="_blank" href="https://owner.todoninja.de" class="block -mx-8 px-8 py-3 cursor-pointer select-none">
                    <div class="">Sebastian Dittrich</div>
                    <div class="text-grey-dark text-sm">The developer of this application</div>
                </a>
            </settings-card>

            <navigation-bar></navigation-bar>

        </div>
    </transition>
</template>

<script>
import { hasModals, store, themeColor } from '@/mixins'

import TagsPicker from '@c/tags/Picker'
import SettingsCard from '@c/settings/Card'
import PushToggle from '@c/push/Toggle'
import WorkspacesPicker from '@c/workspaces/Picker'
import Switchbox from '@c/SwitchBox'

export default {
    components: { TagsPicker, SettingsCard, PushToggle, Switchbox },
    mixins: [
        themeColor({ dark: 'grey-darker', light: 'grey-lighter' }),
        hasModals({ WorkspacesPicker }),
        store({
            state: {
                user: state => state.auth.user || {},
            },
            mutations: {
                setDark: 'theme/setDark',
            },
            actions: {
                logout: 'auth/logout',
            },
            getters: {
                workspaces: 'workspaces/list',
                tags: 'tags/list',
                dark: 'theme/isDark',
            },
        })
    ],
    data: () => ({
        tags_remove: false,
    }),
    computed: {
        version() {
            return JSON.parse(unescape(process.env.PACKAGE_JSON || '%7Bversion%3A0%7D')).version
        },
    },
    methods: {
        resetStore() {
            this.$store.commit('workspaces/setCurrent', null)
            this.$store.commit('theme/setDark', false)
            this.$store.commit('push/setDontAsk', false)
            this.$store.commit('tutorial/setDone', false)
            this.$store.commit('tutorial/setStep', 0)
        },
        async logoutClick() {
            await this.$store.dispatch('push/deactivate')
            await this.logout()
            this.resetStore()
            window.location.reload()
        },
    },
}
</script>

<style>

</style>
