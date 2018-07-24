<template>
  <div :class="className">
    <h2>基于ElementUI的CURD模板</h2>
    <ul>
      <li>支持列表分页、查询</li>
      <li>支持新建数据操作</li>
      <li>支持单行数据操作（编辑、删除）</li>
      <li>支持批量数据操作（删除）</li>
    </ul>

    <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'id', order: 'descending'}"
    >
    <el-table-column
      prop="id"
      label="ID"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>

export default {
  data () {
    return {
      className: `${this.classPrefix}-v-dashboard`,
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    }
  }
}
</script>
<style lang="less">
  .@{classPrefix}-v-dashboard {
    li {
      line-height: 2;
    }
  }
</style>
