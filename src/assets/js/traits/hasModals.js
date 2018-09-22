import Trait from "../Trait";

export default function(modalsargs) {
    const trait = new Trait()
    const modals = {}

    for(const modalname in modalsargs) {
        trait.with(modalname + ':' + modalsargs[modalname])

        modals[modalname] = { active: false }
    }

    trait.data(() => ({
        modals,
    }))
    .methods({
        modalState(name) {
            return Object.keys(this.modals).includes(name) ? this.modals[name] : { active: false }
        },
        hideModal(name) {
            this.modals[name].active = false
        },
        showModal(name, $event) {
            this.modals[name].position = { x: $event.clientX, y: $event.clientY }
            console.log(this.modals[name].position)
            this.modals[name].active = true
        }
    })

    return trait
}