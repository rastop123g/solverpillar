import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from './components/StartPage'
import ComponentEditor from './components/ComponentEditor'
import About from './components/About'
import Setting from './components/Settings'
import Solver from './components/Solver'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
      { path: '/start', component: StartPage},
      { path: '/component-editor', component: ComponentEditor},
      { path: '/about', component: About},
      { path: '/setting', component: Setting},
      { path: '/solver', component: Solver}
    ]
  })