export default {
    namespaced: true,
    state: {
        name: String,
        weight: Number,
        diametr: Number,
        isolator: Boolean,
        voltage: Number
    },
    mutations: {
        setName(state, val){
            state.name = val
        },
        setWeight(state,val){
            state.weight = val
        },
        setDiametr(state,val){
            state.diametr = val
        },
        setVoltage(state,val){
            state.voltage = val
        },
        setIsolator(state, val){
            state.isolator = val
        }
    }
}