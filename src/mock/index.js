import Mock from 'mockjs'
import employeeAPI from './employee'

Mock.setup({
  timeout: '300-1000'
})

const methodMap = {
  'get': 'fetch',
  'delete': 'delete',
  'put': 'update',
  'post': 'create'
}

Object.keys(methodMap).forEach(method => {
  if (employeeAPI[methodMap[method]]) {
    Mock.mock(/\/employe/, method, employeeAPI[methodMap[method]])
  }
})
