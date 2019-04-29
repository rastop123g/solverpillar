import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from './components/StartPage'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
      { path: '/start', component: StartPage}
    ]
  })