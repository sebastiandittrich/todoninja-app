<template>
    <modal :state="state" @hide="hide">
        <headline>
            Activate push notifications!
        </headline>

        <div class="mx-8 stacking">
            <push-toggle @activate="hide"></push-toggle>
        </div>

        <actions>
            <action @click="neverClick">Never ask again</action>
            <action @click="hide">Skip</action>
        </actions>
    </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'
import colors from '@/assets/js/Colors'

export default new Modal()
    .with('push/Toggle')
    .methods({
        neverClick() {
            this.$store.commit('push/neverAskAgain')
            this.hide()
        }
    })
    .vue()
</script>