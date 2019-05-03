export default {
    namespaced: true,
    state: {
        name: '',
        voltage: 0,
        length: 0,
        weight: 0,
        section: '',
        h: 0,
        h1: 0,
        b: 0,
        t: 0,
        beton: '',
        moment: 0
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
            state.section = val
        },
        seth(state,val){
            state.h = val
        },
        seth1(state,val){
            state.h1 = val
        },
        setB(state,val){
            state.b = val
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