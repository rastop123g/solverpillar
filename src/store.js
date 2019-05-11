import Vue from 'vue'
import Vuex from 'vuex'
import powerline from './stores/powerline';
import settings from './stores/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    powerline,
    settings
  },
  state: {
    prox: 0,
    variantVoltage: [0, 0.4, 10, 35, 110],
    variantSection: [
      { name: 'Прямоугольник', value: 'R'},
      { name: 'Трапеция', value: 'T'}
    ],
    beton : ['B15', 'B20', 'B25', 'B30'],
    result: {},
    graphs: {},
    ready: false
  },
  getters: {
  
  },
  mutations: {
    ready(state, val) {
      state.ready = val
    },
    setResult(state, load) {
      state.result = load
    },
    setGraphs(state, val) {
      state.graphs = val
    }
  },
  actions: {
    calculate(context) {
      let worker = new Worker('calc.js')
      worker.postMessage({line: context.state.powerline, settings: context.state.settings })
      worker.addEventListener('message', e => {
        context.commit('setResult', e.data.result)
        context.commit('setGraphs', e.data.graphs)
        context.commit('ready', true)
        console.log(e.data)
        worker.terminate()
      })
    }
  }
})