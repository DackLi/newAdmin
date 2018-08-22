// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Button, Select, Row, Col, Form, FormItem, Tabs, TabPane, Checkbox, Input, MenuItem, MenuItemGroup } from 'element-ui'
import 'normalize.css/normalize.css' // normalize.css 样式格式化

// 取消vue打印 警告
Vue.config.productionTip = false

// 注册 需求eleUi组件
Vue.use(Button).use(Select).use(Row).use(Col).use(Form).use(FormItem).use(Tabs).use(TabPane).use(Checkbox).use(Input).use(MenuItem).use(MenuItemGroup)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 路由注入到 vue 根实例中
  store, // store状态 注入到 vue 根实例中 所有的子组件都可以访问store
  components: { App },
  template: '<App/>'
})
