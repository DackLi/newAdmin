<template>
  <div class="app-main">
    <div class="add-menu-box box">
      <div class="header">
        <h2 class="title">菜单管理</h2>
      </div>
      <div class="body">
        <!-- 搜索条件 -->
        <div class="filter-container">
          <el-form :inline="true" :model="setMenuFilter">
            <el-form-item label="菜单名称">
              <el-input v-model="setMenuFilter.menuName" placeholder="请输入菜单名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="filter-item" type="primary" icon="el-icon-search" @click.native.prevent="getTableList(backhome)">查询</el-button>
              <el-button class="filter-item" type="primary" icon="el-icon-plus" @click.native.prevent="addMenuFormVisible = true">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <el-table ref="multipleTable" :data="menuTableList" stripe fit highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column align="center" label='ID' prop="menuId"></el-table-column>
          <el-table-column align="left" label='菜单名称' prop="menuName"></el-table-column>
          <el-table-column align="left" label='菜单路由' prop="frontRouting"></el-table-column>
          <el-table-column align="left" label='菜单图标' prop="menuIcon">
            <template slot-scope="scope">
              <template v-if="scope.row.menuIcon != ''">
                {{ scope.row.menuIcon }}
              </template>
              <template v-else>
                <span class="color-danger">无</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="left" label='排序下标' prop="sortIndex"></el-table-column>
          <el-table-column align="left" label='所属父菜单' prop="parentId">
            <template slot-scope="scope">
              <template v-if="scope.row.parentId === 0">
                顶级菜单
              </template>
              <template v-else-if="scope.row.parentId === 1">
                系统菜单
              </template>
              <template v-else>
                <span class="color-danger">无</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="left" label='是否有子菜单' prop="isChildren">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.isChildren? 'success' : 'danger'"
                disable-transitions>{{scope.row.isChildren}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label='操作'>
            <template slot-scope="scope">
              <el-button @click.native.prevent="editMenu(scope.$index, menuTableList)" type="primary" size="small">
                修改
              </el-button>
              <el-button @click.native.prevent="deleteMenu(scope.$index, menuTableList)" type="danger" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="menuTableListTotal" @reLoadData="pageChange" :callBackData="setMenuFilter"></pagination>
      </div>
      <!-- 新增菜单弹窗 -->
      <el-dialog title="新增菜单" :visible.sync="addMenuFormVisible" top="10%" width="500px" v-loading="addLoad" element-loading-text="拼命加载中"
      :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form class="small-space" :model="addMenuForm" ref="addMenuForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="菜单名称：" prop="menuName">
            <el-input v-model="addMenuForm.menuName" placeholder="请输入菜单名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="菜单路由：" prop="frontRouting">
            <el-input v-model="addMenuForm.frontRouting" placeholder="请输入菜单路由" clearable></el-input>
          </el-form-item>
          <el-form-item label="菜单图标：" prop="menuIcon">
            <el-input v-model="addMenuForm.menuIcon" placeholder="请输入菜单图标" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序下标：" prop="sortIndex">
            <el-input v-model="addMenuForm.sortIndex" placeholder="请输入菜单排序下标" clearable></el-input>
          </el-form-item>
          <el-form-item label="所属父菜单：" prop="parentId">
            <el-select v-model="addMenuForm.parentId" clearable class="ele-selec-block" placeholder="请选择所属菜单父菜单">
              <el-option
                v-for="item in menuSelectList"
                :key="item.menuId"
                :label="item.label"
                :value="item.menuId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-checkbox v-model="addMenuForm.isChildren">是否有子菜单</el-checkbox>
          </el-form-item>
          <el-form-item class="dialog-footer-btn">
            <el-button type="primary" @click.native.prevent="addMenuSubmit()" v-loading.fullscreen.lock="addMenuLoad">确 定</el-button>
            <el-button @click="addMenuFormVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 修改菜单弹窗 -->
      <el-dialog title="新增菜单" :visible.sync="editMenuFormVisible" top="10%" width="500px" v-loading="editLoad" element-loading-text="拼命加载中"
      :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form class="small-space" :model="editMenuForm" ref="editMenuForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="菜单名称：" prop="menuName">
            <el-input v-model="editMenuForm.menuName" placeholder="请输入菜单名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="菜单路由：" prop="frontRouting">
            <el-input v-model="editMenuForm.frontRouting" placeholder="请输入菜单路由" clearable></el-input>
          </el-form-item>
          <el-form-item label="菜单图标：" prop="menuIcon">
            <el-input v-model="editMenuForm.menuIcon" placeholder="请输入菜单图标" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序下标：" prop="sortIndex">
            <el-input v-model="editMenuForm.sortIndex" placeholder="请输入菜单排序下标" clearable></el-input>
          </el-form-item>
          <el-form-item label="所属父菜单：" prop="parentId">
            <el-select v-model="editMenuForm.parentId" clearable class="ele-selec-block" placeholder="请选择所属菜单父菜单">
              <el-option
                v-for="item in menuSelectList"
                :key="item.menuId"
                :label="item.label"
                :value="item.menuId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-checkbox v-model="editMenuForm.isChildren">是否有子菜单</el-checkbox>
          </el-form-item>
          <el-form-item class="dialog-footer-btn">
            <el-button type="primary" @click.native.prevent="editMenuSubmit()" v-loading.fullscreen.lock="editMenuLoad">确 定</el-button>
            <el-button @click="editMenuFormVisible = false">取 消</el-button>
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
  name: 'setMenu',
  data () {
    return {
      // 搜索条件
      setMenuFilter: {
        limit: 10,
        currPage: 1,
        menuName: ''
      },
      // 列表loading开关
      listLoading: true,
      // table列表数据
      menuTableList: [],
      // table列表总条目
      menuTableListTotal: 0,
      // 添加loading开关
      addMenuLoad: false,
      // 表单验证规则
      rules: {
        menuName: [
          {required: true, message: '请输入菜单名称', trigger: 'blur'}
        ],
        frontRouting: [
          {required: true, message: '请输入菜单路由', trigger: 'blur'}
        ],
        sortIndex: [
          {required: true, message: '请输入菜单排序下标', trigger: 'blur'}
        ],
        parentId: [
          {required: true, message: '请选择所属菜单父菜单', trigger: 'blur'}
        ]
      },
      // 添加菜单弹框form状态
      addMenuForm: {
        menuName: '',
        frontRouting: '',
        menuIcon: '',
        sortIndex: '',
        isChildren: false,
        parentId: ''
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
      // 菜单列表
      menuSelectList: [
        {
          menuId: 0,
          label: '顶级菜单'
        },
        {
          menuId: 1,
          label: '系统菜单'
        }
      ],
      // 菜单树数据映射
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      addMenuFormVisible: false, // 添加菜单弹框状态
      addLoad: false, // 添加菜单弹框loading状态
      // 修改菜单弹框form状态
      editMenuForm: {
        menuName: '',
        frontRouting: '',
        menuIcon: '',
        sortIndex: '',
        isChildren: false,
        parentId: ''
      },
      editMenuFormVisible: false, // 修改菜单弹框状态
      editLoad: false, // 修改菜单弹框loading状态
      // 添加loading开关
      editMenuLoad: false,
      // 是否返回查询第一页
      backhome: true
    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
    addMenuSubmit () {
      let vm = this
      validate.isValidate(vm, 'addMenuForm', (formData) => {
        console.log(formData)
        if (formData.validates) {
          formData.param.flags = true
          vm.addMenuLoad = true
          instance.post(ApiUrl.addMenu, formData.param).then(res => {
            vm.addMenuLoad = false
            if (res.status === 200) {
              vm.addMenuFormVisible = false
              Message.success({ message: res.data.data.successMsg })
              vm.getTableList(vm.backhome)
            } else {
              Message.error({ message: res.data.data.err })
            }
          }, vm.addMenuForm).catch(err => {
            Message.error(err)
          })
        }
      }, vm.addMenuForm)
    },
    editMenuSubmit () {
      let vm = this
      validate.isValidate(vm, 'addMenuForm', (formData) => {
        console.log(formData)
        if (formData.validates) {
          formData.param.flags = true
          vm.addMenuLoad = true
          instance.post(ApiUrl.addMenu, formData.param).then(res => {
            vm.addMenuLoad = false
            if (res.status === 200) {
              this.addMenuFormVisible = false
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
    // 删除单个菜单
    deleteMenu (index, row) {
      let vm = this
      MessageBox.confirm(`确定删除 ${row[index].menuName} 么`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        instance.post(ApiUrl.deleteMenu, index).then(res => {
          console.log(res)
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
    // 修改单个菜单
    editMenu (index, row) {
      this.editMenuFormVisible = true
      this.editMenuForm = row[index]
    },
    // 首次请求表格数据
    getTableList (backhome = false) {
      let vm = this
      vm.listLoading = true
      if (backhome) {
        vm.setMenuFilter.currPage = 1
        vm.setMenuFilter.limit = 10
      }
      let param = JSON.parse(JSON.stringify(vm.setMenuFilter))
      console.log(param)
      instance.get(ApiUrl.menuTableList, param).then(res => {
        if (res.status === 200) {
          vm.menuTableList = res.data.data
          vm.menuTableListTotal = res.data.total
          vm.listLoading = false
        } else {
          Message.erro({ message: res.data.data.err })
        }
      })
    },
    // 分页修改 修改表格数据
    pageChange (pageData) {
      this.setMenuFilter.limit = pageData.limit
      this.setMenuFilter.currPage = pageData.currPage
      this.getTableList()
    }
  },
  components: {
    Pagination
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
      max-height: 250px;
      overflow-y: auto;
    }
  }
</style>
