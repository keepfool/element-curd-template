/**
 * 将数据转换成指定key
 * e.g.
 *
 * keyConfig: {
 *   prop: 'sortProp',
 *   order: 'sortOrder'
 * }
 * data: {
 *   prop: 'id',
 *   order: 'decending'
 * }
 *
 * getKeyMappedData(keyConfig, data)
 * // {sortProp: 'id', sortOrder: 'descending'}
 */
export function getKeyMappedData (keyConfig, data) {
  if (keyConfig) {
    return Object.keys(keyConfig).reduce((acc, cur) => {
      acc[keyConfig[cur]] = data[cur]
      return acc
    }, {})
  }
}
