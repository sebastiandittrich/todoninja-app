import Modal from '@c/modal/frame'
import Headline from '@c/modal/header'
import Actions from '@c/modal/actions'
import Action from '@c/modal/action'
import Cancel from '@c/modal/cancel-action'

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
        },
    },
    beforeDestroy() {
        this.hide()
    },
    watch: {
        'state.show': function(to, from, ...args) {
            if(to === true) {
                this.onShow ? this.onShow(...args) : null
            } else {
                this.onHide ? this.onHide(...args) : null
            }
        }
    },
}