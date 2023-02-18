export default {
  state: () => ({
    isComponentLoading: false,
    isCanGoBack: false,
  }),
  actions: {
    setIsComponentLoading(state, payload) {
      state.isComponentLoading = payload
    },
    setIsCanGoBack({ commit }, payload) {
      commit('SET_IS_CAN_GO_BACK', payload)
    }
  },
  mutations: {
    SET_IS_COMPONENT_LOADING(state, payload) {
      state.isComponentLoading = payload
    },
    SET_IS_CAN_GO_BACK(state, payload) {
      state.isCanGoBack = payload
    }
  },
  getters: {
    getIsComponentLoading(state) {
      return state.isComponentLoading
    },
    getIsCanGoBack(state) {
      return state.isCanGoBack
    }
  }

}