import Modal from '@c/modal/frame'
import Headline from '@c/modal/header'
import Actions from '@c/modal/actions'
import Action from '@c/modal/action'
import Cancel from '@c/modal/cancel-action'

export default {
    components: {
        Modal, Headline, Actions, Action, Cancel,
    },
    data: () => ({
        modal_number: null,
    }),
    props: {
        state: Object
    },
    methods: {
        hide() {
            this.$emit('hide')
        }
    },
    watch: {
        '$route': function(to, from) {
            // (On back button clicked)
            // Hide modal if currently open modals number is lower than this modal number
            if((to.query.modals || 0) < this.modal_number) {
                this.hide()
            }
        },
        'state.show': function(to, from, ...args) {
            if(to === true) {
                if(from != to) {
                    this.$store.commit('modals/increment')
                    this.modal_number = this.$store.getters['modals/open']
                    
                    // Keep all other parameters in route
                    this.$router.softPush({ query: { modals: this.modal_number } })
                }
                this.onShow ? this.onShow(...args) : null
            } else {
                if(from != to) {
                    // (Closed within UI or programmatically)
                    this.$store.commit('modals/decrement')

                    // Go back to keep back button working if not closed using back button
                    if(this.$route.query.modals >= this.modal_number) {
                        this.$router.back()
                    }
                    
                    this.modal_number = null
                }

                this.onHide ? this.onHide(...args) : null
            }
        }
    },
}