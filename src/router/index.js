import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/demo/index')
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('CHANGE_NAV', to)
  next()
})

export default router
