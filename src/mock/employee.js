import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
let count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@cfirst@clast',
    'sex|1': ['1', '2'],
    age: '@integer(20, 40)',
    remark: '@ctitle(5, 10)',
    // between 2010-01-01 and 2018-07-01
    joinDate: '@integer(1262275200000, 1530374400000)'
  }))
}

function dateToTime (value) {
  let type = Object.prototype.toString.call(value)
  if (type === '[object Date]') {
    return value.getTime()
  } else if (type === '[object Number]') {
    return value
  } else {
    return new Date(value).getTime()
  }
}

export default {
  name: 'employee',
  fetch: config => {
    const { page = 1, limit = 10, name, sex, startJoinDate, endJoinDate } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (name && item.name.indexOf(name) < 0) return false
      if (sex && item.sex !== sex) return false
      if (startJoinDate && endJoinDate && (item.joinDate < startJoinDate || item.joinDate > endJoinDate)) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  create: config => {
    let items = JSON.parse(config.body)

    items = items.map(item => {
      item.joinDate = dateToTime(item.joinDate)
      return {
        id: Mock.Random.increment(),
        ...item
      }
    })

    List = List.concat(items)

    return {
      data: 'OK'
    }
  },
  delete: config => {
    let items = JSON.parse(config.body)
    let idList = items.map(item => item.id)

    List = List.filter(item => {
      return idList.indexOf(item.id) < 0
    })

    return {
      data: 'OK'
    }
  },
  update: config => {
    let items = JSON.parse(config.body)
    let itemMap = items.reduce((acc, cur) => {
      acc[cur.id] = cur
      return acc
    }, {})

    List.forEach((item, index) => {
      if (itemMap[item.id]) {
        List[index] = itemMap[item.id]
      }
    })

    return {
      data: 'OK'
    }
  }
}
