import { createCurdModel } from './index'
import { parseTime } from '@/utils'

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
  sexes: [{ value: '1', label: '男' }, { value: '2', label: '女' }],
  sexMap,
  columns: [
    { type: 'selection', width: '55', fixed: true },
    { prop: 'id', label: 'ID', width: '80', fixed: true },
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
      render: row => {
        return parseTime(row.joinDate, '{y}-{m}-{d}')
      }
    },
    { prop: 'remark', label: '备注', showOverflowTooltip: true },
    { label: '操作', slotName: 'action', width: 180 }
  ],
  queryForm: {
    name: '',
    sex: '',
    joinDate: ['', '']
  },
  createRules: {
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
})
