<template>
  <div class="pagination-container" v-if="total">
    <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="callBackData.currPage" :page-sizes="pageSizes"
      :page-size="callBackData.limt" background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data () {
    return {
      pageSizes: [10, 20, 30, 50]
    }
  },
  props: {
    total: {
      type: Number
    },
    callBackData: {
      type: Object
    }
  },
  mounted () {
    console.log(this.total)
    console.log(this.callBackData)
  },
  methods: {
    handleCurrentChange (val) {
      this.callBackData.currPage = val
      this.$emit('reLoadData', this.callBackData)
    },
    handleSizeChange (val) {
      this.callBackData.limit = val
      this.$emit('reLoadData', this.callBackData)
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.pagination-container {
  margin-top: 20px;
}
</style>
