import { createCurdModel } from '.'
import { parseTime } from '@/utils'

const sexes = [{ value: '1', label: '男' }, { value: '2', label: '女' }]

const sexMap = {
  '1': '男',
  '2': '女'
}

const checkAge = (rule, value, callback) => {
  if (!Number.isInteger(value)) {
    callback(new Error('请输入数字值'))
  } else {
    if (value < 18) {
      callback(new Error('必须年满18岁'))
    } else {
      callback()
    }
  }
}

export default createCurdModel({
  sexes,
  sexMap,
  paginationConfig: {
    keyConfig: {
      currentPage: 'page',
      pageSize: 'limit'
    }
  },
  sortConfig: {
    defaultSort: { prop: 'id', order: 'descending' },
    keyConfig: { prop: 'sortProp', order: 'sortOrder' }
  },
  columns: [
    { type: 'selection', width: '55', fixed: true },
    { prop: 'id', label: 'ID', width: '80', fixed: true, sortable: 'custom' },
    { prop: 'name', label: '姓名', fixed: true },
    {
      prop: 'sex',
      label: '性别',
      render: row => {
        return sexMap[row.sex]
      }
    },
    { prop: 'age', label: '年龄' },
    {
      prop: 'joinDate',
      label: '入职时间',
      sortable: 'custom',
      render: row => {
        return parseTime(row.joinDate, '{y}-{m}-{d}')
      }
    },
    { prop: 'remark', label: '备注', showOverflowTooltip: true },
    { label: '操作', slotName: 'action', width: 180 }
  ],
  queryForm: {
    items: [{
      key: 'name',
      value: '',
      type: 'input',
      labelProps: {
        label: '姓名'
      },
      controlProps: {
        size: 'large',
        placeholder: '姓名'
      }
    }, {
      key: 'sex',
      value: '',
      type: 'select',
      options: sexes,
      labelProps: {
        label: '性别'
      },
      controlProps: {
        size: 'large',
        clearable: true,
        placeholder: '性别'
      }
    }, {
      key: 'joinDate',
      value: ['', ''],
      type: 'daterange',
      labelProps: {
        label: '入职日期'
      },
      controlProps: {
        rangeSeparator: '至',
        startPlaceholder: '入职日期from',
        endPlaceholder: '入职日期to'
      }
    }]
  },
  actions: [{
    type: 'query',
    text: '查询',
    props: {
      type: 'primary',
      size: 'large'
    }
  }, {
    type: 'create',
    text: '新建',
    props: {
      type: 'primary',
      size: 'large'
    }
  }, {
    type: 'batchDelete',
    text: '批量删除',
    props: {
      type: 'danger',
      size: 'large',
      icon: 'el-icon-delete'
    }
  }],
  tableRowActions: [{
    type: 'edit',
    text: '编辑',
    props: {
      type: 'primary',
      size: 'small',
      icon: 'el-icon-edit'
    }
  }, {
    type: 'delete',
    text: '删除',
    props: {
      type: 'danger',
      size: 'small',
      icon: 'el-icon-delete'
    }
  }],
  createForm: {
    items: [{
      key: 'name',
      value: '',
      type: 'input',
      labelProps: {
        label: '姓名',
        labelWidth: '120px',
        prop: 'name'
      },
      controlProps: {
        placeholder: '输入文字',
        autoComplete: 'off'
      }
    }, {
      key: 'sex',
      value: '',
      type: 'select',
      options: sexes,
      labelProps: {
        label: '性别',
        labelWidth: '120px',
        prop: 'sex'
      },
      controlProps: {
        size: 'large',
        clearable: true,
        placeholder: '性别'
      }
    }, {
      key: 'joinDate',
      value: '',
      type: 'date',
      labelProps: {
        label: '入职日期',
        labelWidth: '120px',
        prop: 'joinDate'
      },
      controlProps: {
        placeholder: '选择日期'
      }
    }, {
      key: 'age',
      value: '',
      type: 'input',
      dataType: 'number',
      labelProps: {
        label: '姓名',
        labelWidth: '120px',
        prop: 'age'
      },
      controlProps: {
        placeholder: '输入数字',
        autoComplete: 'off'
      }
    }, {
      key: 'remark',
      value: '',
      type: 'input',
      labelProps: {
        label: '备注',
        labelWidth: '120px'
      },
      controlProps: {
        autoComplete: 'off'
      }
    }],
    rules: {
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, message: '长度至少 2 个字符', trigger: 'blur' }
      ],
      sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
      ],
      age: [
        { required: true, message: '年龄不能为空', trigger: 'blur' },
        { validator: checkAge, trigger: 'blur' }
      ],
      joinDate: [
        { type: 'date', required: true, message: '请选择入职日期', trigger: 'blur' }
      ]
    }
  }
})
