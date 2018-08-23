<template>
  <el-header class="header">
    <div class="logo">
      <img src="https://cdn4.buysellads.net/uu/1/6016/1532360842-260x600.jpg" alt="">
      测试后台
    </div>
    <div class="header-right">
      
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'appHeader'
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
  }
</style>
