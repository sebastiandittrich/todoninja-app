import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

export default function({ state = {}, getters = {}, mutations = {}, actions = {} }) {
    return {
        computed: {
            ...mapGetters(getters),
            ...mapState(state),
        },
        methods: {
            ...mapActions(actions),
            ...mapMutations(mutations)
        },
    }
} 