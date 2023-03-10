const user = {
  namespaced: true,
  state: () => ({
    userData: null,
  }),
  actions: {
    loginAction({ commit, dispatch }, payload) {
      this.$cookiz.set('machine_dashboard.accessToken', payload.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        secure: true,
      })
      delete payload.accessToken
      localStorage.setItem('machine_dashboard.user', JSON.stringify(payload))
      commit('SET_USER_DATA', payload)
    },
    async logoutAction({ commit, dispatch }) {
      this.$cookiz.remove('machine_dashboard.accessToken')
      localStorage.removeItem('machine_dashboard.user')
      await commit('SET_USER_DATA', null)
      location.replace("/")
    },
    async getUserDataFromLocalStorage({ commit, dispatch }, payload) {
      let userData = JSON.parse(localStorage.getItem('machine_dashboard.user'))
      if (userData) {
        let { _id: userId } = userData
        if (!userId) {
          localStorage.removeItem('machine_dashboard.user')
          return commit('SET_USER_DATA', null)
        }
        if (!this.$cookiz.get('machine_dashboard.accessToken')) {
          await dispatch('logoutAction')
        }
        await commit('SET_USER_DATA', userData)
        return userData
      }
    },
    getUserId({ state }) {
      return state.userData._id
    },
    isUserLoggedIn({ state }) {
      if (state.userData) {
        return true
      }
      return false
    }
  },
  mutations: {
    async SET_USER_DATA(state, payload) {
      state.userData = payload
    },
  },
  getters: {
    getUser(state) {
      return state.userData
    }
  }
}
export default user