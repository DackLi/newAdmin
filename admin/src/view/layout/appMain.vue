<template>
  <el-main>
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </el-main>
</template>

<script>
export default {
  name: 'appMain',
  computed: {
    key () {
      let routerName = (this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date())
      return routerName
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .app-main {
    height: 100%;
    width: 100%;
    background: #fff;
    padding: 10px;
    transition: all .28s ease-out;
  }
/* 点击菜单中间的部分 淡入淡出的效果 start */
.fade-enter-active{
  -webkit-transition: all 0.2s;  //css3 有些浏览器不支持 Chrome || Safari
  -moz-transition: all 0.2s;  //css3 有些浏览器不支持 Firefox
  -ms-transition: all 0.2s;//css3 有些浏览器不支持 IE
  -o-transition: all 0.2s;//css3 有些浏览器不支持 Opera
  -webkit-transition-delay: 0.2s;  //css3 有些浏览器不支持 Chrome || Safari
  -moz-transition-delay: 0.2s;  //css3 有些浏览器不支持 Firefox
  -ms-transition-delay: 0.2s;//css3 有些浏览器不支持 IE
  -o-transition-delay: 0.2s;//css3 有些浏览器不支持 Opera
}

.fade-leave-active{
  -webkit-transition: all 0.2s;  //css3 有些浏览器不支持 Chrome || Safari
  -moz-transition: all 0.2s;  //css3 有些浏览器不支持 Firefox
  -ms-transition: all 0.2s;//css3 有些浏览器不支持 IE
  -o-transition: all 0.2s;//css3 有些浏览器不支持 Opera
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
