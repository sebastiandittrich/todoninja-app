import Trait from "../Trait";

export default function(modalsargs) {
    const trait = new Trait()
    const modals = {}

    for(const modalname in modalsargs) {
        trait.with(modalname + ':' + modalsargs[modalname])

        modals[modalname] = { show: false, position: {x: 0, y: 0}, unwatchers: [] }
    }

    trait.data(() => ({
        modals,
    }))
    .methods({
        modalState(name) {
            return Object.keys(this.modals).includes(name) ? this.modals[name] : null
        },
        hideModal(name) {
            this.modals[name].show = false
        },
        async showModal(name, $event = {}) {
            return new Promise((resolve) => {
                this.modals[name].data = $event.data
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
    })

    return trait
}