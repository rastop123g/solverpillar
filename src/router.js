import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from './components/StartPage'
import ComponentEditor from './components/ComponentEditor'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
      { path: '/start', component: StartPage},
      { path: '/component-editor', component: ComponentEditor},
    ]
  })