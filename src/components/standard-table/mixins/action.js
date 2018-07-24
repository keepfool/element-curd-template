import api from '@/api/common'
import { State } from './state'

export const ActionStateMap = {
  create: {
    method: 'post',
    doing: State.CREATING,
    done: State.CREATED,
    error: State.ERROR
  },
  update: {
    method: 'put',
    doing: State.UPDATING,
    done: State.UPDATED,
    error: State.ERROR
  },
  delete: {
    method: 'delete',
    doing: State.DELETING,
    done: State.DELETED,
    error: State.ERROR
  }
}

export default {
  props: {
    rowsWillCreate: {
      type: Array
    },
    rowsWillDelete: {
      type: Array
    },
    rowsWillUpdate: {
      type: Array
    }
  },
  watch: {
    rowsWillCreate (rows) {
      this.doAction(rows, 'create')
    },
    rowsWillDelete (rows) {
      this.doAction(rows, 'delete')
    },
    rowsWillUpdate (rows) {
      this.doAction(rows, 'update')
    }
  },
  methods: {
    doAction (rows, actionType) {
      if (!this.doingAction) {
        let actionState = ActionStateMap[actionType]
        this.currentState = actionState.doing

        api[actionType]({
          url: this.url,
          method: actionState.method,
          data: rows
        }).then(result => {
          this.currentState = actionState.done

          this.$nextTick(this.getList)
        }).catch(err => {
          this.currentState = actionState.error
          this.error = err
        })
      }
    }
  }
}
