import Step from '@c/tutorial/templates/frame'
import Headline from '@c/tutorial/templates/headline'
import Description from '@c/tutorial/templates/description'
import Illustration from '@c/tutorial/templates/illustration'

export default {
    components: { Step, Headline, Description, Illustration },
    methods: {
        next() {
            this.$emit('next')
        },
        previous() {
            this.$emit('previous')
        },
        done() {
            this.$emit('done')
        }
    }
}