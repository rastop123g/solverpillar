import Vue from 'vue'
import Vuex from 'vuex'
import powerline from './stores/powerline';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    powerline
  },
  state: {
    prox: 0
  },
  getters: {
  
  },
  mutations: {
    
  },
  actions: {

  }
})