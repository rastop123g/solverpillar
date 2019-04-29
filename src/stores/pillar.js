export default {
    namespaced: true,
    state: {
        name: String,
        voltage: Number,
        length: Number,
        weight: Number,
        Section: String,
        h: Number,
        h1: Number,
        B: Number,
        t: Number,
        beton: String,
        moment: Number
    },
    mutations: {
        setName(state, val){
            state.name = val
        },
        setWeight(state,val){
            state.weight = val
        },
        setLength(state,val){
            state.length = val
        },
        setVoltage(state,val){
            state.voltage = val
        },
        setSection(state,val){
            state.Section = val
        },
        seth(state,val){
            state.h = val
        },
        seth1(state,val){
            state.h1 = val
        },
        setB(state,val){
            state.B = val
        },
        sett(state,val){
            state.t = val
        },
        setBeton(state,val){
            state.beton = val
        },
        setMoment(state,val){
            state.moment = val
        }
    }
}