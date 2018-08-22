import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/login'
import Layout from '@/view/layout/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Layout
    }
  ]
})
