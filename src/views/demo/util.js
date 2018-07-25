export function dateToTime (value) {
  let type = Object.prototype.toString.call(value)
  if (type === '[object Date]') {
    return value.getTime()
  } else if (type === '[object Number]') {
    return value
  } else {
    return new Date(value).getTime()
  }
}
