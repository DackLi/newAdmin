<template>
  <div class="app-main">
    <div class="add-menu-box box">
      <div class="header">
        <h2 class="title">添加菜单</h2>
      </div>
      <div class="body">
        <!-- 搜索条件 -->
        <div class="filter-container">
          <el-form :inline="true" :model="setMenuFilter">
            <el-form-item label="菜单名称">
              <el-input v-model="setMenuFilter.menuName" placeholder="请输入菜单名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="filter-item" type="primary" icon="el-icon-search">查询</el-button>
              <el-button class="filter-item" type="primary" icon="el-icon-plus" @click.native.prevent="shwoMenuDialog">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <el-table ref="multipleTable" :data="menuList" stripe fit highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column align="center" label='菜单名称' prop="menuName"></el-table-column>
          <el-table-column align="center" label='菜单路由' prop="frontRouting"></el-table-column>
          <el-table-column align="center" label='菜单图标' prop="menuIcon"></el-table-column>
          <el-table-column align="center" label='排序下标' prop="sortIndex"></el-table-column>
          <el-table-column align="center" label='是否有子菜单' prop="isChildren"></el-table-column>
        </el-table>
      </div>
      <!-- 新增菜单弹窗 -->
      <el-dialog title="新增菜单" :visible.sync="addMenuFormVisible" top="10%" width="500px" v-loading="addLoad" element-loading-text="拼命加载中"
      :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form class="small-space" ref="addMenuForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="菜单名称：">
            <el-input v-model="addMenuForm.menuName" placeholder="请输入菜单名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="菜单路由：">
            <el-input v-model="addMenuForm.frontRouting" placeholder="请输入菜单路由" clearable></el-input>
          </el-form-item>
          <el-form-item label="菜单图标：">
            <el-input v-model="addMenuForm.menuIcon" placeholder="请输入菜单图标" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序下标：">
            <el-input v-model="addMenuForm.sortIndex" placeholder="请输入菜单排序下标" clearable></el-input>
          </el-form-item>
          <el-form-item label="所属父菜单：">
            <div class="dialog-permissions">
              <el-tree :data="meunTree"
                show-checkbox
                accordion
                :props="defaultProps"
              >
              </el-tree>
            </div>
          </el-form-item>
          <el-form-item >
            <el-checkbox v-model="addMenuForm.isMenuChildren">是否有子菜单</el-checkbox>
          </el-form-item>
          <el-form-item class="dialog-footer-btn">
            <el-button type="primary" @click.native.prevent="addMenuSubmit('addMenuForm')">确 定</el-button>
            <el-button @click="addMenuFormVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setMenu',
  data () {
    return {
      // 搜索条件
      setMenuFilter: {
        menuName: ''
      },
      // 列表loading开关
      listLoading: false,
      menuList: [],
      // 添加loading开关
      addMenuLoad: false,
      // 表单验证规则
      rules: {
        menuName: ''
      },
      // 添加菜单弹框form状态
      addMenuForm: {
        menuName: '',
        frontRouting: '',
        menuIcon: '',
        sortIndex: '',
        isMenuChildren: false
      },
      // 菜单树
      meunTree: [
        {
          id: 0,
          menuName: '顶级菜单',
          open: false,
          children: [
            {
              id: 1,
              menuName: '系统管理',
              open: false,
              children: [
                {
                  id: 2,
                  menuName: '菜单管理',
                  open: false,
                  children: []
                },
                {
                  id: 3,
                  menuName: '角色管理',
                  open: false,
                  children: []
                },
                {
                  id: 4,
                  menuName: '用户管理',
                  open: false,
                  children: []
                }
              ]
            }
          ]
        }
      ],
      // 菜单树数据映射
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      addMenuFormVisible: false, // 添加菜单弹框状态
      addLoad: false // 添加菜单弹框loading状态
    }
  },
  methods: {
    shwoMenuDialog () {
      this.addMenuFormVisible = true
    },
    addMenuSubmit () {

    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .add-menu-box {
    .el-form-item__content {
      .el-tree {
        margin-top: 7px;
      }
    }
    .dialog-permissions {
      height: 100px;
      max-height: 250px;
      overflow-y: auto;
    }
  }
</style>
