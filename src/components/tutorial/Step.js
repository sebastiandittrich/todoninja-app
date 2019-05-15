import Page from '@/assets/js/Page'

export default class Step extends Page {
    constructor(...args) {
        super(...args)

        this.with('step:tutorial/templates/frame', 'headline:tutorial/templates/headline','description:tutorial/templates/description', 'illustration:tutorial/templates/illustration')
            .methods({
                next() {
                    this.$emit('next')
                },
                previous() {
                    this.$emit('previous')
                },
                done() {
                    this.$emit('done')
                }
            })
    }
}