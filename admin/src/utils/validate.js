/**
 * @Author:   LK
 * @DateTime:  2018-08-22
 * @Description: 校验
 */
export const validate = {
  /**
   * @des  form校验提取
   * @param <Object> vm this
   * @param <String> formName ref名称
   * @param <String> params form提交的参数
   * @return <Boolean> 看xxx是否成功
   */
  isValidate: (vm, formName, callBack, params = {}) => {
    let formData = {}
    formData.validates = false
    vm.$refs[formName].validate((valid) => {
      if (valid) {
        formData.param = JSON.parse(JSON.stringify(params))
        console.log('form参数json格式化：', formData.param)
        formData.validates = true
      } else {
        formData.validates = false
      }
      callBack(formData)
    })
  },
  /**
     * @des  密码不少于6位 不大于20位
     * @param <Object> rule 校验规则参数
     * @param <String> value form表单但校验的值
     * @return <Function>  callback 回调函数
     */
  validatePass: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('6~20位数字、英文、符号至少两种的组合'))
      return
    }
    const reg = /(?!.*\s)(?!^[\u4E00-\u9FA5]+$)(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^\u4E00-\u9FA5a-zA-Z\d]+$)^.{6,20}$/
    let falg = reg.test(value.trim())
    if (!falg) {
      callback(new Error('6~20位数字、英文、符号至少两种的组合'))
    } else {
      callback()
    }
  }
}
