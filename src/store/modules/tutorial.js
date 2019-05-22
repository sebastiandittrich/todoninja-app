export default {
    namespaced: true,
    state: {
        done: false,
        step: 0,
    },

    getters: {
        done(state) {
            return state.done
        },
        step(state) {
            return state.step
        }
    },

    mutations: {
        next(state) {
            state.step++
        },
        previous(state) {
            state.step = state.step - 1
        },
        skip(state) {
            state.done = true
        },
        setStep(state, step) {
            state.step = step
        },
        setDone(state, done) {
            state.done = done
        }
    }
}