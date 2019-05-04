import Vue from 'vue'
import Vuex from 'vuex'
import powerline from './stores/powerline';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    powerline
  },
  state: {
    prox: 0,
    variantVoltage: [0, 0.4, 10, 35, 110],
    variantSection: [
      { name: 'Прямоугольник', value: 'R'},
      { name: 'Трапеция', value: 'T'}
    ],
    beton : ['B15', 'B20', 'B25', 'B30'],
    result: {}
  },
  getters: {
  
  },
  mutations: {
    
  },
  actions: {
    calculate(context) {
      let worker = new Worker('calc.js')
      worker.postMessage(context.state.powerline)
      worker.addEventListener('message', e => {
        console.log(e.data)
      })
    }
  }
})