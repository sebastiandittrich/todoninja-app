import Modal from '@/components/modal/frame'
import Headline from '@/components/modal/header'
import Actions from '@/components/modal/actions'
import Action from '@/components/modal/action'
import Cancel from '@/components/modal/cancel-action'

export default {
    components: {
        Modal, Headline, Actions, Action, Cancel,
    },
    props: {
        state: Object
    },
    methods: {
        hide() {
            this.$emit('hide')
        }
    },
    watch: {
        'state.show': function(to, from, ...args) {
            if(to === true) {
                if(from != to) this.$store.commit('modals/increment')
                this.onShow ? this.onShow(...args) : null
            } else {
                if(from != to) this.$store.commit('modals/decrement')
                this.onHide ? this.onHide(...args) : null
            }
        }
    },
}