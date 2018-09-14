<template>
  <div class="app-main">
    <div class="add-role-box box">
      <div class="header">
        <h2 class="title">角色管理</h2>
      </div>
      <div class="body">
        <!-- 搜索条件 -->
        <div class="filter-container">
          <el-form :inline="true" :model="setRoleFilter">
            <el-form-item label="角色名称">
              <el-input v-model="setRoleFilter.roleName" placeholder="请输入角色名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="filter-item" type="primary" icon="el-icon-search" @click.native.prevent="getTableList(backhome)">查询</el-button>
              <el-button class="filter-item" type="primary" icon="el-icon-plus" @click.native.prevent="addRoleFormVisible = true">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <el-table ref="multipleTable" :data="roleTableList" stripe fit highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column align="center" label='ID' prop="roleId"></el-table-column>
          <el-table-column align="left" label='角色名称' prop="roleName"></el-table-column>
          <el-table-column align="left" label='角色描述' prop="roleDesc"></el-table-column>
          <el-table-column align="center" label='操作'>
            <template slot-scope="scope">
              <el-button @click.native.prevent="detialRole(scope.$index, roleTableList)" size="small">
                查看
              </el-button>
              <el-button @click.native.prevent="editRole(scope.$index, roleTableList)" type="primary" size="small">
                修改
              </el-button>
              <el-button @click.native.prevent="deleteRole(scope.$index, roleTableList)" type="danger" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="roleTableListTotal" @reLoadData="pageChange" :callBackData="setRoleFilter"></pagination>
      </div>
      <!-- 新增角色弹窗 -->
      <el-dialog title="新增角色" :visible.sync="addRoleFormVisible" top="10%" width="500px" v-loading="addLoad" element-loading-text="拼命加载中"
      :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form class="small-space" :model="addRoleForm" ref="addRoleForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="addRoleForm.roleName" placeholder="请输入角色名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色权限：" prop="rolePermission">
            <div class="dialog-permissions">
              <el-tree
                ref="perTreeAdd"
                accordion
                :default-expanded-keys="[0]"
                :data="meunTree"
                show-checkbox
                node-key="id"
                :props="defaultProps">
              </el-tree>
            </div>
          </el-form-item>
          <el-form-item label="角色描述：" prop="roleDesc">
            <el-input type="textarea" v-model="addRoleForm.roleDesc" placeholder="角色描述" clearable></el-input>
          </el-form-item>
          <el-form-item class="dialog-footer-btn">
            <el-button type="primary" @click.native.prevent="addRoleSubmit()" v-loading.fullscreen.lock="addRoleLoad">确 定</el-button>
            <el-button @click="addRoleFormVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 修改角色弹窗 -->
      <el-dialog title="新增角色" :visible.sync="editRoleLoadFormVisible" top="10%" width="500px" v-loading="editLoad" element-loading-text="拼命加载中"
      :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form class="small-space" :model="editMenuForm" ref="editMenuForm" :rules="rules" label-position="right" label-width="120px">
           <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="editMenuForm.roleName" placeholder="请输入角色名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色权限：" prop="rolePermission">
            <div class="dialog-permissions">
              <el-tree
                ref="perTreeEdit"
                accordion
                :default-expanded-keys="[0]"
                :data="meunTree"
                show-checkbox
                node-key="id"
                :props="defaultProps">
              </el-tree>
            </div>
          </el-form-item>
          <el-form-item label="角色描述：" prop="roleDesc">
            <el-input type="textarea" v-model="editMenuForm.roleDesc" placeholder="角色描述" clearable></el-input>
          </el-form-item>
          <el-form-item class="dialog-footer-btn">
            <el-button type="primary" @click.native.prevent="editRoleSubmit()" v-loading.fullscreen.lock="editMenuLoad">确 定</el-button>
            <el-button @click="editRoleLoadFormVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 查看角色弹窗 -->
      <el-dialog title="新增角色" :visible.sync="detialRoleLoadFormVisible" top="10%" width="500px" v-loading="detailLoad" element-loading-text="拼命加载中"
      :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form class="small-space" :model="detialMenuForm" ref="detialMenuForm" label-position="right" label-width="120px">
           <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="detialMenuForm.roleName" placeholder="请输入角色名称" clearable readonly></el-input>
          </el-form-item>
          <el-form-item label="角色权限：" prop="rolePermission">
            <div class="dialog-permissions">
              <el-tree
                ref="perTreeDetial"
                accordion
                :default-expanded-keys="[0]"
                :data="meunTree"
                show-checkbox
                node-key="id"
                :props="defaultProps">
              </el-tree>
            </div>
          </el-form-item>
          <el-form-item label="角色描述：" prop="roleDesc">
            <el-input type="textarea" v-model="detialMenuForm.roleDesc" placeholder="角色描述" clearable readonly></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import instance from 'global/http'
