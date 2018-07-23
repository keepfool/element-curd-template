
export function createCurdModel (model) {
  return {
    query: {},
    createForm: {},
    rowBeforeEdit: {},
    editForm: {},
    rowsWillCreate: null,
    rowsWillDelete: null,
    rowsWillUpdate: null,
    ...model
  }
}
