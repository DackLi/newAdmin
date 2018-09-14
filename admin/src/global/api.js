/**
 * @Author:      lk
 * @DateTime:    2018-08-22
 * @Description: 全局的api请求路由管理 config
 */
const BASEURL = 'https://www.easy-mock.com/mock/5b7d154cf894321ec45f8f17/vueAdmin'
const APIURL = {
  loginUrl: `${BASEURL}/login`, // 登录
  loginOut: `${BASEURL}/loginOut`, // 退出
  addMenu: `${BASEURL}/addMenu`, // 添加菜单
  deleteMenu: `${BASEURL}/deleteMenu`, // 添加菜单
  menuTableList: `${BASEURL}/menuTableList`, // 菜单表格数据
  roleTableList: `${BASEURL}/roleTableList`, // 角色表格数据
  addRole: `${BASEURL}/addRole`, // 添加角色
  userTableList: `${BASEURL}/userTableList` // 添加角色
}

module.exports = APIURL
