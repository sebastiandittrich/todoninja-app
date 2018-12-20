<template>
    <transition name="opacity-slide-up">
        <div v-if="loading" class="absolute pin-b pin-l bg-blue text-white rounded-full shadow-md m-4 px-4 py-2 flex flex-row items-center">
            <Loader :loading="true" color="#ffffff" class="mr-2"></Loader>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'
import loading from '@/assets/js/traits/loading'

export default new Page()
    .use( loading )
    .data(() => ({
        actions: 'Create Find Get Patch Remove Update'.split(' '),
        _loading: false,
        _timeout: null
    }))
    .computed({
        loading() {
            return this._loading
        },
        isPending() {
            var servicenames = Object.keys(this.$store.state) 

            for(let servicename of servicenames) {
                if(this.servicePending(servicename)) {
                    return true
                }
            }
            return false
        },
    })
    .watch('isPending', function(newval) {
        if(newval) {
            this._timeout = setTimeout(() => {
                if(this.isPending) {
                    this._loading = true
                }
            }, 500)
        } else {
            clearTimeout(this._timeout)
            this._loading = false
        }
    })
    .methods({
        actionPending(service, action) {
            return this.$store.state[service]['is' + action + 'Pending']
        },
        servicePending(service) {
            for(let action of this.actions) {
                if(this.actionPending(service, action)) {
                    return true
                }
            }
            return false
        }
    })
    .vue()
</script>

<style>

</style>
