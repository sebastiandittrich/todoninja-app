import hasModals from '@/mixins/hasModals';

import PushModal from '@c/push/Modal'

export default {
    mixins: [ hasModals({ PushModal }) ],
    methods: {
        async requirePush() {
            if(!this.$store.state.push.activated && this.$store.getters['push/shouldAsk']) {
                await this.showModal('push-modal')
            }
        }
    }
}

