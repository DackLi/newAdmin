/**
 * @Author:      lk
 * @DateTime:    2018-08-21
 * @Description: 用户信息的store：用户信息state状态管理
 */

import axios from 'axios'
import instance from 'global/http'
import ApiUrl from 'global/api'
import router from 'router'
import Cookies from 'js-cookie'

const user = {
  // state状态 类似于vue中的data
  state: {
    uid: '', // 用户信息
    password: '', // 密码
    userInfo: null, // 用户信息
    routerPath: '' // 路由重定向
  },
  // Vuex 中的 mutation 类似于事件 相当于vue中的 methods  第一个参数是state 传入额外的参数，即 mutation 的 载荷（payload）
  // mutations,里面装着一些改变数据方法的集合，处理数据逻辑方法全部放在mutations里面，使得数据和视图分离。
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    // 设置用户ID
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    // 设置密码
    SET_PWD: (state, password) => {
      state.password = password
    },
    // 设置路由重定向的路由
    SET_PATH: (state, routerPath) => {
      state.routerPath = routerPath
    }
  },
  // 通过action commit 找到相对应的mutations  来改变state
  actions: {
    Login ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        console.log('登录入参：', userInfo)
        instance.post(ApiUrl.loginUrl, userInfo).then(res => {
          if (res.status === 200 && res.data.status === 200) {
            console.log(res)
            Cookies.set('uid', userInfo.user, { expires: 14, path: '' }) // 设置token
            Cookies.set('refresh', true)
            if (userInfo.checked) {
              Cookies.set('password', userInfo.password, { expires: 14, path: '' })
              commit('SET_PWD', userInfo.password) // 修改密码
            } else {
              Cookies.set('password', '') // 设置密码
              commit('SET_PWD', '') // 修改密码
            }
            commit('SET_UID', userInfo.user) // 修改用户
            resolve()
          } else {
            reject(res)
            // Message.error(res.data.errorMsg)
          }
        })
      })
    },
    // 获取用户信息
    GetInfo ({
      dispatch,
      commit,
      state
    }) {
      let params = {}
      params.userId = state.uid
      return Promise((resolve, reject) => {
        const urls = ['/proxy/currentUser', '/proxy/auth/findMenuPerms']
        const requests = urls.map(makeRequest)
        // 把指定的 url 转变成 axios 请求，返回的是 Promise 对象
        function makeRequest (url) {
          return instance.get(url)
        }
        axios.all(requests).then(axios.spread((userInfo, menus) => {
          if (userInfo.data.status === 401 || menus.data.status === 401) {
            Cookies.remove('refresh')// 移除刷新
            commit('SET_USERINFO', '') // 修改用户
            router.replace({
              path: '/login'
            })
            return false
          }
        }))
      })
    }
  }
}
export default user
