import db from '../ipc/ipcRenderer'

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
    },
    actions: {
        setTraversa({commit}, payload) {
            if(payload != undefined) {
                db.select({_id: payload}, 'traverses').then(data => {
                    data.forEach(data => {
                        commit('setName', data.name);
                        commit('setWeight', data.weight);
                        commit('setArea', data.area);
                        commit('setVoltage', data.voltage);
                    })
                })
            }
        }
    }
}