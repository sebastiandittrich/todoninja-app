import Trait from '@/assets/js/Trait';
import hasModals from '@/assets/js/traits/hasModals';

export default new Trait()
    .use(hasModals({ 'push-modal': 'push/Modal' }))
    .methods({
        async requirePush() {
            if(!this.$store.state.push.activated && this.$store.getters['push/shouldAsk']) {
                await this.showModal('push-modal')
            }
        }
    })

