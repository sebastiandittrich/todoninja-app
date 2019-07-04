function convertname(name) {
    return name.replace(/(?!^)([A-Z])/g, (_, s) => `-${s}`).toLowerCase()
}

export default function(modalsargs, more = []) {
    return { 
        components: modalsargs,
        data: () => {
            const modals = {}

            for(const modalname in modalsargs) {
                modals[convertname(modalname)] = { show: false, position: {x: 0, y: 0}, unwatchers: [] }
            }

            for(const modalname of more) {
                modals[convertname(modalname)] = { show: false, position: {x: 0, y: 0}, unwatchers: [] }
            }
            
            return { modals }
        },
        methods: {
            modalState(name) {
                return Object.keys(this.modals).includes(name) ? this.modals[name] : null
            },
            hideModal(name) {
                this.modals[name].show = false
            },
            async showModal(name, $event = {}) {
                return new Promise((resolve) => {
                    this.$set(this.modals[name], 'data', $event.data)
                    this.modals[name].position.x = $event.clientX
                    this.modals[name].position.y = $event.clientY
                    this.modals[name].show = true
    
                    var unwatcher = null
                    unwatcher = this.$watch(() => this.modals[name].show, () => {
                        unwatcher()
                        resolve()
                    })
                })
            }
        }
    }
}