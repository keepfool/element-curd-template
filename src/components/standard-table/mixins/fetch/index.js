import api from '@/api/common'
import sortMixin from './sort'
import paginationMixin from './pagination'

export default {
  mixins: [sortMixin, paginationMixin],
  props: {
    query: {
      type: Object
    }
  },
  data () {
    return {
      list: [],
      params: {},
      total: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let updateParams = (exp) => {
        // 查询和排序时重置currentPage
        if (exp === 'query' || exp === 'sort') {
          this.resetCurrentPage()
        }
        this.params = { ...this.query, ...this.pagination, ...this.sort }
      }

      // 监听查询、分页、排序的变化
      ['query', 'pagination', 'sort'].forEach((exp) => {
        this.$watch(exp, updateParams.bind(this, exp))
      })

      // params变更时，重新获取列表
      this.$watch('params', () => {
        this.getList()
      })

      updateParams()
    },
    getList () {
      if (this.canFetch) {
        const State = this.State
        /**
         * FETCHING有几种场景：
         * 1. 默认FETCHING(查询，分页，变更pageSize)
         * 2. 执行DELETED操作后的FETCHING
         * 3. 执行UPDATED操作后的FETCHING
         * 4. 执行CREATED操作后的FETCHING
         *
         * 正在执行其它操作时，不变更currentState
         * 例如DEELTED, UPDATED, CREATED之后的FETCHING，这样可以区分出FETCHING的场景
         */
        if (!this.doingAction) {
          this.currentState = State.FETCHING
        }

        api.fetch({
          url: this.url,
          method: 'get',
          params: this.params
        }).then(result => {
          let data = result.data

          this.list = data.items
          this.total = data.total

          this.currentState = State.FETCHED
        }).catch(err => {
          this.currentState = State.ERROR
          this.error = err
        })
      }
    }
  }
}
