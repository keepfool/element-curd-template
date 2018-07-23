import request from '@/utils/request'

function wrapRequest (options) {
  let { url, method, query, data } = options

  let config = {
    url,
    method
  }

  if (method.toLowerCase() === 'get') {
    config.params = query
  } else {
    config.data = data
  }

  return request(config)
}

let common = ['fetch', 'create', 'delete', 'update'].reduce((acc, cur) => {
  acc[cur] = wrapRequest
  return acc
}, {})

export default common
