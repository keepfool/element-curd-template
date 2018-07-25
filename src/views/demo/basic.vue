<template>
  <div :class="className">
    <h2>雇员列表</h2>
    <!--查询-->
    <el-form class="el-standard-curd-query-form" :inline="true" :model="model.queryForm" label-width="80px">
      <el-row>
        <el-form-item label="姓名">
          <el-input v-model="model.queryForm.name" size="large" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="model.queryForm.sex" placeholder="性别" size="large" clearable>
            <el-option v-for="item in model.sexes" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期">
          <el-date-picker
            v-model="model.queryForm.joinDate"
            type="daterange"
            range-separator="至"
            start-placeholder="入职日期from"
            end-placeholder="入职日期to">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button type="primary" size="large" :disabled="loading" @click="handleQuery">查询</el-button>
          <el-button type="primary" size="large" :disabled="loading" @click="openCreateForm">新建</el-button>
          <el-button type="danger" icon="el-icon-delete" size="large" :disabled="batchActionDisabled" @click="handleBatchDelete">批量删除</el-button>
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
        <el-button type="primary" size="small" icon="el-icon-edit" @click="openEditForm(scope.$index, scope.row)">编辑</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
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
import model from '@/models/employee-basic'

export default {
  components: {
    StandardTable
  },
  data () {
    return {
      className: `${this.classPrefix}-v-demo`,
      loading: false,
      model,
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
  methods: {
    handleQuery () {
      let { name, sex, joinDate } = this.model.queryForm

      if (!joinDate) {
        joinDate = ['', '']
      }

      this.model.query = {
        name,
        sex,
        startJoinDate: joinDate[0],
        endJoinDate: joinDate[1]
      }
    },
    handleTableStateChange (data) {
      let { state } = data
      this.loading = state !== 'FETCHED' && state !== 'ERROR'
    },
    handleSelectionChange (rows) {
      this.selectedRows = rows
    },
    handleRowDelete (index, row) {
      this.model.rowsWillDelete = [row]
    },
    openEditForm (index, row) {
      this.editFormVisible = true
      this.model.rowBeforeEdit = row
      this.model.editForm = { ...row }
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
    openCreateForm () {
      this.createFormVisible = true
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
    },
    handleBatchDelete () {
      this.model.rowsWillDelete = this.selectedRows
    }
  }
}
</script>
