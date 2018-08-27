<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './assets/css/common.less'
export default {
  name: 'App'
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  #app {
    height: 100vh;
  }
</style>
