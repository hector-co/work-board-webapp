import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BoardList from './views/BoardList'
import BoardEdit from './views/BoardEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/boards',
      name: 'boards',
      component: BoardList
    },
    {
      path: '/boards/edit/:id',
      name: 'boards-edit',
      component: BoardEdit
    }
  ]
})
