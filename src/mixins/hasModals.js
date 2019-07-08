function convertname(name) {
    return name.replace(/(?!^)([A-Z])/g, (_, s) => `-${s}`).toLowerCase()
}

const modalfactory = () => ({ show: false, position: {x: 0, y: 0}, unwatchers: [], number: null, navigating: false })

export default function(modalsargs, more = []) {
    return { 
        components: modalsargs,
        data: () => {
            const modals = {}

            for(const modalname in modalsargs) {
                modals[convertname(modalname)] = modalfactory()
            }

            for(const modalname of more) {
                modals[convertname(modalname)] = modalfactory()
            }
            
            return { modals }
        },
        methods: {
            modalState(name) {
                return Object.keys(this.modals).includes(name) ? this.modals[name] : null
            },
            hideModal(name) {
                const modal = this.modals[name]

                if(modal.show) {
                    modal.show = false

                    this.$store.commit('modals/decrement')

                    if(this.$route.query.modals >= modal.number) {
                        modal.navigating = true
                        this.$watch(() => this.$route, () => modal.navigating = false)
                        this.$router.back()
                    }
                }

                modal.number = null
            },
            async showModal(name, $event = {}) {
                return new Promise(resolve => {
                    const modal = this.modals[name]

                    this.$store.commit('modals/increment')

                    this.$set(modal, 'data', $event.data)
                    modal.position.x = $event.clientX
                    modal.position.y = $event.clientY
                    modal.number = this.$store.getters['modals/open']
                    modal.show = true

                    this.$router.softPush({ query: { modals: modal.number } })
    
                    var unwatcher = null
                    unwatcher = this.$watch(() => !modal.show && !modal.navigating, hidden => {
                        if(hidden) {
                            unwatcher()
                            resolve()
                        }
                    })
                })
            },
        },
        watch: {
            '$route': function(to, from) {
                for(const name in this.modals) {
                    const modal = this.modals[name]
                    // (On back button clicked)
                    // Hide modal if currently open modals number is lower than this modal number
                    if((to.query.modals || 0) < modal.number) {
                        this.hideModal(name)
                    }
                }
            },
        }
    }
}