import pillar from './pillar'
import wire from './wire'
import isolator from './isolator'
import traversa from './traversa'

export default {
    namespaced: true,
    modules: {
        pillar,
        wire,
        isolator,
        traversa
    },
    state: {
        voltage: 0,
        numwires: 0,
        climat: {}
    },
    mutations: {
        setVoltage(state, val) {
            state.voltage = val
        },
        setNumwires(state, val) {
            state.numwires = val
        },
        setClimat(state, payload) {
            state.climat = payload
        }
    }
}