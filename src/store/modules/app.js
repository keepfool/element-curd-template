const app = {
  state: {
    navs: [
      { text: '首页', path: '/', active: false },
      { text: '基础示例', path: '/demo/basic', active: false },
      { text: '完全示例', path: '/demo/complete', active: false }
    ]
  },
  mutations: {
    CHANGE_NAV: (state, to) => {
      state.navs.forEach((nav) => {
        nav.active = to.path === nav.path
      })
    }
  },
  actions: {

  }
}

export default app
