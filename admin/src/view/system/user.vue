<template>
  <div class="app-main">
    <div class="add-user-box box">
      <div class="header">
        <h2 class="title">用户管理</h2>
      </div>
      <div class="body">
        <!-- 搜索条件 -->
        <div class="filter-container">
          <el-form :inline="true" :model="setUserFilter">
            <el-form-item label="用户名称">
              <el-input v-model="setUserFilter.userName" placeholder="请输入用户名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="setUserFilter.userAccount" placeholder="请输入账号" clearable></el-input>
            </el-form-item>
            <el-form-item label="开启状态：" prop="status">
              <el-select v-model="setUserFilter.status" clearable class="ele-selec-block" placeholder="请选择开启状态">
                <el-option
                  v-for="item in statusSelectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="filter-item" type="primary" icon="el-icon-search" @click.native.prevent="getTableList(backhome)">查询</el-button>
              <el-button class="filter-item" type="primary" icon="el-icon-plus" @click.native.prevent="addUserFormVisible = true">新增</el-button>
            </el-form-item>
          </el-form>
          <!-- 表格 -->
          <el-table ref="multipleTable" :data="userTableList" stripe fit highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column align="center" label='ID' prop="userId"></el-table-column>
            <el-table-column align="left" label='用户名称' prop="userName"></el-table-column>
            <el-table-column align="left" label='用户账号' prop="userAccount"></el-table-column>
            <el-table-column align="left" label='用户角色' prop="userRole"></el-table-column>
            <el-table-column align="left" label='用户状态' prop="status">
              <template slot-scope="scope">
                <el-tag
                  :type="'success'"
                  disable-transitions v-if="scope.row.status">开启</el-tag>
                <el-tag
                  :type="'danger'"
                  disable-transitions v-else>关闭</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label='操作'>
              <template slot-scope="scope">
                <el-button @click.native.prevent="detialRole(scope.$index, userTableList)" size="small">
                  查看
                </el-button>
                <el-button @click.native.prevent="editRole(scope.$index, userTableList)" type="primary" size="small">
                  修改
                </el-button>
                <el-button @click.native.prevent="deleteRole(scope.$index, userTableList)" type="danger" size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <pagination :total="userTableListTotal" @reLoadData="pageChange" :callBackData="setUserFilter"></pagination>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import instance from 'global/http'
// import { validate } from 'utils/validate'
import ApiUrl from 'global/api'
import Pagination from 'components/pagination'
export default {
  name: 'user',
  data () {
    return {
      // 顶部搜索条件
      setUserFilter: {
        currPage: 1,
        limit: 10,
        userName: '',
        userAccount: '',
        status: null
      },
      // 新增弹出框状态
      addUserFormVisible: false,
      // 开启状态下拉
      statusSelectList: [
        {
          label: '开启',
          value: true
        },
        {
          label: '关闭',
          value: false
        }
      ],
      // 表格load加载
      listLoading: true,
      // 表格数据
      userTableList: [],
      userTableListTotal: 0

    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
    // 首次请求表格数据
    getTableList (backhome = false) {
      let vm = this
      vm.listLoading = true
      if (backhome) {
        vm.setUserFilter.currPage = 1
        vm.setUserFilter.limit = 10
      }
      let param = JSON.parse(JSON.stringify(vm.setUserFilter))
      console.log(param)
      instance.get(ApiUrl.userTableList, param).then(res => {
        if (res.status === 200) {
          vm.userTableList = res.data.data
          vm.userTableListTotal = res.data.total
          vm.listLoading = false
        } else {
          Message.erro({ message: res.data.data.err })
        }
      })
    },
    // 分页修改 修改表格数据
    pageChange (pageData) {
      this.setUserFilter.limit = pageData.limit
      this.setUserFilter.currPage = pageData.currPage
      this.getTableList()
    }
  },
  components: {
    Pagination
  }
}
</script>

<style scoped>

</style>
