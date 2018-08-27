<template>
  <div class="login-warp">
    <header class="login-header">登录头部</header>
    <div class="login-body">
      <!-- 头部搜索 -->
      <el-form label-position="right" label-width="80px" ref="loginForm" :model="loginForm" :rules="LoginRules">
        <el-form-item label="账号：" prop="user">
          <el-input v-model="loginForm.user" placeholder="账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="loginForm.password" type="password"  placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item class="sub-btn">
          <el-button type="primary" @click="submitLogin" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
        </el-form-item>
        <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
        <router-link to="/sendpwd" class="forget-pwd">忘记密码</router-link>
      </el-form>
    </div>
    <!-- 新增弹框 -->
  </div>
</template>

<script>
import { validate } from 'utils/validate'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      loginForm: {
        user: '',
        password: '',
        checked: false
      },
      LoginRules: {
        user: [
          {required: true, message: '请输入账户名称', trigger: 'blur'}
        ],
        password: [
          {required: true, trigger: 'blur', validator: validate.validatePass}
        ]
      }
    }
  },
  beforeMount: function () {
    if (Cookies.get('password') && Cookies.get('uid')) {
      this.loginForm.password = Cookies.get('password')
      this.loginForm.user = Cookies.get('uid')
    } else {
      this.loginForm.password = ''
      this.loginForm.user = ''
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    submitLogin: function () {
      let vm = this
      // 调用方法isValidate  form表单校验  第一个参数this  第二个参数是from表单ref的值  第三个参数是form表单提交参数
      validate.isValidate(vm, 'loginForm', (formData) => {
        if (formData.validates) {
          formData.param.flags = true
          vm.$store.dispatch('Login', formData.param).then((res) => {
            vm.$router.push({ path: '/' })
            // vm.$store.dispatch('GetInfo').then(res => { // 拉取user_info
            //   vm.$router.push({ path: '/' })
            // }).catch(err => {
            //   console.log(err)
            // })
          }).catch(err => {
            Message.error(err)
          })
        }
      }, vm.loginForm)
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import '~assets/css/mixin';
  @import '~assets/css/variable';
  .login-warp {
    .relative;
    .setWidthHeight(100%,100vh);
    .login-header {
      .setWidthHeight(100%,100px);
      background-color: @bgcolor;
      color: @text-white;
      text-align: center;
      font-size: 28px;
      line-height: 100px;
    }
    .login-body {
      .absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 400px;
      z-index: 1;
      padding: 15px;
      box-shadow: 0 0 5px 3px rgba(212, 212, 215, 0.8);
    }
    .forget-pwd {
      float: right;
      font-size: 14px;
      color: #409EFF;
      text-decoration: none;
    }
  }
</style>
