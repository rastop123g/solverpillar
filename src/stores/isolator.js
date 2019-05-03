export default {
    namespaced: true,
    state: {
        name: '',
        voltage: 0,
        weight: 0,
        area: 0
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