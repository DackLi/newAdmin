<template>
  <el-main>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </el-main>
</template>

<script>
export default {
  name: 'appMain'
}
</script>

<style scoped>

</style>
