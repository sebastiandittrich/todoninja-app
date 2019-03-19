export default {
    namespaced: true,
    state: {
        open: 0
    },
    getters: {
        open(state) {
            return state.open
        }
    },
    mutations: {
        increment(state) {
            state.open = state.open +1
        },
        decrement(state) {
            state.open = state.open -1
        }
    }
}