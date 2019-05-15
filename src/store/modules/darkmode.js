export default {
    namespaced: true,
    state: {
        dark: false,
    },
    getters: {
        isOn(state) {
            return state.dark
        }
    },
    mutations: {
        setDark(state, dark) {
            state.dark = dark
        }
    }
}