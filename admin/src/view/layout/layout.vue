<template>
  <el-container direction="vertical">
    <app-header></app-header>
    <el-container>
      <nav-menu></nav-menu>
      <app-main></app-main>
    </el-container>
  </el-container>
</template>

<script>
import appHeader from '@/view/layout/appHeader'
import navMenu from '@/view/layout/navMenu'
import appMain from '@/view/layout/appMain'
export default {
  name: 'layout',
  components: {
    appHeader, navMenu, appMain
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .el-main {
    background-color: #e9ecf3;
    padding: 15px;
  }
  .el-container {
    height: 100%;
  }
</style>
