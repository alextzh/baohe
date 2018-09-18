import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: '/mining',
  linkActiveClass: 'active',
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.getters.userInfo) {
      next()
    } else {
      next({
        path: '/scan'
      })
    }
  } else {
    next()
  }
})

export default router
