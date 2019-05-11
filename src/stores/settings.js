export default {
    namespaced: true,
    state: {
        K_lwire: 1.045,
        K_impulse: 1.5,
    },
    mutations: {
        setK_lwire(state, val) {
            state.K_lwire = val
        },
        setK_impulse(state, val) {
            state.K_impulse = val
        }
    },
    actions: {
        
    }
}