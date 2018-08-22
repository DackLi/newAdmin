/**
 * @Author:      lk
 * @DateTime:    2018-08-21
 * @Description: 状态管理：目前只有用户信息、菜单权限、app配置相关状态使用vuex存储在全局，其它数据都由每个业务组件自己管理
 * 注意：JavaScript代码是运行在内存中的，代码运行时的所有变量，函数，也都是保存在内存中的。刷新页面，以前申请的内存被释放，重新加载脚本代码，
 * 变量重新赋值，所以这些数据要想储存就必须储存在外部，例如：Local Storage, Session Storage, IndexDB等。
 * so：vuex中的数据刷新页面后，会全部消失。存vuex时，同时记得存 Session Storage。或者F5时重新获取接口
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
console.log(Vuex)
// 全局注册vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  // 将状态树store 分割成模块 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
  modules: {
    user // 用户的信息
  }
  // getter（可以认为是 store 的计算属性）对数据的一个过滤和加工
  // getters: getters // 对以上数据进行加工
})

export default store
