// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import {Button, Select, Row, Col, Form, FormItem, Tabs, TabPane, Checkbox, Input, MenuItem, MenuItemGroup, Container, Header, Aside, Main, Footer} from 'element-ui'
import 'normalize.css/normalize.css' // normalize.css 样式格式化

// 取消vue打印 警告
Vue.config.productionTip = false

// 注册 需求eleUi组件
Vue.use(Button).use(Select).use(Row).use(Col).use(Form).use(FormItem).use(Tabs).use(TabPane).use(Checkbox).use(Input).use(MenuItem).use(MenuItemGroup).use(Container).use(Header).use(Aside).use(Main).use(Footer)

// 遍历vuex的权限列表，假如去到的路径未在true列表中，则直接重定向到401。
const whiteList = ['/login'] // 不重定向白名单

// router.beforeEach注册一个全局的before钩子，在导航触发之前判断是否有权限进入改导航页面。
router.beforeEach((to, from, next) => {
  // 在浏览器控制台记录路由跳转
  console.log(from, '路由---->', to)
  // 判断是否有token。接口会有延迟
  console.log(Cookies.get('refresh'))
  if (Cookies.get('refresh')) {
    if (to.path === '/login') { // 当其再访问登录页面（to.path === '/login'）时，可直接重定向到首页
      next({path: '/'})
    }
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 路由注入到 vue 根实例中
  store, // store状态 注入到 vue 根实例中 所有的子组件都可以访问store
  components: { App },
  template: '<App/>'
})
