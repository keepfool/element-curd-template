const app = {
  state: {
    navs: [
      { text: '首页', path: '/', active: false },
      { text: '示例', path: '/demo', active: false }
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
