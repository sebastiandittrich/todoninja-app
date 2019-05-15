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
import isModal from '@/mixins/isModal'
import colors from '@/assets/js/Colors'

import PushToggle from '@c/push/Toggle'

export default {
    components: { PushToggle },
    mixins: [ isModal ],
    methods: {
        neverClick() {
            this.$store.commit('push/neverAskAgain')
            this.hide()
        }
    }
}
</script>