/**
 * @Author:      lk
 * @DateTime:    2018-08-21
 * @Description: 封装axios
 */
import router from 'router'
import axios from 'axios'
import store from 'store'
import { Message } from 'element-ui'
import qs from 'qs'

const instance = axios.create({
  timeout: 50000 // 请求超时时间
  // baseURL: '/proxy', //所有的接口都会加载
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodedcharset=UTF-8' // 配置请求头

// 在请求或者返回被then或者catch处理之前对他们进行拦截
// 添加一个请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // 在data当中存在数组的话需要加上{arrayFormat: 'brackets'} 否则提交时数组会显示下标
      config.data = qs.stringify(config.data, { arrayFormat: 'brackets' })
    }
    return config
  },
  error => {
    // 当出现请求错误是做一些事
    Message.error({ message: '请求超时!' })
    return Promise.reject(error)
  })
// 在请求或者返回被then或者catch处理之前对他们进行拦截
// 添加一个返回拦截器
instance.interceptors.response.use(
  data => {
    console.log('返回数据：', data)
    if (data.data.status && data.data.status === 401) {
      // Cookies.remove('refresh')// 移除刷新
      store.commit('SET_USERINFO', '') // 修改用户
      router.replace({ path: '/login' })
      return
    }
    return data
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 302:
          err.message = '错误请求：找不到url请求（后台过滤）'
          break
        case 400:
          err.message = '错误请求：字段名称、类型前后台不一致'
          break
        case 401:
          err.message = '未授权，请重新登录'
          router.replace({ path: '/login' }) // 路由跳转 不会向 history 添加新记录，替换掉当前的 history 记录
          break
        case 403:
          err.message = '拒绝访问'
          router.replace({ path: '/error/401' })
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          router.replace({ path: '/error/404' })
          break
        case 405:
          err.message = '请求方法未允许,可能是请求类型(get post)不一致'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          router.replace({ path: '/error/404' })
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = `连接到服务器失败`
    }
    console.log(err.message)
    Message.error({ message: err.message })
    return Promise.reject(err)
  }
)

export default instance
