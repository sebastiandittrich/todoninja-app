import Page from '@/assets/js/Page'

export default class Modal extends Page {
    constructor(...args) {
        super(...args)

        this
            .with('bg:modal/frame', 'headline:modal/header', 'actions:modal/actions', 'action:modal/action', 'cancel:modal/cancel-action')
            .props('state')
            .methods({
                hide() {
                    this.$emit('hide')
                }
            })
    }
}