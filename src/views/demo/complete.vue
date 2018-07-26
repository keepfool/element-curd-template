<template>
  <div :class="className">
    <h2>雇员列表</h2>
    <!--查询-->
    <el-form class="el-standard-curd-query-form" :inline="true" label-width="80px">
      <el-row>
        <el-form-item v-for="(item, index) in model.queryFormItems" :key="index" v-bind="item.labelProps">
          <el-select v-if="item.type ==='select'" v-model="item.value" v-bind="item.controlProps">
            <el-option v-for="item in item.options" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-date-picker
            v-else-if="item.type ==='daterange'"
            v-model="item.value"
            type="daterange"
            v-bind="item.controlProps">
          </el-date-picker>
          <el-input v-else v-model="item.value" v-bind="item.controlProps" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button
            v-for="(item, index) in model.actions"
            :key="index"
            v-bind="item.props"
            :disabled="item.type.indexOf('batch') > -1 ? batchActionDisabled : loading"
            @click="handleAction(item.type)">{{ item.text || ActionDescriptor[item.type].text }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <!--表格-->
    <standard-table
      url="/employee"
      :columns="model.columns"
      :query="model.query"
      :sort-config="model.sortConfig"
      :pagination-config="model.paginationConfig"
      :rows-will-create="model.rowsWillCreate"
      :rows-will-delete="model.rowsWillDelete"
      :rows-will-update="model.rowsWillUpdate"
      @state-change="handleTableStateChange"
      @selection-change="handleSelectionChange">
      <template slot-scope="scope" slot="action">
        <el-button
          v-for="(item, index) in model.tableRowActions"
          :key="index" v-bind="item.props"
          @click="handleTableRowAction(item.type, scope.$index, scope.row)">{{ item.text || TableRowActionDescriptor[item.type].text }}</el-button>
      </template>
    </standard-table>

    <!--新建-->
    <el-dialog title="新建雇员信息" width="480px" :visible.sync="createFormVisible">
      <el-form class="el-standard-curd-create-form" :model="model.createForm" :rules="model.createRules" ref="createForm">
        <el-form-item label="姓名" label-width="120px" prop="name">
          <el-input v-model="model.createForm.name" placeholder="输入文字" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px" prop="sex">
          <el-select v-model="model.createForm.sex" placeholder="性别" size="large" clearable>
            <el-option v-for="item in model.sexes" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间" label-width="120px" prop="joinDate">
          <el-date-picker
            v-model="model.createForm.joinDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="年龄" label-width="120px" prop="age">
          <el-input v-model.number="model.createForm.age" placeholder="输入数字" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="model.createForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCreateForm">取 消</el-button>
        <el-button type="primary" @click="saveCreateForm">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑-->
    <el-dialog title="编辑雇员信息" width="480px" :visible.sync="editFormVisible">
      <el-form class="el-standard-curd-edit-form" :model="model.editForm">
        <el-form-item label="ID" label-width="120px">
          {{ model.editForm.id }}
        </el-form-item>
        <el-form-item label="姓名" label-width="120px">
          {{ model.editForm.name }}
        </el-form-item>
        <el-form-item label="入职时间" label-width="120px">
          <el-date-picker
            v-model="model.editForm.joinDate"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="model.editForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import deepEqual from 'deep-equal'
import StandardTable from '@/components/standard-table'
import model from '@/models/employee-complete'
import { dateToTime } from './util'

const ActionDescriptor = {
  query: {
    text: '查询',
    method: 'handleQueryAction'
  },
  create: {
    text: '新建',
    method: 'handleCreateAction'
  },
  batchDelete: {
    text: '批量删除',
    method: 'handleBatchDeleteAction'
  }
}

const TableRowActionDescriptor = {
  edit: {
    text: '编辑',
    method: 'handleTableRowEdit'
  },
  delete: {
    text: '删除',
    method: 'handleTableRowDelete'
  }
}

export default {
  components: {
    StandardTable
  },
  data () {
    return {
      className: `${this.classPrefix}-v-demo`,
      loading: false,
      model,
      ActionDescriptor,
      TableRowActionDescriptor,
      selectedRows: null,
      editFormVisible: false,
      createFormVisible: false
    }
  },
  computed: {
    batchActionDisabled () {
      return this.loading || !this.selectedRows || this.selectedRows.length === 0
    }
  },
  mounted () {
    console.log(this.model.createForm)
  },
  methods: {
    callMethod (method, ...args) {
      if (this[method] && typeof this[method] === 'function') {
        this[method](...args)
      }
    },
    handleAction (type) {
      let method = this.ActionDescriptor[type].method
      this.callMethod(method)
    },
    handleQueryAction () {
      this.model.query = this.model.queryFormItems.reduce((acc, cur) => {
        if (['date', 'daterange'].indexOf(cur.type) > -1) {
          if (Array.isArray(cur.value)) {
            acc[cur.key] = cur.value.map(dateToTime).join(',')
          } else {
            acc[cur.key] = dateToTime(cur.value)
          }
        } else {
          acc[cur.key] = cur.value
        }
        return acc
      }, {})
    },
    handleCreateAction () {
      this.createFormVisible = true
    },
    handleBatchDeleteAction () {
      this.model.rowsWillDelete = this.selectedRows
    },
    handleTableRowAction (type, index, row) {
      let method = this.TableRowActionDescriptor[type].method
      this.callMethod(method, index, row)
    },
    handleTableRowEdit (index, row) {
      this.editFormVisible = true
      this.model.rowBeforeEdit = row
      this.model.editForm = { ...row }
    },
    handleTableRowDelete (index, row) {
      this.model.rowsWillDelete = [row]
    },
    handleTableStateChange (data) {
      let { state } = data
      this.loading = state !== 'FETCHED' && state !== 'ERROR'
    },
    handleSelectionChange (rows) {
      this.selectedRows = rows
    },
    saveEditForm () {
      this.editFormVisible = false

      // 等待Dialog动画结束
      window.setTimeout(() => {
        // 当值发生改变时触发更新请求
        if (!deepEqual(this.model.editForm, this.model.rowBeforeEdit)) {
          this.model.rowsWillUpdate = [this.model.editForm]
        }
      }, 300)
    },
    cancelCreateForm () {
      this.createFormVisible = false
      this.$refs.createForm.resetFields()
    },
    saveCreateForm () {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createFormVisible = false
          // 等待Dialog动画结束
          window.setTimeout(() => {
            this.model.rowsWillCreate = [this.model.createForm]
          }, 300)
        } else {
          return false
        }
      })
    }
  }
}
</script>
