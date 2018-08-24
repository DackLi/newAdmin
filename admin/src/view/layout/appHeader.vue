<template>
  <el-header class="header">
    <div class="logo">
      <img src="https://cdn4.buysellads.net/uu/1/6016/1532360842-260x600.jpg" alt="">
      测试后台
    </div>
    <div class="header-right">
      <ul>
        <li>
          欢迎您，超级管理员
        </li>
        <li>
          管理员
        </li>
        <li @click="loginOut">
          退出
        </li>
      </ul>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'appHeader',
  methods: {
    loginOut () {
      this.$store.dispatch('loginOut').then((res) => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import '~assets/css/mixin';
  @import '~assets/css/variable';
  .el-header {
    background-color: @bgcolor;
  }
  .header {
    .display-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    .logo {
      color: #fff;
      font-size: 30px;
      .display-flex;
      align-items: center;
      letter-spacing: 5px;
      img {
        height: 40px;
        margin-right: 15px
      }
    }
    .header-right {
      ul {
        .display-flex;
        flex-direction: row;
        li {
          padding: 5px 15px;
          color: #d2d9f4;
          border-left: 1px solid #d2d9f4;
          font-size: 14px;
          cursor: pointer;
        }
        li:last-child {
          border-right: 1px solid #d2d9f4;
        }
        li:hover {
          color: #fff;
        }
      }
    }
  }
</style>
