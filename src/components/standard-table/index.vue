<template>
   <div class="el-standard-table">
    <el-table
      :max-height="maxHeight"
      :data="list"
      :default-sort="defaultSort"
      v-loading="doingAction"
      ref="table"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange">
      <template v-for="(column, index) in columns">
        <el-table-column
          v-if="column.type"
          :type="column.type"
          :label="column.label"
          :width="column.width"
          :fixed="column.fixed"
          :key="index">
        </el-table-column>
        <el-table-column
          v-else
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :fixed="column.fixed"
          :show-overflow-tooltip="column.showOverflowTooltip"
          :sortable="column.sortable"
          :key="index">
          <template slot-scope="scope">
            <span v-if="column.slotName">
              <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
            </span>
            <span v-else>
              {{ column.render ? column.render(scope.row) : scope.row[column.prop] }}
            </span>
          </template>
        </el-table-column>
      </template>

      <span slot="empty">
        <span v-if="currentState === State.ERROR" class="el-standard-table--error">请求异常</span>
        <span v-else>暂无数据</span>
      </span>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        :layout="selfPaginationConfig.layout"
        :current-page="pagination.currentPage"
        :page-sizes="selfPaginationConfig.pageSizes"
        :page-size="pagination.pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import stateMixin from './mixins/state'
import fetchMixin from './mixins/fetch'
import actionMixin from './mixins/action'

export default {
  mixins: [stateMixin, fetchMixin, actionMixin],
  props: {
    maxHeight: {
      type: [String, Number]
    },
    url: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      error: null
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    }
  }
}
</script>
<style lang="less" scoped>
  .el-standard-table--error {
    color: #ff2a00;
  }

  .pagination-container {
    margin-top: 30px;
    .mix-flex-center();
  }
</style>
