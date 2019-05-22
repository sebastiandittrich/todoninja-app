export default {
    namespaced: true,
    state: {
        dark: false,
    },
    getters: {
        isDark(state) {
            return state.dark
        }
    },
    mutations: {
        setDark(state, dark) {
            state.dark = dark
        },
        reset() {}
    }
}