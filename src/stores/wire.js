import db from '../ipc/ipcRenderer'

export default {
    namespaced: true,
    state: {
        name: '',
        voltage: '',
        weight: '',
        diametr: '',
        isolator: '',
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
    },
    actions: {
        setWire({commit}, payload) {
            db.select({_id: payload}, 'wires').then(data => {
                data.forEach(data => {
                    commit('setName', data.name);
                    commit('setWeight', data.weight);
                    commit('setDiametr', data.diametr);
                    commit('setVoltage', data.voltage);
                    commit('setIsolator', data.isolator);
                })
            })
        }
    }
}