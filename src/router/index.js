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
      path: '/demo/basic',
      name: 'basic-demo',
      component: () => import('@/views/demo/basic')
    },
    {
      path: '/demo/complete',
      name: 'complete-demo',
      component: () => import('@/views/demo/complete')
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('CHANGE_NAV', to)
  next()
})

export default router
