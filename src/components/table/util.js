import Message from '@/components/message'

export const State = {
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  CREATING: 'CERATING',
  CREATED: 'CREATED',
  UPDATING: 'UPDATING',
  UPDATED: 'UPDATED',
  DELETING: 'DELETING',
  DELETED: 'DELETED',
  ERROR: 'ERROR'
}

const messageMap = {
  [State.CREATING]: '正在创建数据...',
  [State.CREATED]: '创建数据成功，正在重新获取数据...',
  [State.UPDATING]: '正在更新数据...',
  [State.UPDATED]: '更新数据成功，正在重新获取数据...',
  [State.DELETING]: '正在删除数据...',
  [State.DELETED]: '删除数据成功，正在重新获取数据...'
}

export const showMessage = function (data) {
  let { state, prevState, error } = data

  let duration = 0
  let message = ''
  let type = 'success'

  if (error) {
    type = 'danger'
  }

  if (messageMap[state]) {
    message = messageMap[state]
  }

  if (state === State.FETCHED) {
    if ([State.CREATED, State.UPDATED, State.DELETED].indexOf(prevState) > -1) {
      message = '数据获取完成'
      duration = 1000
    }
  }

  if (message) {
    Message({
      type,
      message,
      duration
    })
  }
}
