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
        modal_number: null
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
            console.log('in route watcher')
            if(to.query.modals < this.modal_number) {
                console.log('in it')
                this.hide()
            }
        },
        'state.show': function(to, from, ...args) {
            if(to === true) {
                if(from != to) {
                    console.log('showed modal')
                    this.$store.commit('modals/increment')
                    console.log('increment modals open')
                    this.modal_number = this.$store.getters['modals/open']
                    console.log('is now:', this.modal_number)
                    this.$router.push({ path: this.$route.path, query: { ...this.$route.query, modals: this.modal_number } })
                }
                this.onShow ? this.onShow(...args) : null
            } else {
                if(from != to) {
                    console.log('hide modal')
                    this.$store.commit('modals/decrement')
                    console.log('decrement modals, is now:', this.$store.getters['modals/open'])
                    console.log(this.$route.query.modals, this.modal_number)
                    if(this.$route.query.modals >= this.modal_number) {
                        console.log('in it, setting modal_number to null')
                        this.$router.back()
                    }
                    this.modal_number = null
                }
                this.onHide ? this.onHide(...args) : null
            }
        }
    },
}