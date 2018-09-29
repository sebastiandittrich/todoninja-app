import Trait from "../Trait";

export default function(modalsargs) {
    const trait = new Trait()
    const modals = {}

    for(const modalname in modalsargs) {
        trait.with(modalname + ':' + modalsargs[modalname])

        modals[modalname] = { show: false, position: {x: 0, y: 0} }
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
        showModal(name, $event) {
            this.modals[name].position.x = $event.clientX
            this.modals[name].position.y = $event.clientY
            this.modals[name].show = true
        }
    })

    return trait
}