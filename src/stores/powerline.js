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
        voltage: Number,
    },
    mutations: {
        setVoltage(state, val) {
            state.voltage = val
        }
    }
}