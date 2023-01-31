export const state = () => ({
  isComponentLoading: false
})

export const actions = {
  setIsComponentLoading(state, payload) {
    state.isComponentLoading = payload
  }

}