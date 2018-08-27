<template>
  <el-aside width="200px">
    <!-- router 开启路由跳转 -->
    <!-- default-active 默认active -->
    <!-- unique-opened 是否只保持一个子菜单的展开 -->
    <el-menu
      default-active="2"
      v-loading="menuLoad"
      element-loading-text="拼命加载中"
      class="el-menu-vertical-demo"
      router
      unique-opened
      >
      <!-- 有子菜单 -->
      <el-submenu :index="item.frontRouting" v-for="(item, index) in menu" :key="index" v-if="item.children">
        <template slot="title">
          <i :class="item.menuIcon"></i>
          <span>{{ item.menuName }}</span>
        </template>
        <el-menu-item :index="item.frontRouting" v-for="(item, index) in item.children" :key="index">
          <i :class="item.menuIcon"></i>
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </el-submenu>
      <!-- 没有子菜单 -->
      <el-menu-item index="2" v-for="(item, index) in menu" :key="index" v-if="item.children == null">
        <i :class="item.menuIcon"></i>
        <span>{{ item.menuName }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'navMenu',
  data () {
    return {
      menuLoad: true, // 菜单的加载开关
      // 菜单内容
      menu: [
        {
          frontRouting: '/system',
          menuName: '系统管理',
          menuId: 1,
          sortIndex: 1,
          menuIcon: 'el-icon-setting',
          children: [
            {
              frontRouting: '/system/setMenu',
              menuName: '菜单管理',
              menuId: '1-1',
              sortIndex: 1
            },
            {
              frontRouting: '/system/role',
              menuName: '角色管理',
              menuId: '1-2',
              sortIndex: 2
            },
            {
              frontRouting: '/system/user',
              menuName: '用户管理',
              menuId: '1-3',
              sortIndex: 3
            }
          ]
        },
        {
          frontRouting: '/system1',
          menuName: '系统管理',
          menuId: 1,
          sortIndex: 1,
          menuIcon: 'el-icon-setting',
          children: [
            {
              frontRouting: '/system/setMenu',
              menuName: '菜单管理',
              menuId: '1-1',
              sortIndex: 1
            },
            {
              frontRouting: '/system/role',
              menuName: '角色管理',
              menuId: '1-2',
              sortIndex: 2
            },
            {
              frontRouting: '/system/user',
              menuName: '用户管理',
              menuId: '1-3',
              sortIndex: 3
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.menuLoads()
  },
  methods: {
    // 菜单开关控制
    menuLoads () {
      if (this.menu) {
        this.menuLoad = false
      }
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
