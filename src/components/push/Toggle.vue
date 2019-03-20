<template>
    <div class="flex flex-row items-center justify-between">
        <div class="-mx-8 px-8 py-3">
            <div class="">Push Notifications</div>
            <div class="text-grey-dark text-sm">
                <span v-if="pushAvailable">
                    Push Notifications are turned {{ pushActivated ? 'on' : 'off' }} on this device.
                </span>
                <span v-else>
                    Push Notifications are not supported on this device.
                </span>
            </div>
        </div>
        <switchbox @click="pushClick" :value="pushActivated" :disabled="!pushAvailable"></switchbox>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('SwitchBox')
    .actions({
        activatePush: 'push/activate',
        deactivatePush: 'push/deactivate'
    })
    .state({
        pushActivated: state => state.push.activated,
        pushAvailable: state => state.push.available,
    })
    .methods({
        async pushClick() {
            if(this.pushActivated) {
                return await this.deactivatePush()
            } else {
                try {
                    await this.activatePush()
                    this.$emit('activate')
                    this.$store.dispatch('events/success', { message: 'Push Notifications Activated' })
                } catch(error) {

                }
            }
        }
    })
    .vue()
</script>
