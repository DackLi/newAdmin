// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import { Button, Select, Row, Col, Form, FormItem, Tabs, TabPane } from 'element-ui'

// 取消vue打印 警告
Vue.config.productionTip = false

// 全局注册vuex
Vue.use(Vuex)

// 全局注册 eleUi
Vue.use(Button).use(Select).use(Row).use(Col).use(Form).use(FormItem).use(Tabs).use(TabPane)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
