<template>
  <div class="login-warp">
    <header class="login-header">登录头部</header>
    <div class="login-body">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="账号：" prop="account">
          <el-input v-model="loginForm.user" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="sub-btn">
          <el-button type="primary">登录</el-button>
        </el-form-item>
        <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
        <router-link to="/sendpwd" class="forget-pwd">忘记密码</router-link>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        user: '',
        password: ''
      }
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
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
      height: 400px;
      z-index: 1;
      padding: 15px;
      box-shadow: 0 0 5px 3px rgba(212, 212, 215, 0.8);
    }
  }
</style>
