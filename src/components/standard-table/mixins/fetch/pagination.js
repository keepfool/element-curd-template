import { getKeyMappedData } from '../../utils'

const config = {
  layout: 'total, sizes, prev, next, jumper',
  pageSizes: [10, 20, 30, 50],
  defaultPagination: {
    currentPage: 1,
    pageSize: 10
  },
  keyConfig: {
    currentPage: 'currentPage',
    pageSize: 'pageSize'
  }
}

export default {
  props: {
    paginationConfig: {
      type: Object,
      default: () => (config)
    }
  },
  data () {
    let selfConfig = { ...config, ...this.paginationConfig }
    let pagination = getKeyMappedData(selfConfig.keyConfig, selfConfig.defaultPagination)
    return {
      pagination,
      selfPaginationConfig: selfConfig
    }
  },
  methods: {
    handleSizeChange (val) {
      let { keyConfig } = this.selfPaginationConfig
      this.pagination = { ...this.pagination, ...{ [keyConfig.pageSize]: val } }
    },
    handleCurrentChange (val) {
      let { keyConfig } = this.selfPaginationConfig
      this.pagination = { ...this.pagination, ...{ [keyConfig.currentPage]: val } }
    },
    resetCurrentPage () {
      this.handleCurrentChange(1)
    }
  }
}
