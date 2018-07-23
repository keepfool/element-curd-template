<template>
   <div :class="className">
    <el-table :max-height="maxHeight" :data="list" v-loading="doingAction" @selection-change="handleSelectionChange">
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
          :type="column.type"
          :label="column.label"
          :width="column.width"
          :fixed="column.fixed"
          :show-overflow-tooltip="column.showOverflowTooltip"
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
        <span v-if="currentState === State.ERROR" :class="[`${className}--error`]">请求异常</span>
        <span v-else>暂无数据</span>
      </span>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes, prev, next, jumper"
        :current-page="selfQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="selfQuery.limit"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import api from '@/api/common'
import { State, showMessage } from './util'

export default {
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
    },
    query: {
      type: Object,
      default: () => ({})
    },
    rowsWillCreate: {
      type: Array
    },
    rowsWillDelete: {
      type: Array
    },
    rowsWillUpdate: {
      type: Array
    }
  },
  data () {
    return {
      className: `${this.classPrefix}-c-table`,
      list: [],
      selfQuery: {
        page: 1,
        limit: 10,
        ...this.query
      },
      total: null,
      // 状态常量
      State,
      // 当前状态
      currentState: State.FETCHED,
      error: null
    }
  },
  computed: {
    doingAction () {
      return [State.FETCHED, State.ERROR].indexOf(this.currentState) < 0
    },
    canFetch () {
      return [State.FETCHED, State.ERROR, State.CREATED, State.DELETED, State.UPDATED].indexOf(this.currentState) > -1
    }
  },
  watch: {
    query () {
      this.selfQuery = { page: 1, limit: this.selfQuery.limit, ...this.query }
      this.getList()
    },
    currentState (state, prevState) {
      let data = { state, prevState, error: this.error }
      this.$emit('state-change', data)
      this.error = null

      showMessage(data)
    },
    rowsWillCreate (rows) {
      this.createRows(rows)
    },
    rowsWillDelete (rows) {
      this.deleteRows(rows)
    },
    rowsWillUpdate (rows) {
      this.updateRows(rows)
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      if (this.canFetch) {
        /**
         * FETCHING有几种场景：
         * 1. 默认FETCHING(查询，分页，变更pageSize)
         * 2. 执行DELETED操作后的FETCHING
         * 3. 执行UPDATED操作后的FETCHING
         * 4. 执行CREATED操作后的FETCHING
         *
         * 正在执行其它操作时，不变更currentState
         * 例如DEELTED, UPDATED, CREATED之后的FETCHING，这样可以区分出FETCHING的场景
         */
        if (!this.doingAction) {
          this.currentState = State.FETCHING
        }

        api.fetch({
          url: this.url,
          method: 'get',
          query: this.selfQuery
        }).then(result => {
          this.$emit('fetch-end')
          let data = result.data

          this.list = data.items
          this.total = data.total

          this.currentState = State.FETCHED
        }).catch(err => {
          this.currentState = State.ERROR
          this.error = err
        })
      }
    },
    createRows (rows) {
      if (!this.doingAction) {
        this.currentState = State.CREATING
        console.log(rows)
        api.create({
          url: this.url,
          method: 'post',
          data: rows
        }).then(result => {
          this.currentState = State.CREATED
          this.$nextTick(this.getList)
        }).catch(err => {
          this.currentState = State.ERROR
          this.error = err
        })
      }
    },
    deleteRows (rows) {
      if (!this.doingAction) {
        this.currentState = State.DELETING

        api.delete({
          url: this.url,
          method: 'delete',
          data: rows
        }).then(result => {
          this.currentState = State.DELETED
          this.$nextTick(this.getList)
        }).catch(err => {
          this.currentState = State.ERROR
          this.error = err
        })
      }
    },
    updateRows (rows) {
      if (!this.doingAction) {
        this.currentState = State.UPDATING

        api.update({
          url: this.url,
          method: 'put',
          data: rows
        }).then(result => {
          this.currentState = State.UPDATED

          this.$nextTick(this.getList)
        }).catch(err => {
          this.currentState = State.ERROR
          this.error = err
        })
      }
    },
    handleSizeChange (val) {
      this.selfQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.selfQuery.page = val
      this.getList()
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    }
  }
}
</script>
<style lang="less" scoped>
  @className: @{classPrefix}-c-table;

  .@{className}--error {
    color: #ff2a00;
  }

  .pagination-container {
    margin-top: 30px;
    .mix-flex-center();
  }
</style>
