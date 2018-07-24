import { getKeyMappedData } from '../../utils'

export default {
  props: {
    sortConfig: {
      type: Object
    }
  },
  data () {
    let { keyConfig, defaultSort } = this.sortConfig
    let sort = getKeyMappedData(keyConfig, defaultSort)
    return {
      defaultSort,
      defaultSortHandled: false,
      sort
    }
  },
  methods: {
    handleSortChange ({ column, prop, order }) {
      if (!this.defaultSortHandled) {
        this.defaultSortHandled = true
        return
      }
      if (prop && order) {
        let { keyConfig } = this.sortConfig
        this.sort = getKeyMappedData(keyConfig, { prop, order })
      }
    }
  }
}
