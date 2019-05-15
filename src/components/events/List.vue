<template>
    <transition-group name="list-up" class="flex flex-col items-center justify-center">
        <div v-for="event of events" :key="event.id" :class="'bg-' + event.color + '-lightest text-' + event.color" class="rounded-full shadow-md px-4 py-2 flex flex-row items-center mb-4 font-bold">
            <i v-if="event.icon" :class="event.icon" class="mr-2"></i> {{ event.message }} <div v-for="action of event.actions" :key="action.name" :class="`text-${event.color}-darkest`" class="uppercase tracking-wide ml-4 cursor-pointer select-none" @click="actionClick(action, event)">{{ action.name }}</div>
        </div>
        <div v-if="isLoading" key="loader" class="bg-blue-lightest text-blue rounded-full shadow-md px-4 py-2 flex flex-row items-center mb-4 font-bold">
            <Loader loading color="#45547c"></Loader>
        </div>
    </transition-group>
</template>

<script>
import loading from '@/mixins/loading'
import store from '@/mixins/store'
import sameWatcher from '@/mixins/sameWatcher'

const services = ['tasks', 'workspaces', 'tags', 'users']
const actions = [ 'Find', 'Create', 'Get', 'Patch', 'Remove', 'Update' ]
const errors = []
const pendings = []

for(let service of services) {
    for(let action of actions) {
        errors.push(`$store.state.${service}.errorOn${action}`)
        pendings.push(`$store.state.${service}.is${action}Pending`)
    }
}

export default {
    mixins: [
        loading,
        store({
            getters: {
                events: 'events/list'
            },
            actions: {
                addError: 'events/error'
            }
        }),
        sameWatcher(errors, function(to, from) {
            if(to) {
                this.addError({
                    message: 'Something went wrong.',
                })
            }
        })
    ],
    data: () => ({
        _timeout: null,
        isLoading: false
    }),
    methods: {
        actionPending(service, action) {
            return this.$store.state[service]['is' + action + 'Pending']
        },
        servicePending(service) {
            for(let action of actions) {
                if(this.actionPending(service, action)) {
                    return true
                }
            }
            return false
        },
        async actionClick(action, event) {
            await action.click()
            event.show = false
        }
    },
    computed: {
        isPending() {
            for(let service of services) {
                if(this.servicePending(service)) {
                    return true
                }
            }
            return false
        },
    },
    watch: {
        isPending: function(newval) {
            if(newval) {
                this._timeout = setTimeout(() => {
                    if(this.isPending) {
                        this.isLoading = true
                    }
                }, 500)
            } else {
                clearTimeout(this._timeout)
                this.isLoading = false
            }
        }
    }
}
</script>

<style>

</style>
