export default {
    namespaced: true,
    state: {
        name: String,
        weight: Number,
        area: Number,
        voltage: Number
    },
    mutations: {
        setName(state, val){
            state.name = val
        },
        setWeight(state,val){
            state.weight = val
        },
        setArea(state,val){
            state.area = val
        },
        setVoltage(state,val){
            state.voltage = val
        }
    }
}