import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/login'
import Layout from '@/view/layout/layout'
import Role from '@/view/system/role'
import setMenu from '@/view/system/setMenu'

Vue.use(Router)

/**
  * hidden : true不显示在菜单栏
  * redirect : 设置重定向，noredirect是不重定向
  * noDropdown : true 不显示子菜单
  * meta : { role: ['admin'] }  will control the page role
  * children:嵌套路由,component必不可少，先进入父路由
  **/
const constantRouterMap = [
  { path: '/login', name: 'Login', component: Login }, // 登录
  { path: '/', name: 'index', component: Layout }, // 首页
  {
    path: '/system', // 系统管理
    name: '系统管理',
    component: Layout,
    children: [
      { path: 'role', name: '角色管理', component: Role }, // 角色管理
      { path: 'setMenu', name: '菜单管理', component: setMenu } // 菜单管理
    ]
  }
]
export default new Router({
  routes: constantRouterMap
})