import { validate } from 'utils/validate'
import ApiUrl from 'global/api'
import Pagination from 'components/pagination'
export default {
  name: 'role',
  data () {
    return {
      // 搜索条件
      setRoleFilter: {
        limit: 10,
        currPage: 1,
        roleName: ''
      },
      // 列表loading开关
      listLoading: false,
      // table列表数据
      roleTableList: [],
      // table列表总条目
      roleTableListTotal: 0,
      // 添加loading开关
      addRoleLoad: false,
      // 表单验证规则
      rules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'}
        ]
      },
      // 添加角色弹框form状态
      addRoleForm: {
        roleDesc: '',
        roleName: '',
        menuIds: []
      },
      // 角色树
      meunTree: [
        {
          id: 0,
          menuName: '顶级角色',
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
            },
            {
              id: 5,
              menuName: '系统管理',
              open: false,
              children: [
                {
                  id: 6,
                  menuName: '菜单管理',
                  open: false,
                  children: []
                },
                {
                  id: 7,
                  menuName: '角色管理',
                  open: false,
                  children: []
                },
                {
                  id: 8,
                  menuName: '用户管理',
                  open: false,
                  children: []
                }
              ]
            },
            {
              id: 9,
              menuName: '系统管理',
              open: false,
              children: [
                {
                  id: 10,
                  menuName: '菜单管理',
                  open: false,
                  children: []
                },
                {
                  id: 11,
                  menuName: '角色管理',
                  open: false,
                  children: []
                },
                {
                  id: 12,
                  menuName: '用户管理',
                  open: false,
                  children: []
                }
              ]
            },
            {
              id: 13,
              menuName: '系统管理',
              open: false,
              children: [
                {
                  id: 14,
                  menuName: '菜单管理',
                  open: false,
                  children: []
                },
                {
                  id: 15,
                  menuName: '角色管理',
                  open: false,
                  children: []
                },
                {
                  id: 16,
                  menuName: '用户管理',
                  open: false,
                  children: []
                }
              ]
            },
            {
              id: 17,
              menuName: '系统管理',
              open: false,
              children: [
                {
                  id: 18,
                  menuName: '菜单管理',
                  open: false,
                  children: []
                },
                {
                  id: 19,
                  menuName: '角色管理',
                  open: false,
                  children: []
                },
                {
                  id: 20,
                  menuName: '用户管理',
                  open: false,
                  children: []
                }
              ]
            }
          ]
        }
      ],
      // 角色列表
      menuSelectList: [
        {
          menuId: 0,
          label: '顶级角色'
        },
        {
          menuId: 1,
          label: '系统角色'
        }
      ],
      // 角色树数据映射
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      addRoleFormVisible: false, // 添加角色弹框状态
      addLoad: false, // 添加角色弹框loading状态
      // 修改角色弹框form状态
      editMenuForm: {
        roleDesc: '',
        roleName: '',
        menuIds: []
      },
      editRoleLoadFormVisible: false, // 修改角色弹框状态
      editLoad: false, // 修改角色弹框loading状态
      // 添加loading开关
      editMenuLoad: false,
      // 是否返回查询第一页
      backhome: true,
      // 查看角色弹框form状态
      detialMenuForm: {
        roleDesc: '',
        roleName: '',
        menuIds: []
      },
      detialRoleLoadFormVisible: false, // 查看角色弹框状态
      detailLoad: false, // 查看角色弹框loading状态
      // 查看loading开关
      detailMenuLoad: false
    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
    addRoleSubmit () {
      let vm = this
      validate.isValidate(vm, 'addRoleForm', (formData) => {
        // 验证权限不为空
        this.addRoleForm.menuIds = this.$refs.perTreeAdd.getCheckedKeys()
        if (this.addRoleForm.menuIds.length > 0) {
          if (formData.validates) {
            formData.param.flags = true
            formData.param.menuIds = this.addRoleForm.menuIds
            vm.addRoleLoad = true
            instance.post(ApiUrl.addRole, formData.param).then(res => {
              vm.addRoleLoad = false
              if (res.status === 200) {
                this.addRoleFormVisible = false
                this.addRoleForm.roleDesc = ''
                this.addRoleForm.roleName = ''
                this.$refs.perTreeAdd.setCheckedKeys([])
                Message.success({ message: res.data.data.successMsg })
              } else {
                Message.error({ message: res.data.data.err })
              }
            }, vm.addRoleForm).catch(err => {
              Message.error(err)
            })
          }
        } else {
          Message.error({ message: '请选择权限' })
        }
      }, vm.addRoleForm)
    },
    editRoleSubmit () {
      let vm = this
      validate.isValidate(vm, 'addMenuForm', (formData) => {
        if (formData.validates) {
          formData.param.flags = true
          vm.editRoleLoad = true
          instance.post(ApiUrl.addMenu, formData.param).then(res => {
            vm.editRoleLoad = false
            if (res.status === 200) {
              this.editRoleLoadFormVisible = false
              Message.success({ message: res.data.data.successMsg })
            } else {
              Message.error({ message: res.data.data.err })
            }
          }, vm.addMenuForm).catch(err => {
            Message.error(err)
          })
        }
      }, vm.addMenuForm)
    },
    // 查看单个角色
    detialRole (index, row) {
      this.detialRoleLoadFormVisible = true
      this.detialMenuForm = row[index]
      this.$nextTick(function () {
        console.log(this.$refs.perTreeDetial)
        this.$refs.perTreeDetial.setCheckedKeys(this.detialMenuForm.menuIds)
      })
    },
    // 删除单个角色
    deleteRole (index, row) {
      let vm = this
      MessageBox.confirm(`确定删除 ${row[index].menuName} 么`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        instance.post(ApiUrl.deleteMenu, index).then(res => {
          if (res.status === 200) {
            Message.success({ message: res.data.data.successMsg })
            row.splice(index, 1)
            // 重置表格
            vm.getTableList(vm.backhome)
          } else {
            Message.error({ message: '调用接口失败' })
          }
        })
      }).catch(() => {
        Message({message: '取消删除'})
      })
    },
    // 修改单个角色
    editRole (index, row) {
      this.editRoleLoadFormVisible = true
      this.editMenuForm = row[index]
      this.$nextTick(function () {
        this.$refs.perTreeEdit.setCheckedKeys(this.editMenuForm.menuIds)
      })
    },
    // 首次请求表格数据
    getTableList (backhome = false) {
      let vm = this
      vm.listLoading = true
      if (backhome) {
        vm.setRoleFilter.currPage = 1
        vm.setRoleFilter.limit = 10
      }
      let param = JSON.parse(JSON.stringify(vm.setRoleFilter))
      instance.get(ApiUrl.roleTableList, param).then(res => {
        if (res.status === 200) {
          vm.roleTableList = res.data.data
          vm.roleTableListTotal = res.data.total
          vm.listLoading = false
        } else {
          Message.erro({ message: res.data.data.err })
        }
      })
    },
    // 分页修改 修改表格数据
    pageChange (pageData) {
      this.setRoleFilter.limit = pageData.limit
      this.setRoleFilter.currPage = pageData.currPage
      this.getTableList()
    }
  },
  components: {
    Pagination
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .add-role-box {
    .el-form-item__content {
      .el-tree {
        margin-top: 7px;
      }
    }
    .dialog-permissions {
      max-height: 250px;
      overflow-y: auto;
    }
  }
</style>
